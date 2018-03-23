(function(){
    "use strict";

    var apiMessageConfig = require('../../lib/configs/api.message.config'),
        Promise = require("bluebird"),
        HTTPStatus = require('http-status');

    module.exports = function(expect, request, imagePathUrl, accessToken) {

        describe('Partner Integration test', function(){

            this.timeout(4000);

            var apiUrlPartner = '/api/partner/';
            var partnerInfo;

            beforeEach(function () {

                partnerInfo = {
                    partnerName : "Bitsbeat IT Solution",
                    linkURL : "http://www.bitsbeat.com",
                    imageAltText : "Bitsbeat IT Solution, an innovative Information Technology Company",
                    active : true
                };
            });

            describe('getPartners() to retrieve partners list', function () {
                it('should return an empty list of partners', function(done){
                    request
                        .get(apiUrlPartner)
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

            describe('postPartnerInfo() to save partner information without access tokens', function () {
                it('should return a message stating that authentication is failed', function(done){
                    request
                        .post(apiUrlPartner)
                        .set('Accept', 'multipart/form-data')
                        .field('data', JSON.stringify(partnerInfo))
                        .attach('imageName', imagePathUrl[0])
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

            describe('postPartnerInfo() to save  partner information with access tokens and image file', function () {
                it('should return a successfull save message stating that Partner info saved successfully', function(done){
                    request
                        .post(apiUrlPartner)
                        .set('Accept', 'multipart/form-data')
                        .set('x-access-token', accessToken)
                        .field('data', JSON.stringify(partnerInfo))
                        .attach('imageName', imagePathUrl[0])
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.partner.saveMessage);
                            done();
                        });
                });
            });

            describe('postPartnerInfo() to save  partner information with access tokens but without image file', function () {
                it('should return a validation error message stating that Please upload partner logo image', function(done){
                    request
                        .post(apiUrlPartner)
                        .set('Accept', 'multipart/form-data')
                        .set('x-access-token', accessToken)
                        .field('data', JSON.stringify(partnerInfo))
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.partner.fieldRequiredImage);
                            done();
                        });
                });
            });

            describe('postPartnerInfo() to save  partner information with access tokens and image file but with same link url', function () {
                it('should return a duplication error  message stating that Partner with same web url already exists', function(done){
                    request
                        .post(apiUrlPartner)
                        .set('Accept', 'multipart/form-data')
                        .set('x-access-token', accessToken)
                        .field('data', JSON.stringify(partnerInfo))
                        .attach('imageName', imagePathUrl[0])
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.CONFLICT);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.partner.alreadyExists);
                            done();
                        });
                });
            });

            describe('postPartnerInfo() to save  partner information with access tokens but  with invalid data i.e. no partnerName, no linkUrl,  or invalid linkURL', function () {

                partnerInfo = {
                    partnerName : "Bitsbeat IT Solution",
                    linkURL : "http://www.bitsbeat.com",
                    imageAltText : "Bitsbeat IT Solution, an innovative Information Technology Company",
                    active : true
                };
                it('should return a message stating validation error- Partner Name is required for empty partner name', function(done){
                    var self = this;
                    self.invalidPartnerObj = partnerInfo;
                    self.invalidPartnerObj.partnerName = "";
                    request
                        .post(apiUrlPartner)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .field('data', JSON.stringify(self.invalidPartnerObj))
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.partner.validationErrMessage.partnerName);
                            done();
                        });
                });

                it('should return a message stating validation error- Web URL associate with the partner is required  for empty link URL', function(done){
                    var self = this;
                    self.invalidPartnerObj = partnerInfo;
                    self.invalidPartnerObj.linkURL = "";
                    request
                        .post(apiUrlPartner)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .field('data', JSON.stringify(self.invalidPartnerObj))
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.partner.validationErrMessage.linkURL);
                            done();
                        });
                });

                it('should return a message stating validation error - Web URL should be a valid url  for invalid link URL', function(done){
                    var self = this;
                    self.invalidPartnerObj = partnerInfo;
                    self.invalidPartnerObj.linkURL = "fdasfdsa32";
                    request
                        .post(apiUrlPartner)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .field('data', JSON.stringify(self.invalidPartnerObj))
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.partner.validationErrMessage.webURLValid);
                            done();
                        });
                });
            });

            describe('getPartners() to retrieve a list of partners', function () {
                it('should return a list of partners', function(){
                    return request
                        .get(apiUrlPartner)
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                            expect(res.body).to.have.property("dataList");
                            expect(res.body.dataList).to.be.instanceof(Array);
                            expect(res.body.dataList).to.have.length.of.at.least(1);
                            expect(res.body).to.have.property("totalItems");
                            expect(res.body.totalItems).to.equal(1);
                            return Promise.resolve(res.body.dataList[0]);
                        })
                        .then(function(partnerObj){

                            var _partnerId = partnerObj._id;
                            var _partnerName = partnerObj.partnerName;

                            describe('getPartnerById() to retrieve partner information object for ID ' + _partnerId, function () {
                                it('should return a partner information object', function(done){
                                    request
                                        .get(apiUrlPartner + _partnerId)
                                        .set('Accept', 'application/json')
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("_id");
                                            expect(res.body._id).to.equal(_partnerId);
                                            expect(res.body).to.have.property("partnerName");
                                            expect(res.body.partnerName).to.equal(_partnerName);
                                            done();
                                        });
                                });
                            });



                            describe('updatePartnerInfo() to update existing partner information object for ID ' + _partnerId +' without access tokens', function () {
                                it('should return a message stating that authentication is failed', function(done){
                                    request
                                        .put(apiUrlPartner + _partnerId)
                                        .set('Accept', 'multipart/form-data')
                                        .field('data', JSON.stringify(partnerInfo))
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

                            describe('updatePartnerInfo()  to update existing partner information object for ID ' + _partnerId +' with access token and image file', function () {
                                it('should return a successfull update message stating that Partner info updated successfully', function(done){
                                    var self = this;
                                    self.validPartnerObj = partnerInfo;
                                    self.validPartnerObj.partnerName = "Nodebeats CMS";
                                    self.validPartnerObj.linkURL = "http://www.nodebeats.com";
                                    self.validPartnerObj.imageAltText = "Nodebeats, An Open Source Content Management System built using MEAN Framework";
                                    self.validPartnerObj.active = false;

                                    request
                                        .put(apiUrlPartner + _partnerId)
                                        .set('Accept', 'multipart/form-data')
                                        .set('x-access-token', accessToken)
                                        .field('data', JSON.stringify(self.validPartnerObj))
                                        .attach('imageName', imagePathUrl[1])
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.partner.updateMessage);
                                            done();
                                        });
                                });
                            });



                            describe('updatePartnerInfo()  to update existing partner information object for ID ' + _partnerId +' with access token but without image file', function () {
                                it('should return a validation error message stating that Please upload partner logo image', function(done){
                                    var self = this;
                                    self.validPartnerObj = partnerInfo;
                                    self.validPartnerObj.partnerName = "Hello Partner";

                                    request
                                        .put(apiUrlPartner + _partnerId)
                                        .query('imagedeleted=true')
                                        .set('Accept', 'multipart/form-data')
                                        .set('x-access-token', accessToken)
                                        .field('data', JSON.stringify(self.validPartnerObj))
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.partner.fieldRequiredImage);
                                            done();
                                        });
                                });
                            });

                            describe('postPartnerInfo() to save  partner information with access tokens and image file to check for duplicacy when updating', function () {
                                it('should return a successfull save message stating that Partner info saved successfully', function(done){
                                    partnerInfo = {
                                        partnerName : "Bitsbeat IT Solution",
                                        linkURL : "http://www.bitsbeat.com",
                                        imageAltText : "Bitsbeat IT Solution, an innovative Information Technology Company",
                                        active : true
                                    };

                                    request
                                        .post(apiUrlPartner)
                                        .set('Accept', 'multipart/form-data')
                                        .set('x-access-token', accessToken)
                                        .field('data', JSON.stringify(partnerInfo))
                                        .attach('imageName', imagePathUrl[0])
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.partner.saveMessage);
                                            done();
                                        });
                                });
                            });

                            describe('updatePartnerInfo()  to update existing partner information object for ID ' + _partnerId +' with access token and with image file but with already saved link URL', function () {
                                it('should return a validation error  message stating that Partner with same web url already exists', function(done){
                                    var self = this;
                                    self.invalidPartnerObj = partnerInfo;
                                    self.invalidPartnerObj.linkURL = "http://www.bitsbeat.com";

                                    request
                                        .put(apiUrlPartner + _partnerId)
                                        .set('Accept', 'multipart/form-data')
                                        .set('x-access-token', accessToken)
                                        .field('data', JSON.stringify(partnerInfo))
                                        .attach('imageName', imagePathUrl[1])
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.CONFLICT);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.partner.alreadyExists);
                                            done();
                                        });
                                });
                            });

                            describe('updatePartnerInfo()  to update existing partner information object with invalid data i.e. no partner Name, no link URL,  or invalid link URL', function () {

                                afterEach(function () {
                                    partnerInfo = {
                                        partnerName : "Bitsbeat IT Solution",
                                        linkURL : "http://www.bitsbeat.com",
                                        imageAltText : "Bitsbeat IT Solution, an innovative Information Technology Company",
                                        active : true
                                    };
                                });

                                it('should return a message stating validation error with different error messages for empty fields', function(done){
                                    var self = this;
                                    self.invalidPartnerObj = partnerInfo;
                                    self.invalidPartnerObj.partnerName = "";
                                    self.invalidPartnerObj.linkURL = "";
                                    request
                                        .put(apiUrlPartner + _partnerId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .field('data', JSON.stringify(self.invalidPartnerObj))
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                            expect(res.error).to.have.property('text');
                                            var errObj = JSON.parse(res.error.text);
                                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.partner.validationErrMessage.partnerName);
                                            expect(errObj.message[1].msg).to.have.string(apiMessageConfig.partner.validationErrMessage.linkURL);

                                            done();
                                        });
                                });

                                it('should return a message stating validation error - link URL is not valid for invalid Link URL', function(done){
                                    var self = this;
                                    self.invalidPartnerObj = partnerInfo;
                                    self.invalidPartnerObj.linkURL = "fdsafsda3";
                                    request
                                        .put(apiUrlPartner + _partnerId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .field('data', JSON.stringify(self.invalidPartnerObj))
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                            expect(res.error).to.have.property('text');
                                            var errObj = JSON.parse(res.error.text);
                                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.partner.validationErrMessage.webURLValid);
                                            done();
                                        });
                                });
                            });

                            describe('getPartners() to retrieve a list of partners', function () {
                                it('should return a list of partners with only active bit true', function(done){
                                    request
                                        .get(apiUrlPartner)
                                        .query('active=true')
                                        .set('Accept', 'application/json')
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.have.property("dataList");
                                            expect(res.body.dataList).to.be.instanceof(Array);
                                            expect(res.body.dataList).to.have.length.below(2);
                                            expect(res.body).to.have.property("totalItems");
                                            expect(res.body.totalItems).to.equal(1);
                                            done();
                                        });
                                });
                            });

                            describe('deletePartnerInfo() to delete partner Information for ID ' + _partnerId +'  without access tokens ', function () {
                                it('should return a message stating that authentication is failed', function(done){

                                    request
                                        .patch(apiUrlPartner + _partnerId)
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

                            describe('deletePartnerInfo()  to delete partner Information  for ID ' + _partnerId + ' with access token', function () {
                                it('should return a successfull delete message stating that Partner info deleted successfully', function(){

                                    return request
                                        .patch(apiUrlPartner + _partnerId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.partner.deleteMessage);
                                            return Promise.resolve();
                                        })
                                        .then(function () {
                                            describe('getPartners() to retrieve a list of partners', function () {
                                                it('should return a list of partners with deleted bit set to false', function(done){
                                                    request
                                                        .get(apiUrlPartner)
                                                        .set('Accept', 'application/json')
                                                        .expect('Content-Type', /json/)
                                                        .then(function(res) {
                                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                            expect(res.body).to.have.property("dataList");
                                                            expect(res.body.dataList).to.be.instanceof(Array);
                                                            expect(res.body.dataList).to.have.length.below(2);
                                                            expect(res.body).to.have.property("totalItems");
                                                            expect(res.body.totalItems).to.equal(1);
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