var testimonialController = (function () {

    'use strict';

    var dataProviderHelper = require('../data/mongo.provider.helper'),
        HTTPStatus = require('http-status'),
        messageConfig = require('../configs/api.message.config'),
        Testimonial = require('../models/testimonial.server.model'),
        utilityHelper = require('../helpers/utilities.helper'),
        Promise = require("bluebird");

    var documentFields = '_id personName testimonialContent organization designation email facebookURL twitterURL gPlusURL linkedInURL imageName imageProperties active';

    function TestimonialModule(){}

    TestimonialModule.CreateTestimonial = function(testimonialObj, loggedInUser, imageInfo){
        var testimonialInfo = new Testimonial();

        testimonialInfo.personName = testimonialObj.personName;
        testimonialInfo.testimonialContent = testimonialObj.testimonialContent;
        testimonialInfo.organization = testimonialObj.organization;
        testimonialInfo.designation = testimonialObj.designation;
        testimonialInfo.email = testimonialObj.email;
        testimonialInfo.facebookURL = testimonialObj.facebookURL;
        testimonialInfo.twitterURL = testimonialObj.twitterURL;
        testimonialInfo.gPlusURL = testimonialObj.gPlusURL;
        testimonialInfo.linkedInURL = testimonialObj.linkedInURL;
        testimonialInfo.active = testimonialObj.active;
        testimonialInfo.imageName = imageInfo._imageName;
        testimonialInfo.imageProperties = {
            imageExtension : imageInfo._imageExtension,
            imagePath : imageInfo._imagePath
        };
        testimonialInfo.addedBy = loggedInUser;
        testimonialInfo.addedOn = new Date();

        return testimonialInfo;
    };

    var _p = TestimonialModule.prototype;


    _p.checkValidationErrors = function(req){

        req.checkBody('personName', messageConfig.testimonial.validationErrMessage.personName).notEmpty();
        req.checkBody('testimonialContent', messageConfig.testimonial.validationErrMessage.testimonialContent).notEmpty();
        req.checkBody('organization', messageConfig.testimonial.validationErrMessage.organization).notEmpty();
        if(req.body.email){
            req.checkBody('email', messageConfig.testimonial.validationErrMessage.emailValid).isEmail();
        }
        if(req.body.facebookURL){
            req.checkBody('facebookURL', messageConfig.testimonial.validationErrMessage.facebookURLValid).isURL();
        }
        if(req.body.twitterURL){
            req.checkBody('twitterURL', messageConfig.testimonial.validationErrMessage.twitterURLValid).isURL();
        }
        if(req.body.gPlusURL){
            req.checkBody('gPlusURL', messageConfig.testimonial.validationErrMessage.gPlusURLValid).isURL();
        }
        if(req.body.linkedInURL){
            req.checkBody('linkedInURL', messageConfig.testimonial.validationErrMessage.linkedInURLValid).isURL();
        }

        return req.validationErrors();
    };

    _p.getAllTestimonials = function(req, next) {
        //Get pagination query options
        var pagerOpts = utilityHelper.getPaginationOpts(req, next);
        
        var query = {};

        // matches anything that  starts with the inputted person name, case insensitive
        if(req.query.personName){
            query.personName = { $regex: new RegExp('.*' + req.query.personName, "i") };
        }
        if(req.query.active){
            query.active = req.query.active;
        }
        query.deleted = false;

        return dataProviderHelper.getAllWithDocumentFieldsPagination(Testimonial, query, pagerOpts, documentFields, { addedOn: -1 });
    };

    _p.getTestimonialByID = function(req){
        return dataProviderHelper.findById(Testimonial, req.params.testimonialId, documentFields);
    };

    _p.patchTestimonial = function(req, res, next){
        req.testimonialInfo.deleted = true;
        req.testimonialInfo.deletedOn = new Date();
        req.testimonialInfo.deletedBy = req.decoded.user.username;
        _p.saveFunc(req, res, req.testimonialInfo, next, messageConfig.testimonial.deleteMessage);
    };



    _p.postTestimonial=function(req, res, next){
        req.body = JSON.parse(req.body.data);
        var errors = _p.checkValidationErrors(req);
        if (errors) {
            res.status(HTTPStatus.BAD_REQUEST);
            res.json({
                message: errors
            });
        }else{
            var imageInfo = utilityHelper.getFileInfo(req, null, next);
            var modelInfo = utilityHelper.sanitizeUserInput(req, next);
            var testimonialInfo = TestimonialModule.CreateTestimonial(modelInfo, req.decoded.user.username, imageInfo);
            _p.saveFunc(req, res, testimonialInfo, next, messageConfig.testimonial.saveMessage);
        }
    };

    _p.saveFunc = function(req, res, newtestimonialInfo, next, msg){
        dataProviderHelper.save(newtestimonialInfo)
            .then(function(){
                res.status(HTTPStatus.OK);
                res.json({
                    message: msg
                });
            })
            .catch(function(err){
                return next(err);
            });
    };

    _p.updateTestimonial = function(req, res, next){
        req.body = JSON.parse(req.body.data);
        var errors = _p.checkValidationErrors(req);

        if (errors) {
            res.status(HTTPStatus.BAD_REQUEST);
            res.json({
                message: errors
            });
        }else{
            var modelInfo = utilityHelper.sanitizeUserInput(req, next);
            var imageInfo = utilityHelper.getFileInfo(req, req.testimonialInfo, next);

            req.testimonialInfo.personName = modelInfo.personName;
            req.testimonialInfo.testimonialContent = modelInfo.testimonialContent;
            req.testimonialInfo.organization = modelInfo.organization;
            req.testimonialInfo.designation =  modelInfo.designation;
            req.testimonialInfo.email =  modelInfo.email;
            req.testimonialInfo.facebookURL = modelInfo.facebookURL;
            req.testimonialInfo.twitterURL = modelInfo.twitterURL;
            req.testimonialInfo.gPlusURL = modelInfo.gPlusURL;
            req.testimonialInfo.linkedInURL = modelInfo.linkedInURL;
            req.testimonialInfo.active = modelInfo.active;
            req.testimonialInfo.imageName = imageInfo._imageName;
            req.testimonialInfo.imageProperties.imageExtension = imageInfo._imageExtension;
            req.testimonialInfo.imageProperties.imagePath = imageInfo._imagePath;
            req.testimonialInfo.updatedBy = req.decoded.user.username;
            req.testimonialInfo.updatedOn = new Date();
            _p.saveFunc(req, res, req.testimonialInfo, next, messageConfig.testimonial.updateMessage);
        }
    };

    return{
        getAllTestimonials: _p.getAllTestimonials,
        getTestimonialByID: _p.getTestimonialByID,
        patchTestimonial: _p.patchTestimonial,
        postTestimonial: _p.postTestimonial,
        updateTestimonial: _p.updateTestimonial
    };
})();

module.exports = testimonialController;