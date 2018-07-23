var newsController = (function () {

    'use strict';

    var cloudinary = require('cloudinary'),
        HTTPStatus = require('http-status'),
        messageConfig = require('../configs/api.message.config'),
        dataProviderHelper = require('../data/mongo.provider.helper'),
        newsModel = require('../models/news.server.model'),
        News = newsModel.News,
        NewsImage = newsModel.NewsImage,
        NewsCategory = newsModel.NewsCategory,
        cloudinaryHelper = require('../helpers/cloudinary.helper'),
        utilityHelper = require('../helpers/utilities.helper'),
        errorHelper = require('../helpers/error.helper'),
        Promise = require("bluebird");

    var documentFieldsNews = '_id newsTitle urlSlog categoryID newsSummary newsDescription newsAuthor newsDate pageViews active image addedOn';
    var populationFields = '_id imageName imageTitle imageAltText coverImage active';
    var documentFieldsCategory = '_id categoryName categoryDescription urlSlogCategory active';

    function NewsModule() {}

    NewsModule.CreateNewsCategory = function (newsCategoryObj, loggedInUser, _slogVal) {
        var newsCategoryInfo = new NewsCategory();
        newsCategoryInfo.categoryName = newsCategoryObj.categoryName;
        newsCategoryInfo.categoryDescription = newsCategoryObj.categoryDescription;
        newsCategoryInfo.urlSlogCategory = _slogVal;
        newsCategoryInfo.active = newsCategoryObj.active;
        newsCategoryInfo.addedBy = loggedInUser;
        newsCategoryInfo.addedOn = new Date();
        return newsCategoryInfo;
    };

    NewsModule.CreateNews = function (newsObj, modelHtmlObj, loggedInUser, imageInfo, _slogVal) {
        var newsInfo = new News();
        newsInfo.newsTitle = newsObj.newsTitle;
        newsInfo.urlSlog = _slogVal;
        newsInfo.categoryID = newsObj.categoryID;
        newsInfo.newsSummary = newsObj.newsSummary;
        newsInfo.newsDescription = modelHtmlObj.newsDescription;
        newsInfo.newsAuthor = newsObj.newsAuthor;
        newsInfo.newsDate = ((newsObj.newsDate === "") ? new Date() : newsObj.newsDate);
        newsInfo.image = imageInfo._id;
        newsInfo.pageViews = 0;
        newsInfo.active = newsObj.active;
        newsInfo.addedBy = loggedInUser;
        newsInfo.addedOn = new Date();
        return newsInfo;
    };

    NewsModule.CreateNewsImage = function (newsImageObj, loggedInUser, imageInfo, coverImage, activeStatus) {
        var newsImageInfo = new NewsImage();
        newsImageInfo.imageName = imageInfo._imageName;
        newsImageInfo.imageTitle = newsImageObj.imageTitle;
        newsImageInfo.imageAltText = newsImageObj.imageAltText;
        newsImageInfo.coverImage = coverImage;
        newsImageInfo.imageProperties = {
            imageExtension: imageInfo._imageExtension,
            imagePath: imageInfo._imagePath
        };
        newsImageInfo.active = activeStatus;
        newsImageInfo.addedBy = loggedInUser;
        newsImageInfo.addedOn = new Date();

        return newsImageInfo;
    };

    var _p = NewsModule.prototype;

    _p.checkValidationErrors = function (req) {
        req.checkBody('newsTitle', messageConfig.news.validationErrMessage.newsTitle).notEmpty();
        req.checkBody('categoryID', messageConfig.news.validationErrMessage.categoryID).notEmpty();
        req.checkBody('newsDescription', messageConfig.news.validationErrMessage.newsDescription).notEmpty();
        req.checkBody('newsDate', messageConfig.news.validationErrMessage.newsDate).notEmpty();
        // already deprecated 'isDate()' from validator.js
        // if (req.body.newsDate) {
        //     req.checkBody('newsDate', messageConfig.news.validationErrMessage.newsDateValid).isDate();
        // }
        return req.validationErrors();
    };

    _p.getAllNewsCategory = function (req) {
        var query = {};
        if (req.query.active) {
            query.active = req.query.active;
        }
        query.deleted = false;
        var sortField = {
            addedOn: -1
        };
        return dataProviderHelper.getAllWithDocumentFieldsNoPagination(NewsCategory, query, documentFieldsCategory, sortField);
    };

    _p.getNewsCategoryInfoByID = function (req) {
        return dataProviderHelper.findById(NewsCategory, req.params.newsCategoryId, documentFieldsCategory);
    };

    _p.patchNewsCategory = function (req, res, next) {
        req.newsCategoryInfo.deleted = true;
        req.newsCategoryInfo.deletedOn = new Date();
        req.newsCategoryInfo.deletedBy = req.decoded.user.username;

        var _query = {
            'categoryID' : req.params.newsCategoryId,
            'deleted': false
        };

        dataProviderHelper.checkForDuplicateEntry(News, _query)
            .then(function (count) {
                if(count > 0){
                    throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.CONFLICT + '", "message": "' + messageConfig.news.categoryDeleteDeny + '"}');
                } else {
                    dataProviderHelper.save(req.newsCategoryInfo)
                }
            })
            .then(function () {
                res.status(HTTPStatus.OK);
                res.json({
                    message: messageConfig.news.deleteMessageNewsCategory
                });
            })
            .catch(Promise.CancellationError, function (cancellationErr) {
                errorHelper.customErrorResponse(res, cancellationErr, next);
            })
            .catch(function (err) {
                return next(err);
            });
    };

    _p.postNewsCategory = function (req, res, next) {
        if (req.body.categoryName) {
            var modelInfo = utilityHelper.sanitizeUserInput(req, next);
            var query = {};
            var _slogVal = utilityHelper.getCleanURL(modelInfo.categoryName, next);
            query.urlSlogCategory = _slogVal;
            query.deleted = false;

            dataProviderHelper.checkForDuplicateEntry(NewsCategory, query)
                .then(function (count) {
                    if (count > 0) {
                        throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.CONFLICT + '", "message": "' + messageConfig.news.alreadyExistsCategory + '"}');
                    } else {
                        var newsCategoryInfo = NewsModule.CreateNewsCategory(modelInfo, req.decoded.user.username, _slogVal);
                        return dataProviderHelper.save(newsCategoryInfo);
                    }
                })
                .then(function () {
                    res.status(HTTPStatus.OK);
                    res.json({
                        message: messageConfig.news.saveMessageNewsCategory
                    });
                })
                .catch(Promise.CancellationError, function (cancellationErr) {
                    errorHelper.customErrorResponse(res, cancellationErr, next);
                })
                .catch(function (err) {
                    return next(err);
                });
        } else {
            res.status(HTTPStatus.BAD_REQUEST);
            res.json({
                message: messageConfig.news.fieldRequiredNewsCategory
            });
        }
    };


    _p.updateNewsCategory = function (req, res, next) {

        if (req.body.categoryName) {
            var modelInfo = utilityHelper.sanitizeUserInput(req, next);
            var _slogVal = utilityHelper.getCleanURL(modelInfo.categoryName, next);

            //Check if the previously saved clean url matches with the current clean url or not, if matches, then no need to check for duplicacy
            if (req.newsCategoryInfo.urlSlogCategory !== _slogVal) {

                var query = {};
                // For checking duplicate entry
                //matches anything that exactly matches the news category title, case  insensitive
                query.categoryName = {$regex: new RegExp('^' + modelInfo.categoryName + '$', "i")};
                query.deleted = false;

                dataProviderHelper.checkForDuplicateEntry(NewsCategory, query)
                    .then(function (count) {
                        if (count > 0) {
                            throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.CONFLICT + '", "message": "' + messageConfig.news.alreadyExistsCategory + '"}');
                        } else {
                            return _p.updateNewsCategoryFunc(req, res, modelInfo, _slogVal);
                        }
                    })
                    .then(function () {
                        res.status(HTTPStatus.OK);
                        res.json({
                            message: messageConfig.news.updateMessageNewsCategory
                        });
                    })
                    .catch(Promise.CancellationError, function (cancellationErr) {
                        errorHelper.customErrorResponse(res, cancellationErr, next);
                    })
                    .catch(function (err) {
                        return next(err);
                    });
            } else {
                _p.updateNewsCategoryFunc(req, res, modelInfo, _slogVal)
                    .then(function () {
                        res.status(HTTPStatus.OK);
                        res.json({
                            message: messageConfig.news.updateMessageNewsCategory
                        });
                    })
                    .catch(function (err) {
                        return next(err);
                    });
            }
        } else {
            res.status(HTTPStatus.BAD_REQUEST);
            res.json({
                message: messageConfig.news.fieldRequiredNewsCategory
            });
        }
    };

    _p.updateNewsCategoryFunc = function (req, res, modelInfo, _slogVal) {
        req.newsCategoryInfo.categoryName = modelInfo.categoryName;
        req.newsCategoryInfo.categoryDescription = modelInfo.categoryDescription;
        req.newsCategoryInfo.urlSlogCategory = _slogVal;
        req.newsCategoryInfo.active = modelInfo.active;
        req.newsCategoryInfo.updatedBy = req.decoded.user.username;
        req.newsCategoryInfo.updatedOn = new Date();
        return dataProviderHelper.save(req.newsCategoryInfo);
    };

    _p.getAllNews = function (req, next) {
        var pagerOpts = utilityHelper.getPaginationOpts(req, next);
        var query = {};
        // matches anything that  starts with the inputted news title, case insensitive
        if (req.query.newstitle) {
            query.newsTitle = {$regex: new RegExp('.*' + req.query.newstitle, "i")};
        }
        if (req.query.active) {
            query.active = true;
        }
        if (req.query.categoryid) {
            query.categoryID = req.query.categoryid;
        }
        query.deleted = false;
        var populationQueryOpts = { coverImage: true };
        var populationPath = 'image';
        return dataProviderHelper.getAllWithFieldsPaginationPopulation(News, query, pagerOpts, documentFieldsNews, populationPath, populationFields, populationQueryOpts);
    };


    _p.getNewsByID = function (req) {
        var query = {
            '_id': req.params.newsId
        };
        var populationQueryOpts = { coverImage: true };
        var sortOpts = { addedOn: -1 };
        var populationSelectFields = populationFields + ' imageProperties';
        var populationPath = 'image';
        return dataProviderHelper.getByIdWithPopulation(News, query, populationPath, populationQueryOpts, sortOpts, populationSelectFields, documentFieldsNews);
    };

    _p.patchNews = function (req, res, next) {
        req.newsInfo.deleted = true;
        req.newsInfo.deletedOn = new Date();
        req.newsInfo.deletedBy = req.decoded.user.username;
        dataProviderHelper.save(req.newsInfo)
            .then(function () {
                res.status(HTTPStatus.OK);
                res.json({
                    message: messageConfig.news.deleteMessageNews
                });
            })
            .catch(function (err) {
                return next(err);
            });
    };

    _p.postNews = function (req, res, next) {
        req.body = JSON.parse(req.body.data);

        var errors = _p.checkValidationErrors(req);
        if (errors) {
            res.status(HTTPStatus.BAD_REQUEST);
            res.json({
                message: errors
            });
        } else {
            var modelInfo = utilityHelper.sanitizeUserInput(req, next);
            var query = {};
            var _slogVal = utilityHelper.getCleanURL(modelInfo.newsTitle, next);
            query.urlSlog = _slogVal;
            var currentDate = new Date();
            var startDate = currentDate.setHours(0, 0, 0, 0);
            var endDate = currentDate.setHours(23, 59, 59, 999);
            query.addedOn = {
                $gt: startDate,
                $lt: endDate
            };
            query.deleted = false;

            dataProviderHelper.checkForDuplicateEntry(News, query)
                .then(function (count) {
                    if (count > 0) {
                        throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.CONFLICT + '", "message": "' + messageConfig.news.alreadyExistsNews + '"}');
                    } else {
                        var contentInfo = {};
                        contentInfo.newsDescription = req.body.newsDescription;
                        var modelHtmlInfo = utilityHelper.sanitizeUserHtmlBodyInput(contentInfo, next);


                        var imageInfo = utilityHelper.getFileInfo(req, null, next);
                        modelInfo.imageTitle = modelInfo.newsTitle;
                        modelInfo.imageAltText = modelInfo.newsTitle;
                        var image = NewsModule.CreateNewsImage(modelInfo, req.decoded.user.username, imageInfo, true, true);
                        var newsInfo = NewsModule.CreateNews(modelInfo, modelHtmlInfo, req.decoded.user.username, image, _slogVal);
                        return [image, dataProviderHelper.save(newsInfo)];
                    }
                })
                .spread(function (image) {
                    if (image.imageName !== "") {
                        return dataProviderHelper.save(image);
                    }
                    else {
                        return Promise.resolve();
                    }
                })
                .then(function () {
                    res.status(HTTPStatus.OK);
                    res.json({
                        message: messageConfig.news.saveMessageNews
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


    _p.updateNews = function (req, res, next) {
        req.body = JSON.parse(req.body.data);

        var errors = _p.checkValidationErrors(req);
        if (errors) {
            res.status(HTTPStatus.BAD_REQUEST);
            res.json({
                message: errors
            });
        } else {

            var modelInfo = utilityHelper.sanitizeUserInput(req, next);
            var _slogVal = utilityHelper.getCleanURL(modelInfo.newsTitle, next);

            if (req.newsInfo.urlSlog !== _slogVal) {

                var query = {};

                // For checking duplicate entry
                query.urlSlog = _slogVal;
                var currentDate = new Date();
                var startDate = currentDate.setHours(0, 0, 0, 0);
                var endDate = currentDate.setHours(23, 59, 59, 999);
                query.addedOn = {
                    $gt: startDate,
                    $lt: endDate
                };
                query.deleted = false;

                dataProviderHelper.checkForDuplicateEntry(News, query)
                    .then(function (count) {
                        if (count > 0) {
                            throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.CONFLICT + '", "message": "' + messageConfig.news.alreadyExistsNews + '"}');
                        } else {
                            return _p.updateNewsFunc(req, res, modelInfo, _slogVal, next);
                        }
                    })
                    .then(function () {
                        if (req.newsInfo.image.length > 0) {
                            return dataProviderHelper.save(req.newsInfo.image[0]);
                        } else {
                            return Promise.resolve();
                        }
                    })
                    .then(function () {
                        res.status(HTTPStatus.OK);
                        res.json({
                            message: messageConfig.news.updateMessageNews
                        });
                    })
                    .catch(Promise.CancellationError, function (cancellationErr) {
                        errorHelper.customErrorResponse(res, cancellationErr, next);
                    })
                    .catch(function (err) {
                        return next(err);
                    });
            } else {
                _p.updateNewsFunc(req, res, modelInfo, _slogVal, next)
                    .then(function () {
                        if (req.newsInfo.image.length > 0) {
                            return dataProviderHelper.save(req.newsInfo.image[0]);
                        } else {
                            return Promise.resolve();
                        }
                    })
                    .then(function () {
                        res.status(HTTPStatus.OK);
                        res.json({
                            message: messageConfig.news.updateMessageNews
                        });
                    })
                    .catch(function (err) {
                        return next(err);
                    });
            }
        }
    };

    _p.updateNewsFunc = function (req, res, modelInfo, _slogVal, next) {
        var imageInfo = utilityHelper.getFileInfo(req, req.newsInfo.image[0], next);
        var contentInfo = {};
        contentInfo.newsDescription = req.body.newsDescription;
        var modelHtmlInfo = utilityHelper.sanitizeUserHtmlBodyInput(contentInfo, next);


        req.newsInfo.newsTitle = modelInfo.newsTitle;
        req.newsInfo.urlSlog = _slogVal;
        req.newsInfo.categoryID = modelInfo.categoryID;
        req.newsInfo.newsSummary = modelInfo.newsSummary;
        req.newsInfo.newsDescription = modelHtmlInfo.newsDescription;
        req.newsInfo.newsAuthor = modelInfo.newsAuthor;
        req.newsInfo.newsDate = modelInfo.newsDate;
        req.newsInfo.active = modelInfo.active;
        req.newsInfo.updatedBy = req.decoded.user.username;
        req.newsInfo.updatedOn = new Date();

        if (req.newsInfo.image.length > 0) {
            req.newsInfo.image[0].imageTitle = modelInfo.newsTitle;
            req.newsInfo.image[0].imageAltText = modelInfo.newsTitle;
            req.newsInfo.image[0].coverImage    = true;

            req.newsInfo.image[0].imageName = imageInfo._imageName;
            req.newsInfo.image[0].imageProperties.imageExtension = imageInfo._imageExtension;
            req.newsInfo.image[0].imageProperties.imagePath = imageInfo._imagePath;

            req.newsInfo.image[0].updatedBy = req.decoded.user.username;
            req.newsInfo.image[0].updatedOn = new Date();
        } else {
            var imageDataObj = new NewsImage({
                imageTitle: modelInfo.newsTitle,
                imageAltText: modelInfo.newsTitle,
                imageName: imageInfo._imageName,
                imageProperties: {
                    imageExtension: imageInfo._imageExtension,
                    imagePath: imageInfo._imagePath
                },
                coverImage: true,
                active: true,
                updatedBy: req.decoded.user.username,
                updatedOn: new Date()
            });

            req.newsInfo.image.push(imageDataObj);
        }

        return dataProviderHelper.save(req.newsInfo);
    };

    _p.getAllNewsImagesByNewsID = function (req) {
        var query = {};
        if (req.params.newsId) {
            query = {
                '_id': req.params.newsId
            };
        }
        query.deleted = false;

        //  To ignore the parent document and return only the embedded object, we have to exclude the _id from the query

        var excludeFields = '-_id -newsTitle -urlSlog -categoryID -newsSummary -newsDescription -newsAuthor -pageViews -active -addedOn -newsDate -addedBy -updatedBy  -updatedOn -deleted -__v ';
        var populationQueryOpts = {};
        if (req.query.active) {
            query.active = req.query.active;
            populationQueryOpts.active = true;
        }
        var sortOpts = { addedOn: -1 };
        var populationPath = 'image';

        return dataProviderHelper.getByIdWithPopulation(News, query, populationPath, populationQueryOpts, sortOpts, populationFields, excludeFields);
    };

    _p.getNewsImageInfoByImageID = function (req) {
        var newsImageSelectFields = populationFields + ' imageProperties';
        return dataProviderHelper.findById(NewsImage, req.params.imageId, newsImageSelectFields);
    };

    _p.postNewsImageInfo = function (req, res, next) {
        req.body = JSON.parse(req.body.data);
        var imageInfo = utilityHelper.getFileInfo(req, null, next);
        if (imageInfo._imageName) {
            var newsId = '';
            if (req.params.newsId) {
                newsId = req.params.newsId;
            }
            var modelInfo = utilityHelper.sanitizeUserInput(req, next);
            var newsImageInfo = NewsModule.CreateNewsImage(modelInfo, req.decoded.user.username, imageInfo, false, modelInfo.active);

            dataProviderHelper.save(newsImageInfo)
                .then(function () {
                    var pushSchema = {
                        'image': newsImageInfo._id
                    };
                    return dataProviderHelper.findByIdAndUpdate(News, newsId, pushSchema);
                })
                .then(function () {
                    res.status(HTTPStatus.OK);
                    res.json({
                        message: messageConfig.news.saveMessageNewsImage
                    });
                })
                .catch(function (err) {
                    return next(err);
                });
        } else {
            res.status(HTTPStatus.BAD_REQUEST);
            res.json({
                message: messageConfig.news.fieldRequiredNewsImage
            });
        }
    };


    _p.updateNewsImageInfo = function (req, res, next) {
        req.body = JSON.parse(req.body.data);
        var imageInfo = utilityHelper.getFileInfo(req, req.newsImageInfo, next),
            modelInfo = utilityHelper.sanitizeUserInput(req, next);

        if (imageInfo._imageName) {
            var newsImageSchema = {
                'imageTitle': modelInfo.imageTitle,
                'imageAltText': modelInfo.imageAltText,
                'active': modelInfo.active,
                'updatedBy': req.decoded.user.username,
                'updatedOn': new Date()
            };
            newsImageSchema.imageName = imageInfo._imageName;
            newsImageSchema.imageProperties = {
                imageExtension: imageInfo._imageExtension,
                imagePath: imageInfo._imagePath
            };
            var updateQueryOpts = {
                _id: req.params.imageId
            };

            var multiOpts = false;

            dataProviderHelper.updateModelData(NewsImage, updateQueryOpts, newsImageSchema, multiOpts)
                .then(function () {
                    res.status(HTTPStatus.OK);
                    res.json({
                        message: messageConfig.news.updateMessageNewsImage
                    });
                })
                .catch(function (err) {
                    return next(err);
                });
        }
        else {
            res.status(HTTPStatus.BAD_REQUEST);
            res.json({
                message: messageConfig.news.fieldRequiredNewsImage
            });
        }
    };

    _p.updateCoverImage = function (req, res, next) {
        //For checking same id of the existing cover image id and image to be updated as cover image id
       //_id is the object id of the news image data which is to be set as cover image
        if (req.body._id !== req.newsImageInfo._id) {
            req.newsImageInfo.coverImage = false;
            dataProviderHelper.save(req.newsImageInfo)
                .then(function () {
                    var newsImageSchema = {
                        'coverImage': true
                    };
                    var updateQueryOpts = {
                        _id: req.body._id
                    };

                    var multiOpts = false;

                    return dataProviderHelper.updateModelData(NewsImage, updateQueryOpts, newsImageSchema, multiOpts);
                })
                .then(function () {
                    res.status(HTTPStatus.OK);
                    res.json({
                        message: messageConfig.news.updateCoverImage
                    });
                })
                .catch(function (err) {
                    return next(err);
                });
        } else {
            res.status(HTTPStatus.NOT_MODIFIED);
            res.end();
        }
    };

    _p.removeNewsImage = function (req, res, next) {
        if (req.newsImageInfo.coverImage === false) {

            var deleteQuqeryOpts = {
                '_id': req.params.imageId
            };

            dataProviderHelper.removeModelData(NewsImage, deleteQuqeryOpts)
                .then(function () {

                    var multiOpts = false;

                    var queryOpts = {
                        _id: req.params.newsId
                    };

                    var updateOpts =  {
                        $pull: {
                            image: req.params.imageId
                        }
                    };

                   return dataProviderHelper.updateModelData(News, queryOpts, updateOpts, multiOpts);
                })
                .then(function(){
                    res.status(HTTPStatus.OK);
                    res.json({
                        message: messageConfig.news.deleteMessageNewsImage
                    });

                    return Promise.resolve();
                })
                .then(function () {
                    cloudinaryHelper.deleteImage(req.newsImageInfo.imageName, cloudinary, req, res, function (result) {

                    });
                })
                .catch(function (err) {
                    return next(err);
                });
        } else {
            res.status(HTTPStatus.BAD_REQUEST);
            res.json({
                message: messageConfig.news.coverImageWarning
            });

        }
    };
    
    _p.updateNewsCount = function (_newsId, _pageViews) {
        var queryOpts = {
            '_id': _newsId
        };
        var updateOpts = {
            'pageViews' : _pageViews
        }
        return dataProviderHelper.updateModelData(News, queryOpts, updateOpts, false);
    };
    
    _p.getNewsDetailByTitleSlog = function (req, res, next) {
        var year = '';
        var month = '';
        var day = '';
        if (req.params.year) {
            year = req.params.year;
        }
        if (req.params.month) {
            month = req.params.month;
        }
        if (req.params.day) {
            day = req.params.day;
        }

        var query = {
            'active': true,
            'deleted': false,
            'urlSlog': req.params.titleSlog
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

        var sortOpts = {coverImage: -1};
        var populationQueryOpts = {active: true};
        var populationPath = 'image';

        return new Promise(function (resolve, reject) {
            dataProviderHelper.getAllWithFieldsPopulation(News, query, documentFieldsNews, populationPath, populationFields, populationQueryOpts, sortOpts)
                .then(function (newsList) {
                    var newsDataObj = {};
                    if (newsList.length > 0) {
                        newsDataObj = newsList[0];
                        var updatedCount = (parseInt(newsDataObj.pageViews) + 1);
                        newsDataObj.pageViews = updatedCount;
                        return [newsDataObj, _p.updateNewsCount(newsDataObj._id, updatedCount)];
                    }else{
                        resolve(null);
                    }
                })
                .spread(function(newsDataObj){
                    resolve(newsDataObj);
                })
                .catch(function (err) {
                    reject(err);
                });
        });
    };


    return {
        getAllNews: _p.getAllNews,
        getAllNewsCategory: _p.getAllNewsCategory,
        getAllNewsImagesByNewsID: _p.getAllNewsImagesByNewsID,
        getNewsByID: _p.getNewsByID,
        getNewsCategoryInfoByID: _p.getNewsCategoryInfoByID,
        getNewsDetailByTitleSlog: _p.getNewsDetailByTitleSlog,
        getNewsImageInfoByImageID: _p.getNewsImageInfoByImageID,
        patchNews: _p.patchNews,
        patchNewsCategory: _p.patchNewsCategory,
        postNews: _p.postNews,
        postNewsCategory: _p.postNewsCategory,
        postNewsImageInfo: _p.postNewsImageInfo,
        removeNewsImage: _p.removeNewsImage,
        updateCoverImage: _p.updateCoverImage,
        updateNews: _p.updateNews,
        updateNewsCategory: _p.updateNewsCategory,
        updateNewsImageInfo: _p.updateNewsImageInfo
    };

})();

module.exports = newsController;