//Rutas de funciones de usuario
import { Router } from 'express'
import { get, getAll, update, updateAdmin, updatePassword, deleteUser, deleteUserAdmin } from './user.controller.js'
import { validateJwt, isAdmin, isUser, isActive } from '../../middlewares/validate.jwt.js'
import {updateUserValidator, updatePasswordValidator} from '../../helpers/validators.js'
 
const api = Router()
 
//Rutas privadas
api.get(
    '/', 
    [validateJwt, isAdmin, isActive],
    getAll
)
api.get(
    '/:id', 
    [validateJwt, isAdmin, isActive],
    get
)
api.put(
    '/update/:id',
    [validateJwt,isUser, updateUserValidator,isActive ],
    update
)
api.put(
    '/password/:id',
    [validateJwt, updatePasswordValidator, isUser, isActive],
    updatePassword
)
api.put(
    '/update2/:id',
    [validateJwt, updateUserValidator, isAdmin, isActive],
    updateAdmin
)
api.delete(
    '/delete/:id', 
    [validateJwt, isUser, isActive], 
    deleteUser
)
api.delete(
    '/delete2/:id', 
    [validateJwt, isAdmin, isActive], 
    deleteUserAdmin
)

export default api