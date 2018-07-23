(function(){
    "use strict";

    var apiMessageConfig = require('../../lib/configs/api.message.config'),
        Promise = require("bluebird"),
        utilityHelper = require('../../lib/helpers/utilities.helper'),
        HTTPStatus = require('http-status');

    module.exports = function(expect, request, imagePathUrl, documentPathUrl, accessToken) {

        describe('Blog  Integration test', function(){

            this.timeout(4000);
            var apiUrlBlogCategory = '/api/blogcategory/';
            var apiUrlBlog = '/api/blog/';
            var apiUrlBlogDocument = '/api/blogdocument/';
            var apiUrlBlogSeoMetaTag = '/api/blogseo/';
            var apiUrlBlogTag = '/api/blogtag/';
            var apiUrlFilterTag = '/api/filter/blogtag/';
            var apiUrlFilterCategory = '/api/filter/blogcategory/';
            var apiUrlBlogDetail = '/api/blogdetail/';
            var blogInfo;
            var blogCategoryInfo;
            var blogDocumentInfo;
            var blogSeoMetaInfo;

            beforeEach(function () {
                blogCategoryInfo = {
                    categoryName : "Technology",
                    categoryDescription : "Contains articles related to the technology",
                    active : true
                };

                blogInfo = {
                    blogTitle : "blog title 1",
                    categoryId : "1125698",
                    blogSummary : "summary in blog",
                    blogDescription : "detailed blog",
                    tags : "Soccer, Manchester United, Football, UEFA, FIFA",
                    bannerImageTitle : "football pic",
                    bannerImageAltText : "manchester united pre-season finale",
                    author : "shrawan lakhe",
                    active : true
                };

                blogDocumentInfo  = {
                    documentTitle : "doc title",
                    active : true
                };

                blogSeoMetaInfo = {
                    metaKeyword : 'FIFA, Manchester United, UEFA',
                    titleTag : 'time to change uefa structure',
                    metaDescription : 'detail comes later',
                    metaAuthor : 'shrawan'
                };

            });

            describe('getBlogCategories() to retrieve blog categories', function () {
                it('should return an empty list of blog category for the first time', function(done){
                    request
                        .get(apiUrlBlogCategory)
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

            describe('getAllBlogTags()  to retrieve blog tags', function () {
                it('should return an empty list of blog related tags', function(done){
                    request
                        .get(apiUrlBlogTag)
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


            describe('postBlogCategory() to save blog category without access tokens', function () {
                it('should return a message stating that authentication is failed', function(done){
                    request
                        .post(apiUrlBlogCategory)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .send(blogCategoryInfo)
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

            //Blog Integration test

            describe('getAllBlogArticles()  to retrieve blog articles', function () {
                it('should return an empty list of blog articles for the first time', function(done){
                    request
                        .get(apiUrlBlog)
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


            describe('postBlogArticle() to save blog article without access tokens', function () {
                it('should return a message stating that authentication is failed', function(done){
                    request
                        .post(apiUrlBlog)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .send(blogInfo)
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



            describe('postBlogCategory() to save blog category with access tokens ', function () {
                it('should return a successfull save message stating that blog category is saved', function(done){
                    request
                        .post(apiUrlBlogCategory)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .send(blogCategoryInfo)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.blog.saveMessageCategory);
                            done();
                        });
                });
            });


            describe('postBlogCategory() to save blog category with access tokens and same blog category title ', function () {
                it('should return a message stating that Blog category with same title already exists.', function(done){
                    request
                        .post(apiUrlBlogCategory)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .send(blogCategoryInfo)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.CONFLICT);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.blog.alreadyExistsCategory);
                            done();
                        });
                });
            });

            describe('postBlogCategory() to save blog category with access tokens and same category title but different alphabets case ', function () {
                it('should return a message stating that Blog category with same title already exists.', function(done){
                    var self = this;
                    self.newBlogCategoryObj = blogCategoryInfo;
                    self.newBlogCategoryObj.categoryName = "TECHNOLOGY";

                    request
                        .post(apiUrlBlogCategory)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .send(self.newBlogCategoryObj)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.CONFLICT);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.blog.alreadyExistsCategory);
                            done();
                        });
                });
            });



            describe('postBlogCategory() to save blog category  with access tokens and invalid data i.e. empty blog category title', function () {
                it('should return a message stating that blog category title is required.', function(done){
                    var self = this;
                    self.invalidBlogCategoryObj = blogCategoryInfo;
                    self.invalidBlogCategoryObj.categoryName = "";
                    request
                        .post(apiUrlBlogCategory)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .send(self.invalidBlogCategoryObj)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.blog.fieldRequiredCategory);
                            done();
                        });
                });
            });
            describe('getBlogCategories() to retrieve list of blog categories', function () {
                it('should return a list of blog categories', function(){
                    return request
                        .get(apiUrlBlogCategory)
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
                        .then(function(blogCategoryObj){
                            var _blogCategoryId = blogCategoryObj._id;
                            blogInfo.categoryId = _blogCategoryId;
                            var _blogCategoryName = blogCategoryObj.categoryName;

                            describe('getBlogCategoryByID() to retrieve blog category object for category ID ' + _blogCategoryId, function () {
                                it('should return a blog category information object', function(done){
                                    request
                                        .get(apiUrlBlogCategory + _blogCategoryId)
                                        .set('Accept', 'application/json')
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("_id");
                                            expect(res.body._id).to.equal(_blogCategoryId);
                                            expect(res.body).to.have.property("categoryName");
                                            expect(res.body.categoryName).to.equal(_blogCategoryName);
                                            done();
                                        });
                                });
                            });

                            describe('updateBlogCategory() to update blog category information  for category ID ' + _blogCategoryId +' without access tokens', function () {
                                it('should return a message stating that authentication is failed', function(done){
                                    request
                                        .put(apiUrlBlogCategory + _blogCategoryId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .send(blogCategoryInfo)
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

                            describe('updateBlogCategory()  to update blog category information  for category ID ' + _blogCategoryId +' with access token', function () {
                                it('should return a successfull update message stating that blog category updated successfully', function(done){
                                    var self = this;
                                    self.validBlogCategoryObj = blogCategoryInfo;
                                    self.validBlogCategoryObj.categoryName = "Entertainment";
                                    self.validBlogCategoryObj.active = false;

                                    request
                                        .put(apiUrlBlogCategory + _blogCategoryId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .send(self.validBlogCategoryObj)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.blog.updateMessageCategory);
                                            done();
                                        });
                                });
                            });

                            describe('updateBlogCategory() to update blog category information   for category ID ' + _blogCategoryId +'  with invalid data -  empty category title', function () {
                                it('should return a message stating blog category title is required', function(done){
                                    var self = this;
                                    self.invalidBlogCategoryObj = blogCategoryInfo;
                                    self.invalidBlogCategoryObj.categoryName = "";

                                    request
                                        .put(apiUrlBlogCategory + _blogCategoryId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .send(self.invalidBlogCategoryObj)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.blog.fieldRequiredCategory);
                                            done();
                                        });
                                });
                            });

                            describe('getBlogCategories() to retrieve list of blog categories with active bit true', function () {
                                it('should return an empty array of blog categories', function(done){
                                    request
                                        .get(apiUrlBlogCategory)
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


                            // Blog Integration test
                            describe('postBlogArticle() to save blog article with access tokens  and image file', function () {
                                it('should return a successfull save message stating that blog is saved successfully', function(done){
                                    request
                                        .post(apiUrlBlog)
                                        .set('Accept', 'multipart/form-data')
                                        .set('x-access-token', accessToken)
                                        .field('data', JSON.stringify(blogInfo))
                                        .attach('imageName', imagePathUrl[0])
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.blog.saveMessageBlog);
                                            done();
                                        });
                                });
                            });

                            describe('postBlogArticle() to save blog article  with access tokens and same title', function () {
                                it('should return a message stating that Blog with same title already exists.', function(done){
                                    request
                                        .post(apiUrlBlog)
                                        .set('Accept', 'multipart/form-data')
                                        .set('x-access-token', accessToken)
                                        .field('data', JSON.stringify(blogInfo))
                                        .attach('imageName', imagePathUrl[0])
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.CONFLICT);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.blog.alreadyExistsBlog);
                                            done();
                                        });
                                });
                            });

                            describe('postBlogArticle() to save blog article  with access tokens and different title and without image file', function () {
                                it('should return a successfull save message stating that  blog is saved successfully.', function(done){
                                    var self = this;
                                    self.validBlogObj = blogInfo;
                                    self.validBlogObj.blogTitle = "Manchester United FC for life";
                                    request
                                        .post(apiUrlBlog)
                                        .set('Accept', 'multipart/form-data')
                                        .set('x-access-token', accessToken)
                                        .field('data', JSON.stringify(self.validBlogObj))
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.blog.saveMessageBlog);
                                            done();
                                        });
                                });
                            });

                            describe('postBlogArticle() to save blog article  with invalid data i.e. no blog Title, n no blog detail and  no author', function () {

                                afterEach(function () {
                                    blogInfo = {
                                        blogTitle : "blog title 1",
                                        blogSummary : "summary in blog",
                                        blogDescription : "detailed blog",
                                        tags : "Soccer, Manchester United, Football, UEFA, FIFA",
                                        bannerImageTitle : "football pic",
                                        bannerImageAltText : "manchester united pre-season finale",
                                        author : "1125698",
                                        active : true
                                    };
                                });
                                it('should return a message stating validation error- blog title is required for empty blog title', function(done){
                                    var self = this;
                                    self.invalidBlogObj = blogInfo;
                                    self.invalidBlogObj.blogTitle = "";
                                    request
                                        .post(apiUrlBlog)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .field('data', JSON.stringify(self.invalidBlogObj))
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                            expect(res.error).to.have.property('text');
                                            var errObj = JSON.parse(res.error.text);
                                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.blog.validationErrMessage.blogTitle);
                                            done();
                                        });
                                });

                                it('should return a message stating validation error- blog detail is required for empty blog detail', function(done){
                                    var self = this;
                                    self.invalidBlogObj = blogInfo;
                                    self.invalidBlogObj.blogDescription = "";
                                    request
                                        .post(apiUrlBlog)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .field('data', JSON.stringify(self.invalidBlogObj))
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                            expect(res.error).to.have.property('text');
                                            var errObj = JSON.parse(res.error.text);
                                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.blog.validationErrMessage.blogDescription);
                                            done();
                                        });
                                });

                                it('should return a message stating validation error - blog author is required for empty blog author', function(done){
                                    var self = this;
                                    self.invalidBlogObj = blogInfo;
                                    self.invalidBlogObj.author = "";
                                    request
                                        .post(apiUrlBlog)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .field('data', JSON.stringify(self.invalidBlogObj))
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                            expect(res.error).to.have.property('text');
                                            var errObj = JSON.parse(res.error.text);
                                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.blog.validationErrMessage.author);
                                            done();
                                        });
                                });
                            });


                            describe('getAllBlogArticles() to retrieve list of blog articles', function () {
                                it('should return a list of blog articles', function(){
                                    return request
                                        .get(apiUrlBlog)
                                        .set('Accept', 'application/json')
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.have.property("dataList");
                                            expect(res.body.dataList).to.be.instanceof(Array);
                                            expect(res.body.dataList).to.have.length.of.at.least(2);
                                            expect(res.body).to.have.property("totalItems");
                                            expect(res.body.totalItems).to.equal(2);
                                            return Promise.resolve(res.body.dataList[0]);
                                        })
                                        .then(function(blogArticleObj){
                                            var _blogId = blogArticleObj._id;
                                            var _blogTitle = blogArticleObj.blogTitle;
                                            var _seoMetaTagId = blogArticleObj.seoEntry._id;

                                            var addedOnDateFormat = utilityHelper.getFormattedDate(new Date(blogArticleObj.addedOn), '/', '');
                                            var blogUrlSlog = blogArticleObj.urlSlog;

                                            //Blog Detail List




                                            describe('getBlogDetailByUrlSlog() to retrieve blog detailed information', function () {
                                                it('should return a a blog article with all the available information', function (done) {
                                                    request
                                                        .get(apiUrlBlogDetail + addedOnDateFormat + '/' + blogUrlSlog)
                                                        .set('Accept', 'application/json')
                                                        .expect('Content-Type', /json/)
                                                        .then(function (res) {
                                                            expect(res.body).to.be.an('object');
                                                            expect(res.body).to.have.property("data");
                                                            expect(res.body.data).to.have.property("status");
                                                            expect(res.body.data.status).to.equal('active');
                                                            expect(res.body.data).to.have.property("active");
                                                            expect(res.body.data.active).to.equal(true);
                                                            expect(res.body.data).to.have.property("articleViews");
                                                            expect(res.body.data.articleViews).to.equal(1);
                                                            expect(res.body.data).to.have.property("urlSlog");
                                                            expect(res.body.data.urlSlog).to.equal(blogUrlSlog);
                                                            expect(res.body).to.have.property("doclist");
                                                            expect(res.body.doclist).to.be.instanceof(Array);
                                                            done();
                                                        });
                                                });
                                            });

                                            //Blog Tag Get List

                                            describe('getAllBlogTags() to retrieve all the blog tags of the blogs', function () {
                                                it('should return a list of blog tags', function(){
                                                    return request
                                                        .get(apiUrlBlogTag)
                                                        .set('Accept', 'application/json')
                                                        .expect('Content-Type', /json/)
                                                        .then(function(res) {
                                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                            expect(res.body).to.be.instanceof(Array);
                                                            expect(res.body).to.have.length.of.at.least(5);
                                                            return Promise.resolve(res.body[0]);
                                                        })
                                                        .then(function(tagObj){
                                                            var _tagName = tagObj.tag;

                                                            describe('getBlogByTag() to get list of blog articles according to tag ' + _tagName, function () {
                                                                it('should return a list of blog articles related to that tag', function(done){
                                                                    request
                                                                        .get(apiUrlFilterTag + _tagName)
                                                                        .set('Accept', 'application/json')
                                                                        .expect('Content-Type', /json/)
                                                                        .then(function(res) {
                                                                            expect(res.body).to.be.an('object');
                                                                            expect(res.body.dataList).to.be.instanceof(Array);
                                                                            expect(res.body.dataList).to.have.length.of.at.least(1);
                                                                            done();
                                                                        });
                                                                });
                                                            });

                                                            describe('getBlogByTag() to filter blogs according to blog tag that is not in the collection  ', function () {
                                                                it('should not return a list of blog articles related to that tag .i.e empty data list', function(done){
                                                                    request
                                                                        .get(apiUrlFilterTag + 'chilleini')
                                                                        .set('Accept', 'application/json')
                                                                        .expect('Content-Type', /json/)
                                                                        .then(function(res) {
                                                                            expect(res.body).to.be.instanceof(Array);
                                                                            expect(res.body).to.be.empty;
                                                                            done();
                                                                        });
                                                                });
                                                            });

                                                        });
                                                });
                                            });


                                            // Filter by Blog Category

                                            describe('updateBlogCategory() to update existing blog category for category ID ' + _blogCategoryId +' with access token so that blog articles can be retreived for which blog category needs to be active', function () {
                                                it('should return a successfull update message stating that blog category updated successfully', function(){
                                                    var self = this;
                                                    self.validBlogCategoryObj = blogCategoryInfo;
                                                    self.validBlogCategoryObj.categoryName = "Entertainment";
                                                    self.validBlogCategoryObj.active = true;

                                                    return request
                                                        .put(apiUrlBlogCategory + _blogCategoryId)
                                                        .set('Accept', 'application/x-www-form-urlencoded')
                                                        .set('x-access-token', accessToken)
                                                        .send(self.validBlogCategoryObj)
                                                        .expect('Content-Type', /json/)
                                                        .then(function(res) {
                                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                            expect(res.body).to.be.an('object');
                                                            expect(res.body).to.have.property("message");
                                                            expect(res.body.message).to.equal(apiMessageConfig.blog.updateMessageCategory);
                                                            return Promise.resolve();
                                                        })
                                                        .then(function(){
                                                            describe('getBlogByCategory() to filter blogs according to blog category ' + self.validBlogCategoryObj.categoryName, function () {
                                                                it('should return a list of blog articles related to that category', function(){
                                                                    return request
                                                                        .get(apiUrlFilterCategory + self.validBlogCategoryObj.categoryName)
                                                                        .set('Accept', 'application/json')
                                                                        .expect('Content-Type', /json/)
                                                                        .then(function(res) {
                                                                            expect(res.body).to.be.an('object');
                                                                            expect(res.body.dataList).to.be.instanceof(Array);
                                                                            expect(res.body.dataList).to.have.length.of.at.least(2);
                                                                            return Promise.resolve();
                                                                        })
                                                                        .then(function(){
                                                                            describe('getBlogByID() to retrieve blog article object for blog ID ' + _blogId, function () {
                                                                                it('should return a blog article information object', function(done){
                                                                                    request
                                                                                        .get(apiUrlBlog + _blogId)
                                                                                        .set('Accept', 'application/json')
                                                                                        .expect('Content-Type', /json/)
                                                                                        .then(function(res) {
                                                                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                                                            expect(res.body).to.be.an('object');
                                                                                            expect(res.body).to.have.property("_id");
                                                                                            expect(res.body._id).to.equal(_blogId);
                                                                                            expect(res.body).to.have.property("blogTitle");
                                                                                            expect(res.body.blogTitle).to.equal(_blogTitle);
                                                                                            expect(res.body).to.have.property("status");
                                                                                            expect(res.body.status).to.equal('active');
                                                                                            done();
                                                                                        });
                                                                                });
                                                                            });

                                                                            describe('updateBlog() to update existing blog article object for blog ID ' + _blogId +' without access tokens', function () {
                                                                                it('should return a message stating that authentication is failed', function(done){
                                                                                    request
                                                                                        .put(apiUrlBlog + _blogId)
                                                                                        .set('Accept', 'multipart/form-data')
                                                                                        .field('data', JSON.stringify(blogInfo))
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

                                                                            describe('updateBlog()  to update existing blog article object  for blog ID ' + _blogId +' with access token and no image', function () {
                                                                                it('should return a successfull update message', function(done){
                                                                                    var self = this;
                                                                                    self.validBlogObj = blogInfo;
                                                                                    self.validBlogObj.blogTitle = "updating blog articles title to United  FC";
                                                                                    self.validBlogObj.blogDescription = "updating blog articles detail content ... in progress";
                                                                                    self.validBlogObj.active = false;

                                                                                    request
                                                                                        .put(apiUrlBlog + _blogId)
                                                                                        .set('Accept', 'multipart/form-data')
                                                                                        .set('x-access-token', accessToken)
                                                                                        .field('data', JSON.stringify(self.validBlogObj))
                                                                                        .expect('Content-Type', /json/)
                                                                                        .then(function(res) {
                                                                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                                                            expect(res.body).to.be.an('object');
                                                                                            expect(res.body).to.have.property("message");
                                                                                            expect(res.body.message).to.equal(apiMessageConfig.blog.updateMessageBlog);
                                                                                            done();
                                                                                        });
                                                                                });
                                                                            });

                                                                            describe('updateBlog()  to update existing blog article object  for blog ID ' + _blogId +' with access token and with image', function () {
                                                                                it('should return a successfull update message', function(done){
                                                                                    var self = this;
                                                                                    self.validBlogObj = blogInfo;
                                                                                    self.validBlogObj.categoryId = _blogCategoryId;
                                                                                    request
                                                                                        .put(apiUrlBlog + _blogId)
                                                                                        .set('Accept', 'multipart/form-data')
                                                                                        .set('x-access-token', accessToken)
                                                                                        .field('data', JSON.stringify(self.validBlogObj))
                                                                                        .attach('imageName', imagePathUrl[1])
                                                                                        .expect('Content-Type', /json/)
                                                                                        .then(function(res) {
                                                                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                                                            expect(res.body).to.be.an('object');
                                                                                            expect(res.body).to.have.property("message");
                                                                                            expect(res.body.message).to.equal(apiMessageConfig.blog.updateMessageBlog);
                                                                                            done();
                                                                                        });
                                                                                });
                                                                            });

                                                                            describe('updateBlog()  to update existing blog article object  for blog ID ' + _blogId +' with access token and with image and already saved title', function () {
                                                                                it('should return a message stating that blog articles with same title already exists', function(done){

                                                                                    var self = this;
                                                                                    self.invalidBlogObj = blogInfo;
                                                                                    self.invalidBlogObj.blogTitle = "blog title 1";

                                                                                    request
                                                                                        .put(apiUrlBlog + _blogId)
                                                                                        .set('Accept', 'multipart/form-data')
                                                                                        .set('x-access-token', accessToken)
                                                                                        .field('data', JSON.stringify(self.invalidBlogObj))
                                                                                        .attach('imageName', imagePathUrl[1])
                                                                                        .expect('Content-Type', /json/)
                                                                                        .then(function(res) {
                                                                                            expect(res.statusCode).to.equal(HTTPStatus.CONFLICT);
                                                                                            expect(res.body).to.be.an('object');
                                                                                            expect(res.body).to.have.property("message");
                                                                                            expect(res.body.message).to.equal(apiMessageConfig.blog.alreadyExistsBlog);
                                                                                            done();
                                                                                        });
                                                                                });
                                                                            });

                                                                            describe('updateBlog() with invalid data i.e. no blog Title,  no blog detail and  no author', function () {

                                                                                afterEach(function () {
                                                                                    blogInfo = {
                                                                                        blogTitle : "blog title 1",
                                                                                        blogSummary : "summary in blog",
                                                                                        blogDescription : "detailed blog",
                                                                                        tags : "Soccer, Manchester United, Football, UEFA, FIFA",
                                                                                        bannerImageTitle : "football pic",
                                                                                        bannerImageAltText : "manchester united pre-season finale",
                                                                                        author : "1125698",
                                                                                        active : true
                                                                                    };
                                                                                });

                                                                                it('should return a message stating validation error related to title, detail and author', function(done){
                                                                                    var self = this;
                                                                                    self.invalidBlogObj = blogInfo;
                                                                                    self.invalidBlogObj.blogTitle = "";
                                                                                    self.invalidBlogObj.blogDescription = "";
                                                                                    self.invalidBlogObj.author = "";
                                                                                    request
                                                                                        .put(apiUrlBlog + _blogId)
                                                                                        .set('Accept', 'application/x-www-form-urlencoded')
                                                                                        .set('x-access-token', accessToken)
                                                                                        .field('data', JSON.stringify(self.invalidBlogObj))
                                                                                        .expect('Content-Type', /json/)
                                                                                        .then(function(res) {
                                                                                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                                                                            expect(res.error).to.have.property('text');
                                                                                            var errObj = JSON.parse(res.error.text);
                                                                                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.blog.validationErrMessage.blogTitle);
                                                                                            expect(errObj.message[1].msg).to.have.string(apiMessageConfig.blog.validationErrMessage.blogDescription);
                                                                                            expect(errObj.message[2].msg).to.have.string(apiMessageConfig.blog.validationErrMessage.author);

                                                                                            done();
                                                                                        });
                                                                                });
                                                                            });

                                                                            describe('getAllBlogArticles() to retrive blog articles  with active bit true', function () {
                                                                                it('should return a single list of blog article array as response ignoring data records with active bit false', function(done){
                                                                                    request
                                                                                        .get(apiUrlBlog)
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

                                                                            //Blog SEO Meta Tags Integration Test


                                                                            describe('getBlogAssociatedSeoMetaTag() to get SEO meta tags for blog ID ' + _blogId, function () {
                                                                                it('should return a blog SEO Meta tag  information object', function(done){
                                                                                    request
                                                                                        .get(apiUrlBlogSeoMetaTag + _seoMetaTagId)
                                                                                        .set('Accept', 'application/json')
                                                                                        .expect('Content-Type', /json/)
                                                                                        .then(function(res) {
                                                                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                                                            expect(res.body).to.be.an('object');
                                                                                            expect(res.body).to.have.property("_id");
                                                                                            expect(res.body._id).to.equal(_seoMetaTagId);
                                                                                            expect(res.body).to.have.property("valueChanged");
                                                                                            expect(res.body.valueChanged).to.equal(false);
                                                                                            done();
                                                                                        });
                                                                                });
                                                                            });

                                                                            describe('updateBlogSeoMetaTag() to update SEO meta tags for blog ID ' + _blogId +' without access tokens', function () {
                                                                                it('should return a message stating that authentication is failed', function(done){
                                                                                    request
                                                                                        .put(apiUrlBlogSeoMetaTag + _seoMetaTagId)
                                                                                        .set('Accept', 'application/x-www-form-urlencoded')
                                                                                        .send(blogSeoMetaInfo)
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

                                                                            describe('updateBlogSeoMetaTag() to update SEO meta tags for blog ID ' + _blogId +' with access token', function () {
                                                                                it('should return a successfull update message that seo meta tag is updated successfully', function(done){

                                                                                    request
                                                                                        .put(apiUrlBlogSeoMetaTag + _seoMetaTagId)
                                                                                        .set('Accept', 'application/x-www-form-urlencoded')
                                                                                        .set('x-access-token', accessToken)
                                                                                        .send(blogSeoMetaInfo)
                                                                                        .expect('Content-Type', /json/)
                                                                                        .then(function(res) {
                                                                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                                                            expect(res.body).to.be.an('object');
                                                                                            expect(res.body).to.have.property("message");
                                                                                            expect(res.body.message).to.equal(apiMessageConfig.blog.updateMessageBlogMetaTag);
                                                                                            done();
                                                                                        });
                                                                                });
                                                                            });


                                                                            describe('getBlogAssociatedSeoMetaTag() to get SEO meta tags for blog ID ' + _blogId + 'after updating value ', function () {
                                                                                it('should return a blog SEO Meta tag  information object', function(done){
                                                                                    request
                                                                                        .get(apiUrlBlogSeoMetaTag + _seoMetaTagId)
                                                                                        .set('Accept', 'application/json')
                                                                                        .expect('Content-Type', /json/)
                                                                                        .then(function(res) {
                                                                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                                                            expect(res.body).to.be.an('object');
                                                                                            expect(res.body).to.have.property("metaKeyword");
                                                                                            expect(res.body.metaKeyword).to.equal(blogSeoMetaInfo.metaKeyword);
                                                                                            expect(res.body).to.have.property("valueChanged");
                                                                                            expect(res.body.valueChanged).to.equal(true);
                                                                                            done();
                                                                                        });
                                                                                });
                                                                            });


                                                                            //Blog Document Integration test

                                                                            describe('getAllRelatedBlogDocuments() to retrive documents related to the blog for blog article id ' + _blogId, function () {
                                                                                it('should return empty list of related documents associated to the blog article', function(done){
                                                                                    request
                                                                                        .get(apiUrlBlogDocument + _blogId)
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


                                                                            describe('postBlogRelatedDocument() to save document  for blog article id ' + _blogId + ' without access tokens', function () {
                                                                                it('should return a message stating that authentication is failed', function(done){
                                                                                    request
                                                                                        .post(apiUrlBlogDocument + _blogId)
                                                                                        .set('Accept', 'multipart/form-data')
                                                                                        .field('data', JSON.stringify(blogDocumentInfo))
                                                                                        .attach('documentName', documentPathUrl[1])
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

                                                                            describe('postBlogRelatedDocument()  to save document  with access tokens and document file', function () {
                                                                                it('should return a successfull save message stating blog document is saved successfully', function(done){
                                                                                    request
                                                                                        .post(apiUrlBlogDocument + _blogId)
                                                                                        .set('Accept', 'multipart/form-data')
                                                                                        .set('x-access-token', accessToken)
                                                                                        .field('data', JSON.stringify(blogDocumentInfo))
                                                                                        .attach('documentName', documentPathUrl[1])
                                                                                        .expect('Content-Type', /json/)
                                                                                        .then(function(res) {
                                                                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                                                            expect(res.body).to.be.an('object');
                                                                                            expect(res.body).to.have.property("message");
                                                                                            expect(res.body.message).to.equal(apiMessageConfig.blog.saveMessageDocument);
                                                                                            done();
                                                                                        });
                                                                                });
                                                                            });


                                                                            describe('postBlogRelatedDocument()  to save document  with access tokens but without document file', function () {
                                                                                it('should return a message stating that please upload document.', function(done){
                                                                                    request
                                                                                        .post(apiUrlBlogDocument + _blogId)
                                                                                        .set('Accept', 'multipart/form-data')
                                                                                        .set('x-access-token', accessToken)
                                                                                        .field('data', JSON.stringify(blogDocumentInfo))
                                                                                        .expect('Content-Type', /json/)
                                                                                        .then(function(res) {
                                                                                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                                                                            expect(res.body).to.be.an('object');
                                                                                            expect(res.body).to.have.property("message");
                                                                                            expect(res.body.message).to.equal(apiMessageConfig.blog.fieldRequiredDocument);
                                                                                            done();
                                                                                        });
                                                                                });
                                                                            });

                                                                            describe('postBlogRelatedDocument()  to save document  with access tokens and document file but without document title', function () {
                                                                                it('should return a message stating that document title is required.', function(done){
                                                                                    var self = this;
                                                                                    self.invalidDocumentObj = blogDocumentInfo;
                                                                                    self.invalidDocumentObj.documentTitle = "";

                                                                                    request
                                                                                        .post(apiUrlBlogDocument + _blogId)
                                                                                        .set('Accept', 'multipart/form-data')
                                                                                        .set('x-access-token', accessToken)
                                                                                        .field('data', JSON.stringify(self.invalidDocumentObj))
                                                                                        .attach('documentName', documentPathUrl[1])
                                                                                        .expect('Content-Type', /json/)
                                                                                        .then(function(res) {
                                                                                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                                                                            expect(res.body).to.be.an('object');
                                                                                            expect(res.body).to.have.property("message");
                                                                                            expect(res.body.message).to.equal(apiMessageConfig.blog.validationErrMessage.documentTitle);
                                                                                            done();
                                                                                        });
                                                                                });
                                                                            });

                                                                            describe('getAllRelatedBlogDocuments() to retrive blog related documents for blog id ' + _blogId, function () {
                                                                                it('should return a list of documents for blog', function(){
                                                                                    return request
                                                                                        .get(apiUrlBlogDocument + _blogId)
                                                                                        .set('Accept', 'application/json')
                                                                                        .expect('Content-Type', /json/)
                                                                                        .then(function(res) {
                                                                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                                                            expect(res.body).to.be.instanceof(Array);
                                                                                            expect(res.body).to.have.length.of.at.least(1);
                                                                                            return Promise.resolve(res.body[0]);
                                                                                        })
                                                                                        .then(function(documentObj){
                                                                                            var _documentId = documentObj._id;
                                                                                            var _documentName = documentObj.documentName;

                                                                                            describe('getBlogDocumentInfoByBlogID() to retrive blog document object for document ID ' + _documentId, function () {
                                                                                                it('should return a blog document information object', function(done){
                                                                                                    request
                                                                                                        .get(apiUrlBlogDocument + _blogId + '/' + _documentId)
                                                                                                        .set('Accept', 'application/json')
                                                                                                        .expect('Content-Type', /json/)
                                                                                                        .then(function(res) {
                                                                                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                                                                            expect(res.body).to.be.an('object');
                                                                                                            expect(res.body).to.have.property("_id");
                                                                                                            expect(res.body._id).to.equal(_documentId);
                                                                                                            expect(res.body).to.have.property("documentName");
                                                                                                            expect(res.body.documentName).to.equal(_documentName);
                                                                                                            done();
                                                                                                        });
                                                                                                });
                                                                                            });


                                                                                            describe('updateBlogDocumentInfo() to update existing  blog document object for document ID ' + _documentId +' without access tokens', function () {
                                                                                                it('should return a message stating that authentication is failed', function(done){
                                                                                                    request
                                                                                                        .put(apiUrlBlogDocument + _blogId + '/' + _documentId)
                                                                                                        .set('Accept', 'multipart/form-data')
                                                                                                        .field('data', JSON.stringify(blogDocumentInfo))
                                                                                                        .attach('documentName', documentPathUrl[1])
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

                                                                                            describe('updateBlogDocumentInfo() to update existing  blog document object for document ID ' + _documentId +' with access token and document file', function () {
                                                                                                it('should return a successfull update message stating that blog document is updated successfully', function(done){
                                                                                                    var self = this;
                                                                                                    self.validDocumentObj = blogDocumentInfo;
                                                                                                    self.validDocumentObj.documentTitle = "this is the title you are looking for";

                                                                                                    request
                                                                                                        .put(apiUrlBlogDocument + _blogId + '/' + _documentId)
                                                                                                        .set('Accept', 'multipart/form-data')
                                                                                                        .set('x-access-token', accessToken)
                                                                                                        .field('data', JSON.stringify(self.validDocumentObj))
                                                                                                        .attach('documentName', documentPathUrl[1])
                                                                                                        .expect('Content-Type', /json/)
                                                                                                        .then(function(res) {
                                                                                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                                                                            expect(res.body).to.be.an('object');
                                                                                                            expect(res.body).to.have.property("message");
                                                                                                            expect(res.body.message).to.equal(apiMessageConfig.blog.updateMessageBlogDocument);
                                                                                                            done();
                                                                                                        });
                                                                                                });
                                                                                            });

                                                                                            describe('getBlogDocumentInfoByBlogID() to retrieve blog document object for document ID ' + _documentId + ' after updating should give different document name', function () {
                                                                                                it('should return a blog document information object', function(done){
                                                                                                    request
                                                                                                        .get(apiUrlBlogDocument + _blogId + '/' + _documentId)
                                                                                                        .set('Accept', 'application/json')
                                                                                                        .expect('Content-Type', /json/)
                                                                                                        .then(function(res) {
                                                                                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                                                                            expect(res.body).to.be.an('object');
                                                                                                            expect(res.body).to.have.property("_id");
                                                                                                            expect(res.body._id).to.equal(_documentId);
                                                                                                            expect(res.body).to.have.property("documentName");
                                                                                                            expect(res.body.documentName).to.not.equal(_documentName);
                                                                                                            done();
                                                                                                        });
                                                                                                });
                                                                                            });

                                                                                            describe('updateBlogDocumentInfo()  to update existing  blog document object to update existing  blog document object for document ID ' + _documentId +' with access token and without document file', function () {
                                                                                                it('should return a successfull update message stating that blog document is updated successfully', function(done){
                                                                                                    var self = this;
                                                                                                    self.validDocumentObj = blogDocumentInfo;
                                                                                                    self.validDocumentObj.active = false;

                                                                                                    request
                                                                                                        .put(apiUrlBlogDocument + _blogId + '/' + _documentId)
                                                                                                        .set('Accept', 'multipart/form-data')
                                                                                                        .set('x-access-token', accessToken)
                                                                                                        .field('data', JSON.stringify(self.validDocumentObj))
                                                                                                        .expect('Content-Type', /json/)
                                                                                                        .then(function(res) {
                                                                                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                                                                            expect(res.body).to.be.an('object');
                                                                                                            expect(res.body).to.have.property("message");
                                                                                                            expect(res.body.message).to.equal(apiMessageConfig.blog.updateMessageBlogDocument);
                                                                                                            done();
                                                                                                        });
                                                                                                });
                                                                                            });




                                                                                            describe('updateBlogDocumentInfo()  to update existing  blog document object for document ID ' + _documentId +' without image file after deleting document file when editing', function () {
                                                                                                it('should return a validation warning message stating that  document file is required. So, Please upload document', function(done){
                                                                                                    var self = this;
                                                                                                    self.validDocumentObj = blogDocumentInfo;

                                                                                                    request
                                                                                                        .put(apiUrlBlogDocument + _blogId + '/' + _documentId)
                                                                                                        .set('Accept', 'multipart/form-data')
                                                                                                        .set('x-access-token', accessToken)
                                                                                                        .query('deleted=true')
                                                                                                        .field('data', JSON.stringify(self.validDocumentObj))
                                                                                                        .expect('Content-Type', /json/)
                                                                                                        .then(function(res) {
                                                                                                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                                                                                            expect(res.body).to.be.an('object');
                                                                                                            expect(res.body).to.have.property("message");
                                                                                                            expect(res.body.message).to.equal(apiMessageConfig.blog.fieldRequiredDocument);
                                                                                                            done();
                                                                                                        });
                                                                                                });
                                                                                            });

                                                                                            describe('updateBlogDocumentInfo()  to update existing  blog document object for document ID ' + _documentId +' without document title', function () {
                                                                                                it('should return a validation warning message stating that  document title is required. ', function(done){
                                                                                                    var self = this;
                                                                                                    self.validDocumentObj = blogDocumentInfo;
                                                                                                    self.validDocumentObj.documentTitle = "";
                                                                                                    request
                                                                                                        .put(apiUrlBlogDocument + _blogId + '/' + _documentId)
                                                                                                        .set('Accept', 'multipart/form-data')
                                                                                                        .set('x-access-token', accessToken)
                                                                                                        .field('data', JSON.stringify(self.validDocumentObj))
                                                                                                        .attach('documentName', documentPathUrl[1])
                                                                                                        .expect('Content-Type', /json/)
                                                                                                        .then(function(res) {
                                                                                                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                                                                                            expect(res.body).to.be.an('object');
                                                                                                            expect(res.body).to.have.property("message");
                                                                                                            expect(res.body.message).to.equal(apiMessageConfig.blog.validationErrMessage.documentTitle);
                                                                                                            done();
                                                                                                        });
                                                                                                });
                                                                                            });

                                                                                            describe('getAllRelatedBlogDocuments() to retrieve blog related documents for document ID ' + _documentId +' with active bit true', function () {
                                                                                                it('should return an empty document list', function(done){
                                                                                                    request
                                                                                                        .get(apiUrlBlogDocument + _blogId)
                                                                                                        .query('active=true')
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




                                                                                            describe('deleteBlogDocumentInfo() for document ID ' + _documentId +' to remove blog document without access tokens', function () {
                                                                                                it('should return a message stating that authentication is failed', function(done){
                                                                                                    request
                                                                                                        .patch(apiUrlBlogDocument + _blogId + '/' + _documentId)
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

                                                                                            describe('deleteBlogDocumentInfo() for document ID ' + _documentId +' to remove blog document with access token ', function () {
                                                                                                it('should return a successfull delete message', function(){
                                                                                                    return request
                                                                                                        .patch(apiUrlBlogDocument + _blogId + '/' + _documentId)
                                                                                                        .set('Accept', 'application/x-www-form-urlencoded')
                                                                                                        .set('x-access-token', accessToken)
                                                                                                        .expect('Content-Type', /json/)
                                                                                                        .then(function(res) {
                                                                                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                                                                            expect(res.body).to.be.an('object');
                                                                                                            expect(res.body).to.have.property("message");
                                                                                                            expect(res.body.message).to.equal(apiMessageConfig.blog.deleteMessageBlogDocument);
                                                                                                            return Promise.resolve();
                                                                                                        })
                                                                                                        .then(function () {
                                                                                                            describe('getAllRelatedBlogDocuments() for document ID ' + _documentId +' with active bit true', function () {
                                                                                                                it('should return a document list with active bit true only', function(done){
                                                                                                                    request
                                                                                                                        .get(apiUrlBlogDocument + _blogId)
                                                                                                                        .query('active=true')
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




                                                                                            describe('deleteBlog() for blog ID ' + _blogId +'  without access tokens  to delete blog articles', function () {
                                                                                                it('should return a message stating that authentication is failed', function(done){

                                                                                                    request
                                                                                                        .patch(apiUrlBlog + _blogId)
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

                                                                                            describe('deleteBlog() for blog ID ' + _blogId +' to delete blog articles record with access token', function () {
                                                                                                it('should return a successfull delete message stating blog article deleted successfully', function(){

                                                                                                    return request
                                                                                                        .patch(apiUrlBlog + _blogId)
                                                                                                        .set('Accept', 'application/x-www-form-urlencoded')
                                                                                                        .set('x-access-token', accessToken)
                                                                                                        .expect('Content-Type', /json/)
                                                                                                        .then(function(res) {
                                                                                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                                                                            expect(res.body).to.be.an('object');
                                                                                                            expect(res.body).to.have.property("message");
                                                                                                            expect(res.body.message).to.equal(apiMessageConfig.blog.deleteMessageBlog);
                                                                                                            return Promise.resolve();
                                                                                                        })
                                                                                                        .then(function () {
                                                                                                            describe('getAllBlogArticles() after delete of one record', function () {
                                                                                                                it('should  return only a single blog articles in  list', function(done){
                                                                                                                    request
                                                                                                                        .get(apiUrlBlog)
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
                                                                                                        });
                                                                                                });
                                                                                            });

//deletion of blog category

                                                                                            describe('patchBlogCategory() to delete blog category for category ID ' + _blogCategoryId +' without access tokens', function () {
                                                                                                it('should return a message stating that authentication is failed', function(done){

                                                                                                    request
                                                                                                        .patch(apiUrlBlogCategory + _blogCategoryId)
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

                                                                                            describe('patchBlogCategory() to delete blog category for category ID ' + _blogCategoryId +' with access token', function () {
                                                                                                it('should return a successfull delete message stating blog deleted successfully', function(){

                                                                                                    return request
                                                                                                        .patch(apiUrlBlogCategory + _blogCategoryId)
                                                                                                        .set('Accept', 'application/x-www-form-urlencoded')
                                                                                                        .set('x-access-token', accessToken)
                                                                                                        .expect('Content-Type', /json/)
                                                                                                        .then(function(res) {
                                                                                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                                                                            expect(res.body).to.be.an('object');
                                                                                                            expect(res.body).to.have.property("message");
                                                                                                            expect(res.body.message).to.equal(apiMessageConfig.blog.deleteMessageCategory);
                                                                                                            return Promise.resolve();
                                                                                                        })
                                                                                                        .then(function () {

                                                                                                            describe('getBlogCategories() after deletion of record', function () {
                                                                                                                it('should not return a list of blog category', function(done){
                                                                                                                    request
                                                                                                                        .get(apiUrlBlogCategory)
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