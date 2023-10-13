import {describe, test, expect, afterAll, beforeEach, beforeAll } from "bun:test";
import request from "supertest";
import { app } from "../../src/app";
import { plantService } from "../../src/database/mongodb/services";
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

    test("Should get one plant", async () => {
        await plantService.create({name: "test-plant"});
        const res = await request(app).get("/api/plants");
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(1);
        expect(res.body[0].name).toEqual("test-plant");
    })
});
