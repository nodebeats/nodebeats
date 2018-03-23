(function(){
    "use strict";

    var apiMessageConfig = require('../../lib/configs/api.message.config'),
        Promise = require("bluebird"),
        HTTPStatus = require('http-status');

    module.exports = function(expect, request, accessToken) {

        describe('Role Management Integration test', function(){

            this.timeout(4000);

            var apiUrlRole = '/api/roles/';
            var roleInfo;

            beforeEach(function () {

                roleInfo = {
                    roleName : "writer",
                    read : true,
                    write : true,
                    delete : false,
                    create : true,
                    change : true,
                    active : true
                };
            });

            describe('getRoles() to retrieve user role list without access token', function () {
                it('should return a message stating that authentication is failed', function(done){
                    request
                        .get(apiUrlRole)
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

            describe('postRoleInfo() to save user role information without access tokens', function () {
                it('should return a message stating that authentication is failed', function(done){
                    request
                        .post(apiUrlRole)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .send(roleInfo)
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

            describe('postRoleInfo() to save  user role information with access token', function () {
                it('should return a successfull save message stating that User Role saved successfully', function(done){
                    request
                        .post(apiUrlRole)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .send(roleInfo)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.roleManager.saveMessage);
                            done();
                        });
                });
            });

            describe('postRoleInfo() to save  user role information with access token but with same roleName', function () {
                it('should return a duplication error  message stating that User Role with same name already exists', function(done){

                    request
                        .post(apiUrlRole)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .send(roleInfo)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.CONFLICT);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.roleManager.alreadyExists);
                            done();
                        });
                });
            });

            describe('postRoleInfo() to save  user role information with access tokens but without rolename .i.e. empty roleName', function () {
                it('should return a validation error message stating that Please enter Role Name', function(done){
                    var self = this;
                    self.invalidRoleObj = roleInfo;
                    self.invalidRoleObj.roleName = "";

                    request
                        .post(apiUrlRole)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .send(self.invalidRoleObj)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.roleManager.fieldRequiredRole);
                            done();
                        });
                });
            });

            describe('getRoles() to retrieve a list of user roles with access token', function () {
                it('should return a list of user roles', function(){

                    return request
                        .get(apiUrlRole)
                        .set('Accept', 'application/json')
                        .set('x-access-token', accessToken)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                            expect(res.body).to.be.instanceof(Array);
                            expect(res.body).to.have.length.of.at.least(2);
                            return Promise.resolve(res.body[0]);
                        })
                        .then(function(roleObj){

                            var _roleId = roleObj._id;
                            var _roleName = roleObj.roleName;

                            describe('getRoleById() to retrieve user role information object for ID ' + _roleId + ' without access token', function () {
                                it('should return a message stating that authentication is failed', function(done){
                                    request
                                        .get(apiUrlRole + _roleId)
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

                            describe('getRoleById() to retrieve user role information object for ID ' + _roleId + ' with access token', function () {
                                it('should return a user role information object', function(done){
                                    request
                                        .get(apiUrlRole + _roleId)
                                        .set('Accept', 'application/json')
                                        .set('x-access-token', accessToken)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("_id");
                                            expect(res.body._id).to.equal(_roleId);
                                            expect(res.body).to.have.property("roleName");
                                            expect(res.body.roleName).to.equal(_roleName);
                                            done();
                                        });
                                });
                            });

                            describe('updateRoleInfo() to update existing user role information object for ID ' + _roleId +' without access tokens', function () {
                                it('should return a message stating that authentication is failed', function(done){
                                    request
                                        .put(apiUrlRole + _roleId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .send(roleInfo)
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

                            describe('updateRoleInfo()  to update existing user role information object for ID ' + _roleId +' with access token', function () {
                                it('should return a successfull update message stating that User Role updated successfully', function(done){
                                    var self = this;
                                    self.validRoleObj = roleInfo;
                                    self.validRoleObj.roleName = "reader";
                                    self.validRoleObj.read = true;
                                    self.validRoleObj.write = false;
                                    self.validRoleObj.delete = false;
                                    self.validRoleObj.create = false;
                                    self.validRoleObj.change = false;
                                    self.validRoleObj.active = false;

                                    request
                                        .put(apiUrlRole + _roleId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .send(self.validRoleObj)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.roleManager.updateMessage);
                                            done();
                                        });
                                });
                            });



                            describe('updateRoleInfo()  to update existing user role information object for ID ' + _roleId +' with access token but without roleName', function () {
                                it('should return a validation error message stating that Please enter Role Name', function(done){
                                    var self = this;
                                    self.invalidRoleObj = roleInfo;
                                    self.invalidRoleObj.roleName = "";

                                    request
                                        .put(apiUrlRole + _roleId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .send(self.invalidRoleObj)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.roleManager.fieldRequiredRole);
                                            done();
                                        });
                                });
                            });

                            describe('updateRoleInfo()  to update existing user role information object for ID ' + _roleId +' with access token but with already saved role name', function () {
                                it('should return a validation error  message stating that User Role with same name already exists', function(done){
                                    var self = this;
                                    self.invalidRoleObj = roleInfo;
                                    self.invalidRoleObj.roleName = "admin";

                                    request
                                        .put(apiUrlRole + _roleId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .send(self.invalidRoleObj)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.CONFLICT);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.roleManager.alreadyExists);
                                            done();
                                        });
                                });
                            });

                            describe('getRoles() to retrieve a list of active user roles with access token', function () {
                                it('should return a list of user roles  with only active bit true', function(done){

                                    request
                                        .get(apiUrlRole)
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

                            describe('deleteRoleInfo() to delete user role Information for ID ' + _roleId +'  without access tokens ', function () {
                                it('should return a message stating that authentication is failed', function(done){

                                    request
                                        .patch(apiUrlRole + _roleId)
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

                            describe('deleteRoleInfo()  to delete user role  Information  for ID ' + _roleId + ' with access token', function () {
                                it('should return a successfull delete message stating that User Role deleted successfully', function(){

                                    return request
                                        .patch(apiUrlRole + _roleId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.roleManager.deleteMessage);
                                            return Promise.resolve();
                                        })
                                        .then(function () {
                                            describe('getRoles() to retrieve a list of user roles with access token that are not deleted', function () {
                                                it('should return a list of user roles   with deleted bit set to false', function(done){

                                                    request
                                                        .get(apiUrlRole)
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