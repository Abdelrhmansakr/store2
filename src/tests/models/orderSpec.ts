import OrderModel from '../../models/order.model';
import ProductModel from '../../models/product.model';
import UserModel from '../../models/user.model';
import db from '../../database';
import product from '../../types/product';
import user from '../../types/usert';
import { orders } from '../../types/order';
let order: orders;
const orderModel = new OrderModel();
const productModel = new ProductModel();
const userModel = new UserModel();

describe('Order Model', () => {
  describe('Test methods exists', () => {
    it('should have an index By Id User method', () => {
      expect(orderModel.indexByIdUser).toBeDefined();
    });

    it('should have a Get One Order method', () => {
      expect(orderModel.showByIdOrder).toBeDefined();
    });

    it('should have a Create Order method', () => {
      expect(orderModel.create).toBeDefined();
    });
  });
  describe('add test Order in Frist', () => {
    beforeAll(async () => {
      const product = {
        name: 'carr',
        price: 231111,
        category: 'carsss',
      } as product;
      const createdproduct = await productModel.create(product);
      const user = {
        email: 'test@test.com',
        password: '1234',
      } as user;
      const createdUser = await userModel.create(user);
      order = {
        user_id: createdUser.id as unknown as number,
        products: [
          {
            product_id: createdproduct.id as unknown as number,
            quantity: 5,
          },
        ],
      };
    });

    it('Create New order', async () => {
      const createdorder = await orderModel.create(order);
      expect(createdorder).toEqual({
        id: createdorder.id,
        user_id: createdorder.user_id,
        products: createdorder.products,
        status: createdorder.status,
        created_at: createdorder.created_at,
        updated_at: createdorder.updated_at,
      } as orders);
    });
    //or expect(createdproduct.email).toEqual('abdelrhman');

    it('Get one orders by id user', async () => {
      const orders = orderModel.indexByIdUser(
        order.user_id as unknown as string
      );
      expect(orders).toBeDefined();
    });

    it('Get one orders by id Order', async () => {
      const orders = await orderModel.showByIdOrder(
        order.id as unknown as string
      );
      expect(orders).toBeDefined();
    });
  });
});
