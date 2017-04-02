(function(){
    "use strict";

    var apiMessageConfig = require('../../lib/configs/api.message.config'),
        Promise = require("bluebird"),
        HTTPStatus = require('http-status');

    module.exports = function(expect, request, accessToken) {

        describe('Email Service Setting Configuration Integration test', function(){

            this.timeout(4000);
            var apiUrl = '/api/emailservice/';
            var emailServiceConfigInfo;

            beforeEach(function () {
                emailServiceConfigInfo = {
                    serviceProviderType: "mailgun",
                    api_Key: "key-ff32b449ddad25d9b5dd1ff33005c79b",
                    api_Secret: "api-Keyjlki98342jklfnlrwhoiukhdsj",
                    domain: "sandbox73ad601fcdd74461b1c46820a59b2374.mailgun.org.np"
                };
            });

            describe('getMailServiceConfig() without access token to retrieve email service setting object', function () {
                it('should return a message stating that authentication is failed', function(done){
                    request
                        .get(apiUrl)
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.UNAUTHORIZED);
                            expect(res.body).to.have.property("success");
                            expect(res.body.success).to.equal(false);
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.authFail.authFailMessage);
                            done();
                        });
                });
            });

            describe('postMailServiceConfig() to save email service setting without access token', function () {
                it('should return a message stating that authentication is failed', function(done){
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .send(emailServiceConfigInfo)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.UNAUTHORIZED);
                            expect(res.body).to.have.property("success");
                            expect(res.body.success).to.equal(false);
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.authFail.authFailMessage);
                            done();
                        });
                });
            });

            describe('getMailServiceConfig()  to retrieve email service setting object with access token for the first time', function () {
                it('should return an empty response .i.e no email service setting data', function(done){
                    request
                        .get(apiUrl)
                        .set('Accept', 'application/json')
                        .set('x-access-token', accessToken)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.NOT_FOUND);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.emailService.notFound);
                            done();
                        });
                });
            });

            describe('postMailServiceConfig() with invalid data i.e. no service provider, invalid host, invalid port, invalid rateLimit, or invalid domain', function () {
                afterEach(function(){
                    emailServiceConfigInfo = {
                        serviceProviderType: "mailgun",
                        api_Key: "key-ff32b449ddad25d9b5dd1ff33005c79b",
                        api_Secret: "api-Keyjlki98342jklfnlrwhoiukhdsj",
                        domain: "sandbox73ad601fcdd74461b1c46820a59b2374.mailgun.org.np"
                    };
                });

                it('should return a message stating validation error- service provider is required   for empty service provider type', function(done){
                    var self = this;
                    self.invalidEmailServiceObj = emailServiceConfigInfo;
                    self.invalidEmailServiceObj.serviceProviderType = "";
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .send(self.invalidEmailServiceObj)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.emailService.validationErrMessage.serviceProviderType);
                            done();
                        });
                });

                it('should return a message stating validation error- port number should be a valid integer    for invalid port i.e. other than integer value ' , function(done){
                    var self = this;
                    self.invalidEmailServiceObj = emailServiceConfigInfo;
                    self.invalidEmailServiceObj.port = "rwerwe";
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .send(self.invalidEmailServiceObj)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.emailService.validationErrMessage.portValid);
                            done();
                        });
                });

                it('should return a message stating validation error - invalid host    for invalid host name i.e other than valid host names ', function(done){
                    var self = this;
                    self.invalidEmailServiceObj = emailServiceConfigInfo;
                    self.invalidEmailServiceObj.host = "ewerwer";
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .send(self.invalidEmailServiceObj)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.emailService.validationErrMessage.hostValid);
                            done();
                        });
                });

                it('should return a message stating validation error - invalid domain ', function(done){
                    var self = this;
                    self.invalidEmailServiceObj = emailServiceConfigInfo;
                    self.invalidEmailServiceObj.domain = "ewew";
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .send(self.invalidEmailServiceObj)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.emailService.validationErrMessage.domainValid);
                            done();
                        });
                });

                it('should return a message stating validation error - Rate limit should be an integer    for invalid rate limit value i.e non-integer value ', function(done){
                    var self = this;
                    self.invalidEmailServiceObj = emailServiceConfigInfo;
                    self.invalidEmailServiceObj.rateLimit = "ewew";
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .send(self.invalidEmailServiceObj)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.emailService.validationErrMessage.rateLimitValid);
                            done();
                        });
                });
            });

            describe('postMailServiceConfig()  to save email service setting with valid access token', function () {
                it('should return a successfull save message stating that email service setting object is saved successfully', function(done){
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .send(emailServiceConfigInfo)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.emailService.saveMessage);
                            done();
                        });
                });
            });

            describe('postMailServiceConfig() with valid access token after successfully saving configuration already i.e. checking for duplicacy', function () {
                it('should return a message stating that we can only update the existing setting configuration and new data insert is not allowed', function(done){
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .send(emailServiceConfigInfo)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.CONFLICT);
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.emailService.alreadyExists);
                            done();
                        });
                });
            });

            describe('getMailServiceConfig() with access token after saving data to retrieve email service setting data', function () {
                it('should return a email service setting data in array', function(){
                    return request
                        .get(apiUrl)
                        .set('Accept', 'application/json')
                        .set('x-access-token', accessToken)
                        .expect('Content-Type', /json/)
                        .then(function(result) {
                            expect(result.statusCode).to.equal(HTTPStatus.OK);
                            expect(result.body).to.be.an('object');
                            expect(result.body).to.have.property("serviceProviderType");
                            expect(result.body.serviceProviderType).to.equal(emailServiceConfigInfo.serviceProviderType);
                            expect(result.body).to.have.property("pool");
                            expect(result.body.pool).to.equal(false);
                            return Promise.resolve(result.body);
                        })
                        .then(function(emailServiceObj){
                            var _emailSettingId = emailServiceObj._id;
                            var _emailServiceProvider = emailServiceObj.serviceProviderType;

                            describe('getMailServiceConfigByID() for ID ' + _emailSettingId +' without access token to retrieve email service setting object', function () {
                                it('should return a message stating that authentication is failed', function(done){
                                    request
                                        .get(apiUrl + _emailSettingId)
                                        .set('Accept', 'application/json')
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.UNAUTHORIZED);
                                            expect(res.body).to.have.property("success");
                                            expect(res.body.success).to.equal(false);
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.authFail.authFailMessage);
                                            done();
                                        });
                                });
                            });

                            describe('getMailServiceConfigByID() to retrieve email service setting object for ID ' + _emailSettingId, function () {
                                it('should return an email service setting configuration object', function(done){
                                    request
                                        .get(apiUrl + _emailSettingId)
                                        .set('Accept', 'application/json')
                                        .set('x-access-token', accessToken)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.have.property("serviceProviderType");
                                            expect(res.body.serviceProviderType).to.equal(_emailServiceProvider);
                                            expect(res.body).to.have.property("_id");
                                            expect(res.body._id).to.equal(_emailSettingId);

                                            done();
                                        });
                                });
                            });

                            describe('updateMailService() for ID ' + _emailSettingId +' without access token to update existing configuration data', function () {
                                it('should return a message stating that authentication is failed', function(done){
                                    request
                                        .put(apiUrl + _emailSettingId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .send(emailServiceConfigInfo)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.UNAUTHORIZED);
                                            expect(res.body).to.have.property("success");
                                            expect(res.body.success).to.equal(false);
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.authFail.authFailMessage);
                                            done();
                                        });
                                });
                            });

                            describe('updateMailService()  to update existing configuration data for ID ' + _emailSettingId +' with access token', function () {
                                it('should return a successfull update message stating that email service configuration setting saved successfully', function(done){
                                    var self = this;
                                    self.validEmailServiceObj = emailServiceConfigInfo;
                                    self.validEmailServiceObj.pool = true;
                                    self.validEmailServiceObj.domain = "sandbox73ad601fcdd74461b1c46820a59b2374.mailgun.org";
                                    request
                                        .put(apiUrl + _emailSettingId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .send(self.validEmailServiceObj)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.emailService.updateMessage);
                                            done();
                                        });
                                });
                            });

                            describe('updateMailService() for ID ' + _emailSettingId + ' with invalid data i.e. no service provider, invalid host, invalid port, invalid rateLimit, or invalid domain', function () {

                                it('should return a message stating validation error- service provider is required', function(done){
                                    var self = this;
                                    self.invalidEmailServiceObj = emailServiceConfigInfo;
                                    self.invalidEmailServiceObj.serviceProviderType = "";
                                    self.invalidEmailServiceObj.port = "rwerwe";
                                    self.invalidEmailServiceObj.host = "ewerwer";
                                    self.invalidEmailServiceObj.domain = "ewew";
                                    self.invalidEmailServiceObj.rateLimit = "ewew";
                                    request
                                        .put(apiUrl + _emailSettingId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .send(self.invalidEmailServiceObj)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                            expect(res.error).to.have.property('text');
                                            var errObj = JSON.parse(res.error.text);
                                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.emailService.validationErrMessage.serviceProviderType);
                                            expect(errObj.message[1].msg).to.have.string(apiMessageConfig.emailService.validationErrMessage.portValid);
                                            expect(errObj.message[2].msg).to.have.string(apiMessageConfig.emailService.validationErrMessage.hostValid);
                                            expect(errObj.message[3].msg).to.have.string(apiMessageConfig.emailService.validationErrMessage.domainValid);
                                            expect(errObj.message[4].msg).to.have.string(apiMessageConfig.emailService.validationErrMessage.rateLimitValid);
                                            done();
                                        });
                                });
                            });

                        });
                });
            });
        });
    };
})();
