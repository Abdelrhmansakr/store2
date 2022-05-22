import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('test endpoint', () => {
  it('get the endpoint ', async () => {
    const reson = await request.get('/');
    expect(reson.status).toBe(200);
  });
});
