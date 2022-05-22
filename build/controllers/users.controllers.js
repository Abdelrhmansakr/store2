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
exports.authenticate = exports.Show = exports.index = exports.create = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const config_1 = __importDefault(require("../config"));
const userModel = new user_model_1.default();
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel.create(req.body);
        const token = jsonwebtoken_1.default.sign({ user }, config_1.default.token);
        res.json({
            status: 'success',
            data: Object.assign(Object.assign({}, user), { token }),
            message: 'User created successfully',
        });
    }
    catch (err) {
        next(err);
    }
});
exports.create = create;
const index = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel.index();
        res.json({
            status: 'success',
            data: { users },
            mess: 'nice you get users',
        });
    }
    catch (err) {
        next(err);
    }
});
exports.index = index;
const Show = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel.Show(req.params.id);
        res.json({
            status: 'success',
            data: user,
            mess: 'nice you get info user',
        });
    }
    catch (err) {
        next(err);
    }
});
exports.Show = Show;
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userModel.authenticate(email, password);
        const token = jsonwebtoken_1.default.sign({ user }, config_1.default.token);
        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'the username and password do not match please try again',
            });
        }
        return res.json({
            status: 'success',
            data: Object.assign(Object.assign({}, user), { token }),
            message: 'user authenticated successfully',
        });
    }
    catch (err) {
        return next(err);
    }
});
exports.authenticate = authenticate;
