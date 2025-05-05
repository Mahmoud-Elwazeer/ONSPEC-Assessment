import prisma from "../utils/prismaClient";
import { Candidate } from "../validations/candidate";


export const getOne = async(identifier: string) => {
    const isEmail = identifier.includes('@');

    const candidate = await prisma.candidate.findUnique({
        where: isEmail ? { email: identifier } : { id: identifier }
    });

    return candidate
}


export const getAll = async() => {
    const candidates = await prisma.candidate.findMany()

    return candidates
}

export const create = async (data: Candidate) => {
    const candidate = await prisma.candidate.create({
        data
    })

    return candidate
}

export const update = async (identifier: string, data: Candidate) => {
    const isEmail = identifier.includes('@');

    const candidate = await prisma.candidate.update({
        where: isEmail ? { email: identifier } : { id: identifier },
        data
    })

    return candidate
}

export const deleteOne = async (id: string) => {
    const candidate = await prisma.candidate.delete({
        where: {
            id
        }
    })

    return candidate
}
