const fetchMock = require('jest-fetch-mock');

process.env.VENUE = 'testVenueId';
process.env.AUTH_TOKEN = 'testAuthToken';

// Mock the entire 'dotenv' module using a factory function
jest.mock('dotenv', () => ({
  config: jest.fn(() => ({
    parsed: {
      VENUE: process.env.VENUE,
      AUTH_TOKEN: process.env.AUTH_TOKEN,
    },
  })),
  // Also mock any other exports from dotenv if your controller uses them
}));

// Import the controller AFTER the full dotenv mock
const resetController = require('../controllers/resetController');

describe('resetController', () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    fetchMock.resetMocks();
    mockReq = {
      body: {},
      params: {},
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should send a PATCH request to reset the keg volume and respond with the API data', async () => {
    const mockTapNumber = 1;
    const mockRequestBody = { served_volume_ml: 0 };
    const mockApiResponse = { tap_id: mockTapNumber, served_volume_ml: 0 };

    mockReq.body.currentTapNumber = mockTapNumber;

    fetchMock.mockResponseOnce(JSON.stringify(mockApiResponse));

    await resetController(mockReq, mockRes);

    expect(fetchMock.mock.calls.length).toBe(1);
    expect(fetchMock.mock.calls[0][0]).toBe(
      `https://api.taplist.io/api/v1/venues/testVenueId/taps/${mockTapNumber}/current-keg`
    );
    expect(fetchMock.mock.calls[0][1]).toEqual({
      method: 'PATCH',
      headers: {
        Authorization: 'Token testAuthToken',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mockRequestBody),
    });

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockApiResponse);
  });

  it('should handle network errors during the reset request and respond with a 500 error', async () => {
    const mockTapNumber = 2;
    mockReq.body.currentTapNumber = mockTapNumber;

    fetchMock.mockRejectOnce(new Error('Network error'));

    await resetController(mockReq, mockRes);

    expect(fetchMock.mock.calls.length).toBe(1);
    expect(fetchMock.mock.calls[0][0]).toBe(
      `https://api.taplist.io/api/v1/venues/testVenueId/taps/${mockTapNumber}/current-keg`
    );

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: 'An error occurred while resetting tap volume',
    });
  });

  it('should handle non-ok responses from the API and still respond with the JSON data and 200 (as per current logic)', async () => {
    const mockTapNumber = 3;
    const mockApiResponse = { message: 'Reset successful' };
    mockReq.body.currentTapNumber = mockTapNumber;

    fetchMock.mockResponseOnce(JSON.stringify(mockApiResponse), {
      status: 400,
    });

    await resetController(mockReq, mockRes);

    expect(fetchMock.mock.calls.length).toBe(1);
    expect(fetchMock.mock.calls[0][0]).toBe(
      `https://api.taplist.io/api/v1/venues/testVenueId/taps/${mockTapNumber}/current-keg`
    );

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockApiResponse);
  });

  it('should handle cases where currentTapNumber is not provided in the request body', async () => {
    mockReq.body = { AUTH_TOKEN: 'someAuthToken' }; // Add AUTH_TOKEN to the mock request

    await resetController(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: 'currentTapNumber is required',
    });

    expect(fetchMock.mock.calls.length).toBe(0);
  });
  it('should handle cases where no environment variables are set', async () => {
    delete process.env.VENUE;
    delete process.env.AUTH_TOKEN;

    await resetController(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: 'Environment variables VENUE and AUTH_TOKEN are required',
    });

    // Ensure fetch was NOT called
    expect(fetchMock.mock.calls.length).toBe(0);
  });
  it('should handle cases where currenntTapNumber is not a positive number', async () => {
    mockReq.body.currentTapNumber = -1;

    await resetController(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: 'currentTapNumber must be a positive number',
    });

    // Ensure fetch was NOT called
    expect(fetchMock.mock.calls.length).toBe(0);
  });
});
