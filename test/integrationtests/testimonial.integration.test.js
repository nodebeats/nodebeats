(function(){
    "use strict";

    var apiMessageConfig = require('../../lib/configs/api.message.config'),
        Promise = require("bluebird"),
        HTTPStatus = require('http-status');

    module.exports = function(expect, request, imagePathUrl, accessToken) {
        describe('Testimonial Integration test', function(){

            this.timeout(4000);
            var apiUrl = '/api/testimonial/';
            var testimonialObj;

            beforeEach(function () {
                testimonialObj = {
                    personName : "Shrawan Lakhe",
                    testimonialContent : "Devastation of Nepal due to earthquake and incompetent government",
                    organization : "BitsBeat IT Solution",
                    designation : "CTO",
                    email : "shrawanlakhey@gmail.com",
                    facebookURL : "http://facebook.com",
                    twitterURL : "",
                    gPlusURL : "",
                    linkedInURL : "",
                    active : true
                };
            });

            describe('getAllTestimonials() to retrieve list of testimonials', function () {
                it('should return an empty list of testimonials for the first time', function(done){
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


            describe('postTestimonial() to save testimonial without access tokens', function () {
                it('should return a message stating that authentication is failed', function(done){
                    request
                        .post(apiUrl)
                        .set('Accept', 'multipart/form-data')
                        .field('data', JSON.stringify(testimonialObj))
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

            describe('postTestimonial()  to save testimonial  with access tokens ', function () {
                it('should return a successfull save message stating testimonial saved successfully', function(done){
                    request
                        .post(apiUrl)
                        .set('Accept', 'multipart/form-data')
                        .set('x-access-token', accessToken)
                        .field('data', JSON.stringify(testimonialObj))
                        .attach('imageName', imagePathUrl[0])
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.testimonial.saveMessage);
                            done();
                        });
                });
            });

            describe('postTestimonial()  to save testimonial  with access tokens but without image', function () {
                it('should return a successfull save message stating that testimonial saved successfully', function(done){
                    request
                        .post(apiUrl)
                        .set('Accept', 'multipart/form-data')
                        .set('x-access-token', accessToken)
                        .field('data', JSON.stringify(testimonialObj))
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.testimonial.saveMessage);
                            done();
                        });
                });
            });

            describe('postTestimonial()   to save testimonial  with invalid data i.e. no person name, no testimonial content, no organization,  invalid email,  invalid facebook url, invalid twitter url, invalid google plus url, invalid linkedInUrl and finally invalid date', function () {
                afterEach(function(){
                    testimonialObj = {
                        personName : "Shrawan Lakhe",
                        testimonialContent : "Devastation of Nepal due to earthquake and incompetent government",
                        organization : "BitsBeat IT Solution",
                        designation : "CTO",
                        email : "shrawanlakhey@gmail.com",
                        facebookURL : "http://facebook.com",
                        twitterURL : "",
                        gPlusURL : "",
                        linkedInURL : "",
                        active : true
                    };
                });

                it('should return a message stating validation error- person name is required for empty person name', function(done){
                    var self = this;
                    self.invalidTestimonialObj = testimonialObj;
                    self.invalidTestimonialObj.personName = "";
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .field('data', JSON.stringify(self.invalidTestimonialObj))
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.testimonial.validationErrMessage.personName);
                            done();
                        });
                });

                it('should return a message stating validation error- testimonial content is required for empty testimonial content', function(done){
                    var self = this;
                    self.invalidTestimonialObj = testimonialObj;
                    self.invalidTestimonialObj.testimonialContent = "";
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .field('data', JSON.stringify(self.invalidTestimonialObj))
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.testimonial.validationErrMessage.testimonialContent);
                            done();
                        });
                });

                it('should return a message stating validation error- organization of testifier  is required for empty organization', function(done){
                    var self = this;
                    self.invalidTestimonialObj = testimonialObj;
                    self.invalidTestimonialObj.organization = "";
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .field('data', JSON.stringify(self.invalidTestimonialObj))
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.testimonial.validationErrMessage.organization);
                            done();
                        });
                });

                it('should return a message stating validation error - invalid facebook url, invalid twitter url, invalid googleplus url and finally invalid linkedin url for invalid urls i.e facebook invalid url, twitter invalid url, googleplus invaid url and linked invalid url', function(done){
                    var self = this;
                    self.invalidTestimonialObj = testimonialObj;
                    self.invalidTestimonialObj.facebookURL = "rew";
                    self.invalidTestimonialObj.twitterURL = "rew";
                    self.invalidTestimonialObj.gPlusURL = "32";
                    self.invalidTestimonialObj.linkedInURL = "32";
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .field('data', JSON.stringify(self.invalidTestimonialObj))
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.testimonial.validationErrMessage.facebookURLValid);
                            expect(errObj.message[1].msg).to.have.string(apiMessageConfig.testimonial.validationErrMessage.twitterURLValid);
                            expect(errObj.message[2].msg).to.have.string(apiMessageConfig.testimonial.validationErrMessage.gPlusURLValid);
                            expect(errObj.message[3].msg).to.have.string(apiMessageConfig.testimonial.validationErrMessage.linkedInURLValid);
                            done();
                        });
                });

                it('should return a message stating validation error - invalid email address for invalid email of client', function(done){
                    var self = this;
                    self.invalidTestimonialObj = testimonialObj;
                    self.invalidTestimonialObj.email = "rewrwe";
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .field('data', JSON.stringify(self.invalidTestimonialObj))
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.testimonial.validationErrMessage.emailValid);
                            done();
                        });
                });
            });

            describe('getAllTestimonials() to retrieve the list of testimonials after saving records of testimonial', function () {
                it('should return a list of testimonials ', function(){
                    return request
                        .get(apiUrl)
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
                        .then(function (resultTestimonialObj) {
                            var _testimonialId = resultTestimonialObj._id;
                            var _personName = resultTestimonialObj.personName;
                            var _imageName = resultTestimonialObj.imageName;

                            describe('getTestimonialByID() to retrieve testimonial object for ID ' + _testimonialId, function () {
                                it('should return a testimonial information object ', function(done){
                                    request
                                        .get(apiUrl + _testimonialId)
                                        .set('Accept', 'application/json')
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("_id");
                                            expect(res.body._id).to.equal(_testimonialId);
                                            expect(res.body).to.have.property("personName");
                                            expect(res.body.personName).to.equal(_personName);
                                            done();
                                        });
                                });
                            });

                            describe('updateTestimonial() to update existing testimonial data for ID ' + _testimonialId +'  without access tokens', function () {
                                it('should return a message stating that authentication is failed', function(done){
                                    request
                                        .put(apiUrl + _testimonialId)
                                        .set('Accept', 'multipart/form-data')
                                        .field('data', JSON.stringify(testimonialObj))
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

                            describe('updateTestimonial()  to update existing testimonial data for ID ' + _testimonialId +'  with access token but without image', function () {
                                it('should return a successfull update message stating that testimonial updated successfully', function(done){
                                    var self = this;
                                    self.validTestimonialObj = testimonialObj;
                                    self.validTestimonialObj.personName = "Tom Cruise";
                                    self.validTestimonialObj.linkedInURL = "https://tom.cruise.us";
                                    testimonialObj.active = false;

                                    request
                                        .put(apiUrl + _testimonialId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .field('data', JSON.stringify(self.validTestimonialObj))
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.testimonial.updateMessage);
                                            done();
                                        });
                                });
                            });

                            describe('updateTestimonial()  to update existing testimonial data for ID ' + _testimonialId +' with access token and with image file', function () {
                                it('should return a successfull  update message  stating that testimonial updated successfully', function(done){
                                    request
                                        .put(apiUrl + _testimonialId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .field('data', JSON.stringify(testimonialObj))
                                        .attach('imageName', imagePathUrl[1])
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.testimonial.updateMessage);
                                            done();
                                        });
                                });
                            });

                            describe('getTestimonialByID() to retrieve testimonial object for ID ' + _testimonialId +' after update operation', function () {
                                it('should return a testimonial object date with different  image Name and person name ', function(done){
                                    request
                                        .get(apiUrl + _testimonialId)
                                        .set('Accept', 'application/json')
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("_id");
                                            expect(res.body._id).to.equal(_testimonialId);
                                            expect(res.body).to.have.property("personName");
                                            expect(res.body.personName).to.not.equal(_personName);
                                            expect(res.body).to.have.property("imageName");
                                            expect(res.body.imageName).to.not.equal(_imageName);
                                            done();
                                        });
                                });
                            });

                            describe('updateTestimonial()  to retrieve testimonial object  with invalid data i.e. no person name, no testimonial content', function () {
                                afterEach(function(){
                                    testimonialObj = {
                                        personName : "Shrawan Lakhe",
                                        testimonialContent : "Devastation of Nepal due to earthquake and incompetent government",
                                        organization : "BitsBeat IT Solution",
                                        designation : "CTO",
                                        email : "shrawanlakhey@gmail.com",
                                        facebookURL : "http://facebook.com",
                                        twitterURL : "",
                                        gPlusURL : "",
                                        linkedInURL : "",
                                        active : true
                                    };
                                });

                                it('should return a message stating validation error- person name is required for empty person name', function(done){
                                    var self = this;
                                    self.invalidTestimonialObj = testimonialObj;
                                    self.invalidTestimonialObj.personName = "";
                                    request
                                        .put(apiUrl + _testimonialId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .field('data', JSON.stringify(self.invalidTestimonialObj))
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                            expect(res.error).to.have.property('text');
                                            var errObj = JSON.parse(res.error.text);
                                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.testimonial.validationErrMessage.personName);
                                            done();
                                        });
                                });

                                it('should return a message stating validation error- testimonial content is required for empty testimonial content', function(done){
                                    var self = this;
                                    self.invalidTestimonialObj = testimonialObj;
                                    self.invalidTestimonialObj.testimonialContent = "";
                                    request
                                        .put(apiUrl + _testimonialId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .field('data', JSON.stringify(self.invalidTestimonialObj))
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                            expect(res.error).to.have.property('text');
                                            var errObj = JSON.parse(res.error.text);
                                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.testimonial.validationErrMessage.testimonialContent);
                                            done();
                                        });
                                });
                            });


                            describe('getAllTestimonials() to retrieve list of testimonials after update operation for active bit', function () {
                                it('should return only list of testimonials with active bit set to true', function(done){
                                    request
                                        .get(apiUrl)
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

                            describe('patchTestimonial() to delete testimonial for ID ' + _testimonialId +' without access tokens', function () {
                                it('should return a message stating that authentication is failed', function(done){

                                    request
                                        .patch(apiUrl + _testimonialId)
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

                            describe('patchTestimonial() to delete testimonial for ID ' + _testimonialId +'  with access tokens', function () {
                                it('should return a successfull delete message stating that testimonial is deleted ', function(){

                                    return request
                                        .patch(apiUrl + _testimonialId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.testimonial.deleteMessage);
                                            return Promise.resolve();
                                        })
                                        .then(function () {
                                            describe('getAllTestimonials() to retrieve list of testimonials after delete of one record', function () {
                                                it('should return a single list of testimonial', function(done){
                                                    request
                                                        .get(apiUrl)
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