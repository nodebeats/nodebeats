(function () {

    'use strict';

    module.exports = {
        development : {
            host:  'nodebeats-redis-dev',
            port: 6379,
            db: 2,
            pass: 'redis#password123'
        },        
        production : {
            host: 'nodebeats-redis-dev',
            port: 6379,
            db: 1,
            pass: 'redis#password123'
        }
    };
})();