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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../index"));
let order;
let token;
let userid;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, supertest_1.default)(index_1.default)
        .post('/api/users/')
        .send({
        email: 'test@test.com',
        password: '1234',
    });
    token = res.body.data.token;
    userid = res.body.data.id;
    const resa = yield (0, supertest_1.default)(index_1.default)
        .post('/api/product/')
        .send({
        name: 'phone',
        price: 3333,
        category: 'techh',
    });
    order = {
        user_id: userid,
        products: [
            {
                product_id: resa.body.product.id,
                quantity: 5,
            },
        ],
    };
}));
describe('Order Route Test', () => {
    it('create order', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .post('/api/order')
            .set('Authorization', token)
            .send(order)
            .expect(200);
        expect(res.body.data).toBeDefined();
    }));
    it('get order by order id', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .get('/api/orders/1')
            .set('Authorization', token)
            .expect(200);
        expect(res.body.data.order).toBeDefined();
    }));
    it('gel all orders by user id', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .get(`/api/orderu/${userid}`)
            .set('Authorization', token)
            .expect(200);
        expect(res.body.data.orders).toBeDefined();
    }));
});
