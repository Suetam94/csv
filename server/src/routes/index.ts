import { Router } from 'express'

import fileRoutes from './file.routes'
import userRoutes from './user.routes'

const routes = Router()

routes.use('/api/files', fileRoutes)
routes.use('/api/users', userRoutes)

export default routes
