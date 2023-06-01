const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose
const orderSchema = mongoose.Schema({

    "user": { type: Types.ObjectId, ref: 'User' },
    "restaurant": { type: Types.ObjectId, ref: 'Restaurant' },
    "items": [{
        "name": String,
        "price": Number,
        "quantity": Number
    }],
    "totalPrice": Number,
    "deliveryAddress": {
        "street": String,
        "city": String,
        "state": String,
        "country": String,
        "zip": String
    },
    "status": String
})

const OrderModel = mongoose.model("Order", orderSchema);

module.exports = {
    OrderModel
}