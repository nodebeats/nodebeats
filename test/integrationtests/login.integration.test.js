(function(){
    "use strict";

    var apiMessageConfig = require('../../lib/configs/api.message.config'),
        Promise = require("bluebird"),
        HTTPStatus = require('http-status');

    module.exports = function(expect, request, loginCredentil, loginUrl, accessToken) {
        describe('Login Integration test', function(){

            this.timeout(4000);
            var invalidLoginCredentil;

            beforeEach(function () {
                invalidLoginCredentil = {
                    username : "superadmin",
                    password : "superadmin@12345632"
                };
            });

            describe('User login with invalid credentials', function () {
                it('should return message stating invalid credentials', function(done){
                    request
                        .post(loginUrl)
                        .set('Accept', 'application/json')
                        .send(invalidLoginCredentil)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.UNAUTHORIZED);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("success");
                            expect(res.body.success).to.equal(false);
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.login.invalidMessage);
                            done();
                        });
                });
            });

            describe('User login with valid authentication credentials', function () {
                it('should return authentication token for accessing admin apis', function(done){
                    request
                        .post(loginUrl)
                        .set('Accept', 'application/json')
                        .send(loginCredentil)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                            expect(res.body).to.have.property("success");
                            expect(res.body.success).to.equal(true);
                            expect(res.body).to.have.property("token");
                            expect(res.body.message).to.not.equal("");
                            expect(res.body).to.have.property("userInfo");
                            expect(res.body.userInfo).to.be.an('object');
                            expect(res.body.userInfo).to.have.property("userRole");
                            expect(res.body.userInfo.userRole).to.equal('superadmin');
                            done();
                        });
                });
            });

            for(var i =0; i<2; i++){
                PerformUserLoginActionForFailedLoginAttempt(i);
            }

            function PerformUserLoginActionForFailedLoginAttempt(i){
                var msg = '';
                var credentialObj = {
                    username : "",
                    password : ""
                };
                if(i >= 1){
                    credentialObj.username = loginCredentil.username;
                    credentialObj.password = loginCredentil.password;
                    msg = 'should return authentication token for accessing admin apis';
                }else{
                    credentialObj.username = "fsda";
                    credentialObj.password = "ferewrw";
                    msg = 'should return message stating invalid credentials for attempt ' + (i + 1);
                }
                describe('User login api returning access token with valid credential after two failed login attempts', function () {
                    it(msg, function(done){
                        request
                            .post(loginUrl)
                            .set('Accept', 'application/json')
                            .send(credentialObj)
                            .expect('Content-Type', /json/)
                            .then(function(res) {
                                if(i >= 1) {
                                    expect(res.statusCode).to.equal(HTTPStatus.OK);
                                    expect(res.body).to.have.property("success");
                                    expect(res.body.success).to.equal(true);
                                    expect(res.body).to.have.property("token");
                                    expect(res.body.message).to.not.equal("");
                                    expect(res.body).to.have.property("userInfo");
                                    expect(res.body.userInfo).to.be.an('object');
                                    expect(res.body.userInfo).to.have.property("userRole");
                                    expect(res.body.userInfo.userRole).to.equal('superadmin');
                                } else {

                                    expect(res.statusCode).to.equal(HTTPStatus.UNAUTHORIZED);
                                    expect(res.body).to.be.an('object');
                                    expect(res.body).to.have.property("success");
                                    expect(res.body.success).to.equal(false);
                                    expect(res.body).to.have.property("message");
                                    expect(res.body.message).to.equal(apiMessageConfig.login.invalidMessage);
                                }

                                done();
                                if(i >= 1) {
                                    return Promise.resolve();
                                }
                            })
                            .then(function () {
                                if(i >= 1) {
                                    for (var j = 0; j < 2; j++) {
                                        checkUserBlockStatusForMaxFailedAttempts(j);
                                    }
                                }
                            });
                    });
                });
            }


            function checkUserBlockStatusForMaxFailedAttempts(i){
                var msg = '';
                if(i >= 2){
                    msg = 'should return message stating ip address of user is blocked for certain time after repeated invalid login attempt';
                }else{
                    msg = 'should return message stating invalid credentials for attempt ' + (i + 1);
                }
                describe('IP address of user blocked due to the several attempts(two invalid attempts) of wrong combination of username/password for the first 10 minutes', function () {
                    it(msg, function(done){
                        request
                            .post(loginUrl)
                            .set('Accept', 'application/json')
                            .send(invalidLoginCredentil)
                            .expect('Content-Type', /json/)
                            .then(function(res) {
                                if(i >= 1) {
                                    expect(res.statusCode).to.equal(HTTPStatus.UNAUTHORIZED);
                                    expect(res.body).to.be.an('object');
                                    expect(res.body).to.have.property("message");
                                    expect(res.body.message).to.equal(apiMessageConfig.login.ipBlocked);
                                } else {
                                    expect(res.statusCode).to.equal(HTTPStatus.UNAUTHORIZED);
                                    expect(res.body).to.be.an('object');
                                    expect(res.body).to.have.property("success");
                                    expect(res.body.success).to.equal(false);
                                    expect(res.body).to.have.property("message");
                                    expect(res.body.message).to.equal(apiMessageConfig.login.invalidMessage);
                                }

                                done();
                                return Promise.resolve();
                            });
                    });
                });
            }
        });
    };
})();