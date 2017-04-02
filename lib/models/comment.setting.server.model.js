(function () {

    'use strict';

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema;


    var commentSettingSchema = new Schema({
        disqusUsername: {
            type: String,
            trim: true
        },
        disqusURL: {
            type: String,
            trim: true,
            required:true
        },
        disqusApiKey: {
            type: String,
            trim: true
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
        }
    });

    module.exports = mongoose.model('CommentSetting', commentSettingSchema, 'CommentSetting');

})();