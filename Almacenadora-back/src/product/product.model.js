import { Schema, model } from 'mongoose'

const productoSchema = new Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true
        },
        categoria: {
            type: String,
            required: true,
            trim: true
        },
        stock: {
            type: Number,
            required: true,
            min: 0
        },
        proveedor: {
            type: Schema.Types.ObjectId,
            ref: 'Supplier',
            required: [true, 'Supplier reference is required']
        },
        estado: {
            type: Boolean,
            default: true // true = activo, false = eliminado
        }
        ,
        fechaEntrada: {
            type: Date,
            required: true
        }
    },
    { timestamps: true }
)

productoSchema.methods.toJSON = function () {
    const { __v, ...producto } = this.toObject()
    return producto
}

export default model('Producto', productoSchema)
