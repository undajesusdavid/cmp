import cors from "cors";
import express from "express";
import type { Sequelize } from "sequelize";
import LoadRoutes from "./routes/LoadRoutes.js";
import MiddlewareErrors from "./middleware/errors.js";
import { configCors, configServer } from "../config/envairoments.js";


export default async function AppExpress(database: Sequelize) {
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