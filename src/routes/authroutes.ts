
import { Router } from "express";
import userController from '../controllers/signup'

const router = Router()


router.post('/login', userController.createUser)
router.get('/users', userController.getAlluser)
router.patch('/users/:id', userController.editlocation)

export default router