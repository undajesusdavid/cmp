import type * as userDto from "../dto/user/UserDTO.js";

export default interface IUserRepository {
    getByUsername : (username: string) => Promise<userDto.userDTO>;
    getByEmail : (username: string) => Promise<userDto.userDTO>;
}