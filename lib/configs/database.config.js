/**
 * Created by lakhe on 3/29/16.
 */
(function () {

    'use strict';

    module.exports = {
        development: {
            username: '',
            password: '',
            host: '',
            port: '',
            dbName: ''
        },
        production: {
            username: '',
            password: '',
            host: '',
            port: '',
            dbName: ''

        },
        test: {
            username: '',
            password: '',
            host: '',
            port: '',
            dbName: ''
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
