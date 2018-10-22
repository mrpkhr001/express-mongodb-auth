const express = require('express');
const http = require('http');

require("./connect");

const middleware = require('./middleware');
const router = require('./router');

const app = express();

middleware(app);
router(app);
http.createServer(app);

app.listen('9090', function () {
   console.log('application is listening to 9090');
})