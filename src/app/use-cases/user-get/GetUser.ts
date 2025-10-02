import type IUserRepository from "../../ports-out/repository/IUserRepository.js";

export class GetUser {
    private repository: IUserRepository;
    // Aquí puedes inyectar dependencias como repositorios si es necesario
    constructor(repository: IUserRepository) {
       this.repository = repository;
    }

    getUserByUsername = async (username: string) => {
        try {
            const user = await this.repository.getByUsername(username);
            return user;
        } catch (error) {
            throw new Error("Error fetching user by username: " + (error as Error).message);
        }
    }
}