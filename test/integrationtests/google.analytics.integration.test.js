(function(){
    "use strict";

    var apiMessageConfig = require('../../lib/configs/api.message.config'),
        Promise = require("bluebird"),
        HTTPStatus = require('http-status');

    module.exports = function(expect, request, docPathUrl, apiFileDeleteUrl, accessToken) {

        describe('Google Analytics Setting Configuration Integration test', function(){

            this.timeout(4000);
            var apiUrl = '/api/analytics/';
            var googleAnalyticsConfigInfo;

            beforeEach(function () {
                googleAnalyticsConfigInfo = {
                    trackingId: "this is tracking ID",
                    analyticsViewID: "1236598"
                };
            });

            describe('getGoogleAnalyticsConfig() to retrieve google analytics configuration object without access token', function () {
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

            describe('postGoogleAnalyticsConfig() to save analytics configuration setting without access token', function () {
                it('should return a message stating that authentication is failed', function(done){
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .field('data', JSON.stringify(googleAnalyticsConfigInfo))
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

            describe('getGoogleAnalyticsConfig() to retrieve google analytics configuration object with access token for the first time', function () {
                it('should return empty response i.e. no analytics list', function(done){
                    request
                        .get(apiUrl)
                        .set('Accept', 'application/json')
                        .set('x-access-token', accessToken)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.NOT_FOUND);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.googleAnalytics.notFound);
                            done();
                        });
                });
            });

            describe('postGoogleAnalyticsConfig()  to save analytics configuration setting  with invalid data i.e. no tracking Code, no serviceAccountKeyFileName, and finally  no analyticsViewID', function () {
                afterEach(function(){
                    googleAnalyticsConfigInfo = {
                        trackingId: "this is tracking ID",
                        analyticsViewID: "1236598"
                    };
                });
                it('should return a message stating validation error - google analytics tracking code is required for empty tracking code', function(done){
                    var self = this;
                    self.invalidgoogleAnalyticsConfig = googleAnalyticsConfigInfo;
                    self.invalidgoogleAnalyticsConfig.trackingId = "";
                    self.invalidgoogleAnalyticsConfig.analyticsViewID = "";
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .field('data', JSON.stringify(self.invalidgoogleAnalyticsConfig))
                        .attach('documentName', docPathUrl[1])
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.googleAnalytics.validationErrMessage.trackingId);
                            expect(errObj.message[1].msg).to.have.string(apiMessageConfig.googleAnalytics.validationErrMessage.analyticsViewID);
                            done();
                        });
                });

                it('should return a message stating validation error - please upload json config file related to the google analytics configuration for no configuration json file', function(done){
                    var self = this;
                    self.invalidgoogleAnalyticsConfig = googleAnalyticsConfigInfo;
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .field('data', JSON.stringify(self.invalidgoogleAnalyticsConfig))
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message).to.have.string(apiMessageConfig.googleAnalytics.fieldRequiredJsonFile);

                            done();
                        });
                });
            });

            describe('postGoogleAnalyticsConfig()  to save analytics configuration setting  with valid access token and valid data', function () {
                it('should return a successfull save message stating google analytics configuration setting saved successfully', function(done){

                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .field('data', JSON.stringify(googleAnalyticsConfigInfo))
                        .attach('documentName', docPathUrl[1])
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.googleAnalytics.saveMessage);
                            done();
                        });
                });
            });

            describe('postGoogleAnalyticsConfig() with valid access token after successfully saving google analytics setting configuration already.', function () {
                it('should return a message stating that we can only update the existing setting configuration and new data insert is not allowed', function(done){
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .field('data', JSON.stringify(googleAnalyticsConfigInfo))
                        .attach('documentName', docPathUrl[1])
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.CONFLICT);
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.googleAnalytics.alreadyExists);
                            done();
                        });
                });
            });

            describe('getGoogleAnalyticsConfig() to retrieve google analytics configuration list with access token ', function () {
                it('should return a single google analytics setting in object', function(){
                    return request
                        .get(apiUrl)
                        .set('Accept', 'application/json')
                        .set('x-access-token', accessToken)
                        .expect('Content-Type', /json/)
                        .then(function(result) {
                            expect(result.statusCode).to.equal(HTTPStatus.OK);
                            expect(result.body).to.be.an('object');
                            expect(result.body).to.have.property("trackingId");
                            expect(result.body.trackingId).to.equal(googleAnalyticsConfigInfo.trackingId);
                            expect(result.body).to.have.property("analyticsViewID");
                            expect(result.body.analyticsViewID).to.equal(googleAnalyticsConfigInfo.analyticsViewID);
                            return Promise.resolve(result.body);
                        })
                        .then(function(googleAnalyticsObj){
                            var _googleAnalyticsSettingId = googleAnalyticsObj._id;
                            var _googleAnalyticsJsonSettingFileName = googleAnalyticsObj.serviceAccountKeyFileName;
                            var _googleAnalyticsJsonSettingFilePath = googleAnalyticsObj.docProperties.docPath;

                            describe('getGoogleAnalyticsConfigByID() to retrieve google analytics configuration setting object  for ID ' + _googleAnalyticsSettingId + ' without access token', function () {
                                it('should return a message stating that authentication is failed', function(done){
                                    request
                                        .get(apiUrl + _googleAnalyticsSettingId)
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

                            describe('getGoogleAnalyticsConfigByID() to retrieve google analytics configuration setting object  for ID ' + _googleAnalyticsSettingId, function () {
                                it('should return a google analytics setting configuration object', function(done){
                                    request
                                        .get(apiUrl + _googleAnalyticsSettingId)
                                        .set('Accept', 'application/json')
                                        .set('x-access-token', accessToken)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.body).to.have.property("analyticsViewID");
                                            expect(res.body.analyticsViewID).to.equal(googleAnalyticsConfigInfo.analyticsViewID);
                                            expect(res.body).to.have.property("trackingId");
                                            expect(res.body.trackingId).to.equal(googleAnalyticsConfigInfo.trackingId);
                                            done();
                                        });
                                });
                            });

                            describe('deleteFile() to delete analytics configuration json file', function () {
                                it('should successfully delte document file and return a successfull delete message' , function(done){
                                    request
                                        .delete(apiFileDeleteUrl)
                                        .set('Accept', 'application/json')
                                        .set('x-access-token', accessToken)
                                        .query('filename=' + _googleAnalyticsJsonSettingFileName + '&type=document&path=' + _googleAnalyticsJsonSettingFilePath)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.fileDelete.fileDelete);
                                            done();
                                        });
                                });
                            });

                            describe('updateGoogleAnalyticsConfig() to update existing google analytics configuration setting for ID ' + _googleAnalyticsSettingId +' without access token', function () {
                                it('should return a message stating that authentication is failed', function(done){
                                    request
                                        .put(apiUrl + _googleAnalyticsSettingId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .field('data', JSON.stringify(googleAnalyticsConfigInfo))
                                        .attach('documentName', docPathUrl[1])
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

                            describe('updateGoogleAnalyticsConfig()  to update existing google analytics configuration setting  for ID ' + _googleAnalyticsSettingId, function () {
                                it('should return a successfull update message stating that google analytics configuration setting saved successfully', function(done){
                                    var self = this;
                                    self.updateGoogleAnalyticsObj = googleAnalyticsConfigInfo;
                                    self.updateGoogleAnalyticsObj.analyticsViewID = "11223344";
                                    request
                                        .put(apiUrl + _googleAnalyticsSettingId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .field('data', JSON.stringify((self.updateGoogleAnalyticsObj)))
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.googleAnalytics.updateMessage);
                                            done();
                                        });
                                });
                            });

                            describe('updateGoogleAnalyticsConfig()  to update existing google analytics configuration setting  with invalid data i.e. no tracking Code ', function () {
                                it('should return a message stating validation error - google analytics tracking code is required', function(done){
                                    var self = this;
                                    self.invalidgoogleAnalyticsConfig = googleAnalyticsConfigInfo;
                                    self.invalidgoogleAnalyticsConfig.trackingId = "";
                                    request
                                        .put(apiUrl + _googleAnalyticsSettingId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .field('data', JSON.stringify((self.invalidgoogleAnalyticsConfig)))
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                            expect(res.error).to.have.property('text');
                                            var errObj = JSON.parse(res.error.text);
                                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.googleAnalytics.validationErrMessage.trackingId);
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