import { Request, Response, NextFunction } from 'express';
import * as candidateServices from './../services/candidate';
import * as daoLayer from '../daoLayer/candidate';
import asyncHandler from 'express-async-handler'
import ApiError from '../utils/apiError';


// @desc Create a new candidate if the email doesn't exist.
// OR Update the candidate record if the email already exists.
// @route POST /api/v1/candidates
export const create = asyncHandler(async(req: any, res: Response, next: NextFunction) => {
    const candidate = await candidateServices.newCandidate(req);
    res.status(201).json({message: 'Candidate added successfully', candidate});
});

export const getOne = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    const { candidateId } = req.params;
    const candidate = await daoLayer.getOne(candidateId);
    if (!candidate) {
        throw new ApiError('Candidate not found', 404);
    }
    res.status(200).json({message: 'Candidate Retrieved successfully', candidate});
})

export const getAll = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    const candidates = await daoLayer.getAll();
    res.status(200).json({message: 'Candidates Retrieved successfully', candidates});
})

export const update = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    const { candidateId } = req.params;
    const candidate = await daoLayer.update(candidateId, req.body);
    res.status(200).json({message: 'Candidate Updated successfully', candidate});
})

export const deleteOne = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    const { candidateId } = req.params;
    const candidate = await daoLayer.deleteOne(candidateId);
    if (!candidate) {
        throw new ApiError('Candidate not found', 404);
    }
    res.status(204).json({message: 'Candidate Deleted successfully', candidate});
})
