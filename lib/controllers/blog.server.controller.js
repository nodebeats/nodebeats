var blogController = (function () {

    'use strict';

    var dataProviderHelper = require('../data/mongo.provider.helper'),
        HTTPStatus = require('http-status'),
        messageConfig = require('../configs/api.message.config'),
        blogModel = require('../models/blog.server.model'),
        Blog = blogModel.Blog,
        BlogCategory = blogModel.BlogCategory,
        BlogTag = blogModel.BlogTag,
        BlogMetaTag = blogModel.BlogMetaTag,
        BlogDocument = blogModel.BlogDocument,
        utilityHelper = require('../helpers/utilities.helper'),
        errorHelper = require('../helpers/error.helper'),
        mongoose = require('mongoose'),
        ObjectId = mongoose.Types.ObjectId,
        Promise = require("bluebird"),
        join = Promise.join;


    var documentFieldsCategory = '_id categoryName urlSlogCategory categoryDescription active  addedOn';
    var documentFieldsBlog = '_id blogTitle urlSlog categoryId blogSummary blogDescription tags bannerImage bannerImageTitle bannerImageAltText status author seoEntry active allowComment articleViews relatedFiles addedOn';
    var populationFieldsTag = '_id tag urlSlogTag postCount';
    var populationFieldsSeoMetaTag = '_id metaKeyword titleTag metaDescription metaAuthor valueChanged';

    //
    //  To ignore the parent document and return only the embedded object, we have to exclude the _id from the query
    //
    var documentFieldsBlogDoc = {
        '_id': 0,
        'relatedFiles._id': 1,
        'relatedFiles.documentName' : 1,
        'relatedFiles.documentTitle' : 1,
        'relatedFiles.active' : 1
    };

    function BlogModule(){}

    BlogModule.CreateBlogCategory = function (blogCategoryObj, _slogVal, loginUser) {
        var blogCategory = new BlogCategory();
        blogCategory.categoryName = blogCategoryObj.categoryName;
        blogCategory.urlSlogCategory = _slogVal;
        blogCategory.categoryDescription = blogCategoryObj.categoryDescription;
        blogCategory.active = blogCategoryObj.active;
        blogCategory.addedBy = loginUser;
        blogCategory.addedOn = new Date();
        return blogCategory;
    };

    BlogModule.CreateBlog = function (blogObj, modelHtmlObj, _slogVal, loginUser, seoInfo, imageInfo) {
        var blogInfo = new Blog();
        blogInfo.blogTitle = blogObj.blogTitle;
        blogInfo.urlSlog = _slogVal;
        blogInfo.categoryId = blogObj.categoryId;
        blogInfo.blogSummary = blogObj.blogSummary;
        blogInfo.blogDescription = modelHtmlObj.blogDescription;
        blogInfo.bannerImage = imageInfo._imageName;
        blogInfo.imageProperties = {
            imageExtension : imageInfo._imageExtension,
            imagePath : imageInfo._imagePath
        };
        blogInfo.bannerImageTitle = blogObj.bannerImageTitle;
        blogInfo.bannerImageAltText = blogObj.bannerImageAltText;
        blogInfo.status = blogObj.status;
        blogInfo.author = blogObj.author;
        blogInfo.seoEntry = seoInfo._id;
        blogInfo.active = blogObj.active;
        blogInfo.allowComment = blogObj.allowComment;
        blogInfo.addedBy = loginUser;
        blogInfo.addedOn = new Date();
        return blogInfo;
    };

    BlogModule.CreateBlogTag = function (tag, _slogVal, postCount) {
        var blogTagInfo = new BlogTag();
        blogTagInfo.tag = tag;
        blogTagInfo.urlSlogTag = _slogVal;
        blogTagInfo.postCount = postCount;
        return blogTagInfo;
    };

    BlogModule.CreateBlogSeoMetaTags = function (blogMetaTagObj) {
        var blogMetaTagInfo = new BlogMetaTag();
        blogMetaTagInfo.metaKeyword = blogMetaTagObj.metaKeyword;
        blogMetaTagInfo.titleTag = blogMetaTagObj.titleTag;
        blogMetaTagInfo.metaDescription = blogMetaTagObj.metaDescription;
        blogMetaTagInfo.metaAuthor = blogMetaTagObj.metaAuthor;
        return blogMetaTagInfo;
    };

    BlogModule.CreateBlogDocument = function (documentTitle, documentInfo, loginUser, active) {
        var blogDocumentInfo = new BlogDocument();
        blogDocumentInfo.documentName = documentInfo._documentName;
        blogDocumentInfo.docProperties = {
            documentMimeType : documentInfo._documentMimeType,
            docPath : documentInfo._documentPath
        };
        blogDocumentInfo.documentTitle = documentTitle;
        blogDocumentInfo.active = active;
        blogDocumentInfo.addedBy = loginUser;
        blogDocumentInfo.addedOn = new Date();
        return blogDocumentInfo;
    };

    var _p = BlogModule.prototype;

    _p.checkValidationErrors = function (req) {
        req.checkBody('blogTitle', messageConfig.blog.validationErrMessage.blogTitle).notEmpty();
        req.checkBody('blogDescription', messageConfig.blog.validationErrMessage.blogDescription).notEmpty();
        req.checkBody('author', messageConfig.blog.validationErrMessage.author).notEmpty();
        return req.validationErrors();
    };

    _p.getBlogCategories = function (req, next) {
        var pagerOpts = utilityHelper.getPaginationOpts(req, next);

        var query = {};
        //matches anything that exactly matches the inputted category name, case  insensitive
        if(req.query.categoryname){
            query.categoryName = { $regex: new RegExp('^'+ req.query.categoryname + '$', "i") };
        }
        if(req.query.active){
            query.active = true;
        }
        query.deleted = false;
        var sortOpts = { addedOn: -1 };

        return dataProviderHelper.getAllWithDocumentFieldsPagination(BlogCategory, query, pagerOpts, documentFieldsCategory, sortOpts);
    };

    _p.getBlogCategoryByID = function (req) {
        return dataProviderHelper.findById(BlogCategory, req.params.categoryId, documentFieldsCategory);
    };

    _p.postBlogCategory = function (req, res, next) {
        if(req.body.categoryName) {
            var modelInfo = utilityHelper.sanitizeUserInput(req, next);
            var _slogVal = utilityHelper.getCleanURL(modelInfo.categoryName, next);
            var query = {};
            query.urlSlogCategory = _slogVal;
            query.deleted = false;

            dataProviderHelper.checkForDuplicateEntry(BlogCategory, query)
                .then(function (count) {
                    if(count > 0){
                        throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.CONFLICT + '", "message": "' + messageConfig.blog.alreadyExistsCategory + '"}');
                    }else{
                        var blogCategoryObj = BlogModule.CreateBlogCategory(modelInfo, _slogVal, req.decoded.user.username);
                        return  dataProviderHelper.save(blogCategoryObj);
                    }
                })
                .then(function () {
                    res.status(HTTPStatus.OK);
                    res.json({
                        message: messageConfig.blog.saveMessageCategory
                    });
                })
                .catch(Promise.CancellationError, function (cancellationErr) {
                    errorHelper.customErrorResponse(res, cancellationErr, next);
                })
                .catch(function (err) {
                    return next(err);
                });
        }else {
            res.status(HTTPStatus.BAD_REQUEST);
            res.json({
                message: messageConfig.blog.fieldRequiredCategory
            });
        }
    };

    _p.patchBlogCategory = function (req, res, next) {
        req.blogCategoryInfo.deleted = true;
        req.blogCategoryInfo.deletedOn = new Date();
        req.blogCategoryInfo.deletedBy = req.decoded.user.username;

        var _query = {
            'categoryId' : req.params.categoryId,
            'deleted': false
        };

        dataProviderHelper.checkForDuplicateEntry(Blog, _query)
            .then(function (count) {
                if(count > 0){
                    throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.CONFLICT + '", "message": "' + messageConfig.blog.categoryDeleteDeny + '"}');
                } else {
                    dataProviderHelper.save(req.blogCategoryInfo)
                }
            })
            .then(function () {
                res.status(HTTPStatus.OK);
                res.json({
                    message: messageConfig.blog.deleteMessageCategory
                });
            })
            .catch(Promise.CancellationError, function (cancellationErr) {
                errorHelper.customErrorResponse(res, cancellationErr, next);
            })
            .catch(function (err) {
                return next(err);
            });
    };

    _p.updateBlogCategory = function (req, res, next) {
        if(req.body.categoryName) {
            var modelInfo = utilityHelper.sanitizeUserInput(req, next);
            var _slogVal = utilityHelper.getCleanURL(modelInfo.categoryName, next);

            if(req.blogCategoryInfo.urlSlogCategory !== _slogVal) {
                var query = {};
                query.urlSlogCategory = _slogVal;
                query.deleted = false;

                dataProviderHelper.checkForDuplicateEntry(BlogCategory, query)
                    .then(function (count) {
                        if(count > 0){
                            throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.CONFLICT + '", "message": "' + messageConfig.blog.alreadyExistsCategory + '"}');
                        }else{
                            return _p.updateFunc(req, res, modelInfo, _slogVal);
                        }
                    })
                    .then(function () {
                        res.status(HTTPStatus.OK);
                        res.json({
                            message: messageConfig.blog.updateMessageCategory
                        });
                    })
                    .catch(Promise.CancellationError, function (cancellationErr) {
                        errorHelper.customErrorResponse(res, cancellationErr, next);
                    })
                    .catch(function (err) {
                        return next(err);
                    });
            }else{
                _p.updateFunc(req, res, modelInfo, _slogVal)
                    .then(function () {
                        res.status(HTTPStatus.OK);
                        res.json({
                            message: messageConfig.blog.updateMessageCategory
                        });
                    })
                    .catch(function (err) {
                        return next(err);
                    });
            }
        }else {
            res.status(HTTPStatus.BAD_REQUEST);
            res.json({
                message: messageConfig.blog.fieldRequiredCategory
            });
        }
    };

    _p.updateFunc = function (req, res, modelInfo, _slogVal) {
        req.blogCategoryInfo.categoryName = modelInfo.categoryName;
        req.blogCategoryInfo.urlSlogCategory = _slogVal;
        req.blogCategoryInfo.categoryDescription = modelInfo.categoryDescription;
        req.blogCategoryInfo.active = modelInfo.active;
        req.blogCategoryInfo.updatedBy = req.decoded.user.username;
        req.blogCategoryInfo.updatedOn = new Date();
       return dataProviderHelper.save(req.blogCategoryInfo);
    };


    _p.getAllBlogArticles = function (req, next) {
        var pagerOpts = utilityHelper.getPaginationOpts(req, next);
        var query = {};

        // matches anything that  starts with the inputted blog title, case insensitive
        if(req.query.blogtitle){
            query.blogTitle = { $regex: new RegExp('.*'+ req.query.blogtitle, "i") };
        }
        if(req.query.categoryid){
            query.categoryId = req.query.categoryid;
        }
        if(req.query.tagid){
            query.tags = req.query.tagid;
        }
        if(req.query.active){
            query.active = true;
        }
        query.deleted = false;
        var populationQueryOptsTag = { postCount : { $gt: 0 } };

        return dataProviderHelper.getAllWithFieldsPaginationMultiPopulation(Blog, query, pagerOpts, documentFieldsBlog, 'tags', 'seoEntry', populationFieldsTag, populationQueryOptsTag, populationFieldsSeoMetaTag);
    };

    _p.getBlogByID = function (req) {
        var selectBlogFields = documentFieldsBlog + ' imageProperties';

        return dataProviderHelper.getByIdWithMultiplePopulation(Blog, req.params.blogId, 'tags', 'seoEntry', selectBlogFields, populationFieldsTag, populationFieldsSeoMetaTag);
    };

    _p.postBlogArticle = function (req, res, next) {
        req.body = JSON.parse(req.body.data);

        var errors = _p.checkValidationErrors(req);
        if (errors) {
            res.status(HTTPStatus.BAD_REQUEST);
            res.json({
                message: errors
            });
        }else {
            var modelInfo = utilityHelper.sanitizeUserInput(req, next);
            var _slogVal = utilityHelper.getCleanURL(modelInfo.blogTitle, next);
            var query = {};
            query.urlSlog = _slogVal;
            query.deleted = false;

            dataProviderHelper.checkForDuplicateEntry(Blog, query)
                .then(function (count) {
                    if(count > 0){
                        throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.CONFLICT + '", "message": "' + messageConfig.blog.alreadyExistsBlog + '"}');
                    }else{
                        //for checking duplicate tags and returns all the tags in comma seperated value
                        return _p.checkDuplicateTags();
                    }
                })
                .then(function (resultTagData) {
                    var seoMetaObj = _p.generateBlogSeoMetaObj(modelInfo);
                    var blogSeoMetaObj = BlogModule.CreateBlogSeoMetaTags(seoMetaObj);
                    var imageInfo = utilityHelper.getFileInfo(req, null, next);
                    var contentInfo = {};
                    contentInfo.blogDescription = req.body.blogDescription;
                    var modelHtmlInfo = utilityHelper.sanitizeUserHtmlBodyInput(contentInfo, next);


                    var blogObj = BlogModule.CreateBlog(modelInfo, modelHtmlInfo, _slogVal, req.decoded.user.username, blogSeoMetaObj, imageInfo);
                    //supplying value of 1 so that each addition of tags either new or existing  increments the tag count by 1
                    var addValue = 1;
                    var blogTagArr = _p.generateDistinctBlogTags(resultTagData, modelInfo, blogObj, addValue, next);

                    return [blogTagArr, blogSeoMetaObj, dataProviderHelper.save(blogObj)];
                })
                .spread(function (blogTagArr, blogSeoMetaObj) {
                    if(blogTagArr.length > 0){
                        return join(dataProviderHelper.bulkInsert(BlogTag, blogTagArr), dataProviderHelper.save(blogSeoMetaObj),
                            function () {
                                return;
                            });
                    }
                    else{
                        return dataProviderHelper.save(blogSeoMetaObj);
                    }
                })
                .then(function () {
                    res.status(HTTPStatus.OK);
                    res.json({
                        message: messageConfig.blog.saveMessageBlog
                    });
                })
                .catch(Promise.CancellationError, function (cancellationErr) {
                    errorHelper.customErrorResponse(res, cancellationErr, next);
                })
                .catch(function (err) {
                    return next(err);
                });
        }
    };

    _p.checkDuplicateTags = function () {

        //return the object containing all the existing tag values clean URL along with all the tags information
        return join(dataProviderHelper.getDistinctValuesInArray(BlogTag, "urlSlogTag", {}), dataProviderHelper.getAllWithoutDocumentFieldsNoPagination(BlogTag, {}),function (existingArr, tagsObj) {
            return {
                existingTagArr : existingArr,
                allTagsInfo : tagsObj
            };
        });
    };

    _p.generateBlogSeoMetaObj = function (modelInfo) {
        var metaTitle = '';
        var metaDescription  = '';
        if(modelInfo.blogTitle.length > 70){
            metaTitle = modelInfo.blogTitle.substring(0, 69);
        }else{
            metaTitle = modelInfo.blogTitle;
        }
        if(modelInfo.blogSummary !== '' && modelInfo.blogSummary.length > 160){
            metaDescription = modelInfo.blogSummary.substring(0, 159);
        }else{
            metaDescription = modelInfo.blogSummary;
        }

        return {
            metaKeyword : modelInfo.tags,//tags are also meta keywords for blog
            titleTag : metaTitle,
            metaDescription : metaDescription,
            metaAuthor : modelInfo.author
        };
    };

    _p.generateDistinctBlogTags = function (resultTagData, modelInfo, blogObj, actionVal, next) {
        var blogTagArr = [];

        //check if the blog tags exists or is not null
        if(modelInfo.tags){

            //if tags exists, then check for comma seperated tags
            if(utilityHelper.containsChar(modelInfo.tags, ',', next)){
                //if tags provided contains commas, then seperate the comma seperated tags and for each comma seperated values, do check for their existence in the collection
                for (var i = 0, keys = modelInfo.tags.split(','); i < keys.length; i++) {
                    _p.createBlogTagArr(resultTagData, keys[i], blogObj, blogTagArr, actionVal, next);
                }
            }else{
                //if tags provided doesn't contain commas, then directly check for that tag against our collection for duplicate tags
                _p.createBlogTagArr(resultTagData, modelInfo.tags, blogObj, blogTagArr, actionVal,  next);
            }
        }
        return blogTagArr;
    };

    _p.createBlogTagArr = function (resultTagData, tagValue, blogObj, blogTagArr, actionVal, next) {
        if(tagValue!==""){

            var blogTagObj = {};

            //first generate slog for tagvalue
            var urlSlog = utilityHelper.getCleanURL(tagValue, next);

            //check if the generated slog value i.e clean URL is in the existing tags array or not
            if(utilityHelper.containsElementInArr(resultTagData.existingTagArr, urlSlog, next)){

                //if slog value of tag data exists already, then get the index of that slog value in the existing tags list to get it's object id
                var index = utilityHelper.getIndexOfObject(resultTagData.allTagsInfo, "urlSlogTag", urlSlog, next);
                blogObj.tags.push(resultTagData.allTagsInfo[index]._id);
                //for the existing tag value just increase the tag count by 1
                var updateTagCountOpts = { postCount: (resultTagData.allTagsInfo[index].postCount + actionVal) };
                _p.updateBlogTagCount(resultTagData.allTagsInfo[index]._id, updateTagCountOpts);
            }else{

                //if the slog value of tag title doesn't exists, then create new object of blog tag and
                var addValue = 1;
                //Here we are passing value of 1 so that each new addition initializes the count of tag by 1
                blogTagObj = BlogModule.CreateBlogTag(tagValue, urlSlog, addValue);
                blogObj.tags.push(blogTagObj._id);
                blogTagArr.push(blogTagObj);
            }
        }
    };

    _p.updateBlogTagCount = function (tagId, updateOpts) {
        var queryOpts = { _id : tagId };
        var multiOpts = false;
        dataProviderHelper.updateModelData(BlogTag, queryOpts, updateOpts, multiOpts);
    };

    _p.deleteBlog = function (req, res, next) {
        req.blogInfo.deleted = true;
        req.blogInfo.deletedOn = new Date();
        req.blogInfo.deletedBy = req.decoded.user.username;
        dataProviderHelper.save(req.blogInfo)
            .then(function () {
                res.status(HTTPStatus.OK);
                res.json({
                    message: messageConfig.blog.deleteMessageBlog
                });

                var tagsArr = req.blogInfo.tags;
                var updateOpts = {$inc: { postCount: -1 }};
                for (var i = 0; i < tagsArr.length; i++) {
                    if (tagsArr[i].tag.trim() !== "") {
                        _p.updateBlogTagCount(tagsArr[i]._id, updateOpts)
                    }
                }
            })
            .catch(function (err) {
                return next(err);
            });
    };

    _p.updateBlog = function (req, res, next) {
        req.body = JSON.parse(req.body.data);

        var errors = _p.checkValidationErrors(req);
        if (errors) {
            res.status(HTTPStatus.BAD_REQUEST);
            res.json({
                message: errors
            });
        }else {
            var modelInfo = utilityHelper.sanitizeUserInput(req, next);
            var _slogVal = utilityHelper.getCleanURL(modelInfo.blogTitle, next);
            if(req.blogInfo.urlSlog !== _slogVal) {
                var query = {};
                query.urlSlog = _slogVal;
                query.deleted = false;

                dataProviderHelper.checkForDuplicateEntry(Blog, query)
                    .then(function (count) {
                        if (count > 0) {
                            throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.CONFLICT + '", "message": "' + messageConfig.blog.alreadyExistsBlog + '"}');
                        } else {
                            return _p.checkDuplicateTags();
                        }
                    })
                    .then(function (resultTagData) {
                        return _p.updateBlogFunc(req, res, modelInfo, _slogVal, next, resultTagData);
                    })
                    .spread(function (blogTagArr, blogSeoMetaObj) {
                        if(blogTagArr.length > 0){
                            return join(dataProviderHelper.bulkInsert(BlogTag, blogTagArr), dataProviderHelper.save(blogSeoMetaObj),
                                function () {
                                    return;
                                });
                        }
                        else{
                            return dataProviderHelper.save(blogSeoMetaObj);
                        }
                    })
                    .then(function () {
                        res.status(HTTPStatus.OK);
                        res.json({
                            message: messageConfig.blog.updateMessageBlog
                        });
                    })
                    .catch(Promise.CancellationError, function (cancellationErr) {
                        errorHelper.customErrorResponse(res, cancellationErr, next);
                    })
                    .catch(function (err) {
                        return next(err);
                    });
            }else{
                _p.checkDuplicateTags()
                    .then(function (resultTagData) {
                        return _p.updateBlogFunc(req, res, modelInfo, _slogVal, next, resultTagData);
                    })
                    .spread(function (blogTagArr, blogSeoMetaObj) {
                        if(blogTagArr.length > 0){
                            return join(dataProviderHelper.bulkInsert(BlogTag, blogTagArr), dataProviderHelper.save(blogSeoMetaObj),
                                function () {
                                    return;
                                });
                        }
                        else{
                            return dataProviderHelper.save(blogSeoMetaObj);
                        }
                    })
                    .then(function () {
                        res.status(HTTPStatus.OK);
                        res.json({
                            message: messageConfig.blog.updateMessageBlog
                        });
                    })
                    .catch(function (err) {
                        return next(err);
                    });
            }
        }
    };

    _p.updateBlogFunc = function (req, res, modelInfo, _slogVal, next, resultTagData) {
        var seoMetaObj = _p.generateBlogSeoMetaObj(modelInfo);
        var blogSeoMetaObj = BlogModule.CreateBlogSeoMetaTags(seoMetaObj);
        var fileDataObj = {
            imageName : req.blogInfo.bannerImage,
            imageProperties : {
                imageExtension: req.blogInfo.imageProperties.imageExtension,
                imagePath: req.blogInfo.imageProperties.imagePath
            }
        };
        var imageInfo = utilityHelper.getFileInfo(req, fileDataObj, next);

        var contentInfo = {};
        contentInfo.blogDescription = req.body.blogDescription;
        var modelHtmlInfo = utilityHelper.sanitizeUserHtmlBodyInput(contentInfo, next);

        req.blogInfo.blogTitle = modelInfo.blogTitle;
        req.blogInfo.urlSlog = _slogVal;
        req.blogInfo.categoryId = modelInfo.categoryId;
        req.blogInfo.blogSummary = modelInfo.blogSummary;
        req.blogInfo.blogDescription = modelHtmlInfo.blogDescription;
        req.blogInfo.bannerImageTitle = modelInfo.bannerImageTitle;
        req.blogInfo.bannerImageAltText =  modelInfo.bannerImageAltText;
        req.blogInfo.status = modelInfo.status;
        req.blogInfo.author = modelInfo.author;
        req.blogInfo.active =  modelInfo.active;
        req.blogInfo.allowComment = modelInfo.allowComment;
        req.blogInfo.updatedBy = req.decoded.user.username;
        req.blogInfo.updatedOn = new Date();

        req.blogInfo.bannerImage = imageInfo._imageName;
        req.blogInfo.imageProperties.imageExtension = imageInfo._imageExtension;
        req.blogInfo.imageProperties.imagePath = imageInfo._imagePath;

        if(!req.blogInfo.seoEntry.valueChanged){
            req.blogInfo.seoEntry.metaKeyword =  blogSeoMetaObj.metaKeyword;
            req.blogInfo.seoEntry.titleTag =  blogSeoMetaObj.titleTag;
            req.blogInfo.seoEntry.metaDescription = blogSeoMetaObj.metaDescription;
            req.blogInfo.seoEntry.metaAuthor = blogSeoMetaObj.metaAuthor;
        }

        var blogTagArr = [];
        if(req.blogInfo.tags.length > 0){
            var newBlogTags = modelInfo.tags.toLowerCase().split(',');
            var oldBlogTags = req.blogInfo.tags;
            req.blogInfo.tags = [];
            var oldTag ='';
            var count = 0;
            for (var k = 0; k < oldBlogTags.length; k++) {
                oldTag = oldBlogTags[k].tag.toLowerCase();
                if(!utilityHelper.containsElementInArr(newBlogTags, oldTag, next)){
                    count = 0;
                    if(oldBlogTags[k].postCount > 1){
                        count = oldBlogTags[k].postCount - 1;
                    }
                    var updateTagCountOpts = { postCount: count };
                    _p.updateBlogTagCount(oldBlogTags[k]._id, updateTagCountOpts);
                }
            }
            var actionVal = 0;
            for (var i = 0; i < newBlogTags.length; i++) {
                // supplying value of 0 so that update action does not increment the tag count value
                if(!utilityHelper.containsElementInArrayOfObjects(oldBlogTags, newBlogTags[i], next)){
                    actionVal = 1;
                }else{
                    actionVal = 0;
                }
                _p.createBlogTagArr(resultTagData, newBlogTags[i], req.blogInfo, blogTagArr, actionVal, next);
            }
        }else{
            _p.generateDistinctBlogTags(resultTagData, modelInfo, req.blogInfo, 1, next);
        }
        return [blogTagArr, req.blogInfo.seoEntry, dataProviderHelper.save(req.blogInfo)];
    };

    _p.getAllBlogTags = function (req) {
        var query = {};
        if(req.query.active){
            query.postCount = { $gt: 0 };
        }

        return dataProviderHelper.getAllWithoutDocumentFieldsNoPagination(BlogTag, query);
    };

    _p.getBlogAssociatedSeoMetaTag = function (req) {
        var query = {};
        query._id = req.params.metaTagId;

        return dataProviderHelper.findOne(BlogMetaTag, query, populationFieldsSeoMetaTag);
    };

    _p.updateBlogSeoMetaTag = function (req, res, next) {
        var modelInfo = utilityHelper.sanitizeUserInput(req, next);
        req.blogSeoMetaInfo.metaKeyword = modelInfo.metaKeyword;
        req.blogSeoMetaInfo.titleTag = modelInfo.titleTag;
        req.blogSeoMetaInfo.metaDescription = modelInfo.metaDescription;
        req.blogSeoMetaInfo.metaAuthor = modelInfo.metaAuthor;
        req.blogSeoMetaInfo.valueChanged = true;

        dataProviderHelper.save(req.blogSeoMetaInfo)
            .then(function () {
                res.status(HTTPStatus.OK);
                res.json({
                    message: messageConfig.blog.updateMessageBlogMetaTag
                });
            })
            .catch(function (err) {
                return next(err);
            });

    };

    _p.getAllRelatedBlogDocuments = function (req) {

        var query = {
            deleted : false,
            "relatedFiles.deleted" : false
        };
        if(req.params.blogId){
            query._id = new ObjectId(req.params.blogId);
        }
        if(req.query.active){
            query.active = true;
            query["relatedFiles.active"] = true;
        }
        var sortOpts = {
            "relatedFiles.addedOn" : -1
        };
        var groupOpts = {
            _id : "$_id",
            document : {
                $push : "$relatedFiles"
            }
        };

        return new Promise(function (resolve, reject) {
            dataProviderHelper.getEmbeddedDocumentsWithoutPagination(Blog, query, documentFieldsBlogDoc, '$relatedFiles', sortOpts, groupOpts)
                .then(function (lstDocuments) {
                    var lstBlogDocument = [];
                    if(lstDocuments && lstDocuments.length > 0){
                        lstBlogDocument = lstDocuments[0].document;
                    }
                    resolve(lstBlogDocument);
                })
                .catch(function (err) {
                    reject(err);
                });
        });
    };

    _p.getBlogDocumentInfoByBlogID = function (req) {
        var query = {
            "_id" : new ObjectId(req.params.blogId),
            "deleted" : false,
            "relatedFiles._id":  new ObjectId(req.params.documentId),
            "relatedFiles.deleted":  false
        };

        var sortOpts = {
            "relatedFiles.addedOn" : -1
        };

        var selectDocFields = documentFieldsBlogDoc;
        selectDocFields["relatedFiles.docProperties"] = 1;

        var groupOpts = {
            _id : "$_id",
            document : {
                $push : "$relatedFiles"
            }
        };

        return new Promise(function (resolve, reject) {
            dataProviderHelper.getEmbeddedDocumentsWithoutPagination(Blog, query, selectDocFields, '$relatedFiles', sortOpts, groupOpts)
                .then(function (blogDocumentInfo) {
                    var blogDocumentObj = {};

                    if(blogDocumentInfo && blogDocumentInfo.length>0){
                        blogDocumentObj = blogDocumentInfo[0].document[0];
                    }
                    resolve(blogDocumentObj);
                })
                .catch(function (err) {
                    reject(err);
                });
        });
    };
    
    _p.postBlogRelatedDocument = function (req, res, next) {
        req.body = JSON.parse(req.body.data);

        var documentInfo = utilityHelper.getDocumentFileInfo(req, null, next);
        if(documentInfo._documentName && req.body.documentTitle !== ""){
            var modelInfo = utilityHelper.sanitizeUserInput(req, next);
            var blogId='';
            if(req.params.blogId){
                blogId=req.params.blogId;
            }

            var documentObj = BlogModule.CreateBlogDocument(modelInfo.documentTitle, documentInfo, req.decoded.user.username, modelInfo.active);

            var embedDocChildSchema = {
                'relatedFiles' : documentObj
            };

            dataProviderHelper.saveModelToEmbeddedDocument(Blog, embedDocChildSchema, blogId)
                .then(function () {
                    res.status(HTTPStatus.OK);
                    res.json({
                        message: messageConfig.blog.saveMessageDocument
                    });
                })
                .catch(function (err) {
                    return next(err);
                });

        }else {
            var message  = '';
            if(!documentInfo._documentName){
                message = messageConfig.blog.fieldRequiredDocument;
            }else{
                message = messageConfig.blog.validationErrMessage.documentTitle;
            }
            res.status(HTTPStatus.BAD_REQUEST);
            res.json({
                message: message
            });
        }
    };


    _p.updateBlogDocumentInfo = function (req,res, next) {
        req.body = JSON.parse(req.body.data);

        var documentInfo = utilityHelper.getDocumentFileInfo(req, req.blogDocumentInfo, next);

        if(documentInfo._documentName  && req.body.documentTitle !== ""){
            var modelInfo = utilityHelper.sanitizeUserInput(req, next);
            var query = {
                '_id' : req.params.blogId,
                'relatedFiles._id' : {
                    $in: req.params.documentId
                },
                'deleted' : false,
                'relatedFiles.deleted' : false
            };

            var newBlogDocument = {
                'relatedFiles.$.documentName' : documentInfo._documentName,
                'relatedFiles.$.docProperties.documentMimeType' : documentInfo._documentMimeType,
                'relatedFiles.$.docProperties.docPath' : documentInfo._documentPath,
                'relatedFiles.$.documentTitle'  : modelInfo.documentTitle,
                'relatedFiles.$.active' : modelInfo.active,
                'relatedFiles.$.updatedBy' : req.decoded.user.username,
                'relatedFiles.$.updatedOn' : new Date()
            };

            var multiOpts = false;

            dataProviderHelper.updateModelData(Blog, query, newBlogDocument, multiOpts)
                .then(function () {
                    res.status(HTTPStatus.OK);
                    res.json({
                        message: messageConfig.blog.updateMessageBlogDocument
                    });
                })
                .catch(function (err) {
                    return next(err);
                });
        }else {
            var message  = '';
            if(!documentInfo._documentName){
                message = messageConfig.blog.fieldRequiredDocument;
            }else{
                message = messageConfig.blog.validationErrMessage.documentTitle;
            }
            res.status(HTTPStatus.BAD_REQUEST);
            res.json({
                message: message
            });
        }
    };

    _p.deleteBlogDocumentInfo = function (req,res, next) {
        var query = {
            '_id' : req.params.blogId,
            'relatedFiles._id' : {
                $in: req.params.documentId
            }
        };

        var newBlogDocument = {
            'relatedFiles.$.deleted' : true,
            'relatedFiles.$.deletedBy' : req.decoded.user.username,
            'relatedFiles.$.deletedOn' : new Date()
        };


        var multiOpts = false;

        dataProviderHelper.updateModelData(Blog, query, newBlogDocument, multiOpts)
            .then(function () {
                res.status(HTTPStatus.OK);
                res.json({
                    message: messageConfig.blog.deleteMessageBlogDocument
                });
            })
            .catch(function (err) {
                return next(err);
            });
    };

    _p.getBlogDetailByUrlSlog = function (req, next) {
        var year = '';
        var month = '';
        var day = '';
        if(req.params.year){
            year = req.params.year;
        }
        if(req.params.month){
            month = req.params.month;
        }
        if(req.params.day){
            day = req.params.day;
        }
        var query={
            'active' : true,
            'deleted' : false,
            'urlSlog' : req.params.titleSlog
        };

        var date = year + '-' + month + '-' + day;
        if (year && month && day) {
            var formattedDate = utilityHelper.getFormattedDate(new Date(date), "/", next);
            formattedDate = new Date(formattedDate);
            formattedDate = formattedDate.setHours(0, 0, 0, 0);

            var endOfDayDateTime = new Date(date);
            endOfDayDateTime = endOfDayDateTime.setHours(23, 59, 59, 999);
            query.addedOn = {$gt: formattedDate, $lt: endOfDayDateTime};
        }
        var groupOpts = {
            _id : "$_id",
            document : {
                $push : "$relatedFiles"
            }
        };
        var populationQueryOptsTag = { postCount : { $gt: 0 } };
        var queryDocOpts = {
            "relatedFiles.deleted" : false,
            "relatedFiles.active" : true
        };

        var sortDocOpts = {
            "relatedFiles.addedOn" : -1
        };

        // var selectDetailFields = documentFieldsBlog + ' relatedFiles.docProperties relatedFiles.documentName relatedFiles.documentTitle';

        return new Promise(function (resolve, reject) {
            dataProviderHelper.getAllWithoutFieldsPaginationMultiPopulation(Blog, query, documentFieldsBlog, 'tags', 'seoEntry', populationFieldsTag, populationQueryOptsTag, populationFieldsSeoMetaTag)
                .then(function (blogList) {
                    var blogDetailObj = {};
                    if(blogList.length > 0){
                        blogDetailObj = blogList[0];
                        var updatedCount = (parseInt(blogDetailObj.articleViews) + 1);
                        blogDetailObj.articleViews = updatedCount;

                        queryDocOpts._id = blogDetailObj._id;
                        var queryCategoryOpts = {
                            categoryId: blogDetailObj.categoryId,
                            deleted: false
                        };

                        return [blogDetailObj,
                            dataProviderHelper.getEmbeddedDocumentsWithoutPagination(Blog, queryDocOpts, documentFieldsBlogDoc, '$relatedFiles', sortDocOpts, groupOpts),
                            dataProviderHelper.findById(BlogCategory, blogDetailObj.categoryId, documentFieldsCategory),
                            dataProviderHelper.checkForDuplicateEntry(Blog, queryCategoryOpts),
                            _p.updateBlogArticleViewCount(blogDetailObj._id, updatedCount) ];
                    }else{
                        resolve(null);
                    }
                })
                .spread(function (blogDetailObj, lstBlogDocument, categoryInfo, articleCounts) {
                    var returnObj = {};
                    var docArr= [];
                    if(lstBlogDocument && lstBlogDocument.length > 0){
                        docArr = lstBlogDocument[0].document;
                    }
                    returnObj.data = blogDetailObj;
                    returnObj.doclist = docArr;
                    returnObj.categoryInfo = categoryInfo;
                    returnObj.articleCounts = articleCounts;
                    resolve(returnObj);
                })
                .catch(function (err){
                    reject(err);
                });
        });
    };

    _p.updateBlogArticleViewCount = function (_blogId, _pageViews) {
        var queryOpts = {
            '_id': _blogId
        };
        var updateOpts = {
            'pageViews' : _pageViews
        };
        var multiOpts = false;
        return dataProviderHelper.updateModelData(Blog, queryOpts, updateOpts, multiOpts);
    };

    _p.getBlogByTag = function(req, next){
        var tag = '';
        if(req.params.blogTag){
            tag = req.params.blogTag;
        }
        var tagUrlSlog = utilityHelper.getCleanURL(tag, next);
        var query={
            'urlSlogTag' : tagUrlSlog
        };
        return new Promise(function(resolve, reject) {
            dataProviderHelper.findOne(BlogTag, query, '')
                .then(function(tagObj){
                    if(tagObj){
                        req.query.tagid = tagObj._id;
                        req.query.active = true;
                        return _p.getAllBlogArticles(req, next);
                    }else{
                        return [];
                    }
                })
                .then(function(blogList){
                    resolve(blogList);
                })
                .catch(function(err){
                    reject(err);
                });
        });
    };

    _p.getBlogByCategory = function(req, next){
        var category = '';
        if(req.params.blogCategory){
            category = req.params.blogCategory;
        }
        var categorySlog = utilityHelper.getCleanURL(category, next);
        var query={
            'deleted' : false,
            'active' : true
        };
        query.urlSlogCategory = categorySlog;
        return new Promise(function(resolve, reject) {
            dataProviderHelper.findOne(BlogCategory, query, documentFieldsCategory)
                .then(function(categoryObj){
                    if(categoryObj){
                        req.query.categoryid = categoryObj._id;
                        req.query.active = true;
                        return _p.getAllBlogArticles(req, next);
                    }else{
                        return [];
                    }
                })
                .then(function(blogList){
                    resolve(blogList);
                })
                .catch(function(err){
                    reject(err);
                });
        });
    };

    return {
        blogCategoryConstructor : BlogModule.CreateBlogCategory,
        getBlogCategories : _p.getBlogCategories,
        getBlogCategoryByID : _p.getBlogCategoryByID,
        postBlogCategory : _p.postBlogCategory,
        patchBlogCategory : _p.patchBlogCategory,
        updateBlogCategory : _p.updateBlogCategory,
        getAllBlogArticles : _p.getAllBlogArticles,
        getBlogByID : _p.getBlogByID,
        postBlogArticle : _p.postBlogArticle,
        deleteBlog : _p.deleteBlog,
        updateBlog : _p.updateBlog,
        getAllBlogTags : _p.getAllBlogTags,
        getBlogDetailByUrlSlog : _p.getBlogDetailByUrlSlog,
        getBlogAssociatedSeoMetaTag : _p.getBlogAssociatedSeoMetaTag,
        updateBlogSeoMetaTag : _p.updateBlogSeoMetaTag,
        getBlogByTag : _p.getBlogByTag,
        getBlogByCategory : _p.getBlogByCategory,
        postBlogRelatedDocument : _p.postBlogRelatedDocument,
        updateBlogDocumentInfo : _p.updateBlogDocumentInfo,
        getBlogDocumentInfoByBlogID : _p.getBlogDocumentInfoByBlogID,
        getAllRelatedBlogDocuments : _p.getAllRelatedBlogDocuments,
        deleteBlogDocumentInfo : _p.deleteBlogDocumentInfo
    };

})();

module.exports = blogController;