/**
 * Created by lakhe on 3/29/16.
 */
(function () {

    'use strict';

    module.exports = {
        development : {
            host:  '127.0.0.1',
            port: 6379,
            db: 2,
            pass: 'slakhe@123'
        },        
        production : {
            host: '',
            port: '',
            pass: ''
        }
    };
})();