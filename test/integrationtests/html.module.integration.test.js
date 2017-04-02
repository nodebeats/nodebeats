(function(){
    "use strict";

    var apiMessageConfig = require('../../lib/configs/api.message.config'),
        Promise = require("bluebird"),
        HTTPStatus = require('http-status');
    
    module.exports = function(expect, request, accessToken) {

        describe('HTML Content Module Integration test', function(){

            this.timeout(4000);
            var apiUrl = '/api/htmlcontent/';
           
            var htmlContentInfo;
            beforeEach(function () {
                htmlContentInfo = {
                    htmlContentTitle : "this is content title",
                    htmlModuleContent : "oh yeah this is html module content",
                    active : true
                };
            });

            describe('getAllHtmlModuleContents() to retrieve list of html contents', function () {
                it('should return an empty list i.e. no html content', function(done){
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

            describe('postHtmlContent() to save html content without access token', function () {
                it('should return a message stating that authentication is failed', function(done){
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .send(htmlContentInfo)
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

            describe('postHtmlContent()  to save html content ', function(){
                describe('with access tokens ', function () {
                    it('should return a success message stating html content saved successfully', function(done){
                        request
                            .post(apiUrl)
                            .set('Accept', 'application/x-www-form-urlencoded')
                            .set('x-access-token', accessToken)
                            .send(htmlContentInfo)
                            .expect('Content-Type', /json/)
                            .then(function(res) {
                                expect(res.statusCode).to.equal(HTTPStatus.OK);
                                expect(res.body).to.be.an('object');
                                expect(res.body).to.have.property("message");
                                expect(res.body.message).to.equal(apiMessageConfig.htmlModule.saveMessage);
                                done();
                            });
                    });
                });

                describe('with access token and same title for checking duplicacy', function () {
                    it('should return a message stating that html content with same title already exists.', function(done){
                        request
                            .post(apiUrl)
                            .set('Accept', 'application/x-www-form-urlencoded')
                            .set('x-access-token', accessToken)
                            .send(htmlContentInfo)
                            .expect('Content-Type', /json/)
                            .then(function(res) {
                                expect(res.statusCode).to.equal(HTTPStatus.CONFLICT);
                                expect(res.body).to.be.an('object');
                                expect(res.body).to.have.property("message");
                                expect(res.body.message).to.equal(apiMessageConfig.htmlModule.alreadyExists);
                                done();
                            });
                    });
                });

                describe('with access token and same title but with different letter case for checking duplicacy', function () {
                    it('should return a message stating that html content with same title already exists.', function(done){
                        var self = this;
                        self.validHtmlContentObj = htmlContentInfo;
                        self.validHtmlContentObj.htmlContentTitle = "THIS is content title";

                        request
                            .post(apiUrl)
                            .set('Accept', 'application/x-www-form-urlencoded')
                            .set('x-access-token', accessToken)
                            .send(self.validHtmlContentObj)
                            .expect('Content-Type', /json/)
                            .then(function(res) {
                                expect(res.statusCode).to.equal(HTTPStatus.CONFLICT);
                                expect(res.body).to.be.an('object');
                                expect(res.body).to.have.property("message");
                                expect(res.body.message).to.equal(apiMessageConfig.htmlModule.alreadyExists);
                                done();
                            });
                    });
                });

                describe('with invalid data i.e. no html Content Title and no html Module content', function () {
                    afterEach(function(){
                        htmlContentInfo = {
                            htmlContentTitle : "this is content title",
                            htmlModuleContent : "oh yeah this is html module content",
                            active : true
                        };
                    });

                    it('should return a message stating validation error- html content title is required for empty html content title', function(done){
                        var self = this;
                        self.invalidHtmlContentObj = htmlContentInfo;
                        self.invalidHtmlContentObj.htmlContentTitle = "";
                        request
                            .post(apiUrl)
                            .set('Accept', 'application/x-www-form-urlencoded')
                            .set('x-access-token', accessToken)
                            .send(self.invalidHtmlContentObj)
                            .expect('Content-Type', /json/)
                            .then(function(res) {
                                expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                expect(res.error).to.have.property('text');
                                var errObj = JSON.parse(res.error.text);
                                expect(errObj.message[0].msg).to.have.string(apiMessageConfig.htmlModule.validationErrMessage.htmlContentTitle);
                                done();
                            });
                    });

                    it('should return a message stating validation error- html module content description is required for empty html content detail', function(done){
                        var self = this;
                        self.invalidHtmlContentObj = htmlContentInfo;
                        self.invalidHtmlContentObj.htmlModuleContent = "";
                        request
                            .post(apiUrl)
                            .set('Accept', 'application/x-www-form-urlencoded')
                            .set('x-access-token', accessToken)
                            .send(self.invalidHtmlContentObj)
                            .expect('Content-Type', /json/)
                            .then(function(res) {
                                expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                expect(res.error).to.have.property('text');
                                var errObj = JSON.parse(res.error.text);
                                expect(errObj.message[0].msg).to.have.string(apiMessageConfig.htmlModule.validationErrMessage.htmlModuleContent);
                                done();
                            });
                    });
                });
            });

            describe('getAllHtmlModuleContents() to retrieve a list of html contents', function () {
                it('should return a list of html contents', function(){
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
                        .then(function(resultHtmlContentObj){
                            var _htmlContentId = resultHtmlContentObj._id;
                            var _contentTitle = resultHtmlContentObj.htmlContentTitle;

                            describe('getHtmlContentByID() to retrieve html content object for ID ' + _htmlContentId, function () {
                                it('should return a html content object' , function(done){
                                    request
                                        .get(apiUrl + _htmlContentId)
                                        .set('Accept', 'application/json')
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("_id");
                                            expect(res.body._id).to.equal(_htmlContentId);
                                            expect(res.body).to.have.property("htmlContentTitle");
                                            expect(res.body.htmlContentTitle).to.equal(_contentTitle);
                                            done();
                                        });
                                });
                            });

                            describe('updateHtmlContent() to update existing html content data for ID ' + _htmlContentId, function(){

                                afterEach(function(){
                                    htmlContentInfo = {
                                        htmlContentTitle : "this is content title",
                                        htmlModuleContent : "oh yeah this is html module content",
                                        active : true
                                    };
                                });

                                describe('without access tokens', function () {
                                    it('should return a message stating that authentication is failed', function(done){
                                        request
                                            .put(apiUrl + _htmlContentId)
                                            .set('Accept', 'application/x-www-form-urlencoded')
                                            .send(htmlContentInfo)
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
                                    it('should return a successfull update message', function (done) {
                                        var self = this;
                                        self.validHtmlContentObj = htmlContentInfo;
                                        self.validHtmlContentObj.htmlContentTitle = "title number 2";
                                        self.validHtmlContentObj.htmlModuleContent = "content here it is";

                                        request
                                            .put(apiUrl + _htmlContentId)
                                            .set('Accept', 'application/x-www-form-urlencoded')
                                            .set('x-access-token', accessToken)
                                            .send( self.validHtmlContentObj )
                                            .expect('Content-Type', /json/)
                                            .then(function (res) {
                                                expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                expect(res.body).to.be.an('object');
                                                expect(res.body).to.have.property("message");
                                                expect(res.body.message).to.equal(apiMessageConfig.htmlModule.updateMessage);
                                                done();
                                            });
                                    });
                                });

                                describe('with invalid data i.e. no html Content Title and no html Module content', function () {
                                    afterEach(function(){
                                        htmlContentInfo = {
                                            htmlContentTitle : "this is content title",
                                            htmlModuleContent : "oh yeah this is html module content",
                                            active : true
                                        };
                                    });

                                    it('should return a message stating validation error- html content title is required for empty html content title', function(done){
                                        var self = this;
                                        self.invalidHtmlContentObj = htmlContentInfo;
                                        self.invalidHtmlContentObj.htmlContentTitle = "";
                                        request
                                            .put(apiUrl + _htmlContentId)
                                            .set('Accept', 'application/x-www-form-urlencoded')
                                            .set('x-access-token', accessToken)
                                            .send(self.invalidHtmlContentObj)
                                            .expect('Content-Type', /json/)
                                            .then(function(res) {
                                                expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                                expect(res.error).to.have.property('text');
                                                var errObj = JSON.parse(res.error.text);
                                                expect(errObj.message[0].msg).to.have.string(apiMessageConfig.htmlModule.validationErrMessage.htmlContentTitle);
                                                done();
                                            });
                                    });

                                    it('should return a message stating validation error- html module content description is required for empty html module content', function(done){
                                        var self = this;
                                        self.invalidHtmlContentObj = htmlContentInfo;
                                        self.invalidHtmlContentObj.htmlModuleContent = "";
                                        request
                                            .put(apiUrl + _htmlContentId)
                                            .set('Accept', 'application/x-www-form-urlencoded')
                                            .set('x-access-token', accessToken)
                                            .send(self.invalidHtmlContentObj)
                                            .expect('Content-Type', /json/)
                                            .then(function(res) {
                                                expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                                expect(res.error).to.have.property('text');
                                                var errObj = JSON.parse(res.error.text);
                                                expect(errObj.message[0].msg).to.have.string(apiMessageConfig.htmlModule.validationErrMessage.htmlModuleContent);
                                                done();
                                            });
                                    });
                                });
                            });

                            describe('patchHtmlContent() to delete html content for ID ' + _htmlContentId, function () {
                                describe('without access tokens', function () {
                                    it('should return a message stating that authentication is failed', function (done) {
                                        request
                                            .patch(apiUrl + _htmlContentId)
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
                                    it('should return a successfull delete message stating html content deleted successfully', function(){
                                        return request
                                            .patch(apiUrl + _htmlContentId)
                                            .set('Accept', 'application/x-www-form-urlencoded')
                                            .set('x-access-token', accessToken)
                                            .expect('Content-Type', /json/)
                                            .then(function(res) {
                                                expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                expect(res.body).to.be.an('object');
                                                expect(res.body).to.have.property("message");
                                                expect(res.body.message).to.equal(apiMessageConfig.htmlModule.deleteMessage);
                                                Promise.resolve();
                                            })
                                            .then(function(){
                                                describe('getAllHtmlModuleContents() to retrieve html content  after record deletion', function () {
                                                    it('should not return an html content list i.e. empty response', function(done){
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