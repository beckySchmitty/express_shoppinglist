const express = require("express");
const router = new express.Router();
const Item = require("./itemclass");

router.get('/', (req, res, next) => {
    return res.json(ITEMS);
})

router.get('/:name', (req, res, next) => {
    try {
        let foundItem = Item.find(req.params.name)
        return res.json({item:foundItem});
    } catch(e) {
        next(e)
    }
})

router.post('/', (req, res, next) => {
    try {
        let newItem = new Item(req.body.name, req.body.price);
        return res.json({added: newItem}); 
    } catch(e) {
        next(e)
    }

})

router.patch('/:name', (req, res, next) => {
    try {
        let foundItem = Item.update(req.params.name, req.body);        
        return res.json({updated:foundItem});
    } catch(e) {
        next(e)
    }
})

router.delete('/:name', (req, res, next) => {
    try {
        Item.remove(req.params.name);
        return res.json({message:'Deleted'});
      } catch (e) {
        return next(e)
      }
})


module.exports = router;