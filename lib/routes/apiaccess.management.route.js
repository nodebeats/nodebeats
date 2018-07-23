var apiAccessRoutes = (function () {

    'use strict';

    var HTTPStatus = require('http-status'),
        express = require('express'),
        messageConfig = require('../configs/api.message.config'),
        apiAccessController = require('../controllers/apiaccess.management.server.controller'),
        apiAccessRouter =  express.Router();

    apiAccessRouter.route('/')

    /**
     * @api {get} /api/access/ Get API Route Access Management list
     * @apiPermission admin
     * @apiName getAllApiAccess
     * @apiGroup API Access Management
     *
     * @apiParam {Boolean} active whether to get data with active bit true or false, if true, then returns data list with active bit set to true only
     * @apiParam {String} apiroute Filter the list of API access routes  and display only those matching specified api route
     *
     *
     *
     *  @apiParamExample {json} Request-Example:
     *     {
     *       "active": true
     *     }
     *
     * @apiParamExample {json} Request-Example:
     *     {
     *       "apiroute": "/api/roles"
     *     }
     *
     * @apiDescription Retrieves the API Route Access Management list, if exists, else return empty array
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
     * "http://localhost:3000/api/access" \
     * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3ZDE3NTVlZmU2ZmViNmUzNGE4NWNkYSIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJoZWxwQG5vZGViZWF0cy5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWRkZWRPbiI6IjIwMTYtMDktMDhUMTQ6Mjc6NDIuNjc3WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTdkMTc1NWVmZTZmZWI2ZTM0YTg1Y2RhIiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ3NTY0NjA0NiwiZXhwIjoxNDc1NzMyNDQ2LCJpc3MiOiI1N2QxNzU1ZWZlNmZlYjZlMzRhODVjZGEifQ.y0U0FeQJRlXIRX0iTUZSa1WrqLfIAqsun25pfF0rtio82o5engk17snLBkRzcah187sGPcmWfZcDSLL_Uu0V8w"
     *
     *
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/access" \
     * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3ZDE3NTVlZmU2ZmViNmUzNGE4NWNkYSIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJoZWxwQG5vZGViZWF0cy5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWRkZWRPbiI6IjIwMTYtMDktMDhUMTQ6Mjc6NDIuNjc3WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTdkMTc1NWVmZTZmZWI2ZTM0YTg1Y2RhIiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ3NTY0NjA0NiwiZXhwIjoxNDc1NzMyNDQ2LCJpc3MiOiI1N2QxNzU1ZWZlNmZlYjZlMzRhODVjZGEifQ.y0U0FeQJRlXIRX0iTUZSa1WrqLfIAqsun25pfF0rtio82o5engk17snLBkRzcah187sGPcmWfZcDSLL_Uu0V8w" \
     * --data-urlencode "active=true"
     *
     *
     *
     * @apiSuccess {String} _id  object id of API Route access data.
     * @apiSuccess {String} roleName  title of the role entered by the user.
     * @apiSuccess {String} routeApi  API route access url.
     * @apiSuccess {Boolean} active   active bit status.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     [
     *            {
     *                "_id": "57f33e6fb01d0b1b04a2e0ed",
     *                "roleName": "writer,admin",
     *                "routeApi": "/api/cloudinary",
     *                "active": true
     *            }
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
     * @apiError  (NotFound) {String} message  Route api not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "Route api not found"
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

        .get( getAllApiAccess )

        /**
         * @api {post} /api/access/ Post API Route Access Information
         * @apiPermission admin
         * @apiName postApiAccessInfo
         * @apiGroup API Access Management
         *
         *
         * @apiParam {String} roleName Mandatory title of the role.
         * @apiParam {String} routeApi Mandatory Api Route URL.
         *
         * @apiDescription saves API Route access information to the database so that users with specified roles only can access the API route.
         * @apiVersion 0.0.1
         * @apiHeader (AuthorizationHeader) {String} authorization x-access-token value.
         * @apiHeaderExample {json} Header-Example:
         *{
         *  "x-access-token": "yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c"
         * }
         *
         * @apiExample {curl} Example usage:
         *
         * curl \
         * -v \
         * -X POST  \
         * http://localhost:3000/api/access/ \
         * -H 'Content-Type: application/json' \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3ZDE3NTVlZmU2ZmViNmUzNGE4NWNkYSIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJoZWxwQG5vZGViZWF0cy5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWRkZWRPbiI6IjIwMTYtMDktMDhUMTQ6Mjc6NDIuNjc3WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTdkMTc1NWVmZTZmZWI2ZTM0YTg1Y2RhIiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ3NTU2NTg3OCwiZXhwIjoxNDc1NjUyMjc4LCJpc3MiOiI1N2QxNzU1ZWZlNmZlYjZlMzRhODVjZGEifQ.D5FJ7i6ycZBhYc-kHni6WnjCOGCEZBMsZu9yeCajO_bhVzH-muqUvZ6K5072vwO7LoKB0eTKa1friGngrpRJ9w" \
         * -d '{"roleName": "agent", "routeApi": "/api/teammember",  "active": true}'
         *
         *
         * @apiSuccess {String} message Route api for api access management saved successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "Route api for api access management saved successfully"
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
         *
         * @apiError  (BadRequest) {String} message Validation errors due to not entering values for roleName and routeApi
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *
         *     {
         *       "message":[
         *                      {
         *                           "param": "routeApi",
         *                           "msg": "Route api is required"
         *                       },
         *                       {
         *                           "param": "roleName",
         *                           "msg": "Role is required"
         *                       }
         *                 ]
         *     }
         *
         *
         *
         * @apiError  (AlreadyExists)  {String} message  Route api with same api route already exists
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 409 Conflict
         *     {
         *       "message": "Route api with same api route already exists"
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

        .post( apiAccessController.postApiAccessInfo );

//middleware function that will get the API Route access information object for each of the routes defined downwards
    apiAccessRouter.use('/:apiAccessId', function(req, res, next){
        apiAccessController.getApiAccessById(req)
            .then(function(apiAccessInfo){
                if (apiAccessInfo) {
                    req.apiAccessInfo = apiAccessInfo;
                    next();
                    return null; // return a non-undefined value to signal that we didn't forget to return promise
                } else {
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.apiAccess.notFound
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    });


    apiAccessRouter.route('/:apiAccessId')

    /**
     * @api {get} /api/access/:apiAccessId Get API Route Access Management information object by ID
     * @apiPermission admin
     * @apiName getApiAccessById
     * @apiGroup API Access Management
     *
     * @apiParam {String} apiAccessId Object ID of the API Access Route data
     *
     *
     *
     * @apiParamExample {json} Request-Example:
     *     {
     *       "apiAccessId": "57f33e6fb01d0b1b04a2e0ed"
     *     }
     *
     * @apiDescription Retrieves the API Route Access Management information object by ID, if exists, else return empty object
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
     * "http://localhost:3000/api/access/57f33e6fb01d0b1b04a2e0ed" \
     * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3ZDE3NTVlZmU2ZmViNmUzNGE4NWNkYSIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJoZWxwQG5vZGViZWF0cy5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWRkZWRPbiI6IjIwMTYtMDktMDhUMTQ6Mjc6NDIuNjc3WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTdkMTc1NWVmZTZmZWI2ZTM0YTg1Y2RhIiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ3NTY0NjA0NiwiZXhwIjoxNDc1NzMyNDQ2LCJpc3MiOiI1N2QxNzU1ZWZlNmZlYjZlMzRhODVjZGEifQ.y0U0FeQJRlXIRX0iTUZSa1WrqLfIAqsun25pfF0rtio82o5engk17snLBkRzcah187sGPcmWfZcDSLL_Uu0V8w"
     *
     *
     *
     * @apiSuccess {String} _id  object id of API Route access data.
     * @apiSuccess {String} roleName  title of the role entered by the user.
     * @apiSuccess {String} routeApi  API route access url.
     * @apiSuccess {Boolean} active   active bit status.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *                "_id": "57f33e6fb01d0b1b04a2e0ed",
     *                "roleName": "writer,admin",
     *                "routeApi": "/api/cloudinary",
     *                "active": true
     *            }
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
     * @apiError  (NotFound) {String} message  Route api not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "Route api not found"
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

        .get(function(req, res){
            res.status(HTTPStatus.OK);
            res.json(req.apiAccessInfo);
        })

        /**
         * @api {patch} /api/access/:apiAccessId Deletes existing API Route Access Information
         * @apiPermission admin
         * @apiName deleteApiAccessInfo
         * @apiGroup API Access Management
         *
         * @apiParam {String} apiAccessId Object ID of the API Access Route data
         *
         *
         *
         * @apiParamExample {json} Request-Example:
         *     {
         *       "apiAccessId": "57f33e6fb01d0b1b04a2e0ed"
         *     }
         *
         * @apiDescription Deletes existing API Route access information from the system.
         * @apiVersion 0.0.1
         * @apiHeader (AuthorizationHeader) {String} authorization x-access-token value.
         * @apiHeaderExample {json} Header-Example:
         *{
         *  "x-access-token": "yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c"
         * }
         *
         * @apiExample {curl} Example usage:
         *
         * curl \
         * -v \
         * -X PATCH  \
         * http://localhost:3000/api/access/57f33e6fb01d0b1b04a2e0ed \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3ZDE3NTVlZmU2ZmViNmUzNGE4NWNkYSIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJoZWxwQG5vZGViZWF0cy5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWRkZWRPbiI6IjIwMTYtMDktMDhUMTQ6Mjc6NDIuNjc3WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTdkMTc1NWVmZTZmZWI2ZTM0YTg1Y2RhIiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ3NTU2NTg3OCwiZXhwIjoxNDc1NjUyMjc4LCJpc3MiOiI1N2QxNzU1ZWZlNmZlYjZlMzRhODVjZGEifQ.D5FJ7i6ycZBhYc-kHni6WnjCOGCEZBMsZu9yeCajO_bhVzH-muqUvZ6K5072vwO7LoKB0eTKa1friGngrpRJ9w"
         *
         *
         * @apiSuccess {String} message Route api for api access management deleted successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "Route api for api access management deleted successfully"
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

        .patch( apiAccessController.deleteApiAccessInfo )

        /**
         * @api {put} /api/access/:apiAccessId Updates existing API Route Access Information
         * @apiPermission admin
         * @apiName updateApiAccessInfo
         * @apiGroup API Access Management
         *
         * @apiParam {String} apiAccessId Object ID of the API Access Route data
         *
         *
         *
         * @apiParamExample {json} Request-Example:
         *     {
         *       "apiAccessId": "57f33e6fb01d0b1b04a2e0ed"
         *     }
         *
         * @apiDescription Updates existing API Route access information to the database so that users with specified roles only can access the API route.
         * @apiVersion 0.0.1
         * @apiHeader (AuthorizationHeader) {String} authorization x-access-token value.
         * @apiHeaderExample {json} Header-Example:
         *{
         *  "x-access-token": "yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c"
         * }
         *
         * @apiExample {curl} Example usage:
         *
         * curl \
         * -v \
         * -X PUT  \
         * http://localhost:3000/api/access/57f33e6fb01d0b1b04a2e0ed \
         * -H 'Content-Type: application/json' \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3ZDE3NTVlZmU2ZmViNmUzNGE4NWNkYSIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJoZWxwQG5vZGViZWF0cy5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWRkZWRPbiI6IjIwMTYtMDktMDhUMTQ6Mjc6NDIuNjc3WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTdkMTc1NWVmZTZmZWI2ZTM0YTg1Y2RhIiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ3NTU2NTg3OCwiZXhwIjoxNDc1NjUyMjc4LCJpc3MiOiI1N2QxNzU1ZWZlNmZlYjZlMzRhODVjZGEifQ.D5FJ7i6ycZBhYc-kHni6WnjCOGCEZBMsZu9yeCajO_bhVzH-muqUvZ6K5072vwO7LoKB0eTKa1friGngrpRJ9w" \
         * -d '{"roleName": "agent,accountant", "routeApi": "/api/testimonial33",  "active": true}'
         *
         *
         * @apiSuccess {String} message Route api for api access management updated successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "Route api for api access management updated successfully"
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
         *
         * @apiError  (BadRequest) {String} message Validation errors due to not entering values for roleName and routeApi
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *
         *     {
         *       "message":[
         *                      {
         *                           "param": "routeApi",
         *                           "msg": "Route api is required"
         *                       },
         *                       {
         *                           "param": "roleName",
         *                           "msg": "Role is required"
         *                       }
         *                 ]
         *     }
         *
         *
         *
         * @apiError  (AlreadyExists)  {String} message  Route api with same api route already exists
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 409 Conflict
         *     {
         *       "message": "Route api with same api route already exists"
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

        .put( apiAccessController.updateApiAccessInfo );


//function declaration to return api access route information data, if exists, else return not found message
    function getAllApiAccess(req, res, next) {
        apiAccessController.getApiAccess(req)
            .then(function(routes){
                if (routes) {
                    res.status(HTTPStatus.OK);
                    res.json(routes);
                } else {
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.apiAccess.notFound
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    }

    return apiAccessRouter;

})();

module.exports = apiAccessRoutes;