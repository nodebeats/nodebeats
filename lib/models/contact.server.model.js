(function () {

    'use strict';

    var mongoose = require('mongoose'),
        regex = require('./regex.server.model'),
        Schema = mongoose.Schema,
        informationSource = ['google', 'friends', 'newspaper', 'socialSites', 'television', 'none'];

    var contactInfoSchema=new Schema({
        fullName: {
            type:String,
            required:true,
            trim: true
        },
        email: {
            type:String,
            required:true,
            trim: true,
            lowercase: true,
            validate: {
                validator: function(email) {
                    if(email){
                        return regex.emailRegex.test(email);
                    }else{
                        return true;
                    }
                },
                message: '{VALUE} is not a valid email address!'
            }
        },
        contactNumber: {
            type:String,
            trim: true
        },
        organizationName: {
            type:String,
            trim: true
        },
        informationSource: {
            type:String,
            trim: true,
            enum:informationSource,
            default: 'none'
        },
        message: {
            type:String,
            required:true,
            trim: true
        },
        addedOn: {
            type: Date,
            default: Date.now
        },
        deleted: {
            type: Boolean,
            default: false
        },
        deletedBy: {
            type:String,
            trim: true
        },
        deletedOn: {
            type: Date
        }
    });

    module.exports = mongoose.model('Contact', contactInfoSchema, 'Contact');

})();