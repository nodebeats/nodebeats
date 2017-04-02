var googleAnalyticsRoutes = (function () {

    'use strict';

    var HTTPStatus = require('http-status'),
        express = require('express'),
        tokenAuthMiddleware = require('../middlewares/token.authentication.middleware'),
        roleAuthMiddleware = require('../middlewares/role.authorization.middleware'),
        messageConfig = require('../configs/api.message.config'),
        documentFilePath = './public/uploads/documents/google-analytics/',
        uploadPrefix = 'googleanalytics-jsonconfig',
        fileUploadHelper = require('../helpers/file.upload.helper')('', documentFilePath, uploadPrefix),
        documentUploader = fileUploadHelper.documentUploader,
        googleAnalyticsController = require('../controllers/google.analytics.server.controller'),
        googleAnalyticsRouter = express.Router();

    googleAnalyticsRouter.route('/')


    /**
     * @api {get} /api/analytics/ Get Google analytics configuration Info
     * @apiPermission admin
     * @apiName getGoogleAnalyticsConfig
     * @apiGroup GoogleAnalytics
     * @apiDescription Retrieves google analytics configuration setting Information if exists, else return empty object so that we can use this information to show our website analytics in our dashboard
     * @apiVersion 0.0.1
     * @apiHeader (AuthorizationHeader) {String} authorization x-access-token value.
     * @apiHeaderExample {json} Header-Example:
     *{
     *  "x-access-token": "yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c"
     * }
     *
     * @apiExample {curl} Example usage:
     *curl -i http://localhost:3000/api/analytics
     *
     *
     * @apiSuccess {String} _id object id of the google analytics config data
     * @apiSuccess {String} analyticsViewID  Google Analytics view id that is provided by google when signup with google analytics is successfull
     * @apiSuccess {String} serviceAccountKeyFileName  name of the file that contains the key configuration setting options which we can also get from google analytics dashboard
     * @apiSuccess {String} trackingId  Tracking ID that we will use to gather analytics data
     * @apiSuccess {Number} pollingInterval  number value that we will use to poll the google analytics api to show real time analytics data
     * @apiSuccess {String} docProperties.docPath  path of the document file that we have uploaded to the system
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *    {
     *      "_id": "578481514086485d1bfd44a5",
     *      "analyticsViewID": "112272040",
     *      "serviceAccountKeyFileName": "googleanalytics-jsonconfig-1468301648992.json",
     *      "trackingId": "UA-81675690-1",
     *      "pollingInterval": 59997,
     *      "docProperties": {
     *          "docPath": "configs/googleanalytics-jsonconfig-1468301648992.json"
     *      }
     *    }
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
     * @apiError (NotFound)  {String} message  Google analytics configuration setting not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
    *       "message": "Google analytics configuration not found"
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
        .get( tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, getGoogleAnalyticsConfig )

        /**
         * @api {post} /api/analytics/ Post Google analytics configuration Info
         * @apiPermission admin
         * @apiName postGoogleAnalyticsConfig
         * @apiGroup GoogleAnalytics
         *
         * @apiParam {String} serviceAccountKeyFileName Mandatory name of the file that contains the key configuration setting options which we can also get from google analytics dashboard
         * @apiParam {String} analyticsViewID  Mandatory Google Analytics view id that is provided by google when signup with google analytics is successfull
         * @apiParam {String}  trackingId  Mandatory Tracking ID that we will use to gather analytics data
         *
         * @apiDescription saves google analytics information to the database along with upload of service configuration json file
         * @apiVersion 0.0.1
         * @apiHeader (AuthorizationHeader) {String} authorization x-access-token value.
         * @apiHeaderExample {json} Header-Example:
         *{
        *  "x-access-token": "yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c"
        * }
         *
         * @apiExample {curl} Example usage:
         * curl \
         * -v \
         * -X POST  \
         * http://localhost:3000/api/analytics/ \
         * -H "Content-Type: multipart/form-data"  \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODQ5NDE5MSwiZXhwIjoxNDY4NTE0MTkxLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.51wyhhN2KuppBirmszoyGf8G7d70l49DA_O1qamcwoqTLkKelioH8rVokjDznUqK7xrhhJLXcWZXAkuHL0wcKQ" \
         * -F documentName=@securityconfigs/bitsbeat-902f2983ff85.json  \
         * -F "data={\"trackingId\": \"UA-81675690-1\",\"analyticsViewID\": \"22365698\"};type=application/json"
         * @apiSuccess {String} message Google analytics configuration object saved successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "Google analytics saved successfully"
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
         * @apiError (AlreadyExists)  {String} message  Google Analytics setting configuration already exists, only can update existing data. new inserts is not allowed
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 409 Conflict
         *     {
         *       "message": "You can only update google analytics configuration"
         *     }
         *
         *
         * @apiError (BadRequest)   {String} message  if google analytics service configuration json file is not uploaded, then the api throws upload warning message
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *     {
         *       "message": "Please upload google analytics config json file"
         *     }
         *
         * @apiError  (BadRequest) {Array} message  Google Analytics setting configuration setting post method throws validation error if either of trackingId, analyticsViewID is not provided
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *     {
         *       "message": "[{"param":"trackingId","msg":"Google analytics tracking ID is required"}]"
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


        .post(tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, documentUploader.single('documentName'), googleAnalyticsController.postGoogleAnalyticsConfig);


    //middleware function that will be executed for every routes below this to get google analytics using google analytics configuration id as parameter
    googleAnalyticsRouter.use('/:googleAnalyticsConfigId', tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, function (req, res, next) {
        googleAnalyticsController.getGoogleAnalyticsConfigByID(req)
            .then(function(googleAnalyticsConfig){
                //saving in request object so that it can be used for other operations like updating data using put and patch method
                if(googleAnalyticsConfig){
                    req.googleAnalyticsData = googleAnalyticsConfig;
                    next();
                    return null;// return a non-undefined value to signal that we didn't forget to return promise
                }else{
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.googleAnalytics.notFound
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    });

    googleAnalyticsRouter.route('/:googleAnalyticsConfigId')

    /**
     * @api {get} /api/analytics/:googleAnalyticsConfigId Get Google analytics configuration Info by Id
     * @apiPermission admin
     * @apiName getGoogleAnalyticsConfigByID
     * @apiGroup GoogleAnalytics
     *
     *
     * @apiParam {String} googleAnalyticsConfigId  object id of the google analytics data
     *
     *  * @apiParamExample {json} Request-Example:
     *     {
     *       "googleAnalyticsConfigId": "57889ae9585d9632523f1234"
     *     }
     *
     *
     * @apiDescription Retrieves google analytics configuration setting object using googleAnalyticsConfigId as id value if exists, else return empty object
     * @apiVersion 0.0.1
     * @apiHeader (AuthorizationHeader) {String} authorization x-access-token value.
     * @apiHeaderExample {json} Header-Example:
     *{
     *  "x-access-token": "yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c"
     * }
     *
     * @apiExample {curl} Example usage:
     *curl -i http://localhost:3000/api/analytics/5785e775800f297645eeabe7
     *
     *
     * @apiSuccess {String} _id object id of the google analytics config data
     * @apiSuccess {String} analyticsViewID  Google Analytics view id that is provided by google when signup with google analytics is successfull
     * @apiSuccess {String} serviceAccountKeyFileName  name of the file that contains the key configuration setting options which we can also get from google analytics dashboard
     * @apiSuccess {String} trackingId  Tracking ID that we will use to gather analytics data
     * @apiSuccess {Number} pollingInterval  number value that we will use to poll the google analytics api to show real time analytics data
     * @apiSuccess {String} docProperties.docPath  path of the document file that we have uploaded to the system
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *    {
     *      "_id": "578481514086485d1bfd44a5",
     *      "analyticsViewID": "112272040",
     *      "serviceAccountKeyFileName": "googleanalytics-jsonconfig-1468301648992.json",
     *      "trackingId": "UA-81675690-1",
     *      "pollingInterval": 59997,
     *      "docProperties": {
     *          "docPath": "configs/googleanalytics-jsonconfig-1468301648992.json"
     *      }
     *    }
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
     * @apiError  (NotFound) {String} message  GoogleAnalytics setting not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "Google analytics configuration not found"
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


        .get(function (req, res) {
            res.status(HTTPStatus.OK);
            res.json(req.googleAnalyticsData);
        })

        /**
         * @api {put} /api/analytics/:googleAnalyticsConfigId Updates Google analytics configuration Info
         * @apiPermission admin
         * @apiName updateGoogleAnalyticsConfig
         * @apiGroup GoogleAnalytics
         *
         *
         * @apiParam {String} googleAnalyticsConfigId  object id of the google analytics data
         *
         *  * @apiParamExample {json} Request-Example:
         *     {
         *       "googleAnalyticsConfigId": "57889ae9585d9632523f1234"
         *     }
         *
         *
         * @apiDescription updates existing google analytics information to the database along with upload of service configuration json file
         * @apiVersion 0.0.1
         * @apiHeader (AuthorizationHeader) {String} authorization x-access-token value.
         * @apiHeaderExample {json} Header-Example:
         *{
         *  "x-access-token": "yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c"
         * }
         *
         * @apiExample {curl} Example usage:
         * curl \
         * -v \
         * -X PUT  \
         * http://localhost:3000/api/analytics/578771ad155fb8ff03556def \
         * -H "Content-Type: multipart/form-data"  \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODQ5NDE5MSwiZXhwIjoxNDY4NTE0MTkxLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.51wyhhN2KuppBirmszoyGf8G7d70l49DA_O1qamcwoqTLkKelioH8rVokjDznUqK7xrhhJLXcWZXAkuHL0wcKQ" \
         * -F documentName=@securityconfigs/bitsbeat-902f2983ff85.json  \
         * -F "data={\"trackingId\": \"UA-81675690-1\",\"analyticsViewID\": \"22365698\"};type=application/json"
         *
         *
         * @apiSuccess {String} message Google analytics updated successfully
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "Google analytics updated successfully"
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
         * @apiError (BadRequest)   {String} message  if google analytics service configuration json file is not uploaded, then the api throws upload warning message
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *     {
         *       "message": "Please upload google analytics config json file"
         *     }
         *
         * @apiError (BadRequest)  {Array} message  Google Analytics setting configuration setting put method throws error if either of trackingId, analyticsViewID is not provided
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *     {
         *       "message": "[{"param":"trackingId","msg":"Google analytics tracking ID is required"}]"
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


        .put(tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, documentUploader.single('documentName'),  googleAnalyticsController.updateGoogleAnalyticsConfig);


    //function declaration to return google analytics configuration object to the client if exists else return not found message
    function getGoogleAnalyticsConfig(req, res, next) {
        googleAnalyticsController.getGoogleAnalyticsConfig()
            .then(function(googleAnalyticsConfig){
                //if exists, return data in json format
                if (googleAnalyticsConfig) {
                    res.status(HTTPStatus.OK);
                    res.json(googleAnalyticsConfig);
                } else {
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.googleAnalytics.notFound
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    }

    return googleAnalyticsRouter;

})();

module.exports = googleAnalyticsRoutes;
