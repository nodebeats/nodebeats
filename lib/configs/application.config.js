(function () {

    'use strict';

    module.exports = {
        user: {
            defaultUserFirstName: 'nodebeats',
            defaultUserLastName: 'user',
            defaultUsername: 'superadmin',
            defaultPassword: 'superadmin@123',
            defaultUserEmail: 'help@nodebeats.com',
            defaultUserRole: 'superadmin'
        },
        cloudinary: {
            defaultCloudName: 'nodebeats'
        },
        login: {
            maxFailedLoginAttempt: 5,
            initialBlockLoginAttemptForCertainTime: 3,
            maxBlockedTime: 1440,//in minutes
        }
    };
})();