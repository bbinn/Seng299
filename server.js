
// CALL THE PACKAGES --------------------
var express       = require('express');
var app           = express();
var bodyParser    = require('body-parser');
var morgan        = require('morgan');
var mongoose      = require('mongoose');
var config 	      = require('./config');
var path 	        = require('path');
var cookieParser  = require('cookie-parser');

// APP CONFIGURATION ==================
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// configure our app to handle CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

app.use(morgan('dev')); // log all requests to the console
mongoose.connect(config.database);  // connect to our database (hosted on modulus.io)
app.use(express.static(__dirname + '/public'));  // set static files location
app.use(express.static(__dirname + '/uploads'));  // set static files location

// API ROUTES ------------------------
var apiRoutes = require('./app/routes')(app, express);
app.use('/api', apiRoutes);

var fileRoutes = require('./app/fileRoutes')(app, express);
app.use('/uploads', fileRoutes);

// MAIN CATCHALL ROUTE ---------------
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

// START THE SERVER
app.listen(config.port);
console.log('Node Server Running on Port ' + config.port);