const express = require("express");

const { RestaurantModel } = require("../model/restaurant_model");

const restRoute = express.Router();


restRoute.get("/api/restaurants/:id/menu", async (req, res) => {
    let id = req.params.id
    try {
        let rest = await RestaurantModel.find({ "_id": id });
        let menu = rest.menu;
        res.status(200).send(menu);
    }
    catch (err) {
        res.status(400).send(err);
    }
})
restRoute.post("/api/restaurants", async (req, res) => {

    try {
        let rest = await RestaurantModel.insertMany(req.body);
        res.send(rest);
    }
    catch (err) {
        res.status(400).send(err);
    }
})


restRoute.put("/api/restaurants/:id/menu", async (req, res) => {
    let id = req.params.id;

    console.log(id, req.body);
    try {
        let rest = await RestaurantModel.find({ "_id": id });
        rest[0].menu = rest[0].menu.push(req.body);
        console.log(rest);
        let newmenu = await RestaurantModel.findByIdAndUpdate({ "_id": id }, rest[0]);
        res.status(200).send("successfully added");
    }
    catch (err) {
        res.status(400).send(err);
    }
})

restRoute.delete("/api/restaurants/:resid/menu/:menuid", async (req, res) => {
    let resid = req.params.resid;
    let menuid = req.params.menuid;
    try {
        let rest = await RestaurantModel.find({ "_id": resid });
        console.log("res", rest);
        rest[0].menu = rest[0].menu.splice(menuid, 1);
        console.log("res1", rest);
        let newmenu = await RestaurantModel.findByIdAndUpdate({ "_id": resid }, rest[0]);
        res.status(202).send("menu item is deleted successfully");
    }
    catch (err) {
        res.status(400).send(err);
    }
})








module.exports = {
    restRoute
}