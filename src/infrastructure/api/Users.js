import { Router } from "express";
import authenticateToken from "../middleware/auth.js";
import HashPassword from "../utils/HashPassword.js";
import User  from "../models/User.js";
const UserApi = Router();

UserApi.get("/api/user/list", authenticateToken, async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

UserApi.get("/api/user/get", authenticateToken, async (req, res) => {
  const id = req.query.id;
  const user = await User.findOne({ where: { id: id } });
  res.json(user);
});

UserApi.post("/api/user/register", authenticateToken, async (req, res) => {
  const data = req.body;
  const newuser = User.create({
    username: data.username,
    password: HashPassword(data.password),
  });
  res.json(newuser);
});

export default UserApi;
