const express = require("express");
const ExpressError = require("./expressError");
const ITEMS = require("./fakeDatabase");
const Item = require("./itemclass");
const itemRoutes = require("./itemRoutes");

const app = express();

app.use(express.json());
app.use("/items", itemRoutes);

// 404 handler
app.use(function (req, res, next) {
    return new ExpressError("Page not found", 404);
})

// general error handler
app.use((error, req, res, next) => {
    let status = error.status || 500;
    let msg = error.msg;

    return res.status(status).json({
        error: {msg, status}
    })
})

// MOVED to server.js so I could run tests
// app.listen(3000, () => {
//     console.log("starting server on port 3000")
// })

// let milk = new Item("milk", "9999")

module.exports = app;
