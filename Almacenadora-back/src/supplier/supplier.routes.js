import { Router } from 'express'
import { validateJwt, isAdmin, isUser, isActive } from '../../middlewares/validate.jwt.js'
import { createSupplier, deleteSupplier, get, getAll, privateDeleteSupplier, privateUpdate, update } from './supplier.controller.js'

const api = Router()

api.get('/getAllSuppliers', [validateJwt, isAdmin, isActive], getAll)
api.get('/getSupplier/:id', [validateJwt, isAdmin, isActive], get)
api.post('/createSupplier', [validateJwt, isAdmin, isActive], createSupplier)
api.put('/privateUpdateSupplier/:id', [validateJwt, isAdmin, isActive], privateUpdate)
api.delete('/privateDeleteSupplier/:id', [validateJwt, isAdmin, isActive], privateDeleteSupplier)

export default api
