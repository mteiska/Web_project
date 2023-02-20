const mongoose = require("mongoose");

const Schema = mongoose.Schema;
//Create new schema for post information
let Post = new Schema ({
    postname: {type: String},
    code: {type: String}

});

module.exports = mongoose.model("posts", Post);