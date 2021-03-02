const url = require('url');
const renderPage = require('../helpers/renderPage');
const getWords = require('../services/words.service');

const parcerHandler = async (req, res) => {
    const queryObject = url.parse(req.url, true).query;

    let result = '',
        textSearched = '';

    if (queryObject.q !== undefined) {
        textSearched = queryObject.q.replace(/\+/g, ' ');
        result = await detectLanguage(textSearched);
    }

    renderPage(res, "parser", {
        result,
        textSearched
    });
};

const detectLanguage = async text => {
    const words = text.split(' ');
    const knowedWords = await getWords(words);

    if (knowedWords.length == 0) return 'Sorry, language not detected!';

    const languageGroups = groupWordByLanguage(knowedWords);
    const accuracies = calculateAccuracy(languageGroups, words.length);
    const firstLanguage = getFirstLanguage(accuracies);

    return `This text is ${firstLanguage.lang} with ${firstLanguage.accuracy * 100}% accurancy`;
}

const groupWordByLanguage = words => {
    const languageGroups = {};
    words.map(word => {
        word.languages.forEach(lang => {
            if (!languageGroups[lang])
                languageGroups[lang] = { lang: lang, count: 0 };
            languageGroups[lang].count++;
        });
    });

    return languageGroups;
}

const calculateAccuracy = (languageGroups, totalWords) => {
    const languageResumeList = Object.values(languageGroups);

    return languageResumeList.map(resume => {
        return {
            ...resume,
            accuracy: (resume.count / totalWords)
        };
    });
}

const getFirstLanguage = accuracies => {
    return accuracies.reduce((prev, current) =>
        prev.accuracy > current.accuracy ? prev : current)
}

module.exports = parcerHandler;