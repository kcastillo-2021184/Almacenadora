//Configurar el servidor de express (HTTP)

//Modular | + efectiva | trabaja en funciones

'use strict'

// ECModules | ESModules
import express from 'express' //Servidor HTTP
import morgan from 'morgan' //Logs
import helmet from 'helmet' //Seguridad para HTTP
import cors from 'cors' //Acceso al API
import authRoutes from '../src/auth/auth.routes.js'
import userRoutes from '../src/user/user.routes.js'
import stockMovementRoutes from '../src/stockMovement/stockMovement.routes.js'
import productRoutes from '../src/product/product.routes.js'
import clientRoutes from '../src/client/client.routes.js'
import supplierRoutes from '../src/supplier/supplier.routes.js'
import { limiter } from '../middlewares/rate.limit.js'


const configs = (app)=>{
    app.use(express.json()) //Aceptar y enviar datos en JSON
    app.use(express.urlencoded({extended: true}))   
    app.use(cors())
    app.use(helmet())
    app.use(limiter)
    app.use(morgan('dev'))
}

const routes = (app)=>{
    app.use(authRoutes)
    //Buenas prácticas de rutas
    //pre ruta o ruta general
    app.use('/v1/user', userRoutes)
    app.use('/v1/stockMovement', stockMovementRoutes)
    app.use('/v1/product', productRoutes)
    app.use('/v1/client', clientRoutes)
    app.use('/v1/supplier', supplierRoutes)
}


//ESModules no acepta exports.
export const initServer = async()=>{
    const app = express() //Instancia de express
    try{
        configs(app) //Aplicar configuraciones al servidor
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    }catch(err){
        console.error('Server init failed', err)
    }
}
