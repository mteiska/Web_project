const mongoose = require("mongoose");

const Schema = mongoose.Schema;
//Create new schema for User information
let Users = new Schema ({
    email: {type: String},
    password: {type: String}

});

module.exports = mongoose.model("users", Users);