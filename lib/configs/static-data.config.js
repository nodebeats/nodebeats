(function () {
    'use strict';

    module.exports = function (req) {
        var protocol = req.secure ? "https" : "http";
        if (req.get('x-forwarded-proto')){
            protocol = req.get('x-forwarded-proto');
        }
        var host = protocol + "://" + req.get('host');

        return {
            hostUrl: host,
            newsHostUrl: host + "/news",
            blogHostUrl: host + "/blogs",
            eventHostUrl: host + "/events",
            galleryHostUrl: host + "/gallery/"
        }
    };
})();

