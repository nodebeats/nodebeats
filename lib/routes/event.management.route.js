var eventManagementRoutes = (function () {

    'use strict';

    var HTTPStatus = require('http-status'),
        express = require('express'),
        messageConfig = require('../configs/api.message.config'),
        tokenAuthMiddleware = require('../middlewares/token.authentication.middleware'),
        roleAuthMiddleware = require('../middlewares/role.authorization.middleware'),
        eventManagementController = require('../controllers/event.management.server.controller'),
        imageFilePath = './public/uploads/images/events/',
        uploadPrefix = 'event',
        fileUploadHelper = require('../helpers/file.upload.helper')(imageFilePath, '', uploadPrefix),
        uploader = fileUploadHelper.uploader,
        eventManagementRouter = express.Router();

    eventManagementRouter.route('/')


    /**
     * @api {get} /api/event/info/ Get events list
     * @apiPermission public
     * @apiName getAllEvents
     * @apiGroup EventManager
     *
     * @apiParam {Boolean} active whether to get data with active bit true or false, if true, then returns data list with active bit set to true only
     * @apiParam {Int} perpage Number of data to return on each request
     * @apiParam {Int} page Current page number of pagination system.
     * @apiParam {String} eventTitle to filter events list using event title as filter param
     *
     *  * @apiParamExample {json} Request-Example:
     *     {
     *       "perpage": 10,
     *       "page": 1
     *     }
     *
     *
     *  * @apiParamExample {json} Request-Example:
     *     {
     *       "active": true,
     *       "eventTitle": "search event list by this title"
     *     }
     *
     * @apiDescription Retrieves the events list if exists, else return empty array
     * @apiVersion 0.0.1
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/event/info" \
     * --data-urlencode "perpage=10" \
     * --data-urlencode "page=1"
     *
     * @apiExample {curl} Example usage:
     *
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/event/info" \
     * --data-urlencode "active=true" \
     * --data-urlencode "eventTitle=Blood Donation Program"
     *
     *
     *
     * @apiSuccess {Array} dataList list of events
     * @apiSuccess {String} dataList._id  object id of event data.
     * @apiSuccess {String} dataList.imageName  name of the image file uploaded.
     * @apiSuccess {String} dataList.venueAddress   address of  event venue.
     * @apiSuccess {String} dataList.venue  place where event will be hosted.
     * @apiSuccess {String} dataList.eventDescription  detail about event.
     * @apiSuccess {String} dataList.urlSlog clearn url for event title.
     * @apiSuccess {String} dataList.eventTitle  title for event.
     * @apiSuccess {Boolean} dataList.active  active bit status.
     * @apiSuccess {String} dataList.endDate  date and time of event ending.
     * @apiSuccess {String} dataList.startDate date and time of event starting.
     * @apiSuccess {Int} totalItems  total no of events in the event collection in database.
     * @apiSuccess {Int} currentPage  current page number of client pagination system.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *           "dataList": [
     *               {
     *                   "_id": "5789bebf57633dcd16a2aea4",
     *                   "imageName": "event-1468645054960.webp",
     *                   "venueAddress": "Kathmandu, Nepal",
     *                   "venue": "Red Cross Building",
     *                   "eventDescription": "Please donate blood and help the blood donation program in any way you can",
     *                   "urlSlog": "blood-donation-program",
     *                   "eventTitle": "Blood Donation Program",
     *                   "active": true,
     *                  "endDate": "2016-07-17T05:14:00.000Z",
     *                   "startDate": "2016-07-16T08:11:00.000Z"
     *               }
     *           ],
     *           "totalItems": 1,
     *           "currentPage": 1
     *       }
     *
     *
     * @apiError  (NotFound) {String} message  Event not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "Event not found"
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
        .get( getAllEvents )



        /**
         * @api {post} /api/event/info/ Post  event data
         * @apiPermission admin
         * @apiName postEvent
         * @apiGroup EventManager
         *
         * @apiParam {String} venueAddress   address of  event venue.
         * @apiParam {String} venue  place where event will be hosted.
         * @apiParam {String} eventDescription  detail about event.
         * @apiParam {String} eventTitle  title for event.
         * @apiParam {String} startDate date and time of event starting.
         *
         * @apiDescription saves event information to the database
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
         * -X POST  \
         * http://localhost:3000/api/event/info/ \
         * -H "Content-Type: multipart/form-data"  \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODY0NzI1NSwiZXhwIjoxNDY4NjY3MjU1LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.ijpe38jarVwV3de5_JV4FL51U9RbIWvVzIblV0V7ybw4-zepuUwM5BN3CVOwGb3MQIPxbasa5nWTmIiiZ5nu2A" \
         * -F imageName=@public/images/404_banner.png  \
         * -F "data={\"eventTitle\": \"Blood Donation Program for blood bank\",\"eventDescription\": \"Please donate blood and help the blood donation program in any way you can\",\"venue\": \"Red Cross Building\",\"venueAddress\": \"Kathmandu, Nepal\",\"startDate\": \"2016-09-21\",\"endDate\": \"2016-09-23\"};type=application/json"
         *
         *
         * @apiSuccess {String} message Event saved successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "Event saved successfully"
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
         * @apiError  (AlreadyExists)  {String} message  Event with same title already exists
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 409 Conflict
         *     {
         *       "message": "Event with same title already exists"
         *     }
         *
         *
         *
         *
         * @apiError  (BadRequest) {String[]} message Validation Error due to either invalid data entry or not entering value for required fields
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *
         *     {
         *       "message": [{"param":"eventTitle","msg":"Event title is required","value":""},
         *                  {"param":"venue","msg":"Venue of event is required","value":""},
         *                  {"param":"venueAddress","msg":"Address for venue is required","value":""},
         *                  {"param":"startDate","msg":"Invalid date","value":"2016-02-15dsds"}]
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
        .post( tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, uploader.single('imageName'), fileUploadHelper.imageUpload,  eventManagementController.postEvent );




    //middleware function that will get the event object for each of the routes defined downwards
    eventManagementRouter.use('/:eventId', function(req, res, next){
        eventManagementController.getEventByID(req)
            .then(function(eventInfo){
                //saving in request object so that it can be used for other operations like updating data using put and patch method
                if (eventInfo) {
                    req.eventInfo = eventInfo;
                    next();
                    return null;// return a non-undefined value to signal that we didn't forget to return promise
                } else {
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.eventManager.notFound
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    });


    eventManagementRouter.route('/:eventId')



    /**
     * @api {get} /api/event/info/:eventId Get event by Id
     * @apiPermission public
     * @apiName getEventByID
     * @apiGroup EventManager
     *
     *
     * @apiParam {String} eventId  object id for event data as filter param
     *
     *  * @apiParamExample {json} Request-Example:
     *     {
     *       "eventId": "5789bebf57633dcd16a2aea4"
     *     }
     *
     * @apiDescription Retrieves the events info by using event id to filter data if exists, else return empty object
     * @apiVersion 0.0.1
     *
     * @apiExample {curl} Example usage:
     * curl -i http://localhost:3000/api/event/info/5789bebf57633dcd16a2aea4
     *
     *
     * @apiSuccess {String} _id  object id of event data.
     * @apiSuccess {String} imageName  name of the image file uploaded.
     * @apiSuccess {String} venueAddress   address of  event venue.
     * @apiSuccess {String} venue  place where event will be hosted.
     * @apiSuccess {String} eventDescription  detail about event.
     * @apiSuccess {String} urlSlog clearn url for event title.
     * @apiSuccess {String} eventTitle  title for event.
     * @apiSuccess {Boolean} active  active bit status.
     * @apiSuccess {String} endDate  date and time of event ending.
     * @apiSuccess {String} startDate date and time of event starting.
     * @apiSuccess {Object} imageProperties  meta data of image file.
     * @apiSuccess {String} imageProperties.imageExtension  extension image file.
     * @apiSuccess {String} imageProperties.imagePath  location path of image file.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *           "_id": "5789bebf57633dcd16a2aea4",
     *           "imageName": "event-1468645054960.webp",
     *           "venueAddress": "Kathmandu, Nepal",
     *           "venue": "Red Cross Building",
     *           "eventDescription": "Please donate blood and help the blood donation program in any way you can",
     *           "urlSlog": "blood-donation-program",
     *           "eventTitle": "Blood Donation Program",
     *           "active": true,
     *           "imageProperties": {
     *               "imageExtension": "jpg",
     *               "imagePath": "public/uploads/images/events/event-1468645054960.jpg"
     *           },
     *           "endDate": "2016-07-17T05:14:00.000Z",
     *           "startDate": "2016-07-16T08:11:00.000Z"
     *       }
     *
     *
     * @apiError  (NotFound) {String} message  Event not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "Event not found"
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
            res.json(req.eventInfo);
        })



        /**
         * @api {patch} /api/event/info/:eventId delete existing event data
         * @apiPermission admin
         * @apiName patchEvent
         * @apiGroup EventManager
         *
         *
         * @apiParam {String} eventId  object id for event data as filter param
         *
         *  * @apiParamExample {json} Request-Example:
         *     {
     *       "eventId": "5789bebf57633dcd16a2aea4"
     *     }
         *
         *
         * @apiDescription deletes existing event information from the database
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
         * -X PATCH  \
         * http://localhost:3000/api/event/info/5789c96dae6875bb2d080eb4 \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODY0NzI1NSwiZXhwIjoxNDY4NjY3MjU1LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.ijpe38jarVwV3de5_JV4FL51U9RbIWvVzIblV0V7ybw4-zepuUwM5BN3CVOwGb3MQIPxbasa5nWTmIiiZ5nu2A"
         *
         * @apiSuccess {String} message Event deleted successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "Event deleted successfully"
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
        .patch( tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, eventManagementController.patchEvent )



        /**
         * @api {put} /api/event/info/:eventId updates existing event data
         * @apiPermission admin
         * @apiName updateEvent
         * @apiGroup EventManager
         *
         *
         * @apiParam {String} eventId  object id for event data as filter param
         *
         *  * @apiParamExample {json} Request-Example:
         *     {
     *       "eventId": "5789bebf57633dcd16a2aea4"
     *     }
         *
         *
         * @apiDescription updates event information to the database
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
         * http://localhost:3000/api/event/info/5789c96dae6875bb2d080eb4 \
         * -H "Content-Type: multipart/form-data"  \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODY0NzI1NSwiZXhwIjoxNDY4NjY3MjU1LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.ijpe38jarVwV3de5_JV4FL51U9RbIWvVzIblV0V7ybw4-zepuUwM5BN3CVOwGb3MQIPxbasa5nWTmIiiZ5nu2A" \
         * -F imageName=@public/images/404_banner.png  \
         * -F "data={\"eventTitle\": \"Blood Donation Program for blood bank\",\"eventDescription\": \"Please donate blood and help the blood donation program in any way you can to make in success\",\"venue\": \"Red Cross Building\",\"venueAddress\": \"Kathmandu, Nepal\",\"startDate\": \"2016-09-21\",\"endDate\": \"2016-09-23\"};type=application/json"
         *
         *
         * @apiSuccess {String} message Event updated successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "Event updated successfully"
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
         * @apiError  (AlreadyExists)  {String} message  Event with same title already exists
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 409 Conflict
         *     {
         *       "message": "Event with same title already exists"
         *     }
         *
         *
         *
         *
         * @apiError  (BadRequest) {String[]} message  Validation Error due to either invalid data entry or not entering value for required fields
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *
         *     {
         *       "message": [{"param":"eventTitle","msg":"Event title is required","value":""},
         *                  {"param":"venue","msg":"Venue of event is required","value":""},
         *                  {"param":"venueAddress","msg":"Address for venue is required","value":""},
         *                  {"param":"startDate","msg":"Invalid date","value":"2016-02-15dsds"}]
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
        .put( tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, uploader.single('imageName'), fileUploadHelper.imageUpload, eventManagementController.updateEvent );



    //function declaration to return events list to the client if exists else return  empty array
    function getAllEvents(req, res, next) {
        eventManagementController.getAllEvents(req, next)
            .then(function(events){
                //if exists, return data in json format
                if (events) {
                    res.status(HTTPStatus.OK);
                    res.json(events);
                } else {
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.eventManager.notFound
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    }

    return eventManagementRouter;

})();

module.exports = eventManagementRoutes;