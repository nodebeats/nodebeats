(function () {

    'use strict';

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    var textEditorFileSchema = new Schema({
        module: {
            type: String,
            required: true,
            lowerCase: true
        },
        localPath: {
            type: String,
            required: true,
            lowerCase: true
        },
        p: {
            /*path*/
            type: String,
            required: true,
            lowercase: true
        },
        s: {
            /*size*/
            type: Number,
            required: true
        },
        /*timestamp*/
        t: {
            type: Date,
            default: Date.now
        },
        /*width*/
        w: {
            type: Number,
            required: true
        },
        /*height*/
        h: {
            type: Number,
            required: true
        },
        addedBy: {
            type: String,
            required: true
        },
        addedOn: {
            type: Date,
            default: Date.now
        }
    });

    module.exports = mongoose.model('TextEditorFile', textEditorFileSchema, 'TextEditorFile');

})();