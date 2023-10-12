import { Schema, model, InferSchemaType } from "mongoose";

interface IPlant {
    name: string;
    description?: string;
}

const plantSchema = new Schema<IPlant>(
    {
        name: { type: String, required: true },
        description: String,
    }
);

export type Plant = InferSchemaType<typeof plantSchema>;
export const Plant = model<IPlant>("Plant", plantSchema);
