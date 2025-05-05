const mongoose = require('mongoose');

//I'm assuming this will be set up similar to Trello

//Each Item
const elementSchema = new mongoose.Schema({
    taskName: {type: String, required: true},
    taskDescription: String,
    date: String
});
//A way to group Items
const listSchema = new mongoose.Schema({
    title: {type: String, required: true},
    items: [elementSchema]
});
//A way to group the groups
const boardSchema = new mongoose.Schema({
    name: { type: String, required: true },
    boards: [listSchema]
});

module.exports = mongoose.model('Board', boardSchema);