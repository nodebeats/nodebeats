(function () {

    'use strict';

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    var roleManagementSchema = new Schema({
        roleName: {
            type:String,
            required: true,
            lowercase: true,
            trim: true
        },
        read: {
            type:Boolean,
            default:true
        },
        write: {
            type:Boolean,
            default:false
        },
        create: {
            type:Boolean,
            default:false
        },
        delete: {
            type:Boolean,
            default:false
        },
        change: {
            type:Boolean,
            default:false
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

    module.exports = mongoose.model('RoleManager', roleManagementSchema, 'RoleManager');

})();