(function (twoFactorAuthenticatorHelper) {

    'use strict';

    var speakeasy = require('speakeasy'),
        qrCode = require('qr-image'),
        Promise = require("bluebird");


    twoFactorAuthenticatorHelper.generateMultiFactorAuthCode= function (req) {
        try {
            var otpPathURLlabel = req.hostname + ':' + req.decoded.user.email;
            otpPathURLlabel = encodeURIComponent(otpPathURLlabel.toLowerCase().trim());
            var issuer = encodeURIComponent(req.hostname.toLowerCase().trim());
            var secret = speakeasy.generateSecret({
                length: 32,
                name: otpPathURLlabel,
                symbols: false,
                otpauth_url: false
            });

            secret.otpauth_url = speakeasy.otpauthURL({
                secret: secret.base32,
                label: otpPathURLlabel,
                issuer: issuer,
                encoding: 'base32'
            });

            var qr_svg = qrCode.svgObject(secret.otpauth_url, {type: 'svg'});
            req.session.totpAuthConfig = secret;

            req.session.token =  speakeasy.totp({
                secret: secret.base32,
                encoding: 'base32'
            });
            return Promise.resolve({
                qrcode: qr_svg
            });
        }
        catch (err) {
            return Promise.reject(err);
        }
    };

    twoFactorAuthenticatorHelper.verifyMultiFactorAuthCode= function (req, _tokenSecret) {
        // Verify a given token
        var userToken = req.body.totpToken;
        try {
            var verified = speakeasy.totp.verify({
                secret: _tokenSecret,
                encoding: 'base32',
                token: userToken,
                window: 1
            });
            // Returns true if the token matches
            if (verified) {
                return Promise.resolve(true);
            } else {
                return Promise.resolve(false);
            }
        }
        catch (err) {
            return Promise.resolve(false);
        }
    };

})(module.exports);
