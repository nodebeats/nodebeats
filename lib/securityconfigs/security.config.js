/**
 * Created by lakhe on 3/28/16.
 */
'use strict';
(function (securityConfigure) {
    var helmet = require('helmet'),
        contentLength = require('express-content-length-validator'),
        csrf = require('csurf'),
        methodOverride = require('method-override'),
        validator = require('express-validator');

    //max file size 1MB
    var MAX_CONTENT_LENGTH_ACCEPTED = 1000000;

    securityConfigure.init = function (app) {
        app.disable('x-powered-by');
        app.use(contentLength.validateMax({
            max: MAX_CONTENT_LENGTH_ACCEPTED,
            status: 400,
            message: "Invalid payload; too big!"
        })); // max size accepted for the content-length


        app.use(methodOverride("X-HTTP-Method-Override"));
        // app.use(csrf());
        // app.use(function (req, res, next) {
        //      res.locals.csrftoken = req.csrfToken();
        //      next();
        // });

        app.use(helmet.contentSecurityPolicy({
            // Specify directives as normal.
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'", "www.google-analytics.com/", "https://apis.google.com/", "www.google-analytics.com", "ajax.googleapis.com"],
                styleSrc: ["'self'", "http://fonts.googleapis.com/", "'unsafe-inline'", "https://fonts.googleapis.com/"],
                imgSrc: ["'self' data:", "stats.g.doubleclick.net/", "www.google-analytics.com/", "http://res.cloudinary.com/", "https://res.cloudinary.com/"],
                fontSrc: ["'self' data:", "http://fonts.gstatic.com/", "https://fonts.gstatic.com/s/", "https://fonts.googleapis.com/"],
                mediaSrc: ["'self'"],
                objectSrc: ["'none'"],
                frameAncestors: ["'none'"],
                sandbox: ['allow-forms', 'allow-scripts', 'allow-same-origin', 'allow-popups', 'allow-forms'],
                frameSrc: ["'self'", "https://accounts.google.com/", "https://content.googleapis.com/"],
                connectSrc: ["'self'", "https://content.googleapis.com/"],
                reportUri: '/report-violation'//,
                // objectSrc: [], // An empty array allows nothing through
            },
            // Set to true if you only want browsers to report errors, not block them
            reportOnly: false,
            // Set to true if you want to blindly set all headers: Content-Security-Policy,
            // X-WebKit-CSP, and X-Content-Security-Policy.
            setAllHeaders: false,
            // Set to true if you want to disable CSP on Android where it can be buggy.
            disableAndroid: false,
            // Set to false if you want to completely disable any user-agent sniffing.
            // This may make the headers less compatible but it will be much faster.
            // This defaults to `true`.
            browserSniff: true
        }));
        // Implement X-XSS-Protection
        app.use(helmet.xssFilter());
        app.use(helmet.noSniff());
        app.use(helmet.frameguard('deny'));
        app.use(validator());

    };

})(module.exports);