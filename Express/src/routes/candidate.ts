import express from 'express'
import { 
    create, getAll, getOne, deleteOne 
} from '../controllers/candidate'
import { 
    candidateValidator, candidateByIdValidator 
} from '../validations/candidate'

const router = express.Router()

router.route('/') 
    .post(candidateValidator, create)
    // .get(authorize(['HR', 'MANAGER', 'ADMIN']), getAll)


// router.route('/:candidateId')
//     .get(authorize(['HR', 'MANAGER', 'ADMIN']), candidateByIdValidator, getOne)
//     .patch(authorize(['HR', 'MANAGER', 'ADMIN']), candidateValidator, create)
//     .delete(authorize(['HR', 'MANAGER', 'ADMIN']), deleteOne)

export { router as candidateRoutes };
