import express from "express";
import cors from "cors";
import { configServer as config, configCors } from "./config/envairoments.js";
import runDatabase  from "./database/index.js";
import {Api} from "./api/index.js" 


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Configuracion cors
const corsOptions = {
  origin: configCors.origin,
  methods: ["GET", "POST", "UPDATE", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

//Middlewares
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));


const db = await runDatabase();
app.use(await Api(db));

app.get("/", async (req, res) => {
  res.json("Servidor Corriendo");
});
app.listen(config.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${config.PORT}`);
});
