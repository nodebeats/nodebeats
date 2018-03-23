(function(){
    "use strict";

    var apiMessageConfig = require('../../lib/configs/api.message.config'),
        Promise = require("bluebird"),
        HTTPStatus = require('http-status');

    module.exports = function(expect, request, accessToken) {

        describe('Email Template Integration test', function(){

            this.timeout(4000);
            var apiUrl = '/api/emailtemplate/';
            var emailTemplateInfo;

            beforeEach(function () {
                emailTemplateInfo = {
                    templateName : "email-template-test",
                    emailSubject : "Email to confirm successfull integration test",
                    emailFrom : "shrawanlakhey@gmail.com",
                    templateBody : "<div><h2>Mr./Mrs.{{ interestedPeople.name }} has shown interest in our service {{ interestedPeople.email }} .</h2><p>He/She wants to have quote of the project and have provided with following details.</p><br/><p><strong>Organization</strong>:    {{ interestedPeople.message }}<br/><br /></p><p><strong>Contact Number</strong>:    {{ interestedOrganization.contactNumber }}<br/><br /></p><p><strong>Interested Service</strong>:    {{ interestedOrganization.service }}<br/><br /></p><p><strong>Project Description</strong>:    {{ interestedOrganization.projectDesc }}<br/><br /></p><p><strong>Project Deadline</strong>:    {{ interestedOrganization.projectDeliveryDeadLine }}<br/><br /></p><br /><br /></div>",
                    attachmentAvailabilityStatus : false,
                    active : true
                };
            });

            describe('getEmailTemplate() to retrieve email template list', function () {
                it('should return an empty list', function(done){
                    request
                        .get(apiUrl)
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                            expect(res.body).to.have.property("dataList");
                            expect(res.body.dataList).to.be.instanceof(Array);
                            expect(res.body.dataList).to.be.empty;
                            expect(res.body).to.have.property("totalItems");
                            expect(res.body.totalItems).to.equal(0);
                            done();
                        });
                });
            });

            describe('postEmailTemplate() to save email template object without access tokens', function () {
                it('should return a message stating that authentication is failed', function(done){
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .send(emailTemplateInfo)
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

            describe('postEmailTemplate()  to save email template object ', function(){
                describe('with access tokens ', function () {
                    it('should return a success message stating that email template is saved successfully', function(done){
                        request
                            .post(apiUrl)
                            .set('Accept', 'application/x-www-form-urlencoded')
                            .set('x-access-token', accessToken)
                            .send(emailTemplateInfo)
                            .expect('Content-Type', /json/)
                            .then(function(res) {
                                expect(res.statusCode).to.equal(HTTPStatus.OK);
                                expect(res.body).to.be.an('object');
                                expect(res.body).to.have.property("message");
                                expect(res.body.message).to.equal(apiMessageConfig.emailTemplate.saveMessage);
                                done();
                            });
                    });
                });

                describe('with access token and same title for checking duplicacy', function () {
                    it('should return a message stating that email template with same title already exists.', function(done){
                        request
                            .post(apiUrl)
                            .set('Accept', 'application/x-www-form-urlencoded')
                            .set('x-access-token', accessToken)
                            .send(emailTemplateInfo)
                            .expect('Content-Type', /json/)
                            .then(function(res) {
                                expect(res.statusCode).to.equal(HTTPStatus.CONFLICT);
                                expect(res.body).to.be.an('object');
                                expect(res.body).to.have.property("message");
                                expect(res.body.message).to.equal(apiMessageConfig.emailTemplate.alreadyExists);
                                done();
                            });
                    });
                });

                describe('with invalid data i.e. no template name, no email subject, no email from, invalid email or no templatebody', function () {
                    afterEach(function(){
                        emailTemplateInfo = {
                            templateName : "email-template-test",
                            emailSubject : "Email to confirm successfull integration test",
                            emailFrom : "shrawanlakhey@gmail.com",
                            templateBody : "<div><h2>Mr./Mrs.{{ interestedPeople.name }} has shown interest in our service {{ interestedPeople.email }} .</h2><p>He/She wants to have quote of the project and have provided with following details.</p><br/><p><strong>Organization</strong>:    {{ interestedPeople.message }}<br/><br /></p><p><strong>Contact Number</strong>:    {{ interestedOrganization.contactNumber }}<br/><br /></p><p><strong>Interested Service</strong>:    {{ interestedOrganization.service }}<br/><br /></p><p><strong>Project Description</strong>:    {{ interestedOrganization.projectDesc }}<br/><br /></p><p><strong>Project Deadline</strong>:    {{ interestedOrganization.projectDeliveryDeadLine }}<br/><br /></p><br /><br /></div>",
                            attachmentAvailabilityStatus : false,
                            active : true
                        };
                    });

                    it('should return a message stating validation error- templateName is required for empty template name', function(done){
                        var self = this;
                        self.invalidEmailTemplateObj = emailTemplateInfo;
                        self.invalidEmailTemplateObj.templateName = "";
                        request
                            .post(apiUrl)
                            .set('Accept', 'application/x-www-form-urlencoded')
                            .set('x-access-token', accessToken)
                            .send(self.invalidEmailTemplateObj)
                            .expect('Content-Type', /json/)
                            .then(function(res) {
                                expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                expect(res.error).to.have.property('text');
                                var errObj = JSON.parse(res.error.text);
                                expect(errObj.message[0].msg).to.have.string(apiMessageConfig.emailTemplate.validationErrMessage.templateName);
                                done();
                            });
                    });

                    it('should return a message stating validation error- emailSubject is required  for empty email subject', function(done){
                        var self = this;
                        self.invalidEmailTemplateObj = emailTemplateInfo;
                        self.invalidEmailTemplateObj.emailSubject = "";
                        request
                            .post(apiUrl)
                            .set('Accept', 'application/x-www-form-urlencoded')
                            .set('x-access-token', accessToken)
                            .send(self.invalidEmailTemplateObj)
                            .expect('Content-Type', /json/)
                            .then(function(res) {
                                expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                expect(res.error).to.have.property('text');
                                var errObj = JSON.parse(res.error.text);
                                expect(errObj.message[0].msg).to.have.string(apiMessageConfig.emailTemplate.validationErrMessage.emailSubject);
                                done();
                            });
                    });

                    it('should return a message stating validation error- email is required  for empty email from field', function(done){
                        var self = this;
                        self.invalidEmailTemplateObj = emailTemplateInfo;
                        self.invalidEmailTemplateObj.emailFrom = "";
                        request
                            .post(apiUrl)
                            .set('Accept', 'application/x-www-form-urlencoded')
                            .set('x-access-token', accessToken)
                            .send(self.invalidEmailTemplateObj)
                            .expect('Content-Type', /json/)
                            .then(function(res) {
                                expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                expect(res.error).to.have.property('text');
                                var errObj = JSON.parse(res.error.text);
                                expect(errObj.message[0].msg).to.have.string(apiMessageConfig.emailTemplate.validationErrMessage.emailFrom);
                                done();
                            });
                    });

                    it('should return a message stating validation error - invalid email for invalid email', function(done){
                        var self = this;
                        self.invalidEmailTemplateObj = emailTemplateInfo;
                        self.invalidEmailTemplateObj.emailFrom = "ewerwer";
                        request
                            .post(apiUrl)
                            .set('Accept', 'application/x-www-form-urlencoded')
                            .set('x-access-token', accessToken)
                            .send(self.invalidEmailTemplateObj)
                            .expect('Content-Type', /json/)
                            .then(function(res) {
                                expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                expect(res.error).to.have.property('text');
                                var errObj = JSON.parse(res.error.text);
                                expect(errObj.message[0].msg).to.have.string(apiMessageConfig.emailTemplate.validationErrMessage.emailFromValid);
                                done();
                            });
                    });

                    it('should return a message stating validation error - template body is required  for empty template body', function(done){
                        var self = this;
                        self.invalidEmailTemplateObj = emailTemplateInfo;
                        self.invalidEmailTemplateObj.templateBody = "";
                        request
                            .post(apiUrl)
                            .set('Accept', 'application/x-www-form-urlencoded')
                            .set('x-access-token', accessToken)
                            .send(self.invalidEmailTemplateObj)
                            .expect('Content-Type', /json/)
                            .then(function(res) {
                                expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                expect(res.error).to.have.property('text');
                                var errObj = JSON.parse(res.error.text);
                                expect(errObj.message[0].msg).to.have.string(apiMessageConfig.emailTemplate.validationErrMessage.templateBody);
                                done();
                            });
                    });
                });
            });

            describe('getEmailTemplate()  to retrieve email template list after saving a record', function () {
                it('should return a list of email templates', function(){
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
                        .then(function(resultTemplateObj){
                            var _emailTemplateId = resultTemplateObj._id;
                            var _templateName = resultTemplateObj.templateName;

                            describe('getEmailTemplateDataByID() to retrive email template object for ID ' + _emailTemplateId, function () {
                                it('should return an email template object' , function(done){
                                    request
                                        .get(apiUrl + _emailTemplateId)
                                        .set('Accept', 'application/json')
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("_id");
                                            expect(res.body._id).to.equal(_emailTemplateId);
                                            expect(res.body).to.have.property("templateName");
                                            expect(res.body.templateName).to.equal(_templateName);
                                            done();
                                        });
                                });
                            });

                            describe('updateEmailTemplateData() to update existing email template data for ID ' + _emailTemplateId, function(){

                                afterEach(function(){
                                    emailTemplateInfo = {
                                        templateName : "email-template-test",
                                        emailSubject : "Email to confirm successfull integration test",
                                        emailFrom : "shrawanlakhey@gmail.com",
                                        templateBody : "<div><h2>Mr./Mrs.{{ interestedPeople.name }} has shown interest in our service {{ interestedPeople.email }} .</h2><p>He/She wants to have quote of the project and have provided with following details.</p><br/><p><strong>Organization</strong>:    {{ interestedPeople.message }}<br/><br /></p><p><strong>Contact Number</strong>:    {{ interestedOrganization.contactNumber }}<br/><br /></p><p><strong>Interested Service</strong>:    {{ interestedOrganization.service }}<br/><br /></p><p><strong>Project Description</strong>:    {{ interestedOrganization.projectDesc }}<br/><br /></p><p><strong>Project Deadline</strong>:    {{ interestedOrganization.projectDeliveryDeadLine }}<br/><br /></p><br /><br /></div>",
                                        attachmentAvailabilityStatus : true,
                                        active : true
                                    };
                                });

                                describe('without access tokens', function () {
                                    it('should return a message stating that authentication is failed', function(done){
                                        request
                                            .put(apiUrl + _emailTemplateId)
                                            .set('Accept', 'application/x-www-form-urlencoded')
                                            .send(emailTemplateInfo)
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

                                describe('with valid data and access token', function () {
                                    it('should return a successfull update message stating that email template is updated successfully', function (done) {
                                        var self = this;
                                        self.validEmailTemplateObj = emailTemplateInfo;
                                        self.validEmailTemplateObj.templateName = "email-template-test-edit";
                                        self.validEmailTemplateObj.emailSubject = "Email to confirm successfull integration test using mocha and supertest";

                                        request
                                            .put(apiUrl + _emailTemplateId)
                                            .set('Accept', 'application/x-www-form-urlencoded')
                                            .set('x-access-token', accessToken)
                                            .send(self.validEmailTemplateObj)
                                            .expect('Content-Type', /json/)
                                            .then(function (res) {
                                                expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                expect(res.body).to.be.an('object');
                                                expect(res.body).to.have.property("message");
                                                expect(res.body.message).to.equal(apiMessageConfig.emailTemplate.updateMessage);
                                                done();
                                            });
                                    });
                                });

                                describe(' with invalid data i.e. no template name, no email subject, no email from, invalid email or no templatebody', function () {
                                    it('should return a message stating validation error- templateName is required for empty template name', function(done){
                                        var self = this;
                                        self.invalidEmailTemplateObj = emailTemplateInfo;
                                        self.invalidEmailTemplateObj.templateName = "";
                                        request
                                            .put(apiUrl + _emailTemplateId)
                                            .set('Accept', 'application/x-www-form-urlencoded')
                                            .set('x-access-token', accessToken)
                                            .send(self.invalidEmailTemplateObj)
                                            .expect('Content-Type', /json/)
                                            .then(function(res) {
                                                expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                                expect(res.error).to.have.property('text');
                                                var errObj = JSON.parse(res.error.text);
                                                expect(errObj.message[0].msg).to.have.string(apiMessageConfig.emailTemplate.validationErrMessage.templateName);
                                                done();
                                            });
                                    });

                                    it('should return a message stating validation error- emailSubject is required  for empty email subject', function(done){
                                        var self = this;
                                        self.invalidEmailTemplateObj = emailTemplateInfo;
                                        self.invalidEmailTemplateObj.emailSubject = "";
                                        request
                                            .put(apiUrl + _emailTemplateId)
                                            .set('Accept', 'application/x-www-form-urlencoded')
                                            .set('x-access-token', accessToken)
                                            .send(self.invalidEmailTemplateObj)
                                            .expect('Content-Type', /json/)
                                            .then(function(res) {

                                                expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                                expect(res.error).to.have.property('text');
                                                var errObj = JSON.parse(res.error.text);
                                                expect(errObj.message[0].msg).to.have.string(apiMessageConfig.emailTemplate.validationErrMessage.emailSubject);
                                                done();
                                            });
                                    });

                                    it('should return a message stating validation error- email is required  for empty email from ', function(done){
                                        var self = this;
                                        self.invalidEmailTemplateObj = emailTemplateInfo;
                                        self.invalidEmailTemplateObj.emailFrom = "";
                                        request
                                            .put(apiUrl + _emailTemplateId)
                                            .set('Accept', 'application/x-www-form-urlencoded')
                                            .set('x-access-token', accessToken)
                                            .send(self.invalidEmailTemplateObj)
                                            .expect('Content-Type', /json/)
                                            .then(function(res) {
                                                expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                                expect(res.error).to.have.property('text');
                                                var errObj = JSON.parse(res.error.text);
                                                expect(errObj.message[0].msg).to.have.string(apiMessageConfig.emailTemplate.validationErrMessage.emailFrom);
                                                done();
                                            });
                                    });

                                    it('should return a message stating validation error - invalid email  for invalid email id', function(done){
                                        var self = this;
                                        self.invalidEmailTemplateObj = emailTemplateInfo;
                                        self.invalidEmailTemplateObj.emailFrom = "ewerwer";
                                        request
                                            .put(apiUrl + _emailTemplateId)
                                            .set('Accept', 'application/x-www-form-urlencoded')
                                            .set('x-access-token', accessToken)
                                            .send(self.invalidEmailTemplateObj)
                                            .expect('Content-Type', /json/)
                                            .then(function(res) {
                                                expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                                expect(res.error).to.have.property('text');
                                                var errObj = JSON.parse(res.error.text);
                                                expect(errObj.message[0].msg).to.have.string(apiMessageConfig.emailTemplate.validationErrMessage.emailFromValid);
                                                done();
                                            });
                                    });

                                    it('should return a message stating validation error - template body is required  for empty template body', function(done){
                                        var self = this;
                                        self.invalidEmailTemplateObj = emailTemplateInfo;
                                        self.invalidEmailTemplateObj.templateBody = "";
                                        request
                                            .put(apiUrl + _emailTemplateId)
                                            .set('Accept', 'application/x-www-form-urlencoded')
                                            .set('x-access-token', accessToken)
                                            .send(self.invalidEmailTemplateObj)
                                            .expect('Content-Type', /json/)
                                            .then(function(res) {
                                                expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                                expect(res.error).to.have.property('text');
                                                var errObj = JSON.parse(res.error.text);
                                                expect(errObj.message[0].msg).to.have.string(apiMessageConfig.emailTemplate.validationErrMessage.templateBody);
                                                done();
                                            });
                                    });
                                });
                            });

                            describe('patchEmailTemplateData() to delete email template for ID ' + _emailTemplateId, function () {
                                describe('without access tokens', function () {
                                    it('should return a message stating that authentication is failed', function (done) {

                                        request
                                            .patch(apiUrl + _emailTemplateId)
                                            .set('Accept', 'application/x-www-form-urlencoded')
                                            .expect('Content-Type', /json/)
                                            .then(function (res) {
                                                expect(res.statusCode).to.equal(HTTPStatus.UNAUTHORIZED);
                                                expect(res.body).to.have.property("success");
                                                expect(res.body.success).to.equal(false);
                                                expect(res.body).to.have.property("message");
                                                expect(res.body.message).to.equal(apiMessageConfig.authFail.authFailMessage);
                                                done();
                                            });
                                    });
                                });

                                describe('with access token', function () {
                                    it('should return a successfull delete message stating that email template is deleted successfully', function(){
                                        return request
                                            .patch(apiUrl + _emailTemplateId)
                                            .set('Accept', 'application/x-www-form-urlencoded')
                                            .set('x-access-token', accessToken)
                                            .expect('Content-Type', /json/)
                                            .then(function(res) {
                                                expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                expect(res.body).to.be.an('object');
                                                expect(res.body).to.have.property("message");
                                                expect(res.body.message).to.equal(apiMessageConfig.emailTemplate.deleteMessage);
                                                return Promise.resolve();

                                            })
                                            .then(function(){
                                                describe('getEmailTemplate() to retrieve email templates after record delete', function () {
                                                    it('should not return an email template list i.e empty response', function(done){
                                                        request
                                                            .get(apiUrl)
                                                            .set('Accept', 'application/json')
                                                            .expect('Content-Type', /json/)
                                                            .then(function(res) {
                                                                expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                                expect(res.body).to.have.property("dataList");
                                                                expect(res.body.dataList).to.be.instanceof(Array);
                                                                expect(res.body.dataList).to.be.empty;
                                                                expect(res.body).to.have.property("totalItems");
                                                                expect(res.body.totalItems).to.equal(0);
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