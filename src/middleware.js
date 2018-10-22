const bodyParser = require('body-parser');
const morgan = require('morgan');

const middleware  = function(app){
    app.use(bodyParser.json({type: '*/*'}));
    app.use(morgan('combined'));
};


module.exports = middleware;
