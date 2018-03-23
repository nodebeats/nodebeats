(function () {

    'use strict';

    var  mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    var userUnblockTokenSchema = new Schema({
        userID:{
            type:String,
            required:true,
            trim: true
        },
        token:{
            type:String,
            trim: true
        },
        addedOn:{
            type: Date,
            default: Date.now
        },
        expires:{
            type: Date
        },
        unblocked:{
            type:Boolean,
            default:false
        }
    });

    module.exports = mongoose.model('UserUnBlockTokens', userUnblockTokenSchema, 'UserUnBlockTokens');

})();