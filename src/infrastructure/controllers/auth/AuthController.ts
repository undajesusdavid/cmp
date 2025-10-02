import type { Sequelize } from "sequelize";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { configJwt } from "../../config/envairoments.js";
import { Controller } from "../Controller.js";
import UserRepository from "../../sequealize/adapters/UserRepository.js";
import type IUserRepository from "../../../app/ports-out/repository/IUserRepository.js";
import type { UserResponseDTO } from "../../../app/dto-response/UserResponseDTO.js";
import type { UserCreateDTO } from "../../../app/dto-request/UserCreateDTO.js";

export class AuthController extends Controller {
    private userRepository: IUserRepository

    constructor(sequelize: Sequelize) {
        super(sequelize)
        this.userRepository = new UserRepository(sequelize);
    }

    private async hashedPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }

    async authenticate(username: string, password: string, sucess: (token: string, payload: any) => void) {

        //const ModelUser = this.getModel("usuarios");

        if (!username || !password) {
            throw new Error("Por favor, proporciona nombre de usuario y contraseña.");
        }

        try {

            const user: UserResponseDTO = await this.userRepository.getByUsername(username);

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

    // async register(userDTO: UserCreateDTO) {
    //     try {
    //         userDTO.validCredentials();
    //         const exists = await this.userRepository.userExists(userDTO.getUsername());
    //         if (exists) {
    //             throw new Error("El nombre de usuario ya está en uso.");
    //         }
            

    //     } catch (error) {

    //     }
    // }

}