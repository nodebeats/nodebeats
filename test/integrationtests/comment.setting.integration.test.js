(function(){
    "use strict";

    var apiMessageConfig = require('../../lib/configs/api.message.config'),
        Promise = require("bluebird"),
        HTTPStatus = require('http-status');

    module.exports = function(expect, request, accessToken) {

        describe('Comment Setting  Integration test', function(){

            this.timeout(4000);
            var apiUrlCommentSetting = '/api/commentsetting/';
            var commentSettingInfo;

            beforeEach(function () {
                commentSettingInfo = {
                    disqusUsername : "shrawan",
                    disqusURL : "disqus-shrawan.com",
                    disqusApiKey : "dfaskoiew5684ewr564fds465a48ew987rwe97rew5f6s4d5sd"
                };

            });

            describe('getCommentSetting() to retrieve  comment setting object', function () {
                it('should return an empty object for the first time', function(done){
                    request
                        .get(apiUrlCommentSetting)
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.NOT_FOUND);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.commentSetting.notFoundCommentSetting);
                            done();
                        });
                });
            });

            describe('postCommentSetting() to save  comment setting info without access tokens', function () {
                it('should return a message stating that authentication is failed', function(done){
                    request
                        .post(apiUrlCommentSetting)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .send(commentSettingInfo)
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

            describe('postCommentSetting() to save  comment setting info with access tokens', function () {
                it('should return a successfull message stating  comment setting saved successfully', function(done){
                    request
                        .post(apiUrlCommentSetting)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .send(commentSettingInfo)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.commentSetting.saveMessageCommentSetting);
                            done();
                        });
                });
            });

            describe('postCommentSetting() to save  comment setting info with access tokens for the second time after already successfully saving comment setting information', function () {
                it('should return a warning message stating once data is inserted, insertion is not allowed again. Only update of existing data is possible.', function(done){
                    request
                        .post(apiUrlCommentSetting)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .send(commentSettingInfo)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.CONFLICT);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.commentSetting.alreadyExistsCommentSetting);
                            done();
                        });
                });
            });

            describe('postCommentSetting() to save  comment setting info with access tokens but without disqus URL field', function () {
                it('should return a warning message stating  that disqus URL field is required', function(done){
                    var self = this;
                    self.invalidCommentSettingObj = commentSettingInfo;
                    self.invalidCommentSettingObj.disqusURL = "";

                    request
                        .post(apiUrlCommentSetting)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .send(self.invalidCommentSettingObj)
                        .expect('Content-Type', /json/)
                        .then(function(res) {

                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.commentSetting.fieldRequiredCommentSettingDisqusURL);
                            done();
                        });
                });
            });


            describe('getCommentSetting() to retrieve  comment setting object after saving data', function () {
                it('should return an object containing  comment setting data', function(){
                    return request
                        .get(apiUrlCommentSetting)
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.not.be.empty;
                            return Promise.resolve(res.body);
                        })
                        .then(function (commentSettingObj) {
                            var _commentSettingUrl = commentSettingObj.disqusURL
                            var _commentSettingId = commentSettingObj._id;

                            describe('getCommentSettingByID() to retrieve  comment setting object for setting ID ' + _commentSettingId + ' without access token', function () {
                                it('should return a message stating that authentication is failed', function(done){
                                    request
                                        .get(apiUrlCommentSetting + _commentSettingId)
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

                            describe('getCommentSettingByID() to retrieve  comment setting object for setting ID ' + _commentSettingId, function () {
                                it('should return a  comment setting information object', function(done){
                                    request
                                        .get(apiUrlCommentSetting + _commentSettingId)
                                        .set('Accept', 'application/json')
                                        .set('x-access-token', accessToken)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("_id");
                                            expect(res.body._id).to.equal(_commentSettingId);
                                            expect(res.body).to.have.property("disqusURL");
                                            expect(res.body.disqusURL).to.equal(_commentSettingUrl);
                                            done();
                                        });
                                });
                            });

                            describe('updateCommentSetting() to update existing  comment setting object without access token ', function () {
                                it('should return a message stating that authentication is failed', function(done){
                                    request
                                        .put(apiUrlCommentSetting + _commentSettingId)
                                        .set('Accept', 'application/json')
                                        .send(commentSettingInfo)
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

                            describe('updateCommentSetting() to update existing  comment setting object with access token ', function () {
                                it('should return a successfull update message stating that  comment setting information is updated successfully', function(done){
                                    var self = this;
                                    self.validBlogCommentSettingObj = commentSettingInfo;
                                    self.validBlogCommentSettingObj.disqusURL = "hello-disqus.com";

                                    request
                                        .put(apiUrlCommentSetting + _commentSettingId)
                                        .set('Accept', 'application/json')
                                        .set('x-access-token', accessToken)
                                        .send(self.validBlogCommentSettingObj)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.commentSetting.updateMessageCommentSetting);

                                            done();
                                        });
                                });
                            });

                            describe('getCommentSettingByID() to retrieve  comment setting object for setting ID ' + _commentSettingId + ' after update operation with different disqus URL', function () {
                                it('should return a  comment setting information object with different disqus URL', function(done){
                                    request
                                        .get(apiUrlCommentSetting + _commentSettingId)
                                        .set('Accept', 'application/json')
                                        .set('x-access-token', accessToken)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("_id");
                                            expect(res.body._id).to.equal(_commentSettingId);
                                            expect(res.body).to.have.property("disqusURL");
                                            expect(res.body.disqusURL).to.not.equal(_commentSettingUrl);
                                            done();
                                        });
                                });
                            });

                            describe('updateCommentSetting() to update existing  comment setting object with access token but without disqus url', function () {
                                it('should return a warning update message stating that disqus URL is required', function(done){
                                    var self = this;
                                    self.invalidCommentSettingObj = commentSettingInfo;
                                    self.invalidCommentSettingObj.disqusURL = "";

                                    request
                                        .put(apiUrlCommentSetting + _commentSettingId)
                                        .set('Accept', 'application/json')
                                        .set('x-access-token', accessToken)
                                        .send(self.invalidCommentSettingObj)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.commentSetting.fieldRequiredCommentSettingDisqusURL);
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