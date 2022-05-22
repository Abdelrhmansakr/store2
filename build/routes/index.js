"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticatem_1 = __importDefault(require("../midel/authenticatem"));
const conrolU = __importStar(require("../controllers/users.controllers"));
const conrolP = __importStar(require("../controllers/product.controllers"));
const conrolo = __importStar(require("../controllers/order.controller"));
const routes = (0, express_1.Router)();
//users
routes.route('/users').post(conrolU.create).get(authenticatem_1.default, conrolU.index);
routes.route('/users/:id').get(authenticatem_1.default, conrolU.Show);
//products
routes.route('/product').post(conrolP.create).get(authenticatem_1.default, conrolP.index);
routes.route('/product/:id').get(authenticatem_1.default, conrolP.Show);
//order
routes.get('/orderu/:userId', authenticatem_1.default, conrolo.indexByIdUser);
routes.get('/orders/:ordersId', authenticatem_1.default, conrolo.showByIdOrder);
routes.post('/order', authenticatem_1.default, conrolo.create);
//orders_products
// authentication
routes.route('/auth').post(conrolU.authenticate);
routes.get('/', (_req, res) => {
    try {
        res.send('this Home2');
    }
    catch (merror) {
        throw new Error(`Ops error in home 2 api:${merror}`);
    }
});
exports.default = routes;
