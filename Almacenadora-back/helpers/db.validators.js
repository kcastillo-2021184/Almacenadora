//Validaciones en relación a la BD

import User from '../src/user/user.model.js'
import Product from '../src/product/product.model.js'
import { isValidObjectId } from 'mongoose'

export const existUsername = async(username)=>{
    const alreadyUsername = await User.findOne({username})
    if(alreadyUsername){
        console.error(`Username ${username} is already taken`)
        throw new Error(`Username ${username} is already taken`)
    }
}

export const existEmail = async(email)=>{
    const alreadyEmail = await User.findOne({email}) 
        if(alreadyEmail){
        console.error(`Email ${email} is already taken`)
        throw new Error(`Email ${email} is already taken`)
    }
}

export const objectIdValid = async(objectId)=>{    
    if(!isValidObjectId(objectId)){
        throw new Error(``)
    }
}

export const findUser = async(id)=>{
    try{
        const userExist = await User.findById(id)
        if(!userExist) return false
        return userExist
    }catch(err){
        console.error(err)
        return false
    }
}

// Verifica si el producto existe en la BD
export const existProductById = async(id) => {
    const product = await Product.findById(id)
    if (!product) {
        console.error(`Product with id ${id} not found`)
        throw new Error(`Product not found`)
    }
}

// Validar que el tipo de movimiento sea válido
export const validMovementType = async(type) => {
    const validTypes = ['ENTRY', 'EXIT']
    if (!validTypes.includes(type)) {
        console.error(`Invalid movement type: ${type}`)
        throw new Error(`Invalid movement type. Must be 'ENTRY' or 'EXIT'`)
    }
}
