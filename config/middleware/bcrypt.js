const bcrypt = require('bcrypt');

const hashing = (req, res, next) => {
    bcrypt.hash(req.body.password, 5, function (err, hash) {
        if (err) {
            res.status(400).send("Something Went Wrong!");
        }
        else {
            req.body.password = hash;
            // console.log("middleware successfull");
            next();
        }
    })

}

module.exports = {
    hashing
}