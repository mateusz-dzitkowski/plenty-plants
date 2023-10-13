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
        try {
            return Plant.findById(id);
        } catch (err) {
            return null
        }
    }
}

export const plantService = mongoDBPlantService
