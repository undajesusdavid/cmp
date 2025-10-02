// Asume que tienes una función para generar UUIDs (ej: de la librería 'uuid')
// import { v4 as uuidv4 } from 'uuid';

export class UserId {
    private readonly value: string;

    private constructor(value: string) {
        // Validación de invariantes (asegurar el formato)
        if (!this.isValidUUID(value)) {
            throw new Error('UserId debe ser un UUID válido.');
        }
        this.value = value;
    }

    // Método de dominio para crear un nuevo ID (Generación en el Dominio)
    public static createNew(uuidGenerator: () => string): UserId {
        const newId = uuidGenerator(); // Simulación de generación de UUID
        return new UserId(newId);
    }
    
    // Método para reconstruir desde persistencia o entrada
    public static fromString(id: string): UserId {
        return new UserId(id);
    }

    public getValue(): string {
        return this.value;
    }

    // Los Value Objects deben comparar su valor para determinar igualdad
    public equals(other: UserId): boolean {
        return other instanceof UserId && other.value === this.value;
    }

    private isValidUUID(uuid: string): boolean {
        // Implementación de validación de formato UUID
        const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        return regex.test(uuid);
    }
}