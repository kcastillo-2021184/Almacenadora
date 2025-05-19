import { Schema, model } from "mongoose"

const clientSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        maxLength: [50, `Can't exceed 50 characters`]            
    },
    company: {
        type: String,
        required: [true, 'Company is required']
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

clientSchema.methods.toJSON = function(){
    const { __v, status, _id, ...client } = this.toObject()
    return client
}

export default model('Client', clientSchema)
