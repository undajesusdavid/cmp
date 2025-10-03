import jwt from "jsonwebtoken";
import { configJwt } from "../../config/envairoments.js";

import type ILogginService from "../../../app/ports-out/utils/ILoginService.js";
import type { UserPayload } from "../../../app/dto-response/UserAuthenticatedDTO.js";
import { ServiceResultDTO } from "../../../app/dto-response/ServiceResultDTO.js";
import { injectable } from "tsyringe";

@injectable()
export default class LoginService implements ILogginService {

    signIn(payload: UserPayload): ServiceResultDTO<string> {
        try {
            const token = jwt.sign(
                payload,
                configJwt.JWT_SECRET,
                { expiresIn: configJwt.JWT_EXPIRES_IN },
                
            );
            return new ServiceResultDTO<string>(token);
        } catch(error) {
            return new ServiceResultDTO<string>(null, { status: "500", code: "JWT_ERROR", message: "Error generating JWT: " + (error as Error).message });  
        }

    }
}