const express = require("express");
const router = new express.Router();

router.get('/', (req, res, next) => {
    return res.json(ITEMS);
})

router.get('/:name', (req, res, next) => {
    const item = ITEMS.find(i => i.name === req.params.name);
    return res.json(item);
})

router.post('/', (req, res, next) => {
    const newItem = req.body;
    items.push(newItem);
    return res.json({added: newItem});
})

router.patch('/:name', (req, res, next) => {
    const item = ITEMS.find(i => i.name === req.params.name);
    item.name = req.body.name;
    item.price = req.body.price;
    return res.json({updated: item})
})

router.delete('/:name', (req, res, next) => {
    const item = ITEMS.find(i => i.name === req.params.name);
    ITEMS.splice(item, 1)
    return res.json({message: "deleted"})
})


module.exports = router;