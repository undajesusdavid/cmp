export class userDTO {

    private id: string;
    private username: string;
    private password: string;

    constructor(id: string, username: string, password: string) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

    getId() {
        return this.id;
    }

    getUsername() {
        return this.username;
    }
    
    getPassword() {
        return this.password;
    }

    getAll() {
        return {
            id: this.id,
            username: this.username,
            password: this.password,
        }
    }

} 