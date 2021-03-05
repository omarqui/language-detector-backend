const addRoute = (routesList, endPoints, controller) => {
    routesList.push({
        endPoints,
        controller
    });
}

module.exports = addRoute;