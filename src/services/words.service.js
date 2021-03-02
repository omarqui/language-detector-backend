const Word = require('../models/Word')

const getWords = async (wordsId) => {
    return await Word.find({
        '_id': { $in: wordsId }
    });
}

module.exports = getWords;