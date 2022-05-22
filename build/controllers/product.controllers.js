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
exports.index = exports.Show = exports.create = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const productModel = new product_model_1.default();
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productModel.create(req.body);
        res.json({
            status: 'success',
            product: Object.assign({}, product),
            message: 'nice the product created successfully',
        });
    }
    catch (err) {
        next(err);
    }
});
exports.create = create;
const Show = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productModel.Show(req.params.id);
        res.json({
            status: 'success',
            product: Object.assign({}, product),
            mess: 'nice you get info product',
        });
    }
    catch (err) {
        next(err);
    }
});
exports.Show = Show;
const index = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productModel.index();
        res.json({
            status: 'success',
            data: { products },
            mess: 'nice you get products',
        });
    }
    catch (err) {
        next(err);
    }
});
exports.index = index;
