(function () {

    'use strict';

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        utilityHelper = require('../helpers/utilities.helper');

    var ipBlockSchema = new Schema({
        ipAddress: {
            type: String,
            trim: true
        },
        blockedUpto: {
            type: Date,
            default: utilityHelper.setMinuteFromNow(15)
            //add 15 minutes to current date
        },
        addedOn: {
            type: Date,
            default: Date.now
        }
    });

    module.exports = mongoose.model('IPBlocker', ipBlockSchema, 'IPBlocker');

})();