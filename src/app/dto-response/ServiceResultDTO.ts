
export type ServiceError = {
    status: string,
    code: string;
    message: string;
};

export class ServiceResultDTO<T> {

    public readonly error: ServiceError | null;
    public readonly result: T | null;

    constructor(result: T | null, error?: ServiceError) {
        this.error = error ? { status: error.status, code: error.code, message: error.message } : null;
        this.result = result;
    }
} 