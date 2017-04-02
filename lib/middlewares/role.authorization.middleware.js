(function (roleBasedAuthorizationMiddleware) {

    'use strict';

    var apiMessageConfig = require('../configs/api.message.config'),
        roleController = require('../controllers/role.management.server.controller'),
        apiAccessController = require('../controllers/apiaccess.management.server.controller'),
        Promise = require('bluebird'),
        errorHelper = require('../helpers/error.helper'),
        utilityHelper = require('../helpers/utilities.helper'),
        applicationConfig = require("../configs/application.config"),
        HTTPStatus = require('http-status');

    roleBasedAuthorizationMiddleware.authorize = function (req, res, next) {
         if(req.decoded && req.decoded.user.userRole && req.decoded.user.username !== applicationConfig.user.defaultUsername){
            var _originalUrl = req.originalUrl;
            var _val = '';
            if(utilityHelper.containsChar(_originalUrl, '?',  next)){
                _originalUrl = _originalUrl.split('?')[0];
            }
            for (var key in req.params) {
                if (req.params.hasOwnProperty(key)) {
                    _val = req.params[key];
                    _originalUrl = _originalUrl.split(_val)[0];
                }
            }

            if (_originalUrl.substring(_originalUrl.length - 1) === "/")
            {
                _originalUrl = _originalUrl.substring(0, _originalUrl.length - 1);
            }
            req.query.apiroute = _originalUrl;
            apiAccessController.getApiAccess(req)
                .then(function (lstApiAccess) {
                    if(lstApiAccess.length > 0){
                        var apiAccessObj = lstApiAccess[0];
                        if(utilityHelper.containsChar(apiAccessObj.roleName, ',', next)){
                            var accessRoles = apiAccessObj.roleName.split(',');
                            if(!utilityHelper.containsElementInArr(accessRoles, req.decoded.user.userRole, next)){
                                throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.UNAUTHORIZED + '", "message": "' + apiMessageConfig.roleAuthorize.apiAccessDenied + '"}');

                            }
                        }else{
                            if(apiAccessObj.roleName !== req.decoded.user.userRole){
                                throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.UNAUTHORIZED + '", "message": "' + apiMessageConfig.roleAuthorize.apiAccessDenied + '"}');
                            }
                        }
                    }
                    req.query.rolename = req.decoded.user.userRole;
                    return roleController.getRoles(req, next);
                })
                .then(function (lstRoles) {
                    if(lstRoles.length > 0){
                        var roleInfo = lstRoles[0];
                        switch (req.method){
                            case "GET":
                                if(roleInfo.read){
                                    next();
                                }else{
                                    throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.UNAUTHORIZED + '", "message": "' + apiMessageConfig.roleAuthorize.accessFailure + '"}');
                                }
                                break;
                            case "POST":
                                if(roleInfo.write && roleInfo.create){
                                    next();
                                }else{
                                    throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.UNAUTHORIZED + '", "message": "' + apiMessageConfig.roleAuthorize.accessFailure + '"}');
                                }
                                break;
                            case "PUT":
                            case "PATCH":
                                if(roleInfo.write && roleInfo.change){
                                    next();
                                }else{
                                    throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.UNAUTHORIZED + '", "message": "' + apiMessageConfig.roleAuthorize.accessFailure + '"}');
                                }
                                break;
                            case "DELETE":
                                if(roleInfo.delete) {
                                    next();
                                }else {
                                    throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.UNAUTHORIZED + '", "message": "' + apiMessageConfig.roleAuthorize.accessFailure + '"}');
                                }
                                break;
                        }
                    }else{
                        next();
                    }
                    return null;
                })
                .catch(Promise.CancellationError, function (cancellationErr) {
                    errorHelper.customErrorResponse(res, cancellationErr, next);
                })
                .catch(function (err) {
                    return next(err);
                })
         }else{
             next();
             return null;
         }
    };

})(module.exports);
