/**
 * Created by lakhe on 9/21/16.
 */

(function(){
    'use strict';

    var apiMessageConfig = require('../configs/api.message.config'),
        roleController = require('../controllers/role.management.server.controller')(),
        apiAccessController = require('../controllers/apiaccess.management.server.controller')(),
        Promise = require('bluebird'),
        errorHelper = require('../helpers/error.helper'),
        utilityHelper = require('../helpers/utilities.helper'),
        HTTPStatus = require('http-status');

    var roleBasedAuthorizationMiddleware = function(){

        var authorize = function(req, res, next){
            if(req.decoded && req.decoded.user.userRole && req.decoded.user.username !== 'superadmin'){
                //matches anything that exactly matches with the original url, case  insensitive
                req.query.apiroute = req.originalUrl;
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
                        req.query = {};
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
                    .catch(function(err){
                        return next(err);
                    })
            }else{
                next();
                return null;
            }
        };

        return {
            authorize : authorize
        };
    };

    module.exports = roleBasedAuthorizationMiddleware;

})();