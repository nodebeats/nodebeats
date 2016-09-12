/**
 * Created by lakhe on 7/4/16.
 */
'use strict';

var exec = require('child_process').exec,
    path = require('path'),
    dbConfig = require('../configs/database.config'),
    Promise = require("bluebird");

   var mongoDBRestoreHelper = (function(){
        function promiseFromChildProcess(child) {
            return new Promise(function (resolve, reject) {
                child.addListener("error", reject);
                child.addListener("exit", resolve);
            });
        }

        return {
            restoreMongoDB : function(rootDir) {
                var mongoDumpPath = path.resolve(rootDir + '/lib/mongodump/prj_nodebeats.archive'),
                    restoreCommand = '';

                if(process.env.NODE_ENV === "production"){
                    restoreCommand = 'mongorestore --host ' + dbConfig.production.host + ' --port ' + dbConfig.production.port + ' --username ' + dbConfig.production.username + ' --password ' + dbConfig.production.password + ' --gzip --archive="' + mongoDumpPath + '" --db ' + dbConfig.production.dbName;
                }else{
                    restoreCommand = 'mongorestore --host ' + dbConfig.development.host + ' --port ' + dbConfig.development.port + ' --username ' + dbConfig.development.username + ' --password ' + dbConfig.development.password + '  --gzip --archive="' + mongoDumpPath +  '" --db ' + dbConfig.development.dbName;
                }
               return new Promise(function (resolve, reject) {
                   var child = exec(restoreCommand);
                   promiseFromChildProcess(child)
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

module.exports = mongoDBRestoreHelper;