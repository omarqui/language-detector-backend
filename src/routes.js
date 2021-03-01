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

const routesHandlers = (req, res) => {
    let shouldReturnDefaultEnpoint = true;
    
    if (req.method !== 'GET') {
        redirectTo('/404')(req, res);
        res.end();
        return;
    }
    routesList.map(route => {
        const findEndPoint = endPoint => {
            const url = req.url;
            
            if (typeof(endPoint) == 'object'){
                const re = RegExp(endPoint);
                return re.test(url);
            }
            
            return url === endPoint;
        }

        if (route.endPoints.find(findEndPoint)) {
            route.controller(req, res);
            shouldReturnDefaultEnpoint = false;
        }
    });

    if (shouldReturnDefaultEnpoint) {
        redirectTo('/404')(req, res);
        res.end();  
    }    
}

module.exports = routesHandlers;