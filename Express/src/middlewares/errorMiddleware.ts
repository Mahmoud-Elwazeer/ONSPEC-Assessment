// Global error Handling middleware
import 'dotenv/config'
import { Request, Response, NextFunction } from 'express'

export const globalError = (err: any, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500; 
    err.status = err.status || 'error';

    if (err.name === "PrismaClientKnownRequestError" && err.code === 'P2002') return sendErrorDublicate(err, res)

    if (process.env.NODE_ENV === 'dev') {
        sendErrorForDev(err ,res)
    } else {
        sendError(err, res)
    }
}

const sendErrorForDev = (err: any, res: Response) => {
    console.error(`Error: status: ${err.statusCode} -> message: ${err.message}`)
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        // stack: err.stack,
        });
    }

const sendError = (err: any, res: Response) => {
    console.error(`Error: status: ${err.statusCode} -> message: ${err.message}`)
    res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    });
}

const sendErrorDublicate = (err: any, res: Response) => {
    console.error(`Error: status: ${err.statusCode} -> message: ${err.message}`)
    res.status(err.statusCode).json({
        status: err.status,
        message: `${err.meta.target.join(', ')} already exists`,
    });
}

