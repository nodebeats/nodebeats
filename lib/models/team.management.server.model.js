(function () {

    'use strict';

    var mongoose = require('mongoose'),
        regex = require('./regex.server.model'),
        Schema = mongoose.Schema;

    var teamManagementSchema = new Schema({
        teamMemberName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            trim: true,
            required: true,
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
        phoneNumber: {
            type: String,
            trim: true
        },
        facebookURL: {
            type: String,
            trim: true
        },
        twitterURL: {
            type: String,
            trim: true
        },
        googlePlusURL: {
            type: String,
            trim: true
        },
        linkedInURL: {
            type: String,
            trim: true
        },
        address: {
            type: String,
            trim:true
        },
        designation: {
            type: String,
            required:true,
            trim:true
        },
        description: {
            type: String,
            trim:true
        },
        hierarchyOrder : {
            type: Number,
            trim: true
        },
        imageName: {
            type: String,
            trim: true
        },
        imageProperties: {
            imageExtension: {
                type: String,
                trim: true
            },
            imagePath: {
                type:String,
                trim: true
            }
        },
        active: {
            type: Boolean,
            default:true
        },
        addedBy: {
            type: String,
            trim: true
        },
        addedOn: {
            type: Date,
            default: Date.now
        },
        updatedBy: {
            type: String,
            trim: true
        },
        updatedOn: {
            type: Date
        },
        deleted: {
            type: Boolean,
            default: false
        },
        deletedBy: {
            type: String,
            trim: true
        },
        deletedOn: {
            type: Date
        }
    });

    module.exports = mongoose.model('TeamMember', teamManagementSchema, 'TeamMember');

})();