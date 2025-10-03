import type { ServiceResultDTO } from "../../dto-response/ServiceResultDTO.js";
import type { UserPayload } from "../../dto-response/UserAuthenticatedDTO.js";


export default interface ILoginService {
    signIn: (payload: UserPayload) => ServiceResultDTO<string>;
   
}