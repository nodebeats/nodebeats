(function () {
    "use strict";

    var apiMessageConfig = require('../../lib/configs/api.message.config'),
        Promise = require("bluebird"),
        HTTPStatus = require('http-status');

    module.exports = function(expect, request, loginObj, loginUrl) {

        describe('Authorization Token Management Integration test', function(){

            this.timeout(8000);

            var authorizationTokenUrl = '/api/authtoken/';

            describe('getAuthorizationTokens() to retrieve authorization token list without access token', function () {
                it('should return a message stating that authentication is failed', function(done){
                    request
                        .get(authorizationTokenUrl)
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

            describe('deleteAllAuthorizationToken() to delete all the authorization tokens information  without access tokens ', function () {
                it('should return a message stating that authentication is failed', function(done){

                    request
                        .delete(authorizationTokenUrl)
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

            describe('User login', function () {
                it('should return authentication token along with logged in user object', function () {
                    return request
                        .post(loginUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .send(loginObj)
                        .expect('Content-Type', /json/)
                        .then(function (response) {
                            expect(response.statusCode).to.equal(HTTPStatus.OK);
                            expect(response.body).to.have.property("success");
                            expect(response.body.success).to.equal(true);
                            expect(response.body).to.have.property("token");
                            expect(response.body.message).to.not.equal("");
                            expect(response.body).to.have.property("userInfo");
                            expect(response.body.userInfo).to.be.an('object');
                            expect(response.body.userInfo).to.have.property("userRole");
                            expect(response.body.userInfo.userRole).to.equal('superadmin');

                            var accessToken = response.body.token;
                            return Promise.resolve(accessToken);
                        }).then(function (accessToken) {

                            describe('getAuthorizationTokens() to retrieve authorization token list with access token', function () {
                                it('should return a list of authorization tokens so that we can access admin apis', function(){

                                    return request
                                        .get(authorizationTokenUrl)
                                        .set('Accept', 'application/json')
                                        .set('x-access-token', accessToken)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.instanceof(Array);
                                            expect(res.body).to.have.length.of.at.least(2);
                                            return Promise.resolve(res.body[0]);
                                        })
                                        .then(function(authorizationTokenObj){

                                            var _authorizationTokenId = authorizationTokenObj._id;
                                            var _authorizationToken = authorizationTokenObj.authorizationToken;

                                            describe('getAuthorizationTokenById() to retrieve authorization token information object for ID ' + _authorizationTokenId + ' without access token', function () {
                                                it('should return a message stating that authentication is failed', function(done){
                                                    request
                                                        .get(authorizationTokenUrl + _authorizationTokenId)
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

                                            describe('getAuthorizationTokenById() to retrieve authorization token information object for ID ' + _authorizationTokenId + ' with access token', function () {
                                                it('should return an object containing authorization token data', function(done){
                                                request
                                                    .get(authorizationTokenUrl + _authorizationTokenId)
                                                    .set('Accept', 'application/json')
                                                    .set('x-access-token', accessToken)
                                                    .expect('Content-Type', /json/)
                                                    .then(function(res) {
                                                        expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                        expect(res.body).to.be.an('object');
                                                        expect(res.body).to.have.property("_id");
                                                        expect(res.body._id).to.equal(_authorizationTokenId);
                                                        expect(res.body).to.have.property("authorizationToken");
                                                        expect(res.body.authorizationToken).to.equal(_authorizationToken);
                                                        done();
                                                    });
                                            });

                                            describe('deleteAuthorizationToken() to delete authorization token information object with _id = ' + _authorizationTokenId +'  without access tokens ', function () {
                                                it('should return a message stating that authentication is failed', function(done){

                                                    request
                                                        .delete(authorizationTokenUrl + _authorizationTokenId)
                                                        .set('Accept', 'application/x-www-form-urlencoded')
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

                                                describe('deleteAuthorizationToken() to delete authorization token information object with _id = ' + _authorizationTokenId +'  with access tokens ', function () {
                                                            it('should return a successful delete message stating that Authorization token deleted successfully', function(done){

                                                                request
                                                                    .delete(authorizationTokenUrl + _authorizationTokenId)
                                                                    .set('Accept', 'application/x-www-form-urlencoded')
                                                                    .set('x-access-token', accessToken)
                                                                    .expect('Content-Type', /json/)
                                                                    .then(function(res) {
                                                                        expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                                        expect(res.body).to.be.an('object');
                                                                        expect(res.body).to.have.property("message");
                                                                        expect(res.body.message).to.equal(apiMessageConfig.authorizationToken.deleteMessage);
                                                                        done();
                                                                    });

                                                            });
                                                        });
                                        });
                                    });
                                });
                            });
                        });
                });
            });
        });
    };
})();