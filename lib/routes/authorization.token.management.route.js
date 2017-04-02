var authorizationTokenRoutes = (function () {

    'use strict';

    var HTTPStatus = require('http-status'),
        express = require('express'),
        messageConfig = require('../configs/api.message.config'),
        authorizationTokenController = require('../controllers/authorization.token.management.server.controller'),
        authorizationTokenRouter =  express.Router();

    authorizationTokenRouter.route('/')

    /**
     * @api {get} /api/authtoken/ Get authorization token list
     * @apiPermission admin
     * @apiName getAllAuthorizationTokens
     * @apiGroup Authorization Token Management
     *
     * @apiParam {String} userId object id of the user to filter authorization tokens so that tokens associated with only that user will be listed
     *
     *
     * @apiParamExample {json} Request-Example:
     *     {
     *       "userId": "58085e79a3e13932aa2b7bc2"
     *     }
     *
     * @apiDescription Retrieves the authorization token list, if exists, else return empty array
     * @apiVersion 0.0.1
     * @apiHeader (AuthorizationHeader) {String} authorization x-access-token value.
     * @apiHeaderExample {json} Header-Example:
     *{
     *  "x-access-token": "yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c"
     * }
     *
     *
     * @apiExample {curl} Example usage:
     *
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/authtoken" \
     * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3ZDE3NTVlZmU2ZmViNmUzNGE4NWNkYSIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJoZWxwQG5vZGViZWF0cy5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWRkZWRPbiI6IjIwMTYtMDktMDhUMTQ6Mjc6NDIuNjc3WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTdkMTc1NWVmZTZmZWI2ZTM0YTg1Y2RhIiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ3NTY0NjA0NiwiZXhwIjoxNDc1NzMyNDQ2LCJpc3MiOiI1N2QxNzU1ZWZlNmZlYjZlMzRhODVjZGEifQ.y0U0FeQJRlXIRX0iTUZSa1WrqLfIAqsun25pfF0rtio82o5engk17snLBkRzcah187sGPcmWfZcDSLL_Uu0V8w"
     *
     *
     * @apiSuccess {String} _id  object id of authorization token data.
     * @apiSuccess {String} userId  object id of the associated user.
     * @apiSuccess {String} ipAddress  IP address of the user.
     * @apiSuccess {String} browser  browser from which request is made.
     * @apiSuccess {String} userAgent  userAgent of the user's browser.
     * @apiSuccess {String} authorizationToken  authorization token.
     * @apiSuccess {Date} addedOn  date of the record creation.
     * @apiSuccess {Date} expiresOn  expiry date of the authorization token.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     [
     *        {
     *            "_id": "58085e79a3e13932aa2b7bc2",
     *            "userId": "57d1755efe6feb6e34a85cda",
     *            "ipAddress": "192.168.10.6",
     *            "browser": "Chrome",
     *            "userAgent": "Chrome 47.0.2526 / Linux 0.0.0",
     *            "authorizationToken": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3ZDE3NTVlZmU2ZmViNmUzNGE4NWNkYSIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJoZWxwQG5vZGViZWF0cy5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWRkZWRPbiI6IjIwMTYtMDktMDhUMTQ6Mjc6NDIuNjc3WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTdkMTc1NWVmZTZmZWI2ZTM0YTg1Y2RhIiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ3Njk0MzQ4MSwiZXhwIjoxNDc3MDI5ODgxLCJpc3MiOiI1N2QxNzU1ZWZlNmZlYjZlMzRhODVjZGEifQ.nrc0dvEIr8TklRdqw9JL2pIMEAQ166z8Y4-vVZzDLdnGh3gr_lQy4C-4XOkNbtoX8qC4cP0ycH7GNigu0hrPQw",
     *            "addedOn": "2016-10-20T06:04:41.907Z",
     *            "expiresOn": "2016-10-21T06:04:41.898Z"
     *        }
     *        ]
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
     * @apiError  (NotFound) {String} message  Authorization token not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "Authorization token not found"
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

        .get( getAllAuthorizationTokens )

        /**
         * @api {delete} /api/authtoken/ Deletes all existing authorization token data
         * @apiPermission admin
         * @apiName deleteAllAuthorizationToken
         * @apiGroup Authorization Token Management
         *
         *
         * @apiDescription Deletes all existing authorization token data
         *
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
         *  curl \
         * -v \
         * -X DELETE  \
         * "http://localhost:3000/api/authtoken/" \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3ZDE3NTVlZmU2ZmViNmUzNGE4NWNkYSIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJoZWxwQG5vZGViZWF0cy5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWRkZWRPbiI6IjIwMTYtMDktMDhUMTQ6Mjc6NDIuNjc3WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTdkMTc1NWVmZTZmZWI2ZTM0YTg1Y2RhIiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ3Njk0NjIxNywiZXhwIjoxNDc3MDMyNjE3LCJpc3MiOiI1N2QxNzU1ZWZlNmZlYjZlMzRhODVjZGEifQ.sV68ixmYS_u5Rcti0ahOj9UKThatqDgw9BTA-75BUTnpUTZa5DjVvOhv0UwjXSYCDqfo7VMT2bwNg52M2aXJZg"
         *
         * @apiSuccess {String} message All authorization tokens deleted successfully
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "All authorization tokens deleted successfully"
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

        .delete( authorizationTokenController.deleteAllAuthorizationToken )


    authorizationTokenRouter.route('/:authorizationTokenId')

    /**
     * @api {get} /api/authtoken/:authorizationTokenId Get authorization token information object
     * @apiPermission admin
     * @apiName getAuthorizationTokenInfoById
     * @apiGroup Authorization Token Management
     *
     * @apiParam {String} authorizationTokenId object id of the authorization token
     *
     *
     * @apiParamExample {json} Request-Example:
     *     {
     *       "authorizationTokenId": "58085e79a3e13932aa2b7bc2"
     *     }
     *
     * @apiDescription Retrieves the authorization token information object , if exists, else return not found message
     * @apiVersion 0.0.1
     * @apiHeader (AuthorizationHeader) {String} authorization x-access-token value.
     * @apiHeaderExample {json} Header-Example:
     *{
     *  "x-access-token": "yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c"
     * }
     *
     *
     * @apiExample {curl} Example usage:
     *
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/authtoken/58085e79a3e13932aa2b7bc2" \
     * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3ZDE3NTVlZmU2ZmViNmUzNGE4NWNkYSIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJoZWxwQG5vZGViZWF0cy5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWRkZWRPbiI6IjIwMTYtMDktMDhUMTQ6Mjc6NDIuNjc3WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTdkMTc1NWVmZTZmZWI2ZTM0YTg1Y2RhIiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ3NTY0NjA0NiwiZXhwIjoxNDc1NzMyNDQ2LCJpc3MiOiI1N2QxNzU1ZWZlNmZlYjZlMzRhODVjZGEifQ.y0U0FeQJRlXIRX0iTUZSa1WrqLfIAqsun25pfF0rtio82o5engk17snLBkRzcah187sGPcmWfZcDSLL_Uu0V8w"
     *
     *
     * @apiSuccess {String} _id  object id of authorization token data.
     * @apiSuccess {String} userId  object id of the associated user.
     * @apiSuccess {String} ipAddress  IP address of the user.
     * @apiSuccess {String} browser  browser from which request is made.
     * @apiSuccess {String} userAgent  userAgent of the user's browser.
     * @apiSuccess {String} authorizationToken  authorization token.
     * @apiSuccess {Date} addedOn  date of the record creation.
     * @apiSuccess {Date} expiresOn  expiry date of the authorization token.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *        {
     *            "_id": "58085e79a3e13932aa2b7bc2",
     *            "userId": "57d1755efe6feb6e34a85cda",
     *            "ipAddress": "192.168.10.6",
     *            "browser": "Chrome",
     *            "userAgent": "Chrome 47.0.2526 / Linux 0.0.0",
     *            "authorizationToken": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3ZDE3NTVlZmU2ZmViNmUzNGE4NWNkYSIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJoZWxwQG5vZGViZWF0cy5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWRkZWRPbiI6IjIwMTYtMDktMDhUMTQ6Mjc6NDIuNjc3WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTdkMTc1NWVmZTZmZWI2ZTM0YTg1Y2RhIiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ3Njk0MzQ4MSwiZXhwIjoxNDc3MDI5ODgxLCJpc3MiOiI1N2QxNzU1ZWZlNmZlYjZlMzRhODVjZGEifQ.nrc0dvEIr8TklRdqw9JL2pIMEAQ166z8Y4-vVZzDLdnGh3gr_lQy4C-4XOkNbtoX8qC4cP0ycH7GNigu0hrPQw",
     *            "addedOn": "2016-10-20T06:04:41.907Z",
     *            "expiresOn": "2016-10-21T06:04:41.898Z"
     *        }
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
     * @apiError  (NotFound) {String} message  Authorization token not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "Authorization token not found"
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

        .get( getAuthorizationTokenInfoById )

        /**
         * @api {delete} /api/authtoken/:authorizationTokenId Deletes existing authorization token data
         * @apiPermission admin
         * @apiName deleteAuthorizationToken
         * @apiGroup Authorization Token Management
         *
         * @apiParam {String} authorizationTokenId object id of the authorization token
         *
         * @apiParamExample {json} Request-Example:
         *     {
         *       "authorizationTokenId": "58085e79a3e13932aa2b7bc2"
         *     }
         *
         *
         * @apiDescription Deletes existing authorization token data
         *
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
         * - X DELETE  \
         * "http://localhost:3000/api/authtoken/58085e79a3e13932aa2b7bc2" \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3ZDE3NTVlZmU2ZmViNmUzNGE4NWNkYSIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJoZWxwQG5vZGViZWF0cy5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWRkZWRPbiI6IjIwMTYtMDktMDhUMTQ6Mjc6NDIuNjc3WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTdkMTc1NWVmZTZmZWI2ZTM0YTg1Y2RhIiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ3Njk0MzQ4MSwiZXhwIjoxNDc3MDI5ODgxLCJpc3MiOiI1N2QxNzU1ZWZlNmZlYjZlMzRhODVjZGEifQ.nrc0dvEIr8TklRdqw9JL2pIMEAQ166z8Y4-vVZzDLdnGh3gr_lQy4C-4XOkNbtoX8qC4cP0ycH7GNigu0hrPQw"
         *
         * @apiSuccess {String} message Authorization token deleted successfully
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "Authorization token deleted successfully"
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

        .delete( authorizationTokenController.deleteAuthorizationToken )


//function declaration to return authorization token information list data, if exists, else return not found message
    function getAllAuthorizationTokens(req, res, next) {
        authorizationTokenController.getAuthorizationTokens(req)
            .then(function(lstAuthorizationToken){
                if (lstAuthorizationToken) {
                    res.status(HTTPStatus.OK);
                    res.json(lstAuthorizationToken);
                } else {
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.authorizationToken.notFound
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    }


//function declaration to return authorization token information object, if exists, else return not found message
    function getAuthorizationTokenInfoById(req, res, next){
        authorizationTokenController.getAuthorizationTokenById(req)
            .then(function(authorizationTokenInfo){
                if (authorizationTokenInfo) {
                    res.status(HTTPStatus.OK);
                    res.json(authorizationTokenInfo);
                } else {
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.authorizationToken.notFound
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    }

    return authorizationTokenRouter;

})();

module.exports = authorizationTokenRoutes;