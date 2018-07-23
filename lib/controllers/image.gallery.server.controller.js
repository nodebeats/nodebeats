var imageGalleryController = (function () {

    'use strict';

    var dataProviderHelper = require('../data/mongo.provider.helper'),
        HTTPStatus = require('http-status'),
        messageConfig = require('../configs/api.message.config'),
        imageGalleryModel = require('../models/image.gallery.server.model'),
        Image = imageGalleryModel.Image,
        ImageGallery = imageGalleryModel.ImageGallery,
        utilityHelper = require('../helpers/utilities.helper'),
        mongoose = require('mongoose'),
        ObjectId = mongoose.Types.ObjectId,
        errorHelper = require('../helpers/error.helper'),
        Promise = require("bluebird");

    var documentFieldsAlbum = '_id albumName urlSlog albumDescription active addedOn';
    //
    //  To ignore the parent document and return only the embedded object, we have to exclude the _id from the query
    //
    var documentFieldsGalleryImage = {
        '_id': 0,
        'image._id': 1,
        'image.imageName' : 1,
        'image.imageTitle' : 1,
        'image.imageAltText' : 1,
        'image.imageDescription' :1,
        'image.coverImage' : 1,
        'image.active' : 1,
        'image.addedOn' : 1,
        'image.imageProperties' : 1
    };

    function ImageGalleryModule(){}

    ImageGalleryModule.CreateImageGalleryAlbum = function(imageGalleryAlbumObj, loggedInUser, _slogVal){
        var albumInfo = new ImageGallery();
        albumInfo.albumName = imageGalleryAlbumObj.albumName;
        albumInfo.urlSlog = _slogVal;
        albumInfo.albumDescription = imageGalleryAlbumObj.albumDescription;
        albumInfo.active = imageGalleryAlbumObj.active;
        albumInfo.addedBy = loggedInUser;
        albumInfo.addedOn = new Date();
        return albumInfo;
    };

    ImageGalleryModule.CreateImageGalleryImage = function(imageGalleryImageObj, loggedInUser, imageInfo){
        var galleryImageInfo = new Image();
        galleryImageInfo.imageName = imageInfo._imageName;
        galleryImageInfo.imageTitle = imageGalleryImageObj.imageTitle;
        galleryImageInfo.imageAltText = imageGalleryImageObj.imageAltText;
        galleryImageInfo.imageDescription = imageGalleryImageObj.imageDescription;
        galleryImageInfo.active = imageGalleryImageObj.active;
        galleryImageInfo.imageProperties = {
            imageExtension : imageInfo._imageExtension,
            imagePath : imageInfo._imagePath
        };
        galleryImageInfo.addedBy = loggedInUser;
        galleryImageInfo.addedOn = new Date();
        return galleryImageInfo;
    };

    var _p = ImageGalleryModule.prototype;

    _p.getAllGalleryAlbums = function(req, next){
        var pagerOpts = utilityHelper.getPaginationOpts(req, next);

        var query = {};
        // matches anything that  starts with the inputted album name, case insensitive
        if(req.query.albumname){
            query.albumName = { $regex: new RegExp('.*'+ req.query.albumname, "i") };
        }
        if(req.query.active){
            query.active = req.query.active;
        }
        query.deleted = false;
        var sortOpts = { addedOn: -1 };

        return dataProviderHelper.getAllWithDocumentFieldsPagination(ImageGallery, query, pagerOpts, documentFieldsAlbum, sortOpts);
    };

    _p.getAlbumInfoByID = function(req){
        return dataProviderHelper.findById(ImageGallery, req.params.albumId, documentFieldsAlbum);
    };

    _p.getAllGalleryImagesByAlbumID = function(req, next){
        var pagerOpts = utilityHelper.getPaginationOpts(req, next);
        var query = {};
        if(req.query.active){
            query = {
                'active' : true,
                "image.active": true
            };
        }
        if(req.params.albumId){
            query._id = new ObjectId(req.params.albumId);
        }
        query.deleted = false;
        var groupOpts = {
            _id : "$_id",
            image : {
                $push : "$image"
            }
        };

        var sortOpts = { "image.addedOn" : -1 };
        var unwindField = "$image";

        var countProjectFields = {
            _id: 0,
            count: { $size: "$image" }
        };

        return new Promise(function(resolve, reject) {
            dataProviderHelper.getAllEmbeddedDocumentsWithDocumentFieldsPagination(ImageGallery, query, pagerOpts, documentFieldsGalleryImage, sortOpts, groupOpts, countProjectFields, unwindField)
                .then(function(lstGalleryImages){
                    var imageList = [];
                    if(lstGalleryImages.dataList.length > 0){
                        imageList = lstGalleryImages.dataList[0].image;
                    }
                    var imageJsonInfo = {
                        dataList: imageList,
                        totalItems: lstGalleryImages.totalItems,
                        currentPage: lstGalleryImages.currentPage
                    };
                    resolve(imageJsonInfo);
                })
                .catch(function(err){
                    reject(err);
                });
        });
    };

    _p.getGalleryImageInfoByImageID = function (req) {

        var query = {
            "_id" : new ObjectId(req.params.albumId),
            "deleted" : false,
            "image._id" : new ObjectId(req.params.imageId)
        };
        var groupOpts = {
            _id : "$_id",
            image : {
                $push : "$image"
            }
        };
        var sortOpts = { "image.addedOn" : -1 };
        var unwindField = '$image';
        return new Promise(function(resolve, reject) {
            dataProviderHelper.getEmbeddedDocumentsWithoutPagination(ImageGallery, query, documentFieldsGalleryImage, unwindField, sortOpts, groupOpts)
                .then(function(galleryImageInfo){
                    var galleryImageObj = {};
                    if(galleryImageInfo && galleryImageInfo.length > 0){
                        galleryImageObj = galleryImageInfo[0].image[0];
                    }
                    resolve(galleryImageObj);
                })
                .catch(function(err){
                    reject(err);
                });
        });
    };

    _p.patchGalleryAlbum = function(req, res, next){
        req.albumInfo.deleted = true;
        req.albumInfo.deletedOn = new Date();
        req.albumInfo.deletedBy = req.decoded.user.username;

        dataProviderHelper.save(req.albumInfo)
            .then(function(){
                res.status(HTTPStatus.OK);
                res.json({
                    message: messageConfig.imageGallery.deleteMessageAlbum
                });
            })
            .catch(function(err){
                return next(err);
            });
    };

    _p.postAlbumInfo = function(req, res, next){
        if (req.body.albumName) {
            var modelInfo = utilityHelper.sanitizeUserInput(req, next);
            var query = {};
            var _slogVal = utilityHelper.getCleanURL(modelInfo.albumName, next);
            query.urlSlog = _slogVal;
            query.deleted = false;

            dataProviderHelper.checkForDuplicateEntry(ImageGallery, query)
                .then(function(count){
                    if(count > 0){
                        throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.CONFLICT + '", "message": "' + messageConfig.imageGallery.alreadyExists + '"}');
                    }else{
                        var albumInfo = ImageGalleryModule.CreateImageGalleryAlbum(modelInfo, req.decoded.user.username, _slogVal);
                        return dataProviderHelper.save(albumInfo);
                    }
                })
                .then(function(){
                    res.status(HTTPStatus.OK);
                    res.json({
                        message: messageConfig.imageGallery.saveMessageAlbum
                    });
                })
                .catch(Promise.CancellationError, function (cancellationErr) {
                    errorHelper.customErrorResponse(res, cancellationErr, next);
                })
                .catch(function(err){
                    return next(err);
                });
        }else {
            res.status(HTTPStatus.BAD_REQUEST);
            res.json({
                message: messageConfig.imageGallery.fieldRequiredAlbum
            });
        }
    };

    _p.postGalleryImageInfo = function (req, res, next) {
        req.body = JSON.parse(req.body.data);

        var imageInfo = utilityHelper.getFileInfo(req, null, next);
        if(imageInfo._imageName){
            var modelInfo = utilityHelper.sanitizeUserInput(req, next);
            var albumId='';
            if(req.params.albumId){
                albumId=req.params.albumId;
            }

            var galleryImageInfo = ImageGalleryModule.CreateImageGalleryImage(modelInfo, req.decoded.user.username, imageInfo);

            dataProviderHelper.saveModelToEmbeddedDocument(ImageGallery, {'image' : galleryImageInfo}, albumId)
                .then(function(){
                    res.status(HTTPStatus.OK);
                    res.json({
                        message: messageConfig.imageGallery.saveMessageImage
                    });
                })
                .catch(function(err){
                    return next(err);
                });
        }else {
            res.status(HTTPStatus.BAD_REQUEST);
            res.json({
                message: messageConfig.imageGallery.fieldRequiredImage
            });
        }
    };

    _p.removeImage = function (req, res, next) {
        if(req.imageInfo.coverImage !== true){
            var embedDocChildSchema = {
                'image' : {
                    '_id' : req.params.imageId
                }
            };

            dataProviderHelper.removeEmbeddedDocument(ImageGallery, embedDocChildSchema, req.params.albumId)
                .then(function(){
                    res.status(HTTPStatus.OK);
                    res.json({
                        message: messageConfig.imageGallery.deleteMessageImage
                    });
                })
                .catch(function(err){
                    return next(err);
                });
        }else{
            res.status(HTTPStatus.BAD_REQUEST);
            res.json({
                message: messageConfig.imageGallery.coverImageWarning
            });
        }
    };


    _p.updateAlbumInfo = function(req, res, next){

        if (req.body.albumName) {
            var modelInfo = utilityHelper.sanitizeUserInput(req, next);
            var _slogVal = utilityHelper.getCleanURL(modelInfo.albumName, next);

            if(req.albumInfo.urlSlog !== _slogVal) {
                var query = {};
                query.urlSlog = _slogVal;
                query.deleted = false;
                dataProviderHelper.checkForDuplicateEntry(ImageGallery, query)
                    .then(function(count){
                        if (count > 0) {
                            throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.CONFLICT + '", "message": "' + messageConfig.imageGallery.alreadyExists + '"}');
                        } else {
                            return _p.updateFunc(req, res, modelInfo, _slogVal);
                        }
                    })
                    .then(function(){
                        res.status(HTTPStatus.OK);
                        res.json({
                            message: messageConfig.imageGallery.updateMessageAlbum
                        });
                    })
                    .catch(Promise.CancellationError, function (cancellationErr) {
                        errorHelper.customErrorResponse(res, cancellationErr, next);
                    })
                    .catch(function(err){
                        return next(err);
                    });
            }else{
                _p.updateFunc(req, res, modelInfo, _slogVal)
                    .then(function(){
                        res.status(HTTPStatus.OK);
                        res.json({
                            message: messageConfig.imageGallery.updateMessageAlbum
                        });
                    })
                    .catch(function(err){
                        return next(err);
                    });
            }
        }else {
            res.status(HTTPStatus.BAD_REQUEST);
            res.json({
                message: messageConfig.imageGallery.fieldRequiredAlbum
            });
        }
    };

    _p.updateFunc =  function(req, res, modelInfo, _slogVal){
        req.albumInfo.albumName = modelInfo.albumName;
        req.albumInfo.urlSlog = _slogVal;
        req.albumInfo.albumDescription = modelInfo.albumDescription;
        req.albumInfo.active = modelInfo.active;
        req.albumInfo.updatedBy = req.decoded.user.username;
        req.albumInfo.updatedOn = new Date();

        return dataProviderHelper.save(req.albumInfo);
    };

    _p.updateCoverImage = function(req, res, next){
        var resetCoverImageQuery = {
            '_id' : req.params.albumId,
            'image.coverImage' : {
                $in: true
            },
            'deleted' : false
        };

        var updateCoverImageQuery = {
            '_id' : req.params.albumId,
            'image._id' : {
                $in: req.params.imageId
            },
            'deleted' : false
        };

        var updateCoverImgOpts = {
            'image.$.coverImage' : true,
            'image.$.active' : true
        };


        var multiOpts = false;

        dataProviderHelper.updateModelData(ImageGallery, resetCoverImageQuery, { 'image.$.coverImage' : false }, multiOpts)
            .then(function(){
                return dataProviderHelper.updateModelData(ImageGallery, updateCoverImageQuery, updateCoverImgOpts, multiOpts);
            })
            .then(function(){
                res.status(HTTPStatus.OK);
                res.json({
                    message: messageConfig.imageGallery.updateMessageImageCover
                });
            })
            .catch(function(err){
                return next(err);
            });
    };

    _p.updateGalleryImageInfo = function (req,res, next) {
        req.body = JSON.parse(req.body.data);
        var imageInfo = utilityHelper.getFileInfo(req, req.imageInfo, next);
        if(imageInfo._imageName){
            var modelInfo = utilityHelper.sanitizeUserInput(req, next);
            var query = {
                '_id' : req.params.albumId,
                'image._id' : {
                    $in: req.params.imageId
                },
                'deleted' : false
            };

            var newImage = {
                'image.$.imageName' : imageInfo._imageName,
                'image.$.imageTitle'  : modelInfo.imageTitle,
                'image.$.imageAltText' : modelInfo.imageAltText,
                'image.$.imageDescription' : modelInfo.imageDescription,
                'image.$.active' : modelInfo.active,
                'image.$.imageProperties.imageExtension' : imageInfo._imageExtension,
                'image.$.imageProperties.imagePath' : imageInfo._imagePath,
                'image.$.updatedBy' : req.decoded.user.username,
                'image.$.updatedOn' : new Date()
            };

            var multiOpts = false;

            dataProviderHelper.updateModelData(ImageGallery, query, newImage, multiOpts)
                .then(function(){
                    res.status(HTTPStatus.OK);
                    res.json({
                        message: messageConfig.imageGallery.updateMessageImage
                    });
                })
                .catch(function(err){
                    return next(err);
                });
        }else{
            res.status(HTTPStatus.BAD_REQUEST);
            res.json({
                message: messageConfig.imageGallery.fieldRequiredImage
            });
        }
    };

    _p.getAllAlbumsWithCoverImages = function () {
        var _queryOptsParent = {
            "deleted" : false,
            "active" : true
        };
        return new Promise(function(resolve, reject) {

            ImageGallery.aggregate(
                {
                    $sort: {
                        'addedOn': -1
                    },
                },
                {
                    $match: {
                        deleted: false,
                        active: true
                    }
                },
                {
                    $unwind: '$image'
                },
                {
                    $match: {
                        'image.coverImage': true,
                        'image.active': true
                    }
                },
                {
                    $project: {
                        _id: 1,
                        albumName: 1,
                        albumDescription: 1,
                        urlSlog: 1,
                        'image.imageName': 1,
                        'image.imageTitle': 1,
                        'image.imageAltText': 1,
                        'image.imageDescription': 1
                    }
                }
            ).execAsync()
                .then(function(galleryImageInfo){
                    resolve(galleryImageInfo);
                })
                .catch(function(err){
                    reject(err);
                });
        });
    };


    return{
        getAlbumInfoByID: _p.getAlbumInfoByID,
        getAllGalleryAlbums: _p.getAllGalleryAlbums,
        getAllGalleryImagesByAlbumID: _p.getAllGalleryImagesByAlbumID,
        getGalleryImageInfoByImageID: _p.getGalleryImageInfoByImageID,
        getAllAlbumsWithCoverImages: _p.getAllAlbumsWithCoverImages,
        patchGalleryAlbum: _p.patchGalleryAlbum,
        postAlbumInfo: _p.postAlbumInfo,
        postGalleryImageInfo: _p.postGalleryImageInfo,
        removeImage: _p.removeImage,
        updateAlbumInfo: _p.updateAlbumInfo,
        updateCoverImage: _p.updateCoverImage,
        updateGalleryImageInfo: _p.updateGalleryImageInfo
    };

})();

module.exports = imageGalleryController;