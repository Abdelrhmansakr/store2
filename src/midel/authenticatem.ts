import { Request, Response, NextFunction, json } from 'express';
import config from '../config';
import Error from '../interface/erorri';
import jwt from 'jsonwebtoken';

const handleUnauthorizedError = (next: NextFunction) => {
  const error: Error = new Error('Login Error, Please login again');
  error.status = 401;
  next(error);
};

const authmidel = (req: Request, res: Response, next: NextFunction) => {
  try {
    // const authHeader = req.header('Authorization');
    // console.log(authHeader);
    // res.json({
    //   token: authHeader,
    // });

    // const authHeader = req.header('Authorization');
    // console.log('1' + authHeader);
    // if (authHeader) {
    //   const beare = authHeader.split(' ')[0].toLowerCase();
    //   console.log('2' + beare);
    //   const token = authHeader.split(' ')[1];
    //   console.log('3' + token);
    //   const x =
    //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMTYxZjg1NWMtYWZkMS00MjQ2LWE4NGYtOWU3Y2Q3MmRmZjA1In0sImlhdCI6MTY1MjA1NzU0N30.5KdmscQaB-9nFOe0-6gNfujtTptYOrue3HmRWd0nYEY';
    //   const decode = jwt.verify(
    //     authHeader as string,
    //     config.token as unknown as string
    //   );
    //   console.log(decode);
    //   next();
    // } else {
    //   // No Token Provided.
    //   handleUnauthorizedError(next);
    // }

    const authHeader = req.header('Authorization');
    const decod = jwt.verify(String(authHeader), config.token as string);
    if (!decod || !authHeader) {
      return handleUnauthorizedError(next);
    }
    next();
  } catch (err) {
    handleUnauthorizedError(next);
  }
};

export default authmidel;
