import bodyParser from "body-parser";
import express from "express";
import * as routes from "./routes";

export const app = express();

// Express config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/", (req, res) => {
    res.send("App running")
})

// all other routes
app.use("/api/plants", routes.plantRouter);
