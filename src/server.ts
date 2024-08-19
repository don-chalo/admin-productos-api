import express from "express";
import colors from 'colors';
import swaggerUi from 'swagger-ui-express'
import cors, { CorsOptions } from "cors";

import swaggerSpec, { swaggerUiOptions } from './config/swagger';
import router from "./router";
import db from "./config/db";
import morgan from "morgan";

export async function connectDB() {
    try {
        await db.authenticate();
        db.sync();
        console.log(colors.bgGreen('conectado a la base de datos'));
    } catch(error) {
        console.log(colors.bgRed.bold('Error al conectar a la base de datos'));
    }
}

connectDB();
const server = express();

const corsOptions: CorsOptions = {
    origin: function(origin, callback) {
        if (origin === process.env.FRONTEND_URL) {
            callback(null, true);
        } else {
            callback(new Error('Error de CORS'));
        }
    }
};
server.use(cors(corsOptions));

// Leer datos de formulario.
server.use(express.json());

server.use(morgan('dev'));

server.use('/api/products', router);

server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));

export default server;
