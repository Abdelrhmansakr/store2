import { Request, Response, NextFunction } from 'express';
import Error from '../interface/erorri';
const merror = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.status || 500;
  //send default message in index or this message
  const message = error.message || 'oppps somthing error';
  res.status(status).json({ status, message });
};
export default merror;
