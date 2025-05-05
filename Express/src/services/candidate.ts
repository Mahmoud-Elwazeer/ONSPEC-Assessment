import ApiError from "../utils/apiError";
import * as daoLayer from '../daoLayer/candidate';
import { getCache, setCache, deleteCache } from '../utils/redis';
import { Candidate } from "../validations/candidate";
import mailQueue from "../queues/mail";

export const newCandidate = async(req: any) =>{
    let candidate;

    const validatedData = req.validatedData
    const { email } = validatedData

    const get_candidate = await getCandidate(email)

    if (get_candidate) {
        candidate = await updateCandidate(email, validatedData)
    } else {
        candidate = await daoLayer.create(validatedData)
    }

    if (!candidate) {
        throw new ApiError('Failed to create or update candidate', 500)
    }

    await mailQueue.add("CandidateEvent", {
        type: "Receive_Application",
        firstName: candidate.firstName,
        email: candidate.email,
    });


    return candidate;
}

export const getCandidate = async (email: string) => {
    const cacheKey = `candidate:${email}`;

    const cachedCandidate = await getCache(cacheKey);
    if (cachedCandidate) {
        // console.log('Cache hit');
        return cachedCandidate;
    }

    console.log('Cache miss');

    const candidate = await daoLayer.getOne(email);

    if (!candidate) return null;

    await setCache(cacheKey, candidate);

    return candidate;
};

export const updateCandidate = async (email: string, data: Candidate) => {

    const candidate = await daoLayer.update(email, data);

    const cacheKey = `candidate:${email}`;
    // Delete or refresh the cache after update
    await deleteCache(cacheKey);
    // console.log('Cache deleted');
    // re-cache the updated value
    await setCache(cacheKey, candidate);

    return candidate;
}


