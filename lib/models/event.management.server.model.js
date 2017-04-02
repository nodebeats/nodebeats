(function () {

    'use strict';
    
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    var eventManagerSchema = new Schema({
        eventTitle: {
            type:String,
            required:true,
            trim: true
        },
        urlSlog: {
            type: String,
            trim: true
        },
        eventDescription: {
            type:String,
            required:true,
            trim: true
        },
        venue: {
            type:String,
            required:true,
            trim: true
        },
        venueAddress: {
            type:String,
            required:true,
            trim: true
        },
        startDate: {
            type: Date,
            required:true,
            default: Date.now
        },
        endDate: {
            type: Date,
            default: Date.now
        },
        imageName: {
            type:String,
            trim: true
        },
        imageTitle: {
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

    module.exports = mongoose.model('EventManager', eventManagerSchema, 'EventManager');

})();