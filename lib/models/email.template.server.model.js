(function () {

    'use strict';

    var mongoose = require('mongoose'),
        regex = require('./regex.server.model'),
        Schema = mongoose.Schema;

    var emailTemplateSchema = new Schema({
        templateName : {
            type : String,
            required:true,
            trim: true
        },
        emailSubject : {
            type:String,
            required:true,
            trim: true
        },
        emailFrom : {
            type:String,
            required:true,
            trim: true,
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
        templateBody : {
            type:String,
            required:true,
            trim: true
        },
        attachmentAvailabilityStatus:{
            type: Boolean,
            default: false
        },
        active : {
            type: Boolean,
            default: true
        },
        addedBy : {
            type:String,
            trim: true
        },
        addedOn : {
            type: Date,
            default: Date.now
        },
        updatedBy : {
            type:String,
            trim: true
        },
        updatedOn : {
            type: Date
        },
        deleted:{
            type: Boolean,
            default: false
        },
        deletedBy : {
            type:String,
            trim: true
        },
        deletedOn : {
            type: Date
        }
    });

    module.exports = mongoose.model('EmailTemplate', emailTemplateSchema, 'EmailTemplate');

})();