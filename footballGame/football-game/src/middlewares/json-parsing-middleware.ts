import { Request, Response, NextFunction } from "express";

export function jsonPrsingMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
    if(err instanceof SyntaxError && 'body' in err) {
        res.status(400).send('Invalid JSON');
    } else {
        next();
    }
}