require('dotenv').config();
const createServer = require('./config/server');
const routes = require('./routes');

createServer(routes);