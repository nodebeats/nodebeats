(function () {

    'use strict';

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    var passwordChangeVerifyTokenSchema = new Schema({
        userID : {
            type:String,
            required:true,
            trim: true
        },
        token : {
            type:String,
            trim: true
        },
        validUpto : {
            type: Date
        },
        expired:{
            type:Boolean,
            default:false
        },
        addedOn : {
            type: Date,
            default : Date.now
        }
    });

    module.exports = mongoose.model('PasswordChangeVerifyToken', passwordChangeVerifyTokenSchema, 'PasswordChangeVerifyToken');

})();