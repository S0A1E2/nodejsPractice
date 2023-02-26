"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logging_middleware_1 = require("./middlewares/logging-middleware");
const error_handling_middleware_1 = require("./middlewares/error-handling-middleware");
const json_parsing_middleware_1 = require("./middlewares/json-parsing-middleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(logging_middleware_1.loggingMiddleware);
app.use(json_parsing_middleware_1.jsonPrsingMiddleware);
app.get('/', (req, res) => {
    res.send('hello world');
});
app.use(error_handling_middleware_1.errorHandlingMiddleware);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
//# sourceMappingURL=app.js.map