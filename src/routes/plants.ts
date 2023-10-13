import { Router, Request } from "express";
import { IPlant } from "../domain/schemas";
import { plantService } from "../database/mongodb/services";
import { param, validationResult } from "express-validator";

export const router = Router();

router.get("/", async (req, res) => {
    const plants = await plantService.getAll();
    return res.send(plants);
})

router.get("/:id", param("id").matches(/^[0-9A-Fa-f]{24}$/), async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        const plant = await plantService.getOne(req.params.id);
        if (plant === null) {
            res.status(404);
        }
        return res.send(plant);
    }
    res.status(400).send({ errors: result.array() })
})

router.post("/", async (req: Request<object, IPlant>, res) => {
    try {
        const plant = await plantService.create(req.body)
        res.json(plant);
    } catch (err) {
        res.status(500).send(err);
    }
})
