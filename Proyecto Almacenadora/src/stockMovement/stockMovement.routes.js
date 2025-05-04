import { Router } from 'express'
import { 
    createStockMovement,
    getAllStockMovements,
    getStats,
    getStockMovementsByProduct
} from './stockMovement.controller.js'
import { validateJwt, isAdmin, isActive } from '../../middlewares/validate.jwt.js'
import {
    registerMovementValidator,
    getMovementByProductValidator
} from '../../helpers/validators.js'

const api = Router()

//Rutas privadas - Movimientos de inventario

//Registrar movimiento de entrada o salida
api.post(
    '/registerMovement',
    [
        validateJwt,
        registerMovementValidator, isActive
    ],
    createStockMovement
)

//Historial global (solo ADMIN)
api.get(
    '/',
    [
        validateJwt,
        isAdmin, isActive
    ],
    getAllStockMovements
)

//Historial por producto
api.get(
    '/:id',
    [
        validateJwt,
        getMovementByProductValidator, isActive
    ],
    getStockMovementsByProduct
)

api.get(
    '/stats',
    [
        validateJwt,
        isAdmin
    ],
    getStats
)

//Exportar
export default api
