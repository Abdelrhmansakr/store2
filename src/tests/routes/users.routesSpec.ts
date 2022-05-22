import request from 'supertest';
import app from '../../index';
import user from '../../types/usert';

let token: string;

describe('User route api Test', () => {
  it('should create new user', async () => {
    const res = await request(app)
      .post('/api/users/')
      .send({
        email: 'test@test.com',
        password: '1234',
      } as user);
    expect(res.status).toBe(200);
    token = res.body.data.token;
    expect(res.body.data.email).toBe('test@test.com');
  });

  it('get user by id', async () => {
    const res = await request(app)
      .get('/api/users/5')
      .set('Authorization', token);
    expect(res.status).toBe(200);
    expect(res.body.data.email).toEqual('test@test.com');
  });

  it('get all users', async () => {
    const res = await request(app)
      .get('/api/users')
      .set('Authorization', token);
    expect(res.status).toBe(200);
    expect(res.body.data.users).toBeDefined();
  });
});
