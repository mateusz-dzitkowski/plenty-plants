import { IPlant, IPlantUpdate } from "./schemas";

export interface PlantService {
    create(plant: IPlant): Promise<IPlant>;
    getAll(): Promise<IPlant[]>;
    getOne(id: string): Promise<IPlant>;
    update(id: string, data: IPlantUpdate): Promise<IPlant>;
}
