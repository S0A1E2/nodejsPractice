import { Request, Response, NextFunction } from "express";
import winston from 'winston';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple(),
            ),
        }),
    ],
});

export function loggingMiddleware(req: Request, res: Response, next: NextFunction): void {
    const logEntry = {method: req.method, url: req.url, timestamp: new Date()};
    logger.info(logEntry);
    next();
}