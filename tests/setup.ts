import { beforeAll, beforeEach, afterAll } from "bun:test";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongod: MongoMemoryServer;

beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
});

afterAll(async () => {
    await mongod.stop();
});

export const connect = async () => {
    await mongoose.connect(mongod.getUri());
};

export const clear = async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
};

export const disconnect = async () => {
    await mongoose.disconnect();
};
