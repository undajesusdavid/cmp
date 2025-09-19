// import express from "express";
// import cors from "cors";
// import { configServer as config, configCors } from "./config/envairoments.js";
// import LoadRoutes from "./express/routes/LoadRoutes.js";
// import MiddlewareErrors from "./express/middleware/errors.js"; 
// import Database from "./sequealize/sequelize.js";

// const app = express();
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// //Configuracion cors
// const corsOptions = {
//   origin: configCors.origin,
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true,
// };

// //Middlewares
// app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));

// const db = await Database();
// app.use(await LoadRoutes(db));
// app.use(MiddlewareErrors);

// app.get("/", async (req, res) => {
//   res.json("Servidor Corriendo");
// });
// app.listen(config.PORT, () => {
//   console.log(`Servidor escuchando en el puerto ${config.PORT}`);
// });


import AppExpress from "./express/express.js";
import Database from "./sequealize/sequelize.js";
const app = await AppExpress(await Database());