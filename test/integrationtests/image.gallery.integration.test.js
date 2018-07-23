(function(){

    "use strict";

    var apiMessageConfig = require('../../lib/configs/api.message.config'),
        Promise = require("bluebird"),
        HTTPStatus = require('http-status');

    module.exports = function(expect, request, imagePathUrl, accessToken) {

        describe('Image Gallery Integration test', function(){

            this.timeout(4000);
            var apiUrlAlbum = '/api/gallery/album/';
            var apiUrlImage = '/api/gallery/albumimage/';
            var imageGalleryAlbumInfo;
            var galleryImageInfo;

            beforeEach(function () {
                imageGalleryAlbumInfo = {
                    albumName : "Sports Album",
                    albumDescription : "Contains Sports related images",
                    active : true
                };
                galleryImageInfo = {
                    imageTitle : "beautiful image woow",
                    imageAltText : "yup very very beautiful image",
                    imageDescription : "image clicked at everest base camp in Nepal",
                    active : true
                };
            });

            describe('getAllGalleryAlbums() to retrieve image gallery albums for the first time', function () {
                it('should return an empty list of gallery albums', function(done){
                    request
                        .get(apiUrlAlbum)
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


            describe('postAlbumInfo() to save album info without access tokens', function () {
                it('should return a message stating that authentication is failed', function(done){
                    request
                        .post(apiUrlAlbum)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .send(imageGalleryAlbumInfo)
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

            describe('postAlbumInfo() to save album info  with access tokens ', function () {
                it('should return a successfull save message stating image gallery album saved successfully', function(done){
                    request
                        .post(apiUrlAlbum)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .send(imageGalleryAlbumInfo)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.imageGallery.saveMessageAlbum);
                            done();
                        });
                });
            });

            describe('postAlbumInfo()  to save album info  with access tokens but with same title to check for duplicacy', function () {
                it('should return an validation message stating that Image Gallery album with same title already exists.', function(done){
                    request
                        .post(apiUrlAlbum)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .send(imageGalleryAlbumInfo)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.CONFLICT);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.imageGallery.alreadyExists);
                            done();
                        });
                });
            });

            describe('postAlbumInfo() to save album info  with access tokens and  with empty title ', function () {
                it('should return a validation error message stating that album title is required.', function(done){
                    var self = this;
                    self.invalidGalleryAlbumObj = imageGalleryAlbumInfo;
                    self.invalidGalleryAlbumObj.albumName = "";

                    request
                        .post(apiUrlAlbum)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .send(self.invalidGalleryAlbumObj)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.imageGallery.fieldRequiredAlbum);
                            done();
                        });
                });
            });


            describe('getAllGalleryAlbums() to retrieve list of image gallery albums', function () {
                it('should return a list of gallery albums after saving of album data', function(){
                    return request
                        .get(apiUrlAlbum)
                        .set('Accept', 'application/json')
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
                        .then(function(galleryAlbumObj) {
                            var _imageGalleryAlbumId = galleryAlbumObj._id;
                            var _albumName = galleryAlbumObj.albumName;

                            describe('getAlbumInfoByID() to retrieve album information object for ID ' + _imageGalleryAlbumId, function () {
                                it('should return an album information object', function (done) {
                                    request
                                        .get(apiUrlAlbum + _imageGalleryAlbumId)
                                        .set('Accept', 'application/json')
                                        .expect('Content-Type', /json/)
                                        .then(function (res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("_id");
                                            expect(res.body._id).to.equal(_imageGalleryAlbumId);
                                            expect(res.body).to.have.property("albumName");
                                            expect(res.body.albumName).to.equal(_albumName);
                                            done();
                                        });
                                });
                            });

                            describe('updateAlbumInfo() to update existing album data for ID ' + _imageGalleryAlbumId +' without access tokens', function () {
                                it('should return a message stating that authentication is failed', function(done){
                                    request
                                        .put(apiUrlAlbum + _imageGalleryAlbumId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .send(imageGalleryAlbumInfo)
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

                            describe('updateAlbumInfo() to update existing album data  for ID ' + _imageGalleryAlbumId +' with access token', function () {
                                it('should return an album information with updated data', function(done){
                                    var self = this;
                                    self.validImageGalleryAlbumObj = imageGalleryAlbumInfo;
                                    self.validImageGalleryAlbumObj.albumName = "Rafting in Kaligandaki river";
                                    self.validImageGalleryAlbumObj.active = false;

                                    request
                                        .put(apiUrlAlbum + _imageGalleryAlbumId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .send(self.validImageGalleryAlbumObj)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.imageGallery.updateMessageAlbum);
                                            done();
                                        });
                                });
                            });

                            describe('updateAlbumInfo()  to update existing album data   for ID ' + _imageGalleryAlbumId +'  with empty title', function () {
                                it('should return a message stating album title is required', function(done){
                                    var self = this;
                                    self.invalidImageGalleryAlbumObj = imageGalleryAlbumInfo;
                                    self.invalidImageGalleryAlbumObj.albumName = "";

                                    request
                                        .put(apiUrlAlbum + _imageGalleryAlbumId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .send(self.invalidImageGalleryAlbumObj)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.imageGallery.fieldRequiredAlbum);
                                            done();
                                        });
                                });
                            });


                            describe('getAllGalleryAlbums() to retrieve only active albums with active bit true after setting active bit false using update operation', function () {
                                it('should return an empty array', function(done){
                                    request
                                        .get(apiUrlAlbum)
                                        .query('active=true')
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



                            describe('getAlbumInfoByID() to retrieve updated album information for ID ' + _imageGalleryAlbumId + 'after update operation', function () {
                                it('should return an album information object with different data in albumName field and active field', function(done){
                                    request
                                        .get(apiUrlAlbum + _imageGalleryAlbumId)
                                        .set('Accept', 'application/json')
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("_id");
                                            expect(res.body._id).to.equal(_imageGalleryAlbumId);
                                            expect(res.body).to.have.property("albumName");
                                            expect(res.body.albumName).to.not.equal(_albumName);
                                            expect(res.body).to.have.property("active");
                                            expect(res.body.active).to.not.equal(true);
                                            done();
                                        });
                                });
                            });

                            describe('postAlbumInfo() to save another album information with access tokens and different album name', function () {
                                it('should return a successfull save message stating album saved successfully', function(done){

                                    var self = this;
                                    self.validImageGalleryAlbumObj = imageGalleryAlbumInfo;
                                    self.validImageGalleryAlbumObj.albumName = "Adventure";
                                    request
                                        .post(apiUrlAlbum)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .send(self.validImageGalleryAlbumObj)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.imageGallery.saveMessageAlbum);
                                            done();
                                        });
                                });
                            });

                            describe('updateAlbumInfo() to update existing album information data for ID ' + _imageGalleryAlbumId +' with previously saved album name', function () {
                                it('should return warning message stating that album with same name already exists', function(done){
                                    var self = this;
                                    self.validImageGalleryAlbumObj = imageGalleryAlbumInfo;
                                    self.validImageGalleryAlbumObj.albumName = "Adventure";

                                    request
                                        .put(apiUrlAlbum + _imageGalleryAlbumId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .send(self.validImageGalleryAlbumObj)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.CONFLICT);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.imageGallery.alreadyExists);
                                            done();
                                        });
                                });
                            });


                            describe('patchGalleryAlbum() to delete album  for ID ' + _imageGalleryAlbumId +' without access tokens', function () {
                                it('should return a message stating that authentication is failed', function(done){

                                    request
                                        .patch(apiUrlAlbum + _imageGalleryAlbumId)
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

//Image Gallery Album image Integration test

                            describe('getAllGalleryImagesByAlbumID() for the first time to retrieve images for album with album name ' + _albumName, function () {
                                it('should return an empty list of images for album ' + _albumName, function(done){
                                    request
                                        .get(apiUrlImage + _imageGalleryAlbumId)
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


                            describe('postGalleryImageInfo() to save gallery images without access tokens', function () {
                                it('should return a message stating that authentication is failed', function(done){
                                    request
                                        .post(apiUrlImage + _imageGalleryAlbumId)
                                        .set('Accept', 'multipart/form-data')
                                        .field('data', JSON.stringify(galleryImageInfo))
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

                            // Image Gallery image Integration test
                            describe('postGalleryImageInfo()  to save gallery images with access token and gallery image ', function () {
                                it('should return a successfull save message for album ' + _albumName + ' stating gallery image saved successfully', function(done){
                                    request
                                        .post(apiUrlImage + _imageGalleryAlbumId)
                                        .set('Accept', 'multipart/form-data')
                                        .set('x-access-token', accessToken)
                                        .field('data', JSON.stringify(galleryImageInfo))
                                        .attach('imageName', imagePathUrl[0])
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.imageGallery.saveMessageImage);
                                            done();
                                        });
                                });
                            });

                            describe('postGalleryImageInfo()  to save gallery images  with access tokens but without image file ', function () {
                                it('should return a message stating that image must be uploaded.', function(done){
                                    request
                                        .post(apiUrlImage + _imageGalleryAlbumId)
                                        .set('Accept', 'multipart/form-data')
                                        .set('x-access-token', accessToken)
                                        .field('data', JSON.stringify(galleryImageInfo))
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.imageGallery.fieldRequiredImage);
                                            done();
                                        });
                                });
                            });

                            describe('getAllGalleryImagesByAlbumID() to retrieve all the images of album ' + _albumName, function () {
                                it('should return a list of images related to the Album ', function () {
                                    return request
                                        .get(apiUrlImage + _imageGalleryAlbumId)
                                        .set('Accept', 'application/json')
                                        .expect('Content-Type', /json/)
                                        .then(function (res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.have.property("dataList");
                                            expect(res.body.dataList).to.be.instanceof(Array);
                                            expect(res.body.dataList).to.have.length.of.at.least(1);
                                            expect(res.body).to.have.property("totalItems");
                                            expect(res.body.totalItems).to.have.at.least(1);
                                            return Promise.resolve(res.body.dataList[0]);
                                        })
                                        .then(function (resultImageGalleryImageObj) {
                                            var _imageId = resultImageGalleryImageObj._id;
                                            var _imageTitle = resultImageGalleryImageObj.imageTitle;
                                            var _imageName = resultImageGalleryImageObj.imageName;

                                            describe('getGalleryImageInfoByImageID() to retrieve gallery image object for ID ' + _imageId, function () {
                                                it('should return a gallery image object for album ' + _albumName, function(done){
                                                    request
                                                        .get(apiUrlImage + _imageGalleryAlbumId + '/' + _imageId)
                                                        .set('Accept', 'application/json')
                                                        .expect('Content-Type', /json/)
                                                        .then(function(res) {
                                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                            expect(res.body).to.be.an('object');
                                                            expect(res.body).to.have.property("_id");
                                                            expect(res.body._id).to.equal(_imageId);
                                                            expect(res.body).to.have.property("imageTitle");
                                                            expect(res.body.imageTitle).to.equal(_imageTitle);
                                                            done();
                                                        });
                                                });
                                            });

                                            describe('updateGalleryImageInfo() to update existing gallery image data for ID ' + _imageId +' without access tokens', function () {
                                                it('should return a message stating that authentication is failed for album ' + _albumName, function(done){
                                                    request
                                                        .put(apiUrlImage + _imageGalleryAlbumId + '/' + _imageId)
                                                        .set('Accept', 'multipart/form-data')
                                                        .field('data', JSON.stringify(galleryImageInfo))
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

                                            describe('updateGalleryImageInfo()  to update existing gallery image data for ID ' + _imageId, function () {
                                                it('should return a successfull update message for album ' + _albumName + ' stating gallery image updated successfully', function(done){

                                                    var self = this;
                                                    self.validGalleryImageObj = galleryImageInfo;
                                                    self.validGalleryImageObj.imageTitle = "title is updated";
                                                    self.validGalleryImageObj.active = false;

                                                    request
                                                        .put(apiUrlImage + _imageGalleryAlbumId + '/' + _imageId)
                                                        .set('Accept', 'multipart/form-data')
                                                        .set('x-access-token', accessToken)
                                                        .field('data', JSON.stringify(self.validGalleryImageObj))
                                                        .expect('Content-Type', /json/)
                                                        .then(function(res) {
                                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                            expect(res.body).to.be.an('object');
                                                            expect(res.body).to.have.property("message");
                                                            expect(res.body.message).to.equal(apiMessageConfig.imageGallery.updateMessageImage);
                                                            done();
                                                        });
                                                });
                                            });

                                            describe('updateGalleryImageInfo()  to update existing gallery image data for ID ' + _imageId +' with access token and new added image', function () {
                                                it('should return a successfull update message stating gallery image updated successfully', function(done){
                                                    request
                                                        .put(apiUrlImage + _imageGalleryAlbumId + '/' + _imageId)
                                                        .set('Accept', 'multipart/form-data')
                                                        .set('x-access-token', accessToken)
                                                        .field('data', JSON.stringify(galleryImageInfo))
                                                        .attach('imageName', imagePathUrl[0])
                                                        .expect('Content-Type', /json/)
                                                        .then(function(res) {
                                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                            expect(res.body).to.be.an('object');
                                                            expect(res.body).to.have.property("message");
                                                            expect(res.body.message).to.equal(apiMessageConfig.imageGallery.updateMessageImage);
                                                            done();
                                                        });
                                                });
                                            });

                                            describe('getGalleryImageInfoByImageID() to retrieve newly updated gallery image object for ID ' + _imageId + 'after updating data with different image', function () {
                                                it('should return a gallery image object for album ' + _albumName + ' with different values', function(done){
                                                    request
                                                        .get(apiUrlImage + _imageGalleryAlbumId + '/' + _imageId)
                                                        .set('Accept', 'application/json')
                                                        .expect('Content-Type', /json/)
                                                        .then(function(res) {
                                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                            expect(res.body).to.be.an('object');
                                                            expect(res.body).to.have.property("_id");
                                                            expect(res.body._id).to.equal(_imageId);
                                                            expect(res.body).to.have.property("imageName");
                                                            expect(res.body.imageName).to.not.equal(_imageName);
                                                            expect(res.body).to.have.property("active");
                                                            expect(res.body.active).to.equal(false);
                                                            expect(res.body).to.have.property("coverImage");
                                                            expect(res.body.coverImage).to.equal(false);
                                                            done();
                                                        });
                                                });
                                            });



                                            describe('updateGalleryImageInfo() to update existing gallery image information for ID ' + _imageId +'after deleting image and not again uploading image', function () {
                                                it('should return a message stating please upload image', function(done){
                                                    request
                                                        .put(apiUrlImage + _imageGalleryAlbumId + '/' + _imageId + '?imagedeleted=true')
                                                        .set('Accept', 'multipart/form-data')
                                                        .set('x-access-token', accessToken)
                                                        .field('data', JSON.stringify(galleryImageInfo))
                                                        .expect('Content-Type', /json/)
                                                        .then(function(res) {
                                                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                                            expect(res.body).to.be.an('object');
                                                            expect(res.body).to.have.property("message");
                                                            expect(res.body.message).to.equal(apiMessageConfig.imageGallery.fieldRequiredImage);
                                                            done();
                                                        });
                                                });
                                            });


                                            describe('updateCoverImage() to change cover image for album with ID ' + _imageId +' without access tokens', function () {
                                                it('should return a message stating that authentication is failed for album ' + _albumName, function(done){
                                                    var galleryImagePatchData =  {
                                                        coverImage : true
                                                    };
                                                    request
                                                        .patch(apiUrlImage + _imageGalleryAlbumId + '/' + _imageId)
                                                        .set('Accept', 'application/x-www-form-urlencoded')
                                                        .send(galleryImagePatchData)
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

                                            describe('updateCoverImage()  to change cover image for album with  ID ' + _imageId, function () {
                                                it('should return a successfull cover image update message stating cover image updated successfuly for album ' + _albumName, function (done) {
                                                    var galleryImagePatchData = {
                                                        coverImage: true
                                                    };
                                                    request
                                                        .patch(apiUrlImage + _imageGalleryAlbumId + '/' + _imageId)
                                                        .set('Accept', 'application/x-www-form-urlencoded')
                                                        .set('x-access-token', accessToken)
                                                        .send(galleryImagePatchData)
                                                        .expect('Content-Type', /json/)
                                                        .then(function (res) {
                                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                            expect(res.body).to.be.an('object');
                                                            expect(res.body).to.have.property("message");
                                                            expect(res.body.message).to.equal(apiMessageConfig.imageGallery.updateMessageImageCover);
                                                            done();
                                                        });
                                                });
                                            });

                                            describe('removeImage() to delete image  for ID ' + _imageId +' without access token', function () {
                                                it('should return a message that authentication is failed for album ' + _albumName, function(done){
                                                    request
                                                        .delete(apiUrlImage + _imageGalleryAlbumId + '/' + _imageId)
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


                                            //Deleting the image of album

                                            describe('removeImage() to delete image for ID ' + _imageId +' with access token', function () {
                                                it('should return a message stating that cover image cannot be deleted ', function(done){
                                                    request
                                                        .delete(apiUrlImage + _imageGalleryAlbumId + '/' + _imageId)
                                                        .set('x-access-token', accessToken)
                                                        .expect('Content-Type', /json/)
                                                        .then(function(res) {
                                                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                                            expect(res.body).to.be.an('object');
                                                            expect(res.body).to.have.property("message");
                                                            expect(res.body.message).to.equal(apiMessageConfig.imageGallery.coverImageWarning);
                                                            done();
                                                        });
                                                });
                                            });

                                            describe('getGalleryImageInfoByImageID() for ID ' + _imageId + ' to check for cover image', function () {
                                                it('should return an image gallery object with cover image set to true for album  ' + _albumName, function (done) {
                                                    request
                                                        .get(apiUrlImage + _imageGalleryAlbumId + '/' + _imageId)
                                                        .set('Accept', 'application/json')
                                                        .expect('Content-Type', /json/)
                                                        .then(function (res) {
                                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                            expect(res.body).to.be.an('object');
                                                            expect(res.body).to.have.property("coverImage");
                                                            expect(res.body.coverImage).to.equal(true);
                                                            done();
                                                        });
                                                });
                                            });

                                            describe('updateCoverImage()  to change cover image for album with  ID ' + _imageId, function () {
                                                it('should return a successfull cover image update message stating cover image updated successfuly for album ' + _albumName, function () {
                                                    var galleryImagePatchData = {
                                                        coverImage: false
                                                    };
                                                    return request
                                                        .patch(apiUrlImage + _imageGalleryAlbumId + '/' + _imageId)
                                                        .set('Accept', 'application/x-www-form-urlencoded')
                                                        .set('x-access-token', accessToken)
                                                        .send(galleryImagePatchData)
                                                        .expect('Content-Type', /json/)
                                                        .then(function (res) {
                                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                            expect(res.body).to.be.an('object');
                                                            expect(res.body).to.have.property("message");
                                                            expect(res.body.message).to.equal(apiMessageConfig.imageGallery.updateMessageImageCover);
                                                            return Promise.resolve();
                                                        })
                                                        .then(function(){
                                                            //Deleting the image of album

                                                            describe('removeImage() to delete image for ID ' + _imageId +' with access token', function () {
                                                                it('should return a message stating that image deleted successfully', function(){
                                                                    return request
                                                                        .delete(apiUrlImage + _imageGalleryAlbumId + '/' + _imageId)
                                                                        .set('x-access-token', accessToken)
                                                                        .expect('Content-Type', /json/)
                                                                        .then(function(res) {
                                                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                                            expect(res.body).to.be.an('object');
                                                                            expect(res.body).to.have.property("message");
                                                                            expect(res.body.message).to.equal(apiMessageConfig.imageGallery.deleteMessageImage);
                                                                            return Promise.resolve();
                                                                        })
                                                                        .then(function(){
                                                                            describe('getGalleryImageInfoByImageID() for ID ' + _imageId +'  to make sure delted image cannot be returned', function () {
                                                                                it('should return an empty object for album ' + _albumName, function(done){
                                                                                    request
                                                                                        .get(apiUrlImage + _imageGalleryAlbumId + '/' + _imageId)
                                                                                        .set('Accept', 'application/json')
                                                                                        .expect('Content-Type', /json/)
                                                                                        .then(function(res) {
                                                                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                                                            expect(res.body).to.be.an('object');
                                                                                            expect(res.body).to.be.empty;
                                                                                            done();
                                                                                        });
                                                                                });
                                                                            });
                                                                        })
                                                                });
                                                            });
                                                        })
                                                });
                                            });

                                            describe('patchGalleryAlbum to delte gallery album for ID ' + _imageGalleryAlbumId +' with access token ', function () {
                                                it('should return a successfull delete message', function () {

                                                    return request
                                                        .patch(apiUrlAlbum + _imageGalleryAlbumId)
                                                        .set('Accept', 'application/x-www-form-urlencoded')
                                                        .set('x-access-token', accessToken)
                                                        .expect('Content-Type', /json/)
                                                        .then(function (res) {
                                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                            expect(res.body).to.be.an('object');
                                                            expect(res.body).to.have.property("message");
                                                            expect(res.body.message).to.equal(apiMessageConfig.imageGallery.deleteMessageAlbum);
                                                            return Promise.resolve();
                                                        })
                                                        .then(function () {
                                                            describe('getAllGalleryAlbums() after delete', function () {
                                                                it('should only return list with one gallery album ', function (done) {
                                                                    request
                                                                        .get(apiUrlAlbum)
                                                                        .set('Accept', 'application/json')
                                                                        .expect('Content-Type', /json/)
                                                                        .then(function (res) {
                                                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                                            expect(res.body).to.have.property("dataList");
                                                                            expect(res.body.dataList).to.be.instanceof(Array);
                                                                            expect(res.body.dataList).to.have.length.of.at.most(1);
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
                });
            });
        });
    };
})();