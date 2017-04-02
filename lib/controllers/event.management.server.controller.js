var eventManagementController = (function () {

    'use strict';

    var dataProviderHelper = require('../data/mongo.provider.helper'),
        HTTPStatus = require('http-status'),
        messageConfig = require('../configs/api.message.config'),
        EventManager = require('../models/event.management.server.model'),
        utilityHelper = require('../helpers/utilities.helper'),
        errorHelper = require('../helpers/error.helper'),
        Promise = require("bluebird");


    var documentFields = '_id eventTitle urlSlog eventDescription venue venueAddress startDate endDate imageName imageTitle imageAltText imageProperties active';

    function EventModule(){}

    EventModule.CreateEvents = function(eventObj, eventDesc, loggedInUser, imageInfo, _slogVal){
        var currentDate = new Date();
        var _endDate = currentDate.setHours(23, 59, 59, 999);
        if(eventObj.endDate === '' || eventObj.endDate === undefined) {
            if(new Date(eventObj.startDate) >= currentDate) {
                _endDate = new Date(eventObj.startDate);
                _endDate = _endDate.setHours(23, 59, 59, 999);
            }
        }else{
            _endDate = eventObj.endDate;
        }
        var eventInfo = new EventManager();
        eventInfo.eventTitle = eventObj.eventTitle;
        eventInfo.urlSlog = _slogVal;
        eventInfo.eventDescription = eventDesc;
        eventInfo.venue = eventObj.venue;
        eventInfo.venueAddress = eventObj.venueAddress;
        eventInfo.startDate = ((eventObj.startDate === "") ? new Date() : eventObj.startDate);
        eventInfo.endDate = _endDate;
        eventInfo.active = eventObj.active;
        eventInfo.imageName = imageInfo._imageName;
        eventInfo.imageTitle = eventObj.imageTitle;
        eventInfo.imageAltText = eventObj.imageAltText;
        eventInfo.imageProperties = {
            imageExtension : imageInfo._imageExtension,
            imagePath : imageInfo._imagePath
        };
        eventInfo.addedBy = loggedInUser;
        eventInfo.addedOn = new Date();
        return eventInfo;
    };

    var _p = EventModule.prototype;

    _p.checkValidationErrors = function(req){
        req.checkBody('eventTitle', messageConfig.eventManager.validationErrMessage.eventTitle).notEmpty();
        req.checkBody('eventDescription', messageConfig.eventManager.validationErrMessage.eventDescription).notEmpty();
        req.checkBody('venue', messageConfig.eventManager.validationErrMessage.venue).notEmpty();
        req.checkBody('venueAddress', messageConfig.eventManager.validationErrMessage.venueAddress).notEmpty();
        req.checkBody('startDate', messageConfig.eventManager.validationErrMessage.startDate).notEmpty();
        req.checkBody('startDate', messageConfig.eventManager.validationErrMessage.startDateValid).isDate();
        if(req.body.endDate){
            req.checkBody('endDate', messageConfig.eventManager.validationErrMessage.endDateValid).isDate();
        }
        return req.validationErrors();
    };

    _p.getAllEvents = function(req, next){
        var pagerOpts = utilityHelper.getPaginationOpts(req, next);
        var query = {};
        if(req.query.active){
            query = {
                "active": true,
                "endDate": { "$gte": new Date()}
            };
        }
        // matches anything that  starts with the inputted event title, case insensitive
        if(req.query.eventTitle){
            query.eventTitle = { $regex: new RegExp('.*'+ req.query.eventTitle, "i") };
        }
        query.deleted = false;
        var sortOpts = {};
        if(req.query.sortOption){
            sortOpts = req.query.sortOption
        }else{
            sortOpts = { addedOn: -1 }
        }

        return dataProviderHelper.getAllWithDocumentFieldsPagination(EventManager, query, pagerOpts, documentFields, sortOpts);

    };

    _p.getLatestEvents = function(req){
        var queryOpts = {
            deleted: false,
            active: true
        };
        var sortOpts = { addedOn : -1 };
        var limitOpts = 3;
        return dataProviderHelper.getLatestData(EventManager, queryOpts, documentFields, sortOpts, limitOpts);
    };

    _p.getEventByID = function(req){
        return  dataProviderHelper.findById(EventManager, req.params.eventId, documentFields);
    };

    _p.patchEvent = function(req, res, next){

        req.eventInfo.deleted = true;
        req.eventInfo.deletedOn = new Date();
        req.eventInfo.deletedBy = req.decoded.user.username;

        dataProviderHelper.save(req.eventInfo)
            .then(function(){
                res.status(HTTPStatus.OK);
                res.json({
                    message: messageConfig.eventManager.deleteMessage
                });
            })
            .catch(function(err){
                return next(err);
            });
    };

    _p.postEvent = function(req, res, next){
        req.body = JSON.parse(req.body.data);
        var errors = _p.checkValidationErrors(req);

        //check for validation errors
        if (errors) {
            res.status(HTTPStatus.BAD_REQUEST);
            res.json({
                message: errors
            });
        }else {
            var modelInfo = utilityHelper.sanitizeUserInput(req, next);
            //Check if startdate and enddate both exists, if only startdate exists, directly perform event save action
            if(modelInfo.startDate && modelInfo.endDate){

                //Check for valid date range, start date should always be lesser than end date
                if(Date.parse(modelInfo.startDate) >= Date.parse(modelInfo.endDate)){
                    res.status(HTTPStatus.BAD_REQUEST);
                    res.json({
                        message: messageConfig.eventManager.invalidDateCompareMessage
                    });
                }else{
                    _p.postHelper(req, res, next, modelInfo);
                }
            }else{
                _p.postHelper(req, res, next, modelInfo);
            }
        }
    };

    _p.postHelper = function(req, res, next, modelInfo){
        var query = {};
        //get clean url slog
        var _slogVal = utilityHelper.getCleanURL(modelInfo.eventTitle, next);
        query.urlSlog = _slogVal;
        var currentDate = new Date(modelInfo.startDate);
        var startDate = currentDate.setHours(0, 0, 0, 0);
        var endDate = currentDate.setHours(23, 59, 59, 999);
        query.startDate = {
            $gt: startDate,
            $lt: endDate
        };
        query.deleted = false;
        //Events with same title but on different dates are not considered duplicate
        dataProviderHelper.checkForDuplicateEntry(EventManager, query)
            .then(function(count) {
                if (count > 0) {
                    throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.CONFLICT + '", "message": "' + messageConfig.eventManager.alreadyExists + '"}');
                } else {
                    var imageInfo = utilityHelper.getFileInfo(req, null, next);
                    var htmlContentInfo = {};
                    htmlContentInfo.eventDescription = req.body.eventDescription;
                    var modelHtmlContentInfo = utilityHelper.sanitizeUserHtmlBodyInput(htmlContentInfo, next);

                    var eventInfo = EventModule.CreateEvents(modelInfo, modelHtmlContentInfo.eventDescription, req.decoded.user.username, imageInfo, _slogVal);
                    return dataProviderHelper.save(eventInfo);
                }
            })
            .then(function(){
                res.status(HTTPStatus.OK);
                res.json({
                    message: messageConfig.eventManager.saveMessage
                });
            })
            .catch(Promise.CancellationError, function (cancellationErr) {
                errorHelper.customErrorResponse(res, cancellationErr, next);
            })
            .catch(function(err){
                return next(err);
            });
    };

    _p.updateEvent = function(req, res, next){
        req.body = JSON.parse(req.body.data);
        var errors = _p.checkValidationErrors(req);
        if (errors) {
            res.status(HTTPStatus.BAD_REQUEST);
            res.json({
                message: errors
            });
        }else {
            var modelInfo = utilityHelper.sanitizeUserInput(req, next);
            if(modelInfo.startDate && modelInfo.endDate){
                if(modelInfo.startDate === modelInfo.endDate){
                    modelInfo.endDate = new Date(modelInfo.endDate).setHours(23, 59, 59, 999);
                }
                if(Date.parse(modelInfo.startDate) >= Date.parse(modelInfo.endDate)){
                    res.status(HTTPStatus.BAD_REQUEST);
                    res.json({
                        message: messageConfig.eventManager.invalidDateCompareMessage
                    });
                }else{
                    _p.updateHelper(req, res, next, modelInfo);
                }
            }else{
                _p.updateHelper(req, res, next, modelInfo);
            }
        }
    };

    _p.updateHelper = function(req, res, next, modelInfo){
        var _slogVal = utilityHelper.getCleanURL(modelInfo.eventTitle, next);

        var currentDate = new Date(modelInfo.startDate);
        var startDate = currentDate.setHours(0, 0, 0, 0);
        var endDate = currentDate.setHours(23, 59, 59, 999);

        //Check if url slog of current data is changed or not by comparing it newly entered event title
        if(req.eventInfo.urlSlog !== _slogVal || ((new Date(req.eventInfo.startDate).getTime() !== new Date(modelInfo.startDate).getTime()) && (new Date(req.eventInfo.startDate).toDateString() !== new Date(modelInfo.startDate).toDateString()))) {

            var query = {};
            query.urlSlog = _slogVal;
            query.startDate = {
                $gt: startDate,
                $lt: endDate
            };
            query.deleted = false;

            dataProviderHelper.checkForDuplicateEntry(EventManager, query)
                .then(function (count) {
                    if (count > 0) {
                        throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.CONFLICT + '", "message": "' + messageConfig.eventManager.alreadyExists + '"}');
                    } else {
                        return _p.updateFunc(req, res, next, modelInfo, _slogVal);
                    }
                })
                .then(function(){
                    res.status(HTTPStatus.OK);
                    res.json({
                        message: messageConfig.eventManager.updateMessage
                    });
                })
                .catch(Promise.CancellationError, function (cancellationErr) {
                    errorHelper.customErrorResponse(res, cancellationErr, next);
                })
                .catch(function (err) {
                    return next(err);
                });
        }else{
            _p.updateFunc(req, res, next, modelInfo, _slogVal)
                .then(function(){
                    res.status(HTTPStatus.OK);
                    res.json({
                        message: messageConfig.eventManager.updateMessage
                    });
                })
                .catch(function(err){
                    return next(err);
                });
        }
        // &&  && req.eventInfo.startDate > startDate ) || req.eventInfo.urlSlog !== _slogVal

    };


    _p.updateFunc = function(req, res, next, modelInfo, _slogVal){
        var imageInfo = utilityHelper.getFileInfo(req, req.eventInfo, next);
        var htmlContentInfo = {};
        htmlContentInfo.eventDescription = req.body.eventDescription;
        var modelHtmlContentInfo = utilityHelper.sanitizeUserHtmlBodyInput(htmlContentInfo, next);
        req.eventInfo.eventTitle = modelInfo.eventTitle;
        req.eventInfo.urlSlog = _slogVal;
        req.eventInfo.eventDescription = modelHtmlContentInfo.eventDescription;
        req.eventInfo.venue = modelInfo.venue;
        req.eventInfo.venueAddress = modelInfo.venueAddress;
        req.eventInfo.startDate =  modelInfo.startDate;
        req.eventInfo.endDate = modelInfo.endDate;
        req.eventInfo.active = modelInfo.active;
        req.eventInfo.imageTitle = modelInfo.imageTitle;
        req.eventInfo.imageAltText = modelInfo.imageAltText;
        req.eventInfo.imageName = imageInfo._imageName;
        req.eventInfo.imageProperties.imageExtension = imageInfo._imageExtension;
        req.eventInfo.imageProperties.imagePath = imageInfo._imagePath;
        req.eventInfo.updatedBy = req.decoded.user.username;
        req.eventInfo.updatedOn = new Date();
        return dataProviderHelper.save(req.eventInfo);
    };

    _p.getEventDetailByTitleSlog = function (req, res, next) {
        var year = '';
        var month = '';
        var day = '';
        if (req.params.year) {
            year = req.params.year;
        }
        if (req.params.month) {
            month = req.params.month;
        }
        if (req.params.day) {
            day = req.params.day;
        }

        var query = {
            'active': true,
            'deleted': false,
            'urlSlog': req.params.titleSlog
        };

        var date = year + '-' + month + '-' + day;

        if (year && month && day) {
            var formattedDate = utilityHelper.getFormattedDate(new Date(date), "/", next);
            formattedDate = new Date(formattedDate);
            formattedDate = formattedDate.setHours(0, 0, 0, 0);

            var endOfDayDateTime = new Date(date);
            endOfDayDateTime = endOfDayDateTime.setHours(23, 59, 59, 999);
            query.startDate = {$gt: formattedDate, $lt: endOfDayDateTime};
        }

        return new Promise(function (resolve, reject) {
            dataProviderHelper.findOne(EventManager, query, documentFields)
                .then(function (eventDetailObj) {
                    resolve(eventDetailObj);
                })
                .catch(function (err) {
                    reject(err);
                });
        });
    };


    return{
        getLatestEvents : _p.getLatestEvents,
        getAllEvents: _p.getAllEvents,
        getEventByID: _p.getEventByID,
        patchEvent: _p.patchEvent,
        postEvent: _p.postEvent,
        updateEvent: _p.updateEvent,
        getEventDetailByTitleSlog: _p.getEventDetailByTitleSlog
    };

})();

module.exports = eventManagementController;