const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose
const restaurantSchema = mongoose.Schema({
    "_id": Types.ObjectId,
    "name": String,
    "address": {
        "street": String,
        "city": String,
        "state": String,
        "country": String,
        "zip": String
    },
    "menu": [{
        "_id": Types.ObjectId,
        "name": String,
        "description": String,
        "price": Number,
        "image": String,
        "_id": Types.ObjectId
    }]
})

const RestaurantModel = mongoose.model("Restaurant", restaurantSchema);

module.exports = {
    RestaurantModel
}