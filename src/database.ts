import { connect } from "mongoose";

export const connectDB = async () => {
    try {
        await connect(process.env.MONGODB_CONN_STRING);
        console.log("MongoDB connected...");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}
