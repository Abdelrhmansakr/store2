"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const merror = (error, req, res, next) => {
    const status = error.status || 500;
    //send default message in index or this message
    const message = error.message || 'oppps somthing error';
    res.status(status).json({ status, message });
};
exports.default = merror;
