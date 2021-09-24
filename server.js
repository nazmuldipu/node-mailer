const dotenv = require('dotenv');
const express = require('express')
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();

const port = process.env.PORT || 3000;
require("./db")();

const routes = require('./api/routes');
routes(app);

const server = app.listen(port, function () {
    console.log('Server started on port: ' + port);
});

module.exports = server;