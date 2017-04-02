var partnerController = (function () {

    'use strict';

    var dataProviderHelper = require('../data/mongo.provider.helper'),
        HTTPStatus = require('http-status'),
        messageConfig = require('../configs/api.message.config'),
        Partner = require('../models/partner.server.model'),
        utilityHelper = require('../helpers/utilities.helper'),
        errorHelper = require('../helpers/error.helper'),
        Promise = require("bluebird");

    var documentFields = '_id partnerName linkURL imageName imageAltText active';

    function PartnerModule() {}

    PartnerModule.CreatePartner = function (partnerObj, loggedInUser, imageInfo) {
        var partnerInfo = new Partner();
        partnerInfo.partnerName = partnerObj.partnerName;
        partnerInfo.linkURL = partnerObj.linkURL;
        partnerInfo.active = partnerObj.active;
        partnerInfo.imageName = imageInfo._imageName;
        partnerInfo.imageAltText = partnerObj.imageAltText;
        partnerInfo.imageProperties = {
            imageExtension: imageInfo._imageExtension,
            imagePath: imageInfo._imagePath
        };
        partnerInfo.addedBy = loggedInUser;
        partnerInfo.addedOn = new Date();
        return partnerInfo;
    };

    var _p = PartnerModule.prototype;

    _p.checkValidationErrors = function (req) {

        req.checkBody('partnerName', messageConfig.partner.validationErrMessage.partnerName).notEmpty();
        req.checkBody('linkURL', messageConfig.partner.validationErrMessage.linkURL).notEmpty();
        req.checkBody('linkURL', messageConfig.partner.validationErrMessage.webURLValid).isURL();

        return req.validationErrors();
    };

    _p.getPartners = function (req, next) {
        var pagerOpts = utilityHelper.getPaginationOpts(req, next);

        var query = {};
        // matches anything that  starts with the inputted team member's name, case insensitive
        if (req.query.partnername) {
            query.partnerName = {$regex: new RegExp('.*' + req.query.partnername, "i")};
        }
        if (req.query.active) {
            query.active = req.query.active;
        }
        query.deleted = false;
        var sortOpts = { addedOn: -1 };

        return dataProviderHelper.getAllWithDocumentFieldsPagination(Partner, query, pagerOpts, documentFields, sortOpts);
    };

    _p.getPartnerById = function (req) {
        var selectFields = documentFields + ' imageProperties';
        return dataProviderHelper.findById(Partner, req.params.partnerId, selectFields);
    };

    _p.deletePartnerInfo = function (req, res, next) {
        req.partnerInfo.deleted = true;
        req.partnerInfo.deletedOn = new Date();
        req.partnerInfo.deletedBy = req.decoded.user.username;

        dataProviderHelper.save(req.partnerInfo)
            .then(function () {
                res.status(HTTPStatus.OK);
                res.json({
                    message: messageConfig.partner.deleteMessage
                });
            })
            .catch(function (err) {
                return next(err);
            });
    };

    _p.postPartnerInfo = function (req, res, next) {
        req.body = JSON.parse(req.body.data);
        var errors = _p.checkValidationErrors(req);

        if (errors) {
            res.status(HTTPStatus.BAD_REQUEST);
            res.json({
                message: errors
            });
        } else {
            var imageInfo = utilityHelper.getFileInfo(req, null, next);
            if (imageInfo._imageName) {
                var modelInfo = utilityHelper.sanitizeUserInput(req, next);
                var query = {};
                query.linkURL = modelInfo.linkURL.trim().toLowerCase();
                query.deleted = false;

                dataProviderHelper.checkForDuplicateEntry(Partner, query)
                    .then(function (count) {
                        if (count > 0) {
                            throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.CONFLICT + '", "message": "' + messageConfig.partner.alreadyExists + '"}');
                        } else {
                            var partnerInfo = PartnerModule.CreatePartner(modelInfo, req.decoded.user.username, imageInfo);
                            return dataProviderHelper.save(partnerInfo);
                        }
                    })
                    .then(function () {
                        res.status(HTTPStatus.OK);
                        res.json({
                            message: messageConfig.partner.saveMessage
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
                    message: messageConfig.partner.fieldRequiredImage
                });
            }
        }
    };

    _p.updatePartnerInfo = function (req, res, next) {
        req.body = JSON.parse(req.body.data);
        var errors = _p.checkValidationErrors(req);

        if (errors) {
            res.status(HTTPStatus.BAD_REQUEST);
            res.json({
                message: errors
            });
        } else {
            var imageInfo = utilityHelper.getFileInfo(req, req.partnerInfo, next);
            if (imageInfo._imageName) {
                var modelInfo = utilityHelper.sanitizeUserInput(req, next);
                var query = {};
                query.linkURL = modelInfo.linkURL.trim().toLowerCase();
                query.deleted = false;

                if (req.partnerInfo.linkURL !== modelInfo.linkURL.trim().toLowerCase()) {
                    dataProviderHelper.checkForDuplicateEntry(Partner, query)
                        .then(function (count) {
                            if (count > 0) {
                                throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.CONFLICT + '", "message": "' + messageConfig.partner.alreadyExists + '"}');
                            } else {
                                return _p.updatePartnerFunc(req, imageInfo, modelInfo, next);
                            }
                        })
                        .then(function () {
                            res.status(HTTPStatus.OK);
                            res.json({
                                message: messageConfig.partner.updateMessage
                            });
                        })
                        .catch(Promise.CancellationError, function (cancellationErr) {
                            errorHelper.customErrorResponse(res, cancellationErr, next);
                        })
                        .catch(function (err) {
                            return next(err);
                        });
                } else {
                    _p.updatePartnerFunc(req, imageInfo, modelInfo, next)
                        .then(function () {
                            res.status(HTTPStatus.OK);
                            res.json({
                                message: messageConfig.partner.updateMessage
                            });
                        })
                        .catch(function (err) {
                            return next(err);
                        });
                }
            } else {
                res.status(HTTPStatus.BAD_REQUEST);
                res.json({
                    message: messageConfig.partner.fieldRequiredImage
                });
            }
        }
    };

    _p.updatePartnerFunc = function (req, imageInfo, modelInfo) {
        req.partnerInfo.partnerName = modelInfo.partnerName;
        req.partnerInfo.linkURL = modelInfo.linkURL;
        req.partnerInfo.active = modelInfo.active;
        req.partnerInfo.imageName = imageInfo._imageName;
        req.partnerInfo.imageAltText = modelInfo.imageAltText;
        req.partnerInfo.imageProperties.imageExtension = imageInfo._imageExtension;
        req.partnerInfo.imageProperties.imagePath = imageInfo._imagePath;
        req.partnerInfo.updatedBy = req.decoded.user.username;
        req.partnerInfo.updatedOn = new Date();
        return dataProviderHelper.save(req.partnerInfo)
    };

    return {
        getPartners: _p.getPartners,
        getPartnerById: _p.getPartnerById,
        deletePartnerInfo: _p.deletePartnerInfo,
        postPartnerInfo: _p.postPartnerInfo,
        updatePartnerInfo: _p.updatePartnerInfo
    };

})();

module.exports = partnerController;