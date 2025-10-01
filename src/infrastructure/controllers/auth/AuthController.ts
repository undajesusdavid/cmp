import type { Sequelize } from "sequelize";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { configJwt } from "../../config/envairoments.js";
import type { UserModel } from "../../sequealize/models/User/User.js";
import { Controller } from "../Controller.js";
import UserRepository from "../../sequealize/adapters/UserRepository.js";
import type IUserRepository from "../../../domain/ports-repository/IUserRepository.js";
import type { userDTO } from "../../../domain/dto/user/UserDTO.js";

export class AuthController extends Controller {
    private userRepository: IUserRepository

    constructor(sequelize: Sequelize) {
        super(sequelize)
        this.userRepository = new UserRepository(sequelize);
    }

    async authenticate(username: string, password: string, sucess: (token: string, payload: any) => void) {
        
        //const ModelUser = this.getModel("usuarios");

        if (!username || !password) {
            throw new Error("Por favor, proporciona nombre de usuario y contraseña.");
        }

        try {
            
            const user : userDTO = await this.userRepository.getByUsername(username);

            if (!user.getUsername()) {
                throw new Error("Credenciales inválidas.");
            }

            const isMatch = await bcrypt.compare(password, user.getPassword());

            if (!isMatch) {
                throw new Error("Credenciales inválidas.");
            }

            const payload = {
                user: {
                    id: user.getId(),
                    username: user.getUsername(),
                },
            };
            jwt.sign(
                payload,
                configJwt.JWT_SECRET, // Clave secreta del archivo .env
                { expiresIn: configJwt.JWT_EXPIRES_IN }, // El token expira en 1 hora
                (err, token) => {
                    if (token) {
                        sucess(token, payload);
                    } else if (err) {
                        throw new Error("Error al generar el token.");
                    };
                }
            );
        } catch (err) {
            throw new Error("Error en el servidor.");
        }

    }

}