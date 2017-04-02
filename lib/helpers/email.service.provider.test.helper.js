(function (emailServiceTestHelper) {

    'use strict';

    var testURLConfig = require('../configs/email.service.testurl.config');

    function selectEmailServiceURL (serviceProvider) {
        var testUrl = '';
        switch (serviceProvider) {
            case "normal":
                testUrl = testURLConfig.normal;
                break;
            case "mailgun":
                testUrl = testURLConfig.mailgun;
                break;
            case "postmark":
                testUrl = testURLConfig.postmark;
                break;
            case "mandrill":
                testUrl = testURLConfig.mandrill;
                break;
            case "sendgrid":
                testUrl = testURLConfig.sendgrid;
                break;
            case "amazon":
                testUrl = testURLConfig.amazon;
                break;

            return testUrl;
        }

    }

    emailServiceTestHelper.generateJWTToken = function (req, userObj) {

    };

})(module.exports);