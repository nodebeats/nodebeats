var imageSliderController = (function () {

    'use strict';

    var dataProviderHelper = require('../data/mongo.provider.helper'),
        HTTPStatus = require('http-status'),
        messageConfig = require('../configs/api.message.config'),
        ImageSlider = require('../models/image.slider.server.model'),
        utilityHelper = require('../helpers/utilities.helper'),
        Promise = require("bluebird");

    var documentFields = '_id imageName imageTitle imageAltText imagePrimaryContent imageSecondaryContent active';

    function ImageSliderModule() {}

    ImageSliderModule.CreateImageSlider = function (imageSliderObj, modelHtmlContentInfo, loggedInUser, imageInfo) {
        var imageSliderInfo = new ImageSlider();
        imageSliderInfo.imageName = imageInfo._imageName;
        imageSliderInfo.imageTitle = imageSliderObj.imageTitle;
        imageSliderInfo.imageAltText = imageSliderObj.imageAltText;
        imageSliderInfo.imagePrimaryContent = modelHtmlContentInfo.imagePrimaryContent;
        imageSliderInfo.imageSecondaryContent = modelHtmlContentInfo.imageSecondaryContent;
        imageSliderInfo.active = imageSliderObj.active;
        imageSliderInfo.imageProperties = {
            imageExtension: imageInfo._imageExtension,
            imagePath: imageInfo._imagePath
        };
        imageSliderInfo.addedBy = loggedInUser;
        imageSliderInfo.addedOn = new Date();
        return imageSliderInfo;
    };

    var _p = ImageSliderModule.prototype;

    _p.getAllSliderImages = function (req) {
        var query = {};
        if (req.query.active) {
            query.active = true;
        }
        query.deleted = false;
        var sortField = {
            addedOn: -1
        };
        return dataProviderHelper.getAllWithDocumentFieldsNoPagination(ImageSlider, query, documentFields, sortField);
    };

    _p.getSliderImageByID = function (req) {

        var selectFields = documentFields + ' imageProperties';

        return dataProviderHelper.findById(ImageSlider, req.params.imageSliderId, selectFields);
    };

    _p.patchSliderImage = function (req, res, next) {
        req.imageSliderInfo.deleted = true;
        req.imageSliderInfo.deletedOn = new Date();
        req.imageSliderInfo.deletedBy = req.decoded.user.username;
        _p.saveFunc(req, res, req.imageSliderInfo, next, messageConfig.imageSlider.deleteMessage);
    };

    _p.postSliderImage = function (req, res, next) {
        req.body = JSON.parse(req.body.data);
        var imageInfo = utilityHelper.getFileInfo(req, null, next);
        if (imageInfo._imageName) {
            var modelInfo = utilityHelper.sanitizeUserInput(req, next);
            var htmlContentInfo = {};
            htmlContentInfo.imagePrimaryContent = req.body.imagePrimaryContent;
            htmlContentInfo.imageSecondaryContent = req.body.imageSecondaryContent;
            var modelHtmlContentInfo = utilityHelper.sanitizeUserHtmlBodyInput(htmlContentInfo, next);

            var imageSliderInfo = ImageSliderModule.CreateImageSlider(modelInfo, modelHtmlContentInfo, req.decoded.user.username, imageInfo);

            _p.saveFunc(req, res, imageSliderInfo, next, messageConfig.imageSlider.saveMessage);
        } else {
            res.status(HTTPStatus.BAD_REQUEST);
            res.json({
                message: messageConfig.imageSlider.fieldRequired
            });
        }
    };

    _p.saveFunc = function (req, res, newImageSliderInfo, next, msg) {
        dataProviderHelper.save(newImageSliderInfo)
            .then(function () {
                res.status(HTTPStatus.OK);
                res.json({
                    message: msg
                });
            })
            .catch(function (err) {
                return next(err);
            });
    };
    _p.updateSliderImage = function (req, res, next) {
        var imageInfo = utilityHelper.getFileInfo(req, req.imageSliderInfo, next);
        if (imageInfo._imageName !== "") {
            req.body = JSON.parse(req.body.data);
            var modelInfo = utilityHelper.sanitizeUserInput(req, next);
            var htmlContentInfo = {};
            htmlContentInfo.imagePrimaryContent = req.body.imagePrimaryContent;
            htmlContentInfo.imageSecondaryContent = req.body.imageSecondaryContent;
            var modelHtmlContentInfo = utilityHelper.sanitizeUserHtmlBodyInput(htmlContentInfo, next);

            req.imageSliderInfo.imageTitle = modelInfo.imageTitle;
            req.imageSliderInfo.imageAltText = modelInfo.imageAltText;
            req.imageSliderInfo.imagePrimaryContent = modelHtmlContentInfo.imagePrimaryContent;
            req.imageSliderInfo.imageSecondaryContent = modelHtmlContentInfo.imageSecondaryContent;
            req.imageSliderInfo.active = modelInfo.active;
            req.imageSliderInfo.imageName = imageInfo._imageName;
            req.imageSliderInfo.imageProperties.imageExtension = imageInfo._imageExtension;
            req.imageSliderInfo.imageProperties.imagePath = imageInfo._imagePath;
            req.imageSliderInfo.updatedBy = req.decoded.user.username;
            req.imageSliderInfo.updatedOn = new Date();

            _p.saveFunc(req, res, req.imageSliderInfo, next, messageConfig.imageSlider.updateMessage);
        } else {
            res.status(HTTPStatus.BAD_REQUEST);
            res.json({
                message: messageConfig.imageSlider.fieldRequired
            });
        }
    };


    return {
        getSliderImageByID: _p.getSliderImageByID,
        getAllSliderImages: _p.getAllSliderImages,
        patchSliderImage: _p.patchSliderImage,
        postSliderImage: _p.postSliderImage,
        updateSliderImage: _p.updateSliderImage
    };

})();

module.exports = imageSliderController;