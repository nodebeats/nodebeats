/**
 * Created by lakhe on 3/29/16.
 */
(function () {

    'use strict';

    module.exports = {
        development: {
            username: 'nodebitsadmin',
            password: 'nodebitsadmin',
            host: 'localhost',
            port: '27017',
            dbName: 'prj_nodebeats'
        },
        production: {
            username: 'nodebeats',
            password: 'nodebeats',
            host: 'ds031845.mlab.com',
            port: '31845',
            dbName: 'prj_nodebeats'

        },
        test: {
            username: 'testuser',
            password: 'testuser',
            host: 'localhost',
            port: '27017',
            dbName: 'prj_nodebeats_test'
        }
    };
})();
