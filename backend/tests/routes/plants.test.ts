import {describe, test, expect, afterAll, beforeEach, beforeAll } from "bun:test";
import request from "supertest";
import { app } from "../../src/app";
import { Plant } from "../../src/database/mongodb/models";
import { connect, clear, disconnect } from "../setup";

describe("Test the plants route", async () => {
    beforeAll(connect);
    beforeEach(clear);
    afterAll(disconnect);

    test("Should return an empty list",  async () => {
        const res = await request(app).get("/api/plants");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([]);
    });

    test("Should get one plant in a list", async () => {
        await new Plant({name: "test-plant"}).save();
        const res = await request(app).get("/api/plants");
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(1);
        expect(res.body[0].name).toEqual("test-plant");
    });

    test("Should get a plant", async () => {
        const plant = await new Plant({ name: "test-plant" }).save();
        const res = await request(app).get(`/api/plants/${plant.id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body._id).toEqual(plant.id.toString());
    });

    test("Should get an undefined when there is no plant with such ID", async () => {
       const res = await request(app).get("/api/plants/aaaaaaaaaaaaaaaaaaaaaaaa");
       expect(res.statusCode).toEqual(404);
       expect(res.body).toEqual(undefined);
    });

    test.each([
        "aaa",
        "zzzzzzzzzzzzzzzzzzzzzzzz"
        ])("Should get an error if the ID is not 24 characters long", async (id: string) => {
        const res = await request(app).get(`/api/plants/${id}`);
        expect(res.statusCode).toEqual(400);
        expect(res.body.errors.length).toEqual(1);
        expect(res.body.errors[0].msg).toEqual("Invalid value");
    });

    test("Should create a plant", async () => {
        const payload = { name: "test-plant" };
        const res = await request(app).post("/api/plants").send(payload);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toMatchObject(payload);
    });

    test("Should error when not all required fields are provided", async () => {
        const res = await request(app).post("/api/plants");
        expect(res.statusCode).toEqual(500);
    });
});
