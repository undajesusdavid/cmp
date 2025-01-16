import { Router } from "express";

const UserApi = Router();

UserApi.get("/api/user/list", async (req, res) => {
    res.json("usuarios");
});

UserApi.get("/api/user/register", async (req, res) => {
   
    res.json("usuario registrado");
});



export default UserApi;