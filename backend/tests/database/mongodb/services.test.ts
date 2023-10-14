import { describe, test, expect, afterAll, beforeEach, beforeAll } from "bun:test";
import { plantService } from "../../../src/database/mongodb/services";
import { Plant } from "../../../src/database/mongodb/models";
import { connect, clear, disconnect } from "../../setup";

describe("Test the plant service", async () => {
    beforeAll(connect);
    beforeEach(clear);
    afterAll(disconnect);

    test("Should create a Plant and save it to the database",  async () => {
        const plant = { name: "test-plant", description: "test-description" }
        await plantService.create(plant);
        const plants = await Plant.find() ;
        expect(plants.length).toEqual(1);
        expect(plants[0]).toMatchObject(plant);
    });

    test("Should return an empty list when no Plants were created", async () => {
        const plants = await plantService.getAll();
        expect(plants.length).toEqual(0);
    });

    test("Should return a list of all plants", async () => {
        await new Plant({ name: "test-plant-1" }).save();
        await new Plant({ name: "test-plant-2" }).save();
        const plants = await plantService.getAll();
        expect(plants.length).toEqual(2);
    });

    test("Should get a plant given the ID", async () => {
       const dbPlant = new Plant({ name: "test-plant" });
       await dbPlant.save();
       const plant = await plantService.getOne(dbPlant.id);
       expect(plant).toBeInstanceOf(Plant);
       expect(plant.name).toBe("test-plant");
    });

    test("Should get null when there is no such ID", async () => {
        const plant = await plantService.getOne("non-existent");
        expect(plant).toBeNull();
    });
});
