(function (mongoDBRestoreHelper) {
    'use strict';

    var exec = require('child_process').exec,
        path = require('path'),
        dbConfig = require('../configs/database.config'),
        fileHelper = require('./file.operation.helper'),
        Promise = require("bluebird");

    function promiseFromChildProcess(child) {
        return new Promise(function (resolve, reject) {
            child.addListener("error", reject);
            child.addListener("exit", resolve);
        });
    }

    function getMongoDBRestoreCommand (_nodeEnv, rootDir) {
        var mongoDumpPath = '',
            restoreCommand = '';

        if(dbConfig.dbBackup.opt1 && dbConfig.dbBackup.opt1.active){
            mongoDumpPath = path.resolve(rootDir + '/lib/mongodump/' + dbConfig.dbBackup.opt1.name);
            var _gzipCommand = '';
            if(dbConfig.dbBackup.opt1.gzip){
                _gzipCommand = '--gzip';
            }
            //To restore archive file, restore database name should be exactly same as database name that is dumped using mongodump command.
            //can only restore to the original database name
            restoreCommand = 'mongorestore --host ' + dbConfig[_nodeEnv].host + ' --port ' + dbConfig[_nodeEnv].port + ' --username ' + dbConfig[_nodeEnv].username + ' --password ' + dbConfig[_nodeEnv].password + ' ' + _gzipCommand + ' --archive="' + mongoDumpPath + '" --db ' + dbConfig[_nodeEnv].dbName;
        }else{
            mongoDumpPath = path.resolve(rootDir + '/lib/mongodump/' + dbConfig.dbBackup.opt2.name);
            restoreCommand = 'mongorestore --host ' + dbConfig[_nodeEnv].host + ' --port ' + dbConfig[_nodeEnv].port + ' --username ' + dbConfig[_nodeEnv].username + ' --password ' + dbConfig[_nodeEnv].password  + ' --db ' + dbConfig[_nodeEnv].dbName + ' "' + mongoDumpPath + '"';
        }
        return {
            restoreCommand: restoreCommand,
            mongoDumpPath: mongoDumpPath
        };
    }

    mongoDBRestoreHelper.restoreMongoDB = function(_nodeEnv, rootDir) {

        var mongoQueryObj = getMongoDBRestoreCommand(_nodeEnv, rootDir);
        return new Promise(function (resolve, reject) {
            fileHelper.checkFileSystemAccess(mongoQueryObj.mongoDumpPath)
                .then(function () {
                    var child = exec(mongoQueryObj.restoreCommand);
                    return promiseFromChildProcess(child);
                })
                .then(function (result) {
                    resolve(result);
                })
                .catch(function (err) {
                    reject(err);
                });
        });

    };
})(module.exports);
