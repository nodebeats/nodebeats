var roleManagementController = (function () {

    'use strict';

    var dataProviderHelper = require('../data/mongo.provider.helper'),
        HTTPStatus = require('http-status'),
        messageConfig = require('../configs/api.message.config'),
        applicationConfig = require('../configs/application.config'),
        RoleManager = require('../models/role.management.server.model'),
        utilityHelper = require('../helpers/utilities.helper'),
        errorHelper = require('../helpers/error.helper'),
        Promise = require("bluebird");

    var documentFields = '_id roleName read write delete create change active';

    function RoleManagerModule() {}

    RoleManagerModule.CreateRole = function (roleObj, loggedInUser) {
        var roleInfo = new RoleManager();
        roleInfo.roleName = roleObj.roleName;
        roleInfo.read = true;
        roleInfo.write = roleObj.write;
        roleInfo.delete = roleObj.delete;
        roleInfo.create = roleObj.create;
        roleInfo.change = roleObj.change;
        roleInfo.active = roleObj.active;
        roleInfo.addedBy = loggedInUser;
        roleInfo.addedOn = new Date();
        return roleInfo;
    };

    var _p = RoleManagerModule.prototype;

    _p.getRoles = function (req) {
        var query = {};
        // matches anything that  starts with the inputted person's role Name, case insensitive
        if (req.query.rolename) {
            query.roleName = {$regex: new RegExp('.*' + req.query.rolename, "i")};
        }
        if (req.query.active) {
            query.active = req.query.active;
        }
        query.deleted = false;
        var sortOpts = { addedOn: -1 };

        return dataProviderHelper.getAllWithDocumentFieldsNoPagination(RoleManager, query, documentFields, sortOpts);
    };

    _p.getRoleById = function (req) {
        return dataProviderHelper.findById(RoleManager, req.params.roleId, documentFields);
    };

    _p.deleteRoleInfo = function (req, res, next) {
        if(req.roleInfo.roleName !== applicationConfig.user.defaultUserRole){

            req.roleInfo.deleted = true;
            req.roleInfo.deletedOn = new Date();
            req.roleInfo.deletedBy = req.decoded.user.username;

            return dataProviderHelper.save(req.roleInfo)
                .then(function () {
                    res.status(HTTPStatus.OK);
                    res.json({
                        message: messageConfig.roleManager.deleteMessage
                    });
                })
                .catch(function (err) {
                    return next(err);
                });
        }else{
            res.status(HTTPStatus.METHOD_NOT_ALLOWED);
            res.json({
                message: messageConfig.roleManager.adminRoleNotAllowedToDelete
            });
        }
    };

    _p.postRoleInfo = function (req, res, next) {
        if (req.body.roleName) {
            var modelInfo = utilityHelper.sanitizeUserInput(req, next);
            var query = {};
            query.roleName = modelInfo.roleName.trim().toLowerCase();
            query.deleted = false;

            dataProviderHelper.checkForDuplicateEntry(RoleManager, query)
                .then(function (count) {
                    if (count > 0) {
                        throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.CONFLICT + '", "message": "' + messageConfig.roleManager.alreadyExists + '"}');
                    } else {
                        var roleInfo = RoleManagerModule.CreateRole(modelInfo, req.decoded.user.username);
                        return dataProviderHelper.save(roleInfo);
                    }
                })
                .then(function () {
                    res.status(HTTPStatus.OK);
                    res.json({
                        message: messageConfig.roleManager.saveMessage
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
                message: messageConfig.roleManager.fieldRequiredRole
            });
        }
    };

    _p.updateRoleInfo = function (req, res, next) {

        if(req.roleInfo.roleName !== applicationConfig.user.defaultUserRole) {
            if (req.body.roleName) {
                var modelInfo = utilityHelper.sanitizeUserInput(req, next);
                var query = {};
                query.roleName = modelInfo.roleName.trim().toLowerCase();
                query.deleted = false;

                if (req.roleInfo.roleName !== modelInfo.roleName.trim().toLowerCase()) {
                    dataProviderHelper.checkForDuplicateEntry(RoleManager, query)
                        .then(function (count) {
                            if (count > 0) {
                                throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.CONFLICT + '", "message": "' + messageConfig.roleManager.alreadyExists + '"}');
                            } else {
                                return _p.updateRoleManagerFunc(req, modelInfo);
                            }
                        })
                        .then(function () {
                            res.status(HTTPStatus.OK);
                            res.json({
                                message: messageConfig.roleManager.updateMessage
                            });
                        })
                        .catch(Promise.CancellationError, function (cancellationErr) {
                            errorHelper.customErrorResponse(res, cancellationErr, next);
                        })
                        .catch(function (err) {
                            return next(err);
                        });
                } else {
                    _p.updateRoleManagerFunc(req, modelInfo)
                        .then(function () {
                            res.status(HTTPStatus.OK);
                            res.json({
                                message: messageConfig.roleManager.updateMessage
                            });
                        })
                        .catch(function (err) {
                            return next(err);
                        });
                }
            } else {

                res.status(HTTPStatus.BAD_REQUEST);
                res.json({
                    message: messageConfig.roleManager.fieldRequiredRole
                });
            }
        }
        else{
            res.status(HTTPStatus.METHOD_NOT_ALLOWED);
            res.json({
                message: messageConfig.roleManager.adminRoleNotAllowedToEdited
            });
        }
    };

    _p.updateRoleManagerFunc = function (req, modelInfo) {
        req.roleInfo.roleName = modelInfo.roleName;
        req.roleInfo.read = true;
        req.roleInfo.write = modelInfo.write;
        req.roleInfo.delete = modelInfo.delete;
        req.roleInfo.create = modelInfo.create;
        req.roleInfo.change = modelInfo.change;
        req.roleInfo.active = modelInfo.active;
        req.roleInfo.updatedBy = req.decoded.user.username;
        req.roleInfo.updatedOn = new Date();
        return dataProviderHelper.save(req.roleInfo);
    };

    return {
        createRole: RoleManagerModule.CreateRole,
        getRoles: _p.getRoles,
        getRoleById: _p.getRoleById,
        deleteRoleInfo: _p.deleteRoleInfo,
        postRoleInfo: _p.postRoleInfo,
        updateRoleInfo: _p.updateRoleInfo
    };

})();

module.exports = roleManagementController;