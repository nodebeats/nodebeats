(function () {

    'use strict';

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    var errorLogSchema = new Schema({
        errorMessage:{
            type: String,
            trim: true
        },
        errorStack:{
            type:String,
            trim: true
        },
        errorType:{
            type:String,
            trim: true
        },
        errorNotified : {
            type: Boolean,
            default: false
        },
        errorNotifiedDate : {
            type: Date
        },
        addedBy: {
            type:String,
            trim: true
        },
        addedOn: {
            type: Date,
            default: Date.now
        }
    });

    module.exports = mongoose.model('ErrorLog', errorLogSchema, 'ErrorLog');

})();