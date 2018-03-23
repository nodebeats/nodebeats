'use strict';

var cluster = require('cluster');
var os = require('os');
if (cluster.isMaster) {
    //count the machine's CPUs
    var cpuCount = os.cpus().length;

    //create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

    //listen for dying workers
    cluster.on('exit', function () {
        cluster.fork();
    });
} else {
    require('./server');
}
