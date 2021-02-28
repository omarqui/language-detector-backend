const http = require("http");
const { PORT } = process.env;

const createServer = routesHandler => {
    const server = http.createServer(routesHandler);

    server.listen(PORT, () => {
        console.log(`Server on port ${PORT}`);
    });
}

module.exports = createServer;