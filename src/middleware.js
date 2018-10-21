const bodyParser = require('body-parser');
const morgan = require('morgan');

const middleware  = function(app){
    app.use(bodyParser.json());
    app.use(morgan('combined'));
};


module.exports = middleware;
