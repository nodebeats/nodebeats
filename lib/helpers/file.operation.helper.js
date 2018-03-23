(function (fileOperations) {

    'use strict';

    var cloudinary = require('cloudinary'),
        cloudinaryHelper = require('./cloudinary.helper'),
        HTTPStatus = require('http-status'),
        Promise = require("bluebird"),
        messageConfig = require('../configs/api.message.config'),
        mkdirp = require('mkdirp'),
        fs= Promise.promisifyAll(require('fs'));

    fileOperations.ensureFolderExists = function (path, mask) {
        return new Promise(function (resolve, reject) {
            mkdirp(path, function (err) {
                if (err){
                    reject(err); // something else went wrong
                } else{
                    resolve();// successfully created folder
                }
            });
        });
    };

    fileOperations.checkFileSystemAccess = function (filePath) {
        return new Promise(function (resolve, reject) {
            fs.access(filePath, fs.R_OK, function (err) {
                if(err){
                    reject(err);
                }else{
                    resolve();
                }
            });

        });
    };

    fileOperations.readFile = function (filePath) {
        return new Promise(function (resolve, reject) {
            fs.readFile(filePath, 'utf8', function (err, data) {
                if(err){
                    reject(err);
                }else{
                    resolve(data);
                }
            });

        });
    };

    fileOperations.writeFile = function (filePath, content) {
        return new Promise(function (resolve, reject) {
            fs.writeFile(filePath, content, function (err, data) {
                if(err){
                    reject(err);
                }else{
                    resolve(data);
                }
            });

        });
    };

    fileOperations.getFileContent = function (filePath) {
        return new Promise(function (resolve, reject) {
            fileOperations.readFile(filePath)
                .then(function (data) {
                    resolve(data);
                })
                .catch(function (err) {
                    reject(err);
                });
        });
    };


    fileOperations.deleteFile = function (req, res, next) {
        var fileName = '';
        if (req.query && req.query.filename) {
            fileName = req.query.filename;
        }

        if (fileName !== "") {
            var type = '';
            if (req.query.type) {
                type = req.query.type;
            }
            var filePath = '';
            if (req.query.path) {
                filePath = req.query.path;
            }
            if (type === 'image') {
                cloudinaryHelper.deleteImage(fileName, cloudinary, req, res, next);
            }
            fs.access(filePath, fs.R_OK, function (err) {
                if(err){
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.fileDelete.notFound
                    });
                }else{
                    fileOperations.unLinkFile(filePath)
                        .then(function () {
                            res.status(HTTPStatus.OK);
                            res.json({
                                message: messageConfig.fileDelete.fileDelete
                            });
                        })
                        .catch(function (err) {
                            return next(err);
                        });
                }
            });
        } else {
            res.status(HTTPStatus.BAD_REQUEST);
            res.json({
                message: messageConfig.fileDelete.fieldRequiredFile
            });
        }
    };




    fileOperations.appendFile = function (filePath, content) {
        return new Promise(function (resolve, reject) {
            fs.appendFile(filePath, content, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    };

    fileOperations.unLinkFile = function (filePath) {
        return new Promise(function (resolve, reject) {
            fs.unlink(filePath, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    };

})(module.exports);