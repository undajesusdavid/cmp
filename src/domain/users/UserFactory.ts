import { User } from './User.js';
import { UserId } from './UserId.js';
import { Password, type PasswordHasher } from './Password.js';

export class UserFactory {
    // Recibe las dependencias de generación de IDs y hasheo como inyecciones
    constructor(
        private uuidGenerator: () => string,
        private hasher: PasswordHasher
    ) { }

    public createNewUser(username: string, rawPassword: string): User {
        // 1. Crear VOs inmutables
        const id = UserId.createNew(this.uuidGenerator);
        const password = Password.create(rawPassword, this.hasher);

        // 2. Aplicar validaciones iniciales de la Fábrica (si son necesarias)
        if (!username) {
            throw new Error('El nombre de usuario no puede estar vacío.');
        }

        // 3. Crear el Agregado Raíz
        return (User as any).fromExisting( // Usamos fromExisting o un método privado para inicializar
            id,
            username,
            password,
            true // isActive por defecto
        );
    }
}