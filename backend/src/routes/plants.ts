import { Router, Request } from "express";
import { IPlant, IPlantUpdate } from "../domain/schemas";
import { plantService } from "../database/mongodb/services";
import { param, validationResult, ValidationChain, ValidationError } from "express-validator";

const ipIs24LongHex = (): ValidationChain => {
    return param("id").matches(/^[0-9A-Fa-f]{24}$/)
}

type PlantResponse = IPlant | { errors: ValidationError[] };

export const router = Router();

router.get("/", async (req, res) => {
    const plants = await plantService.getAll();
    return res.send(plants);
})

router.get("/:id", ipIs24LongHex(), async (req: Request<{ id: string }>, res) => {
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

router.patch("/:id", ipIs24LongHex(), async (req: Request<{ id: string }, PlantResponse, IPlantUpdate>, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        const updated = await plantService.update(req.params.id, req.body);
        if (updated === null) {
            res.status(404);
        }
        return res.send(updated)
    }
    return res.status(400).send({ errors: result.array() });
});
