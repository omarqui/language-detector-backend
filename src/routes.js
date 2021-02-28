const home = require('./controllers/home.controller');
const route404 = require('./controllers/404.controller');

const redirectTo = location => {
    return (req, res) => {
        res.writeHead(302, {
            'Location': location
        });
    };
}

const routes = (req, res) => {
    let handler;

    switch (req.url) {
        case '/home':
        case '/index':
        case '/home.html':
        case '/index.html':
            handler = redirectTo('/')
            break;
        case '/':        
            handler = home;
            break;
        case '/404':
            handler = route404;
            break;
        default:
            handler = redirectTo('/404')
            break;
    }

    handler(req, res);
    res.end();
};

module.exports = routes;