(function (logWriter) {

    'use strict';

    var fs = require('fs'),
        morgan = require('morgan'),
        FileStreamRotator = require('file-stream-rotator');

    logWriter.init = function (app) {
        // create a write stream (in append mode)
        app.use(morgan('dev')); // log every request to the console
        // var logDirectory = './logs';
        //
        // // ensure log directory exists
        // if (!fs.existsSync(logDirectory)) {
        //     fs.mkdirSync(logDirectory);
        // }
        //
        // // create a rotating write stream
        // var accessLogStream = FileStreamRotator.getStream({
        //     date_format: 'YYYYMMDD',
        //     filename: logDirectory + '/access-%DATE%.log',
        //     frequency: 'daily',
        //     verbose: false
        // });
        //
        // // setup the logger
        // app.use(morgan('combined', {stream: accessLogStream}));
    };

})(module.exports);