export class UserCredentialsDTO {

    public readonly username: string;
    public readonly password: string;

    constructor(username: string, password: string) {
        if (!username || !password) {
            throw new Error("Por favor, proporciona nombre de usuario y contraseña.");
        }
        this.username = username;
        this.password = password;
    }
}