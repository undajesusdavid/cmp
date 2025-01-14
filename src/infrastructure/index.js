import express from "express";
import EmployeeApi from "./api/Employee.js";
import { configServer as config } from "./config/envairoments.js";
import {runDatabase} from "./database/sync_database.js";

const app = express();

if(config.NODE_ENV == "development"){
  runDatabase();
}


//Routes
app.use(EmployeeApi);

app.get("/", async (req, res) => {
  res.json("Servidor Corriendo");
});

app.listen(config.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${config.PORT}`);
});
