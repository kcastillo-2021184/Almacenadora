import { Router } from 'express'
import {
    crearProducto,
    editarProducto,
    eliminarProducto,
    filtrarProductos,
    getExpirationAlerts,
    getStockAlerts
} from './product.controller.js'
import { validarProducto, validarActualizarProducto } from '../../middlewares/validarProducto.js'
import { isActive, isAdmin, validateJwt } from '../../middlewares/validate.jwt.js'


const api = Router()

api.post('/', [validateJwt, validarProducto, isActive ], crearProducto)
api.put('/update/:id', [validateJwt ,validarActualizarProducto, isAdmin, isActive], editarProducto)
api.delete('/delete/:id' ,[validateJwt, isAdmin, isActive], eliminarProducto)
api.get('/', [validateJwt], filtrarProductos)

//Alertas

api.get('/getStockAlerts', [validateJwt, isActive], getStockAlerts)
api.get('/getExpirationAlerts', [validateJwt, isActive], getExpirationAlerts)


export default api
