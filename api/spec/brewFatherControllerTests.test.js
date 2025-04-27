jest.mock('dotenv', () => ({
  config: jest.fn(() => ({
    parsed: { BREWFATHER_ID: 'testUserId', BREWFATHER_API: 'testApiKey' },
  })),
}));

// Adjust the path
const fetchMock = require('jest-fetch-mock');

const brewfatherController = require('../controllers/brewfatherController');

// Mock the dotenv configuration to provide consistent environment variables
describe('brewfatherController', () => {
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

  it('should fetch brewing, fermenting, and conditioning batches and respond with combined data', async () => {
    const mockBrewingData = [{ _id: '1', name: 'Brewing Batch' }];
    const mockFermentingData = [{ _id: '2', name: 'Fermenting Batch' }];
    const mockConditioningData = [{ _id: '3', name: 'Conditioning Batch' }];

    fetchMock
      .mockResponseOnce(JSON.stringify(mockBrewingData))
      .mockResponseOnce(JSON.stringify(mockFermentingData))
      .mockResponseOnce(JSON.stringify(mockConditioningData));

    await brewfatherController(mockReq, mockRes);

    expect(fetchMock.mock.calls.length).toBe(3);
    expect(fetchMock.mock.calls[0][0]).toBe(
      'https://api.brewfather.app/v2/batches?status=Brewing'
    );
    expect(fetchMock.mock.calls[1][0]).toBe(
      'https://api.brewfather.app/v2/batches?status=Fermenting'
    );
    expect(fetchMock.mock.calls[2][0]).toBe(
      'https://api.brewfather.app/v2/batches?status=Conditioning'
    );

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith([
      ...mockBrewingData,
      ...mockFermentingData,
      ...mockConditioningData,
    ]);
  });

  it('should handle network errors during fetching brewing data', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ message: 'Brewing API Error' }),
      { status: 500 }
    );

    fetchMock.mockResponseOnce(JSON.stringify([]));
    fetchMock.mockResponseOnce(JSON.stringify([]));

    await brewfatherController(mockReq, mockRes);

    expect(fetchMock.mock.calls.length).toBe(1);
    expect(fetchMock.mock.calls[0][0]).toContain('status=Brewing');
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: 'An error occurred while fetching batches',
    });
  });

  it('should handle network errors during fetching fermenting data', async () => {
    // Mock a successful response for Brewing
    fetchMock.mockResponseOnce(JSON.stringify([]));

    // Mock a non-OK response for Fermenting
    fetchMock.mockResponseOnce(
      JSON.stringify({ message: 'Fermenting API Error' }),
      { status: 500 }
    );

    // Mock a successful response for Conditioning
    fetchMock.mockResponseOnce(JSON.stringify([]));

    await brewfatherController(mockReq, mockRes);

    expect(fetchMock.mock.calls.length).toBe(2);
    expect(fetchMock.mock.calls[1][0]).toContain('status=Fermenting');
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: 'An error occurred while fetching batches',
    });
    // The error for fermenting happens on line 40:
    // throw new Error('Network response was not ok (Fermenting)');
  });

  it('should handle network errors during fetching conditioning data', async () => {
    // Mock successful responses for Brewing and Fermenting
    fetchMock.mockResponseOnce(JSON.stringify([]));
    fetchMock.mockResponseOnce(JSON.stringify([]));

    // Mock a non-OK response for Conditioning
    fetchMock.mockResponseOnce(
      JSON.stringify({ message: 'Conditioning API Error' }),
      { status: 500 }
    );

    await brewfatherController(mockReq, mockRes);

    expect(fetchMock.mock.calls.length).toBe(3);
    expect(fetchMock.mock.calls[2][0]).toContain('status=Conditioning');
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: 'An error occurred while fetching batches',
    });
    // The error for conditioning happens on line 50:
    // throw new Error('Network response was not ok (Conditioning)');
  });

  it('should handle non-ok responses from Brewfather API', async () => {
    fetchMock.mockResponseOnce('', { status: 401 });

    await brewfatherController(mockReq, mockRes);

    expect(fetchMock.mock.calls.length).toBe(1);
    expect(fetchMock.mock.calls[0][0]).toBe(
      'https://api.brewfather.app/v2/batches?status=Brewing'
    );

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: 'An error occurred while fetching batches',
    });
  });
});
