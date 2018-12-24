const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const middleware  = function(app){
    app.use(morgan('combined'));
    app.use(cors());
    app.use(bodyParser.json({type: '*/*'}));
};


module.exports = middleware;
