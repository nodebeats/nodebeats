(function () {

    'use strict';

    var mongoose = require('mongoose'),
        emailServiceProvider = ['normal', 'mailgun', 'postmark', 'mandrill', 'sendgrid', 'amazon'],
        regex = require('./regex.server.model'),
        Schema = mongoose.Schema;

    var mailServiceSchema = new Schema({
        serviceProviderType: {
            type: String,
            required: true,
            trim: true,
            enum: emailServiceProvider
        },
        host: {
            type: String,
            trim: true,
            lowercase: true,
            validate: {
                validator: function(hostName) {
                    if(hostName){
                        return regex.validHostNameRegex.test(hostName);

                    }else{
                        return true;
                    }
                },
                message: '{VALUE} is not a valid host name!'
            }
        },
        port:{
            type:Number,
            trim: true,
            validate: {
                validator: function(portNumber) {
                    if(portNumber){
                        return regex.validPortNumber.test(portNumber);
                    }else{
                        return true;
                    }
                },
                message: '{VALUE} is not a valid SMTP port number!'
            }
        },
        secure:{
            type:Boolean,
            default:true
        },
        authUserName:{
            type:String,
            trim: true,
            unique: true,
            lowercase: true
        },
        authPassword:{
            type:String,
            trim: true
        },
        pool:{
            type:Boolean,
            default:false
        },
        api_Key:{
            type:String,
            trim: true

        },
        api_Secret:{
            type:String,
            trim: true
        },
        api_User:{
            type:String,
            trim: true
        },
        domain:{
            type:String,
            trim: true
        },
        rateLimit:{
            type:Number,
            trim: true,
            default: 1,
            validate: {
                validator: function(rateLimitVal) {
                    if(rateLimitVal){
                        return regex.validInteger.test(rateLimitVal);
                    }else{
                        return true;
                    }
                },
                message: '{VALUE} is not a valid rate limit!'
            }
        },
        addedBy:{
            type:String,
            trim: true
        },
        addedOn:{
            type: Date,
            default: Date.now
        },
        updatedBy:{
            type:String,
            trim: true
        },
        updatedOn:{
            type: Date
        }
    });

    module.exports = mongoose.model('MailService', mailServiceSchema, 'MailService');

})();