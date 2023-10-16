export interface IPlant {
    name: string;
    description?: string;
}

export type IPlantUpdate = Partial<IPlant>;
