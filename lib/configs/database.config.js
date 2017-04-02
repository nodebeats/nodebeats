(function () {

    'use strict';

    module.exports = {
        development: {
            username: 'nodebeatsuser',
            password: 'pwd#user123',
            host: 'nodebeats-mongo-dev',
            port: '27017',
            dbName: 'prj_nodebeats'
        },
        production: {
            username: 'nodebeatsuser',
            password: 'pwd#user123',
            host: 'nodebeats-mongo-dev',
            port: '27017',
            dbName: 'prj_nodebeats'

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
