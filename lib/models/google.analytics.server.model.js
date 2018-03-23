(function () {

    'use strict';

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    var googleAnalyticsSchema = new Schema({
        trackingId: {
            type:String,
            required:true,
            trim: true
        },
        serviceAccountKeyFileName: {
            type:String,
            required:true,
            trim: true
        },
        docProperties: {
            docPath: {
                type:String,
                trim: true
            }
        },
        analyticsViewID: {
            type:String,
            required:true,
            trim: true
        },
        pollingInterval : {
            type : Number,
            default: 60000//1 min
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

    module.exports = mongoose.model('GoogleAnalytics', googleAnalyticsSchema, 'GoogleAnalytics');

})();