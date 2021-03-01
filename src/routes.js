const addRoute = require('./helpers/addRoute');
const redirectTo = require('./helpers/redirectTo');
const home = require('./controllers/home.controller');
const controller404 = require('./controllers/404.controller');
const parcer = require('./controllers/parser.controller');

const routesList = [];
const addRouteProxi = (endPoints, constructor) =>
    addRoute(routesList, endPoints, constructor);

addRouteProxi([
    `/home`,
    '/index',
    '/home.html',
    '/index.html'
], redirectTo('/'));
addRouteProxi(['/'], home);
addRouteProxi(['/404'], controller404);
addRouteProxi([/\/parser\?*/], parcer);

const routesHandlers = async (req, res) => {
    let handler;
    if (req.method !== 'GET') {
        redirectTo('/404')(req, res);
        res.end();
        return;
    }

    routesList.some(route => {
        const findEndPoint = endPoint => {
            const url = req.url;
            
            if (typeof(endPoint) == 'object'){
                const re = RegExp(endPoint);
                return re.test(url);
            }
            
            return url === endPoint;
        }

        if (route.endPoints.find(findEndPoint)) {
            handler = route.controller;
            return true;
        }
    });

    if (handler == undefined) {
        handler = redirectTo('/404');
    }    
    
    await handler(req, res);
    res.end();  
}

module.exports = routesHandlers;