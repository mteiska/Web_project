const mongoose = require("mongoose");

const Schema = mongoose.Schema;
//Create new schema for post information
let Comment = new Schema ({
    comment_text: {type: String}

});

module.exports = mongoose.model("comments", Comment);