var express = require('express'),
    exphbs  = require('express-handlebars');
var https = require('https');
var fs = require('fs');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dns = require('dns');
//var process = require('process');


var routes = require('./routes/index');
var wallet = require('./routes/wallet');

var app = express();

app.disable('x-powered-by');

// view engine setup
app.set('env', process.env.NODE_ENV || 'production');

app.set('views', path.join(__dirname, 'views'));

// In memory cache of IPs, and whether or not they are tor (true for tor)
var TorCache = {};

var hbs =  exphbs.create({
    defaultLayout: 'main',
    helpers: {
        checkActive: function(url, current_url) {
            if(url == current_url) {
                return 'class=active'
            }
        },
        isWallet: function(current_url, options) {
            if (current_url == "/wallet/login" || current_url == "/wallet/register") {
                return options.fn(this);
            } else {
                return  options.inverse(this);
            }
        }
    },
    partialsDir: 'views/server_partials'
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(function(req, res, next) {
    res.locals.current_url = req.path; // This is the important line
    next();
});


app.use(function(req, res, next) {
    res.locals.is_ie = false;
    var ua = req.headers['user-agent'];
    if(ua.search('Trident') > 0 || ua.search('MSIE') > 0 || ua.search('Edge') > 0) {
        res.locals.is_ie = true;
    }
    res.locals.current_url = req.path; // This is the important line
    next();
});

// debugging
/*
app.use(express.Router().get('/dump-torcache', function(req, res) {
    res.end(JSON.stringify(TorCache));
}));
*/

app.use('/', routes);
app.use('/wallet', wallet);


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
    var options = {
        key: fs.readFileSync('dev/keys/key.pem'),
        cert: fs.readFileSync('dev/keys/cert.pem')
    };
    https.createServer(options, app).listen(4433);
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
