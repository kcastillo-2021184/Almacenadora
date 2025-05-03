import { Router } from 'express'
import { 
    createStockMovement,
    getAllStockMovements,
    getStockMovementsByProduct
} from './stockMovement.controller.js'
import { validateJwt, isAdmin, isAdminOrEmployee } from '../../middlewares/validate.jwt.js'
import {
    registerMovementValidator,
    getMovementByProductValidator
} from '../../helpers/validators.js'

const api = Router()

//Rutas privadas - Movimientos de inventario

//Registrar movimiento de entrada o salida
api.post(
    '/',
    [
        validateJwt,
        registerMovementValidator
    ],
    createStockMovement
)

//Historial global (solo ADMIN)
api.get(
    '/',
    [
        validateJwt,
        isAdmin
    ],
    getAllStockMovements
)

//Historial por producto
api.get(
    '/:id',
    [
        validateJwt,
        getMovementByProductValidator
    ],
    getStockMovementsByProduct
)

//Exportar
export default api
