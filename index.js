var express = require('express');
var app = express();

var session = require('express-session');
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');

//Serve static before session
app.use(express.static('public'));

/**
 * Session
 */
app.use(session({
    secret: 'keyboard cat',
    cookie: {
        maxAge: 60000
    },
    resave: true,
    saveUninitialized: false
}));

/**
 * Parse parameters in POST
 */
// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

/**
 * res parameterek
 */
app.use(function (req, res, next) {
    res.tpl = {};
    res.tpl.error = [];

    return next();
});

/**
 * Routes
 */
require('./routes/outside')(app);
require('./routes/admin')(app);
require('./routes/betsList')(app);
require('./routes/profile')(app);

/**
 * Standard error handler
 */
app.use(function (err, req, res, next) {
    res.status(500).send('Houston, we have a problem!');

    //Flush out the stack to the console
    console.error(err.stack);
});


var server = app.listen(3000, function () {
    console.log('Server start in: localhost:3000');
});
