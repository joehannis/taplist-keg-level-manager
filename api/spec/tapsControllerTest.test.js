process.env.VENUE = 'testVenueId';
process.env.AUTH_TOKEN = 'testAuthToken';

jest.mock('dotenv', () => ({
  config: jest.fn(() => ({
    parsed: {
      BREWFATHER_ID: process.env.VENUE,
      BREWFATHER_API: process.env.AUTH_TOKEN,
    },
  })),
}));

// Adjust the path
const fetchMock = require('jest-fetch-mock');

const tapsController = require('../controllers/tapsController');

// Mock the dotenv configuration to provide consistent environment variables
describe('tapsController', () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    // Reset the mock fetch before each test
    fetchMock.resetMocks();

    // Mock the request and response objects
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(), // Chainable status mock
      json: jest.fn(), // Mock for sending JSON response
    };
  });
  it('should fetch taps data and respond with the data', async () => {
    const mockTapsData = [
      { name: 'Tap 1', beer: 'IPA' },
      { name: 'Tap 2', beer: 'Lager' },
    ];

    fetchMock.mockResponseOnce(JSON.stringify(mockTapsData));

    await tapsController(mockReq, mockRes);

    expect(fetchMock.mock.calls.length).toBe(1);
    expect(fetchMock.mock.calls[0][0]).toBe(
      'https://api.taplist.io/api/v1/venues/testVenueId/taps'
    );

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockTapsData);
  });
  it('should handle network errors during fetching and respond with a 500 error', async () => {
    fetchMock.mockReject(new Error('Network error'));

    await tapsController(mockReq, mockRes);

    expect(fetchMock.mock.calls.length).toBe(1);
    expect(fetchMock.mock.calls[0][0]).toBe(
      'https://api.taplist.io/api/v1/venues/testVenueId/taps'
    );

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: 'An error occurred while fetching taps',
    });
  });
  it('should handle non-200 responses and respond with a 500 error', async () => {
    fetchMock.mockResponseOnce('Internal Server Error', { status: 500 });

    await tapsController(mockReq, mockRes);

    expect(fetchMock.mock.calls.length).toBe(1);
    expect(fetchMock.mock.calls[0][0]).toBe(
      'https://api.taplist.io/api/v1/venues/testVenueId/taps'
    );

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: 'An error occurred while fetching taps',
    });
  });
  it('should handle invalid JSON responses and respond with a 500 error', async () => {
    fetchMock.mockResponseOnce('Invalid JSON');

    await tapsController(mockReq, mockRes);

    expect(fetchMock.mock.calls.length).toBe(1);
    expect(fetchMock.mock.calls[0][0]).toBe(
      'https://api.taplist.io/api/v1/venues/testVenueId/taps'
    );

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: 'An error occurred while fetching taps',
    });
  });
  it('should handle empty responses and respond with a 500 error', async () => {
    fetchMock.mockResponseOnce('');

    await tapsController(mockReq, mockRes);

    expect(fetchMock.mock.calls.length).toBe(1);
    expect(fetchMock.mock.calls[0][0]).toBe(
      'https://api.taplist.io/api/v1/venues/testVenueId/taps'
    );

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: 'An error occurred while fetching taps',
    });
  });
});
