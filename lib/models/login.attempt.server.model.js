(function () {

    "use strict";

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    var loginSchema = new Schema({
        userID:{
            type:String,
            required:true,
            trim: true
        },
        failedLoginAttempt:{
            type:Number,
            trim: true
        },
        ipAddress:{
            type:String,
            trim: true
        },
        browser:{
            type:String,
            trim: true
        },
        browserVersion:{
            type:String,
            trim: true
        },
        operatingSystem:{
            type:String,
            trim: true
        },
        userAgentSource:{
            type:String,
            trim: true
        },
        device:{
            type:String,
            trim: true
        },
        country:{
            type:String,
            trim: true
        },
        region:{
            type:String,
            trim: true
        },
        city:{
            type:String,
            trim: true
        },
        coordinates:{
            type:String,
            trim: true
        },
        range:{
            type:String,
            trim: true
        },
        addedOn:{
            type: Date,
            default: Date.now
        },
        expired:{
            type: Boolean,
            default: false
        },
        expiredOn:{
            type: Date
        },
        failedLogin: {
            type: Boolean,
            default: true
        }
    });

    module.exports = mongoose.model('LoginAttempt', loginSchema, 'LoginAttempt');

})();