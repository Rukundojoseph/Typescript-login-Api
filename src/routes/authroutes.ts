import { Router } from "express";
import userController from '../controllers/signup'
import CheckUser from "../middleware/authmiddleware"

const router = Router()


router.post('/signup', userController.createUser)
router.get('/users', userController.getAlluser)
router.patch('/users/editbill', CheckUser.user ,userController.editlocation)
router.post('/login', userController.loginuser)

export default router