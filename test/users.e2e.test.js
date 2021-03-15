const request = require('supertest');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User, newUser } = require('../model/__mocks__/data');
const app = require('../app');
const SECRET_KEY = process.env.JWT_SECRET;

const issueToken = (payload, secret) => jwt.sign(payload, secret);
const token = issueToken({ id: User._id }, SECRET_KEY);
User.token = token;

jest.mock('../model/contacts.js');
jest.mock('../model/users.js');

describe('Testing the route api/users', () => {
  it('should return 201 status for registration', async done => {
    const res = await request(app)
      .post(`/api/users/registration`)
      .send(newUser)
      .set('Accept', 'application/json');

    expect(res.status).toEqual(201);
    expect(res.body).toBeDefined();
    done();
  });

  it('should return 409 status for registration - email is already exsist', async done => {
    const res = await request(app)
      .post('/api/users/registration')
      .send(newUser)
      .set('Accept', 'application/json');

    expect(res.status).toEqual(409);
    expect(res.body).toBeDefined();
    done();
  });

  it('should return 200 status for login', async done => {
    const res = await request(app)
      .post(`/api/users/login`)
      .send(newUser)
      .set('Accept', 'application/json');

    expect(res.status).toEqual(200);
    expect(res.body).toBeDefined();
    done();
  });

  it('should return 401 status for login with wrong credentials', async done => {
    const res = await request(app)
      .post(`/api/users/login`)
      .send({ email: 'qwe@gmail.com', password: '234234' })
      .set('Accept', 'application/json');

    expect(res.status).toEqual(401);
    expect(res.body).toBeDefined();
    done();
  });
});
