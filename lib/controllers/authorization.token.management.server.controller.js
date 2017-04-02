var authorizationTokenManagementController = (function () {

    'use strict';

    var dataProviderHelper = require('../data/mongo.provider.helper'),
        HTTPStatus = require('http-status'),
        messageConfig = require('../configs/api.message.config'),
        AuthorizationToken = require('../models/authorization.token.management.server.model'),
        utilityHelper = require('../helpers/utilities.helper'),
        errorHelper = require('../helpers/error.helper'),
        Promise = require("bluebird");

    var documentFields = '_id authorizationToken userAgent browser ipAddress expiresOn userId addedOn';

    function AuthorizationTokenModule() {}

    AuthorizationTokenModule.CreateAuthorizationToken = function (_authorizationToken, _userAgent, _browser, _ipAddress, _expiresOn, _userId) {
        var authorizationTokenInfo = new AuthorizationToken();
        authorizationTokenInfo.authorizationToken = _authorizationToken;
        authorizationTokenInfo.userAgent = _userAgent;
        authorizationTokenInfo.browser = _browser;
        authorizationTokenInfo.ipAddress = _ipAddress;
        authorizationTokenInfo.expiresOn = _expiresOn;
        authorizationTokenInfo.userId = _userId;
        authorizationTokenInfo.addedOn = new Date();
        return authorizationTokenInfo;
    };

    var _p = AuthorizationTokenModule.prototype;

    _p.checkAuthorizationTokenStatus = function (_authorizationToken, _userId) {
        var query = {};
        query.authorizationToken = _authorizationToken;
        query.userId = _userId;
        query.expiresOn = {
            "$gte": new Date()
        };
        return dataProviderHelper.findOne(AuthorizationToken, query, documentFields);
    };

    _p.getAuthorizationTokens = function (req) {
        var query = {};
        query.userId = req.decoded.user._id;
        query.expiresOn = {
            "$gte": new Date()
        };
        var sortOpts = { addedOn: -1 };

        return dataProviderHelper.getAllWithDocumentFieldsNoPagination(AuthorizationToken, query, documentFields, sortOpts);
    };

    _p.getAuthorizationTokenById = function (req) {
        return dataProviderHelper.findById(AuthorizationToken, req.params.authorizationTokenId, documentFields);
    };

    _p.deleteAuthorizationToken = function (req, res, next) {
        var query = {};
        query._id = req.params.authorizationTokenId;
        _p.removeAuthorizationToken(query, req, res, next, messageConfig.authorizationToken.deleteMessage);
    };

    _p.deleteAllAuthorizationToken = function (req, res, next) {
        var query = {};
        _p.removeAuthorizationToken(query, req, res, next, messageConfig.authorizationToken.deleteAllMessage);
    };

    _p.removeAuthorizationToken = function (query, req, res, next, _message) {
        dataProviderHelper.removeModelData(AuthorizationToken, query)
            .then(function () {
                res.status(HTTPStatus.OK);
                res.json({
                    message: _message
                });
            })
            .catch(function (err) {
                return next(err);
            });
    };

    _p.postAuthorizationTokenInfo = function (authorizationToken, userAgent, browser, ipAddress, expiresOn, userId) {

        return new Promise(function (resolve, reject) {
            var authorizationTokenInfo = AuthorizationTokenModule.CreateAuthorizationToken(authorizationToken, userAgent, browser, ipAddress, expiresOn, userId);

            dataProviderHelper.save(authorizationTokenInfo)
                .then(function () {
                    resolve();
                })
                .catch(function (err) {
                    reject(err);
                });
        });
    };

    return {
        checkAuthorizationTokenStatus : _p.checkAuthorizationTokenStatus,
        getAuthorizationTokens: _p.getAuthorizationTokens,
        getAuthorizationTokenById: _p.getAuthorizationTokenById,
        deleteAuthorizationToken: _p.deleteAuthorizationToken,
        deleteAllAuthorizationToken: _p.deleteAllAuthorizationToken,
        postAuthorizationTokenInfo: _p.postAuthorizationTokenInfo
    };

})();

module.exports = authorizationTokenManagementController;