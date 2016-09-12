/**
 * Created by lakhe on 7/8/16.
 */

'use strict';

var cloudinary = require('cloudinary'),
    hasher = require('../auth/hasher'),
    fileOperationHelper = require('./file.operation.helper')(cloudinary),
    Promise = require("bluebird");

var environmentVariableGeneratorHelper = (function(){

    return {
        generateAppSecretConfig : function(rootDir) {

            var appSecretConfigFilePath = rootDir + '/.env';

            return new Promise(function(resolve, reject){
                hasher.generateRandomBytes(64)
                    .then(function (cookieSecret) {
                        return [cookieSecret, hasher.generateRandomBytes(64), hasher.generateRandomBytes(64)];
                    })
                    .spread(function (cookieSecret, sessionSecret, tokenSecret) {
                        var contentData = 'TOKEN_SECRET=' + tokenSecret + '\n' + 'SESSION_SECRET=' + sessionSecret + '\n' + 'COOKIE_SECRET=' + cookieSecret + '\n';
                        return fileOperationHelper.writeFile(appSecretConfigFilePath, contentData);
                    })
                    .then(function (result) {
                        resolve(result);
                    })
                    .catch(function (err) {
                        reject(err);
                    });
            });
        }
    };
}());

module.exports = environmentVariableGeneratorHelper;