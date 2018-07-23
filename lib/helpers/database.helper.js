(function (databaseHelper) {

    'use strict';

    var Promise = require("bluebird"),
        dbConfig = require('../configs/database.config'),
        HTTPStatus = require('http-status'),
        fileOperationHelper = require('./file.operation.helper'),
        restoreMongoDBHelper = require('./mongodb.restore.helper'),
        errorHelper = require('./error.helper'),
        messageConfig = require('../configs/api.message.config'),
        environmentVariableGeneratorHelper = require('./environment.variable.generator.helper'),
        path = require('path'),
        mongoose = Promise.promisifyAll(require('mongoose'));


    databaseHelper.init = function (app) {

        var dbUrl = '',
            defaultUserStatusController = require('../controllers/app.default.user.server.controller');

        if (app.get('env') === "development") {
            if (dbConfig.development.username === '' && dbConfig.development.password === '') {
                dbUrl = "mongodb://" + dbConfig.development.host + ":" + dbConfig.development.port + "/" + dbConfig.development.dbName;
            }
            else {
                dbUrl = "mongodb://" + dbConfig.development.username + ":" + dbConfig.development.password + "@" + dbConfig.development.host + ":" + dbConfig.development.port + "/" + dbConfig.development.dbName;
            }
        }
        else if (app.get('env') === "production") {
            if (dbConfig.production.username === '' && dbConfig.production.password === '') {
                dbUrl = "mongodb://" + dbConfig.production.host + ":" + dbConfig.production.port + "/" + dbConfig.production.dbName;                
            }
            else {
                dbUrl = "mongodb://" + dbConfig.production.username + ":" + dbConfig.production.password + "@" + dbConfig.production.host + ":" + dbConfig.production.port + "/" + dbConfig.production.dbName;
            }
        } else if (app.get('env') === "test") {
            dbUrl = "mongodb://" + dbConfig.test.username + ":" + dbConfig.test.password + "@" + dbConfig.test.host + ":" + dbConfig.test.port + "/" + dbConfig.test.dbName;
        }
        var options = {promiseLibrary: require('bluebird')};
        mongoose.Promise = require('bluebird');
        mongoose.connect(dbUrl, options);

        var db = mongoose.connection;
        // CONNECTION EVENTS
        // When successfully connected

        db.on('connected', function () {
            // To set the default admin user at the start of application initiation
            if (app.get('env') === "test") {
                defaultUserStatusController.getDefaultUserStatus()
                    .then(function () {
                        console.log('successfull setup');
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            } else {
                var mongoDumpPath = path.resolve(app.get('rootDir')) + '/lib/mongodump/mongo.restore.config.json';

                fileOperationHelper.checkFileSystemAccess(mongoDumpPath)
                    .then(function () {
                        return fileOperationHelper.getFileContent(mongoDumpPath);
                    })
                    .then(function (data) {
                        var fileDataObj = JSON.parse(data);
                        if (fileDataObj) {
                            if (!fileDataObj.restored) {
                                return environmentVariableGeneratorHelper.generateAppSecretConfig(app.get('rootDir'));
                            } else {
                                throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.CONFLICT + '", "message": "' + messageConfig.applicationMessage.alreadyExists + '"}');
                            }
                        } else {
                            throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.NO_CONTENT + '", "message": "' + messageConfig.applicationMessage.noContent + '"}');
                        }
                    })
                    // .then(function () {
                    //     return restoreMongoDBHelper.restoreMongoDB(app.get('env'), app.get('rootDir'));
                    // })
                    .then(function (restoreResult) {
                        // if(restoreResult === 0){
                            var jsonDataObj = {
                                "restored": true
                            };
                            return fileOperationHelper.writeFile(mongoDumpPath, JSON.stringify(jsonDataObj, null, 4));
                        // }else{
                        //     throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.NOT_IMPLEMENTED + '", "message": "' + messageConfig.applicationMessage.dbRestoreFail + '"}');
                        // }
                    })
                    .then(function () {
                        console.log('successfull setup...');
                    })
                    .catch(Promise.CancellationError, function (cancellationErr) {
                        var obj = errorHelper.formatErrorObj(cancellationErr);
                        if(obj.statusCode == HTTPStatus.NOT_IMPLEMENTED){
                            console.log(messageConfig.applicationMessage.dbRestoreFail);
                        }
                    })
                    .catch(function () {
                        console.log(messageConfig.applicationMessage.dbRestoreError)
                        // defaultUserStatusController.getDefaultUserStatus();
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
