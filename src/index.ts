import express, { Request, Response } from 'express';
import supertest from 'supertest';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import routes from './routes';

import merror from './midel/errorm';
import config from './config';
import db from './database';

const port = config.port || 3000;
const app = express();
const reqs = supertest(app);
//for use json in app.post
app.use(express.json());
//find error
app.use(merror);

//connection---------------------------------------------------------------
app.get('/', (req: Request, res: Response): void => {
  try {
    res.send('this Home1');
    // res.json('this Home jsoonn');
  } catch (merror) {
    throw new Error(`a7oooo 3mlt eh ia menaillll:${merror}`);
  }
});
app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});
app.post('/', (req: Request, res: Response): void => {
  console.log(req.body);
  res.json({
    m: 'hi ',
    data: req.body,
  });
});
//---------------------------------------------------------------

//security connection express
app.use(morgan('common'));
app.use(helmet());

//3dad mrat el get or login try agine
app.use(
  rateLimit({
    windowMs: 2 * 1000, //2s
    max: 11,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'try agine later a7a',
  })
);

//info for server conn
const x = async () => {
  const Responsee = (await reqs.get('/')).headers;
  console.log(Responsee);
};
//x()
//test database
db.connect().then((client) => {
  return client
    .query('SELECT NOW()')
    .then((res) => {
      client.release();
      console.log(res.rows);
    })
    .catch((err) => {
      client.release();
      console.log(err.stack);
    });
});
//---------------------#code#---------------------
app.use('/api', routes);

//----------------------code---------------------

//no page
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    message: 'ops you are lost, nothing here',
  });
});

export default app;
