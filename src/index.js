require('dotenv').config();
const createServer = require('./config/server');
const { connectDB } = require('./config/connectDB');
const routes = require('./routes');

createServer((routes));
connectDB();