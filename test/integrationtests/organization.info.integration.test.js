(function(){
    "use strict";

    var apiMessageConfig = require('../../lib/configs/api.message.config'),
        Promise = require("bluebird"),
        HTTPStatus = require('http-status');

    module.exports = function(expect, request, imagePathUrl, accessToken) {

        describe('Organization Information Setting Configuration Integration test', function(){

            this.timeout(4000);
            var apiUrl = '/api/organization/info/';
            var organizationInformationObj;
            
            beforeEach(function () {
                organizationInformationObj = {
                    orgName:"Nodebeats",
                    country: "Nepal",
                    region:"Bagmati",
                    state:"",
                    city: "Lalitpur",
                    addressLine: "Thaiba",
                    streetAddress: "Godawari Street",
                    zipAddress: "977",
                    postalCode: "44600",
                    organizationEmail: "shrawanlakhey@gmail.com",
                    phoneNumber: "977-6666372",
                    mobileNumber: "977-99999999999",
                    faxNumber:"",
                    facebookURL: "https://www.facebook.com",
                    twitterURL: "",
                    googlePlusURL: "",
                    linkedInURL:"",
                    slogan: "Go forward no matter what"
                };
            });

            describe('getOrganizationInfo() to retrieve organization information data', function () {
                it('should return an empty object i.e. no organization info', function(done){
                    request
                        .get(apiUrl)
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.NOT_FOUND);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.organizationInfo.notFound);
                            done();
                        });
                });
            });

            describe('postOrganizationInfo() to save organization information object without access token', function () {
                it('should return a message stating that authentication is failed', function(done){
                    request
                        .post(apiUrl)
                        .set('Accept', 'multipart/form-data')
                        .send(organizationInformationObj)
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

            describe('postOrganizationInfo()  to save organization information object with no country i.e. no city, no street Address, no organization Email, invalid organization Email, invalid facebook URL and finally invalid twitter url', function () {
                afterEach(function(){
                    organizationInformationObj = {
                        orgName:"Nodebeats",
                        country: "Nepal",
                        region:"Bagmati",
                        state:"",
                        city: "Lalitpur",
                        addressLine: "Thaiba",
                        streetAddress: "Godawari Street",
                        zipAddress: "977",
                        postalCode: "44600",
                        organizationEmail: "shrawanlakhey@gmail.com",
                        phoneNumber: "977-6666372",
                        mobileNumber: "977-99999999999",
                        faxNumber:"",
                        facebookURL: "https://www.facebook.com",
                        twitterURL: "",
                        googlePlusURL: "",
                        linkedInURL:"",
                        slogan: "Go forward no matter what"
                    };
                });

                it('should return a message stating validation error - country is required for empty country name', function(done){
                    var self = this;
                    self.invalidOrganizationInfo = organizationInformationObj;
                    self.invalidOrganizationInfo.country = "";
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .field('data', JSON.stringify(self.invalidOrganizationInfo))
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.organizationInfo.validationErrMessage.country);

                            done();
                        });
                });

                it('should return a message stating validation error - city is required for empty city name', function(done){
                    var self = this;
                    self.invalidOrganizationInfo = organizationInformationObj;
                    self.invalidOrganizationInfo.city = "";
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .field('data', JSON.stringify(self.invalidOrganizationInfo))
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.organizationInfo.validationErrMessage.city);

                            done();
                        });
                });


                it('should return a message stating validation error - street address is required for empty street address', function(done){
                    var self = this;
                    self.invalidOrganizationInfo = organizationInformationObj;
                    self.invalidOrganizationInfo.streetAddress = "";
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .field('data', JSON.stringify(self.invalidOrganizationInfo))
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.organizationInfo.validationErrMessage.streetAddress);

                            done();
                        });
                });

                it('should return a message stating validation error - organization email is required for empty organization email address', function(done){
                    var self = this;
                    self.invalidOrganizationInfo = organizationInformationObj;
                    self.invalidOrganizationInfo.organizationEmail = "";
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .field('data', JSON.stringify(self.invalidOrganizationInfo))
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.organizationInfo.validationErrMessage.organizationEmail);

                            done();
                        });
                });

                it('should return a message stating validation error - invalid organization email for invalid email address', function(done){
                    var self = this;
                    self.invalidOrganizationInfo = organizationInformationObj;
                    self.invalidOrganizationInfo.organizationEmail = "ewe";
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .field('data', JSON.stringify(self.invalidOrganizationInfo))
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.organizationInfo.validationErrMessage.organizationEmailValid);

                            done();
                        });
                });

                it('should return a message stating validation error - invalid facebook url for invalid facebook url', function(done){
                    var self = this;
                    self.invalidOrganizationInfo = organizationInformationObj;
                    self.invalidOrganizationInfo.facebookURL = "ewe";
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .field('data', JSON.stringify(self.invalidOrganizationInfo))
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.organizationInfo.validationErrMessage.facebookURLValid);

                            done();
                        });
                });

                it('should return a message stating validation error - invalid twitter url for invalid twitter url', function(done){
                    var self = this;
                    self.invalidOrganizationInfo = organizationInformationObj;
                    self.invalidOrganizationInfo.twitterURL = "ewe";
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .field('data', JSON.stringify(self.invalidOrganizationInfo))
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.organizationInfo.validationErrMessage.twitterURLValid);

                            done();
                        });
                });
            });

            describe('postOrganizationInfo()   to save organization information object  with valid access token but without image file', function () {
                it('should return a successfull save message stating organizaiton information saved successfully', function(done){
                    request
                        .post(apiUrl)
                        .set('Accept', 'multipart/form-data')
                        .set('x-access-token', accessToken)
                        .field('data', JSON.stringify(organizationInformationObj))
                        .attach('imageName', imagePathUrl[1])
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.organizationInfo.saveMessage);
                            done();
                        });
                });
            });

            describe('postOrganizationInfo()  to save organization information object   with valid access token after successfully saving organization information setting configuration already.', function () {
                it('should return a message stating that we can only update the existing setting configuration and new data insert is not allowed', function(done){
                    request
                        .post(apiUrl)
                        .set('Accept', 'multipart/form-data')
                        .set('x-access-token', accessToken)
                        .field('data', JSON.stringify(organizationInformationObj))
                        .attach('imageName', imagePathUrl[0])
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.CONFLICT);
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.organizationInfo.alreadyExists);
                            done();
                        });
                });
            });

            describe('getOrganizationInfo()  to retrieve organization information data', function () {
                it('should return a organization information setting object', function(){
                    return request
                        .get(apiUrl)
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .then(function(result) {
                            expect(result.statusCode).to.equal(HTTPStatus.OK);
                            expect(result.body).to.be.an('object');
                            expect(result.body).to.have.property("country");
                            expect(result.body.country).to.equal(organizationInformationObj.country);
                            expect(result.body).to.have.property("city");
                            expect(result.body.city).to.equal(organizationInformationObj.city);
                            return Promise.resolve(result.body);
                        })
                        .then(function(organizationInfoObj){
                            var _organizationInfoId = organizationInfoObj._id;

                            describe('getOrganizationInfoByID() to retrieve organization information object for ID ' + _organizationInfoId, function () {
                                it('should return an organization information setting configuration object', function(done){
                                    request
                                        .get(apiUrl + _organizationInfoId)
                                        .set('Accept', 'application/json')
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(200);
                                            expect(res.body).to.have.property("_id");
                                            expect(res.body._id).to.equal(_organizationInfoId);
                                            expect(res.body).to.have.property("country");
                                            expect(res.body.country).to.equal(organizationInformationObj.country);
                                            expect(res.body).to.have.property("city");
                                            expect(res.body.city).to.equal(organizationInformationObj.city);

                                            done();
                                        });
                                });
                            });

                            describe('updateOrganizationInfo() to update existing organization informaiton for ID ' + _organizationInfoId +' without access token', function () {
                                it('should return a message stating that authentication is failed', function(done){
                                    request
                                        .put(apiUrl + _organizationInfoId)
                                        .set('Accept', 'multipart/form-data')
                                        .field('data', JSON.stringify(organizationInformationObj))
                                        .attach('imageName', imagePathUrl[1])
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

                            describe('updateOrganizationInfo() to update existing organization informaiton  for ID ' + _organizationInfoId +' with access token and valid data', function () {
                                it('should return a successfull update message', function(done){
                                    var self = this;
                                    self.updateOrganizationInfoObj = organizationInformationObj;
                                    self.updateOrganizationInfoObj.city = "Pokhara";
                                    self.updateOrganizationInfoObj.streetAddress = "Lake side";

                                    request
                                        .put(apiUrl + _organizationInfoId)
                                        .set('Accept', 'multipart/form-data')
                                        .set('x-access-token', accessToken)
                                        .field('data', JSON.stringify(self.updateOrganizationInfoObj))
                                        .attach('imageName', imagePathUrl[1])
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.organizationInfo.updateMessage);
                                            done();
                                        });
                                });
                            });

                            describe('updateOrganizationInfo() to update existing organization informaiton   with no country i.e. no city', function () {
                                afterEach(function(){
                                    organizationInformationObj = {
                                        orgName:"Nodebeats",
                                        country: "Nepal",
                                        region:"Bagmati",
                                        state:"",
                                        city: "Lalitpur",
                                        addressLine: "Thaiba",
                                        streetAddress: "Godawari Street",
                                        zipAddress: "977",
                                        postalCode: "44600",
                                        organizationEmail: "shrawanlakhey@gmail.com",
                                        phoneNumber: "977-6666372",
                                        mobileNumber: "977-99999999999",
                                        faxNumber:"",
                                        facebookURL: "https://www.facebook.com",
                                        twitterURL: "",
                                        googlePlusURL: "",
                                        linkedInURL:"",
                                        slogan: "Go forward no matter what"
                                    };
                                });
                                it('should return a message stating validation error - country is required for empty country', function(done){
                                    var self = this;
                                    self.invalidOrganizationInfo = organizationInformationObj;
                                    self.invalidOrganizationInfo.country = "";
                                    request
                                        .put(apiUrl + _organizationInfoId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .field('data', JSON.stringify(self.invalidOrganizationInfo))
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                            expect(res.error).to.have.property('text');
                                            var errObj = JSON.parse(res.error.text);
                                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.organizationInfo.validationErrMessage.country);

                                            done();
                                        });
                                });

                                it('should return a message stating validation error - city is required for empty city', function(done){
                                    var self = this;
                                    self.invalidOrganizationInfo = organizationInformationObj;
                                    self.invalidOrganizationInfo.city = "";
                                    request
                                        .put(apiUrl + _organizationInfoId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .field('data', JSON.stringify(self.invalidOrganizationInfo))
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                            expect(res.error).to.have.property('text');
                                            var errObj = JSON.parse(res.error.text);
                                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.organizationInfo.validationErrMessage.city);

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