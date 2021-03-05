const mongoose = require("mongoose");

const Word = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    languages: {
        type: Array,
        required: true
    }
});
const WordModel = mongoose.model('Word', Word);

module.exports = WordModel;