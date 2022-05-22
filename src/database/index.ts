import { Pool } from 'pg';
import config from '../config';

const conn = new Pool({
  host: config.host,
  database: config.database,
  user: config.user,
  password: config.password,
  port: parseInt(config.dbport as string, 10),
});
conn.on('error', (error: Error) => {
  console.log(error.message);
});
export default conn;
