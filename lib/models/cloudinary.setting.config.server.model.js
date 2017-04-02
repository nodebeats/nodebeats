(function () {

    'use strict';

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    var cloudinarySettingSchema = new Schema({
        cloudinaryCloudName:{
            type:String,
            required:true,
            trim: true
        },
        cloudinaryApiKey:{
            type:String,
            required:true,
            trim: true
        },
        cloudinaryApiSecret:{
            type:String,
            required:true,
            trim: true
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

    module.exports = mongoose.model('CloudinarySetting', cloudinarySettingSchema, 'CloudinarySetting');

})();