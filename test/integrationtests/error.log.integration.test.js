(function(){
    "use strict";

    var apiMessageConfig = require('../../lib/configs/api.message.config'),
        HTTPStatus = require('http-status');

    module.exports = function(expect, request, accessToken) {
        describe('Error logs Integration test', function(){

            this.timeout(6000);
            var apiUrlErrorLogs = '/api/error/';
            var apiUrlErrorDeleteLogs = '/api/errordeleteall/';
            var apiUrlErrorNotifyLogs = '/api/log/notify/error/';


            describe('getErrorLogs() to retrieve error log list without access token ', function () {
                it('should return a message stating that authentication is failed', function(done){
                    request
                        .get(apiUrlErrorLogs)
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

            describe('getErrorLogs() to retrieve error log list with access token ', function () {
                it('should return a list of error logs', function(done){
                    request
                        .get(apiUrlErrorLogs)
                        .set('Accept', 'application/json')
                        .set('x-access-token', accessToken)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                            expect(res.body).to.have.property("dataList");
                            expect(res.body.dataList).to.be.empty;
                            expect(res.body).to.have.property("totalItems");
                            expect(res.body.totalItems).to.equal(0);
                            done();
                        });
                });
            });

            describe('deleteErrorLog() to delete all the error logs without access token ', function () {
                it('should return a message stating that authentication is failed', function(done){
                    request
                        .put(apiUrlErrorDeleteLogs)
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

            describe('deleteErrorLog() to delete all the error logs without access token ', function () {
                it('should return a message stating that error logs are deleted successfully', function(done){
                    request
                        .put(apiUrlErrorDeleteLogs)
                        .set('Accept', 'application/json')
                        .set('x-access-token', accessToken)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.errorLog.deleteMessage);
                            done();
                        });
                });
            });

            describe('sendNotificationEmailToSolveErrors() to send notification emails about errors logs to the development team  without access token', function () {
                it('should return a message stating that authentication is failed', function(done){
                    request
                        .put(apiUrlErrorNotifyLogs)
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

            describe('sendNotificationEmailToSolveErrors() to send notification emails about errors logs to the development team    with access token', function () {
                it('should return a message stating that All the error logs are already reported.', function(done){
                    request
                        .put(apiUrlErrorNotifyLogs)
                        .set('Accept', 'application/json')
                        .set('x-access-token', accessToken)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.CONFLICT);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.errorLog.emailAlreadySent);
                            done();
                        });
                });
            });
        });
    };
})();