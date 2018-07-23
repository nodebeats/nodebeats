(function(){
    "use strict";

    var apiMessageConfig = require('../../lib/configs/api.message.config'),
        Promise = require("bluebird"),
        utilityHelper = require('../../lib/helpers/utilities.helper'),
        HTTPStatus = require('http-status');

    module.exports = function(expect, request, imagePathUrl, accessToken) {

        describe('News Integration test', function(){

            this.timeout(4000);
            var apiUrlNewsCategory = '/api/newscategory/';
            var apiUrlNews = '/api/news/';
            var apiUrlNewsImage = '/api/newsimage/';
            var apiUrlBlogDetail = '/api/newsdetail/';
            var newsInfo;
            var newsCategoryInfo;
            var newsImageInfo;

            beforeEach(function () {
                newsCategoryInfo = {
                    categoryName : "Sports",
                    categoryDescription : "Contains Sports related news",
                    active : true
                };

                newsInfo = {
                    newsTitle : "news title 1",
                    categoryID : "1125698",
                    newsSummary : "summary in news",
                    newsDescription : "detailed news",
                    newsAuthor : "Shrawan Lakhe",
                    newsDate : "2016-05-23",
                    active : true
                };

                newsImageInfo  = {
                    imageTitle : "image title",
                    imageAltText : "image alt text",
                    active : true
                };
            });

            describe('getAllNewsCategory() to retrieve news category list', function () {
                it('should return an empty list of news category', function(done){
                    request
                        .get(apiUrlNewsCategory)
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                            expect(res.body).to.be.empty;
                            done();
                        });
                });
            });


            describe('postNewsCategory() to save news cateogry object without access tokens', function () {
                it('should return a message stating that authentication is failed', function(done){
                    request
                        .post(apiUrlNewsCategory)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .send(newsCategoryInfo)
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

            //News Integration test

            describe('getAllNews() to retrieve list of news', function () {
                it('should return an empty list i.e. no news', function(done){
                    request
                        .get(apiUrlNews)
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


            describe('postNews() to save news data without access tokens', function () {
                it('should return a message stating that authentication is failed', function(done){
                    request
                        .post(apiUrlNews)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .send(newsInfo)
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

            describe('postNewsCategory() to save news category with access tokens ', function () {
                it('should return a successfull save message stating that news category is saved', function(done){
                    request
                        .post(apiUrlNewsCategory)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .send(newsCategoryInfo)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.news.saveMessageNewsCategory);
                            done();
                        });
                });
            });


            describe('postNewsCategory()  to save news category  with access tokens and same title to check for duplicacy', function () {
                it('should return a message stating that News category with same title already exists.', function(done){
                    request
                        .post(apiUrlNewsCategory)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .send(newsCategoryInfo)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.CONFLICT);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.news.alreadyExistsCategory);
                            done();
                        });
                });
            });

            describe('postNewsCategory()  to save news category  with access tokens and same title but different apphabets case ', function () {
                it('should return a message stating that News category with same title already exists.', function(done){
                    var self = this;
                    self.newCategoryObj = newsCategoryInfo;
                    self.newCategoryObj.categoryName = "SPOrts";

                    request
                        .post(apiUrlNewsCategory)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .send(self.newCategoryObj)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.CONFLICT);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.news.alreadyExistsCategory);
                            done();
                        });
                });
            });



            describe('postNewsCategory()   to save news category   with access tokens and invalid data i.e. empty category title', function () {
                it('should return a message stating that news category title is required.', function(done){
                    var self = this;
                    self.invalidNewsCategoryObj = newsCategoryInfo;
                    self.invalidNewsCategoryObj.categoryName = "";
                    request
                        .post(apiUrlNewsCategory)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .send(self.invalidNewsCategoryObj)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.news.fieldRequiredNewsCategory);
                            done();
                        });
                });
            });

            describe('getAllNewsCategory() to retrieve list of news categories', function () {
                it('should return a list of news categories', function(){
                    return request
                        .get(apiUrlNewsCategory)
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                            expect(res.body).to.be.instanceof(Array);
                            expect(res.body).to.have.length.of.at.least(1);
                            return Promise.resolve(res.body[0]);
                        })
                        .then(function(newsCategoryObj){
                            var _newsCategoryId = newsCategoryObj._id;
                            var _newsCategoryName = newsCategoryObj.categoryName;


                            describe('getNewsCategoryInfoByID() to retrieve news category information object for ID ' + _newsCategoryId, function () {
                                it('should return a news category information object', function(done){
                                    request
                                        .get(apiUrlNewsCategory + _newsCategoryId)
                                        .set('Accept', 'application/json')
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("_id");
                                            expect(res.body._id).to.equal(_newsCategoryId);
                                            expect(res.body).to.have.property("categoryName");
                                            expect(res.body.categoryName).to.equal(_newsCategoryName);
                                            done();
                                        });
                                });
                            });

                            describe('updateNewsCategory() to update existing news category information object for ID ' + _newsCategoryId +' without access tokens', function () {
                                it('should return a message stating that authentication is failed', function(done){
                                    request
                                        .put(apiUrlNewsCategory + _newsCategoryId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .send(newsCategoryInfo)
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

                            describe('updateNewsCategory()  to update existing news category information object for ID ' + _newsCategoryId +' with access token', function () {
                                it('should return a successfull update message stating that news category updated successfully', function(done){
                                    var self = this;
                                    self.validNewsCategoryObj = newsCategoryInfo;
                                    self.validNewsCategoryObj.categoryName = "Entertainment";
                                    self.validNewsCategoryObj.active = false;

                                    request
                                        .put(apiUrlNewsCategory + _newsCategoryId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .send(self.validNewsCategoryObj)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.news.updateMessageNewsCategory);
                                            done();
                                        });
                                });
                            });

                            describe('updateNewsCategory()  to update existing news category information object for ID ' + _newsCategoryId +'  with invalid data -  empty category title', function () {
                                it('should return a message stating news category title is required', function(done){
                                    var self = this;
                                    self.invalidNewsCategoryObj = newsCategoryInfo;
                                    self.invalidNewsCategoryObj.categoryName = "";

                                    request
                                        .put(apiUrlNewsCategory + _newsCategoryId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .send(self.invalidNewsCategoryObj)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.news.fieldRequiredNewsCategory);
                                            done();
                                        });
                                });
                            });

                            describe('getAllNewsCategory() to retrieve list of news category with active bit true', function () {
                                it('should return an empty array of news categories', function(done){
                                    request
                                        .get(apiUrlNewsCategory)
                                        .query('active=true')
                                        .set('Accept', 'application/json')
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.empty;
                                            done();
                                        });
                                });
                            });

                            // News Integration test
                            describe('postNews() to save news object with access tokens  and image file', function () {
                                it('should return a successfull save message stating that news is saved successfully', function(done){
                                    request
                                        .post(apiUrlNews)
                                        .set('Accept', 'multipart/form-data')
                                        .set('x-access-token', accessToken)
                                        .field('data', JSON.stringify(newsInfo))
                                        .attach('imageName', imagePathUrl[0])
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.news.saveMessageNews);
                                            done();
                                        });
                                });
                            });

                            describe('postNews()  to save news object access tokens and same title on same date', function () {
                                it('should return a message stating that News with same title already exists.', function(done){
                                    request
                                        .post(apiUrlNews)
                                        .set('Accept', 'multipart/form-data')
                                        .set('x-access-token', accessToken)
                                        .field('data', JSON.stringify(newsInfo))
                                        .attach('imageName', imagePathUrl[0])
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.CONFLICT);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.news.alreadyExistsNews);
                                            done();
                                        });
                                });
                            });

                            describe('postNews()   to save news object with access tokens and different title and and with image file', function () {
                                it('should return a successfull save message stating that  news is saved successfully.', function(done){
                                    var self = this;
                                    self.validNewsObj = newsInfo;
                                    self.validNewsObj.newsTitle = "Manchester United FC for life";
                                    request
                                        .post(apiUrlNews)
                                        .set('Accept', 'multipart/form-data')
                                        .set('x-access-token', accessToken)
                                        .field('data', JSON.stringify(self.validNewsObj))
                                        .attach('imageName', imagePathUrl[0])
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.news.saveMessageNews);
                                            done();
                                        });
                                });
                            });

                            describe('postNews()   to save news object  with invalid data i.e. no news Title, no categoryId, no news detail,  no publication date,  or invalid publication date', function () {

                                afterEach(function () {
                                    newsInfo = {
                                        newsTitle : "news title 1",
                                        categoryID : "1125698",
                                        newsSummary : "summary in news",
                                        newsDescription : "detailed news",
                                        newsAuthor : "Shrawan Lakhe",
                                        newsDate : "2016-05-23",
                                        active : true
                                    };
                                });
                                it('should return a message stating validation error- news title is required for empty news title', function(done){
                                    var self = this;
                                    self.invalidNewsObj = newsInfo;
                                    self.invalidNewsObj.newsTitle = "";
                                    request
                                        .post(apiUrlNews)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .field('data', JSON.stringify(self.invalidNewsObj))
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                            expect(res.error).to.have.property('text');
                                            var errObj = JSON.parse(res.error.text);
                                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.news.validationErrMessage.newsTitle);
                                            done();
                                        });
                                });

                                it('should return a message stating validation error- category ID is required  for empty category ID', function(done){
                                    var self = this;
                                    self.invalidNewsObj = newsInfo;
                                    self.invalidNewsObj.categoryID = "";
                                    request
                                        .post(apiUrlNews)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .field('data', JSON.stringify(self.invalidNewsObj))
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                            expect(res.error).to.have.property('text');
                                            var errObj = JSON.parse(res.error.text);
                                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.news.validationErrMessage.categoryID);
                                            done();
                                        });
                                });

                                it('should return a message stating validation error - news detail is required  for empty news detail', function(done){
                                    var self = this;
                                    self.invalidNewsObj = newsInfo;
                                    self.invalidNewsObj.newsDescription = "";
                                    request
                                        .post(apiUrlNews)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .field('data', JSON.stringify(self.invalidNewsObj))
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                            expect(res.error).to.have.property('text');
                                            var errObj = JSON.parse(res.error.text);
                                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.news.validationErrMessage.newsDescription);
                                            done();
                                        });
                                });

                                it('should return a message stating validation error - news publication date is required for empty news published date', function(done){
                                    var self = this;
                                    self.invalidNewsObj = newsInfo;
                                    self.invalidNewsObj.newsDate = "";
                                    request
                                        .post(apiUrlNews)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .field('data', JSON.stringify(self.invalidNewsObj))
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                            expect(res.error).to.have.property('text');
                                            var errObj = JSON.parse(res.error.text);
                                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.news.validationErrMessage.newsDate);
                                            done();
                                        });
                                });

                                it('should return a message stating validation error - publication date should be a valid date for invalid news publication date', function(done){
                                    var self = this;
                                    self.invalidNewsObj = newsInfo;
                                    self.invalidNewsObj.newsDate = "ytyt";
                                    request
                                        .post(apiUrlNews)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .field('data', JSON.stringify(self.invalidNewsObj))
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                            expect(res.error).to.have.property('text');
                                            var errObj = JSON.parse(res.error.text);
                                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.news.validationErrMessage.newsDateValid);
                                            done();
                                        });
                                });
                            });

                            describe('getAllNews() to retrieve a list of news', function () {
                                it('should return a list of news', function(){
                                    return request
                                        .get(apiUrlNews)
                                        .set('Accept', 'application/json')
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.have.property("dataList");
                                            expect(res.body.dataList).to.be.instanceof(Array);
                                            expect(res.body.dataList).to.have.length.of.at.least(1);
                                            expect(res.body).to.have.property("totalItems");
                                            expect(res.body.totalItems).to.equal(2);
                                            return Promise.resolve(res.body.dataList[1]);
                                        })
                                        .then(function(newsObj){

                                            var _newsId = newsObj._id;
                                            var _newsTitle = newsObj.newsTitle;
                                            var _coverImageId = newsObj.image[0]._id;
                                            var addedOnDateFormat = utilityHelper.getFormattedDate(new Date(newsObj.addedOn), '/', '');
                                            var newsUrlSlog = newsObj.urlSlog;

                                            //News Detail List

                                            describe('getNewsDetailByTitleSlog() to retrieve news detailed information', function () {
                                                it('should return a a news article with all the available information', function (done) {
                                                    request
                                                        .get(apiUrlBlogDetail + addedOnDateFormat + '/' + newsUrlSlog)
                                                        .set('Accept', 'application/json')
                                                        .expect('Content-Type', /json/)
                                                        .then(function (res) {
                                                            expect(res.body).to.be.an('object');
                                                            expect(res.body).to.have.property("urlSlog");
                                                            expect(res.body.urlSlog).to.equal(newsUrlSlog);
                                                            done();
                                                        });
                                                });
                                            });


                                            describe('getNewsByID() to retrieve news information object for ID ' + _newsId, function () {
                                                it('should return a news information object', function(done){
                                                    request
                                                        .get(apiUrlNews + _newsId)
                                                        .set('Accept', 'application/json')
                                                        .expect('Content-Type', /json/)
                                                        .then(function(res) {
                                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                            expect(res.body).to.be.an('object');
                                                            expect(res.body).to.have.property("_id");
                                                            expect(res.body._id).to.equal(_newsId);
                                                            expect(res.body).to.have.property("newsTitle");
                                                            expect(res.body.newsTitle).to.equal(_newsTitle);
                                                            done();
                                                        });
                                                });
                                            });

                                            describe('updateNews() to update existing news information object for ID ' + _newsId +' without access tokens', function () {
                                                it('should return a message stating that authentication is failed', function(done){
                                                    request
                                                        .put(apiUrlNews + _newsId)
                                                        .set('Accept', 'multipart/form-data')
                                                        .field('data', JSON.stringify(newsInfo))
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

                                            describe('updateNews()  to update existing news information object for ID ' + _newsId +' with access token and no image', function () {
                                                it('should return a successfull update message', function(done){
                                                    var self = this;
                                                    self.validNewsObj = newsInfo;
                                                    self.validNewsObj.newsTitle = "updating news title to United  FC";
                                                    self.validNewsObj.newsDescription = "updating news detail content ... in progress";
                                                    self.validNewsObj.active = false;

                                                    request
                                                        .put(apiUrlNews + _newsId)
                                                        .set('Accept', 'multipart/form-data')
                                                        .set('x-access-token', accessToken)
                                                        .field('data', JSON.stringify(self.validNewsObj))
                                                        .expect('Content-Type', /json/)
                                                        .then(function(res) {
                                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                            expect(res.body).to.be.an('object');
                                                            expect(res.body).to.have.property("message");
                                                            expect(res.body.message).to.equal(apiMessageConfig.news.updateMessageNews);
                                                            done();
                                                        });
                                                });
                                            });

                                            describe('updateNews()  to update existing news information object for ID ' + _newsId +' with access token and with image', function () {
                                                it('should return a successfull update message', function(done){
                                                    var self = this;
                                                    self.validNewsObj = newsInfo;
                                                    self.validNewsObj.newsTitle = "updating news title to United  FC blah";

                                                    request
                                                        .put(apiUrlNews + _newsId)
                                                        .set('Accept', 'multipart/form-data')
                                                        .set('x-access-token', accessToken)
                                                        .field('data', JSON.stringify(self.validNewsObj))
                                                        .attach('imageName', imagePathUrl[1])
                                                        .expect('Content-Type', /json/)
                                                        .then(function(res) {
                                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                            expect(res.body).to.be.an('object');
                                                            expect(res.body).to.have.property("message");
                                                            expect(res.body.message).to.equal(apiMessageConfig.news.updateMessageNews);
                                                            done();
                                                        });
                                                });
                                            });

                                            describe('updateNews()  to update existing news information object for ID ' + _newsId +' with access token and with image and already saved title', function () {
                                                it('should return a message stating that news with same title already exists', function(done){
                                                    var self = this;
                                                    self.invalidNewsObj = newsInfo;
                                                    self.invalidNewsObj.newsTitle = "Manchester United FC for life";

                                                    request
                                                        .put(apiUrlNews + _newsId)
                                                        .set('Accept', 'multipart/form-data')
                                                        .set('x-access-token', accessToken)
                                                        .field('data', JSON.stringify(newsInfo))
                                                        .attach('imageName', imagePathUrl[1])
                                                        .expect('Content-Type', /json/)
                                                        .then(function(res) {
                                                            expect(res.statusCode).to.equal(HTTPStatus.CONFLICT);
                                                            expect(res.body).to.be.an('object');
                                                            expect(res.body).to.have.property("message");
                                                            expect(res.body.message).to.equal(apiMessageConfig.news.alreadyExistsNews);
                                                            done();
                                                        });
                                                });
                                            });

                                            describe('updateNews()  to update existing news information object with invalid data i.e. no news Title, no categoryId, no news detail,  no publication date,  or invalid publication date', function () {

                                                afterEach(function () {
                                                    newsInfo = {
                                                        newsTitle : "news title 1",
                                                        categoryID : "1125698",
                                                        newsSummary : "summary in news",
                                                        newsDescription : "detailed news",
                                                        newsAuthor : "Shrawan Lakhe",
                                                        newsDate : "2016-05-23",
                                                        active : true
                                                    };
                                                });

                                                it('should return a message stating validation error with different error messages', function(done){
                                                    var self = this;
                                                    self.invalidNewsObj = newsInfo;
                                                    self.invalidNewsObj.newsTitle = "";
                                                    self.invalidNewsObj.categoryID = "";
                                                    self.invalidNewsObj.newsDescription = "";
                                                    self.invalidNewsObj.newsDate = "";
                                                    request
                                                        .put(apiUrlNews + _newsId)
                                                        .set('Accept', 'application/x-www-form-urlencoded')
                                                        .set('x-access-token', accessToken)
                                                        .field('data', JSON.stringify(self.invalidNewsObj))
                                                        .expect('Content-Type', /json/)
                                                        .then(function(res) {
                                                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                                            expect(res.error).to.have.property('text');
                                                            var errObj = JSON.parse(res.error.text);
                                                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.news.validationErrMessage.newsTitle);
                                                            expect(errObj.message[1].msg).to.have.string(apiMessageConfig.news.validationErrMessage.categoryID);
                                                            expect(errObj.message[2].msg).to.have.string(apiMessageConfig.news.validationErrMessage.newsDescription);
                                                            expect(errObj.message[3].msg).to.have.string(apiMessageConfig.news.validationErrMessage.newsDate);

                                                            done();
                                                        });
                                                });
                                            });

                                            describe('getAllNews() to retrieve list of news with active bit true', function () {
                                                it('should return a single list of news array as response ignoring data records with active bit false', function(done){
                                                    request
                                                        .get(apiUrlNews)
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




                                            //News Image Integration test

                                            describe('getAllNewsImagesByNewsID to retrieve news related images  for news id ' + _newsId, function () {
                                                it('should return an image list related to the news', function(done){
                                                    request
                                                        .get(apiUrlNewsImage + _newsId)
                                                        .set('Accept', 'application/json')
                                                        .expect('Content-Type', /json/)
                                                        .then(function(res) {
                                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                            expect(res.body).to.be.an('object');
                                                            expect(res.body).to.have.property("image");
                                                            expect(res.body.image).to.be.instanceof(Array);
                                                            expect(res.body.image).to.have.length.of.at.least(1);
                                                            done();
                                                        });
                                                });
                                            });


                                            describe('postNewsImageInfo() to save related images to the news for news id ' + _newsId + ' without access tokens', function () {
                                                it('should return a message stating that authentication is failed', function(done){
                                                    request
                                                        .post(apiUrlNewsImage + _newsId)
                                                        .set('Accept', 'multipart/form-data')
                                                        .field('data', JSON.stringify(newsImageInfo))
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

                                            describe('postNewsImageInfo()  to save related images to the news with access tokens and image file', function () {
                                                it('should return a successfull save message stating news image is saved successfully', function(done){
                                                    request
                                                        .post(apiUrlNewsImage + _newsId)
                                                        .set('Accept', 'multipart/form-data')
                                                        .set('x-access-token', accessToken)
                                                        .field('data', JSON.stringify(newsImageInfo))
                                                        .attach('imageName', imagePathUrl[1])
                                                        .expect('Content-Type', /json/)
                                                        .then(function(res) {
                                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                            expect(res.body).to.be.an('object');
                                                            expect(res.body).to.have.property("message");
                                                            expect(res.body.message).to.equal(apiMessageConfig.news.saveMessageNewsImage);
                                                            done();
                                                        });
                                                });
                                            });


                                            describe('postNewsImageInfo()  to save related images to the news with access tokens but without image file', function () {
                                                it('should return a message stating that please upload image.', function(done){
                                                    request
                                                        .post(apiUrlNewsImage + _newsId)
                                                        .set('Accept', 'multipart/form-data')
                                                        .set('x-access-token', accessToken)
                                                        .field('data', JSON.stringify(newsImageInfo))
                                                        .expect('Content-Type', /json/)
                                                        .then(function(res) {
                                                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                                            expect(res.body).to.be.an('object');
                                                            expect(res.body).to.have.property("message");
                                                            expect(res.body.message).to.equal(apiMessageConfig.news.fieldRequiredNewsImage);
                                                            done();
                                                        });
                                                });
                                            });

                                            describe('getAllNewsImagesByNewsID() to retrieve news related images for news id ' + _newsId, function () {
                                                it('should return a list of images for news', function(){
                                                    return request
                                                        .get(apiUrlNewsImage + _newsId)
                                                        .set('Accept', 'application/json')
                                                        .expect('Content-Type', /json/)
                                                        .then(function(res) {
                                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                            expect(res.body).to.be.an('object');
                                                            expect(res.body).to.have.property("image");
                                                            expect(res.body.image).to.be.instanceof(Array);
                                                            expect(res.body.image).to.have.length.of.at.least(2);
                                                            return Promise.resolve(res.body.image[0]);
                                                        })
                                                        .then(function(newsImageObj){
                                                            var _newsImageId = newsImageObj._id;
                                                            var _imageName = newsImageObj.imageName;

                                                            describe('getNewsImageInfoByImageID() to retrieve news related image information object for image ID ' + _newsImageId, function () {
                                                                it('should return a news image information object', function(done){
                                                                    request
                                                                        .get(apiUrlNewsImage + _newsId + '/' + _newsImageId)
                                                                        .set('Accept', 'application/json')
                                                                        .expect('Content-Type', /json/)
                                                                        .then(function(res) {
                                                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                                            expect(res.body).to.be.an('object');
                                                                            expect(res.body).to.have.property("_id");
                                                                            expect(res.body._id).to.equal(_newsImageId);
                                                                            expect(res.body).to.have.property("imageName");
                                                                            expect(res.body.imageName).to.equal(_imageName);
                                                                            done();
                                                                        });
                                                                });
                                                            });

                                                            describe('updateNewsImageInfo() to update existing news related image object for image ID ' + _newsImageId +' without access tokens', function () {
                                                                it('should return a message stating that authentication is failed', function(done){
                                                                    request
                                                                        .put(apiUrlNewsImage + _newsId + '/' + _newsImageId)
                                                                        .set('Accept', 'multipart/form-data')
                                                                        .field('data', JSON.stringify(newsImageInfo))
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

                                                            describe('updateNewsImageInfo()  to update existing news related image object for image ID ' + _newsImageId +' with access token', function () {
                                                                it('should return a successfull update message stating that news image is updated successfully', function(done){
                                                                    request
                                                                        .put(apiUrlNewsImage + _newsId + '/' + _newsImageId)
                                                                        .set('Accept', 'multipart/form-data')
                                                                        .set('x-access-token', accessToken)
                                                                        .field('data', JSON.stringify(newsImageInfo))
                                                                        .attach('imageName', imagePathUrl[0])
                                                                        .expect('Content-Type', /json/)
                                                                        .then(function(res) {
                                                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                                            expect(res.body).to.be.an('object');
                                                                            expect(res.body).to.have.property("message");
                                                                            expect(res.body.message).to.equal(apiMessageConfig.news.updateMessageNewsImage);
                                                                            done();
                                                                        });
                                                                });
                                                            });



                                                            describe('updateNewsImageInfo()   to update existing news related image object for image ID ' + _newsImageId +' without image file', function () {
                                                                it('should return a successfull update message stating that image is updated successfully', function(done){
                                                                    var self = this;
                                                                    self.validNewsImageObj = newsImageInfo;
                                                                    self.validNewsImageObj.imageAltText = "this is the updated alternative text";
                                                                    self.validNewsImageObj.active = false;

                                                                    request
                                                                        .put(apiUrlNewsImage + _newsId + '/' + _newsImageId)
                                                                        .set('Accept', 'multipart/form-data')
                                                                        .set('x-access-token', accessToken)
                                                                        .field('data', JSON.stringify(self.validNewsImageObj))
                                                                        .expect('Content-Type', /json/)
                                                                        .then(function(res) {
                                                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                                            expect(res.body).to.be.an('object');
                                                                            expect(res.body).to.have.property("message");
                                                                            expect(res.body.message).to.equal(apiMessageConfig.news.updateMessageNewsImage);
                                                                            done();
                                                                        });
                                                                });
                                                            });

                                                            describe('getAllNewsImagesByNewsID() to retrieve list of images for news with image ID ' + _newsImageId +'  and  with active bit true', function () {
                                                                it('should return an image list with active bit true only', function(done){
                                                                    request
                                                                        .get(apiUrlNewsImage + _newsId)
                                                                        .query('active=true')
                                                                        .set('Accept', 'application/json')
                                                                        .expect('Content-Type', /json/)
                                                                        .then(function(res) {
                                                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                                            expect(res.body).to.be.an('object');
                                                                            expect(res.body).to.have.property("image");
                                                                            expect(res.body.image).to.be.instanceof(Array);
                                                                            expect(res.body.image).to.have.length.of.at.least(1);
                                                                            expect(res.body.image[0].active).to.equal(true);
                                                                            done();
                                                                        });
                                                                });
                                                            });

                                                            describe('updateCoverImage() to change cover image of news for image ID ' + _newsImageId +' without access tokens', function () {
                                                                it('should return a message stating that authentication is failed', function(done){
                                                                    var newsImagePatchData =  {
                                                                        coverImage : true
                                                                    };
                                                                    request
                                                                        .patch(apiUrlNewsImage + _newsId + '/' + _newsImageId)
                                                                        .set('Accept', 'application/x-www-form-urlencoded')
                                                                        .send(newsImagePatchData)
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

                                                            describe('updateCoverImage() to change cover image of news  for image ID ' + _newsImageId +' with access token ', function () {
                                                                it('should return a successfull  message stating that  cover image updated successfully', function(done){
                                                                    var newsImagePatchData =  {
                                                                        coverImage : true,
                                                                        _id : _newsImageId
                                                                    };
                                                                    request
                                                                        .patch(apiUrlNewsImage + _newsId + '/' + _coverImageId)
                                                                        .set('Accept', 'application/x-www-form-urlencoded')
                                                                        .set('x-access-token', accessToken)
                                                                        .send(newsImagePatchData)
                                                                        .expect('Content-Type', /json/)
                                                                        .then(function(res) {
                                                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                                            expect(res.body).to.be.an('object');
                                                                            expect(res.body).to.have.property("message");
                                                                            expect(res.body.message).to.equal(apiMessageConfig.news.updateCoverImage);

                                                                            done();
                                                                        });
                                                                });
                                                            });


                                                            describe('getNewsImageInfoByImageID() to retrieve news image object for image ID ' + _newsImageId + ' after updating cover image to image with id ' + _newsImageId, function () {
                                                                it('should return a news image information object', function(done){
                                                                    request
                                                                        .get(apiUrlNewsImage + _newsId + '/' + _newsImageId)
                                                                        .set('Accept', 'application/json')
                                                                        .expect('Content-Type', /json/)
                                                                        .then(function(res) {
                                                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                                            expect(res.body).to.be.an('object');
                                                                            expect(res.body).to.have.property("coverImage");
                                                                            expect(res.body.coverImage).to.equal(true);
                                                                            done();
                                                                        });
                                                                });
                                                            });

                                                            describe('removeNewsImage() to delete news image from the collection for image ID ' + _newsImageId +'  without access tokens', function () {
                                                                it('should return a message stating that authentication is failed', function(done){
                                                                    request
                                                                        .delete(apiUrlNewsImage + _newsId + '/' + _newsImageId)
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

                                                            describe('removeNewsImage()  to delete news image from the collection  for image ID ' + _newsImageId +' with access token and image not having coverImage field set to true', function () {
                                                                it('should return a successfull delete message', function(done){
                                                                    var _imageId = _coverImageId;//here coverImageId because before updating cover image using api update operation
                                                                                                 // the images associated with this id is cover image
                                                                    request
                                                                        .delete(apiUrlNewsImage + _newsId + '/' + _imageId)
                                                                        .set('Accept', 'application/x-www-form-urlencoded')
                                                                        .set('x-access-token', accessToken)
                                                                        .expect('Content-Type', /json/)
                                                                        .then(function(res) {
                                                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                                            expect(res.body).to.be.an('object');
                                                                            expect(res.body).to.have.property("message");
                                                                            expect(res.body.message).to.equal(apiMessageConfig.news.deleteMessageNewsImage);
                                                                            done();
                                                                        });
                                                                });
                                                            });


                                                            describe('removeNewsImage()  to delete news image for image ID ' + _newsImageId +'  remove cover image with access token', function () {
                                                                it('should return a message that cover image cannot be deleted', function(done){

                                                                    var _coverImageIdAfterUpdateOperation = _newsImageId;//after update operation, the news image related to this id is cover image
                                                                    request
                                                                        .delete(apiUrlNewsImage + _newsId + '/' + _coverImageIdAfterUpdateOperation)
                                                                        .set('Accept', 'application/x-www-form-urlencoded')
                                                                        .set('x-access-token', accessToken)
                                                                        .expect('Content-Type', /json/)
                                                                        .then(function(res) {
                                                                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                                                            expect(res.body).to.be.an('object');
                                                                            expect(res.body).to.have.property("message");
                                                                            expect(res.body.message).to.equal(apiMessageConfig.news.coverImageWarning);
                                                                            done();
                                                                        });
                                                                });
                                                            });

                                                            //News deletion integration test


                                                            describe('patchNews() to delete news for ID ' + _newsId +'  without access tokens ', function () {
                                                                it('should return a message stating that authentication is failed', function(done){

                                                                    request
                                                                        .patch(apiUrlNews + _newsId)
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

                                                            describe('patchNews()  to delete news  for ID ' + _newsId + ' with access token', function () {
                                                                it('should return a successfull delete message stating news deleted successfully', function(){

                                                                    return request
                                                                        .patch(apiUrlNews + _newsId)
                                                                        .set('Accept', 'application/x-www-form-urlencoded')
                                                                        .set('x-access-token', accessToken)
                                                                        .expect('Content-Type', /json/)
                                                                        .then(function(res) {
                                                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                                            expect(res.body).to.be.an('object');
                                                                            expect(res.body).to.have.property("message");
                                                                            expect(res.body.message).to.equal(apiMessageConfig.news.deleteMessageNews);
                                                                            return Promise.resolve();
                                                                        })
                                                                        .then(function () {
                                                                            describe('getAllNews() to retrieve news list after delete of one record', function () {
                                                                                it('should  return only a single news record in  list', function(done){
                                                                                    request
                                                                                        .get(apiUrlNews)
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

                                                                            //deletion of news category

                                                                            describe('patchNewsCategory() to delete news category for ID ' + _newsCategoryId +' without access tokens', function () {
                                                                                it('should return a message stating that authentication is failed', function(done){

                                                                                    request
                                                                                        .patch(apiUrlNewsCategory + _newsCategoryId)
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

                                                                            describe('patchNewsCategory() to delete news category for ID ' + _newsCategoryId +' with access token to delete news category', function () {
                                                                                it('should return a successfull delete message stating news category deleted successfully', function(){

                                                                                    return request
                                                                                        .patch(apiUrlNewsCategory + _newsCategoryId)
                                                                                        .set('Accept', 'application/x-www-form-urlencoded')
                                                                                        .set('x-access-token', accessToken)
                                                                                        .expect('Content-Type', /json/)
                                                                                        .then(function(res) {
                                                                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                                                            expect(res.body).to.be.an('object');
                                                                                            expect(res.body).to.have.property("message");
                                                                                            expect(res.body.message).to.equal(apiMessageConfig.news.deleteMessageNewsCategory);
                                                                                            return Promise.resolve();
                                                                                        })
                                                                                        .then(function () {
                                                                                            describe('getAllNewsCategory() after deletion of record', function () {
                                                                                                it('should not return a list of news category', function(done){
                                                                                                    request
                                                                                                        .get(apiUrlNewsCategory)
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