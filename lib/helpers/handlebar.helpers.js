(function (handlebarHelpers) {

    'use strict';

    handlebarHelpers.titleLimit = function (title) {
        if (title.length > 55)
            return title.substring(0, 55);
        else return title;
    };

    handlebarHelpers.summaryLimit = function (word) {
        if (word.length > 98)
            return word.substring(0, 98);
        else return word;
    };

    handlebarHelpers.longSummaryLimit = function (word) {
        if (word.length > 150)
            return word.substring(0, 150);
        else return word;
    };

    handlebarHelpers.loopFromSecond = function (data, options) {
        var loopData = "";
        for (var i = 1; i < data.length; i++) {
            loopData += options.fn(data[i]);
        }
        return loopData;
    };

    handlebarHelpers.date = function (date) {
        return date.toLocaleDateString();
    };

    handlebarHelpers.meta = function (name, options) {
        if (!this._meta) this._meta = {};
        this._meta[name] = options.fn(this);
        return null;
    };

    handlebarHelpers.pagetitle = function (name, options) {
        if (!this._pagetitle) this._pagetitle = {};
        this._pagetitle[name] = options.fn(this);
        return null;
    };

    handlebarHelpers.lowerCase = function (data) {
        return data.toLowerCase();
    };

    handlebarHelpers.beforeSpace = function (data) {
        return data.split(" ")[0];
    };

    handlebarHelpers.afterSpace = function (data) {
        return data.split(" ")[1];
    };
    handlebarHelpers.checkData = function (data, options) {
        if (typeof data !== "undefined" && Array.isArray(data))
            return options.fn(this);
        else
            return options.inverse(this);
    };
    handlebarHelpers.checkAndBindList = function (data, options) {
        var fn = options.fn, inverse = options.inverse;
        var ret = "";
        if (typeof data !== "undefined" && Array.isArray(data)) {
            for (var i = 0, j = data.length; i < j; i++) {
                ret = ret + fn(data[i]);
            }
        }
        else {
            ret = inverse(this);
        }
        return ret;

    };
    handlebarHelpers.cloudinaryUrl = function (imageName, options) {
        var cloudinary = require('cloudinary');
        var option = JSON.parse(options.hash.option);
        return cloudinary.url(imageName, option);
    };

    handlebarHelpers.copyRightYear = function () {
        return new Date().getFullYear();
    };

})(module.exports);