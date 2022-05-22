import request from 'supertest';
import app from '../../index';
import product from '../../types/product';
import user from '../../types/usert';

let token: string;

beforeAll(async () => {
  const res = await request(app)
    .post('/api/users/')
    .send({
      email: 'test@test.com',
      password: '1234',
    } as user);
  token = res.body.data.token;
});

describe('Product route api Test', () => {
  it('should create new Product', async () => {
    const res = await request(app)
      .post('/api/product/')
      .send({
        price: 422211,
        name: 'car',
        category: 'cars',
      } as product);
    expect(res.status).toBe(200);
    expect(res.body.product.name).toEqual('car');
  });

  it('get product by id', async () => {
    const res = await request(app)
      .get('/api/product/5')
      .set('Authorization', token);
    expect(res.status).toBe(200);
    expect(res.body.product.name).toEqual('car');
  });

  it('get all Product', async () => {
    const res = await request(app)
      .get('/api/product')
      .set('Authorization', token);
    expect(res.status).toBe(200);
    expect(res.body.data.products).toBeDefined();
  });
});
