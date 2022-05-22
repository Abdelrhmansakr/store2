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
const product_model_1 = __importDefault(require("../../models/product.model"));
const productModel = new product_model_1.default();
describe('Product Model', () => {
    describe('Test methods exists', () => {
        it('should have an Get Many products method', () => {
            expect(productModel.index).toBeDefined();
        });
        it('should have a Get One product method', () => {
            expect(productModel.Show).toBeDefined();
        });
        it('should have a Create product method', () => {
            expect(productModel.create).toBeDefined();
        });
    });
    describe('add test product in Frist', () => {
        const product = {
            name: 'car',
            price: 231111,
            category: 'carss',
        };
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const createdproduct = yield productModel.create(product);
            product.id = createdproduct.id;
        }));
        it('Create New product', () => __awaiter(void 0, void 0, void 0, function* () {
            const createdproduct = yield productModel.create({
                name: 'phone',
                price: 3500,
                category: 'tech',
            });
            expect(createdproduct).toEqual({
                id: createdproduct.id,
                name: createdproduct.name,
                price: createdproduct.price,
                category: createdproduct.category,
                created_at: createdproduct.created_at,
                updated_at: createdproduct.updated_at,
            });
        }));
        //or expect(createdproduct.email).toEqual('abdelrhman');
        it('Get all product ', () => __awaiter(void 0, void 0, void 0, function* () {
            const products = yield productModel.index();
            expect(products.length).toBe(4);
        }));
        it('Get one product by id ', () => __awaiter(void 0, void 0, void 0, function* () {
            const returnedUser = yield productModel.Show(product.id);
            expect(returnedUser.id).toBe(product.id);
            expect(returnedUser.name).toBe(product.name);
        }));
    });
});
