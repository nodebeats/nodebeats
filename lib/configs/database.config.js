(function () {

    'use strict';

    module.exports = {
        development: {
            username: 'nodebeatstest',
            password: 'nodebeatstest',
            host: 'ds239359.mlab.com',
            port: '39359',
            dbName: 'prj_nodebeatstest'
        },        
        production: {
            username: 'nodebeatstest',
            password: 'nodebeatstest',
            host: 'ds239359.mlab.com',
            port: '39359',
            dbName: 'prj_nodebeatstest'
        },
        test: {
            username: 'demouser',
            password: 'demouser',
            host: 'ds119728.mlab.com',
            port: '19728',
            dbName: 'prj_nodebeats'
        },
        dbBackup: {
            opt1: {
                type: 'archive',
                name: 'prj_nodebeats.archive',
                active: false,
                gzip: true
            },
            opt2: {
                type: 'bson',
                name: 'prj_nodebeats',
                active: true
            }
        }
    }
})();
