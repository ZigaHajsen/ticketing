import request from 'supertest';
import { app } from '../../app';

it('has a route handler listening to /api/tickets from post requests', async () => {
  const response = await request(app).post('/api/tickets').send({});

  expect(response.status).not.toEqual(404);
});

it('can only be accessed if user is signed in', async () => {
  const response = await request(app).post('/api/tickets').send({});

  expect(response.status).toEqual(401);
});

it('does not return 401 if user is signed in', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signup())
    .send({});

  expect(response.status).not.toEqual(401);
});

it('return an error if invalid title is provided', async () => {
  let response;

  response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signup())
    .send({
      title: '',
      price: 10,
    });

  expect(response.status).toEqual(400);

  response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signup())
    .send({
      price: 10,
    });

  expect(response.status).toEqual(400);
});

it('return an error if invalid price is provided', async () => {
  let response;

  response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signup())
    .send({
      title: 'Title',
      price: -10,
    });

  expect(response.status).toEqual(400);

  response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signup())
    .send({
      title: 'Title',
    });

  expect(response.status).toEqual(400);
});

it('creates a ticket with valid inputs', async () => {});
