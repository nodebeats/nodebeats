(function(){
    "use strict";

    var apiMessageConfig = require('../../lib/configs/api.message.config'),
        Promise = require("bluebird"),
        HTTPStatus = require('http-status');

    module.exports = function(expect, request, imagePathUrl, accessToken) {

        describe('User Integration test', function(){

            this.timeout(4000);
            var apiUrl = '/api/user/';
            var apiUrlPasswordChangeVerify = '/api/change-password/verify/';
            var userInfo;
            var verifySecurityAnswerInfo;


            beforeEach(function () {
                userInfo = {
                    firstName : "shrawan",
                    lastName : "lakhe",
                    email : "shrawanlakhey@gmail.com",
                    password : "toshiba-shrawan",
                    mobileNumber : "977-9818278372",
                    securityQuestion : "What is your favourite movie name?",
                    securityAnswer : "Harry Potter",
                    active : true,
                    userRole : "authuser"
                };

                verifySecurityAnswerInfo = {
                    email : "testnodecms@gmail.com",
                    securityQuestion : "What is your favourite movie name?",
                    securityAnswer : "Harry Potter",
                };
            });

            describe('getUsers() to retrieve list of users without access tokens', function () {
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


            describe('saveUsers() to save user information without access tokens', function () {
                this.timeout(10000);
                it('should return a message stating that authentication is failed', function(done){
                    request
                        .post(apiUrl)
                        .set('Accept', 'multipart/form-data')
                        .field('data', JSON.stringify(userInfo))
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


            describe('getUsers() to retrieve list of users  with access tokens', function () {
                it('should return a single list of users with username superadmin', function (done) {
                    request
                        .get(apiUrl)
                        .set('Accept', 'application/json')
                        .set('x-access-token', accessToken)
                        .expect('Content-Type', /json/)
                        .then(function (res) {
                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                            expect(res.body).to.have.property("dataList");
                            expect(res.body.dataList).to.be.instanceof(Array);
                            expect(res.body.dataList).to.have.length.of.at.least(1);
                            expect(res.body).to.have.property("totalItems");
                            expect(res.body.totalItems).to.equal(1);
                            expect(res.body.dataList[0].username).to.equal("superadmin");
                            done();
                        });
                });
            });


            describe('saveUsers()  to save user information with access tokens but without image file ', function () {

                it('should return a successfull save message stating that user saved successfully', function(done){
                    request
                        .post(apiUrl)
                        .set('Accept', 'multipart/form-data')
                        .set('x-access-token', accessToken)
                        .field('data', JSON.stringify(userInfo))
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.user.saveMessage);
                            done();
                        });
                });
            });

            describe('saveUsers()  to save user information with access tokens and also  with image file but different email address', function () {

                it('should return a successfull save message stating that user saved successfully', function(){
                    var self = this;
                    self.validUserObj = userInfo;
                    self.validUserObj.email = "hello1@bitsbeat.com";

                    return request
                        .post(apiUrl)
                        .set('Accept', 'multipart/form-data')
                        .set('x-access-token', accessToken)
                        .field('data', JSON.stringify(self.validUserObj))
                        .attach('avatar', imagePathUrl[0])
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.user.saveMessage);
                            return Promise.resolve();
                        })
                        .then(function () {
                            describe('verifySecurityAnswer()  to verify user authentication to check if the user is authentic and genuine and is eligible to change password ', function () {
                                afterEach(function () {
                                    verifySecurityAnswerInfo = {
                                        email: "hello1@bitsbeat.com",
                                        securityQuestion: "What is your favourite movie name?",
                                        securityAnswer: "Harry Potter",
                                    };
                                });

                                describe('with access token but without required fields', function () {
                                    it('should return a validation error messages', function (done) {
                                        var self = this;
                                        self.invalidUserObj = verifySecurityAnswerInfo;
                                        self.invalidUserObj.email = "";
                                        self.invalidUserObj.securityQuestion = "";
                                        self.invalidUserObj.securityAnswer = "";

                                        request
                                            .post(apiUrlPasswordChangeVerify)
                                            .set('Accept', 'application/x-www-form-urlencoded')
                                            .set('x-access-token', accessToken)
                                            .send(self.invalidUserObj)
                                            .expect('Content-Type', /json/)
                                            .then(function (res) {
                                                expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                                expect(res.error).to.have.property('text');
                                                var errObj = JSON.parse(res.error.text);
                                                expect(errObj.message[0].msg).to.have.string(apiMessageConfig.user.validationErrMessage.email);
                                                expect(errObj.message[1].msg).to.have.string(apiMessageConfig.user.validationErrMessage.securityQuestion);
                                                expect(errObj.message[2].msg).to.have.string(apiMessageConfig.user.validationErrMessage.securityAnswer);
                                                done();
                                            });
                                    });
                                });

                                describe(' with access token for user user information object which does not exist in our system', function () {

                                    it('should return a warning message stating that user is not authorized to perform password change action', function(done){
                                        var self = this;
                                        self.invalidUserObj = verifySecurityAnswerInfo;
                                        self.invalidUserObj.email = "greenmr@gmail.com";

                                        request
                                            .post(apiUrlPasswordChangeVerify)
                                            .set('Accept', 'application/x-www-form-urlencoded')
                                            .set('x-access-token', accessToken)
                                            .send(self.invalidUserObj)
                                            .expect('Content-Type', /json/)
                                            .then(function(res) {
                                                expect(res.statusCode).to.equal(HTTPStatus.UNAUTHORIZED);
                                                expect(res.body).to.be.an('object');
                                                expect(res.body).to.have.property("message");
                                                expect(res.body.message).to.equal(apiMessageConfig.user.notAuthorizedForSecurityAnswerUpdate);
                                                done();
                                            });
                                    });
                                });

                                describe(' with access token before user is successfully confirmed to our system', function () {

                                    it('should return a warning message stating that user account is not confirmed yet', function(done){
                                        request
                                            .post(apiUrlPasswordChangeVerify)
                                            .set('Accept', 'application/x-www-form-urlencoded')
                                            .set('x-access-token', accessToken)
                                            .send(verifySecurityAnswerInfo)
                                            .expect('Content-Type', /json/)
                                            .then(function(res) {
                                                expect(res.statusCode).to.equal(HTTPStatus.UNAUTHORIZED);
                                                expect(res.body).to.be.an('object');
                                                expect(res.body).to.have.property("message");
                                                expect(res.body.message).to.equal(apiMessageConfig.login.accountNotConfirmed);
                                                done();
                                            });
                                    });
                                });
                            });
                        });
                });
            });

            describe('saveUsers()  to save user information  with access tokens for duplicate username checking with same email id', function () {
                this.timeout(10000);
                it('should return a error message stating the user with username already exists', function(done){
                    request
                        .post(apiUrl)
                        .set('Accept', 'multipart/form-data')
                        .set('x-access-token', accessToken)
                        .field('data', JSON.stringify(userInfo))
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.CONFLICT);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.user.alreadyExists);
                            done();
                        });
                });
            });

            describe('saveUsers()  to save user information with access tokens having email and password with same value', function () {
                this.timeout(10000);
                it('should return a warning message stating that password and username must be different to each other', function(done){
                    var self = this;
                    self.invalidUserObj = userInfo;
                    self.invalidUserObj.password = "hello1@bitsbeat.com";
                    self.invalidUserObj.email = "hello1@bitsbeat.com";

                    request
                        .post(apiUrl)
                        .set('Accept', 'multipart/form-data')
                        .set('x-access-token', accessToken)
                        .field('data', JSON.stringify(self.invalidUserObj))
                        .attach('avatar', imagePathUrl[0])
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.user.passwordEqUsername);
                            done();
                        });
                });
            });

            describe('saveUsers()  to save user information with access tokens having very weak password i.e most commonly used insecure passwords', function () {
                this.timeout(10000);
                it('should return a warning message stating that password must be strong and secure', function(done){
                    var self = this;
                    self.invalidUserObj = userInfo;
                    self.invalidUserObj.password = "123456";
                    self.invalidUserObj.email = "hello3@bitsbeat.com";

                    request
                        .post(apiUrl)
                        .set('Accept', 'multipart/form-data')
                        .set('x-access-token', accessToken)
                        .field('data', JSON.stringify(self.invalidUserObj))
                        .attach('avatar', imagePathUrl[0])
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.user.weakPassword);
                            done();
                        });
                });
            });



            describe('saveUsers()  to save user information  with invalid data i.e. no firstname, no last name, no email,  no user role, invalid user role ,and finally invalid email', function () {
                afterEach(function(){
                    userInfo = {
                        firstName : "shrawan",
                        lastName : "lakhe",
                        email : "shrawanlakhey@gmail.com",
                        password : "toshiba-shrawan",
                        mobileNumber : "977-9818278372",
                        securityQuestion : "What is your favourite movie name?",
                        securityAnswer : "Harry Potter",
                        active : true,
                        userRole : "authuser"
                    };
                });

                it('should return a message stating validation error- first name is required for empty first name', function(done){
                    var self = this;
                    self.invalidUserObj = userInfo;
                    self.invalidUserObj.firstName = "";
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .field('data', JSON.stringify(self.invalidUserObj))
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.user.validationErrMessage.firstName);
                            done();
                        });
                });

                it('should return a message stating validation error- last name is required for empty last name', function(done){
                    var self = this;
                    self.invalidUserObj = userInfo;
                    self.invalidUserObj.lastName = "";
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .field('data', JSON.stringify(self.invalidUserObj))
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.user.validationErrMessage.lastName);
                            done();
                        });
                });

                it('should return a message stating validation error- email is required for empty email', function(done){
                    var self = this;
                    self.invalidUserObj = userInfo;
                    self.invalidUserObj.email = "";
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .field('data', JSON.stringify(self.invalidUserObj))
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.user.validationErrMessage.email);
                            done();
                        });
                });

                it('should return a message stating validation error - user role is required for empty user role', function(done){
                    var self = this;
                    self.invalidUserObj = userInfo;
                    self.invalidUserObj.userRole = "";
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .field('data', JSON.stringify(self.invalidUserObj))
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.user.validationErrMessage.userRole);
                            done();
                        });
                });

                it('should return a message stating validation error - invalid email address for invalid email address', function(done){
                    var self = this;
                    self.invalidUserObj = userInfo;
                    self.invalidUserObj.email = "ewewew";
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .field('data', JSON.stringify(self.invalidUserObj))
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.user.validationErrMessage.emailValid);
                            done();
                        });
                });

                it('should return a message stating validation error - empty password. password is required', function(done){
                    var self = this;
                    self.invalidUserObj = userInfo;
                    self.invalidUserObj.password = "";
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .field('data', JSON.stringify(self.invalidUserObj))
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.user.validationErrMessage.password);
                            done();
                        });
                });

                it('should return a message stating validation error - empty security question field. security question is required', function(done){
                    var self = this;
                    self.invalidUserObj = userInfo;
                    self.invalidUserObj.securityQuestion = "";
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .field('data', JSON.stringify(self.invalidUserObj))
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.user.validationErrMessage.securityQuestion);
                            done();
                        });
                });

                it('should return a message stating validation error - empty security question field. security question is required', function(done){
                    var self = this;
                    self.invalidUserObj = userInfo;
                    self.invalidUserObj.securityAnswer = "";
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .field('data', JSON.stringify(self.invalidUserObj))
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.user.validationErrMessage.securityAnswer);
                            done();
                        });
                });
            });

            describe('getUsers() to retrieve list of users with access tokens after saving user records', function () {
                it('should return a list of users', function(){
                    return request
                        .get(apiUrl)
                        .set('Accept', 'application/json')
                        .set('x-access-token', accessToken)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                            expect(res.body).to.have.property("dataList");
                            expect(res.body.dataList).to.be.instanceof(Array);
                            expect(res.body.dataList).to.have.length.of.at.least(3);
                            expect(res.body).to.have.property("totalItems");
                            expect(res.body.totalItems).to.have.at.least(3);
                            return Promise.resolve(res.body.dataList);
                        })
                        .then(function(resultUserlst){
                            var _userId = resultUserlst[0]._id;
                            var _username = resultUserlst[0].username;
                            var _imageName = resultUserlst[0].imageName;
                            var _superAdminUserId = resultUserlst[2]._id;

                            describe('getUserByID()  to retrieve user information object for ID ' + _userId +'  without access tokens', function () {
                                it('should return a message stating that authentication is failed', function(done){
                                    request
                                        .get(apiUrl + _userId)
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

                            describe('getUserByID()  to retrieve user information object for ID ' + _userId +' with access token', function () {
                                it('should return a user information object', function(done){
                                    request
                                        .get(apiUrl + _userId)
                                        .set('Accept', 'application/json')
                                        .set('x-access-token', accessToken)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("_id");
                                            expect(res.body._id).to.equal(_userId);
                                            expect(res.body).to.have.property("username");
                                            expect(res.body.username).to.equal(_username);
                                            done();
                                        });
                                });
                            });

                            describe('updateUser() to update existing user information object for ID ' + _userId +' without access tokens', function () {
                                it('should return a message stating that authentication is failed', function(done){
                                    request
                                        .put(apiUrl + _userId)
                                        .set('Accept', 'multipart/form-data')
                                        .field('data', JSON.stringify(userInfo))
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


                            describe('updateUser() to update existing user information object for user with ID ' + _userId +' to update data with access token and with image file but with already saved email address', function () {
                                beforeEach(function(){
                                    userInfo = {
                                        firstName : "shrawan",
                                        lastName : "lakhe",
                                        email : "shrawanlakhey@gmail.com",
                                        password : "toshiba-shrawan",
                                        mobileNumber : "977-9818278372",
                                        securityQuestion : "What is your favourite movie name?",
                                        securityAnswer : "Harry Potter",
                                        active : true,
                                        userRole : "authuser"
                                    };
                                });
                                it('should return an error message stating that user with same email already exists', function(done){
                                    var self = this;
                                    self.invalidUserObj = userInfo;
                                    self.invalidUserObj.userRole = "authuser";
                                    self.invalidUserObj.email = "shrawanlakhey@gmail.com";
                                    request
                                        .put(apiUrl + _userId)
                                        .set('Accept', 'multipart/form-data')
                                        .set('x-access-token', accessToken)
                                        .field('data', JSON.stringify(self.invalidUserObj))
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.CONFLICT);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.user.alreadyExists);
                                            done();
                                        });
                                });
                            });


                            describe('updateUser()  to update existing user information object for user with ID ' + _userId +' to update data with access token but without image file', function () {
                                it('should return a successfull update message stating that user updated successfully', function(){
                                    var self = this;
                                    self.validUserObj = userInfo;
                                    self.validUserObj.firstName = "Aamir";
                                    self.validUserObj.lastName = "Khan";
                                    self.validUserObj.email = "testnodecms@gmail.com";
                                    return request
                                        .put(apiUrl + _userId)
                                        .set('Accept', 'multipart/form-data')
                                        .set('x-access-token', accessToken)
                                        .field('data', JSON.stringify(self.validUserObj))
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.user.updateMessage);
                                            return Promise.resolve();
                                        });
                                });
                            });

                            describe('updateUser()  to update existing user information object  with invalid data i.e. no firstname, no last name, no email,  no user role, invalid user role ,and finally invalid email', function () {
                                afterEach(function(){
                                    userInfo = {
                                        firstName : "shrawan",
                                        lastName : "lakhe",
                                        email : "shrawanlakhey@gmail.com",
                                        password : "toshiba-shrawan",
                                        mobileNumber : "977-9818278372",
                                        securityQuestion : "What is your favourite movie name?",
                                        securityAnswer : "Harry Potter",
                                        active : true,
                                        userRole : "authuser"
                                    };
                                });

                                it('should return a message stating validation error- first name is required for empty first name', function(done){
                                    var self = this;
                                    self.invalidUserObj = userInfo;
                                    self.invalidUserObj.firstName = "";
                                    self.invalidUserObj.lastName = "";
                                    self.invalidUserObj.email = "";
                                    self.invalidUserObj.userRole = "";
                                    request
                                        .put(apiUrl + _userId)
                                        .set('Accept', 'multipart/form-data')
                                        .set('x-access-token', accessToken)
                                        .field('data', JSON.stringify(self.invalidUserObj))
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                            expect(res.error).to.have.property('text');
                                            var errObj = JSON.parse(res.error.text);
                                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.user.validationErrMessage.firstName);
                                            expect(errObj.message[1].msg).to.have.string(apiMessageConfig.user.validationErrMessage.lastName);
                                            expect(errObj.message[2].msg).to.have.string(apiMessageConfig.user.validationErrMessage.email);
                                            expect(errObj.message[3].msg).to.have.string(apiMessageConfig.user.validationErrMessage.userRole);
                                            done();
                                        });
                                });
                            });

                            describe('patchUserInformation() to delete user information for ID ' + _userId +' without access tokens', function () {
                                it('should return a message stating that authentication is failed', function(done){

                                    request
                                        .patch(apiUrl + _userId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .send({
                                            deleted : true
                                        })
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


                            describe('patchUserInformation() for user ID ' + _userId +' to update password  with access tokens having email and password with same value', function () {
                                it('should return a warning message stating that password and username must be different to each other', function(done){
                                    var self = this;
                                    self.invalidUserObj = userInfo;
                                    self.invalidUserObj.password = "hello1@bitsbeat.com";

                                    request
                                        .patch(apiUrl + _userId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .send(self.invalidUserObj)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.user.passwordEqUsername);
                                            done();
                                        });
                                });
                            });

                            describe('patchUserInformation() for user ID ' + _userId +' to update password  with access tokens having very weak password i.e most commonly used insecure passwords', function () {
                                it('should return a warning message stating that password must be strong and secure', function(done){
                                    var self = this;
                                    self.invalidUserObj = userInfo;
                                    self.invalidUserObj.password = "123456";

                                    request
                                        .patch(apiUrl + _userId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .send(self.invalidUserObj)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.user.weakPassword);
                                            done();
                                        });
                                });
                            });

                            describe('patchUserInformation() for user ID ' + _userId +' to update security question and answer ', function () {
                                it('should return a successfull update message stating that user related security question and answer updated successfully', function(done){
                                    var userPatchData =  {
                                        securityQuestion : "who?",
                                        securityAnswer : "hello"
                                    };
                                    request
                                        .patch(apiUrl + _userId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .send(userPatchData)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.user.securityAnswerMessage);

                                            done();
                                        });
                                });
                            });

                            describe('patchUserInformation() for user ID ' + _userId +' to update password ', function () {
                                it('should return a successfull update message stating that user password changes successfully', function(done){
                                    var userPatchData =  {
                                        password : "toshiba@satellite"
                                    };

                                    request
                                        .patch(apiUrl + _userId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .send(userPatchData)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.user.passwordUpdateMessage);

                                            done();
                                        });
                                });
                            });

                            describe('patchUserInformation() for ID ' + _userId +' with access token to delete user', function () {
                                it('should return a successfull delete message stating that user deleted successfully', function(done){

                                    request
                                        .patch(apiUrl + _userId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .send({
                                            deleted : true
                                        })
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.user.deleteMessage);

                                            done();
                                        });
                                });
                            });

                            describe('patchUserInformation() for ID ' + _userId +' with access token to delete user with superadmin access', function () {
                                it('should return a error  message  stating that superadmin user cannot be deleted', function(done){

                                    request
                                        .patch(apiUrl + _superAdminUserId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .send({
                                            deleted : true
                                        })
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.METHOD_NOT_ALLOWED);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.user.superAdminDeleteMessage);

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
