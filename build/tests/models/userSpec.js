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
const user_model_1 = __importDefault(require("../../models/user.model"));
const userModel = new user_model_1.default();
describe('User Model', () => {
    describe('Test methods exists', () => {
        it('should have an Get Many Users method', () => {
            expect(userModel.index).toBeDefined();
        });
        it('should have a Get One User method', () => {
            expect(userModel.Show).toBeDefined();
        });
        it('should have a Create User method', () => {
            expect(userModel.create).toBeDefined();
        });
        it('should have an Authenticate User method', () => {
            expect(userModel.authenticate).toBeDefined();
        });
    });
    describe('add test user in Frist', () => {
        const user = {
            email: 'test@test.com',
            password: '1234',
        };
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const createdUser = yield userModel.create(user);
            user.id = createdUser.id;
        }));
        it('Create New User', () => __awaiter(void 0, void 0, void 0, function* () {
            const createdUser = yield userModel.create({
                email: 'test@test.com',
                password: '1234',
            });
            expect(createdUser).toEqual({
                id: createdUser.id,
                email: 'test@test.com',
                password: createdUser.password,
            });
        }));
        //or expect(createdUser.email).toEqual('abdelrhman');
        it('Get all users ', () => __awaiter(void 0, void 0, void 0, function* () {
            const users = yield userModel.index();
            expect(users.length).toBe(5);
        }));
        it('Get one user by id ', () => __awaiter(void 0, void 0, void 0, function* () {
            const returnedUser = yield userModel.Show(user.id);
            expect(returnedUser.id).toBe(user.id);
            expect(returnedUser.email).toBe(user.email);
        }));
        it('Authenticate return authenticated user', () => __awaiter(void 0, void 0, void 0, function* () {
            const authenticatedUser = yield userModel.authenticate(user.email, user.password);
            expect(authenticatedUser === null || authenticatedUser === void 0 ? void 0 : authenticatedUser.email).toBe(user.email);
        }));
        it('Authenticate return null for error in info user', () => __awaiter(void 0, void 0, void 0, function* () {
            const authenticatedUser = yield userModel.authenticate('asfsagdhgsd', 'asfdgasfs');
            expect(authenticatedUser).toBe(null);
        }));
    });
});
