var loginRoutes = (function () {

    'use strict';

    var passport = require('passport'),
        express = require('express'),
        HTTPStatus = require('http-status'),
        messageConfig = require('../configs/api.message.config'),
        twoFactorAuthenticator = require('../auth/twofactor.auth'),
        loginParallelChecker = require('../controllers/login.parallel.check.server.controller'),
        ipBlockerController = require('../controllers/ip.blocker.server.controller'),
        Promise = require("bluebird"),
        requestIp = require('request-ip'),
        loginRouter = express.Router();
    var ipAddress = "";
     require('../auth/passport.auth');


//function  declaration to respond the user to the attempted login request with appropriate message and status code
    function respondLoginMessage(req, res, next) {
        //first of all remove the parallel login requests data if any of the same ip address and username from the collection
        //if any login requests before the user is responded with some messages, then that request will be responded with forbidden message

        loginParallelChecker.removeParallizeLoginData(ipAddress, req.body.username)
            .then(function () {
                //after the parallel login requests data are removed if any then respond the user with appropriate message
                if (req.loginStatusMessage) {
                    if (req.loginStatusMessage.success) {
                        res.status(HTTPStatus.OK);
                    } else {
                        res.status(req.loginStatusMessage.status);
                    }
                    res.json(req.loginStatusMessage);
                }else{
                    res.end();
                }
            })
            .catch(function (err) {
                return next(err);
            });
    }

//function declaration to check if the ip address of the client is blocked or not
    function checkIpBlockStatus(req, res, next) {
        var _isBlocked = false;

        //first of all save the ip address of the client with the attempted username to the database so that we can check for parallel login requests
        //if the next login request from the same ip address with same username before the previous login attempt request is processed by the server, then it will be treated as parallel login and server responds with forbidden message to such requests.
        loginParallelChecker.postParallizeLoginStatus(ipAddress, req.body.username)
            .then(function () {
                //then check for ip address blocked status in our database
                return ipBlockerController.checkBlockedExpiryStatus(ipAddress);
            })
            .then(function (blocked) {
                //if ip address is not blocked, then move on to the next middleware
                if (!blocked) {
                    return Promise.resolve(_isBlocked);
                } else {
                    _isBlocked = true;
                    //else remove all the data of parallel login requests from the collection and respond the client with forbidden status message
                    return [_isBlocked, loginParallelChecker.removeParallizeLoginData(ipAddress, req.body.username)];
                }
            })
            .then(function (isBlocked) {
                if (isBlocked) {
                    res.status(HTTPStatus.UNAUTHORIZED);
                    res.json({
                        message: messageConfig.login.ipBlocked
                    });
                } else {

                    next();
                    return null;// return a non-undefined value to signal that we didn't forget to return promise
                }
            })
            .catch(function (err) {
                return next(err);
            });
    }

//function declaration to check for parallel login by the same user from same ip address i.e. multiple requests to the login route from the same ip addres using same username at the same instant of time
    function checkParallizeLoginStatus(req, res, next) {

        ipAddress = requestIp.getClientIp(req);

        loginParallelChecker.checkParallizeLoginStatus(ipAddress, req.body.username)
            .then(function (parallizeLogin) {
                //if the login request is not parallel request ie. login attempt made at different time instants
                if (!parallizeLogin) {
                    //move on to the next middleware function, if exists
                    next();
                    return null;// return a non-undefined value to signal that we didn't forget to return promise
                }
                else {
                    // if the login request is part of  parallel requests ie. multiple login attempts made at  time instant, then respond to the user with login forbidden message
                    res.status(HTTPStatus.FORBIDDEN);
                    res.json({
                        message: messageConfig.login.authProgress
                    });
                }
            })
            .catch(function (err) {
                return next(err);
            });
    }

    loginRouter.route('/login/')

    /**
     * @api {post} /api/login  Verify the user credentials i.e. username and password
     * @apiPermission admin
     * @apiName passport.authenticate('local-login')
     * @apiGroup Login
     *
     * @apiParam {String} username  Mandatory username of the user
     * @apiParam {String} password Mandatory  password of the user
     *
     * @apiDescription  Verify the user credentials i.e combination of username and password and then redirects the user to either the dashboard page or two-factor authentication page
     * @apiVersion 0.0.1
     *
     *
     *
     *
     * @apiSuccess {Boolean} success whether the login attempt is successfull or not.
     * @apiSuccess {String} token jwt token for token based authentication .
     * @apiSuccess {Object} userInfo  object containing user information.
     * @apiSuccess {String} userInfo._id  object id of user data.
     * @apiSuccess {String} userInfo.email  email address of the user.
     * @apiSuccess {String} userInfo.username  username used when registering in the system, by default, same as email address.
     * @apiSuccess {Boolean} userInfo.active  active bit status of the user.
     * @apiSuccess {String} userInfo.userRole  role of the user in the system.
     * @apiSuccess {String} userInfo.twoFactorAuthEnabled  multi-factor or two factor authentication is enabled in the system or not.
     * @apiSuccess {String} userInfo.addedOn date of user registered in the system .
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *           "success": true,
     *           "token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3OTRjZjE5OTgwMWYzMWMwZGRiZjkwNyIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJ0ZXN0bm9kZWNtc0BnbWFpbC5jb20iLCJlbWFpbCI6InRlc3Rub2RlY21zQGdtYWlsLmNvbSIsInVzZXJSb2xlIjoiYWRtaW4iLCJhZGRlZE9uIjoiMjAxNi0wNy0yNFQxNDoyMjoxNy45MTNaIiwidHdvRmFjdG9yQXV0aEVuYWJsZWQiOmZhbHNlfSwiY2xhaW1zIjp7InN1YmplY3QiOiI1Nzk0Y2YxOTk4MDFmMzFjMGRkYmY5MDciLCJpc3N1ZXIiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJwZXJtaXNzaW9ucyI6WyJzYXZlIiwidXBkYXRlIiwicmVhZCIsImRlbGV0ZSJdfSwiaWF0IjoxNDY5NTA5NzA4LCJleHAiOjE0Njk1OTYxMDgsImlzcyI6IjU3OTRjZjE5OTgwMWYzMWMwZGRiZjkwNyJ9.HZ_JE88RaymS1jiAWleRlmd5hKR5XeLdh-Jvwx725RtN15wxlcnOmxRsmjxYQsZTGxo8qY2yqa2zr7rn7acpYw",
     *           "userInfo": {
     *               "_id": "5794cf199801f31c0ddbf907",
     *               "active": true,
     *               "username": "testnodecms@gmail.com",
     *               "email": "testnodecms@gmail.com",
     *               "userRole": "superadmin",
     *               "addedOn": "2016-07-24T14:22:17.913Z",
     *               "twoFactorAuthEnabled": false
     *           }
     *       }
     *
     *
     *
     * @apiSuccess (MultiFactorAuth) {Boolean} success whether the login attempt is successfull or not.
     * @apiSuccess (MultiFactorAuth) {String} userId  object id of user data.
     * @apiSuccess (MultiFactorAuth) {String} twoFactorAuthEnabled  multi-factor or two factor authentication is enabled in the system or not.
     * @apiSuccessExample (MultiFactorAuth) Success-Response:
     *     HTTP/1.1 200 OK
     *
     * {
     *       "twoFactorAuthEnabled": true,
     *       "success": true,
     *       "userId": "5794cf199801f31c0ddbf907"
     *   }
     *
     * @apiError (ForbiddenError) {String} message parallel login attempt detected and respond the user with forbidden access message stating another login attempt in progress
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 403 Forbidden
     *     {
     *        "message": "Authentication already in progress"
     *     }
     *
     *
     *
     * @apiError (ForbiddenError) {String} message Your ip address has been blocked due to repeated entry of invalid login credentials
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 403 Forbidden
     *     {
     *        "message": "Your ip address has been blocked due to repeated entry of invalid login credentials"
     *     }
     *
     *
     *
     * @apiError (UnAuthorizedError) {String}  message Wrong combination of username and password
     * @apiError (UnAuthorizedError) {Number}  status Http status code for Unauthorized action
     * @apiError (UnAuthorizedError) {Boolean}  success whether the login attempt is successfull or not
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 401 Unauthorized
     *     {
     *           "success": false,
     *           "status": "401",
     *           "message": "Invalid credentials"
     *       }
     *
     *
     * @apiError (UnAuthorizedError) {String} message User account not confirmed. To be able to login, user registration must be confirmed via the confirmation link sent in the email
     * @apiError (UnAuthorizedError) {Number}  status Http status code for Unauthorized action
     * @apiError (UnAuthorizedError) {Boolean}  success whether the login attempt is successfull or not
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 401 Unauthorized
     *     {
     *           "success": false,
     *           "status": "401",
     *           "message": "User account not confirmed. Please check your email and click on the link sent to you in the confirmation email to verify your account."
     *       }
     *
     *
     *
     * @apiError (ForbiddenError) {String} User account is blocked due to maximum times of repeated login attempts. User will be able to login only if he/she is not blocked. To unblock, click the unblock confirmation link sent to the email
     * @apiError (UnAuthorizedError) {Number}  status Http status code for Unauthorized action
     * @apiError (UnAuthorizedError) {Boolean}  success whether the login attempt is successfull or not
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 403 Forbidden
     *     {
     *           "success": false,
     *           "status": "403",
     *           "message": "You are currently blocked. Please check email forwarded to your email and click the link."
     *       }
     *
     *
     *
     * @apiError (UnAuthorizedError) {String} message Ip address is blocked for certain duration of time due to repeated entry of wrong combination of username and password
     * @apiError (UnAuthorizedError) {Number}  status Http status code for Unauthorized action
     * @apiError (UnAuthorizedError) {Boolean}  success whether the login attempt is successfull or not
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 401 Unauthorized
     *     {
     *           "success": false,
     *           "status": "401",
     *           "message": "Your ip address has been blocked due to repeated entry of invalid login credentials"
     *       }
     *
     *
     *
     * @apiError (InternalServerError)  {String} message  Internal Server Error
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *       "message": "Internal Server Error"
     *     }
     *
     */

        .post(
            checkParallizeLoginStatus,
            checkIpBlockStatus,
            passport.authenticate('local-login', {
                session: false
            }),
            respondLoginMessage);

    loginRouter.route('/two-factor-auth-validate/:userId')

    /**
     * @api {post} /api/two-factor-auth-validate/:userId  Verify the token inputted by the user and if successfull, redirects the user to the dashboard page
     * @apiPermission admin
     * @apiName validateTOTPToken
     * @apiGroup Login
     *
     *
     * @apiParam {String} userId  object id of the user registered in the system
     * @apiParam {String} totpToken Mandatory time-based one time password.
     *
     *   @apiParamExample {json} Request-Example:
     *     {
     *       "userId": "577f5c1b5869902d67eb22a8"
     *     }
     *
     *
     *
     * @apiDescription  Verify the time based one time password  token inputted by the user and  if successfull, redirects the user to the dashboard page
     * @apiVersion 0.0.1
     *
     *
     *
     *
     * @apiSuccess {Boolean} success whether the login attempt is successfull or not.
     * @apiSuccess {String} token jwt token for token based authentication .
     * @apiSuccess {Object} userInfo  object containing user information.
     * @apiSuccess {String} userInfo._id  object id of user data.
     * @apiSuccess {String} userInfo.email  email address of the user.
     * @apiSuccess {String} userInfo.username  username used when registering in the system, by default, same as email address.
     * @apiSuccess {Boolean} userInfo.active  active bit status of the user.
     * @apiSuccess {String} userInfo.userRole  role of the user in the system.
     * @apiSuccess {String} userInfo.twoFactorAuthEnabled  multi-factor or two factor authentication is enabled in the system or not.
     * @apiSuccess {String} userInfo.addedOn date of user registered in the system .
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *           "success": true,
     *           "token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjp0cnVlLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWN0aXZlIjp0cnVlfSwiY2xhaW1zIjp7InN1YmplY3QiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgiLCJpc3N1ZXIiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJwZXJtaXNzaW9ucyI6WyJzYXZlIiwidXBkYXRlIiwicmVhZCIsImRlbGV0ZSJdfSwiaWF0IjoxNDY5NTAwMDkwLCJleHAiOjE0Njk1ODY0OTAsImlzcyI6IjU3N2Y1YzFiNTg2OTkwMmQ2N2ViMjJhOCJ9.wy9YaVm9Sca9Z3NZEqzsa29za3FnRDjCxwFZ5lRMprC1LnWqvXMk7iI0E0d4hJ8J_0vApee_cdzK-JsJxtZMVA",
     *           "userInfo": {
     *                   "_id": "577f5c1b5869902d67eb22a8",
     *                   "active": true,
     *                   "username": "superadmin",
     *                   "email": "hello@bitsbeat.com",
     *                   "userRole": "superadmin",
     *                   "addedOn": "2016-07-08T07:54:03.766Z",
     *                   "twoFactorAuthEnabled": true
     *               }
     *       }
     *
     *
     *
     * @apiError (UnAuthorizedError) {String} message time based one time password is not verified
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 401 Unauthorized
     *     {
     *        "message": "TOTP Token not verified"
     *     }
     *
     *
     *
     * @apiError (InternalServerError)  {String} message  Internal Server Error
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *       "message": "Internal Server Error"
     *     }
     *
     */

        .post(twoFactorAuthenticator.validateTOTPToken);

    return loginRouter;

})();

module.exports = loginRoutes;