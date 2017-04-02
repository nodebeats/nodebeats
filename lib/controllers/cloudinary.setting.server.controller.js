var CloudinarySettingController = (function () {

    'use strict';

    var cloudinary = require('cloudinary'),
        HTTPStatus = require('http-status'),
        messageConfig = require('../configs/api.message.config'),
        dataProviderHelper = require('../data/mongo.provider.helper'),
        CloudinarySetting = require('../models/cloudinary.setting.config.server.model'),
        utilityHelper = require('../helpers/utilities.helper'),
        errorHelper = require('../helpers/error.helper'),
        Promise = require("bluebird");

    var documentFields = '_id cloudinaryCloudName cloudinaryApiKey cloudinaryApiSecret';

    function CloudinarySettingModule(){}

    CloudinarySettingModule.CreateCloudinarySetting = function(cloudinaryObj, loginUser){
        var cloudinarySettingInfo = new CloudinarySetting();
        cloudinarySettingInfo.cloudinaryCloudName = cloudinaryObj.cloudinaryCloudName;
        cloudinarySettingInfo.cloudinaryApiKey = cloudinaryObj.cloudinaryApiKey;
        cloudinarySettingInfo.cloudinaryApiSecret = cloudinaryObj.cloudinaryApiSecret;
        cloudinarySettingInfo.addedBy = loginUser;
        cloudinarySettingInfo.addedOn = new Date();
        return cloudinarySettingInfo;
    };

    var _p = CloudinarySettingModule.prototype;

    _p.checkValidationErrors = function (req) {
        req.checkBody('cloudinaryCloudName', messageConfig.cloudinary.validationErrMessage.cloudinaryCloudName).notEmpty();
        req.checkBody('cloudinaryApiKey', messageConfig.cloudinary.validationErrMessage.cloudinaryApiKey).notEmpty();
        req.checkBody('cloudinaryApiSecret', messageConfig.cloudinary.validationErrMessage.cloudinaryApiSecret).notEmpty();
        return req.validationErrors();
    };

    _p.getCloudinarySetting = function(){
        //get cloudinary setting with empty object as query parameter and documentFields as select fields
        return dataProviderHelper.findOne(CloudinarySetting, {}, documentFields);
    };


    _p.getCloudinarySettingByID = function(req){
        return dataProviderHelper.findById(CloudinarySetting, req.params.cloudinarySettingId, documentFields);
    };

    //Initialize Cloudinary so that we can upload images to the cloudinary server
    _p.initializeCloudinary = function(cloudinarySetting){
        cloudinary.config({
            cloud_name: cloudinarySetting.cloudinaryCloudName,
            api_key: cloudinarySetting.cloudinaryApiKey,
            api_secret: cloudinarySetting.cloudinaryApiSecret
        });
    };

    _p.postCloudinarySetting = function(req, res, next){
        //Check for validation errors
        var errors = _p.checkValidationErrors(req);
        if (errors) {
            res.status(HTTPStatus.BAD_REQUEST);
            res.json({
                message: errors
            });
        } else {
            //Check if cloudinary setting already exists
            dataProviderHelper.checkForDuplicateEntry(CloudinarySetting, {})
                .then(function (count) {
                    if (count > 0) {
                        throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.CONFLICT + '", "message": "' + messageConfig.cloudinary.alreadyExists + '"}');
                    } else {
                        var modelInfo = utilityHelper.sanitizeUserInput(req, next);
                        var cloudinarySettingInfo = CloudinarySettingModule.CreateCloudinarySetting(modelInfo, req.decoded.user.username);

                        return [cloudinarySettingInfo, dataProviderHelper.save(cloudinarySettingInfo)];
                    }
                })
                .spread(function (cloudinarySettingInfo) {
                    _p.saveFuncResponse(res, cloudinarySettingInfo, messageConfig.cloudinary.saveMessage);
                })
                .catch(Promise.CancellationError, function (cancellationErr) {
                    errorHelper.customErrorResponse(res, cancellationErr, next);
                })
                .catch(function (err) {
                    return next(err);
                });
        }
    };

    _p.updateCloudinarySetting = function(req, res, next){
        var errors = _p.checkValidationErrors(req);
        if (errors) {
            res.status(HTTPStatus.BAD_REQUEST);
            res.json({
                message: errors
            });
        } else {
            var modelInfo = utilityHelper.sanitizeUserInput(req, next);
            req.cloudinarySettingInfo.cloudinaryCloudName = modelInfo.cloudinaryCloudName;
            req.cloudinarySettingInfo.cloudinaryApiKey = modelInfo.cloudinaryApiKey;
            req.cloudinarySettingInfo.cloudinaryApiSecret = modelInfo.cloudinaryApiSecret;
            req.cloudinarySettingInfo.updatedBy = req.decoded.user.username;
            req.cloudinarySettingInfo.updatedOn = new Date();

            dataProviderHelper.save(req.cloudinarySettingInfo)
                .then(function () {
                    _p.saveFuncResponse(res, req.cloudinarySettingInfo, messageConfig.cloudinary.updateMessage);
                })
                .catch(function (err) {
                    return next(err);
                });
        }
    };

    _p.saveFuncResponse = function(res, newCloudinarySettingInfo, msg){
        //On successfull save or update action, update the cloudinary configuration globally.

        _p.initializeCloudinary(newCloudinarySettingInfo);

        res.status(HTTPStatus.OK);
        res.json({
            message: msg
        });
    };

    return{
        getCloudinarySetting : _p.getCloudinarySetting,
        getCloudinarySettingByID : _p.getCloudinarySettingByID,
        postCloudinarySetting : _p.postCloudinarySetting,
        updateCloudinarySetting : _p.updateCloudinarySetting
    };

})();

module.exports = CloudinarySettingController;