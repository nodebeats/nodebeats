/**
 * Created by lakhe on 3/28/16.
 */
(function (databaseHelper) {

    'use strict';

    var Promise = require("bluebird"),
        cloudinary = require('cloudinary'),
        dbConfig = require('../configs/database.config'),
        fileOperationHelper = require('../helpers/file.operation.helper'),
        environmentVariableGeneratorHelper = require('../helpers/environment.variable.generator.helper'),
        EmailTemplate = require('../models/email.template.server.model'),
        roleManagementController = require('../controllers/role.management.server.controller'),
        dataProviderHelper = require('../data/mongo.provider.helper'),
        path = require('path'),
        join = Promise.join,
        mongoose = Promise.promisifyAll(require('mongoose'));


    databaseHelper.init = function (app) {

        var //dbUrl = "mongodb://" + dbConfig.development.host + ":" + dbConfig.development.port + "/" + dbConfig.development.dbName,
            dbUrl = "mongodb://" + dbConfig.development.username + ":" + dbConfig.development.password + "@" + dbConfig.development.host + ":" + dbConfig.development.port + "/" + dbConfig.development.dbName,
            defaultUserStatusController = require('../controllers/app.default.user.server.controller');

        if (process.env.NODE_ENV === "production") {
            dbUrl = "mongodb://" + dbConfig.production.username + ":" + dbConfig.production.password + "@" + dbConfig.production.host + ":" + dbConfig.production.port + "/" + dbConfig.production.dbName;
        }

        if (process.env.NODE_ENV === "test") {
            dbUrl = "mongodb://" + dbConfig.test.host + ":" + dbConfig.test.port + "/" + dbConfig.test.dbName;
        }
        var options = {promiseLibrary: require('bluebird')};
        mongoose.Promise = require('bluebird');
        mongoose.connect(dbUrl, options);

        var db = mongoose.connection;

        // CONNECTION EVENTS
        // When successfully connected

        db.on('connected', function () {
            // To set the default admin user at the start of application initiation



            var mongoDumpConfigFilePath = path.resolve(app.get('rootDir')) + '/lib/mongodump/mongo.restore.config.json';
            var emailTemplateJsonPath = path.resolve(app.get('rootDir')) + '/lib/mongodump/EmailTemplate.json';
            var roleManagerJsonPath = path.resolve(app.get('rootDir')) + '/lib/mongodump/RoleManager.json';
            var jsonObj = {};

            if (process.env.NODE_ENV === "test") {
                defaultUserStatusController.getDefaultUserStatus()
                    .then(function () {
                        return fileOperationHelper.getFileContent(roleManagerJsonPath);
                    })
                    .then(function (roleObj) {
                        if(roleObj){
                            jsonObj = JSON.parse(roleObj);
                            var roleInfo = roleManagementController.createRole(jsonObj, 'system')
                            return dataProviderHelper.save(roleInfo);
                        }else{
                            return Promise.resolve();
                        }
                    })
                    .then(function () {
                        console.log('successfull setup');
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            }else{

                fileOperationHelper.getFileContent(mongoDumpConfigFilePath)
                    .then(function (data) {
                        var fileDataObj = JSON.parse(data);
                        if (fileDataObj && !fileDataObj.restored) {
                            return environmentVariableGeneratorHelper.generateAppSecretConfig(app.get('rootDir'));
                        } else {
                            throw new Promise.CancellationError('{ "statusCode":"409", "message": "Already exists"}');
                        }
                    })
                    .then(function () {
                        return defaultUserStatusController.getDefaultUserStatus();
                    })
                    .then(function () {
                        return fileOperationHelper.getFileContent(emailTemplateJsonPath);
                    })
                    .then(function (lstEmailTemplate) {
                        if(lstEmailTemplate){
                            jsonObj = JSON.parse(lstEmailTemplate);
                            return dataProviderHelper.bulkInsert(EmailTemplate, jsonObj.emailTemplate);
                        }else{
                            return Promise.resolve();
                        }
                    })
                    .then(function () {
                        return fileOperationHelper.getFileContent(roleManagerJsonPath);
                    })
                    .then(function (roleObj) {
                        if (roleObj){
                            jsonObj = JSON.parse(roleObj);
                            var roleInfo = roleManagementController.createRole(jsonObj, 'system')
                            return dataProviderHelper.save(roleInfo);
                        }else{
                            return Promise.resolve();
                        }
                    })
                    .then(function () {
                        var jsonDataObj = {
                            "restored": true
                        };
                        return fileOperationHelper.writeFile(mongoDumpConfigFilePath, JSON.stringify(jsonDataObj, null, 4));
                    })
                    .then(function () {
                        console.log('successfull setup')
                    })
                    .catch(Promise.CancellationError, function () {
                        // _p.customErrorResponse(res, cancellationErr, next);

                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            }
            console.log('Mongoose default connection open to ' + dbUrl);
        });

        // When the connection is disconnected
        db.on('disconnected', function () {
            console.log('Mongoose default connection disconnected');
        });

        // If the connection throws an error
        db.on('error', function (err) {
            console.log('Mongoose default connection error: ' + err);
        });

        // If the Node process ends, close the Mongoose connection
        process.on('SIGINT', function () {
            mongoose.connection.close(function () {
                console.log('Mongoose default connection disconnected through app termination');
                process.exit(0);
            });
        });
    };

})(module.exports);
