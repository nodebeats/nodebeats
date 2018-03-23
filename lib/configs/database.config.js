(function () {

    'use strict';

    module.exports = {
        // development: {
        //     username: 'davmagazine',
        //     password: 'superadmin@123',
        //     host: 'ds147668.mlab.com',
        //     port: '47668',
        //     dbName: 'dav2magazine'
        // },
        development: {
            username: '',
            password: '',
            host: 'localhost',
            port: '27017',
            dbName: 'local'
        },
        // development: {
        //     username: 'davmag',
        //     password: 'davmag',
        //     host: 'ds215709.mlab.com',
        //     port: '15709',
        //     dbName: 'prj_davmagazine'
        // },
        // development: {
        //     username: 'davmag',
        //     password: 'davmag',
        //     host: 'ds215709.mlab.com',
        //     port: '15709',
        //     dbName: 'prj_davmagazine'
        // },
        production: {
            username: 'dav2magazine',
            password: 'superadmin@123',
            host: 'ds147668.mlab.com',
            port: '47668',
            dbName: 'dav2magazine'

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
