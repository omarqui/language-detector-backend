const endWrapper = controller => (req, res) => {
    controller(req, res);
    res.end();
}

const addRoute = (routesList, endPoints, controller) => {
    routesList.push({
        endPoints,
        controller: endWrapper(controller)
    });
}

module.exports = addRoute;