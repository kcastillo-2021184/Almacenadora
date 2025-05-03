import { Router } from 'express'
import {
    crearProducto,
    editarProducto,
    eliminarProducto,
    filtrarProductos
} from './product.controller.js'
import { validarProducto, validarActualizarProducto } from '../../middlewares/validarProducto.js'
import { isAdmin, validateJwt } from '../../middlewares/validate.jwt.js'


const router = Router()

router.post('/', [validateJwt, validarProducto ], crearProducto)
router.put('/update/:id', [validateJwt ,validarActualizarProducto, isAdmin], editarProducto)
router.delete('/delete/:id' ,[validateJwt, isAdmin], eliminarProducto)
router.get('/', [validateJwt], filtrarProductos)

export default router
