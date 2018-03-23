(function(){
    "use strict";

    var apiMessageConfig = require('../../lib/configs/api.message.config'),
        Promise = require("bluebird"),
        HTTPStatus = require('http-status');

    module.exports = function(expect, request, imagePathUrl, accessToken) {
        describe('Team Management Integration test', function(){

            this.timeout(4000);
            var apiUrlTeam = '/api/team/';
            var apiUrlTeamHierarchy = '/api/member/hierarchy/';
            var teamObj;

            beforeEach(function () {
                teamObj = {
                    teamMemberName : "Shrawan Lakhe",
                    email : "shrawanlakhey@gmail.com",
                    phoneNumber : "",
                    facebookURL : "http://facebook.com",
                    twitterURL : "",
                    googlePlusURL : "",
                    linkedInURL : "",
                    address : "Thaiba, Nepal",
                    designation : "Developer",
                    description : "everybody should go on long treks",
                    active : true
                };
            });

            describe('getTeamMembers() to retrieve team members', function () {
                it('should return an empty list of team members for the first time', function(done){
                    request
                        .get(apiUrlTeam)
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


            describe('postTeamMemberInfo() to save team member information without access tokens', function () {
                it('should return a message stating that authentication is failed', function(done){
                    request
                        .post(apiUrlTeam)
                        .set('Accept', 'multipart/form-data')
                        .field('data', JSON.stringify(teamObj))
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

            describe('postTeamMemberInfo()  to save team member information with access tokens ', function () {
                it('should return a successfull save message stating team member saved successfully', function(done){
                    request
                        .post(apiUrlTeam)
                        .set('Accept', 'multipart/form-data')
                        .set('x-access-token', accessToken)
                        .field('data', JSON.stringify(teamObj))
                        .attach('imageName', imagePathUrl[0])
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.teamMember.saveMessage);
                            done();
                        });
                });
            });

            describe('postTeamMemberInfo()  to save team member information with access tokens and same  information i.e member with same email address', function () {
                it('should return a duplicate message stating that team member with same email already exists', function(done){
                    request
                        .post(apiUrlTeam)
                        .set('Accept', 'multipart/form-data')
                        .set('x-access-token', accessToken)
                        .field('data', JSON.stringify(teamObj))
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.CONFLICT);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.teamMember.alreadyExists);
                            done();
                        });
                });
            });

            describe('postTeamMemberInfo() to save team member information  with access tokens but without image and different email', function () {
                it('should return a successfull save message stating team member saved successfully', function(done){
                    var self = this;
                    self.validTeamMemberObj = teamObj;
                    self.validTeamMemberObj.email = "shrawanlakhe@hotmail.com";
                    request
                        .post(apiUrlTeam)
                        .set('Accept', 'multipart/form-data')
                        .set('x-access-token', accessToken)
                        .field('data', JSON.stringify(self.validTeamMemberObj))
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.teamMember.saveMessage);
                            done();
                        });
                });
            });

            describe('postTeamMemberInfo() to save team member information  with invalid data i.e. no team member name, no email, no designation,  invalid email,  invalid facebook url, invalid twitter url, invalid google plus url and finally invalid linkedInUrl ', function () {
                afterEach(function(){
                    teamObj = {
                        teamMemberName : "Shrawan Lakhe",
                        testimonialContent : "Devastation of Nepal due to earthquake and incompetent government",
                        organization : "BitsBeat IT Solution",
                        designation : "CTO",
                        email : "shrawanlakhey@gmail.com",
                        facebookURL : "http://facebook.com",
                        twitterURL : "",
                        gPlusURL : "",
                        linkedInURL : "",
                        testimonialDate : "2016-02-23",
                        active : true
                    };
                });

                it('should return a message stating validation error- team member name is required for empty team member name', function(done){
                    var self = this;
                    self.invalidTeamMemberObj = teamObj;
                    self.invalidTeamMemberObj.teamMemberName = "";
                    request
                        .post(apiUrlTeam)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .field('data', JSON.stringify(self.invalidTeamMemberObj))
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.teamMember.validationErrMessage.teamMemberName);
                            done();
                        });
                });

                it('should return a message stating validation error- email is required for empty email', function(done){
                    var self = this;
                    self.invalidTeamMemberObj = teamObj;
                    self.invalidTeamMemberObj.email = "";
                    request
                        .post(apiUrlTeam)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .field('data', JSON.stringify(self.invalidTeamMemberObj))
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.teamMember.validationErrMessage.email);
                            done();
                        });
                });

                it('should return a message stating validation error- designation of member  is required for empty designation', function(done){
                    var self = this;
                    self.invalidTeamMemberObj = teamObj;
                    self.invalidTeamMemberObj.designation = "";
                    request
                        .post(apiUrlTeam)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .field('data', JSON.stringify(self.invalidTeamMemberObj))
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.teamMember.validationErrMessage.designation);
                            done();
                        });
                });

                it('should return a message stating validation error - invalid email, invalid facebook url, invalid twitter url, invalid googleplus url and finally invalid linkedin url for invalid data ', function(done){
                    var self = this;
                    self.invalidTeamMemberObj = teamObj;
                    self.invalidTeamMemberObj.email = "rew";
                    self.invalidTeamMemberObj.facebookURL = "rew";
                    self.invalidTeamMemberObj.twitterURL = "rew";
                    self.invalidTeamMemberObj.googlePlusURL = "32";
                    self.invalidTeamMemberObj.linkedInURL = "32";
                    request
                        .post(apiUrlTeam)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .field('data', JSON.stringify(self.invalidTeamMemberObj))
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.teamMember.validationErrMessage.emailValid);
                            expect(errObj.message[1].msg).to.have.string(apiMessageConfig.teamMember.validationErrMessage.facebookURLValid);
                            expect(errObj.message[2].msg).to.have.string(apiMessageConfig.teamMember.validationErrMessage.twitterURLValid);
                            expect(errObj.message[3].msg).to.have.string(apiMessageConfig.teamMember.validationErrMessage.gPlusURLValid);
                            expect(errObj.message[4].msg).to.have.string(apiMessageConfig.teamMember.validationErrMessage.linkedInURLValid);
                            done();
                        });
                });
            });

            describe('getTeamMembers() to retrieve list of team members after saving records of team  members', function () {
                it('should return a list of team members ', function(){
                    return request
                        .get(apiUrlTeam)
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                            expect(res.body).to.have.property("dataList");
                            expect(res.body.dataList).to.be.instanceof(Array);
                            expect(res.body.dataList).to.have.length.of.at.least(1);
                            expect(res.body).to.have.property("totalItems");
                            expect(res.body.totalItems).to.equal(2);
                            return Promise.resolve(res.body.dataList[0]);
                        })
                        .then(function (resultTeamMemberObj) {
                            var _teamMemberId = resultTeamMemberObj._id;
                            var _teamMemberName = resultTeamMemberObj.teamMemberName;
                            var _imageName = resultTeamMemberObj.imageName;

                            describe('getTeamMemberInfoByID() to retrieve team member information object for ID ' + _teamMemberId, function () {
                                it('should return a team member information object ', function(done){
                                    request
                                        .get(apiUrlTeam + _teamMemberId)
                                        .set('Accept', 'application/json')
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("_id");
                                            expect(res.body._id).to.equal(_teamMemberId);
                                            expect(res.body).to.have.property("teamMemberName");
                                            expect(res.body.teamMemberName).to.equal(_teamMemberName);
                                            done();
                                        });
                                });
                            });

                            describe('updateTeamMemberInfo() to update existing team member information object for ID ' + _teamMemberId +'  without access tokens', function () {
                                it('should return a message stating that authentication is failed', function(done){
                                    request
                                        .put(apiUrlTeam + _teamMemberId)
                                        .set('Accept', 'multipart/form-data')
                                        .field('data', JSON.stringify(teamObj))
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


                            describe('updateTeamMemberInfo() to update existing team member information object  for ID ' + _teamMemberId +'  with access token and valid data but without image', function () {
                                it('should return a successfull update message stating that team member information updated successfully', function(done){
                                    var self = this;
                                    self.validTeamMemberObj = teamObj;
                                    self.validTeamMemberObj.teamMemberName = "Tom Cruise";
                                    self.validTeamMemberObj.linkedInURL = "https://tom.cruise.us";
                                    teamObj.active = false;

                                    request
                                        .put(apiUrlTeam + _teamMemberId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .field('data', JSON.stringify(self.validTeamMemberObj))
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.teamMember.updateMessage);
                                            done();
                                        });
                                });
                            });

                            describe('updateTeamMemberInfo() to update existing team member information object  for ID ' + _teamMemberId +' with access token and with image file and valid data', function () {
                                it('should return a successfull  update message  stating that team member information updated successfully', function(done){
                                    request
                                        .put(apiUrlTeam + _teamMemberId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .field('data', JSON.stringify(teamObj))
                                        .attach('imageName', imagePathUrl[1])
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.teamMember.updateMessage);
                                            done();
                                        });
                                });
                            });

                            describe('getTestimonialByID() to retrieve team member information object for ID ' + _teamMemberId +' after update operation', function () {
                                it('should return a team member information object date with different  image Name and person name ', function(done){
                                    request
                                        .get(apiUrlTeam + _teamMemberId)
                                        .set('Accept', 'application/json')
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("_id");
                                            expect(res.body._id).to.equal(_teamMemberId);
                                            expect(res.body).to.have.property("teamMemberName");
                                            expect(res.body.teamMemberName).to.not.equal(_teamMemberName);
                                            expect(res.body).to.have.property("imageName");
                                            expect(res.body.imageName).to.not.equal(_imageName);
                                            done();
                                        });
                                });
                            });

                            describe('updateTeamMemberInfo()  to update existing team member information object  with invalid data i.e. no team member name and no email ', function () {
                                afterEach(function(){
                                    teamObj = {
                                        teamMemberName : "Shrawan Lakhe",
                                        testimonialContent : "Devastation of Nepal due to earthquake and incompetent government",
                                        organization : "BitsBeat IT Solution",
                                        designation : "CTO",
                                        email : "shrawanlakhey@gmail.com",
                                        facebookURL : "http://facebook.com",
                                        twitterURL : "",
                                        gPlusURL : "",
                                        linkedInURL : "",
                                        testimonialDate : "2016-02-23",
                                        active : true
                                    };
                                });

                                it('should return a message stating validation error- team member name is required for empty team member name', function(done){
                                    var self = this;
                                    self.invalidTeamMemberObj = teamObj;
                                    self.invalidTeamMemberObj.teamMemberName = "";
                                    request
                                        .put(apiUrlTeam + _teamMemberId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .field('data', JSON.stringify(self.invalidTeamMemberObj))
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                            expect(res.error).to.have.property('text');
                                            var errObj = JSON.parse(res.error.text);
                                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.teamMember.validationErrMessage.teamMemberName);
                                            done();
                                        });
                                });

                                it('should return a message stating validation error- email is required for empty email address', function(done){
                                    var self = this;
                                    self.invalidTeamMemberObj = teamObj;
                                    self.invalidTeamMemberObj.email = "";
                                    request
                                        .put(apiUrlTeam + _teamMemberId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .field('data', JSON.stringify(self.invalidTeamMemberObj))
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                            expect(res.error).to.have.property('text');
                                            var errObj = JSON.parse(res.error.text);
                                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.teamMember.validationErrMessage.email);
                                            done();
                                        });
                                });
                            });

                            describe('getTeamMembers() after update operation for active bit', function () {
                                it('should return only list of team members with active bit set to true', function(done){
                                    request
                                        .get(apiUrlTeam)
                                        .query('active=true')
                                        .set('Accept', 'application/json')
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.have.property("dataList");
                                            expect(res.body.dataList).to.be.instanceof(Array);
                                            expect(res.body.dataList).to.have.length.of.at.least(1);
                                            expect(res.body).to.have.property("totalItems");
                                            expect(res.body.totalItems).to.equal(1);
                                            expect(res.body.dataList[0]).to.have.property("active");
                                            expect(res.body.dataList[0].active).to.equal(true);
                                            done();
                                        });
                                });
                            });

                            describe('updateTeamMemberHierarchy() to change heirarchy of team members for ID ' + _teamMemberId +' without access tokens', function () {
                                it('should return a message stating that authentication is failed', function(done){
                                    var sortData =  {
                                        sort : "down"
                                    };
                                    request
                                        .patch(apiUrlTeamHierarchy + _teamMemberId + '/1')
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .send(sortData)
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

                            describe('updateTeamMemberHierarchy()  to change heirarchy of team members  for ID ' + _teamMemberId +' with access tokens in downward direction', function () {
                                it('should return a successfull sort message with correct sort order', function(done){
                                    var sortData =  {
                                        sort : "up"
                                    };
                                    request
                                        .patch(apiUrlTeamHierarchy + _teamMemberId + '/1')
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .send(sortData)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.NOT_FOUND);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.teamMember.notFound);
                                            done();
                                        });
                                });
                            });

                            describe('updateTeamMemberHierarchy()  to change heirarchy of team members  for ID ' + _teamMemberId +' with access tokens in downward direction', function () {
                                it('should return a successfull sort message with correct sort order', function(done){
                                    var sortData =  {
                                        sort : "down"
                                    };
                                    request
                                        .patch(apiUrlTeamHierarchy + _teamMemberId + '/1')
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .send(sortData)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.teamMember.sortMessage);
                                            done();
                                        });
                                });
                            });

                            describe('updateTeamMemberHierarchy() for ID ' + _teamMemberId +' to update hierarchy of a team member information with access tokens but wrong heirarchy value', function () {
                                it('should return a message stating that sort member not found', function(done){
                                    var sortData =  {
                                        sort : "up"
                                    };
                                    request
                                        .patch(apiUrlTeamHierarchy + _teamMemberId + '/1')
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .send(sortData)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.NOT_FOUND);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.teamMember.notFound);
                                            done();
                                        });
                                });
                            });



                            describe('patchTeamMemberInfo() to delete team member information  for ID ' + _teamMemberId +' without access tokens', function () {
                                it('should return a message stating that authentication is failed', function(done){

                                    request
                                        .patch(apiUrlTeam + _teamMemberId)
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

                            describe('patchTeamMemberInfo()  to delete team member information  for ID ' + _teamMemberId +'  with access tokens', function () {
                                it('should return a successfull delete message stating that team member information is deleted ', function(){

                                    return request
                                        .patch(apiUrlTeam + _teamMemberId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.teamMember.deleteMessage);
                                            return Promise.resolve();
                                        })
                                        .then(function () {
                                            describe('getTeamMembers() after delete of one record', function () {
                                                it('should return a single list of team member information', function(done){
                                                    request
                                                        .get(apiUrlTeam)
                                                        .set('Accept', 'application/json')
                                                        .expect('Content-Type', /json/)
                                                        .then(function(res) {

                                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                            expect(res.body).to.have.property("dataList");
                                                            expect(res.body.dataList).to.be.instanceof(Array);
                                                            expect(res.body.dataList).to.have.length.of.at.least(1);
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