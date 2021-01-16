const express = require("express");
const ITEMS = require("./fakeDatabase");
const itemRoutes = require("./itemRoutes");

const app = express()

app.use(express.json())
app.use("/items", itemRoutes)

app.get('/', (req, res, next) => {
    return res.json(ITEMS);
})

app.get('/:name', (req, res, next) => {
    const item = ITEMS.find(i => i.name === req.params.name);
    return res.json(item);
})

app.post('/', (req, res, next) => {
    const newItem = req.body;
    items.push(newItem);
    return res.json({added: newItem});
})

app.patch('/:name', (req, res, next) => {
    const item = ITEMS.find(i => i.name === req.params.name);
    item.name = req.body.name;
    item.price = req.body.price;
    return res.json({updated: item})
})

app.delete('/:name', (req, res, next) => {
    const item = ITEMS.find(i => i.name === req.params.name);
    ITEMS.splice(item, 1)
    return res.json({message: "deleted"})
})


app.listen(3000, () => {
    console.log("starting server on port 3000")
})

let milk = {
    name: "milk",
    price: "3.45"
}
ITEMS.push(milk)