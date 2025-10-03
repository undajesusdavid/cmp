export class UserCredentialsDTO {

    public readonly username: string;
    public readonly password: string;

    constructor(username: string, password: string) {
        if (!username || !password) {
            throw new Error("Por favor, proporciona nombre de usuario y contraseña.");
        }
        if (password.length < 6) {
            throw new Error("La contraseña debe tener al menos 6 caracteres.");
        }
        this.username = username;
        this.password = password;
    }
}