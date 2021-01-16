process.env.NODE_ENV = "test";

const app = require('../app')
const request = require("supertest")
const ITEMS = require("../fakeDatabase");
const Item = require("../itemclass");

let item = { name: "milk", price: "2.49" }

beforeEach(function () {
    ITEMS.push(item)
})

afterEach(function () {
    // instead of ITEMS = [] because we want to make sure it mutates not redefines it
    ITEMS.length = 0;
})

describe("GET /items", () => {
    test("get all items", async () =>{
        const resp = await request(app).get('/items');
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual([item]);
        expect(ITEMS).toHaveLength(1);

    })
})

describe("GET /items/:name", () => {
    test("get specific item", async () =>{
        const resp = await request(app).get('/items/milk');
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({item});
    })
})