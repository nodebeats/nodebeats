var organizationInfoController = (function () {

    'use strict';

    var dataProviderHelper = require('../data/mongo.provider.helper'),
        HTTPStatus = require('http-status'),
        messageConfig = require('../configs/api.message.config'),
        OrganizationInformation = require('../models/organizationInformation.server.model'),
        utilityHelper = require('../helpers/utilities.helper'),
        errorHelper = require('../helpers/error.helper'),
        Promise = require("bluebird");

    var documentFields='_id orgName country region state city addressLine streetAddress zipAddress postalCode organizationEmail phoneNumber mobileNumber faxNumber facebookURL twitterURL googlePlusURL linkedInURL youtubeURL instagramURL slogan logoImageName imageProperties';

    function OrganizationInfoModule(){}

    OrganizationInfoModule.CreateOrganizationInfo = function(organizationObj, loggedInUser, imageInfo){
        var newOrganizationInfo = new OrganizationInformation();

        newOrganizationInfo.orgName = organizationObj.orgName;
        newOrganizationInfo.country = organizationObj.country;
        newOrganizationInfo.region = organizationObj.region;
        newOrganizationInfo.state = organizationObj.state;
        newOrganizationInfo.city = organizationObj.city;
        newOrganizationInfo.addressLine = organizationObj.addressLine;
        newOrganizationInfo.streetAddress = organizationObj.streetAddress;
        newOrganizationInfo.zipAddress = organizationObj.zipAddress;
        newOrganizationInfo.postalCode = organizationObj.postalCode;
        newOrganizationInfo.organizationEmail = organizationObj.organizationEmail;
        newOrganizationInfo.phoneNumber = organizationObj.phoneNumber;
        newOrganizationInfo.mobileNumber = organizationObj.mobileNumber;
        newOrganizationInfo.faxNumber = organizationObj.faxNumber;
        newOrganizationInfo.facebookURL = organizationObj.facebookURL;
        newOrganizationInfo.twitterURL = organizationObj.twitterURL;
        newOrganizationInfo.googlePlusURL = organizationObj.googlePlusURL;
        newOrganizationInfo.linkedInURL = organizationObj.linkedInURL;
        newOrganizationInfo.youtubeURL = organizationObj.youtubeURL;
        newOrganizationInfo.instagramURL = organizationObj.instagramURL;
        newOrganizationInfo.slogan = organizationObj.slogan;
        newOrganizationInfo.logoImageName = imageInfo._imageName;
        newOrganizationInfo.imageProperties = {
            imageExtension : imageInfo._imageExtension,
            imagePath : imageInfo._imagePath
        };
        newOrganizationInfo.addedBy = loggedInUser;
        newOrganizationInfo.addedOn = new Date();
        return newOrganizationInfo;
    };

    var _p = OrganizationInfoModule.prototype;

    _p.checkValidationErrors = function(req){
        req.checkBody('orgName', messageConfig.organizationInfo.validationErrMessage.orgName).notEmpty();
        req.checkBody('country', messageConfig.organizationInfo.validationErrMessage.country).notEmpty();
        req.checkBody('city', messageConfig.organizationInfo.validationErrMessage.city).notEmpty();
        req.checkBody('streetAddress', messageConfig.organizationInfo.validationErrMessage.streetAddress).notEmpty();
        req.checkBody('organizationEmail', messageConfig.organizationInfo.validationErrMessage.organizationEmail).notEmpty();
        req.checkBody('organizationEmail', messageConfig.organizationInfo.validationErrMessage.organizationEmailValid).isEmail();
        if(req.body.facebookURL){
            req.checkBody('facebookURL', messageConfig.organizationInfo.validationErrMessage.facebookURLValid).isURL();
        }
        if(req.body.twitterURL){
            req.checkBody('twitterURL', messageConfig.organizationInfo.validationErrMessage.twitterURLValid).isURL();
        }
        if(req.body.googlePlusURL){
            req.checkBody('googlePlusURL', messageConfig.organizationInfo.validationErrMessage.googlePlusURLValid).isURL();
        }
        if(req.body.linkedInURL){
            req.checkBody('linkedInURL', messageConfig.organizationInfo.validationErrMessage.linkedInURLValid).isURL();
        }
        if(req.body.youtubeURL){
            req.checkBody('youtubeURL', messageConfig.organizationInfo.validationErrMessage.youtubeURLValid).isURL();
        }
        if(req.body.instagramURL){
            req.checkBody('instagramURL', messageConfig.organizationInfo.validationErrMessage.instagramURLValid).isURL();
        }

        return req.validationErrors();
    };

    _p.getOrganizationInfo = function(){

        //Get organization information
        return dataProviderHelper.findOne(OrganizationInformation, {}, documentFields);
    };

    _p.getOrganizationInfoByID = function(req){

        return dataProviderHelper.findById(OrganizationInformation, req.params.organizationInfoId, documentFields);
    };


    _p.postOrganizationInfo = function(req, res, next){
        req.body = JSON.parse(req.body.data);
        //Check for validation errors
        var errors = _p.checkValidationErrors(req);
        if (errors) {
            res.status(HTTPStatus.BAD_REQUEST);
            res.json({
                message: errors
            });
        }else{
            dataProviderHelper.checkForDuplicateEntry(OrganizationInformation, {})
                .then(function(count){
                    if(count > 0){
                        throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.CONFLICT + '", "message": "' + messageConfig.organizationInfo.alreadyExists + '"}');
                    }else{
                        var modelInfo = utilityHelper.sanitizeUserInput(req, next);
                        var imageInfo = utilityHelper.getFileInfo(req, null, next);
                        var newOrganizationInfo = OrganizationInfoModule.CreateOrganizationInfo(modelInfo, req.decoded.user.username, imageInfo);
                       return dataProviderHelper.save(newOrganizationInfo);
                    }
                })
                .then(function(){
                    res.status(HTTPStatus.OK);
                    res.json({
                        message: messageConfig.organizationInfo.saveMessage
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

    _p.updateOrganizationInfo = function(req, res, next){
        req.body = JSON.parse(req.body.data);
        var errors = _p.checkValidationErrors(req);
        if (errors) {
            res.status(HTTPStatus.BAD_REQUEST);
            res.json({
                message: errors
            });
        }else{

            var modelInfo = utilityHelper.sanitizeUserInput(req, next);
            var orgnanizationImageInfo = {};
            orgnanizationImageInfo = {
                imageName: req.organizationInfo.logoImageName,
                imageProperties : {
                    imageExtension : req.organizationInfo.imageProperties.imageExtension,
                    imagePath: req.organizationInfo.imageProperties.imagePath
                }
            };
            var imageInfo = utilityHelper.getFileInfo(req, orgnanizationImageInfo, next);
            req.organizationInfo.orgName = modelInfo.orgName;
            req.organizationInfo.country = modelInfo.country;
            req.organizationInfo.region = modelInfo.region;
            req.organizationInfo.state = modelInfo.state;
            req.organizationInfo.city = modelInfo.city;
            req.organizationInfo.addressLine = modelInfo.addressLine;
            req.organizationInfo.streetAddress = modelInfo.streetAddress;
            req.organizationInfo.zipAddress = modelInfo.zipAddress;
            req.organizationInfo.postalCode = modelInfo.postalCode;
            req.organizationInfo.organizationEmail = modelInfo.organizationEmail;
            req.organizationInfo.phoneNumber = modelInfo.phoneNumber;
            req.organizationInfo.mobileNumber = modelInfo.mobileNumber;
            req.organizationInfo.faxNumber = modelInfo.faxNumber;
            req.organizationInfo.facebookURL = modelInfo.facebookURL;
            req.organizationInfo.twitterURL = modelInfo.twitterURL;
            req.organizationInfo.googlePlusURL = modelInfo.googlePlusURL;
            req.organizationInfo.linkedInURL = modelInfo.linkedInURL;
            req.organizationInfo.youtubeURL = modelInfo.youtubeURL;
            req.organizationInfo.instagramURL = modelInfo.instagramURL;
            req.organizationInfo.updatedBy = req.decoded.user.username;
            req.organizationInfo.updatedOn = new Date();

            req.organizationInfo.slogan = modelInfo.slogan;
            req.organizationInfo.logoImageName = imageInfo._imageName;
            req.organizationInfo.imageProperties.imageExtension = imageInfo._imageExtension;
            req.organizationInfo.imageProperties.imagePath = imageInfo._imagePath;

            dataProviderHelper.save(req.organizationInfo)
                .then(function(){
                    res.status(HTTPStatus.OK);
                    res.json({
                        message: messageConfig.organizationInfo.updateMessage
                    });
                })
                .catch(function(err){
                    return next(err);
                });
        }
    };

    return{
        getOrganizationInfo: _p.getOrganizationInfo,
        getOrganizationInfoByID: _p.getOrganizationInfoByID,
        postOrganizationInfo: _p.postOrganizationInfo,
        updateOrganizationInfo: _p.updateOrganizationInfo
    };

})();

module.exports = organizationInfoController;