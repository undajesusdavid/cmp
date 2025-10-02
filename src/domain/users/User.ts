import { UserId } from './UserId.js';
import { Password } from './Password.js';

export class User {
    // Las propiedades son privadas y, preferiblemente, inmutables (readonly)
    private readonly id: UserId;
    private username: string; // Entidad mutable (nombre de usuario puede cambiar)
    private password: Password; // Value Object
    private isActive: boolean;

    // Constructor privado para forzar la creación a través de un Factory o métodos estáticos
    private constructor(id: UserId, username: string, password: Password, isActive: boolean) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.isActive = isActive;
    }
    
    // Método estático para reconstruir el estado desde persistencia (ej. un repositorio)
    public static fromExisting(
        id: UserId, 
        username: string, 
        password: Password, 
        isActive: boolean
    ): User {
        // Aquí se pueden poner validaciones generales de estado
        return new User(id, username, password, isActive);
    }

    // --- Métodos de Comportamiento (Lógica de Negocio) ---
    
    public updateUsername(newUsername: string): void {
        if (newUsername.length < 3) {
            throw new Error('El nombre de usuario debe tener al menos 3 caracteres.');
        }
        this.username = newUsername;
    }

    public updatePassword(rawNewPassword: string, hasher: any): void {
        // La entidad usa su VO para manejar la lógica de la contraseña
        this.password = Password.create(rawNewPassword, hasher);
    }

    public deactivate(): void {
        this.isActive = false;
        // Aquí podría emitirse un evento de dominio, ej: UserDeactivated.
    }

    // --- Getters de Acceso Controlado (solo para leer) ---
    
    public getId(): UserId {
        return this.id;
    }

    public getUsername(): string {
        return this.username;
    }
    
    public isActiveStatus(): boolean {
        return this.isActive;
    }
}