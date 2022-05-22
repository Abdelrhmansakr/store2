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
let token;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, supertest_1.default)(index_1.default)
        .post('/api/users/')
        .send({
        email: 'test@test.com',
        password: '1234',
    });
    token = res.body.data.token;
}));
describe('Product route api Test', () => {
    it('should create new Product', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .post('/api/product/')
            .send({
            price: 422211,
            name: 'car',
            category: 'cars',
        });
        expect(res.status).toBe(200);
        expect(res.body.product.name).toEqual('car');
    }));
    it('get product by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .get('/api/product/5')
            .set('Authorization', token);
        expect(res.status).toBe(200);
        expect(res.body.product.name).toEqual('car');
    }));
    it('get all Product', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .get('/api/product')
            .set('Authorization', token);
        expect(res.status).toBe(200);
        expect(res.body.data.products).toBeDefined();
    }));
});
