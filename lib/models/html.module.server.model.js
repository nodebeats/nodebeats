(function () {

    'use strict';

    var mongoose = require('mongoose'),
        Schema=mongoose.Schema;

    var htmlContentSchema=new Schema({
        htmlContentTitle:{
            type:String,
            required:true,
            trim: true
        },
        htmlModuleContent:{
            type:String,
            required:true,
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

    module.exports = mongoose.model('HtmlModuleContent',htmlContentSchema,'HtmlModuleContent');

})();