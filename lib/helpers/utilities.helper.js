(function (utilityHelper) {

    'use strict';

    var sanitizeHtml = require('sanitize-html'),
        cleanURL = require('limax'),
        path = require('path');

    utilityHelper.getFileInfo = function (req, fileDataObj, next) {
        try {

            var isImageDeleted = false;
            if (req.query) {
                isImageDeleted = req.query.imagedeleted;
            }
            var fileInfo = {
                _imageName: '',
                _imageExtension: '',
                _imagePath: ''
            };
            if (req.file) {
                fileInfo._imageName = path.basename(req.file.path);
                fileInfo._imageExtension = req.file.filename.substr(req.file.filename.lastIndexOf('.') + 1);
                fileInfo._imagePath = req.file.path;
            } else {
                if (isImageDeleted === "true") {
                    fileInfo._imageName = "";
                    fileInfo._imageExtension = "";
                    fileInfo._imagePath = "";
                } else {
                    if (fileDataObj) {
                        fileInfo._imageName = fileDataObj.imageName;
                        fileInfo._imageExtension = fileDataObj.imageProperties.imageExtension;
                        fileInfo._imagePath = fileDataObj.imageProperties.imagePath;
                    }
                }
            }
            return fileInfo;
        }
        catch (err) {
            // return  next(err);
        }
    };

    utilityHelper.getDocumentFileInfo = function (req, docInfo, next) {
        try {

            var fileInfo = {
                _documentName: '',
                _documentMimeType: '',
                _documentPath: ''
            };
            var isDocumentDeleted = false;
            if (req.query) {
                isDocumentDeleted = req.query.deleted;
            }

            if (req.file) {
                fileInfo._documentName = req.file.filename;
                fileInfo._documentMimeType = req.file.mimetype;
                fileInfo._documentPath = req.file.path;
            } else {
                if (isDocumentDeleted === "true") {
                    fileInfo._documentName = "";
                    fileInfo._documentMimeType = "";
                    fileInfo._documentPath = "";
                } else {
                    if (docInfo) {
                        fileInfo._documentName = docInfo.documentName;
                        fileInfo._documentMimeType = docInfo.docProperties.documentMimeType;
                        fileInfo._documentPath = docInfo.docProperties.docPath;
                    }
                }
            }
            return fileInfo;
        }
        catch (err) {
            // return  next(err);
        }
    };

    utilityHelper.sanitizeUserInput = function (req, next) {
        try {
            var modelInfo = {};

            for (var i = 0, keys = Object.keys(req.body); i < keys.length; i++) {
                modelInfo[keys[i]] = sanitizeHtml(req.body[keys[i]]);
            }
            return modelInfo;
        }
        catch (err) {
            // return  next(err);
        }
    };

    utilityHelper.containsChar = function (stringVal, key, next) {
        try {
            var contains = false;
            if (stringVal.indexOf(key) > -1) {
                contains = true;
            }
            return contains;
        }
        catch (err) {
            // return  next(err);
        }
    };

    utilityHelper.containsElementInArr = function (array, key, next) {
        try {
            var contains = false;
            for (var i = 0; i < array.length; i++) {
                if (array[i].trim() === key.trim()) {
                    contains = true;
                }
            }
            return contains;
        }
        catch (err) {
            // return  next(err);
        }
    };

    utilityHelper.containsElementInArrayOfObjects = function (array, key, next) {
        try {
            var contains = false;
            for (var i = 0; i < array.length; i++) {
                if (array[i].tag.trim() === key.trim()) {
                    contains = true;
                }
            }
            return contains;
        }
        catch (err) {
            // return  next(err);
        }
    };

    utilityHelper.trimWhiteSpaces = function (str, next) {
        try {
            return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        }
        catch (err) {
            // return  next(err);
        }
    };

    utilityHelper.getIndexOfObject = function (array, attr, value, next) {
        try {
            for (var i = 0; i < array.length; i += 1) {
                if (array[i][attr] === value) {
                    return i;
                }
            }
        }
        catch (err) {
            // return  next(err);
        }
    };

    utilityHelper.removeElementFromArr = function (array, value, next) {
        try {
            var index = array.indexOf(value);
            if (index > -1) {
                array.splice(index, 1);
            }
            return array;
        }
        catch (err) {
            // return  next(err);
        }
    };

    utilityHelper.getCleanURL = function (jobTitle, next) {
        try {
            return cleanURL(jobTitle);
        }
        catch (err) {
            // return  next(err);
        }
    };

    utilityHelper.getFormattedDate = function (date, format, next) {
        try {

            var formattedDate = date;
            var year = formattedDate.getFullYear();
            var month = formattedDate.getMonth();
            month = parseInt(month) + 1;
            month = (month < 10) ? ('0' + month) : month;
            var day = formattedDate.getDate();
            day = (day < 10) ? ('0' + day) : day;
            return year + format + month + format + day;
        }
        catch (err) {
            // return  next(err);
        }
    };

    utilityHelper.sanitizeUserHtmlBodyInput = function (htmlContentInfo, next) {
        try {

            var modelInfo = {};
            for (var i = 0, keys = Object.keys(htmlContentInfo); i < keys.length; i++) {
                if(htmlContentInfo[keys[i]] !== undefined){
                    modelInfo[keys[i]] = sanitizeHtml(htmlContentInfo[keys[i]], {
                        allowedTags: ['h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
                            'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
                            'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'img', 'abbr',
                            'acronym', 'address', 'applet', 'area', 'article', 'aside', 'audio', 'base', 'basefont',
                            'big', 'blockquote', 'br', 'h1', 'h2', 'caption', 'canvas', 'button', 'center', 'cite',
                            'code', 'colgroup', 'datalist', 'dd', 'details', 'dialog', 'div', 'dl', 'dt', 'em', 'embed',
                            'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'frame', 'head', 'header', 'i',
                            'iframe', 'input', 'label', 'legend', 'link', 'main', 'map', 'mark', 'menu', 'menuitem',
                            'meta', 'meter', 'nav', 'noscript', 'object', 'optgroup', 'option', 'select', 'output', 'pre',
                            'progress', 'q', 'rp', 'rt', 's', 'samp', 'section', 'small', 'source', 'span', 'strong', 'style',
                            'sub', 'summary', 'sup', 'textarea', 'tfoot', 'title', 'track', 'var', 'video'],
                        allowedAttributes: false

                    });
                }else{
                    modelInfo[keys[i]] = "";
                }

            }
            return modelInfo;
        }
        catch (err) {
            // return  next(err);
        }
    };


    utilityHelper.sleep = function (milliseconds) {
        try {

            var start = new Date().getTime();
            for (var i = 0; i < 1e7; i++) {
                if ((new Date().getTime() - start) > milliseconds) {
                    break;
                }
            }
        }
        catch (err) {
            // return  next(err);
        }
    };

    utilityHelper.isInteger = function (val) {
        var intRegex = /^\d+$/;
        return intRegex.test(val.toString());
    };

    utilityHelper.getPaginationOpts = function (req, next) {
        try {

            // req.query.perpage = '';
            var pagerOpts = {};
            if (req.query.perpage && utilityHelper.isInteger(req.query.perpage)) {
                pagerOpts.perPage = parseInt(req.query.perpage);
            } else {
                pagerOpts.perPage = 10;
            }
            if (req.query.page && utilityHelper.isInteger(req.query.page)) {
                pagerOpts.page = parseInt(req.query.page);
            } else {
                pagerOpts.page = 1;
            }
            return {
                perPage: pagerOpts.perPage,
                page: pagerOpts.page
            };
        }
        catch (err) {
            // return  next(err);
        }
    };

    utilityHelper.getOperatingSystem = function (source, next) {
        try {
            var regExp = /\(([^\)]+)\)/;
            var matches = regExp.exec(source);
            if (matches) {
                if (matches.length >= 1) {
                    matches = matches[1];
                    matches = matches.substring(matches.lastIndexOf(";") + 1);
                }
            } else {
                matches = "unknown";
            }
            return matches;
        }
        catch (err) {
            // return  next(err);
        }
    };

    utilityHelper.isObject = function (val) {
        try {
            if (val === null) {
                return false;
            }
            return ( (typeof val === 'function') || (typeof val === 'object') );

        }
        catch (err) {
            //  return  next(err);
        }
    };

    utilityHelper.setMinuteFromNow = function (min) {
        var timeObject = new Date();
        timeObject.setTime(timeObject.getTime() + 1000 * 60 * parseInt(min));
        return timeObject;
    };




    utilityHelper.removeCharFromString = function (val, char) {
        return val.replace(char, '');
    };

    utilityHelper.getApplicationDeploymentPortNumber = function (req) {
        var _url = '';
        if(req.app.get('env') !== 'production'){
            _url = req.protocol + '://' + req.hostname + ':' + req.app.get('portNumber');
        } else {
            _url = req.protocol + '://' + req.headers.host;
        }
        return _url;
    };

    utilityHelper.getApplicationDeploymentPortNumberForEmail = function (req) {
        var _url = '';
        if(req.app.get('env') !== 'production'){
            _url = req.protocol + '://' + req.hostname + ':' + '4200';
        } else {
            _url = req.protocol + '://' + req.headers.host;
        }
        return _url;
    }

})(module.exports);