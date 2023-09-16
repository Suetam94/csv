import { Router } from 'express'
import multer from 'multer'
import { fileController } from '../controllers/file'

const upload = multer({ dest: 'uploads/' })

const fileRoutes = Router()

fileRoutes.post('/', upload.single('file'), fileController)

export default fileRoutes
