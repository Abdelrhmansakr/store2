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
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../config"));
const hash = (password) => {
    const salt = parseInt(config_1.default.salt, 10);
    return bcrypt_1.default.hashSync(`${password}${config_1.default.pepper}`, salt);
};
class UserModel {
    //create
    create(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `insert into users(email,password)
      values($1,$2) returning id,email,password`;
                const result = yield conn.query(sql, [
                    u.email,
                    hash(u.password),
                ]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`unable to create ${u.email}:${err.message}`);
            }
        });
    }
    //get info users
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `select * from users`; //without
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Error at retrieving users ${err.message}`);
            }
        });
    }
    // get specific user
    Show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `SELECT id, email, password FROM users 
      WHERE id=($1)`;
                const connection = yield database_1.default.connect();
                const result = yield connection.query(sql, [id]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Could not find user ${id}, ${error.message}`);
            }
        });
    }
    //login
    authenticate(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'SELECT password FROM users WHERE email=$1';
                const result = yield connection.query(sql, [email]);
                if (result.rows.length) {
                    const { password: hashPassword } = result.rows[0];
                    const isPasswordValid = bcrypt_1.default.compareSync(`${password}${config_1.default.pepper}`, hashPassword);
                    if (isPasswordValid) {
                        const userInfo = yield connection.query('SELECT id, email FROM users WHERE email=($1)', [email]);
                        return userInfo.rows[0];
                    }
                }
                connection.release();
                return null;
            }
            catch (error) {
                throw new Error(`Unable to login: ${error.message}`);
            }
        });
    }
}
exports.default = UserModel;
