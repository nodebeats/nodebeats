/**
 * Created by lakhe on 3/28/16.
 */
(function (databaseHelper) {
    'use strict';
    var Promise = require("bluebird"),
        cloudinary = require('cloudinary'),
        restoreMongoDBHelper = require('../helpers/mongodb.restore.helper'),
        dbConfig = require('../configs/database.config'),
        fileOperationHelper = require('../helpers/file.operation.helper')(cloudinary),
        environmentVariableGeneratorHelper = require('../helpers/environment.variable.generator.helper'),
        path = require('path'),
        mongoose = Promise.promisifyAll(require('mongoose'));


    databaseHelper.init = function (app) {

        var dbUrl = "mongodb://" + dbConfig.development.host + ":" + dbConfig.development.port + "/" + dbConfig.development.dbName,
            defaultUserStatusController = require('../controllers/app.default.user.server.controller')();

        if (process.env.NODE_ENV === "production") {
            dbUrl = "mongodb://" + dbConfig.production.username + ":" + dbConfig.production.password + "@" + dbConfig.production.host + ":" + dbConfig.production.port + "/" + dbConfig.production.dbName;
        }

        if (process.env.NODE_ENV === "test") {
            dbUrl = "mongodb://" + dbConfig.test.host + ":" + dbConfig.test.port + "/" + dbConfig.test.dbName;
        }
        var options = {promiseLibrary: require('bluebird')};
        mongoose.Promise = require('bluebird');
        mongoose.connect(dbUrl, options);
        // mongoose.connect(dbUrl);

        var db = mongoose.connection;

        // CONNECTION EVENTS
        // When successfully connected

        db.on('connected', function () {
            // To set the default admin user at the start of application initiation
            if (process.env.NODE_ENV === "test") {
                defaultUserStatusController.getDefaultUserStatus();
            } else {
                var mongoDumpConfigFilePath = path.resolve(app.get('rootDir')) + '/lib/mongodump/mongo.restore.config.json';

                fileOperationHelper.getFileContent(mongoDumpConfigFilePath)
                    .then(function (data) {
                        var fileDataObj = JSON.parse(data);
                        if (fileDataObj) {
                            if (!fileDataObj.restored) {
                                return environmentVariableGeneratorHelper.generateAppSecretConfig(app.get('rootDir'));
                            } else {
                                throw new Promise.CancellationError('{ "statusCode":"409", "message": "Already exists"}');
                            }
                        } else {
                            throw new Promise.CancellationError('{ "statusCode":"409", "message": "Already exists"}');
                        }
                    })
                    .then(function () {
                        return restoreMongoDBHelper.restoreMongoDB(app.get('rootDir'));
                    })
                    .then(function () {
                        var jsonDataObj = {
                            "restored": true
                        };
                        return fileOperationHelper.writeFile(mongoDumpConfigFilePath, JSON.stringify(jsonDataObj, null, 4));
                    })
                    .then(function () {
                        console.log('successfull setup...');
                    })
                    .catch(Promise.CancellationError, function () {
                        // _p.customErrorResponse(res, cancellationErr, next);

                    })
                    .catch(function () {
                        defaultUserStatusController.getDefaultUserStatus();
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
