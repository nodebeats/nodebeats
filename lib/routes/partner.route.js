var partnerRoutes = (function () {

    'use strict';

    var HTTPStatus = require('http-status'),
        express = require('express'),
        tokenAuthMiddleware = require('../middlewares/token.authentication.middleware'),
        roleAuthMiddleware = require('../middlewares/role.authorization.middleware'),
        messageConfig = require('../configs/api.message.config'),
        partnerController = require('../controllers/partner.server.controller'),
        imageFilePath = './public/uploads/images/partners/',
        uploadPrefix = 'partner',
        fileUploadHelper = require('../helpers/file.upload.helper')(imageFilePath, '', uploadPrefix),
        uploader = fileUploadHelper.uploader,
        partnerRouter =  express.Router();

    partnerRouter.route('/')
        .get( getAllPartners )
        .post( tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, uploader.single('imageName'), fileUploadHelper.imageUpload, partnerController.postPartnerInfo );


    partnerRouter.use('/:partnerId', function(req, res, next){
        partnerController.getPartnerById(req)
            .then(function(partnerInfo){
                if (partnerInfo) {
                    req.partnerInfo = partnerInfo;
                    next();
                    return null;// return a non-undefined value to signal that we didn't forget to return promise
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
        .patch( tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, partnerController.deletePartnerInfo )
        .put( tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, uploader.single('imageName'), fileUploadHelper.imageUpload, partnerController.updatePartnerInfo );



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

})();

module.exports = partnerRoutes;