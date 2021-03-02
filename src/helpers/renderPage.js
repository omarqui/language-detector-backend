const fs = require('fs');

const insertParams = (html, params) => {
    const placeHolders = html.matchAll(/\|\|.*\|\|/g);

    for (match of placeHolders) {
        const holder = match[0];
        const cleanHolder = holder.replace(/\|/g, '');
        const value = params[cleanHolder] ?? '';
        html = html.replace(holder, value);
    }
    return html;
}


const renderPage = async (res, fileName, params = {}) => {
    try {
        let html = await fs.readFileSync(`${__dirname}/../views/${fileName}.html`, "utf8");
        html = insertParams(html, params);

        res.writeHeader(200, { "Content-Type": "text/html" });
        res.write(html);
        res.end();
    } catch (error) {
        if (error) {
            throw error;
        }
    }
}

module.exports = renderPage;