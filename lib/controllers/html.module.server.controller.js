var htmlModuleController = (function () {

    'use strict';

    var dataProviderHelper = require('../data/mongo.provider.helper'),
        HTTPStatus = require('http-status'),
        messageConfig = require('../configs/api.message.config'),
        HtmlModuleContent = require('../models/html.module.server.model'),
        utilityHelper = require('../helpers/utilities.helper'),
        errorHelper = require('../helpers/error.helper'),
        Promise = require("bluebird");

    var documentFields = '_id htmlContentTitle htmlModuleContent active';

    function HtmlContentModule(){}

    HtmlContentModule.CreateHtmlContent = function(htmlContentObj, _htmlModuleContent, loggedInUser){
        var htmlContentInfo = new HtmlModuleContent();
        htmlContentInfo.htmlContentTitle = htmlContentObj.htmlContentTitle;
        htmlContentInfo.htmlModuleContent = _htmlModuleContent;
        htmlContentInfo.active = htmlContentObj.active;
        htmlContentInfo.addedBy = loggedInUser;
        htmlContentInfo.addedOn = new Date();
        return htmlContentInfo;
    };

    var _p = HtmlContentModule.prototype;

    _p.checkValidationErrors = function(req){

        req.checkBody('htmlContentTitle', messageConfig.htmlModule.validationErrMessage.htmlContentTitle).notEmpty();
        req.checkBody('htmlModuleContent', messageConfig.htmlModule.validationErrMessage.htmlModuleContent).notEmpty();

        return req.validationErrors();
    };

    _p.getAllHtmlModuleContents = function(req, next){
        var pagerOpts = utilityHelper.getPaginationOpts(req, next);

        var query = {};
        // matches anything that  starts with the inputted html module title, case insensitive
        if(req.query.htmlContentTitle){
            query.htmlContentTitle = { $regex: new RegExp('.*'+ req.query.htmlContentTitle, "i") };
        }
        if(req.query.active){
            query.active = req.query.active;
        }
        query.deleted = false;
        var sortOption = { addedOn: -1 };

        return dataProviderHelper.getAllWithDocumentFieldsPagination(HtmlModuleContent, query, pagerOpts, documentFields, sortOption);
    };

    _p.getHtmlContentByID = function(req){

        return  dataProviderHelper.findById(HtmlModuleContent, req.params.htmlContentId, documentFields);
    };

    _p.getHtmlContentByTitle = function (title) {
        var queryOption = {};
        if (title)
            queryOption = {
                htmlContentTitle: title
            };
        var documentFields = '_id htmlContentTitle htmlModuleContent active addedOn';
        return dataProviderHelper.findOne(HtmlModuleContent, queryOption, documentFields);
    };

    _p.patchHtmlContent = function(req, res, next){
        req.htmlContentInfo.deleted = true;
        req.htmlContentInfo.deletedOn = new Date();
        req.htmlContentInfo.deletedBy = req.decoded.user.username;

        dataProviderHelper.save(req.htmlContentInfo)
            .then(function(){
                res.status(HTTPStatus.OK);
                res.json({
                    message: messageConfig.htmlModule.deleteMessage
                });
            })
            .catch(function(err){
                return next(err);
            });
    };

    _p.postHtmlContent = function(req, res, next){
        var errors = _p.checkValidationErrors(req);
        if (errors) {
            res.status(HTTPStatus.BAD_REQUEST);
            res.json({
                message: errors
            });
        }else{

            var modelInfo = utilityHelper.sanitizeUserInput(req, next);
            var query = {};
            //matches anything that exactly matches the html module title, case  insensitive

            query.htmlContentTitle = { $regex: new RegExp('^'+ modelInfo.htmlContentTitle + '$', "i") };
            query.deleted = false;
            //Check for duplicate title
            dataProviderHelper.checkForDuplicateEntry(HtmlModuleContent, query)
                .then(function(count){
                    if(count > 0){
                        throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.CONFLICT + '", "message": "' + messageConfig.htmlModule.alreadyExists + '"}');
                    }else{
                        var contentInfo = {};
                        contentInfo.htmlModuleContent = req.body.htmlModuleContent;
                        var modelHtmlInfo = utilityHelper.sanitizeUserHtmlBodyInput(contentInfo, next);
                        var htmlContentInfo = HtmlContentModule.CreateHtmlContent(modelInfo, modelHtmlInfo.htmlModuleContent, req.decoded.user.username);
                        return dataProviderHelper.save(htmlContentInfo);
                    }
                })
                .then(function(){
                    res.status(HTTPStatus.OK);
                    res.json({
                        message: messageConfig.htmlModule.saveMessage
                    });
                })
                .catch(Promise.CancellationError, function (cancellationErr) {
                    errorHelper.customErrorResponse(res, cancellationErr, next);
                })
                .catch(function(err){
                    return next(err);
                });
        }
    };

    _p.updateHtmlContent = function(req, res, next){
        var errors = _p.checkValidationErrors(req);

        if (errors) {
            res.status(HTTPStatus.BAD_REQUEST);
            res.json({
                message: errors
            });
        }else{
            var modelInfo = utilityHelper.sanitizeUserInput(req, next);

            //if the content title changes, then only perform duplication check action
            if(req.htmlContentInfo.htmlContentTitle.toLowerCase() !== modelInfo.htmlContentTitle.toLowerCase()) {
                var query = {};
                //matches anything that exactly matches the html module title, case  insensitive
                query.htmlContentTitle = { $regex: new RegExp('^'+ modelInfo.htmlContentTitle + '$', "i") };
                query.deleted = false;
                dataProviderHelper.checkForDuplicateEntry(HtmlModuleContent, query)
                    .then(function(count){
                        if (count > 0) {
                            throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.CONFLICT + '", "message": "' + messageConfig.htmlModule.alreadyExists + '"}');
                        } else {
                            return _p.updateFunc(req, res, modelInfo, next);
                        }
                    })
                    .then(function(){
                        res.status(HTTPStatus.OK);
                        res.json({
                            message: messageConfig.htmlModule.updateMessage
                        });
                    })
                    .catch(Promise.CancellationError, function (cancellationErr) {
                        errorHelper.customErrorResponse(res, cancellationErr, next);
                    })
                    .catch(function(err){
                        return next(err);
                    });
            }else{
                _p.updateFunc(req, res, modelInfo, next)
                    .then(function(){
                        res.status(HTTPStatus.OK);
                        res.json({
                            message: messageConfig.htmlModule.updateMessage
                        });
                    })
                    .catch(function(err){
                        return next(err);
                    });
            }
        }
    };

    _p.updateFunc =  function(req, res, modelInfo, next){
        var contentInfo = {};
        contentInfo.htmlModuleContent = req.body.htmlModuleContent;
        var modelHtmlInfo = utilityHelper.sanitizeUserHtmlBodyInput(contentInfo, next);
        req.htmlContentInfo.htmlContentTitle = modelInfo.htmlContentTitle;
        req.htmlContentInfo.htmlModuleContent = modelHtmlInfo.htmlModuleContent;
        req.htmlContentInfo.active = modelInfo.active;
        req.htmlContentInfo.updatedBy = req.decoded.user.username;
        req.htmlContentInfo.updatedOn = new Date();
        return dataProviderHelper.save(req.htmlContentInfo);
    };

    return{
        getAllHtmlModuleContents: _p.getAllHtmlModuleContents,
        getHtmlContentByID: _p.getHtmlContentByID,
        getHtmlContentByTitle : _p.getHtmlContentByTitle,
        patchHtmlContent: _p.patchHtmlContent,
        postHtmlContent: _p.postHtmlContent,
        updateHtmlContent: _p.updateHtmlContent
    };

})();

module.exports = htmlModuleController;