const Word = require('../models/Word')
const url = require('url');
const parcerHandler = async (req, res) => {
    const queryObject = url.parse(req.url, true).query;
    const { q } = queryObject;
    if (q == undefined) return;

    const words = q.split(/ |%/);

    const wordsDB = await Word.find({
        '_id': { $in: words }
    });

    const languageResume = {}

    wordsDB.map(word => {
        word.languages.forEach(lang => {
            if (!languageResume['total']) languageResume['total'] = { lang: 'total', count: 0 };
            if (!languageResume[lang]) languageResume[lang] = { lang: lang, count: 0 };
            languageResume[lang].count++;
            languageResume['total'].count++;
        });
    });

    languageResumeList = Object.values(languageResume);
        
    res.write("parser");
};

module.exports = parcerHandler;