'use strict'

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import hotelesRoutes from '../src/hoteles/hoteles.routes.js';
import habitacionesRoutes from '../src/habitaciones/habitaciones.routes.js';


class Server{
    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.hotelesPath = '/api_Hoteles/v1/hoteles'
        this.habitacionesPath = '/api_Hoteles/v1/habitaciones'
        this.middlewares()
        this.conectarDB()
        this.routes()
    }

    async conectarDB(){
        await dbConnection()
    }

    middlewares(){
        this.app.use(express.urlencoded({extended: false}))
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(helmet())
        this.app.use(morgan('dev'))
    }

    routes(){
        this.app.use(this.hotelesPath, hotelesRoutes);
        this.app.use(this.habitacionesPath, habitacionesRoutes)
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server running on port ', this.port)
        })
    }
}

export default Server