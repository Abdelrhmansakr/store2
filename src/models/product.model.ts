import product from '../types/product';
import db from '../database';

export class ProductModel {
  //create
  async create(p: product): Promise<product> {
    try {
      const conn = await db.connect();
      const sql = `insert into products(name, price,category)
      VALUES($1,$2,$3) returning *`;
      const result = await conn.query(sql, [p.name, p.price, p.category]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`unable to create ${p.name}:${(err as Error).message}`);
    }
  }
  //get info users
  async index(): Promise<product[]> {
    try {
      const conn = await db.connect();
      const sql = `select * from products ORDER BY price ASC`; //without
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Error at retrieving products ${(err as Error).message}`);
    }
  }

  // get specific user
  async Show(id: string): Promise<product> {
    try {
      const sql = `SELECT * FROM products 
      WHERE id=($1)`;
      const connection = await db.connect();
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not find user ${id}, ${(error as Error).message}`);
    }
  }
}
export default ProductModel;
