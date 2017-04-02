(function(){
    "use strict";

    var apiMessageConfig = require('../../lib/configs/api.message.config'),
        Promise = require("bluebird"),
        HTTPStatus = require('http-status');

    module.exports = function(expect, request, accessToken) {

        describe('Two factor authentication Integration test', function(){

            this.timeout(4000);
            var apiTotpSetUpUrl = '/api/totp-setup/';
            var apiTotpDisableUrl = '/api/totp-disable/';
            var apiTotpVerifyUrl = '/api/totp-verify/';
            var apiUrlUser = '/api/user/';

            describe('getTOTPSecret() to set up two factor  authentication mechanism using time based one time password algorithm without access token ', function () {
                it('should return a message stating that authentication is failed', function(done){
                    request
                        .get(apiTotpSetUpUrl)
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


            describe('getUsers() to retrieve list of users with access tokens after saving user records', function () {
                it('should return a list of users', function () {
                    return request
                        .get(apiUrlUser)
                        .set('Accept', 'application/json')
                        .set('x-access-token', accessToken)
                        .expect('Content-Type', /json/)
                        .then(function (res) {
                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                            expect(res.body).to.have.property("dataList");
                            expect(res.body.dataList).to.be.instanceof(Array);
                            expect(res.body.dataList).to.have.length.of.at.least(1);
                            expect(res.body).to.have.property("totalItems");
                            expect(res.body.totalItems).to.have.at.least(1);
                            return Promise.resolve(res.body.dataList);
                        })
                        .then(function (resultUserlst) {
                            var _userId = resultUserlst[0]._id;

                            describe('disableTwoFactorAuthentication() to disable two factor  authentication mechanism without access token ', function () {
                                it('should return a message stating that authentication is failed', function(done){
                                    request
                                        .put(apiTotpDisableUrl + _userId)
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

                            describe('verifyTOTPSecret() to verify time based one time password token so that two factor  authentication mechanism can be enabled without access token ', function () {
                                it('should return a message stating that authentication is failed', function(done){
                                    request
                                        .post(apiTotpVerifyUrl + _userId)
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

                            describe('getTOTPSecret() to set up two factor  authentication mechanism using time based one time password algorithm with access token ', function () {
                                it('should return an object containing QR image data which can be used to construct QR image to be authenticated using time based one time password authenticator like google authenticator or authy', function(done){
                                    request
                                        .get(apiTotpSetUpUrl)
                                        .set('Accept', 'application/json')
                                        .set('x-access-token', accessToken)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("qrcode");
                                            expect(res.body.qrcode).to.have.property("path");
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