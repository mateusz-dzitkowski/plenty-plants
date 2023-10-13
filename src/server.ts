import bodyParser from "body-parser";
import express from "express";

import { connectDB } from "./database/mongodb/connect";
import * as routes from "./routes";

const app = express();
const port = 3000;

connectDB().then(() => {
    // Express config
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.get("/", (req, res) => {
        res.send("App running")
    })

    // all other routes
    app.use("/api/plants", routes.plantRouter);

    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    })
});
