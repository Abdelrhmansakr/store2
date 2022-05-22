import request from 'supertest';
import app from '../../index';
import product from '../../types/product';
import user from '../../types/usert';
import { orders } from '../../types/order';
let order: orders;
let token: string;
let userid: string;

beforeAll(async () => {
  const res = await request(app)
    .post('/api/users/')
    .send({
      email: 'test@test.com',
      password: '1234',
    } as user);
  token = res.body.data.token;
  userid = res.body.data.id;
  const resa = await request(app)
    .post('/api/product/')
    .send({
      name: 'phone',
      price: 3333,
      category: 'techh',
    } as product);

  order = {
    user_id: userid as unknown as number,
    products: [
      {
        product_id: resa.body.product.id,
        quantity: 5,
      },
    ],
  };
});

describe('Order Route Test', () => {
  it('create order', async () => {
    const res = await request(app)
      .post('/api/order')
      .set('Authorization', token)
      .send(order)
      .expect(200);
    expect(res.body.data).toBeDefined();
  });

  it('get order by order id', async () => {
    const res = await request(app)
      .get('/api/orders/1')
      .set('Authorization', token)
      .expect(200);
    expect(res.body.data.order).toBeDefined();
  });

  it('gel all orders by user id', async () => {
    const res = await request(app)
      .get(`/api/orderu/${userid}`)
      .set('Authorization', token)
      .expect(200);
    expect(res.body.data.orders).toBeDefined();
  });
});
