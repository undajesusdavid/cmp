export class UserCreateDTO {

    private username: string;
    private password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }

    validCredentials() {
        if (!this.username || !this.password) {
            throw new Error("Por favor, proporciona nombre de usuario y contraseña.");
        }
        if (this.password.length < 6) {
            throw new Error("La contraseña debe tener al menos 6 caracteres.");
        }
        return true;
    }

    getUsername() {
        return this.username;
    }
    
    getPassword() {
        return this.password;
    }

    getAll() {
        return {
            username: this.username,
            password: this.password,
        }
    }

} 