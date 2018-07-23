(function (cloudinaryHelper) {

    'use strict';

    var path = require('path');

    cloudinaryHelper.singleImageUpload = function (cloudinary, req, res, next) {
        cloudinary.uploader.upload(
            req.file.path,
            function (err, result) {
            },
            {
                public_id: path.basename(req.file.path, path.extname(req.file.filename)),
                format: (path.extname(req.file.filename)).substring(1),
                // format: req.app.get('cloudinaryextension'),
                quality: 60
            }
        );
        next();
    };

    
    cloudinaryHelper.deleteImage = function (fileName, cloudinary, req, res, next) {
        cloudinary.uploader.destroy(
            path.basename(fileName, path.extname(fileName)),
            function (result) {
            },
            {
                invalidate: true
            });
    };

})(module.exports);