(function () {

    "use strict";

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    var appDefaultUserStatusSchema = new Schema({
        status : {
            type:Boolean,
            default:false
        },
        addedOn : {
            type: Date,
            default: Date.now
        }
    });

    module.exports = mongoose.model('DefaultUserStatus', appDefaultUserStatusSchema, 'DefaultUserStatus');

})();