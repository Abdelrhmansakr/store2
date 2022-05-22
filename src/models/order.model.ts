import db from '../database';
import { orders } from '../types/order';

export class OrderModel {
  async indexByIdUser(userId: string) {
    try {
      const conn = await db.connect();
      const result = await conn.query(
        'SELECT * FROM orders WHERE user_id = $1',
        [userId]
      );
      const order = result.rows;
      const products = [];

      for (let index = 0; index < order.length; index++) {
        const x = order[index];
        const order_products = await conn.query(
          'SELECT product_id, quantity FROM order_products WHERE order_id = $1',
          [x.id]
        );
        products.push(order_products.rows);
      }

      conn.release();
      return { ...order, products: { ...products } };
    } catch (err) {
      throw new Error('no order by this id');
    }
  }

  async create(order: orders) {
    const { products, user_id } = order;
    try {
      const conn = await db.connect();
      const result = await conn.query(
        'INSERT INTO orders (user_id) VALUES($1) RETURNING *',
        [user_id]
      );
      const order = result.rows[0];
      const order_products = [];
      for (let index = 0; index < products.length; index++) {
        const x = products[index];
        const orderp = await conn.query(
          'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING product_id, quantity;',
          [order.id, x.product_id, x.quantity]
        );
        order_products.push(orderp.rows[0]);
      }
      conn.release();
      return {
        ...order,
        products: order_products,
      };
    } catch (err) {
      throw new Error('no order added');
    }
  }

  async showByIdOrder(ordersId: string) {
    try {
      const conn = await db.connect();
      const result = await conn.query('SELECT * FROM orders WHERE id = $1', [
        ordersId,
      ]);
      const order = result.rows[0];
      const order_products = await conn.query(
        'SELECT product_id, quantity FROM order_products WHERE order_id = $1',
        [ordersId]
      );
      conn.release();
      return {
        ...order,
        products: order_products.rows,
      };
    } catch (err) {
      throw new Error('Order is not exist');
    }
  }
}
export default OrderModel;
