//Lógica de negocio del movimiento de inventario

import StockMovement from "./stockMovement.model.js"
import Product from "../product/product.model.js"

// Registrar entrada o salida de inventario
export const createStockMovement = async (req, res) => {
    try {
        const { product, type, quantity, reason } = req.body
        const userId = req.user.id // Asumimos que ya fue inyectado desde el middleware

        const foundProduct = await Product.findById(product)
        if (!foundProduct) {
            return res.status(404).send({
                success: false,
                message: "Product not found"
            })
        }

        if (type === 'EXIT') {
            if (foundProduct.amount < quantity) {
                return res.status(400).send({
                    success: false,
                    message: "Not enough stock available"
                })
            }
            foundProduct.amount -= quantity
        } else if (type === 'ENTRY') {
            foundProduct.amount += quantity
        }

        await foundProduct.save()

        const movement = await StockMovement.create({
            product,
            type,
            quantity,
            reason,
            user: userId
        })

        return res.status(201).send({
            success: true,
            message: "Stock movement registered successfully",
            movement
        })

    } catch (err) {
        console.error(err)
        return res.status(500).send({
            success: false,
            message: "General Error",
            err
        })
    }
}

// Obtener historial global de movimientos
export const getAllStockMovements = async (req, res) => {
    try {
        const { limit = 20, skip = 0 } = req.query
        const movements = await StockMovement.find()
            .populate("product", "name category")
            .populate("user", "name surname username")
            .sort({ date: -1 })
            .skip(skip)
            .limit(limit)

        if (movements.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No stock movements found"
            })
        }

        return res.send({
            success: true,
            message: "Stock movements found",
            total: movements.length,
            movements
        })

    } catch (err) {
        console.error(err)
        return res.status(500).send({
            success: false,
            message: "General Error",
            err
        })
    }
}

// Obtener historial por producto específico
export const getStockMovementsByProduct = async (req, res) => {
    try {
        const { id } = req.params

        const movements = await StockMovement.find({ product: id })
            .populate("user", "name surname username")
            .sort({ date: -1 })

        if (movements.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No movements found for this product"
            })
        }

        return res.send({
            success: true,
            message: "Product movement history found",
            total: movements.length,
            movements
        })

    } catch (err) {
        console.error(err)
        return res.status(500).send({
            success: false,
            message: "General Error",
            err
        })
    }
}
