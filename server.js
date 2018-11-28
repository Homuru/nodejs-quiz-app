// server.js

// set up ======================================================================
// get all the tools we need
var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
const moment = require('moment');
var app = express();
var port = process.env.PORT || 3000;

var passport = require('passport');
var flash = require('connect-flash');
var path = require('path');
// configuration ===============================================================
// connect to our database

require('./config/passport')(passport); // pass passport for configuration
app.use(express.static(path.join(__dirname, 'public')));




// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
	secret: 'vidyapathaisalwaysrunning',
	resave: true,
	saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);


// class App {
// 	constructor(port) {
// 		this.port = port;
// 		this.app = express();
// 		this.config();
// 	}

// 	config() {
// 		this.app.use(morgan('dev')); // log every request to the console
// 		this.app.use(cookieParser()); // read cookies (needed for auth)
// 		this.app.use(bodyParser.urlencoded({
// 			extended: true
// 		}));
// 		this.app.use(bodyParser.json());

// 		this.app.set('view engine', 'ejs'); // set up ejs for templating

// 		// required for passport
// 		this.app.use(session({
// 			secret: 'vidyapathaisalwaysrunning',
// 			resave: true,
// 			saveUninitialized: true
// 		})); // session secret
// 		this.app.use(passport.initialize());
// 		this.app.use(passport.session()); // persistent login sessions
// 		this.app.use(flash()); // use connect-flash for flash messages stored in session

// 	}
// 	start() {
// 		this.app.isten(this.port)
// 	}
// }

// new App(8000).start()