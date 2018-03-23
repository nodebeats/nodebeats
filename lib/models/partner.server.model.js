(function () {

    'use strict';

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    var partnerSchema = new Schema({
        partnerName: {
            type:String,
            required: true,
            trim: true
        },
        linkURL :{
            type:String,
            required: true,
            trim: true,
            lowercase: true
        },
        imageName: {
            type:String,
            trim: true
        },
        imageAltText: {
            type:String,
            trim: true
        },
        imageProperties: {
            imageExtension: {
                type:String,
                trim: true
            },
            imagePath: {
                type:String,
                trim: true
            }
        },
        active: {
            type:Boolean,
            default:true
        },
        addedBy: {
            type:String,
            trim: true
        },
        addedOn: {
            type: Date,
            default: Date.now
        },
        updatedBy: {
            type:String,
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
            type:String,
            trim: true
        },
        deletedOn: {
            type: Date
        }
    });

    module.exports = mongoose.model('Partner', partnerSchema, 'Partner');

})();