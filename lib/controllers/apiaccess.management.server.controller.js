var apiAccessManagementController = (function () {

    'use strict';

    var dataProviderHelper = require('../data/mongo.provider.helper'),
        HTTPStatus = require('http-status'),
        messageConfig = require('../configs/api.message.config'),
        ApiAccessManager = require('../models/apiaccess.management.server.model'),
        utilityHelper = require('../helpers/utilities.helper'),
        errorHelper = require('../helpers/error.helper'),
        appConfig = require('../configs/application.config'),
        Promise = require("bluebird");

    var documentFields = '_id routeApi roleName active';

    function ApiAccessModule() {}

    ApiAccessModule.CreateApiAccess = function (apiAccessObj, loggedInUser) {
        var _roleName = apiAccessObj.roleName;
        if(_roleName.indexOf(appConfig.user.defaultUserRole) === -1){
            _roleName = _roleName + ',' + appConfig.user.defaultUserRole;
        }
        var apiAccessInfo = new ApiAccessManager();
        apiAccessInfo.routeApi = apiAccessObj.routeApi;
        apiAccessInfo.roleName = _roleName;
        apiAccessInfo.active = apiAccessObj.active;
        apiAccessInfo.addedBy = loggedInUser;
        apiAccessInfo.addedOn = new Date();
        return apiAccessInfo;
    };

    var _p = ApiAccessModule.prototype;

    _p.checkValidationErrors = function (req) {

        req.checkBody('routeApi', messageConfig.apiAccess.validationErrMessage.routeApi).notEmpty();
        req.checkBody('roleName', messageConfig.apiAccess.validationErrMessage.roleName).notEmpty();

        return req.validationErrors();
    };

    _p.getApiAccess = function (req) {
        var query = {};
        query.deleted = false;
        //matches anything that exactly matches the inputted category name, case  insensitive
        if(req.query.apiroute){
            query.routeApi = { $regex: new RegExp('^'+ req.query.apiroute + '$', "i") };
        }
        if(req.query.active){
            query.active = true;
        }
        var sortOpts = { addedOn: -1 };

        return dataProviderHelper.getAllWithDocumentFieldsNoPagination(ApiAccessManager, query, documentFields, sortOpts);
    };

    _p.getApiAccessById = function (req) {
        return dataProviderHelper.findById(ApiAccessManager, req.params.apiAccessId, documentFields);
    };

    _p.deleteApiAccessInfo = function (req, res, next) {
        req.apiAccessInfo.deleted = true;
        req.apiAccessInfo.deletedOn = new Date();
        req.apiAccessInfo.deletedBy = req.decoded.user.username;

        dataProviderHelper.save(req.apiAccessInfo)
            .then(function () {
                res.status(HTTPStatus.OK);
                res.json({
                    message: messageConfig.apiAccess.deleteMessage
                });
            })
            .catch(function (err) {
                return next(err);
            });
    };

    _p.postApiAccessInfo = function (req, res, next) {
        var errors = _p.checkValidationErrors(req);
        if (errors) {
            res.status(HTTPStatus.BAD_REQUEST);
            res.json({
                message: errors
            });
        } else {
            var modelInfo = utilityHelper.sanitizeUserInput(req, next);
            var query = {};
            query.routeApi = modelInfo.routeApi.trim().toLowerCase();
            query.deleted = false;

            dataProviderHelper.checkForDuplicateEntry(ApiAccessManager, query)
                .then(function (count) {
                    if (count > 0) {
                        throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.CONFLICT + '", "message": "' + messageConfig.apiAccess.alreadyExists + '"}');
                    } else {
                        var apiAccessInfo = ApiAccessModule.CreateApiAccess(modelInfo, req.decoded.user.username);
                        return dataProviderHelper.save(apiAccessInfo);
                    }
                })
                .then(function () {
                    res.status(HTTPStatus.OK);
                    res.json({
                        message: messageConfig.apiAccess.saveMessage
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

    _p.updateApiAccessInfo = function (req, res, next) {
        var errors = _p.checkValidationErrors(req);

        if (errors) {
            res.status(HTTPStatus.BAD_REQUEST);
            res.json({
                message: errors
            });
        } else {

            var modelInfo = utilityHelper.sanitizeUserInput(req, next);
            var query = {};
            query.routeApi = modelInfo.routeApi.trim().toLowerCase();
            query.deleted = false;

            if (req.apiAccessInfo.routeApi !== modelInfo.routeApi.trim().toLowerCase()) {
                dataProviderHelper.checkForDuplicateEntry(ApiAccessManager, query)
                    .then(function (count) {
                        if (count > 0) {
                            throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.CONFLICT + '", "message": "' + messageConfig.apiAccess.alreadyExists + '"}');
                        } else {
                            return _p.updateRouteAccessFunc(req, modelInfo);
                        }
                    })
                    .then(function () {
                        res.status(HTTPStatus.OK);
                        res.json({
                            message: messageConfig.apiAccess.updateMessage
                        });
                    })
                    .catch(Promise.CancellationError, function (cancellationErr) {
                        errorHelper.customErrorResponse(res, cancellationErr, next);
                    })
                    .catch(function (err) {
                        return next(err);
                    });
            } else {
                _p.updateRouteAccessFunc(req, modelInfo)
                    .then(function () {
                        res.status(HTTPStatus.OK);
                        res.json({
                            message: messageConfig.apiAccess.updateMessage
                        });
                    })
                    .catch(function (err) {
                        return next(err);
                    });
            }
        }
    };

    _p.updateRouteAccessFunc = function (req, modelInfo) {
        req.apiAccessInfo.routeApi = modelInfo.routeApi;
        var _roleName = modelInfo.roleName;
        if(_roleName.indexOf(appConfig.user.defaultUserRole) === -1){
            _roleName = _roleName + ',' + appConfig.user.defaultUserRole;
        }
        req.apiAccessInfo.roleName = _roleName;
        req.apiAccessInfo.active = modelInfo.active;
        req.apiAccessInfo.updatedBy = req.decoded.user.username;
        req.apiAccessInfo.updatedOn = new Date();
        return dataProviderHelper.save(req.apiAccessInfo)
    };

    return {
        getApiAccess: _p.getApiAccess,
        getApiAccessById: _p.getApiAccessById,
        deleteApiAccessInfo: _p.deleteApiAccessInfo,
        postApiAccessInfo: _p.postApiAccessInfo,
        updateApiAccessInfo: _p.updateApiAccessInfo
    };

})();

module.exports = apiAccessManagementController;