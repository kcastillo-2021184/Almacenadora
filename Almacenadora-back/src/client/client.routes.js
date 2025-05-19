import { Router } from 'express'
import { validateJwt, isAdmin, isActive, isUser } from '../../middlewares/validate.jwt.js'
import { createClient, deleteClient, get, getAll, privateDeleteClient, privateUpdate, update } from './client.controller.js'

const api = Router()

api.get('/getAllClients', [validateJwt, isAdmin, isActive], getAll)
api.get('/getClient/:id', [validateJwt, isAdmin, isActive], get)
api.post('/createClient', [validateJwt, isAdmin, isActive], createClient)
api.put('/privateUpdateClient/:id', [validateJwt, isAdmin, isActive], privateUpdate)
api.delete('/privateDeleteClient/:id', [validateJwt, isAdmin, isActive], privateDeleteClient)

export default api
