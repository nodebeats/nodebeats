(function(){
    "use strict";

    var apiMessageConfig = require('../../lib/configs/api.message.config'),
        Promise = require("bluebird"),
        HTTPStatus = require('http-status');

    module.exports = function(expect, request, imagePathUrl, accessToken) {
        describe('Image Slider Integration test', function(){

            this.timeout(4000);
            var apiUrl = '/api/imageslider/';
            var imageSliderInfo;

            beforeEach(function (done) {
                imageSliderInfo = {
                    imageTitle : "EarthQuake in Nepal",
                    imageAltText : "Devastation of Nepal due to earthquake and incompetent government",
                    imagePrimaryContent : "Hello This is primary content",
                    imageSecondaryContent : "oh ya this is then secondary content",
                    active : true
                };
                done();
            });


            describe('getAllSliderImages() to retrieve slider images', function () {
                it('should return an empty list i.e. no slider image', function(done){
                    request
                        .get(apiUrl)
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                            expect(res.body).to.be.instanceof(Array);
                            expect(res.body).to.be.empty;
                            done();
                        });
                });
            });


            describe('postSliderImage() to save slider image without access tokens', function () {
                it('should return a message stating that authentication is failed', function(done){
                    request
                        .post(apiUrl)
                        .set('Accept', 'multipart/form-data')
                        .field('data', JSON.stringify(imageSliderInfo))
                        .attach('avatar', imagePathUrl[0])
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

            describe('postSliderImage()  to save slider image with access token', function () {
                it('should return a successfull save message stating slider image saved successfully', function(done){
                    request
                        .post(apiUrl)
                        .set('Accept', 'multipart/form-data')
                        .set('x-access-token', accessToken)
                        .field('data', JSON.stringify(imageSliderInfo))
                        .attach('imageName', imagePathUrl[0])
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.imageSlider.saveMessage);
                            done();
                        });
                });
            });

            describe('postSliderImage()  to save slider image without image file but with access tokens ', function () {
                it('should return a warning message stating please upload image', function(done){
                    request
                        .post(apiUrl)
                        .set('Accept', 'multipart/form-data')
                        .set('x-access-token', accessToken)
                        .field('data', JSON.stringify(imageSliderInfo))
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.imageSlider.fieldRequired);
                            done();
                        });
                });
            });

            describe('getAllSliderImages()  to retrieve slider images', function () {
                it('should return a list of slider images', function(){
                    return request
                        .get(apiUrl)
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                            expect(res.body).to.be.instanceof(Array);
                            expect(res.body).to.have.length.of.at.least(1);
                            return Promise.resolve(res.body[0]);
                        })
                        .then(function(resultImageSliderObj){
                            var imageSliderId = resultImageSliderObj._id;
                            var _imageName = resultImageSliderObj.imageName;

                            describe('getSliderImageByID() to retrieve slider image object for ID ' + imageSliderId, function () {
                                it('should return a slider image information object', function(done){
                                    request
                                        .get(apiUrl + imageSliderId)
                                        .set('Accept', 'application/json')
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("_id");
                                            expect(res.body._id).to.equal(imageSliderId);
                                            expect(res.body).to.have.property("imageName");
                                            expect(res.body.imageName).to.equal(_imageName);
                                            done();
                                        });
                                });
                            });


                            describe('updateSliderImage() to update existing slider image object for ID ' + imageSliderId +' without access tokens', function () {
                                it('should return a message stating that authentication is failed', function(done){
                                    request
                                        .put(apiUrl + imageSliderId)
                                        .set('Accept', 'multipart/form-data')
                                        .field('data', JSON.stringify(imageSliderInfo))
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

                            describe('updateSliderImage()  to update existing slider image object for ID ' + imageSliderId +' with access token and without image', function () {
                                it('should return a successfull update message stating slider image updated successfully', function(done){
                                    var self = this;
                                    self.validImageSliderObj = imageSliderInfo;
                                    self.validImageSliderObj.imageAltText = "changing alternative text";
                                    self.validImageSliderObj.active = false;

                                    request
                                        .put(apiUrl + imageSliderId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .field('data', JSON.stringify(self.validImageSliderObj))
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.imageSlider.updateMessage);
                                            done();
                                        });
                                });
                            });

                            describe('updateSliderImage()  to update existing slider image object for ID ' + imageSliderId +' with access token and with image', function () {
                                it('should return a successfull update message  stating slider image updated successfully', function(done){

                                    request
                                        .put(apiUrl + imageSliderId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .field('data', JSON.stringify(imageSliderInfo))
                                        .attach('imageName', imagePathUrl[1])
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.imageSlider.updateMessage);
                                            done();
                                        });
                                });
                            });

                            describe('getSliderImageByID() to retrieve slider image information object for ID ' + imageSliderId, function () {
                                it('should return a slider image information object', function(done){
                                    request
                                        .get(apiUrl + imageSliderId)
                                        .set('Accept', 'application/json')
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("_id");
                                            expect(res.body._id).to.equal(imageSliderId);
                                            expect(res.body).to.have.property("imageName");
                                            expect(res.body.imageName).to.not.equal(_imageName);
                                            done();
                                        });
                                });
                            });



                            describe('patchSliderImage() to delete slider image for ID ' + imageSliderId +'  without access tokens', function () {
                                it('should return a message stating that authentication is failed', function(done){

                                    request
                                        .patch(apiUrl + imageSliderId)
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

                            describe('patchSliderImage()  to delete slider image  for ID ' + imageSliderId, function () {
                                it('should return a successfull delete message stating slider image deleted successfully', function(){

                                    return request
                                        .patch(apiUrl + imageSliderId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.imageSlider.deleteMessage);
                                            return Promise.resolve();
                                        })
                                        .then(function(){
                                            describe('getAllSliderImages() to retrieve list of slider images after delete', function () {
                                                it('should not return a list of slider images i.e. empty response', function(done){
                                                    request
                                                        .get(apiUrl)
                                                        .set('Accept', 'application/json')
                                                        .expect('Content-Type', /json/)
                                                        .then(function(res) {
                                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                            expect(res.body).to.be.instanceof(Array);
                                                            expect(res.body).to.be.empty;
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