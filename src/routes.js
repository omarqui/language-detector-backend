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
addRouteProxi(['/parcer'], parcer);

const routesHandlers = (req, res) => {
    let isChanged;

    if (req.method !== 'GET') {
        redirectTo('/404')(req, res);
        return;
    }

    routesList.map(route => {
        if (route.endPoints.find(endPoint => req.url === endPoint)) {
            route.controller(req, res);
            console.log(route);
            isChanged = true;
        }
    });

    if (!isChanged) redirectTo('/404')(req, res);
}

module.exports = {
    routes: routesHandlers
}