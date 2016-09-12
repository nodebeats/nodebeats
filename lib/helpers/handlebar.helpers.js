(function (handlebarHelpers) {

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
    handlebarHelpers.cloudinaryUrl = function (imageName, options) {
        var cloudinary = require('cloudinary');
        var option = JSON.parse(options.hash.option);
        return cloudinary.url(imageName, option);
    }

    handlebarHelpers.copyRightYear = function () {
        return new Date().getFullYear();
    };
})(module.exports);