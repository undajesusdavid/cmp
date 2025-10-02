import { UserResponseDTO } from "../../dto-response/UserResponseDTO.js";

export default interface IUserRepository {
    getByUsername: (username: string) => Promise<UserResponseDTO>;
    getByEmail: (username: string) => Promise<UserResponseDTO>;
    userExists: (username: string) => Promise<boolean>;
}