'use strict'

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import hotelesRoutes from '../src/hoteles/hoteles.routes.js';
import habitacionesRoutes from '../src/habitaciones/habitaciones.routes.js';
import authRoutes from '../src/auth/auth.routes.js'
import userRoutes from '../src/users/user.routes.js'
import serviciosRoutes from '../src/serviciosAdicionales/servicios.routes.js'
import eventosRoutes from '../src/eventos/eventos.routes.js'
import categoriaRoutes from '../src/categorias/categoria.routes.js'
import reservacionesRoutes from '../src/reservaciones/reservaciones.routes.js'
import facturaRoutes from '../src/factura/factura.routes.js'


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.authPath = '/auth'
        this.userPath = '/user'
        this.hotelesPath = '/hotel'
        this.habitacionesPath = '/room'
        this.serviciosAdPath = '/service'
        this.eventosPath = '/eventos'
        this.categoriPath = '/category'
        this.reservacionePath= '/reservation'
        this.conectarDB(); 
        this.middlewares();
        this.routes();

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


   
    routes() {  
        this.app.use(this.authPath, authRoutes);      
        this.app.use(this.userPath, userRoutes);
        this.app.use(this.hotelesPath, hotelesRoutes);
        this.app.use(this.habitacionesPath, habitacionesRoutes)
        this.app.use(this.serviciosAdPath, serviciosRoutes)
        this.app.use(this.eventosPath, eventosRoutes)
        this.app.use(this.categoriPath, categoriaRoutes)
        this.app.use(this.reservacionePath, reservacionesRoutes)
    };


    listen(){
        this.app.listen(this.port, () => {
            console.log('Server running on port ', this.port)
        })
    }
}

export default Server