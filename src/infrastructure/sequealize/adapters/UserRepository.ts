import type { Model, ModelStatic, Sequelize } from "sequelize";
import Repository from "./Repository.js";
import UserModel from "../models/User/User.js";
// Importaciones del Dominio
import { userDTO } from "../../../domain/dto/user/UserDTO.js";
import type IUserRepository from "../../../domain/ports-repository/IUserRepository.js";

class UserRepository extends Repository implements IUserRepository {

    private model: ModelStatic<Model>;

    constructor(sequelize: Sequelize) {
        super(sequelize);
        this.model = this.loadModel(sequelize);
    }

    loadModel(sequelize: Sequelize): ModelStatic<Model> {
        const model = UserModel(sequelize);
        if (!model) throw new Error("No se pudo cargar ModelUser");
        return model
    }

    buildUserDTO(user: Model): userDTO {
        return new userDTO(
            user.getDataValue('id'),    
            user.getDataValue('username'),
            user.getDataValue('password')
        );
    }

    async getByUsername(username: string): Promise<userDTO> {

        const user = await this.model.findOne({
            where: { username }
        });

        if (!user) {
            throw new Error("Usuario no encontrado");
        }

        return this.buildUserDTO(user);
    }

    async getByEmail(email: string): Promise<userDTO> {
        // Pendiente de implementar
        throw new Error("Usuario no encontrado");;
    }

}


export default UserRepository;