
declare namespace Express {
    export interface Request extends Request {
        // Define aquí tus nuevas propiedades, por ejemplo:
        userId?: string;
        user?: {
            id: string,
            username: string,
        };
    }
}
