(function(){
    "use strict";

    var apiMessageConfig = require('../../lib/configs/api.message.config'),
        Promise = require("bluebird"),
        HTTPStatus = require('http-status');

    module.exports = function(expect, request, accessToken) {

        describe('API Access Management Integration test', function(){

            this.timeout(4000);

            var apiAccessUrl = '/api/access/';
            var apiAccessInfo;

            beforeEach(function () {

                apiAccessInfo = {
                    routeApi : "/api/news",
                    roleName : "moderator",
                    active : true
                };
            });

            describe('getApiAccess() to retrieve API Access list without access token', function () {
                it('should return a message stating that authentication is failed', function(done){
                    request
                        .get(apiAccessUrl)
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

            describe('postApiAccessInfo() to save API Access management information without access tokens', function () {
                it('should return a message stating that authentication is failed', function(done){
                    request
                        .post(apiAccessUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .send(apiAccessInfo)
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

            describe('postApiAccessInfo() to save  API Access management information with access token', function () {
                it('should return a successfull save message stating that Route api for api access management saved successfully', function(done){
                    request
                        .post(apiAccessUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .send(apiAccessInfo)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.apiAccess.saveMessage);
                            done();
                        });
                });
            });

            describe('postApiAccessInfo() to save  API Access management information with access token but with same api URL', function () {
                it('should return a duplication error  message stating that Route api with same api route already exists', function(done){

                    request
                        .post(apiAccessUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .send(apiAccessInfo)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.CONFLICT);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.apiAccess.alreadyExists);
                            done();
                        });
                });
            });

            describe('postApiAccessInfo() to save  API Access management  information with access tokens but without routeAPi and roleName', function () {

                beforeEach(function () {
                    apiAccessInfo = {
                        routeApi : "/api/news",
                        roleName : "moderator",
                        active : true
                    };
                });

                it('should return a validation error message stating that routeApi is required for empty api Route', function(done){
                    var self = this;
                    self.invalidApiAccessObj = apiAccessInfo;
                    self.invalidApiAccessObj.routeApi = "";

                    request
                        .post(apiAccessUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .send(self.invalidApiAccessObj)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.apiAccess.validationErrMessage.routeApi);
                            done();
                        });
                });

                it('should return a validation error message stating that role Name is required for emtpy role title', function(done){
                    var self = this;
                    self.invalidApiAccessObj = apiAccessInfo;
                    self.invalidApiAccessObj.roleName = "";

                    request
                        .post(apiAccessUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .send(self.invalidApiAccessObj)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.apiAccess.validationErrMessage.roleName);
                            done();
                        });
                });
            });

            describe('getApiAccess() to retrieve API Access list with access token', function () {
                it('should return a list of route Apis which are to be allowed only for users with certain roles', function(){

                    return request
                        .get(apiAccessUrl)
                        .set('Accept', 'application/json')
                        .set('x-access-token', accessToken)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                            expect(res.body).to.be.instanceof(Array);
                            expect(res.body).to.have.length.of.at.least(1);
                            return Promise.resolve(res.body[0]);
                        })
                        .then(function(apiRouteAccessObj){

                            var _apiRouteAccessId = apiRouteAccessObj._id;
                            var _apiAccessRoute = apiRouteAccessObj.routeApi;

                            describe('getApiAccessById() to retrieve api route access information object for ID ' + _apiRouteAccessId + ' without access token', function () {
                                it('should return a message stating that authentication is failed', function(done){
                                    request
                                        .get(apiAccessUrl + _apiRouteAccessId)
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

                            describe('getApiAccessById() to retrieve api route access information object for ID ' + _apiRouteAccessId + ' with access token', function () {
                                it('should return an object containing route api access data', function(done){
                                    request
                                        .get(apiAccessUrl + _apiRouteAccessId)
                                        .set('Accept', 'application/json')
                                        .set('x-access-token', accessToken)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("_id");
                                            expect(res.body._id).to.equal(_apiRouteAccessId);
                                            expect(res.body).to.have.property("routeApi");
                                            expect(res.body.routeApi).to.equal(_apiAccessRoute);
                                            done();
                                        });
                                });
                            });

                            describe('updateApiAccessInfo() to update existing route API Access information object for ID ' + _apiRouteAccessId +' without access tokens', function () {
                                it('should return a message stating that authentication is failed', function(done){
                                    request
                                        .put(apiAccessUrl + _apiRouteAccessId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .send(apiAccessInfo)
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

                            describe('updateApiAccessInfo()  to update existing route API Access information object for ID ' + _apiRouteAccessId +' with access token', function () {
                                it('should return a successfull update message stating that Route api for api access management updated successfully', function(done){
                                    var self = this;
                                    self.validApiRouteAccessObj = apiAccessInfo;
                                    self.validApiRouteAccessObj.routeApi = "/api/partner";
                                    self.validApiRouteAccessObj.roleName = "tester";
                                    self.validApiRouteAccessObj.active = false;

                                    request
                                        .put(apiAccessUrl + _apiRouteAccessId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .send(self.validApiRouteAccessObj)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.apiAccess.updateMessage);
                                            done();
                                        });
                                });
                            });



                            describe('updateApiAccessInfo()  to update existing route API Access information object for ID ' + _apiRouteAccessId +' with access token but without route API and role Name', function () {
                                it('should return a validation error message stating that Route api and Role title is required', function(done){
                                    var self = this;
                                    self.invalidApiAccessObj = apiAccessInfo;
                                    self.invalidApiAccessObj.routeApi = "";
                                    self.invalidApiAccessObj.roleName = "";

                                    request
                                        .put(apiAccessUrl + _apiRouteAccessId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .send(self.invalidApiAccessObj)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                            expect(res.error).to.have.property('text');
                                            var errObj = JSON.parse(res.error.text);
                                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.apiAccess.validationErrMessage.routeApi);
                                            expect(errObj.message[1].msg).to.have.string(apiMessageConfig.apiAccess.validationErrMessage.roleName);
                                            done();
                                        });
                                });
                            });

                            describe('postApiAccessInfo() to save  API Access management information with access token and different api route', function () {
                                it('should return a successfull save message stating that Route api for api access management saved successfully', function(done){
                                    var self = this;
                                    self.validApiAccessObj = apiAccessInfo;
                                    self.validApiAccessObj.routeApi = "/api/team";
                                    self.validApiAccessObj.roleName = "approver";
                                    request
                                        .post(apiAccessUrl)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .send(apiAccessInfo)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.apiAccess.saveMessage);
                                            done();
                                        });
                                });
                            });

                            describe('updateApiAccessInfo()  to update existing route API Access information object for ID ' + _apiRouteAccessId +' with access token but with already saved route API', function () {
                                it('should return a duplication error  message stating that Route api with same api route already exists', function(done){
                                    var self = this;
                                    self.invalidApiAccessObj = apiAccessInfo;
                                    self.invalidApiAccessObj.routeApi = "/api/team";

                                    request
                                        .put(apiAccessUrl + _apiRouteAccessId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .send(self.invalidApiAccessObj)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.CONFLICT);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.apiAccess.alreadyExists);
                                            done();
                                        });
                                });
                            });

                            describe('getApiAccess() to retrieve only active API route Access list with access token', function () {
                                it('should return an active list of route Apis which are to be allowed only for users with certain roles', function(done){

                                    request
                                        .get(apiAccessUrl)
                                        .query('active=true')
                                        .set('Accept', 'application/json')
                                        .set('x-access-token', accessToken)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.instanceof(Array);
                                            expect(res.body).to.have.length.below(2);
                                            done();
                                        })
                                });
                            });

                            describe('deleteApiAccessInfo() to delete route API Access information for ID ' + _apiRouteAccessId +'  without access tokens ', function () {
                                it('should return a message stating that authentication is failed', function(done){

                                    request
                                        .patch(apiAccessUrl + _apiRouteAccessId)
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

                            describe('deleteApiAccessInfo()  to delete route API Access information  for ID ' + _apiRouteAccessId + ' with access token', function () {
                                it('should return a successfull delete message stating that Route api for api access management deleted successfully', function(){

                                    return request
                                        .patch(apiAccessUrl + _apiRouteAccessId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.apiAccess.deleteMessage);
                                            return Promise.resolve();
                                        })
                                        .then(function () {
                                            describe('getApiAccess() to retrieve API route Access list with access token and deleted bit set to false', function () {
                                                it('should return only undeleted list of route Apis which are to be allowed only for users with certain roles', function(done){

                                                    request
                                                        .get(apiAccessUrl)
                                                        .set('Accept', 'application/json')
                                                        .set('x-access-token', accessToken)
                                                        .expect('Content-Type', /json/)
                                                        .then(function(res) {
                                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                            expect(res.body).to.be.instanceof(Array);
                                                            expect(res.body).to.have.lengthOf(1);
                                                            done();
                                                        })
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