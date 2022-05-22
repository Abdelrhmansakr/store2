import { Router, Request, Response } from 'express';
import authmidel from '../midel/authenticatem';
import * as conrolU from '../controllers/users.controllers';
import * as conrolP from '../controllers/product.controllers';
import * as conrolo from '../controllers/order.controller';

const routes = Router();
//users
routes.route('/users').post(conrolU.create).get(authmidel, conrolU.index);
routes.route('/users/:id').get(authmidel, conrolU.Show);
//products
routes.route('/product').post(conrolP.create).get(authmidel, conrolP.index);
routes.route('/product/:id').get(authmidel, conrolP.Show);
//order
routes.get('/orderu/:userId', authmidel, conrolo.indexByIdUser);
routes.get('/orders/:ordersId', authmidel, conrolo.showByIdOrder);
routes.post('/order', authmidel, conrolo.create);
//orders_products

// authentication
routes.route('/auth').post(conrolU.authenticate);

routes.get('/', (_req: Request, res: Response): void => {
  try {
    res.send('this Home2');
  } catch (merror) {
    throw new Error(`Ops error in home 2 api:${merror}`);
  }
});
export default routes;
