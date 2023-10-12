import { Router, Request} from "express";
import { Plant } from "../models";

export const router = Router();

router.get("/", async (req, res) => {
    const plants = await Plant.find() as Plant[];
    res.send(plants);
})

router.post("/", async (req: Request<{}, Plant>, res) => {
    try {
        const plant = new Plant(req.body);
        await plant.save();
        res.json(plant);
    } catch (err) {
        res.status(500).send(err.message)
    }
})
