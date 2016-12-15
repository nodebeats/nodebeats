/*
 * Created by lakhe on 4/19/16.
 */
'use strict';

var express = require('express'),
    path = require('path'),
    app = express(),
    bodyParser = require('body-parser'),
    exphbs = require('express-handlebars'),
    //cookieParser = require('cookie-parser'),
    session = require('express-session'),
    RedisStore = require('connect-redis')(session),
    expressValidator = require('express-validator'),
    passport = require('passport'),
    compression = require('compression'),
    minify = require('express-minify'),
    hpp = require('hpp'),
    cloudinary = require('cloudinary'),
    redisConfig = require('./lib/configs/redis.config'),
    messageConfig = require('./lib/configs/api.message.config'),
    cloudinaryController = require('./lib/controllers/cloudinary.setting.server.controller'),
    errorLogController = require('./lib/controllers/error.log.server.controller'),
    logWriter = require('./lib/helpers/application.log.writer.helper');

require('dotenv').config();

var configureAppSecurity = require('./lib/securityconfigs/security.config');
var dbConnector = require('./lib/helpers/database.helper');
var redisStoreOpts = {};

app.set('rootDir', __dirname);

// Add content compression middleware
app.use(compression());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization,x-access-token,Accept,Origin');

    // Set cache control header to eliminate cookies from cache
    res.setHeader('Cache-Control', 'no-cache="Set-Cookie, Set-Cookie2"');

    cloudinaryController.getCloudinarySetting()
        .then(function (cloudinarySetting) {
            if (cloudinarySetting) {
                cloudinary.config({
                    cloud_name: cloudinarySetting.cloudinaryCloudName,
                    api_key: cloudinarySetting.cloudinaryApiKey,
                    api_secret: cloudinarySetting.cloudinaryApiSecret,
                    secure: true
                });
            }
        });
    next();
});
//set up the view engine-Handelbars
app.set('views', path.join(__dirname, '/lib/views'));
var helpers = require('./lib/helpers/handlebar.helpers');
var hbs = exphbs.create({
    defaultLayout: 'main-layout',
    layoutsDir: __dirname + '/lib/views/layouts',
    partialsDir: __dirname + '/lib/views/partials',
    extname: '.hbs',
    helpers: helpers
});
app.engine('hbs', hbs.engine);
app.engine('html', hbs.engine);
app.set('view engine', 'hbs');


// end handlebar setup

// Static path setup for Client App

var admin = express();

if (app.get('env') === "development" ) {
    console.log('development environment');
    logWriter.init(app);
    redisStoreOpts = {
        host: redisConfig.development.host,
        port: redisConfig.development.port,
        ttl: (20 * 60), // TTL of 20 minutes represented in seconds
        db: redisConfig.development.db,
        pass: redisConfig.development.pass
    };
     app.use("/", express.static(__dirname + '/public/'));
}
else if (app.get('env') === "production" || app.get('env') === "test") {
    console.log('production environment');
    redisStoreOpts = {
        host: redisConfig.production.host,
        port: redisConfig.production.port,
        ttl: (20 * 60), // TTL of 20 minutes represented in seconds
        db: redisConfig.production.db,
        pass: redisConfig.production.pass
    };
    app.use(minify());
    app.enable('view cache');
    var adminDistRootPath = path.join(__dirname, '/admin/dist/');
    admin.use("/", express.static(path.join(__dirname, '/admin/dist/'), {maxAge: 86400000}));
    app.use("/", express.static(path.join(__dirname, '/public/'), {maxAge: 86400000}));
    app.use('/dist', express.static(path.join(__dirname, '/admin/dist/'), {maxAge: 86400000}));
    app.use('/assets', express.static(path.join(__dirname, '/admin/dist/assets/'), {maxAge: 86400000}));
    admin.get("/*", function (req, res) {
        res.render(path.join(adminDistRootPath, 'index.html'), {layout: false});
    });

}
app.use("/admin", admin);
///  End of Static path setup for Client app

dbConnector.init(app);
var router = require('./lib/routes');
app.set('cloudinaryextension', 'png');
app.set('rateLimit', 100);

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({extended: false}));
// create application/json parser
app.use(bodyParser.json());
app.use(hpp());


app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));


var sessionOpts = {
    // store: new RedisStore(redisStoreOpts),//if in production environment, uncomment it
    name: 'id', // <-- a generic name for the session id
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    maxAge: 1200000,//20 minutes
    cookie: {
        // domain: 'secure.example.com' // limit the cookie exposure
        // secure: true, // set the cookie only to be served with HTTPS
        path: '/',
        httpOnly: true, // Mitigate XSS
        maxAge: null
    }
};

//app.use(cookieParser(process.env.COOKIE_SECRET));

// if server behind proxy, then below should be uncommented
// app.set('trust proxy', 1) // trust first proxy
app.use(session(sessionOpts));
app.use(passport.initialize());

configureAppSecurity.init(app);


//Map the Routes
router.init(app);

// development and production error handler
// no stacktraces leaked to user
if (app.get('env') === 'development' || app.get('env') === 'production') {
    app.use(function (err, req, res, next) {
        if (err) {
            errorLogController.postErrorLogs(err, req, next);
        }
        res.status(500);
        res.json({
            message: messageConfig.errorMessage.internalServerError
        });
    });
}

module.exports = app;
