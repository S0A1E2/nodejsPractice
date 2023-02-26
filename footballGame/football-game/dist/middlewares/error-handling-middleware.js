"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlingMiddleware = void 0;
function errorHandlingMiddleware(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
}
exports.errorHandlingMiddleware = errorHandlingMiddleware;
//# sourceMappingURL=error-handling-middleware.js.map