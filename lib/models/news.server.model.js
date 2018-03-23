(function () {

    'use strict';

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    var newsCategorySchema = new Schema({
        categoryName: {
            type:String,
            trim: true,
            required: true
        },
        categoryDescription: {
            type:String,
            trim: true
        },
        urlSlogCategory : {
            type:String,
            trim: true
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

    var newsSchema = new Schema({
        newsTitle: {
            type: String,
            required: true,
            trim: true
        },
        urlSlog: {
            type: String,
            trim: true
        },
        categoryID: {
            type: String,
            trim: true,
            required: true
        },
        newsSummary: {
            type: String,
            trim: true
        },
        newsDescription: {
            type: String,
            required: true,
            trim: true
        },
        newsAuthor: {
            type: String,
            trim: true
        },
        newsDate: {
            type: Date,
            trim: true,
            required: true,
            default: Date.now
        },
        image:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'NewsImage'
        }],
        pageViews: {
            type: Number,
            default: 0,
            trim: true
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


    module.exports = {
        NewsCategory : mongoose.model('NewsCategory', newsCategorySchema, 'NewsCategory'),
        NewsImage : mongoose.model('NewsImage', imageSchema, 'NewsImage'),
        News : mongoose.model('News', newsSchema, 'News')
    };

})();