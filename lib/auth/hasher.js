(function (hashOperator) {

    'use strict';

    var crypto = require('crypto'),
        bcrypt = require('bcrypt'),
        hasherConfig = require('../configs/hasher.config'),
        Promise = require("bluebird");

    hashOperator.computeHash = function (req, res, sourcePassword, salt) {

        // Create and return a promise object using the 'new' keyword -> this is special to Bluebird's implementation
        return new Promise(function (resolve, reject) {
            bcrypt.hash(sourcePassword, salt, function (err, hash) {
                if (err){
                    reject(err);
                } else{
                    resolve(hash);
                }
            });
        });
    };

    hashOperator.createSalt = function () {
        return new Promise(function (resolve, reject) {
            bcrypt.genSalt(hasherConfig.saltRounds, function (err, salt) {
                if(!err){
                    resolve(salt);
                }else{
                    reject(err);
                }

            });
        });
    };

    hashOperator.comparePassword = function (inputPwd, hash) {
        return new Promise(function (resolve, reject) {
            bcrypt.compare(inputPwd, hash, function (err, isMatch) {
                if(err) {
                    reject(err);
                }
                else{
                    resolve(isMatch);
                }
            });
        });
    };


    hashOperator.generateRandomBytes=function (length) {
        return new Promise(function (resolve, reject) {
            crypto.randomBytes(length, function (err, saltBuffer){
                if (err){
                    reject(err);
                } else{
                    resolve(saltBuffer.toString('hex').substring(0,length));
                }
            });
        });
    };

})( module.exports);