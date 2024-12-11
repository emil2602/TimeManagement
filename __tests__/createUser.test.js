const request = require('supertest');
const http = require('http');
const app = require('../index'); // Импорт приложения

const API_KEY = "4f8c7e2f5a1234bafac9d88e3a4c5e9b";

describe('Create User Endpoint', () => {
  let server;

  beforeAll(() => {
    server = http.createServer(app);
  });

  afterAll(() => {
    server.close();
  });

  it('should create a user successfully', async () => {
    const userData = {
      username: 'testuser12',
      email: 'test@example.com',
      password: 'password123',
    };

    const response = await request(server)
      .post('/api/users')
      .set('Authorization', API_KEY) // add API key to headers
      .send(userData);

    console.log('STATUS', response.status); // check response status
    console.log('BODY', response.body); // check response body

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      username: 'testuser12',
      email: 'test@example.com',
      isActive: true,
      role: 'user',
    });
  });
});
