import { Schema, model, InferSchemaType } from "mongoose";
import { IPlant } from "../../domain/schemas";

const plantSchema = new Schema<IPlant>(
    {
        name: { type: String, required: true },
        description: String,
    }
);

export type Plant = InferSchemaType<typeof plantSchema>;
export const Plant = model<IPlant>("Plant", plantSchema);
