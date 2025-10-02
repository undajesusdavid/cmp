import type { UserCredentialsDTO } from "../../dto-request/UserCredentialsDTO.js";
import { UserAuthenticatedDTO, type UserPayload } from "../../dto-response/UserAuthenticatedDTO.js";
import type IUserRepository from "../../ports-out/repository/IUserRepository.js";
import type IHashedService from "../../ports-out/utils/IHashedService.js";
import type ILogginService from "../../ports-out/utils/ILogginService.js";

export class UserAuth {
    private repository: IUserRepository;
    private logginService: ILogginService;
    private hashedService: IHashedService;
    constructor(
        repository: IUserRepository,
        logginService: ILogginService,
        hashedService: IHashedService) {

        this.repository = repository;
        this.logginService = logginService;
        this.hashedService = hashedService;
    }

    loggin = async (credentials: UserCredentialsDTO) => {
        try {
            const user = await this.repository.getByUsername(credentials.username);
            if (!user) {
                throw new Error("Credenciales inválidas");
            }
            const isValidPassword = await this.hashedService.compare(
                credentials.password,
                user.getPassword()
            );

            if (!isValidPassword) {
                throw new Error("Credenciales inválidas");
            }

            const payload: UserPayload = { id: user.getId(), username: user.getUsername() };
            const token = await this.logginService.loggin(payload);
            
            return new UserAuthenticatedDTO(token, payload);
        } catch (error) {
            throw new Error("Error fetching user by username: " + (error as Error).message);
        }
    }
}