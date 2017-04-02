(function () {

    'use strict';
    
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    var userRegistrationConfirmationTokenSchema = new Schema({
        userID : {
            type:String,
            required:true,
            trim: true
        },
        token : {
            type:String,
            trim: true
        },
        addedOn : {
            type: Date,
            default : Date.now
        },
        expires : {
            type: Date
        },
        confirmed:{
            type:Boolean,
            default:false
        }
    });

    module.exports = mongoose.model('UserRegistrationConfirmToken', userRegistrationConfirmationTokenSchema, 'UserRegistrationConfirmToken');

})();