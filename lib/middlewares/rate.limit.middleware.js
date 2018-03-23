(function (rateLimiterHelper) {
    'use strict';

    var RateLimiter = require('limiter').RateLimiter;


    rateLimiterHelper.init = function (app) {

        // Allow 150 requests per hour (the Twitter search limit). Also understands
        // 'second', 'minute', 'day', or a number of milliseconds
        var limiter = new RateLimiter(app.get('rateLimit'), 'minute', true);  // fire CB immediately

        rateLimiterHelper.rateLimitByIpAddress = function (req, res, next) {
            // Immediately send 429 header to client when rate limiting is in effect
            limiter.removeTokens(1, function (err, remainingRequests) {
                if (remainingRequests < 0) {
                    res.status(429);
                    res.json({
                        message:'Too Many Requests - your IP is being rate limited'
                    });
                } else {
                    next();
                }
            });
        };
    };

})(module.exports);