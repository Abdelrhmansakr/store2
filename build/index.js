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
const express_1 = __importDefault(require("express"));
const supertest_1 = __importDefault(require("supertest"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const routes_1 = __importDefault(require("./routes"));
const errorm_1 = __importDefault(require("./midel/errorm"));
const config_1 = __importDefault(require("./config"));
const database_1 = __importDefault(require("./database"));
const port = config_1.default.port || 3000;
const app = (0, express_1.default)();
const reqs = (0, supertest_1.default)(app);
//for use json in app.post
app.use(express_1.default.json());
//find error
app.use(errorm_1.default);
//connection---------------------------------------------------------------
app.get('/', (req, res) => {
    try {
        res.send('this Home1');
        // res.json('this Home jsoonn');
    }
    catch (merror) {
        throw new Error(`a7oooo 3mlt eh ia menaillll:${merror}`);
    }
});
app.listen(port, () => {
    console.log(`server started at localhost:${port}`);
});
app.post('/', (req, res) => {
    console.log(req.body);
    res.json({
        m: 'hi ',
        data: req.body,
    });
});
//---------------------------------------------------------------
//security connection express
app.use((0, morgan_1.default)('common'));
app.use((0, helmet_1.default)());
//3dad mrat el get or login try agine
app.use((0, express_rate_limit_1.default)({
    windowMs: 2 * 1000,
    max: 11,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'try agine later a7a',
}));
//info for server conn
const x = () => __awaiter(void 0, void 0, void 0, function* () {
    const Responsee = (yield reqs.get('/')).headers;
    console.log(Responsee);
});
//x()
//test database
database_1.default.connect().then((client) => {
    return client
        .query('SELECT NOW()')
        .then((res) => {
        client.release();
        console.log(res.rows);
    })
        .catch((err) => {
        client.release();
        console.log(err.stack);
    });
});
//---------------------#code#---------------------
app.use('/api', routes_1.default);
//----------------------code---------------------
//no page
app.use((_req, res) => {
    res.status(404).json({
        message: 'ops you are lost, nothing here',
    });
});
exports.default = app;
