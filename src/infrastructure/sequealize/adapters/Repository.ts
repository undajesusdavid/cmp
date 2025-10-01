import type { Model, ModelStatic, Sequelize } from "sequelize";

class Repository {

    private sequelize: Sequelize;
    
    constructor(sequelize: Sequelize) {
        this.sequelize = sequelize;
    }


    protected getModel(name: string) {
        if (!name) throw new Error("El nombre del modelo es obligatorio");
        const model = this.sequelize.models[name] as ModelStatic<Model>;
        if (!model) throw new Error(`Model ${name} not found`);
        return model;
    }
}

export default Repository