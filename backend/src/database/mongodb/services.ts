import { PlantService } from "../../domain/services";
import { Plant } from "./models";

const mongoDBPlantService: PlantService = {
    async create(plant) {
        const db_plant = new Plant(plant);
        await db_plant.save();
        return db_plant;
    },

    async getAll() {
        return Plant.find();
    },

    async getOne(id) {
        return Plant.findById(id);
    },

    async update(id, data) {
        const updated = Plant.findByIdAndUpdate(id, data, { new: true});
        if (!updated) {
            return null
        }
        return updated
    }
}

export const plantService = mongoDBPlantService;
