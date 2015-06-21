// Setup the app and call necessary packages
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var morgan = require('morgan');

var port = process.env.PORT || 9000;

// use body parser so we can grab info from POST requests
app.use( bodyParser.urlencoded({ extended : true }) );
app.use( bodyParser.json() );

//configure app to handle CORS requests
app.use( function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  next();
});

//log all requests to the console
app.use( morgan('dev') );

// ROUTES FOR THE API
// ==================

// home page
app.get('/', function(req, res){
  res.send('Welcome to the Home Page!');
});

// express router for API
var apiRouter = express.Router();

// Middleware
apiRouter.use(function(req, res, next){
  console.log("API REQUEST MADE");
  next();
});

apiRouter.get('/', function(req, res){
  res.json({ message : "Welcome to the API" });
});


// ADMIN USERS ROUTES for POST and GET requests
apiRouter.route('/users')
  // create a user accessed at POST http://localhost:PORT/api/users
  .post(function(req, res){
    return res.json({ message: "This call should create a new user"});
  })

  // create a user accessed at GET http://localhost:PORT/api/users
  .get(function(req, res){
    console.log("this was called");
    return res.json({ message: "This call should return all users"});
  })

// ADMIN USERS ROUTES for specific users
apiRouter.route('/users/:user_id')

  //get the user associated with the ID
  // (accessed at GET http://localhost:PORT/api/users/:user_id)
  .get(function(req, res){
    res.json({ message: "This call should return the user with specified ID."});
  })
  // update the user with this id
  // (accessed at PUT http://localhost:8080/api/users/:user_id)
  .put(function(req, res){
    res.json({ message: "This call should update the user with the updated values in the PUT data"});
  })
  // delete the user with this id
  // (accessed at DELETE http://localhost:8080/api/users/:user_id)
  .delete(function(req, res){
    res.json({ message: "This call should delete the user with the specified ID."});
  })


// REGISTER THE ROUTES
app.use('/api', apiRouter);

// START THE SERVER
app.listen(port);
console.log("Server waiting for requests on port: " + port);