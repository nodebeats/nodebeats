var errorLogRoutes = (function () {

    'use strict';

    var HTTPStatus = require('http-status'),
        express = require('express'),
        tokenAuthMiddleware = require('../middlewares/token.authentication.middleware'),
        roleAuthMiddleware = require('../middlewares/role.authorization.middleware'),
        messageConfig = require('../configs/api.message.config'),
        errorLogController = require('../controllers/error.log.server.controller'),
        errorLogRouter = express.Router();

    errorLogRouter.route('/error/')

    /**
     * @api {get} /api/error/ Get error logs list
     * @apiPermission admin
     * @apiName getErrorLogs
     * @apiGroup ErrorLog
     *
     * @apiParam {Int} perpage  no of items to show per page (as querystring values)
     * @apiParam {Int} page  current page of the pagination system (as querystring values)
     * @apiParam {Date} startdate  initial date of the search query (from)
     * @apiParam {Date} enddate  final date of the search query (upto)
     *
     *   @apiParamExample {json} Request-Example:
     *     {
     *       "perpage": 10,
     *       "page": 1
     *     }
     * @apiParamExample {json} Request-Example:
     *     {
     *       "perpage": 10,
     *       "page": 1,
     *       "startdate": "2016-07-25",
     *       "enddate": "2016-07-27"
     *
     *     }
     *
     * @apiDescription Retrieves the error logs list if exists, else return empty list
     * @apiVersion 0.0.1
     *
     * @apiHeader (AuthorizationHeader) {String} authorization x-access-token value.
     *
     *
     * @apiHeaderExample {json} Header-Example:
     * {
     *  "x-access-token": "yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c"
     * }
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/error" \
     * --data-urlencode "perpage=10" \
     * --data-urlencode "page=1" \
     * -H 'x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3OTRjZjE5OTgwMWYzMWMwZGRiZjkwNyIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJ0ZXN0bm9kZWNtc0BnbWFpbC5jb20iLCJlbWFpbCI6InRlc3Rub2RlY21zQGdtYWlsLmNvbSIsInVzZXJSb2xlIjoiYWRtaW4iLCJhZGRlZE9uIjoiMjAxNi0wNy0yNFQxNDoyMjoxNy45MTNaIiwidHdvRmFjdG9yQXV0aEVuYWJsZWQiOmZhbHNlfSwiY2xhaW1zIjp7InN1YmplY3QiOiI1Nzk0Y2YxOTk4MDFmMzFjMGRkYmY5MDciLCJpc3N1ZXIiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJwZXJtaXNzaW9ucyI6WyJzYXZlIiwidXBkYXRlIiwicmVhZCIsImRlbGV0ZSJdfSwiaWF0IjoxNDY5NTIwNTkxLCJleHAiOjE0Njk2MDY5OTEsImlzcyI6IjU3OTRjZjE5OTgwMWYzMWMwZGRiZjkwNyJ9.JaWwuX9n0jFYefBpXYF76qw365lMpEw7uYPsPBi53egGxVlA9vF7sbnpIm-TwBiFGolYdeHwPQqzzX_gIw8vVQ'
     *
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/error" \
     * --data-urlencode "perpage=10" \
     * --data-urlencode "page=1" \
     * --data-urlencode "startdate=2016-07-26" \
     * -H 'x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3OTRjZjE5OTgwMWYzMWMwZGRiZjkwNyIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJ0ZXN0bm9kZWNtc0BnbWFpbC5jb20iLCJlbWFpbCI6InRlc3Rub2RlY21zQGdtYWlsLmNvbSIsInVzZXJSb2xlIjoiYWRtaW4iLCJhZGRlZE9uIjoiMjAxNi0wNy0yNFQxNDoyMjoxNy45MTNaIiwidHdvRmFjdG9yQXV0aEVuYWJsZWQiOmZhbHNlfSwiY2xhaW1zIjp7InN1YmplY3QiOiI1Nzk0Y2YxOTk4MDFmMzFjMGRkYmY5MDciLCJpc3N1ZXIiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJwZXJtaXNzaW9ucyI6WyJzYXZlIiwidXBkYXRlIiwicmVhZCIsImRlbGV0ZSJdfSwiaWF0IjoxNDY5NTIwNTkxLCJleHAiOjE0Njk2MDY5OTEsImlzcyI6IjU3OTRjZjE5OTgwMWYzMWMwZGRiZjkwNyJ9.JaWwuX9n0jFYefBpXYF76qw365lMpEw7uYPsPBi53egGxVlA9vF7sbnpIm-TwBiFGolYdeHwPQqzzX_gIw8vVQ'
     *
     *
     *
     * @apiSuccess {Array} dataList list of error logs returned .
     * @apiSuccess {String} dataList._id object id for error logs data object.
     * @apiSuccess {String} dataList.errorType  type of error or exception
     * @apiSuccess {String} dataList.errorStack detailed description or brief summary or title of error
     * @apiSuccess {String} dataList.errorMessage detailed description of error
     * @apiSuccess {Date} dataList.addedOn date on which error is logged.
     * @apiSuccess {Boolean} dataList.errorNotified status of the notfication of the error logs to the development team
     * @apiSuccess {Number} totalItems  total no of error logs returned.
     * @apiSuccess {Number} currentPage  current page of pagination.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *           "dataList": [
     *               {
     *                   "_id": "57971aa84eb28c06732485e6",
     *                   "errorType": "Error",
     *                   "errorStack": "Error: getaddrinfo ENOTFOUND accounts.google.com accounts.google.com:443\n    at errnoException (dns.js:26:10)\n    at GetAddrInfoReqWrap.onlookup [as oncomplete] (dns.js:77:26)",
     *                   "errorMessage": "getaddrinfo ENOTFOUND accounts.google.com accounts.google.com:443",
     *                   "addedOn": "2016-07-26T08:09:12.204Z",
     *                   "errorNotified": false
     *               }
     *           ],
     *           "totalItems": 1,
     *           "currentPage": 1
     *       }
     *
     * @apiError (UnAuthorizedError) {String} message authentication token was not supplied or failed
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
     * @apiError  (NotFound) {String} message  Errors logs not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "Errors not found"
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

        .get( tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, getErrorLogs );


    errorLogRouter.route('/error/:errorLogId')

    /**
     * @api {put} /api/error/:errorLogId Deletes the error log data by Id
     * @apiPermission admin
     * @apiName deleteErrorLog
     * @apiGroup ErrorLog
     *
     * @apiParam {String} errorLogId  object id of the error log data
     *
     * @apiParamExample {json} Request-Example:
     *     {
     *       "errorLogId": "579712af491a529b5f7d30de"
     *     }
     *
     *
     * @apiDescription Deletes existing error log data by object Id
     * @apiVersion 0.0.1
     * @apiHeader (AuthorizationHeader) {String} authorization x-access-token value.
     *
     *
     * @apiHeaderExample {json} Header-Example:
     * {
     *  "x-access-token": "yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c"
     * }
     *
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -v \
     * -X PUT \
     * http://localhost:3000/api/error/579712af491a529b5f7d30de \
     * -H 'x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3OTRjZjE5OTgwMWYzMWMwZGRiZjkwNyIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJ0ZXN0bm9kZWNtc0BnbWFpbC5jb20iLCJlbWFpbCI6InRlc3Rub2RlY21zQGdtYWlsLmNvbSIsInVzZXJSb2xlIjoiYWRtaW4iLCJhZGRlZE9uIjoiMjAxNi0wNy0yNFQxNDoyMjoxNy45MTNaIiwidHdvRmFjdG9yQXV0aEVuYWJsZWQiOmZhbHNlfSwiY2xhaW1zIjp7InN1YmplY3QiOiI1Nzk0Y2YxOTk4MDFmMzFjMGRkYmY5MDciLCJpc3N1ZXIiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJwZXJtaXNzaW9ucyI6WyJzYXZlIiwidXBkYXRlIiwicmVhZCIsImRlbGV0ZSJdfSwiaWF0IjoxNDY5NTE4Nzg3LCJleHAiOjE0Njk2MDUxODcsImlzcyI6IjU3OTRjZjE5OTgwMWYzMWMwZGRiZjkwNyJ9.18Pr3N71Ard5MB_0qK4e1RpyA36LOz2Y64RC9i1T7rQLUqULZbEpwKIQ9qrNX8hY1n5FvVzAnhL2g5AeAr_dtA'
     *
     * @apiSuccess {String} message Error Log deleted successfully.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "message": "Error Log deleted successfully"
     *       }
     *
     * @apiError (UnAuthorizedError) {String} message authentication token was not supplied or failed
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

        .put( tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, errorLogController.deleteErrorLog);


    errorLogRouter.route('/errordeleteall')

    /**
     * @api {put} /api/errordeleteall/  Deletes all the existing error logs from the collection
     * @apiPermission admin
     * @apiName deleteErrorLog
     * @apiGroup ErrorLog
     *
     *
     * @apiDescription Deletes all the existing error logs from the collection
     * @apiVersion 0.0.1
     * @apiHeader (AuthorizationHeader) {String} authorization x-access-token value.
     *
     *
     * @apiHeaderExample {json} Header-Example:
     * {
     *  "x-access-token": "yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c"
     * }
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -v \
     * -X PUT \
     * http://localhost:3000/api/errordeleteall \
     * -H 'x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3OTRjZjE5OTgwMWYzMWMwZGRiZjkwNyIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJ0ZXN0bm9kZWNtc0BnbWFpbC5jb20iLCJlbWFpbCI6InRlc3Rub2RlY21zQGdtYWlsLmNvbSIsInVzZXJSb2xlIjoiYWRtaW4iLCJhZGRlZE9uIjoiMjAxNi0wNy0yNFQxNDoyMjoxNy45MTNaIiwidHdvRmFjdG9yQXV0aEVuYWJsZWQiOmZhbHNlfSwiY2xhaW1zIjp7InN1YmplY3QiOiI1Nzk0Y2YxOTk4MDFmMzFjMGRkYmY5MDciLCJpc3N1ZXIiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJwZXJtaXNzaW9ucyI6WyJzYXZlIiwidXBkYXRlIiwicmVhZCIsImRlbGV0ZSJdfSwiaWF0IjoxNDY5NTE4Nzg3LCJleHAiOjE0Njk2MDUxODcsImlzcyI6IjU3OTRjZjE5OTgwMWYzMWMwZGRiZjkwNyJ9.18Pr3N71Ard5MB_0qK4e1RpyA36LOz2Y64RC9i1T7rQLUqULZbEpwKIQ9qrNX8hY1n5FvVzAnhL2g5AeAr_dtA'
     *
     * @apiSuccess {String} message Error Log deleted successfully.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "message": "Error Log deleted successfully"
     *       }
     *
     *
     *
     *
     * @apiError (UnAuthorizedError) {String} message authentication token was not supplied or token was not verified
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

        .put( tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, deleteAllErrorLogs);

    errorLogRouter.route('/log/notify/error/')

    /**
     * @api {put} /api/log/notify/error/  Notify the software development team of the error logs
     * @apiPermission admin
     * @apiName sendNotificationEmailToSolveErrors
     * @apiGroup ErrorLog
     * @apiDescription Notify the software development team of the error logs generated so that they can analyzed the error logs and fix those potential bugs in future releases
     * @apiVersion 0.0.1
     * @apiHeader (AuthorizationHeader) {String} authorization x-access-token value.
     *
     *
     * @apiHeaderExample {json} Header-Example:
     * {
     *  "x-access-token": "yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c"
     * }
     *
     * @apiExample {curl} Example usage:
     *
     * curl \
     * -v \
     * -X PUT \
     * http://localhost:3000/api/log/notify/error/ \
     * -H 'x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3OTRjZjE5OTgwMWYzMWMwZGRiZjkwNyIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJ0ZXN0bm9kZWNtc0BnbWFpbC5jb20iLCJlbWFpbCI6InRlc3Rub2RlY21zQGdtYWlsLmNvbSIsInVzZXJSb2xlIjoiYWRtaW4iLCJhZGRlZE9uIjoiMjAxNi0wNy0yNFQxNDoyMjoxNy45MTNaIiwidHdvRmFjdG9yQXV0aEVuYWJsZWQiOmZhbHNlfSwiY2xhaW1zIjp7InN1YmplY3QiOiI1Nzk0Y2YxOTk4MDFmMzFjMGRkYmY5MDciLCJpc3N1ZXIiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJwZXJtaXNzaW9ucyI6WyJzYXZlIiwidXBkYXRlIiwicmVhZCIsImRlbGV0ZSJdfSwiaWF0IjoxNDY5NTE4Nzg3LCJleHAiOjE0Njk2MDUxODcsImlzcyI6IjU3OTRjZjE5OTgwMWYzMWMwZGRiZjkwNyJ9.18Pr3N71Ard5MB_0qK4e1RpyA36LOz2Y64RC9i1T7rQLUqULZbEpwKIQ9qrNX8hY1n5FvVzAnhL2g5AeAr_dtA'
     *
     *
     * @apiSuccess {String} message Email containing error logs sent successfully.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "message": "Email containing error logs sent successfully"
     *       }
     *
     * @apiError (UnAuthorizedError) {String} message authentication token was not supplied or token was not verified
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
     * @apiError  (AlreadyExists)  {String} message  All the error logs are already reported.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 409 Conflict
     *     {
     *       "message": "All the error logs are already reported."
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

        .put( tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, errorLogController.sendNotificationEmailToSolveErrors);


    function deleteAllErrorLogs(req, res, next){
        req.query.deleteall = true;
        errorLogController.deleteErrorLog(req, res, next);
    }

    //function declaration to return error logs to the client, if exists, else return not found message
    function getErrorLogs(req, res, next) {
        errorLogController.getErrorLogs(req, next)
            .then(function(lstErrorLogs){
                //if exists, return data in json format
                if(lstErrorLogs){
                    res.status(HTTPStatus.OK);
                    res.json(lstErrorLogs);
                }else{
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.errorLog.notFound
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    }


    return errorLogRouter;

})();

module.exports = errorLogRoutes; 