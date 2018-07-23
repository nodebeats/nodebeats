var cloudinarySettingRoutes = (function () {

    'use strict';
    
    var express = require('express'),
        CloudinarySettingRouter = express.Router(),
        HTTPStatus = require('http-status'),
        tokenAuthMiddleware = require('../middlewares/token.authentication.middleware'),
        roleAuthMiddleware = require('../middlewares/role.authorization.middleware'),
        messageConfig = require('../configs/api.message.config'),
        CloudinarySettingController = require('../controllers/cloudinary.setting.server.controller');


    CloudinarySettingRouter.route('/')

    /**
     * @api {get} /api/cloudinary/ Get Cloudinary Configuration Info
     * @apiPermission admin
     * @apiName getCloudinarySetting
     * @apiGroup CloudinarySetting
     * @apiDescription Retrieves the cloudinary setting Information Object if exists, else return empty object
     * @apiVersion 0.0.1
     * @apiHeader (AuthorizationHeader) {String} authorization x-access-token value.
     * @apiHeaderExample {json} Header-Example:
     *{
     *  "x-access-token": "yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c"
     * }
     *
     * @apiExample {curl} Example usage:
     * curl -i http://localhost:3000/api/cloudinary
     *
     *
     * @apiSuccess {String} _id object id of the cloudinary image service provider configuration data
     * @apiSuccess {String} cloudinaryCloudName Cloudinary unique cloud name of the cloudinary image service provider.
     * @apiSuccess {String} cloudinaryApiKey  Cloudinary api key of the cloudinary image service provider.
     * @apiSuccess {String} cloudinaryApiSecret  Cloudinary api secret of the cloudinary image service provider.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *        "_id": "572851f93bb09ae711af45b8",
     *         "cloudinaryCloudName": "nodebeats",
     *         "cloudinaryApiKey": "3659",
     *         "cloudinaryApiSecret": "25369"
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
     * @apiError  (NotFound) {String} message  Cloudinary setting not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "Cloudinary Setting not found"
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
        .get(  getCloudinarySetting )

        /**
         * @api {post} /api/cloudinary/ Post Cloudinary Configuration Info
         * @apiPermission admin
         * @apiName postCloudinarySetting
         * @apiGroup CloudinarySetting
         *
         * @apiParam {String} cloudinaryCloudName Mandatory Cloudinary unique cloud name of the cloudinary image service provider.
         * @apiParam {String} cloudinaryApiKey Mandatory Cloudinary api key of the cloudinary image service provider.
         * @apiParam {String} cloudinaryApiSecret Mandatory Cloudinary api secret of the cloudinary image service provider.
         *
         * @apiDescription saves cloudinary setting information to the database so that we can upload images to the cloudinary server
         * @apiVersion 0.0.1
         * @apiHeader (AuthorizationHeader) {String} authorization x-access-token value.
         * @apiHeaderExample {json} Header-Example:
         *{
         *  "x-access-token": "yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c"
         * }
         *
         * @apiExample {curl} Example usage:
         *curl \
         * -v \
         * -X POST \
         * http://localhost:3000/api/cloudinary \
         * -H 'Content-Type: application/json' \
         * -H 'x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODMxNjg4MiwiZXhwIjoxNDY4MzM2ODgyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.agd70Nk8y4bcORqzQP4eTSZW_3lN9TpC9zIpKM5j98RkNqS43qVPRQyN3DfRS6CKblHyvYASisvQGpCvJSyfgw' \
         *-d '{"cloudinaryCloudName":"davidwalsh","cloudinaryApiKey":"something","cloudinaryApiSecret":"hello"}'
         *
         *
         * @apiSuccess {String} message Cloudinary setting saved successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "Cloudinary setting saved successfully"
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
         * @apiError  (AlreadyExists)  {String} message  Cloudinary setting configuration already exists, only can update existing data. new inserts is not allowed
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 409 Conflict
         *     {
         *       "message": "You can only update cloudinary setting"
         *     }
         *
         *
         * @apiError  (BadRequest) {String[]} message  Cloudinary setting post method throws validation error if either of cloudinaryCloudName, cloudinaryApiKey and cloudinaryApiSecret is not provided
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *     {
         *       "message": "[{"param":"cloudinaryApiSecret","msg":"Cloudinary api secret is required"}]"
         *     }
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

        .post(  tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize,  CloudinarySettingController.postCloudinarySetting );


    //middleware function that will get the cloudinary configuration setting object for each of the routes defined downwards
    CloudinarySettingRouter.use('/:cloudinarySettingId',  function(req, res, next){
        CloudinarySettingController.getCloudinarySettingByID(req)
            .then(function(cloudinarySettingInfo){
                //saving in request object so that it can be used for other operations like updating data using put and patch method
                if(cloudinarySettingInfo){
                    req.cloudinarySettingInfo = cloudinarySettingInfo;
                    next();
                    return null;// return a non-undefined value to signal that we didn't forget to return promise
                }else{
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.cloudinary.notFound
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    });

    CloudinarySettingRouter.route('/:cloudinarySettingId')

    /**
     * @api {get} /api/cloudinary/:cloudinarySettingId Get Cloudinary Configuration Info By Id
     * @apiPermission admin
     * @apiName getCloudinarySettingByID
     * @apiGroup CloudinarySetting
     *
     *
     * @apiParam {String} cloudinarySettingId  object id of the cloudinary object data
     *
     *  * @apiParamExample {json} Request-Example:
     *     {
     *       "cloudinarySettingId": "57889ae9585d9632523f1234"
     *     }
     *
     *
     * @apiDescription Retrieves the cloudinary setting object by querying against id
     * @apiVersion 0.0.1
     * @apiHeader (AuthorizationHeader) {String} authorization x-access-token value.
     * @apiHeaderExample {json} Header-Example:
     *{
     *  "x-access-token": "yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c"
     * }
     *
     * @apiExample {curl} Example usage:
     *curl -i http://localhost:3000/api/cloudinary/572851f93bb09ae711af45b8
     *
     *
     * @apiSuccess {String} _id Cloudinary setting object id.
     * @apiSuccess {String} cloudinaryCloudName Cloudinary unique cloud name of the cloudinary image service provider.
     * @apiSuccess {String} cloudinaryApiKey  Cloudinary api key of the cloudinary image service provider.
     * @apiSuccess {String} cloudinaryApiSecret  Cloudinary api secret of the cloudinary image service provider.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *        "_id": "572851f93bb09ae711af45b8",
     *         "cloudinaryCloudName": "nodebeats",
     *         "cloudinaryApiKey": "3659",
     *         "cloudinaryApiSecret": "25369"
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
     * @apiError (NotFound)  {String} message  Cloudinary setting not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "Cloudinary Setting not found"
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
            res.json( req.cloudinarySettingInfo );
        })
        /**
         * @api {put} /api/cloudinary/:cloudinarySettingId Update Cloudinary Configuration Info
         * @apiPermission admin
         * @apiName updateCloudinarySetting
         * @apiGroup CloudinarySetting
         *
         *
         * @apiParam {String} cloudinarySettingId  object id of the cloudinary object data
         *
         *  * @apiParamExample {json} Request-Example:
         *     {
         *       "cloudinarySettingId": "57889ae9585d9632523f1234"
         *     }
         *
         *
         *
         * @apiDescription updates existing cloudinary setting information to the database by providing id
         * @apiVersion 0.0.1
         * @apiHeader (AuthorizationHeader) {String} authorization x-access-token value.
         * @apiHeaderExample {json} Header-Example:
         *{
         *  "x-access-token": "yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c"
         * }
         *
         * @apiExample {curl} Example usage:
         *curl \
         * -v \
         * -X PUT \
         * http://localhost:3000/api/cloudinary/57858fa52c24a6b90e40d6b1 \
         * -H 'Content-Type: application/json' \
         * -H 'x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODMxNjg4MiwiZXhwIjoxNDY4MzM2ODgyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.agd70Nk8y4bcORqzQP4eTSZW_3lN9TpC9zIpKM5j98RkNqS43qVPRQyN3DfRS6CKblHyvYASisvQGpCvJSyfgw' \
         * -d '{"cloudinaryCloudName":"davidwalsh","cloudinaryApiKey":"something","cloudinaryApiSecret":"hello"}'
         *
         *
         * @apiSuccess {String} message Cloudinary setting updated successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "Cloudinary setting updated successfully"
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
         * @apiError  (BadRequest) {String[]} message  Cloudinary setting put method throws validation error if either of cloudinaryCloudName, cloudinaryApiKey and cloudinaryApiSecret is not provided
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *     {
         *       "message": "[{"param":"cloudinaryApiSecret","msg":"Cloudinary api secret is required"}]"
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


        .put(  tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize,  CloudinarySettingController.updateCloudinarySetting );


    //function declaration to return cloudinary setting information object to the client if exists else return not found message
    function getCloudinarySetting(req, res, next) {
        CloudinarySettingController.getCloudinarySetting()
            .then(function(cloudinarySetting){
                //if exists, return data in json format
                if (cloudinarySetting) {
                    res.status(HTTPStatus.OK);
                    res.json(cloudinarySetting);
                } else {
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.cloudinary.notFound
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    }

    return CloudinarySettingRouter;

})();

module.exports = cloudinarySettingRoutes;