const request = require('supertest');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User, contacts, newContact } = require('../model/__mocks__/data');
const app = require('../app');
const SECRET_KEY = process.env.JWT_SECRET;

const issueToken = (payload, secret) => jwt.sign(payload, secret);
const token = issueToken({ id: User._id }, SECRET_KEY);
User.token = token;

jest.mock('../model/contacts.js');
jest.mock('../model/users.js');

describe('Testing the route api/contacts', () => {
  let idNewContact;

  describe('Should handle get request', () => {
    it('should return 200 status for get all cats', async done => {
      const res = await request(app)
        .get('/api/contacts')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.contacts).toBeInstanceOf(Array);
      done();
    });

    it('should return 200 status find by id', async done => {
      const contact = contacts[0];
      const res = await request(app)
        .get(`/api/contacts/${contact._id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.contact).toHaveProperty('_id');
      expect(res.body.data.contact._id).toBe(contact._id);

      done();
    });

    it('should return 404 status  by wrong id', async done => {
      const wrongId = 123676;
      const res = await request(app)
        .get(`/api/contacts/${wrongId}`)
        .set('Authorization', `Bearer ${token}`);
      console.log(res.body);

      expect(res.status).toEqual(404);
      expect(res.body).toBeDefined();

      done();
    });
  });
  describe('Should handle post request', () => {
    it('should return 201 status for created contact', async done => {
      const res = await request(app)
        .post(`/api/contacts`)
        .set('Authorization', `Bearer ${token}`)
        .send(newContact)
        .set('Accept', 'application/json');

      expect(res.status).toEqual(201);
      expect(res.body).toBeDefined();
      idNewContact = res.body.data.contact._id;
      done();
    });
    it('should return 400 status for wrong field', async done => {
      const res = await request(app)
        .post(`/api/contacts`)
        .set('Authorization', `Bearer ${token}`)
        .send({ ...newContact, test: 1 })
        .set('Accept', 'application/json');

      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();
      done();
    });
    it('should return 400 status without required field name', async done => {
      const res = await request(app)
        .post(`/api/contacts`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Andrii' })
        .set('Accept', 'application/json');

      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();
      done();
    });
  });
  describe('Should handle patch request', () => {
    it('Update contact success should return 200 status', async done => {
      const res = await request(app)
        .patch(`/api/contacts/${idNewContact}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'test' })
        .set('Accept', 'application/json');

      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.contact.name).toBe('test');
      done();
    });

    it('Wrong field subscription should return 400 status', async done => {
      const res = await request(app)
        .patch(`/api/contacts/${idNewContact}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ subscription: 'qwe' })
        .set('Accept', 'application/json');

      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();
      done();
    });

    it('Update contact with wrong id should return 404 status', async done => {
      const res = await request(app)
        .patch('/api/contacts/12345')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'test' })
        .set('Accept', 'application/json');

      expect(res.status).toEqual(404);
      expect(res.body).toBeDefined();
      done();
    });

    it('Should return 400 status for empty request', async done => {
      const res = await request(app)
        .patch(`/api/contacts/${idNewContact}`)
        .set('Authorization', `Bearer ${token}`)
        .send()
        .set('Accept', 'application/json');

      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();
      done();
    });
  });
  describe('Should handle delete request', () => {
    it('Remove contact success should return 200 status', async done => {
      const res = await request(app)
        .delete(`/api/contacts/${idNewContact}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      done();
    });

    it('Should return 404 status with wrong id', async done => {
      const res = await request(app)
        .delete(`/api/contacts/${123}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toEqual(404);
      expect(res.body).toBeDefined();
      done();
    });
  });
});
