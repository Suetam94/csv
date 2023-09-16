import { Router } from 'express'
import { userController } from '../controllers/user'

const userRoutes = Router()

userRoutes.get('/', userController)

export default userRoutes
