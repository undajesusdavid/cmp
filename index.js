import express from "express";
import EmployeeApi from "./api/Employee.js";
import { configServer as config } from "./config/envairoments.js";
import "./boot/sync_database.js";

const app = express();

//Routes
app.use(EmployeeApi);

app.get("/", async (req, res) => {
  res.json("Servidor Corriendo");
});

app.listen(config.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${config.PORT}`);
});
