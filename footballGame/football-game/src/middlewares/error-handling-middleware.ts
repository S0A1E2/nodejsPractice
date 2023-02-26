import { Request, Response, NextFunction } from "express";

export function errorHandlingMiddleware(err: any, req: Request, res: Response, next: NextFunction): void {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
}