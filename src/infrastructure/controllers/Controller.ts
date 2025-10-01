import type { Model, ModelStatic, Sequelize } from "sequelize";

export class Controller {
    private sequelize: Sequelize;

    constructor(sequelize: Sequelize) {
        this.sequelize = sequelize;
    }   

    protected getModel(name: string) {
        return this.sequelize.models[name] as ModelStatic<Model>;
    }
}