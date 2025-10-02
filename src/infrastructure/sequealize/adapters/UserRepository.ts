import type { Model, ModelStatic, Sequelize } from "sequelize";
import Repository from "./Repository.js";
import UserModel from "../models/User/User.js";
// Importaciones del Dominio
import { UserResponseDTO } from "../../../app/dto-response/UserResponseDTO.js";
import type IUserRepository from "../../../app/ports-out/repository/IUserRepository.js";

class UserRepository extends Repository implements IUserRepository {

    private model: ModelStatic<Model>;

    constructor(sequelize: Sequelize) {
        super(sequelize);
        this.model = this.loadModel(sequelize);
    }
    async userExists(username: string): Promise<boolean> {
        const count = await this.model.count({
            where: { username }
        });
        return count > 0;
    }

    loadModel(sequelize: Sequelize): ModelStatic<Model> {
        const model = UserModel(sequelize);
        if (!model) throw new Error("No se pudo cargar ModelUser");
        return model
    }

    buildUserDTO(user: Model): UserResponseDTO {
        return new UserResponseDTO(
            user.getDataValue('id'),    
            user.getDataValue('username'),
            user.getDataValue('password')
        );
    }

    async getByUsername(username: string): Promise<UserResponseDTO> {

        const user = await this.model.findOne({
            where: { username }
        });

        if (!user) {
            throw new Error("Usuario no encontrado");
        }

        return this.buildUserDTO(user);
    }

    async getByEmail(email: string): Promise<UserResponseDTO> {
        // Pendiente de implementar
        throw new Error("Usuario no encontrado");
    }

}


export default UserRepository;