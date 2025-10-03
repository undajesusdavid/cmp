import { injectable } from "tsyringe";
import type IHashedService from "../../../app/ports-out/utils/IHashedService.js";
import bcrypt from "bcryptjs";

@injectable()
export default class HashedService implements IHashedService {
   
    async hash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        return hashed;
    }

    async compare(passwordPlain: string, passwordHashed: string): Promise<boolean> {
        return await bcrypt.compare(passwordPlain, passwordHashed);
    }

}