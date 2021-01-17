process.env.NODE_ENV = "test";

const app = require('../app')
const request = require("supertest")
const ITEMS = require("../fakeDatabase");
const Item = require("../itemclass");

let testItem = { name: "milk", price: "2.49" };
const fourOFourError = {"error": {"msg": "Item not Found", "status": 404}};

beforeEach(function () {
    ITEMS.push(testItem)
});

afterEach(function () {
    ITEMS.length = 0;
});

describe("GET /items", () => {
    test("get all items", async () =>{
        const resp = await request(app).get('/items');
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual([testItem]);
        expect(ITEMS).toHaveLength(1);
    })
})

describe("GET /items/:name", () => {
    test("get specific item sucessfully", async () =>{
        const resp = await request(app).get('/items/milk');
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({item: testItem});
    })
    test("get a 404 instead of item", async () =>{
        const resp = await request(app).get('/items/noitemnamedthis');
        expect(resp.statusCode).toBe(404);
        expect(resp.body).toEqual(fourOFourError);
    })
})

describe("POST /items/", () => {
    test("post item sucessfully", async () =>{
        let newItem = {"name": "cheerios", "price": "3.49"};
        const resp = await request(app).post('/items/').send(newItem);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({added: newItem});
        expect(ITEMS).toHaveLength(2);

    })
    test("post item without name and get 403", async () =>{
        let newItem = {"price": "3.49"};
        const resp = await request(app).post('/items/').send(newItem);
        expect(resp.statusCode).toBe(403);
        expect(ITEMS).toHaveLength(1);
    })
})

describe("PATCH /items/:name", () => {
    test("patch item sucessfully", async () =>{
        let newItem = {"name": "oatmilk", "price": "2.49"};
        const resp = await request(app).patch(`/items/${testItem.name}`).send(newItem);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({updated: newItem});
        expect(ITEMS).toHaveLength(1);

    })
    test("patch item without name and get 403", async () =>{
        let newItem = {"name": "oatmilk", "price": "8.49"};
        const resp = await request(app).patch('/items/ekfdjbcvkej').send(newItem);
        expect(resp.statusCode).toBe(404);
        expect(resp.body).toEqual(fourOFourError);
    })
})

describe("DELETE /items/:name", () => {
    test("delete item sucessfully", async () =>{
        const resp = await request(app).delete(`/items/${testItem.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({"message": "deleted"});
        expect(ITEMS).toHaveLength(0);

    })
    test("fail to delete item - wrong name", async () =>{
        const resp = await request(app).delete('/items/ekfdjbcvkej');
        expect(resp.statusCode).toBe(404);
        expect(resp.body).toEqual(fourOFourError);
    })
})
