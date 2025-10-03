import cors from "cors";
import express from "express";
import LoadRoutes from "./routes/LoadRoutes.js";
import MiddlewareErrors from "./middleware/errors.js";
import { configCors, configServer } from "../config/envairoments.js";

import { container } from "../config/contenedorTsyringe.js";
import type { Sequelize } from "sequelize";

const database: Sequelize = container.resolve("Sequealize");

export default async function AppExpress() {
    const app = express();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    //Configuracion cors
    const corsOptions = {
        origin: configCors.origin,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    };

    //Middlewares
    app.use(cors(corsOptions));
    app.options("*", cors(corsOptions));
    app.use(MiddlewareErrors);


    //Rutas
    app.use(await LoadRoutes(database));
    app.get("/", async (req, res) => {
        res.json("Servidor Corriendo");
    });

    //Ejecucion del servidor
    app.listen(configServer.PORT, () => {
        console.log(`Servidor escuchando en el puerto ${configServer.PORT}`);
    });

    return AppExpress;
}