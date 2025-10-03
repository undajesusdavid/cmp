import type { ServiceResultDTO } from "../../dto-response/ServiceResultDTO.js";
import type { UserPayload } from "../../dto-response/UserAuthenticatedDTO.js";


export default interface ILogginService {
    logginJWT: (payload: UserPayload) => ServiceResultDTO<string>;
   
}