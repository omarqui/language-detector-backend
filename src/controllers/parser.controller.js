const Word = require('../models/Word')
const url = require('url');
const parcerHandler = async (req, res) => {
    const queryObject = url.parse(req.url, true).query;
    const { q } = queryObject;
    if (q == undefined) return;

    const words = q.split(/ |%/);

    console.log(words);
    const wordsDB = await Word.find({
        '_id': { $in: words }
    });

    console.log(wordsDB);
    res.write("parser");
};

module.exports = parcerHandler;