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
const order_model_1 = __importDefault(require("../../models/order.model"));
const product_model_1 = __importDefault(require("../../models/product.model"));
const user_model_1 = __importDefault(require("../../models/user.model"));
let order;
const orderModel = new order_model_1.default();
const productModel = new product_model_1.default();
const userModel = new user_model_1.default();
describe('Order Model', () => {
    describe('Test methods exists', () => {
        it('should have an index By Id User method', () => {
            expect(orderModel.indexByIdUser).toBeDefined();
        });
        it('should have a Get One Order method', () => {
            expect(orderModel.showByIdOrder).toBeDefined();
        });
        it('should have a Create Order method', () => {
            expect(orderModel.create).toBeDefined();
        });
    });
    describe('add test Order in Frist', () => {
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const product = {
                name: 'carr',
                price: 231111,
                category: 'carsss',
            };
            const createdproduct = yield productModel.create(product);
            const user = {
                email: 'test@test.com',
                password: '1234',
            };
            const createdUser = yield userModel.create(user);
            order = {
                user_id: createdUser.id,
                products: [
                    {
                        product_id: createdproduct.id,
                        quantity: 5,
                    },
                ],
            };
        }));
        it('Create New order', () => __awaiter(void 0, void 0, void 0, function* () {
            const createdorder = yield orderModel.create(order);
            expect(createdorder).toEqual({
                id: createdorder.id,
                user_id: createdorder.user_id,
                products: createdorder.products,
                status: createdorder.status,
                created_at: createdorder.created_at,
                updated_at: createdorder.updated_at,
            });
        }));
        //or expect(createdproduct.email).toEqual('abdelrhman');
        it('Get one orders by id user', () => __awaiter(void 0, void 0, void 0, function* () {
            const orders = orderModel.indexByIdUser(order.user_id);
            expect(orders).toBeDefined();
        }));
        it('Get one orders by id Order', () => __awaiter(void 0, void 0, void 0, function* () {
            const orders = yield orderModel.showByIdOrder(order.id);
            expect(orders).toBeDefined();
        }));
    });
});
