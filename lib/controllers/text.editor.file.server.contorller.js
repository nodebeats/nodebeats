
var textEditorFileController = (function () {

    'use strict';

    var dataProviderHelper = require('../data/mongo.provider.helper'),
        sizeOf = require('image-size'),
        path = require('path'),
        TextEditorFileInfo = require("../models/text.editor.file.model"),
        utilityHelper = require('../helpers/utilities.helper'),
        //  cloudinaryController = require('../controllers/cloudinary.setting.server.controller'),
        cloudinary = require('cloudinary'),
        cloudinaryHelper = require('../helpers/cloudinary.helper'),
        fileOperationHelper = require('../helpers/file.operation.helper');

    function TextEditorFileModule () {}

    /* @Fields
     *  p = path of file
     *  s =  size of file
     *  w =  width of image file
     *  h = height of image file
     * */
    TextEditorFileModule.CreateTextEditorFile = function (_cloudinaryImagePath, size, dimension, _module, _localPath, _loggedInUser) {
        var textEditorFileInfo = new TextEditorFileInfo();
        textEditorFileInfo.module = _module;
        textEditorFileInfo.localPath = _localPath;
        textEditorFileInfo.p = _cloudinaryImagePath;
        textEditorFileInfo.s = size;
        textEditorFileInfo.t = new Date();
        textEditorFileInfo.w = dimension.width;
        textEditorFileInfo.h = dimension.height;
        textEditorFileInfo.addedBy = _loggedInUser;
        textEditorFileInfo.addedOn = new Date();
        return textEditorFileInfo;
    };

    var _p = TextEditorFileModule.prototype;

    _p.getAllFiles = function (req) {

        var filterOpt = {};
        if (req.query.module) {
            filterOpt.module = req.query.module;
        }
        return dataProviderHelper.getAllWithoutDocumentFieldsNoPagination(TextEditorFileInfo, filterOpt);
    };

    /*
     saves the image files uploaded from tiny mce editor
     */
    _p.saveFile = function (req, res, next) {
        var imageInfo = utilityHelper.getFileInfo(req, null, next);
        var size = req.file.size;
        var dimension = sizeOf(req.file.path);
        var reqData = JSON.parse(req.body.data);

        
        var cloudinaryImagePath = cloudinary.url(imageInfo._imageName);
        var textEditorFileInfo = TextEditorFileModule.CreateTextEditorFile(cloudinaryImagePath, size, dimension, reqData.module, imageInfo._imagePath, req.decoded.user.username);
        dataProviderHelper.save(textEditorFileInfo)
            .then(function () {
                res.status(200);
                res.json({
                    message: 'File Uploaded'
                });
            })
            .catch(function (err) {
                next(err);
            });
    };

/*
    deletes the image file from both the cloudinary server as well as local server if image is deleted in tiny mce
*/
    _p.deleteFile = function (req, res, next) {
        var filePath = "";
        if (req.query.path) {
            filePath = req.query.path;
        }
        var queryOpt = {};
        queryOpt.localPath = filePath;
        var documentFields = '_id module localPath p s t w h addedOn';
        dataProviderHelper.removeModelData(TextEditorFileInfo, queryOpt)
            .then(function () {
                return fileOperationHelper.unLinkFile(filePath);
            })
            .then(function () {
                var fileName = path.basename(filePath);
                cloudinaryHelper.deleteImage(fileName, cloudinary, req, res, next);
                res.json({
                    message: 'File Deleted'
                })
            })
            .catch(function (err) {
                next(err);
            });
    };
    return {
        getAllFiles: _p.getAllFiles,
        saveFile: _p.saveFile,
        deleteFile: _p.deleteFile
    };

})();

module.exports = textEditorFileController;