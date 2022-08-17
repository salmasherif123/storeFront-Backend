"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const users_1 = require("./handlers/users");
const products_1 = require("./handlers/products");
const orders_1 = require("./handlers/orders");
const port = 3000;
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.send('Hello');
});
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
app.use(body_parser_1.default.json());
(0, products_1.productsRoutes)(app);
(0, users_1.userRoutes)(app);
(0, orders_1.ordersRoutes)(app);
exports.default = app;
