(function () {

    'use strict';

    var mongoose = require('mongoose'),
        regex = require('./regex.server.model'),
        Schema = mongoose.Schema;

    var organizationInfoSchema = new Schema({
        orgName: {
            type: String,
            required: true,
            trim: true
        },
        country:{
            type:String,
            required:true,
            trim: true
        },
        region:{
            type:String,
            trim: true
        },
        state:{
            type:String,
            trim: true
        },
        city:{
            type:String,
            required:true,
            trim: true
        },
        streetAddress:{
            type:String,
            required:true,
            trim: true
        },
        zipAddress:{
            type:String,
            trim: true
        },
        postalCode:{
            type:String,
            trim: true
        },
        addressLine:{
            type:String,
            trim: true
        },
        organizationEmail:{
            type:String,
            required:true,
            trim: true,
            unique: true,
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
        phoneNumber:{
            type:String,
            trim: true
        },
        mobileNumber:{
            type:String,
            trim: true
        },
        faxNumber:{
            type:String,
            trim: true
        },
        facebookURL:{
            type:String,
            trim: true
        },
        twitterURL:{
            type:String,
            trim: true
        },
        googlePlusURL:{
            type:String,
            trim: true
        },
        linkedInURL:{
            type:String,
            trim: true
        },
        youtubeURL:{
            type:String,
            trim: true
        },
        instagramURL:{
            type:String,
            trim: true
        },
        slogan : {
            type:String,
            trim: true
        },
        logoImageName:{
            type:String,
            trim: true
        },
        imageProperties: {
            imageExtension:{
                type:String,
                trim: true
            },
            imagePath: {
                type:String,
                trim: true
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

    module.exports = mongoose.model('OrganizationInformation', organizationInfoSchema, 'OrganizationInformation');

})();