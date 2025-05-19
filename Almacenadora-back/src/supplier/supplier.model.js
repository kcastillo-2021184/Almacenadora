import { Schema, model } from "mongoose"

const supplierSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        maxLength: [50, `Can't exceed 50 characters`]            
    },
    contact: {
        type: String,
        required: [true, 'Contact is required']
    },
    status: {
        type: Boolean,
        default: true
    }
})

supplierSchema.methods.toJSON = function(){
    const { __v, status, _id, ...supplier } = this.toObject()
    return supplier
}

export default model('Supplier', supplierSchema)
