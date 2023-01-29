
import { Router } from "express";
import userController from '../controllers/signup'

const router = Router()


router.post('/signup', userController.createUser)
router.get('/users', userController.getAlluser)
router.patch('/users/:id', userController.editlocation)
router.post('/login', userController.loginuser)

export default router