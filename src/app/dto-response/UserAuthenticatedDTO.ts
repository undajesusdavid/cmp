
export type UserPayload = {
    id: string;
    username: string;
};

export class UserAuthenticatedDTO {

    public readonly token: string;
    public readonly payload: UserPayload;

    constructor(token: string, payload: UserPayload) {
        this.token = token;
        this.payload = payload;
    }
} 