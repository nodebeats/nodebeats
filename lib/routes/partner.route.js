/**
 * Created by lakhe on 8/18/16.
 */

'use strict';

var partnerRoutes = function(){

    var HTTPStatus = require('http-status'),
        express = require('express'),
        tokenAuthMiddleware = require('../middlewares/token.authentication.middleware')(),
        messageConfig = require('../configs/api.message.config'),
        partnerController = require('../controllers/partner.server.controller')(),
        imageFilePath = './public/uploads/images/partners/',
        uploadPrefix = 'partner',
        fileUploadHelper = require('../helpers/file.upload.helper')(imageFilePath, '', uploadPrefix),
        uploader = fileUploadHelper.uploader,
        partnerRouter =  express.Router();

    partnerRouter.route('/')
        .get( getAllPartners )
        .post( tokenAuthMiddleware.authenticate, uploader.single('imageName'), fileUploadHelper.imageUpload, partnerController.postPartnerInfo );


    partnerRouter.use('/:partnerId', function(req, res, next){
        partnerController.getPartnerById(req)
            .then(function(partnerInfo){
                if (partnerInfo) {
                    req.partnerInfo = partnerInfo;
                    next();
                } else {
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.partner.notFound
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    });


    partnerRouter.route('/:partnerId')
        .get(function(req, res){
            res.status(HTTPStatus.OK);
            res.json(req.partnerInfo);
        })
        .patch( tokenAuthMiddleware.authenticate, partnerController.deletePartnerInfo )
        .put( tokenAuthMiddleware.authenticate, uploader.single('imageName'), fileUploadHelper.imageUpload, partnerController.updatePartnerInfo );



    function getAllPartners(req, res, next) {
        partnerController.getPartners (req, next)
            .then(function(partners){
                if (partners) {
                    res.status(HTTPStatus.OK);
                    res.json(partners);
                } else {
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.partner.notFound
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    }

    return partnerRouter;
};

module.exports = partnerRoutes;