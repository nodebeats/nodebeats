var googleMapsRoutes = (function () {

    'use strict';

    var HTTPStatus = require('http-status'),
        express = require('express'),
        tokenAuthMiddleware = require('../middlewares/token.authentication.middleware'),
        roleAuthMiddleware = require('../middlewares/role.authorization.middleware'),
        messageConfig = require('../configs/api.message.config'),
        googleMapsController = require('../controllers/google.maps.server.controller'),
        googleMapsRouter = express.Router();


    googleMapsRouter.route('/')
    /**
     * @api {get} /api/maps/ Get Google Maps Config Info
     * @apiPermission public
     * @apiName getGoogleMapsConfig
     * @apiGroup GoogleMaps
     * @apiDescription Retrieves the google maps configuration setting Information Object if exists, else return empty object
     * @apiVersion 0.0.1
     *
     * @apiExample {curl} Example usage:
     * curl -i http://localhost:3000/api/maps
     *
     *
     * @apiSuccess {String} _id object id of the google maps configuration data
     * @apiSuccess {String} placeName name of the place to show in embed map.
     * @apiSuccess {String} mapType  type of map to be shown(Options : 'SATELLITE','ROADMAP','HYBRID','TERRAIN').
     * @apiSuccess {String} markerTitle  title to be shown in the located map position.
     * @apiSuccess {Date} addedOn  date of data entry.
     * @apiSuccess {Boolean} showMarker  to allow marker in the map.
     * @apiSuccess {Int} zoom  Level of zoom feature in map.
     * @apiSuccess {Boolean} scrollWheel To allow scrolling in the google maps.
     * @apiSuccess {Decimal} latitude  latitude position of area.
     * @apiSuccess {Decimal} longitude  longitude position of area.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *     "_id": "570b5e599657cb91395a3427",
     *     "placeName": "Thaiba,Lalitpur,Nepal",
    *       "mapType": "SATELLITE",
    *       "markerTitle": "Thaiba-Ajestapur",
    *       "addedOn": "2016-04-11T08:20:41.049Z",
    *       "showMarker": true,
    *       "zoom": 18,
    *       "scrollWheel": false,
    *       "latitude": 27.623249,
    *       "longitude": 85.344865
    *       }
     *
     *
     * @apiError  (NotFound) {String} message  Google maps configuration not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "Google maps configuration not found"
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

        .get( getGoogleMapsConfig )

        /**
         * @api {post} /api/maps/ Post Google Maps Configuration Info
         * @apiPermission admin
         * @apiName postGoogleMapsConfig
         * @apiGroup GoogleMaps
         *
         * @apiParam {String} placeName  Mandatory name of the place to show in embed map.
         * @apiParam {String} mapType   Mandatory type of map to be shown(Options : 'SATELLITE','ROADMAP','HYBRID','TERRAIN').
         * @apiParam {String} markerTitle   Mandatory title to be shown in the located map position.
         * @apiParam {Int} zoom  Level of  Mandatory zoom feature in map.
         * @apiParam {Decimal} latitude   Mandatory latitude position of area.
         * @apiParam {Decimal} longitude  Mandatory  longitude position of area.
         *
         *
         * @apiDescription saves google maps configuration setting information to the database
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
         * -X POST \
         * http://localhost:3000/api/maps \
         * -H 'Content-Type: application/json' \
         * -H 'x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODQ4MDY1MywiZXhwIjoxNDY4NTAwNjUzLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.vKBqGdyXAHZ4eot90t7dGJ-u-iuCcNCSh-KMmRgzg9zzPFjD5MrW2MgEoJcxfTbVXz4W6pxA5Qtz1YDZPn_5mA' \
         *-d '{"placeName": "Thaiba,Lalitpur,Nepal", "longitude": "85.344865","latitude": "27.622249", "scrollWheel": "false", "zoom": "8", "mapType":"SATELLITE", "showMarker": "true", "markerTitle": "Thaiba-Ajestapur", "googleMapsApiKey": "AIzaSyAzO__WJXnRDR8rglhUQoErr672phnTaYo","addedBy": "Shrawan"}'
         *
         *
         * @apiSuccess {String} message Google maps configuration saved successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "Google maps configuration saved successfully"
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
         * @apiError  (AlreadyExists)  {String} message  Google maps setting configuration already exists, only can update existing data. new inserts is not allowed
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 409 Conflict
         *     {
         *       "message": "You can only update google maps configuration setting"
         *     }
         *
         *
         * @apiError  (BadRequest) {String[]} message  Google maps setting post method throws validation error if either of placeName, longitude, latitude,zoom, mapType, markerTitle and invalid data in mapType, longitude, latitude and zoom  is not provided
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *     {
         *       "message": "[{"param":"zoom","msg":"Zoom for map is required","value":""}]"
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
        .post( tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, googleMapsController.postGoogleMapsConfig );



    //middleware function that will get the google maps configuration setting object for each of the routes defined downwards
    googleMapsRouter.use('/:googleMapsConfigId', tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize,  function(req, res, next){
        googleMapsController.getGoogleMapsConfigByID(req)
            .then(function(googleMapsConfig){

                //saving in request object so that it can be used for other operations like updating data using put and patch method
                if(googleMapsConfig){
                    req.googleMapsData = googleMapsConfig;
                    next();
                    return null;// return a non-undefined value to signal that we didn't forget to return promise
                }else{
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.googleMaps.notFound
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    });

    googleMapsRouter.route('/:googleMapsConfigId')

    /**
     * @api {get} /api/maps/:googleMapsConfigId Get Google Maps Config Info By Id
     * @apiPermission admin
     * @apiName getGoogleMapsConfigByID
     * @apiGroup GoogleMaps
     *
     *
     * @apiParam {String} googleMapsConfigId  object id of the google maps data
     *
     *  * @apiParamExample {json} Request-Example:
     *     {
     *       "googleMapsConfigId": "57889ae9585d9632523f1234"
     *     }
     *
     *
     * @apiDescription Retrieves the google maps configuration setting Information Object by using id if exists, else return empty object
     * @apiVersion 0.0.1
     *
     * @apiHeader (AuthorizationHeader) {String} authorization x-access-token value.
     * @apiHeaderExample {json} Header-Example:
     *{
     *  "x-access-token": "yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c"
     * }
     *
     * @apiExample {curl} Example usage:
     * curl -i http://localhost:3000/api/maps/570b5e599657cb91395a3427
     *
     *
     * @apiSuccess {String} _id object id of the google maps configuration data
     * @apiSuccess {String} placeName name of the place to show in embed map.
     * @apiSuccess {String} mapType  type of map to be shown(Options : 'SATELLITE','ROADMAP','HYBRID','TERRAIN').
     * @apiSuccess {String} markerTitle  title to be shown in the located map position.
     * @apiSuccess {String} googleMapsApiKey api key for google maps api service.
     * @apiSuccess {Date} addedOn  date of data entry.
     * @apiSuccess {Boolean} showMarker  to allow marker in the map.
     * @apiSuccess {Int} zoom  Level of zoom feature in map.
     * @apiSuccess {Boolean} scrollWheel To allow scrolling in the google maps.
     * @apiSuccess {Decimal} latitude  latitude position of area.
     * @apiSuccess {Decimal} longitude  longitude position of area.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *     "_id": "570b5e599657cb91395a3427",
     *     "placeName": "Thaiba,Lalitpur,Nepal",
    *       "mapType": "SATELLITE",
    *       "markerTitle": "Thaiba-Ajestapur",
    *       "googleMapsApiKey": "AIzaSyAzO__WJXnRDR8rglhUQoErr672phnTaYo",
    *       "addedOn": "2016-04-11T08:20:41.049Z",
    *       "showMarker": true,
    *       "zoom": 18,
    *       "scrollWheel": false,
    *       "latitude": 27.623249,
    *       "longitude": 85.344865
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
     * @apiError  (NotFound) {String} message  Google maps configuration not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "Google maps configuration not found"
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
        .get(function(req,res){
            res.status(HTTPStatus.OK);
            res.json(req.googleMapsData);
        })


        /**
         * @api {put} /api/maps/:googleMapsConfigId Updates Google Maps Configuration Info
         * @apiPermission admin
         * @apiName updateGoogleMapsConfig
         * @apiGroup GoogleMaps
         *
         *
         * @apiParam {String} googleMapsConfigId  object id of the google maps data
         *
         *  * @apiParamExample {json} Request-Example:
         *     {
         *       "googleMapsConfigId": "57889ae9585d9632523f1234"
         *     }
         *
         *
         * @apiDescription updates google maps configuration setting information to the database using id as querying parameter
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
         * http://localhost:3000/api/maps/57873d542d20191c3c934c29 \
         * -H 'Content-Type: application/json' \
         * -H 'x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODQ4MDY1MywiZXhwIjoxNDY4NTAwNjUzLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.vKBqGdyXAHZ4eot90t7dGJ-u-iuCcNCSh-KMmRgzg9zzPFjD5MrW2MgEoJcxfTbVXz4W6pxA5Qtz1YDZPn_5mA' \
         *-d '{"placeName": "Thaiba,Lalitpur,Nepal", "longitude": "85.344865","latitude": "27.622249", "scrollWheel": "false", "zoom": "8", "mapType":"SATELLITE", "showMarker": "true", "markerTitle": "Thaiba-Ajestapur", "googleMapsApiKey": "AIzaSyAzO__WJXnRDR8rglhUQoErr672phnTaYo", "addedBy": "Shrawan"}'
         *
         *
         * @apiSuccess {String} message Google maps configuration updated successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "Google maps configuration updated successfully"
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
         * @apiError  (AlreadyExists)  {String} message  Google maps setting configuration already exists, only can update existing data. new inserts is not allowed
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 409 Conflict
         *     {
         *       "message": "You can only update google maps configuration setting"
         *     }
         *
         *
         * @apiError  (BadRequest) {String[]} message  Google maps setting put method throws error if either of placeName, longitude, latitude,zoom, mapType, markerTitle and invalid data in mapType, longitude, latitude and zoom  is not provided
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *     {
         *       "message": "[{"param":"zoom","msg":"Zoom for map is required","value":""}]"
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
        .put( tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, googleMapsController.updateGoogleMapsConfig );



    //function declaration to return google maps configuration setting information object to the client if exists else return not found message
    function getGoogleMapsConfig(req, res, next) {
        googleMapsController.getGoogleMapsConfig()
            .then(function(googleMapsConfig){
                //if exists, return data in json format
                if (googleMapsConfig) {
                    res.status(HTTPStatus.OK);
                    res.json(googleMapsConfig);
                } else {
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.googleMaps.notFound
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    }

    return googleMapsRouter;

})();

module.exports = googleMapsRoutes;