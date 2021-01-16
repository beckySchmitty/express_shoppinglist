const ExpressError = require("./expressError");
const ITEMS = require("./fakeDatabase")

class Item {
    constructor(name, price) {
        this.name = name;
        this.price = price || "price not found";
        // keep track of all items
        ITEMS.push(this)
    }

        // find item in ITEMS
    static find(name) {
        const foundItem = ITEMS.find(i => i.name === name);
        if(foundItem === undefined){
        throw new ExpressError("Item not Found", 404)
        }
        return foundItem
    }

    static update(name, data) {
        let foundItem = Item.find(name)
        if (foundItem === undefined) {
            throw new ExpressError("Item not Found", 404)
        }
        foundItem.name = data.name;
        foundItem.price = data.price;
      
        return foundItem;
    }

    static remove(name) {
        let foundItem = Item.find(name)
        ITEMS.splice(foundItem, 1)
    }


}

module.exports = Item;