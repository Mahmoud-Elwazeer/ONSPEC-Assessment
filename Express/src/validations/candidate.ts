import { z } from "zod";
import { Response, NextFunction} from 'express'
import asyncHandler from 'express-async-handler'
import ApiError from "../utils/apiError";


const candidateSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    phoneNumber: z.string().min(1, 'Phone number is required'),
    preferredTime: z.string().min(1, 'Preferred time is required'),
    linkedinUrl: z.string().url('Invalid LinkedIn URL'),
    githubUrl: z.string().url('Invalid GitHub URL').optional(),
    comment: z.string().optional(),
});

const candidateByIdSchema = z.object({
    candidateId: z.string().min(1, 'Candidate Id is required'),
});


export const candidateValidator = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const validatedData = candidateSchema.safeParse(req.body);
    if (!validatedData.success) {
        const errors = validatedData.error.errors.map(e => `${e.path[0]} ${e.message}`).join(', ');
        throw new ApiError(`Validation error: ${errors}`, 400);
    }
    req.validatedData = validatedData.data
    next();
});

export const candidateByIdValidator = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const validatedData =  candidateByIdSchema.safeParse({ candidateId: req.params.candidateId });
    if (!validatedData.success) {
        const errors = validatedData.error.errors.map(e => e.message).join(', ');
        throw new ApiError(`Validation error: ${errors}`, 400);
    }
    next();
});

export type Candidate = z.infer<typeof candidateSchema>;


