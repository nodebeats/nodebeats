(function(){
    "use strict";

    var apiMessageConfig = require('../../lib/configs/api.message.config'),
        Promise = require("bluebird"),
        HTTPStatus = require('http-status');

    module.exports = function(expect, request, accessToken) {

        describe('Cloudinary Image Management Setting Configuration Integration test', function(){

            this.timeout(400000000);
            var apiUrl = '/api/cloudinary/';
            var cloudinarySettingConfig;
            
            beforeEach(function () {
                cloudinarySettingConfig = {
                    cloudinaryCloudName: "bitsbeat-it-solution-1",
                    cloudinaryApiKey: "124895177286781",
                    cloudinaryApiSecret: "HKRL0Ovd4iRoxBxAq194niAZBvM"
                };
            });

            describe('getCloudinarySetting() without access token to retrieve cloudinary setting object', function () {
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

            describe('postCloudinarySetting() without access token', function () {
                it('should return a message stating that authentication is failed', function(done){
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .send(cloudinarySettingConfig)
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

            describe('getCloudinarySetting() for the first time after authenticating', function () {
                it('should return an empty response i.e. no cloudinary setting', function(done){
                    request
                        .get(apiUrl)
                        .set('Accept', 'application/json')
                        .set('x-access-token', accessToken)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.NOT_FOUND);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.cloudinary.notFound);
                            done();
                        });
                });
            });

            describe('postCloudinarySetting() with invalid data i.e. no api key, no cloud name and finally no api secret ', function () {
                afterEach(function(){
                    cloudinarySettingConfig = {
                        cloudinaryCloudName: "bitsbeat-it-solution-1",
                        cloudinaryApiKey: "124895177286781",
                        cloudinaryApiSecret: "HKRL0Ovd4iRoxBxAq194niAZBvM"
                    };
                });
                it('should return a message  stating validation error  - cloudinary api key is required   for empty api key', function(done){
                    var self = this;
                    self.invalidCloudinaryObj = cloudinarySettingConfig;
                    self.invalidCloudinaryObj.cloudinaryApiKey = "";
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .send(self.invalidCloudinaryObj)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.cloudinary.validationErrMessage.cloudinaryApiKey);

                            done();
                        });
                });

                it('should return a message stating validation error - cloudinary cloud name is required   for empty cloud name', function(done){
                    var self = this;
                    self.invalidCloudinaryObj = cloudinarySettingConfig;
                    self.invalidCloudinaryObj.cloudinaryCloudName = "";
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .send(self.invalidCloudinaryObj)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.cloudinary.validationErrMessage.cloudinaryCloudName);

                            done();
                        });
                });

                it('should return a message stating validation error - cloudinary api secret is required for empty api secret', function(done){
                    var self = this;
                    self.invalidCloudinaryObj = cloudinarySettingConfig;
                    self.invalidCloudinaryObj.cloudinaryApiSecret = "";
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .send(self.invalidCloudinaryObj)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.cloudinary.validationErrMessage.cloudinaryApiSecret);

                            done();
                        });
                });
            });

            describe('postCloudinarySetting() with valid access token to save cloudinary setting ', function () {
                it('should return a successfull message stating cloudinary setting saved successfully', function(done){
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .send(cloudinarySettingConfig)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.cloudinary.saveMessage);
                            done();
                        });
                });
            });

            describe('postCloudinarySetting() with valid access token for the second time to test for data duplicacy', function () {
                it('should return a message stating that we can only update the single existing setting configuration and new data insert is not allowed', function(done){
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .send(cloudinarySettingConfig)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.CONFLICT);
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.cloudinary.alreadyExists);
                            done();
                        });
                });
            });

            describe('getCloudinarySetting() after saving record', function () {
                it('should return single cloudinary setting object in object', function(){
                    return request
                        .get(apiUrl)
                        .set('Accept', 'application/json')
                        .set('x-access-token', accessToken)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                            expect(res.body).to.be.an('object');
                            expect(res.body.cloudinaryCloudName).to.equal(cloudinarySettingConfig.cloudinaryCloudName);
                            return Promise.resolve(res.body);
                        })
                        .then(function(cloudinarySettingData){
                            var _cloudinarySettingId = cloudinarySettingData._id;

                            describe('getCloudinarySettingByID() for ID ' + _cloudinarySettingId +' without access token to retrieve cloudinary setting object', function () {
                                it('should return a message stating that authentication is failed', function(done){
                                    request
                                        .get(apiUrl + _cloudinarySettingId)
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

                            describe('getCloudinarySettingByID()  token to retrieve cloudinary setting object for ID ' + _cloudinarySettingId, function () {
                                it('should return a cloudinary setting configuration object', function(done){
                                    request
                                        .get(apiUrl + _cloudinarySettingId)
                                        .set('Accept', 'application/json')
                                        .set('x-access-token', accessToken)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.have.property("cloudinaryCloudName");
                                            expect(res.body.cloudinaryCloudName).to.equal("bitsbeat-it-solution-1");
                                            expect(res.body).to.have.property("_id");
                                            expect(res.body._id).to.equal(_cloudinarySettingId);

                                            done();
                                        });
                                });
                            });

                            describe('updateCloudinarySetting() for ID ' + _cloudinarySettingId +' without access token', function () {
                                it('should return a message stating that authentication is failed', function(done){
                                    request
                                        .put(apiUrl + _cloudinarySettingId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .send(cloudinarySettingConfig)
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

                            describe('updateCloudinarySetting() to update existing data for ID ' + _cloudinarySettingId +' ', function () {
                                it('should return a successfull update message stating that cloudinary setting updated successfully', function(done){

                                    var self = this;
                                    self.validCloudinaryObj = cloudinarySettingConfig;
                                    self.validCloudinaryObj.cloudinaryCloudName  = "bitsbeat-it-solution";
                                    request
                                        .put(apiUrl + _cloudinarySettingId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .send(self.validCloudinaryObj)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.cloudinary.updateMessage);
                                            done();
                                        });
                                });
                            });

                            describe('updateCloudinarySetting() with invalid data i.e. no api key, no cloud name and finally no api secret ', function () {
                                it('should return a message stating validation error related to api key, cloud name and api secret - all are required', function(done){
                                    var self = this;
                                    self.invalidCloudinaryObj = cloudinarySettingConfig;
                                    self.invalidCloudinaryObj.cloudinaryApiKey = "";
                                    self.invalidCloudinaryObj.cloudinaryApiSecret = "";
                                    self.invalidCloudinaryObj.cloudinaryCloudName = "";
                                    request
                                        .put(apiUrl + _cloudinarySettingId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .send(self.invalidCloudinaryObj)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                            expect(res.error).to.have.property('text');
                                            var errObj = JSON.parse(res.error.text);
                                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.cloudinary.validationErrMessage.cloudinaryCloudName);
                                            expect(errObj.message[1].msg).to.have.string(apiMessageConfig.cloudinary.validationErrMessage.cloudinaryApiKey);
                                            expect(errObj.message[2].msg).to.have.string(apiMessageConfig.cloudinary.validationErrMessage.cloudinaryApiSecret);
                                            done() ;
                                        });
                                });
                            });
                        });
                });
            });
        });
    };
})();
