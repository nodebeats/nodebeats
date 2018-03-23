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

    handlebarHelpers.makeFirstCharacterUpperCase = function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    handlebarHelpers.formatHeaderUrl = function (string) {
        var formattedUrl = string.substr(1).replace('-',' ');
        return formattedUrl.charAt(0).toUpperCase() + formattedUrl.slice(1).split('?')[0];
    };

    handlebarHelpers.date = function (date) {
        return date.toLocaleDateString();
    };

    handlebarHelpers.dateFormatter = function (date, format) {
        return date.getFullYear() + format + (date.getMonth() + 1) + format + date.getDate();
    };

    handlebarHelpers.justDate = function (date) {
        return new Date(date).getDate();
    };

    handlebarHelpers.trimString = function(passedString, checkChar) {
        if (passedString.charAt(passedString.length - 1) == checkChar) {
            passedString = passedString.substr(0, passedString.length - 1);
        }
        return passedString;
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
        if (typeof data !== "undefined" && (Array.isArray(data) && data.length > 0))
            return options.fn(this);
        else
            return options.inverse(this);
    };
    handlebarHelpers.checkAndBindList = function (data, options) {
        var fn = options.fn, inverse = options.inverse;
        var ret = "";
        var context = 0;
        if (data !== "null" && typeof data !== "undefined" && (Array.isArray(data)) && data.length > 0) {
            for (var i = 0, j = data.length; i < j; i++) {
                context = Object.create(data[i]);
                context.index = i;
                ret = ret + fn(context);
            }
        }
        else {
            ret = inverse(this);
        }
        return ret;
    };

    handlebarHelpers.checkValueExists = function (data, options) {
        if (typeof data !== 'undefined' && Array.isArray(data) && data.length > 0) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    };

    handlebarHelpers.indexIncrement = function (index) {
        return index + 1;
    };

    handlebarHelpers.cloudinaryUrl = function (imageName, options) {
        var cloudinary = require('cloudinary');
        var option = JSON.parse(options.hash.option);
        return cloudinary.url(imageName, option);
    };

    handlebarHelpers.copyRightYear = function () {
        return new Date().getFullYear();
    };
    handlebarHelpers.justDate = function (date) {
        return new Date(date).getDate();
    };
    handlebarHelpers.justMonth = function (date) {
        var monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        return monthShortNames[new Date(date).getMonth()];

        //return new Date(date).toLocaleDateString("en-US", {month: "short"});
    };
    handlebarHelpers.justYear = function (date) {
        return new Date(date).getFullYear();
    };
    handlebarHelpers.justDay = function (date) {
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return days[new Date(date).getDay()];
    };
    handlebarHelpers.justTime = function (date) {
        return ampm(date);
        // return new Date(date).toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true});
    };
    var paginate = require('handlebars-paginate');
    handlebarHelpers.paginate = paginate;

    var ampm = function (date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;

    }

})(module.exports);