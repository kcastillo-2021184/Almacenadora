//Modelo de movimiento de inventario

import { Schema, model } from "mongoose";

const stockMovementSchema = Schema(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: [true, 'Product reference is required']
        },
        type: {
            type: String,
            enum: ['ENTRY', 'EXIT'],
            required: [true, 'Type is required']
        },
        date: {
            type: Date,
            default: Date.now
        },
        quantity: {
            type: Number,
            required: [true, 'Quantity is required'],
            min: [1, 'Quantity must be at least 1']
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User reference is required']
        },
        reason: {
            type: String,
            required: [true, 'Reason is required'],
            maxLength: [100, `Can't be overcome 100 characters`]
        }
    }
)

//Modificar el toJSON para excluir datos innecesarios
stockMovementSchema.methods.toJSON = function(){
    const { __v, ...movement } = this.toObject()
    return movement
}

//Crear y exportar el modelo
export default model('StockMovement', stockMovementSchema)
