import db from '../../database';
import product from '../../types/product';
import ProductModel from '../../models/product.model';

const productModel = new ProductModel();

describe('Product Model', () => {
  describe('Test methods exists', () => {
    it('should have an Get Many products method', () => {
      expect(productModel.index).toBeDefined();
    });

    it('should have a Get One product method', () => {
      expect(productModel.Show).toBeDefined();
    });

    it('should have a Create product method', () => {
      expect(productModel.create).toBeDefined();
    });
  });

  describe('add test product in Frist', () => {
    const product = {
      name: 'car',
      price: 231111,
      category: 'carss',
    } as product;

    beforeAll(async () => {
      const createdproduct = await productModel.create(product);
      product.id = createdproduct.id;
    });

    it('Create New product', async () => {
      const createdproduct = await productModel.create({
        name: 'phone',
        price: 3500,
        category: 'tech',
      } as product);
      expect(createdproduct).toEqual({
        id: createdproduct.id,
        name: createdproduct.name,
        price: createdproduct.price,
        category: createdproduct.category,
        created_at: createdproduct.created_at,
        updated_at: createdproduct.updated_at,
      } as product);
    });
    //or expect(createdproduct.email).toEqual('abdelrhman');

    it('Get all product ', async () => {
      const products = await productModel.index();
      expect(products.length).toBe(4);
    });

    it('Get one product by id ', async () => {
      const returnedUser = await productModel.Show(
        product.id as unknown as string
      );
      expect(returnedUser.id).toBe(product.id);
      expect(returnedUser.name).toBe(product.name);
    });
  });
});
