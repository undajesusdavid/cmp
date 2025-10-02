import type { UserPayload } from "../../dto-response/UserAuthenticatedDTO.js";


export default interface ILogginService {
    loggin: (payload: UserPayload) => Promise<string>;
   
}