// Asume que tienes un servicio de hasheo inyectable (ej: bcrypt)
export interface PasswordHasher {
    hash(password: string): string;
    verify(rawPassword: string, hashedPassword: string): boolean;
}

export class Password {
    private readonly value: string;
    private static readonly MIN_LENGTH = 8;

    private constructor(hashedValue: string) {
        this.value = hashedValue;
    }

    // Constructor para cuando recibes una nueva contraseña en texto plano
    public static create(rawPassword: string, hasher: PasswordHasher): Password {
        if (rawPassword.length < Password.MIN_LENGTH) {
            throw new Error(`La contraseña debe tener al menos ${Password.MIN_LENGTH} caracteres.`);
        }

        const hashed = hasher.hash(rawPassword);
        return new Password(hashed);
    }

    // Método para reconstruir desde la base de datos (ya hasheado)
    public static fromHash(hashedValue: string): Password {
        return new Password(hashedValue);
    }

    public getHashedValue(): string {
        return this.value;
    }

    public matches(rawPassword: string, hasher: PasswordHasher): boolean {
        return hasher.verify(rawPassword, this.value);
    }
}