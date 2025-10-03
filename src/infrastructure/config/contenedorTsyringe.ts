import "reflect-metadata";
import { container } from "tsyringe";
import { Sequelize } from "sequelize";

// services
import UserRepository from "../adapters/repositories/UserRepository.js";
import type IUserRepository from "../../app/ports-out/repository/IUserRepository.js";
import HashedService from "../adapters/services/HashedService.js";
import type IHashedService from "../../app/ports-out/utils/IHashedService.js";
import LoginService from "../adapters/services/LoginService.js";
import type ILogginService from "../../app/ports-out/utils/ILogginService.js";
import Database from "../sequealize/sequelize.js";

// Use Cases
import { UserAuth } from "../../app/use-cases/user-auth/UserAuth.js";

//Instancias
container.registerInstance<Sequelize>("Sequealize", await Database() as Sequelize);


//Services
container.register<IUserRepository>("IUserRepository", { useClass: UserRepository });
container.register<ILogginService>("ILogginService", { useClass: LoginService });
container.register<IHashedService>("IHashedService", { useClass: HashedService });


// Use Cases
container.register<UserAuth>("UserAuth", { useClass: UserAuth });

export { container };