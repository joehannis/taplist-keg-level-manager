const request = require('supertest');
const app = require('../bin/www'); // Adjust the path to your Express server file
require('jest-fetch-mock').enableMocks();
const brewFatherMock = require('../spec/mocks/brewFatherMock'); // Adjust the path to your mock file
const { Server } = require('socket.io');
const ioClient = require('socket.io-client');
const http = require('http');

process.env.VENUE = 'testVenueId';
process.env.AUTH_TOKEN = 'testAuthToken';

jest.mock('dotenv', () => ({
  config: jest.fn(() => ({
    parsed: {
      BREWFATHER_ID: 'testUserId',
      BREWFATHER_API: 'testApiKey',
      VENUE: process.env.VENUE,
      AUTH_TOKEN: process.env.AUTH_TOKEN,
    },
  })),
}));

beforeEach(() => {
  fetchMock.resetMocks();
  fetchMock.mockResponse((req) => {
    if (req.url.includes('status=Brewing')) {
      return Promise.resolve({
        status: 200,
        body: JSON.stringify(
          brewFatherMock.filter((batch) => batch.status === 'Brewing')
        ),
      });
    } else if (req.url.includes('status=Fermenting')) {
      return Promise.resolve({
        status: 200,
        body: JSON.stringify(
          brewFatherMock.filter((batch) => batch.status === 'Fermenting')
        ),
      });
    } else if (req.url.includes('status=Conditioning')) {
      return Promise.resolve({
        status: 200,
        body: JSON.stringify(
          brewFatherMock.filter((batch) => batch.status === 'Conditioning')
        ),
      });
    } else if (
      req.url === 'https://api.taplist.io/api/v1/venues/testVenueId/taps'
    ) {
      return Promise.resolve({
        status: 200,
        body: JSON.stringify([
          { name: 'Tap 1', beer: 'IPA' },
          { name: 'Tap 2', beer: 'Lager' },
        ]),
      });
    } else if (
      req.url ===
      'https://api.taplist.io/api/v1/venues/testVenueId/taps/1/current-keg'
    ) {
      const requestBody = JSON.parse(req.body);
      console.log('Request body:', requestBody);
      if (requestBody.add_served_volume_ml === 500) {
        return Promise.resolve({
          status: 200,
          body: JSON.stringify({ add_served_volume_ml: 500 }),
        });
      } else if (requestBody.served_volume_ml === 0) {
        return Promise.resolve({
          status: 200,
          body: JSON.stringify({ served_volume_ml: 0 }),
        });
      }
    }

    return Promise.reject(new Error(`Unexpected URL: ${req.url}`));
  });
});

describe('Express Server Tests', () => {
  let serverInstance; // To hold the existing server (or the one we manage)

  beforeAll((done) => {
    // The server is already started when we require('../bin/www')
    // We just need to ensure it's ready for testing.
    serverInstance = app.listen(3001, (err) => {
      // Use a different port for testing if needed
      if (err) return done(err);
      done();
    });
  });

  afterAll((done) => {
    if (serverInstance) {
      serverInstance.close(done);
    } else {
      done();
    }
  });

  describe('/taps route', () => {
    it('should respond with 200 OK on the /taps route', async () => {
      const response = await request(serverInstance).get('/taps');
      expect(response.statusCode).toBe(200);
    });
    it('should handle errors in the taps route', async () => {
      fetchMock.mockReject(new Error('API is down'));
      const response = await request(app).get('/taps');
      expect(response.statusCode).toBe(500);
      expect(response.body.error).toBe('An error occurred while fetching taps');
    });
  });
  describe('/brewfather route', () => {
    it('should respond with 200 OK on the /brewfather route', async () => {
      const response = await request(app).get('/brewfather');
      expect(response.statusCode).toBe(200);
    });
    it('should return JSON data for the brewfather route', async () => {
      const response = await request(app).get('/brewfather');
      expect(response.body).toEqual(brewFatherMock);
    });
    it('should handle errors in the brewfather route', async () => {
      fetchMock.mockReject(new Error('API is down'));
      const response = await request(app).get('/brewfather');
      expect(response.statusCode).toBe(500);
      expect(response.body.error).toBe(
        'An error occurred while fetching batches'
      );
    });
  });
  describe('/served route', () => {
    it('should respond with 200 OK on the /served route', async () => {
      const response = await request(app).patch('/served').send({
        currentTapNumber: 1,
        servedAmount: 500,
      });
      expect(response.statusCode).toBe(200);
    });
    it('should return JSON data for the /served route', async () => {
      const response = await request(app).patch('/served').send({
        currentTapNumber: 1,
        servedAmount: 500,
      });
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ add_served_volume_ml: 500 });
    });

    it('should handle errors in the served route', async () => {
      fetchMock.mockReject(new Error('API is down'));
      const response = await request(app).patch('/served').send({
        currentTapNumber: 1,
        servedAmount: 500,
      });
      expect(response.statusCode).toBe(500);
      expect(response.body.error).toBe(
        'An error occurred while updating tap volume'
      );
    });
  });

  describe('/reset route', () => {
    it('should respond with 200 OK on the /reset route', async () => {
      const response = await request(app).patch('/reset').send({
        currentTapNumber: 1,
      });
      expect(response.statusCode).toBe(200);
    });
    it('should return JSON data for the /reset route', async () => {
      const response = await request(app).patch('/reset').send({
        currentTapNumber: 1,
      });
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ served_volume_ml: 0 });
    });
    it('should handle errors in the reset route', async () => {
      fetchMock.mockReject(new Error('API is down'));
      const response = await request(app).patch('/reset').send({
        currentTapNumber: 1,
      });
      expect(response.statusCode).toBe(500);
      expect(response.body.error).toBe(
        'An error occurred while resetting tap volume'
      );
    });
  });

  it('should handle 404 for unknown routes', async () => {
    const response = await request(app).get('/unknown-route');
    expect(response.statusCode).toBe(404);
  });
  describe('Socket.IO Tests', () => {
    beforeAll(
      (done) => {
        clientSocket = ioClient(`http://localhost:4000`); // Connect to the server defined in www.js
        clientSocket.on('connect', done);
        consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      },
      afterAll((done) => {
        if (clientSocket) {
          clientSocket.disconnect();
        }
        consoleLogSpy.mockRestore();
        done();
      })
    );
    it('should establish a Socket.IO connection', (done) => {
      expect(clientSocket.connected).toBe(true);
      done();
    }),
      it('should receive a "disconnect" event when the client disconnects', (done) => {
        clientSocket.on('disconnect', (reason) => {
          expect(reason).toBe('io client disconnect');
          done();
        });

        clientSocket.disconnect();
      });
  });
});
