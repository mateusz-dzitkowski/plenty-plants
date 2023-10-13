import { describe, test, expect } from "bun:test";
import request from "supertest";
import { app } from "../src/app";

describe("Test the root path", async () => {
    test("Should respond to GET",  async () => {
        const res = await request(app).get("/");
        expect(res.statusCode).toEqual(200);
    });
});
