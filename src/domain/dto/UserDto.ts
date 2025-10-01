export class LoggedUserDto {

    private id: string;
    private username: string;
    private password: string;

    constructor(id: string, username: string, password: string) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

    get() {
        return {
            id: this.id,
            username: this.username,
            password: this.password,
        }
    }

} 