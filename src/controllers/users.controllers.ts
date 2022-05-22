import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model';
import config from '../config';

const userModel = new UserModel();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.create(req.body);
    const token = jwt.sign({ user }, config.token as unknown as string);
    res.json({
      status: 'success',
      data: { ...user, token },
      message: 'User created successfully',
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
    const users = await userModel.index();
    res.json({
      status: 'success',
      data: { users },
      mess: 'nice you get users',
    });
  } catch (err) {
    next(err);
  }
};

export const Show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.Show(req.params.id as unknown as string);
    res.json({
      status: 'success',
      data: user,
      mess: 'nice you get info user',
    });
  } catch (err) {
    next(err);
  }
};

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.authenticate(email, password);
    const token = jwt.sign({ user }, config.token as unknown as string);
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'the username and password do not match please try again',
      });
    }
    return res.json({
      status: 'success',
      data: { ...user, token },
      message: 'user authenticated successfully',
    });
  } catch (err) {
    return next(err);
  }
};
