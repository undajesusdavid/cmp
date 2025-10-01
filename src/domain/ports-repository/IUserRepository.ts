import type * as userDto from "../dto/UserDto.js";

export default interface IUserRepository {
    getLoggedUser : (username: string, password: string) => userDto.LoggedUserDto,
}