(function(){
    "use strict";

    var apiMessageConfig = require('../../lib/configs/api.message.config'),
        Promise = require("bluebird"),
        HTTPStatus = require('http-status');

    module.exports = function(expect, request, accessToken) {
        describe('Contact Information  Integration test', function(){

            this.timeout(6000);
            var apiUrl = '/api/contact/info/';
            var contactObj;

            beforeEach(function () {
                contactObj = {
                    fullName : "Shrawan Lakhe",
                    email : "shrawanlakhey@gmail.com",
                    contactNumber : "977-9818278372",
                    organizationName : "BitsBeat IT Solution",
                    informationSource : "none",
                    message : "Hi everyone. that's it tata bye"
                };
            });

            describe('getContactInfo() to retrieve interested people contact list without access token ', function () {
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


            describe('postContactInfo() to save interested people contact information object', function () {
                it('should return a message stating that contact is registered successfully', function(done){
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .send(contactObj)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.contact.saveMessage);
                            done();
                        });
                });
            });


            describe('postContactInfo()  to save interested people contact information object with invalid data i.e. no fullname, no email, invalid email and finally no message ', function () {
                afterEach(function(){
                    contactObj = {
                        fullName : "Shrawan Lakhe",
                        email : "shrawanlakhey@gmail.com",
                        contactNumber : "977-9818278372",
                        organizationName : "BitsBeat IT Solution",
                        informationSource : "none",
                        message : "Hi everyone. that's it tata bye"
                    };
                });
                it('should return a message stating validation error - full name is required for empty name', function(done){
                    var self = this;
                    self.invalidcontactObj = contactObj;
                    self.invalidcontactObj.fullName = "";
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .send(self.invalidcontactObj)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.contact.validationErrMessage.fullName);
                            done();
                        });
                });

                it('should return a message stating validation error - email is required for empty email', function(done){
                    var self = this;
                    self.invalidcontactObj = contactObj;
                    self.invalidcontactObj.email = "";
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .send(self.invalidcontactObj)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.contact.validationErrMessage.email);
                            done();
                        });
                });

                it('should return a message stating validation error - invalid email for invalid email address', function(done){
                    var self = this;
                    self.invalidcontactObj = contactObj;
                    self.invalidcontactObj.email = "tretre";
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .send(self.invalidcontactObj)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.contact.validationErrMessage.emailValid);
                            done();
                        });
                });


                it('should return a message stating validation error - message is required for empty message field', function(done){
                    var self = this;
                    self.invalidcontactObj = contactObj;
                    self.invalidcontactObj.message = "";
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .send(self.invalidcontactObj)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.contact.validationErrMessage.message);
                            done();
                        });
                });

                it('should return a message - validation error due to invalid data value in information source for information source value other than google, friends, newspaper, socialSites, television or none', function(done){
                    var self = this;
                    self.invalidcontactObj = contactObj;
                    self.invalidcontactObj.informationSource = "blah";
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .send(self.invalidcontactObj)
                        .expect('Content-Type', 'text/html; charset=utf-8')
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.INTERNAL_SERVER_ERROR);
                            expect(res.error).to.have.property('text');
                            expect(res.error.text).to.have.string('ValidationError: Contact validation failed');
                            done();
                        });
                });
            });



            describe('getContactInfo() to retrieve interested people contact list  with access token', function () {
                it('should return a list of contacts of interested people', function(){
                    return request
                        .get(apiUrl)
                        .set('Accept', 'application/json')
                        .set('x-access-token', accessToken)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                            expect(res.body).to.have.property("dataList");
                            expect(res.body.dataList).to.be.instanceof(Array);
                            expect(res.body.dataList).to.have.length.of.at.least(1);
                            expect(res.body).to.have.property("totalItems");
                            expect(res.body.totalItems).to.have.at.least(1);
                            return Promise.resolve(res.body.dataList[0]);
                        })
                        .then(function(contactObj){
                            var _contactId = contactObj._id;
                            var _fullName = contactObj.fullName;

                            describe('getContactInfoByID() to retrieve contact information object for ID ' + _contactId + 'without access token', function () {
                                it('should return a message stating that authentication is failed', function(done){
                                    request
                                        .get(apiUrl + _contactId)
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

                            describe('getContactInfoByID() to retrieve contact information object  for ID ' + _contactId + ' with access token', function () {
                                it('should return an interested person contact object', function(done){
                                    request
                                        .get(apiUrl + _contactId)
                                        .set('Accept', 'application/json')
                                        .set('x-access-token', accessToken)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("_id");
                                            expect(res.body._id).to.equal(_contactId);
                                            expect(res.body).to.have.property("fullName");
                                            expect(res.body.fullName).to.equal(_fullName);
                                            done();
                                        });
                                });
                            });

                            describe('patchContactInfo() to delete contact information data for ID ' + _contactId +' without access token', function () {
                                it('should return a message stating that authentication is failed', function(done){
                                    request
                                        .patch(apiUrl + _contactId)
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

                            describe('patchContactInfo() to delete contact information data  for ID ' + _contactId, function () {
                                it('should return a successfull delete message ', function(){
                                    return request
                                        .patch(apiUrl + _contactId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.contact.deleteMessage);
                                            return Promise.resolve();
                                        })
                                        .then(function () {
                                            describe('getContactInfo()  to retrieve interested people contact list  after deleteing record', function () {
                                                it('should return an empty list of contacts i.e. empty response', function(done){
                                                    request
                                                        .get(apiUrl)
                                                        .set('Accept', 'application/json')
                                                        .set('x-access-token', accessToken)
                                                        .expect('Content-Type', /json/)
                                                        .then(function(res) {
                                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                            expect(res.body).to.have.property("dataList");
                                                            expect(res.body.dataList).to.be.instanceof(Array);
                                                            expect(res.body.dataList).to.have.length.below(1);
                                                            expect(res.body).to.have.property("totalItems");
                                                            expect(res.body.totalItems).to.equal(0);
                                                            expect(res.body).to.not.have.property("deleted");
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
    };
})();