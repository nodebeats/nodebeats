/**
 * Created by lakhe on 4/1/16.
 */

'use strict';

var fileOperations = function(){

    var cloudinary = require('cloudinary'),
        cloudinaryHelper = require('./cloudinary.helper'),
        HTTPStatus = require('http-status'),
        Promise = require("bluebird"),
        messageConfig = require('../configs/api.message.config'),
        fs= Promise.promisifyAll(require('fs'));

    var ensureFolderExists = function(path, mask) {
        if (typeof mask === 'function') { // allow the `mask` parameter to be optional
            mask = '0777';
        }
        return new Promise(function(resolve, reject) {
            fs.mkdir(path, mask, function(err) {
                if(err){
                    if (err.code === 'EEXIST'){
                        resolve();// ignore the error if the folder already exists
                    }
                    else {
                        reject(err); // something else went wrong
                    }
                }else{
                    resolve();// successfully created folder
                }
            });
        });
    };

    var checkFileSystemAccess = function(filePath) {
        return new Promise(function(resolve, reject) {
            fs.access(filePath, fs.R_OK, function(err){
                if(err){
                    reject(err);
                }else{
                    resolve();
                }
            });

        });
    };

    var readFile = function (filePath) {
        return new Promise(function(resolve, reject) {
            fs.readFile(filePath, 'utf8', function(err, data){
                if(err){
                    reject(err);
                }else{
                    resolve(data);
                }
            });

        });
    };

    var writeFile = function (filePath, content) {
        return new Promise(function(resolve, reject) {
            fs.writeFile(filePath, content, function(err, data){
                if(err){
                    reject(err);
                }else{
                    resolve(data);
                }
            });

        });
    };

    var getFileContent = function (filePath) {
        return new Promise(function(resolve, reject) {
            readFile(filePath)
                .then(function (data) {
                    resolve(data);
                })
                .catch(function (err) {
                    reject(err);
                });
        });
    };


    var removeFile = function (req, res, next) {
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
            unLinkFile(filePath)
                .then(function () {
                    res.status(HTTPStatus.OK);
                    res.json({
                        message: messageConfig.fileDelete.fileDelete
                    });
                })
                .catch(function (err) {
                    return next(err);
                });
        } else {
            res.status(HTTPStatus.BAD_REQUEST);
            res.json({
                message: messageConfig.fileDelete.fieldRequiredFile
            });
        }
    };


    

    var appendFile = function(filePath, content){
        return new Promise(function(resolve, reject) {
            fs.appendFile(filePath, content, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    var unLinkFile = function(filePath) {
        return new Promise(function(resolve, reject) {
            fs.unlink(filePath, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    };

    return{
        checkFileSystemAccess : checkFileSystemAccess,
        ensureFolderExists : ensureFolderExists,
        getFileContent : getFileContent,
        deleteFile : removeFile,
        writeFile : writeFile,
        unLinkFile : unLinkFile,
        appendFile : appendFile
    };
};

module.exports = fileOperations;