(function () {

    'use strict';

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        status = ['active', 'outdated'];

    var blogCategorySchema = new Schema({
        categoryName: {
            type:String,
            trim: true,
            required: true
        },
        urlSlogCategory: {
            type: String,
            trim: true
        },
        categoryDescription: {
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

    var blogDocumentSchema = new Schema({
        documentName : {
            type : String,
            trim: true
        },
        docProperties: {
            documentMimeType: {
                type:String,
                trim: true
            },
            docPath: {
                type:String,
                trim: true
            }
        },
        documentTitle : {
            type : String,
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

    var blogSchema = new Schema({
        blogTitle : {
            type : String,
            required:true,
            trim: true
        },
        urlSlog: {
            type: String,
            trim: true
        },
        categoryId : {
            type:String,
            trim: true
        },
        blogSummary : {
            type:String,
            trim: true
        },
        blogDescription : {
            type:String,
            required:true,
            trim: true
        },
        tags : [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'BlogTag'
        }],
        bannerImage: {
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
        bannerImageTitle: {
            type:String,
            trim: true
        },
        bannerImageAltText: {
            type:String,
            trim: true
        },
        status:{
            type:String,
            trim: true,
            enum: status,
            default: status[0]
        },
        author: {
            type:String,
            required:true,
            trim: true
        },
        blogComment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'BlogComment'
        },
        seoEntry : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'BlogMetaTag'
        },
        active : {
            type: Boolean,
            default: true
        },
        allowComment: {
            type: Boolean,
            default: false
        },
        articleViews: {
            type:Number,
            default: 0
        },
        relatedFiles : [blogDocumentSchema],
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

    var tagSchema = new Schema({
        tag: {
            type:String,
            trim: true
        },
        urlSlogTag: {
            type: String,
            trim: true
        },
        postCount : {
            type: Number,
            trim: true,
            default : 1
        }
    });

    var commentSchema = new Schema({
        comment : {
            type : String,
            required:true,
            trim: true
        },
        likes : {
            type:Number,
            default: 0
        },
        dislikes : {
            type:Number,
            default: 0
        },
        addedOn : {
            type: Date,
            default: Date.now
        },
        active :{
            type: Boolean,
            default: true
        },
        inReplyTo:{
            type : String,
            trim: true
        }
    });

    var blogMetaTagSchema = new Schema({
        metaKeyword : {
            type : String,
            trim: true
        },
        titleTag : {
            type : String,
            trim: true,
            max: 70
        },
        metaDescription : {
            type : String,
            trim: true,
            max: 160

        },
        metaAuthor : {
            type : String,
            trim: true
        },
        valueChanged : {
            type: Boolean,
            default: false
        }
    });


    module.exports = {
        BlogCategory : mongoose.model('BlogCategory', blogCategorySchema, 'BlogCategory'),
        BlogTag : mongoose.model('BlogTag', tagSchema, 'BlogTag'),
        Blog : mongoose.model('Blog', blogSchema, 'Blog'),
        BlogComment : mongoose.model('BlogComment', commentSchema, 'BlogComment'),
        BlogMetaTag : mongoose.model('BlogMetaTag', blogMetaTagSchema, 'BlogMetaTag'),
        BlogDocument : mongoose.model('BlogDocument', blogDocumentSchema, 'BlogDocument')
    };

})();