var commentSettingController = (function () {

    'use strict';

    var dataProviderHelper = require('../data/mongo.provider.helper'),
        HTTPStatus = require('http-status'),
        messageConfig = require('../configs/api.message.config'),
        CommentSetting = require('../models/comment.setting.server.model'),
        utilityHelper = require('../helpers/utilities.helper'),
        errorHelper = require('../helpers/error.helper'),
        Promise = require("bluebird");

    var commentSettingFields = '_id disqusUsername disqusURL disqusApiKey';

    function CommentSettingModule(){}

    CommentSettingModule.CreateCommentSetting = function(commentSettingObj, loginUser){
        var commentSettingInfo = new CommentSetting();
        commentSettingInfo.disqusUsername = commentSettingObj.disqusUsername;
        commentSettingInfo.disqusURL = commentSettingObj.disqusURL;
        commentSettingInfo.disqusApiKey = commentSettingObj.disqusApiKey;
        commentSettingInfo.addedBy = loginUser;
        commentSettingInfo.addedOn = new Date();
        return commentSettingInfo;
    };

    var _p = CommentSettingModule.prototype;

    _p.getCommentSetting = function(){
        //Get Disques comment configuration setting data using empty object as filter param and commentSettingFields as select fields
        return dataProviderHelper.findOne(CommentSetting, {}, commentSettingFields);
    };

    _p.getCommentSettingByID = function(req){
        return dataProviderHelper.findById(CommentSetting, req.params.commentSettingId, commentSettingFields);
    };

    _p.postCommentSetting = function(req, res, next){
        //Check for validation errors
        if (!req.body.disqusURL) {
            res.status(HTTPStatus.BAD_REQUEST);
            res.json({
                message: messageConfig.commentSetting.fieldRequiredCommentSettingDisqusURL
            });
        } else {
            dataProviderHelper.checkForDuplicateEntry(CommentSetting, {})
                .then(function (count) {
                    if (count > 0) {
                        throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.CONFLICT + '", "message": "' + messageConfig.commentSetting.alreadyExistsCommentSetting + '"}');
                    } else {
                        var modelInfo = utilityHelper.sanitizeUserInput(req, next);
                        var commentSettingInfo = CommentSettingModule.CreateCommentSetting(modelInfo, req.decoded.user.username);
                        return dataProviderHelper.save(commentSettingInfo);
                    }
                })
                .then(function () {
                    res.status(HTTPStatus.OK);
                    res.json({
                        message: messageConfig.commentSetting.saveMessageCommentSetting
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


    _p.updateCommentSetting = function(req, res, next){
        if (!req.body.disqusURL) {
            res.status(HTTPStatus.BAD_REQUEST);
            res.json({
                message: messageConfig.commentSetting.fieldRequiredCommentSettingDisqusURL
            });
        } else {
            var modelInfo = utilityHelper.sanitizeUserInput(req, next);
            req.commentSettingInfo.disqusUsername = modelInfo.disqusUsername;
            req.commentSettingInfo.disqusURL = modelInfo.disqusURL;
            req.commentSettingInfo.disqusApiKey = modelInfo.disqusApiKey;
            req.commentSettingInfo.updatedBy = req.decoded.user.username;
            req.commentSettingInfo.updatedOn = new Date();

            dataProviderHelper.save(req.commentSettingInfo)
                .then(function () {
                    res.status(HTTPStatus.OK);
                    res.json({
                        message: messageConfig.commentSetting.updateMessageCommentSetting
                    });
                })
                .catch(function (err) {
                    return next(err);
                });
        }
    };

    return {

        getCommentSetting : _p.getCommentSetting,
        getCommentSettingByID : _p.getCommentSettingByID,
        postCommentSetting : _p.postCommentSetting,
        updateCommentSetting : _p.updateCommentSetting
    };

})();

module.exports = commentSettingController;