import user from '../types/usert';
import db from '../database';
import bcrypt from 'bcrypt';
import config from '../config';

const hash = (password: string) => {
  const salt = parseInt(config.salt as string, 10);
  return bcrypt.hashSync(`${password}${config.pepper}`, salt);
};
class UserModel {
  //create
  async create(u: user): Promise<user> {
    try {
      const conn = await db.connect();
      const sql = `insert into users(email,password)
      values($1,$2) returning id,email,password`;
      const result = await conn.query(sql, [
        u.email,
        hash(u.password as string),
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`unable to create ${u.email}:${(err as Error).message}`);
    }
  }
  //get info users
  async index(): Promise<user[]> {
    try {
      const conn = await db.connect();
      const sql = `select * from users`; //without
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Error at retrieving users ${(err as Error).message}`);
    }
  }

  // get specific user
  async Show(id: string): Promise<user> {
    try {
      const sql = `SELECT id, email, password FROM users 
      WHERE id=($1)`;
      const connection = await db.connect();
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not find user ${id}, ${(error as Error).message}`);
    }
  }
  //login
  async authenticate(email: string, password: string): Promise<user | null> {
    try {
      const connection = await db.connect();
      const sql = 'SELECT password FROM users WHERE email=$1';
      const result = await connection.query(sql, [email]);
      if (result.rows.length) {
        const { password: hashPassword } = result.rows[0];
        const isPasswordValid = bcrypt.compareSync(
          `${password}${config.pepper}`,
          hashPassword
        );
        if (isPasswordValid) {
          const userInfo = await connection.query(
            'SELECT id, email FROM users WHERE email=($1)',
            [email]
          );
          return userInfo.rows[0];
        }
      }
      connection.release();
      return null;
    } catch (error) {
      throw new Error(`Unable to login: ${(error as Error).message}`);
    }
  }
}
export default UserModel;
