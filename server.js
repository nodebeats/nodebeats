'use strict';

var http = require('http'),
    app = require('./app'),
    server = http.createServer(app),
    port = process.env.PORT || 3005; //port chnaged to 3005

/**
 *  Define the application.
 */
var NodeBeats = function() {

    //  Scope.
    var self = this;
    /**
     *  Set up server IP address and port # using env variables/defaults.
     */
    self.setupVariables = function() {
        self.port      = port;
    };

    /**
     *  Start the server
     */
    self.start = function() {
        app.set('portNumber', port);
        //  Start the app on the specific interface (and port).
        server.listen(self.port, function() {
            console.log('Node server started on  ' + self.port + ' at ' + Date(new Date()));
        });
    };
};  


var nodeBeatApp = new NodeBeats();
nodeBeatApp.setupVariables();
nodeBeatApp.start();

process.on('SIGTERM', function () {
    server.close(function () {
        process.exit(0);
    });  
});
module.exports = server;


