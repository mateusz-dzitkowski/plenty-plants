import { connect } from "mongoose";

export const connectDB = async (host: string, database: string) => {
    try {
        return connect(`mongodb://${host}:27017/${database}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
