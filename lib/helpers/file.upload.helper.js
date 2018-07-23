'use strict';

var fileUploadHelper = function (imageFilePath, documentFilePath, prefixVal) {

    var cloudinary = require('cloudinary'),
        cloudinaryHelper = require('./cloudinary.helper'),
        multer = require('multer'),
        fileHandlerHelper = require('./file.operation.helper'),
        HTTPStatus = require('http-status'),
        messageConfig = require('../configs/api.message.config'),
        errorLogController = require('../controllers/error.log.server.controller'),
        path = require('path'),
        recentFile = {};

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            var uploadPath = path.resolve(imageFilePath);

            fileHandlerHelper.ensureFolderExists(uploadPath, 484)
                .then(function () {
                    cb(null, uploadPath);
                })
                .catch(function (err) {
                    errorLogController.postErrorLogs(err, req, cb);
                });
        },
        filename: function (req, file, cb) {
            cb(null, prefixVal + '-' + Date.now() + '.' + file.originalname.substring(file.originalname.lastIndexOf('.') + 1));
        },
        onFileUploadStart: function (file) {
            recentFile = file;
            recentFile.finished = false;
            console.log(file.originalname + ' is starting ...');
        },
        onFileUploadComplete: function (file) {
            recentFile.finished = true;
        }
    });

    var documentStorage = multer.diskStorage({
        destination: function (req, file, cb) {

            fileHandlerHelper.ensureFolderExists(documentFilePath, 484)
                .then(function () {
                    cb(null, documentFilePath);
                })
                .catch(function (err) {
                    errorLogController.postErrorLogs(err, req, cb);
                });
        },
        filename: function (req, file, cb) {
            cb(null, prefixVal + '-' + Date.now() + '.' + file.originalname.substring(file.originalname.lastIndexOf('.') + 1));
        },
        onFileUploadStart: function (file) {
            recentFile = file;
            recentFile.finished = false;
            console.log(file.originalname + ' is starting ...');
        },
        onFileUploadComplete: function (file) {
            recentFile.finished = true;
        }
    });



    var imageUpload = function (req, res, next) {
        if (req.file) {
            try{
                cloudinaryHelper.singleImageUpload(cloudinary, req, res, next);
            }
            catch(err){
                var errorObj = {};
                errorObj.message = "Cloudinary error";
                errorObj.stack = err;
                errorObj.name = "";
                errorLogController.postErrorLogs(errorObj, req, next);
                res.status(HTTPStatus.INTERNAL_SERVER_ERROR);
                res.json({
                    message: messageConfig.cloudinary.validationErrMessage.cloudinaryApiKey
                });
            }
        } else {
            next();
        }
    };
    var uploader = multer({ storage: storage });
    var documentUploader = multer({ storage: documentStorage });

    return {
        uploader : uploader,
        documentUploader : documentUploader,
        imageUpload : imageUpload
    };
};
module.exports = fileUploadHelper;