"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showByIdOrder = exports.indexByIdUser = exports.create = void 0;
const order_model_1 = __importDefault(require("../models/order.model"));
const orderModel = new order_model_1.default();
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield orderModel.create(Object.assign({}, req.body));
        res.json({
            status: 'success',
            data: { order },
            mess: 'nice you create new order',
        });
    }
    catch (err) {
        next(err);
    }
});
exports.create = create;
const indexByIdUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield orderModel.indexByIdUser(req.params.userId);
        res.json({
            status: 'success',
            data: { orders },
            message: 'nice get all orders for this user',
        });
    }
    catch (err) {
        next(err);
    }
});
exports.indexByIdUser = indexByIdUser;
const showByIdOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield orderModel.showByIdOrder(req.params.ordersId);
        res.json({
            status: 'success',
            data: { order },
            mess: 'Good you get the order and info for user',
        });
    }
    catch (err) {
        next(err);
    }
});
exports.showByIdOrder = showByIdOrder;
