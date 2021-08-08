import request from 'supertest';
import mongoose from 'mongoose';

import { app } from '../../app';

it('return 404 if provided id does not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const title = 'Title';
  const price = 20;

  const response = await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signup())
    .send({
      title,
      price,
    });

  expect(response.status).toEqual(404);
});

it('return 401 if user is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const title = 'Title';
  const price = 20;

  const response = await request(app).put(`/api/tickets/${id}`).send({
    title,
    price,
  });

  expect(response.status).toEqual(401);
});

it('return 401 if user does not own a ticket', async () => {
  const title = 'Title';
  const price = 20;

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signup())
    .send({
      title,
      price,
    });

  const updateResponse = await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', global.signup())
    .send({
      title,
      price,
    });

  expect(updateResponse.status).toEqual(401);
});

it('return 400 if user provides invalid title or price', async () => {
  const title = 'Title';
  const price = 20;
  const cookie = global.signup();

  let updateResponse;

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title,
      price,
    });

  updateResponse = await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: '',
      price: 20,
    });

  expect(updateResponse.status).toEqual(400);

  updateResponse = await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'test',
      price: -20,
    });

  expect(updateResponse.status).toEqual(400);
});

it('updates ticket provided valid inputs', async () => {
  const title = 'Title';
  const price = 20;
  const updatedTitle = 'Title';
  const updatedPrice = 20;
  const cookie = global.signup();

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title,
      price,
    });

  const updateResponse = await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: updatedTitle,
      price: updatedPrice,
    });

  expect(updateResponse.status).toEqual(200);

  const ticketResponse = await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .send();

  expect(updateResponse.body.title).toEqual(updatedTitle);
  expect(updateResponse.body.price).toEqual(updatedPrice);
});
