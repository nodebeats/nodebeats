(function () {

    'use strict';

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    var imageSchema = new Schema({
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
        imageDescription: {
            type:String,
            trim: true
        },
        coverImage: {
            type:Boolean,
            default:false
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
        }
    });

    var imageGallerySchema = new Schema({
        albumName: {
            type:String,
            required:true,
            trim: true
        },
        urlSlog: {
            type: String,
            trim: true
        },
        albumDescription: {
            type:String,
            trim: true
        },
        image:[ imageSchema ],
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
    
    module.exports = {
        ImageGallery : mongoose.model('ImageGallery', imageGallerySchema, 'ImageGallery'),
        Image : mongoose.model('Image', imageSchema, 'Image')
    };

})();