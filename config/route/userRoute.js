const express = require("express");
const { UserModel } = require("../model/user_model");
const { hashing } = require("../middleware/bcrypt")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require("dotenv").config();
const userRoute = express.Router();

userRoute.post("/api/login", async (req, res) => {
    let { email, password } = req.body;
    try {
        const user = await UserModel.find({ email });
        // console.log(user);
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, function (err, result) {
                if (result) {
                    let token = jwt.sign({ userid: user[0]._id }, process.env.secret_key);
                    res.status(201).send({ "msg": "Successfully login", "token": token });
                }
                else {
                    res.status(400).send("Please enter correct credentails");
                }
            });
        }
        else {
            res.status(400).send("Please enter correct credentails");
        }
    }
    catch (err) {
        res.status(400).send(err);
    }
})

userRoute.patch("/api/user/:id/reset", async (req, res) => {
    let id = req.params.id
    // console.log(req.body);
    try {
        const user = await UserModel.find({ "_id": id });
        bcrypt.compare(req.body.oldpassword, user[0].password, async function (err, result) {
            // console.log("result1", result)
            if (result) {
                bcrypt.hash(req.body.newpassword, 5, async function (err, hash) {
                    if (err) {
                        res.status(400).send("Something Went Wrong!");
                    }
                    else {
                        let data = await UserModel.findByIdAndUpdate({ "_id": id }, { "passord": hash });
                        res.status(204).send({ "msg": "Passord successfully updated", "data": data })
                    }
                })

            }
            else {
                res.status(400).send("Please enter correct credentails");
            }
        })
    }
    catch (err) {
        res.status(400).send(err);
    }

})


userRoute.use(hashing)
userRoute.post("/api/register", async (req, res) => {
    // let { name, email, password, "address": { street, city, state, country, zip } } = req.body
    // console.log(req.body);
    try {
        let user = await UserModel.find({ email: req.body.email });
        if (user.length == 0) {
            const data = await UserModel.insertMany(req.body);
            res.status(201).send({ "msg": "Successfully registered", "data": data });
        }
        else {
            res.status(200).send("Already registered!");
        }
    }
    catch (err) {
        res.status(400).send(err);
    }


})








module.exports = {
    userRoute
}

