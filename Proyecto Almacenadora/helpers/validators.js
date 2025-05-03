//Validar campos en las rutas
import { body, param } from "express-validator" //Capturar todo el body de la solicitud
import { validateErrors, validateErrorWithoutImg } from "./validate.error.js"
import { existUsername, existEmail, objectIdValid, existProductById, validMovementType } from "./db.validators.js"

export const registerValidator = [
    body('name', 'Name cannot be empty')
        .notEmpty(),
    body('surname', 'Surname cannot be empty')
        .notEmpty(),
    body('email', 'Email cannot be empty or is not a valid email')
        .notEmpty()
        .isEmail()
        .custom(existEmail),
    body('username', 'Username cannot be empty')
        .notEmpty()
        .toLowerCase()
        .custom(existUsername),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('The password must be strong')
        .isLength({min: 8}),
    validateErrors
]

export const loginValidator = [
    body('userLoggin', 'Username or email cannot be empty')
        .notEmpty()
        .toLowerCase(),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('The password must be strong')
        .isLength({min: 8}),
        validateErrorWithoutImg
]

//Validaciones para realizar update
export const updateUserValidator = [
    body('name', 'Name is required').optional().notEmpty(),
    body('surname', 'Surname is required').optional().notEmpty(),
    body('email', 'Email is not valid').optional().isEmail(),
    validateErrorWithoutImg
]

export const updatePasswordValidator = [
    body('currentPassword', 'Current password is required').notEmpty(),
    body('newPassword', 'New password is required')
        .notEmpty()
        .isStrongPassword()
        .withMessage('Please write a stronger password')
        .isLength({min: 8}),
    validateErrors
]

// Validaciones para registrar entrada/salida de inventario
export const registerMovementValidator = [
    body('product', 'Product ID is required')
        .notEmpty()
        .custom(objectIdValid)
        .custom(existProductById),

    body('type', 'Type is required')
        .notEmpty()
        .custom(validMovementType),

    body('quantity', 'Quantity must be a number greater than 0')
        .isInt({ min: 1 }),

    body('reason', 'Reason is required')
        .notEmpty()
        .isLength({ max: 100 })
        .withMessage('Reason must not exceed 100 characters'),

    validateErrors
]

// Validaciones para historial por producto
export const getMovementByProductValidator = [
    param('id')
        .custom(objectIdValid)
        .withMessage('Invalid product ID'),

    validateErrors
]
