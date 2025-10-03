import { inject, injectable } from "tsyringe";
import type { UserCredentialsDTO } from "../../dto-request/UserCredentialsDTO.js";
import { UserAuthenticatedDTO, type UserPayload } from "../../dto-response/UserAuthenticatedDTO.js";
import type IUserRepository from "../../ports-out/repository/IUserRepository.js";
import type IHashedService from "../../ports-out/utils/IHashedService.js";
import type ILogginService from "../../ports-out/utils/ILogginService.js";

@injectable()
export class UserAuth {
    private repository: IUserRepository;
    private logginService: ILogginService;
    private hashedService: IHashedService;
    constructor(
        @inject("IUserRepository") repository: IUserRepository,
        @inject("ILogginService") logginService: ILogginService,
        @inject("IHashedService") hashedService: IHashedService) {
            console.log("UserAuth constructor called");

        this.repository = repository;
        this.logginService = logginService;
        this.hashedService = hashedService;
    }

    login = async (credentials: UserCredentialsDTO) => {
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
            const serviceResult = this.logginService.logginJWT(payload);

            if (serviceResult.error) {
                throw new Error(serviceResult.error.message);
            }

            if(serviceResult.result === null) {
                throw new Error("Error generating JWT: token is null");
            }
            
            return new UserAuthenticatedDTO(serviceResult.result, payload);
            
        } catch (error) {
            throw new Error("Error fetching user by username: " + (error as Error).message);
        }
    }
}