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
exports.OrderModel = void 0;
const database_1 = __importDefault(require("../database"));
class OrderModel {
    indexByIdUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const result = yield conn.query('SELECT * FROM orders WHERE user_id = $1', [userId]);
                const order = result.rows;
                const products = [];
                for (let index = 0; index < order.length; index++) {
                    const x = order[index];
                    const order_products = yield conn.query('SELECT product_id, quantity FROM order_products WHERE order_id = $1', [x.id]);
                    products.push(order_products.rows);
                }
                conn.release();
                return Object.assign(Object.assign({}, order), { products: Object.assign({}, products) });
            }
            catch (err) {
                throw new Error('no order by this id');
            }
        });
    }
    create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            const { products, user_id } = order;
            try {
                const conn = yield database_1.default.connect();
                const result = yield conn.query('INSERT INTO orders (user_id) VALUES($1) RETURNING *', [user_id]);
                const order = result.rows[0];
                const order_products = [];
                for (let index = 0; index < products.length; index++) {
                    const x = products[index];
                    const orderp = yield conn.query('INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING product_id, quantity;', [order.id, x.product_id, x.quantity]);
                    order_products.push(orderp.rows[0]);
                }
                conn.release();
                return Object.assign(Object.assign({}, order), { products: order_products });
            }
            catch (err) {
                throw new Error('no order added');
            }
        });
    }
    showByIdOrder(ordersId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const result = yield conn.query('SELECT * FROM orders WHERE id = $1', [
                    ordersId,
                ]);
                const order = result.rows[0];
                const order_products = yield conn.query('SELECT product_id, quantity FROM order_products WHERE order_id = $1', [ordersId]);
                conn.release();
                return Object.assign(Object.assign({}, order), { products: order_products.rows });
            }
            catch (err) {
                throw new Error('Order is not exist');
            }
        });
    }
}
exports.OrderModel = OrderModel;
exports.default = OrderModel;
