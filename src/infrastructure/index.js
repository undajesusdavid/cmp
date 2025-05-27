import express from "express";
import cors from "cors";
import EmployeeApi from "./api/Employee.js";
import { configServer as config, configCors } from "./config/envairoments.js";
import { runDatabase } from "./database/sync_database.js";
import UserApi from "./api/Users.js";
import AuthApi from "./api/Auth.js";
import MetadataApi from "./api/Metadata.js";



const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//Configuracion cors
const corsOptions = {
  origin: configCors.origin,
  methods: ["GET", "POST", "UPDATE", "DELETE"],
  credentials: true,
};

//Middlewares
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

if (config.NODE_ENV == "development") {
  runDatabase();
}

//Routes
app.use([EmployeeApi, UserApi, AuthApi]);
//Routes metadata
app.use([MetadataApi]);

app.get("/", async (req, res) => {
  res.json("Servidor Corriendo");
});

app.listen(config.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${config.PORT}`);
});
