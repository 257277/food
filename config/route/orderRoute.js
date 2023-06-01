const express = require("express");
const { OrderModel } = require("../model/order_model");
const orderRoute = express.Router();

orderRoute.post("/api/orders", async (req, res) => {
    try {
        let data = await OrderModel.insertMany(req.body);
        res.status(201).send("order placed");
    }
    catch (err) {
        res.status(400).send(err);
    }
})


orderRoute.get("/api/orders/:id", async (req, res) => {
    let id = req.params.id;
    console.log(id);
    try {
        let data = await OrderModel.find({ "_id": id });
        res.status(200).send(data);
    }
    catch (err) {
        res.status(400).send(err);
    }
})

orderRoute.patch("/api/orders/:id", async (req, res) => {
    let status = req.body.status;
    let id = req.params.id;
    try {
        let data = await OrderModel.findByIdAndUpdate({ "_id": id }, { "status": status })
        res.status(204).send("Status is updated");
    }
    catch (err) {
        res.status(400).send(err);
    }
})


module.exports = {
    orderRoute
}