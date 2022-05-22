import { Request, Response, NextFunction } from 'express';
import ProductModel from '../models/product.model';

const productModel = new ProductModel();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await productModel.create(req.body);
    res.json({
      status: 'success',
      product: { ...product },
      message: 'nice the product created successfully',
    });
  } catch (err) {
    next(err);
  }
};

export const Show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productModel.Show(req.params.id as unknown as string);
    res.json({
      status: 'success',
      product: { ...product },
      mess: 'nice you get info product',
    });
  } catch (err) {
    next(err);
  }
};

export const index = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await productModel.index();
    res.json({
      status: 'success',
      data: { products },
      mess: 'nice you get products',
    });
  } catch (err) {
    next(err);
  }
};
