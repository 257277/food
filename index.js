const express = require("express");
const app = express();
const { connection } = require("./config/db");
const { userRoute } = require("./config/route/userRoute")
const { restRoute } = require("./config/route/restaurantRoute")
const { orderRoute } = require("./config/route/orderRoute");

app.use(express.json());
require("dotenv").config();

app.use("/user", userRoute)
app.use("/rest", restRoute);
app.use("/order", orderRoute);


app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log("Successfuly connected to database");
    }
    catch (err) {
        console.log(err);
    }
    console.log(`Server is running on port ${process.env.port}`)
}
)