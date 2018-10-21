const express = require('express');
const http = require('http');

const middleware = require('./middleware');

const app = express();


middleware(app);

const server = http.createServer(app);


app.get('/', (req, res) =>{
    res.send('ok');
})


app.listen('9090', function () {
   console.log('application is listening to 9090');
})