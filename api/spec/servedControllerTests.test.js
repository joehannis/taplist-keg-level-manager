const servedController = require('../controllers/servedController');
const fetchMock = require('jest-fetch-mock');

describe('servedController', () => {
  let mockReq;
  let mockRes;
  let mockIo;

  beforeEach(() => {
    fetchMock.resetMocks();
    mockReq = {
      body: {
        currentTapNumber: 1,
        servedAmount: '500',
        flow: true, // Default flow to true for some tests
      },
      app: {
        get: jest.fn(),
      },
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockIo = {
      emit: jest.fn(),
    };
    process.env.VENUE = 'testVenueId';
    process.env.AUTH_TOKEN = 'testAuthToken';

    // Mock the successful fetch response by default
    fetchMock.mockResponseOnce(JSON.stringify({ add_served_volume_ml: 500 }));
    mockReq.app.get.mockReturnValue(mockIo); // Mock Socket.IO instance
  });

  it('should emit "served" event when io instance exists and req.body.flow is true', async () => {
    await servedController(mockReq, mockRes);

    expect(mockReq.app.get).toHaveBeenCalledWith('io');
    expect(mockIo.emit).toHaveBeenCalledWith('served', {
      data: 'Served route called',
    });
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ add_served_volume_ml: 500 });
  });

  it('should NOT emit "served" event when io instance exists but req.body.flow is false', async () => {
    mockReq.body.flow = false;
    await servedController(mockReq, mockRes);

    expect(mockReq.app.get).toHaveBeenCalledWith('io');
    expect(mockIo.emit).not.toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ add_served_volume_ml: 500 });
  });

  it('should NOT emit "served" event and log error when io instance does not exist', async () => {
    mockReq.app.get.mockReturnValue(undefined); // Mock no Socket.IO instance
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    await servedController(mockReq, mockRes);

    expect(mockReq.app.get).toHaveBeenCalledWith('io');
    expect(mockIo.emit).not.toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Socket.io instance not found'
    );
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ add_served_volume_ml: 500 });

    consoleErrorSpy.mockRestore();
  });

  it('should still send a 200 response with data even if io is not available', async () => {
    mockReq.app.get.mockReturnValue(undefined); // Mock no Socket.IO instance
    await servedController(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ add_served_volume_ml: 500 });
  });

  it('should still send a 200 response with data even if flow is false', async () => {
    mockReq.body.flow = false;
    await servedController(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ add_served_volume_ml: 500 });
  });
});
