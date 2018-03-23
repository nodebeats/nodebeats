var twoFactorAuthRoutes = (function () {

    'use strict';

    var HTTPStatus = require('http-status'),
        express = require('express'),
        messageConfig = require('../configs/api.message.config'),
        tokenAuthMiddleware = require('../middlewares/token.authentication.middleware'),
        roleAuthMiddleware = require('../middlewares/role.authorization.middleware'),
        twoFactorAuthHelper = require('../helpers/two.factor.authentication.helper'),
        userController = require('../controllers/user.server.controller'),
        Promise = require("bluebird"),
        errorHelper = require('../helpers/error.helper'),
        twoFactorAuthRouter = express.Router();

    twoFactorAuthRouter.route('/totp-setup')

    /**
     * @api {get} /api/totp-setup  Set up two factor or multi-factor authentication for user
     * @apiPermission admin
     * @apiName getTOTPSecret
     * @apiGroup Multi-Factor-Authentication
     *
     * @apiDescription Set up two factor or multi-factor authentication for user to generate QR code which then can be scanned with any authenticator app like google authenticator. Basically set up Time based One-time Password authentication mechanism
     * @apiVersion 0.0.1
     *
     * @apiHeader (AuthorizationHeader) {String} authorization x-access-token value.
     * @apiHeaderExample {json} Header-Example:
     *{
     *  "x-access-token": "yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c"
     * }
     *
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -v \
     * -X GET  \
     * http://localhost:3000/api/totp-setup  \
     * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2OTI1ODQ0OCwiZXhwIjoxNDY5MzQ0ODQ4LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.Qml7o6QzR-UknIY69WaSJYmCQidMFLwAh4ToIo15qZteGfAu5UPXvMRX_2sx7g2BiZ0Thefw83RtAjq5sswNtw"
     *
     *
     * @apiSuccess {String} qrcode object containing QR code information data.
     * @apiSuccess {String} qrcode.size   size of one module in pixels. Default 5 for png and undefined for svg..
     * @apiSuccess {String} qrcode.path  data for qr code which forms the QR image.
     *
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *           "qrcode": {
     *               "size": 47,
     *               "path": "M1 1h7v7h-7zM9 1h4v3h-2v-1h1v-1h-3zM14 1h4v1h-2v2h2v1h-1v1h-1v-1h-3v-1h2v-1h-1zM19 1h1v1h1v-1h4v1h-1v3h2v4h1v1h-2v1h-2v-1h-1v1h1v1h-2v-2h-2v1h-1v-2h2v-1h1v-1h-1v1h-1v-2h-1v-1h2v1h1v-2h1v1h1v-2h-2v1h-1v-1h-2v-1h1zM27 1h1v2h-1v2h-1v-2h-1v-1h2zM31 1h3v2h1v1h-2v-1h-1v-1h-1zM37 1h1v1h-1zM39 1h7v7h-7zM2 2v5h5v-5zM29 2h1v1h-1zM36 2h1v2h1v2h-3v-1h1zM40 2v5h5v-5zM3 3h3v3h-3zM31 3h1v3h-5v-1h2v-1h1v1h1zM41 3h3v3h-3zM9 4h1v2h1v1h-1v1h1v-1h1v3h1v1h-1v1h-1v1h-1v-2h1v-1h-4v-1h2zM33 5h1v1h1v1h-1v1h-1v-1h-1v-1h1zM12 6h2v2h-1v-1h-1zM15 6h1v2h1v-1h1v2h-1v3h-1v-3h-1zM22 6v3h3v-3zM23 7h1v1h-1zM27 7h1v1h-1zM29 7h1v1h-1zM31 7h1v1h-1zM35 7h1v1h-1zM37 7h1v1h-1zM28 8h1v2h3v1h-1v1h-2v3h-1v2h1v1h-1v1h-1v-1h-1v1h-1v-2h-1v1h-2v-1h1v-1h-1v-1h-1v-2h1v1h1v1h1v1h2v1h1v-3h1v-2h-1v-2h1zM30 8h1v1h-1zM32 8h1v1h-1zM1 9h1v1h-1zM5 9h1v1h1v1h1v1h-2v-1h-1zM14 9h1v3h-1zM33 9h3v1h-3zM37 9h6v1h1v1h-2v-1h-1v1h-1v1h1v-1h1v1h1v3h1v-1h2v1h-1v1h1v3h-1v1h-2v-1h1v-1h-1v1h-1v1h-1v-1h-2v-1h3v-1h2v-1h-3v-1h1v-2h-1v1h-1v2h-1v2h-1v-2h-1v1h-1v-3h2v1h1v-3h-2v-1h-1v-1h1zM45 9h1v1h-1zM38 10v1h1v-1zM1 11h1v1h-1zM3 11h1v2h-2v-1h1zM19 11h1v1h-1zM32 11h3v1h-1v1h1v4h-1v1h1v1h2v-1h1v1h1v2h1v-1h1v1h1v1h1v-1h1v1h1v1h-2v1h-1v1h1v1h2v2h-1v-1h-1v3h1v2h-2v1h-2v1h1v3h1v2h1v1h-1v2h-1v1h-1v1h-1v1h1v-1h1v2h-5v-1h-1v-1h2v1h1v-2h-2v-2h-1v-2h2v-2h1v-1h-4v2h1v1h-1v1h-1v-2h-1v-1h-1v-1h-1v-1h-1v-1h3v1h2v-1h1v1h1v-1h3v-2h2v-1h1v-1h-1v1h-2v1h-1v-2h1v-1h-1v1h-1v-1h-2v2h-1v-1h-1v-2h3v-1h1v1h3v-2h-2v1h-1v-1h-2v1h-2v1h-1v-1h-2v-1h3v-1h3v-1h1v-2h-1v-2h-1v1h-1v-2h-1v1h-1v2h1v1h-1v2h-2v-1h1v-2h-1v-1h1v-1h-2v-2h1v-1h1v1h2v-1h-2v-1h-1v1h-1v-2h1v-1h2v2h2v-2h-1v-2h-1zM44 11h1v1h1v1h-2zM12 12h2v2h1v2h-2v-1h-1v-1h1v-1h-1zM15 12h1v1h-1zM18 12h1v1h1v1h-2zM20 12h1v1h-1zM23 12h1v1h-1zM35 12h2v1h-2zM1 13h1v1h2v3h-1v1h1v-1h5v1h1v1h1v-1h1v-1h2v2h1v-1h1v-2h1v-2h1v3h2v-1h-1v-1h2v3h1v2h-2v-1h-1v-1h-2v1h-1v1h-1v1h-1v-1h-1v-1h-1v1h1v2h-1v-1h-1v1h1v1h1v1h-1v1h-1v-2h-1v2h1v2h-1v-1h-3v1h1v1h-2v2h-1v1h1v7h-2v-1h-2v-1h3v-1h-2v-1h1v-1h-3v-2h1v-1h1v1h1v-2h-2v1h-1v-3h1v1h3v-1h1v-1h-1v1h-2v-1h1v-1h-1v-1h2v-1h-2v-1h-1v-1h2v1h1v-1h1v-1h1v1h1v-1h1v-1h-1v-1h-2v1h-1v1h-1v-1h-2v-1h-1zM4 13h1v1h-1zM6 13h3v1h-3zM11 13h1v1h-1zM26 13h1v1h-1zM9 14h1v1h1v1h1v1h-1v1h-1v-2h-4v-1h3zM25 14h1v1h-1zM2 15v1h1v-1zM7 19h1v1h-1zM1 20h1v1h-1zM17 20h1v1h-1zM19 20h1v2h1v-1h2v-1h1v1h3v1h1v-2h1v3h-1v1h-1v1h-1v1h-1v1h1v1h-1v1h-2v-1h1v-2h-4v1h-1v-2h2v-1h-1v-1h-2v-2h1zM33 21h1v1h-1zM45 21h1v1h-1zM1 22h1v1h-1zM6 22v3h3v-3zM16 22h1v2h-1zM22 22v3h3v-3zM34 22h1v1h1v1h-2zM38 22v3h3v-3zM2 23h1v1h-1zM7 23h1v1h-1zM23 23h1v1h-1zM29 23h1v1h-1zM39 23h1v1h-1zM18 24h1v1h-1zM44 24h2v1h-2zM1 25h2v1h-2zM12 25h2v1h-2zM17 25h1v2h1v1h1v1h-3v-1h-1v1h1v2h-1v1h-1v1h1v1h-1v1h-1v-1h-2v-2h1v1h1v-1h-1v-1h1v-3h1v-1h1v-1h1zM27 25h2v1h-1v2h-1zM14 26h1v1h-1zM41 26v2h1v-2zM9 27h1v3h-3v-1h1v-1h1zM12 27h1v2h-1zM22 27h1v1h-1zM29 27h1v1h-1zM26 28h1v1h-1zM30 28h2v2h1v1h1v1h2v2h-1v-1h-1v1h-1v-1h-1v-1h-1v-1h-1v1h1v1h-2v1h-1v1h-1v-3h-4v-1h-1v-1h3v-1h1v2h1v-2h2v1h1zM45 28h1v1h-1zM11 29h1v1h1v1h-1v1h-1zM21 29h1v1h-1zM44 29h1v1h-1zM19 30h1v1h-1zM7 31h1v1h-1zM18 31h1v1h-1zM9 32h1v2h-3v-1h2zM20 32h1v3h-2v-2h1zM37 32h1v1h-1zM45 32h1v1h-1zM17 33h1v1h-1zM22 33h1v1h-1zM42 33h3v1h-3zM1 34h1v1h-1zM10 34h2v1h-2zM25 34h1v2h-1zM45 34h1v1h-1zM7 35h1v1h-1zM9 35h1v1h-1zM12 35h2v1h4v1h-1v1h1v-1h2v-1h1v1h3v-1h1v1h1v6h1v-2h2v3h-2v1h2v1h-4v-3h-1v-1h-1v2h1v1h-1v1h-2v-2h1v-1h-1v1h-1v1h-1v-3h1v-1h-3v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1zM18 35h1v1h-1zM22 35h2v1h-2zM28 35h1v3h1v-1h1v1h1v2h-1v-1h-1v1h-3v-3h-1v-1h2zM39 35v1h1v-1zM42 35h3v1h1v2h-1v2h-1v-1h-1v-2h1v-1h-2zM10 36h2v1h1v1h-1v1h-1v1h1v1h1v-2h1v1h1v2h3v2h-2v-1h-2v-1h-1v2h-1v-2h-1v-1h-1v-1h-1v-2h2v-1h-1zM1 37h1v1h-1zM7 37h2v1h-2zM35 37h1v1h-1zM19 38v1h-1v1h3v-2zM22 38v3h3v-3zM38 38v3h3v-3zM1 39h7v7h-7zM23 39h1v1h-1zM39 39h1v1h-1zM2 40v5h5v-5zM32 40h1v1h-1zM3 41h3v3h-3zM9 41h1v1h-1zM31 41h1v1h1v-1h1v1h1v2h-1v2h-2v-1h1v-2h-2v3h-1v-4h1zM10 42h1v1h-1zM43 42h1v1h-1zM41 43h2v1h-2zM44 43h1v1h-1zM14 44h2v1h-1v1h-3v-1h2zM9 45h2v1h-2zM16 45h2v1h-2zM45 45h1v1h-1z"
     *           }
     *       }
     *
     *
     * @apiError (UnAuthorizedError) {String} message authentication token was not supplied
     * @apiError (UnAuthorizedError) {Boolean} isToken to check if token is supplied or not , if token is supplied , returns true else returns false
     * @apiError (UnAuthorizedError) {Boolean} success true if jwt token verifies
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 401 Unauthorized
     *     {
     *       "isToken": true,
     *        "success": false,
     *        "message": "Authentication failed"
     *     }
     *
     *
     * @apiError  (UnAuthorizedError_1) {String} message  You are not authorized to access this api route.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 401 Unauthorized
     *     {
         *       "message": "You are not authorized to access this api route."
         *     }
     *
     * @apiError  (UnAuthorizedError_2) {String} message  You are not authorized to perform this action.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 401 Unauthorized
     *     {
         *       "message": "You are not authorized to perform this action"
         *     }
     *
     *
     *
     * @apiError  (NotFound) {String} message  TOTP token not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "TOTP token not found"
     *     }
     *
     * @apiError  (InternalServerError) {String} message  Internal Server Error
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *       "message": "Internal Server Error"
     *     }
     *
     */

        .get(tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, getTOTPSecret);


    twoFactorAuthRouter.route('/totp-disable/:userId')

    /**
     * @api {put} /api/totp-disable/:userId  Disable two factor or multi-factor authentication
     * @apiPermission admin
     * @apiName disableTwoFactorAuthentication
     * @apiGroup Multi-Factor-Authentication
     *
     *
     * @apiParam {String} userId  object id of the user registered in the system
     *
     *   @apiParamExample {json} Request-Example:
     *     {
     *       "userId": "5791fc7cf7b57f69796ef444"
     *     }
     *
     *
     *
     * @apiDescription Disable two factor or multi-factor authentication
     * @apiVersion 0.0.1
     * @apiHeader (AuthorizationHeader) {String} authorization x-access-token value.
     * @apiHeaderExample {json} Header-Example:
     *{
     *  "x-access-token": "yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c"
     * }
     *
     * @apiExample {curl} Example usage:
     *
     *
     * curl \
     * -v \
     * -X PUT  \
     * http://localhost:3000/api/totp-disable/5791fc7cf7b57f69796ef444 \
     * -H 'Content-Type: application/json' \
     * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2OTI1ODQ0OCwiZXhwIjoxNDY5MzQ0ODQ4LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.Qml7o6QzR-UknIY69WaSJYmCQidMFLwAh4ToIo15qZteGfAu5UPXvMRX_2sx7g2BiZ0Thefw83RtAjq5sswNtw"
     *
     *
     * @apiSuccess {String} message Two factor authentication disabled for the account successfully.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "message": "Two factor authentication disabled for the account successfully"
     *       }
     *
     * @apiError (UnAuthorizedError) {String} message authentication token was not supplied
     * @apiError (UnAuthorizedError) {Boolean} isToken to check if token is supplied or not , if token is supplied , returns true else returns false
     * @apiError (UnAuthorizedError) {Boolean} success true if jwt token verifies
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 401 Unauthorized
     *     {
     *       "isToken": true,
     *        "success": false,
     *        "message": "Authentication failed"
     *     }
     *
     *
     * @apiError  (UnAuthorizedError_1) {String} message  You are not authorized to access this api route.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 401 Unauthorized
     *     {
         *       "message": "You are not authorized to access this api route."
         *     }
     *
     * @apiError  (UnAuthorizedError_2) {String} message  You are not authorized to perform this action.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 401 Unauthorized
     *     {
         *       "message": "You are not authorized to perform this action"
         *     }
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

        .put(tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, userController.disableTwoFactorAuthentication);

    twoFactorAuthRouter.route('/totp-verify/:userId')

    /**
     * @api {post} /api/totp-verify/:userId  Verify the token inputted by the user and if successfull, enable two-factor authentication
     * @apiPermission admin
     * @apiName verifyTOTPSecret
     * @apiGroup Multi-Factor-Authentication
     *
     *
     * @apiParam {String} userId  object id of the user registered in the system
     * @apiParam {String} totpToken Mandatory time-based one time password.
     *
     *   @apiParamExample {json} Request-Example:
     *     {
     *       "userId": "5791fc7cf7b57f69796ef444"
     *     }
     *
     *
     *
     * @apiDescription  Verify the token inputted by the user and  if successfull, enable two-factor authentication
     * @apiVersion 0.0.1
     * @apiHeader (AuthorizationHeader) {String} authorization x-access-token value.
     * @apiHeaderExample {json} Header-Example:
     *{
     *  "x-access-token": "yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c"
     * }
     *
     *
     *
     * @apiSuccess {String} message Two factor authentication for user verified successfully.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "message": "Two factor authentication for user verified successfully"
     *       }
     *
     * @apiError (UnAuthorizedError) {String} message authentication token was not supplied
     * @apiError (UnAuthorizedError) {Boolean} isToken to check if token is supplied or not , if token is supplied , returns true else returns false
     * @apiError (UnAuthorizedError) {Boolean} success true if jwt token verifies
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 401 Unauthorized
     *     {
     *       "isToken": true,
     *        "success": false,
     *        "message": "Authentication failed"
     *     }
     *
     *
     * @apiError  (UnAuthorizedError_1) {String} message  You are not authorized to access this api route.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 401 Unauthorized
     *     {
         *       "message": "You are not authorized to access this api route."
         *     }
     *
     * @apiError  (UnAuthorizedError_2) {String} message  You are not authorized to perform this action.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 401 Unauthorized
     *     {
         *       "message": "You are not authorized to perform this action"
         *     }
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
     * @apiError  (UnAuthorizedError_1) {String} message  You are not authorized to access this api route.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 401 Unauthorized
     *     {
         *       "message": "You are not authorized to access this api route."
         *     }
     *
     * @apiError  (UnAuthorizedError_2) {String} message  You are not authorized to perform this action.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 401 Unauthorized
     *     {
         *       "message": "You are not authorized to perform this action"
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

        .post(tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, verifyTOTPSecret);


    //function declaration to setup time based one time password authentication mechanism / two-factor or multifactor authentication mechanism, if successfull, then returns time based one time password object i.e value for QR code, else return not found message

    function getTOTPSecret(req, res, next) {
        twoFactorAuthHelper.generateMultiFactorAuthCode(req)
            .then(function(totpObj){
                if (totpObj) {
                    //if exists, return data in json format
                    res.status(HTTPStatus.OK);
                    res.json(totpObj);
                } else {
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.twoFactorAuthentication.notFound
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    }


    //function declaration to verify time based one time password authentication mechanism / two-factor or multifactor authentication mechanism, token generated by totp authenticators like google authenticator or authy

    function verifyTOTPSecret(req, res, next) {
        twoFactorAuthHelper.verifyMultiFactorAuthCode(req, req.session.totpAuthConfig.base32)
            .then(function(verified){
                //if totp token is verified successfully , then get the totp token secret value from session and then enable the two factor authentication for the user
                if (verified) {
                    var twoFactorAuthSecret = '';
                    if(req.session.totpAuthConfig.base32){
                        twoFactorAuthSecret = req.session.totpAuthConfig.base32;
                    }
                    var dataObj = {
                        twoFactorAuthEnabled : true,
                        twoFactorAuthSharedSecret : twoFactorAuthSecret
                    };
                    var _userId = '';
                    if(req.params){
                        _userId = req.params.userId;
                    }
                    return userController.verifyTwoFactorAuthentication(dataObj, _userId);
                } else {
                    //if token not verified, then respond the user with token not verified message
                    throw new Promise.CancellationError('{ "statusCode":"' + HTTPStatus.UNAUTHORIZED + '", "message": "' + messageConfig.twoFactorAuthentication.notVerified + '"}');
                }
            })
            .then(function(){
                //if everything fine, then send the message to the user that two factor authentication mechanism is enabled for the user / token is verified successfully
                res.status(HTTPStatus.OK);
                res.json({
                    message: messageConfig.twoFactorAuthentication.verifySuccess
                });
            })
            .catch(Promise.CancellationError, function (cancellationErr) {
                errorHelper.customErrorResponse(res, cancellationErr, next);
            })
            .catch(function(err){
                return next(err);
            });
    }

    return twoFactorAuthRouter;

})();

module.exports = twoFactorAuthRoutes;