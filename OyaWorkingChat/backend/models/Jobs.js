var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var JobsSchema = new Schema({
    status: {
        type: String,
        required: true,
    },

});

var Jobs = mongoose.model("Jobs", JobsSchema);

module.exports = Jobs;
