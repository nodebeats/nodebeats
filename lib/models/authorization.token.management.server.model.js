(function () {

    'use strict';

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    var authorizationTokenInfoSchema = new Schema({
        authorizationToken: {
            type:String,
            required:true,
            trim: true
        },
        userAgent: {
            type:String,
            required:true,
            trim: true
        },
        browser: {
            type:String,
            required:true,
            trim: true
        },
        ipAddress: {
            type:String,
            required:true,
            trim: true
        },
        expiresOn: {
            type:Date,
            required:true,
            default: Date.now
        },
        userId: {
            type:String,
            required:true,
            trim: true
        },
        addedOn: {
            type: Date,
            default: Date.now
        }
    });

    module.exports = mongoose.model('AuthorizationToken', authorizationTokenInfoSchema, 'AuthorizationToken');

})();