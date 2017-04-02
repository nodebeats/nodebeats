(function () {

    'use strict';

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        utilityHelper = require('../helpers/utilities.helper');

    var loginParallelCheckSchema = new Schema({
        ipAddress: {
            type: String,
            trim: true
        },
        username : {
            type: String,
            trim: true
        },
        expiryDate : {
            type: Date,
            //By default even if server crashes, next time when the system checks for parallel login,
            // this record will be valid only for 5 minutes.
            // i.e. this record if somehow is not deleted during login process,
            // loginParallelCheck will return true only for 5 minutes from the time of login
            default : utilityHelper.setMinuteFromNow(5)
        },
        addedOn: {
            type: Date,
            default: Date.now
        }
    });

    module.exports = mongoose.model('LoginParallelCheck', loginParallelCheckSchema, 'LoginParallelCheck');

})();