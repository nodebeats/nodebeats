(function () {

    'use strict';

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    var apiAccessManagementSchema = new Schema({
        routeApi: {
            type:String,
            required: true,
            lowercase: true,
            trim: true
        },
        roleName: {
            type:String,
            required: true,
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

    module.exports = mongoose.model('ApiAccessManager', apiAccessManagementSchema, 'ApiAccessManager');

})();