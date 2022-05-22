import { Request, Response, NextFunction } from 'express';
import OrderModel from '../models/order.model';

const orderModel = new OrderModel();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await orderModel.create({ ...req.body });
    res.json({
      status: 'success',
      data: { order },
      mess: 'nice you create new order',
    });
  } catch (err) {
    next(err);
  }
};

export const indexByIdUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await orderModel.indexByIdUser(req.params.userId);
    res.json({
      status: 'success',
      data: { orders },
      message: 'nice get all orders for this user',
    });
  } catch (err) {
    next(err);
  }
};

export const showByIdOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await orderModel.showByIdOrder(req.params.ordersId);
    res.json({
      status: 'success',
      data: { order },
      mess: 'Good you get the order and info for user',
    });
  } catch (err) {
    next(err);
  }
};
