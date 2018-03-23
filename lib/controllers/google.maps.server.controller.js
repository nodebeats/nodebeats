var googleMapsController = (function () {

    'use strict';

    var dataProviderHelper = require('../data/mongo.provider.helper'),
        HTTPStatus = require('http-status'),
        messageConfig = require('../configs/api.message.config'),
        GoogleMaps = require('../models/google.maps.server.model'),
        utilityHelper = require('../helpers/utilities.helper'),
        errorHelper = require('../helpers/error.helper'),
        Promise = require("bluebird");

    var documentFields='_id placeName longitude latitude scrollWheel zoom mapType googleMapsApiKey showMarker markerTitle addedOn';

    function GoogleMapModule(){}

    GoogleMapModule.CreateGoogleMapModule = function(googleMapsObj, loggedInUser){
        var newGoogleMapsConfig = new GoogleMaps();

        newGoogleMapsConfig.placeName = googleMapsObj.placeName;
        newGoogleMapsConfig.longitude = googleMapsObj.longitude;
        newGoogleMapsConfig.latitude = googleMapsObj.latitude;
        newGoogleMapsConfig.scrollWheel = googleMapsObj.scrollWheel;
        newGoogleMapsConfig.zoom = googleMapsObj.zoom;
        newGoogleMapsConfig.mapType = googleMapsObj.mapType;
        newGoogleMapsConfig.showMarker = googleMapsObj.showMarker;
        newGoogleMapsConfig.markerTitle = googleMapsObj.markerTitle;
        newGoogleMapsConfig.googleMapsApiKey = googleMapsObj.googleMapsApiKey;
        newGoogleMapsConfig.addedBy = loggedInUser;
        newGoogleMapsConfig.addedOn = new Date();
        return newGoogleMapsConfig;
    };

    var _p = GoogleMapModule.prototype;

    _p.checkValidationErrors = function(req){
        req.checkBody('placeName', messageConfig.googleMaps.validationErrMessage.placeName).notEmpty();
        req.checkBody('longitude', messageConfig.googleMaps.validationErrMessage.longitude).notEmpty();
        req.checkBody('latitude', messageConfig.googleMaps.validationErrMessage.latitude).notEmpty();
        req.checkBody('zoom', messageConfig.googleMaps.validationErrMessage.zoom).notEmpty();
        req.checkBody('mapType', messageConfig.googleMaps.validationErrMessage.mapType).notEmpty();
        req.checkBody('markerTitle', messageConfig.googleMaps.validationErrMessage.markerTitle).notEmpty();
        if(req.body.longitude){
            req.checkBody('longitude', messageConfig.googleMaps.validationErrMessage.longitudeValid).isDecimal();
        }
        if(req.body.latitude){
            req.checkBody('latitude', messageConfig.googleMaps.validationErrMessage.latitudeValid).isDecimal();
        }
        if(req.body.zoom){
            req.checkBody('zoom', messageConfig.googleMaps.validationErrMessage.zoomValid).isInt();
        }

        return req.validationErrors();
    };

    _p.getGoogleMapsConfig = function(){

        return dataProviderHelper.findOne(GoogleMaps, {}, documentFields);
    };

    _p.getGoogleMapsConfigByID = function(req){
        return dataProviderHelper.findById(GoogleMaps, req.params.googleMapsConfigId, documentFields);
    };

    _p.postGoogleMapsConfig = function(req, res, next){
        var errors = _p.checkValidationErrors(req);

        if (errors) {
            res.status(HTTPStatus.BAD_REQUEST);
            res.json({
                message: errors
            });
        }else{

            dataProviderHelper.checkForDuplicateEntry(GoogleMaps, {})
                .then(function(count){
                    if(count > 0){
                        throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.CONFLICT + '", "message": "' + messageConfig.googleMaps.alreadyExists + '"}');
                    }else{
                        var modelInfo = utilityHelper.sanitizeUserInput(req, next);
                        var newGoogleMapsConfig = GoogleMapModule.CreateGoogleMapModule(modelInfo, req.decoded.user.username);
                        return dataProviderHelper.save(newGoogleMapsConfig);
                    }
                })
                .then(function () {
                    res.status(HTTPStatus.OK);
                    res.json({
                        message: messageConfig.googleMaps.saveMessage
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

    _p.updateGoogleMapsConfig = function(req, res, next){
        var errors = _p.checkValidationErrors(req);
        if (errors) {
            res.status(HTTPStatus.BAD_REQUEST);
            res.json({
                message: errors
            });
        }else{

            var modelInfo = utilityHelper.sanitizeUserInput(req, next);
            req.googleMapsData.placeName = modelInfo.placeName;
            req.googleMapsData.longitude = modelInfo.longitude;
            req.googleMapsData.latitude = modelInfo.latitude;
            req.googleMapsData.scrollWheel = modelInfo.scrollWheel;
            req.googleMapsData.zoom = modelInfo.zoom;
            req.googleMapsData.mapType = modelInfo.mapType;
            req.googleMapsData.showMarker = modelInfo.showMarker;
            req.googleMapsData.markerTitle = modelInfo.markerTitle;
            req.googleMapsData.googleMapsApiKey = modelInfo.googleMapsApiKey;
            req.googleMapsData.updatedBy = req.decoded.user.username;
            req.googleMapsData.updatedOn = new Date();

            dataProviderHelper.save(req.googleMapsData)
                .then(function(){
                    res.status(HTTPStatus.OK);
                    res.json({
                        message: messageConfig.googleMaps.updateMessage
                    });
                })
                .catch(function(err){
                    return next(err);
                });
        }
    };

    return{
        getGoogleMapsConfig : _p.getGoogleMapsConfig,
        getGoogleMapsConfigByID : _p.getGoogleMapsConfigByID,
        postGoogleMapsConfig : _p.postGoogleMapsConfig,
        updateGoogleMapsConfig : _p.updateGoogleMapsConfig
    };

})();

module.exports = googleMapsController;