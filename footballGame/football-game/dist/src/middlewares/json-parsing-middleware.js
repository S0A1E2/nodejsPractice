"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonPrsingMiddleware = void 0;
function jsonPrsingMiddleware(err, req, res, next) {
    if (err instanceof SyntaxError && 'body' in err) {
        res.status(400).send('Invalid JSON');
    }
    else {
        next();
    }
}
exports.jsonPrsingMiddleware = jsonPrsingMiddleware;
//# sourceMappingURL=json-parsing-middleware.js.map