(function () {

    'use strict';

    module.exports = {
        // development: {
        //     username: 'nodebeats',
        //     password: 'nodebeats123',
        //     host: 'ds241869.mlab.com',
        //     port: '41869',
        //     dbName: 'nodebeats'
        // },
        development: {
            username: '',
            password: '',
            host: 'localhost',
            port: '27017',
            dbName: 'local'
        },        
        production: {
            username: 'nodebeats',
            password: 'nodebeats123',
            host: 'ds241869.mlab.com',
            port: '41869',
            dbName: 'nodebeats'
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
    };
})();
