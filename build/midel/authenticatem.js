"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const handleUnauthorizedError = (next) => {
    const error = new Error('Login Error, Please login again');
    error.status = 401;
    next(error);
};
const authmidel = (req, res, next) => {
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
        const decod = jsonwebtoken_1.default.verify(String(authHeader), config_1.default.token);
        if (!decod || !authHeader) {
            return handleUnauthorizedError(next);
        }
        next();
    }
    catch (err) {
        handleUnauthorizedError(next);
    }
};
exports.default = authmidel;
