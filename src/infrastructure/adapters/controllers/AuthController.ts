import { UserCredentialsDTO } from "../../../app/dto-request/UserCredentialsDTO.js";
import type { UserAuth } from "../../../app/use-cases/user-auth/UserAuth.js";

export class AuthController {

    private userAuth: UserAuth;

    constructor(userAuth: UserAuth) {
        this.userAuth = userAuth;
    }

    async authenticate(username: string, password: string): Promise<{ token: string; payload: any }> {
        try {
            const credentials = new UserCredentialsDTO(username, password);
            const processLogin = await this.userAuth.login(credentials);
            if (!processLogin.token) {
                throw new Error("No se pudo generar el token.");
            }
            return { token: processLogin.token, payload: processLogin.payload };
        } catch (err) {
            throw new Error((err as Error).message);
        }

    }

}