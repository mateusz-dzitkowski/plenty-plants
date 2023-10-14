import { app } from "./app";
import { connectDB } from "./database/mongodb/connect";

const port = 3000;
await connectDB(process.env.DB_HOST, process.env.DB_NAME);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
