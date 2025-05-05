import {  NextFunction, Request, Response } from "express";
import ApiError from '../utils/apiError'
import { candidateRoutes } from './candidate'


export const handleRoutes = (app: any) => {
    app.get('/', (_: Request, res: Response) => res.json({ message: 'welcome to ONSPEC-Assessment' }));
    app.use('/api/v1/candidates', candidateRoutes);

    app.all('*', (req: Request, res: Response, next: NextFunction) => {
        next(new ApiError(`Can't find this route ${req.originalUrl}`, 404))
    })
}
