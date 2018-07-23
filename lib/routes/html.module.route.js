var htmlModuleRoutes = (function () {

    'use strict';

    var HTTPStatus = require('http-status'),
        express = require('express'),
        tokenAuthMiddleware = require('../middlewares/token.authentication.middleware'),
        roleAuthMiddleware = require('../middlewares/role.authorization.middleware'),
        messageConfig = require('../configs/api.message.config'),
        htmlModuleController = require('../controllers/html.module.server.controller'),
        htmlModuleRouter =  express.Router();

    htmlModuleRouter.route('/')

    /**
     * @api {get} /api/htmlcontent/ Get Html Module Content list
     * @apiPermission public
     * @apiName getAllHtmlModuleContents
     * @apiGroup HtmlModuleContent
     *
     * @apiParam {Int} perpage Number of data to return on each request
     * @apiParam {Int} page Current page number of pagination system.
     * @apiParam {Boolean} active whether to get data with active bit true or false, if true, then returns data list with active bit set to true only
     * @apiParam {String} htmlContentTitle title of the html content
     *
     * @apiParamExample {json} Request-Example:
     *     {
     *       "perpage": 10,
     *       "page": 1
     *     }
     *
     *   @apiParamExample {json} Request-Example:
     *     {
     *       "active": true,
     *       "htmlContentTitle": "Welcome speech"
     *     }
     *
     *
     * @apiDescription Retrieves the html content list if exists, else return empty array
     * @apiVersion 0.0.1
     *
     * @apiExample {curl} Example usage:
     * curl -i http://localhost:3000/api/htmlcontent
     *
     *
     * @apiSuccess {Array} dataList list of html contents
     * @apiSuccess {String} dataList._id object id of html content data.
     * @apiSuccess {String} dataList.htmlContentTitle title of html content module.
     * @apiSuccess {String} dataList.htmlModuleContent  html content in detail.
     * @apiSuccess {Boolean} dataList.active  active status of the html content data.
     * @apiSuccess {Int} totalItems  total no of html contents in the related collection in database.
     * @apiSuccess {Int} currentPage  current page number of client pagination system.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *           "dataList": [
     *               {
     *                   "_id": "57c7fe7fbdea5da10b70ec4c",
     *                   "htmlModuleContent": "<p>hello brother</p>\n<p>how are you? Hope everything is fine</p>",
     *                   "htmlContentTitle": "myself",
     *                   "active": true
     *               }
     *           ],
     *           "totalItems": 1,
     *           "currentPage": 1
     *       }
     *
     *
     * @apiError  (NotFound) {String} message Html content not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "Html content not found"
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

        .get( getAllHtmlModuleContents )

        /**
         * @api {post} /api/htmlcontent/ Saves html content data
         * @apiPermission admin
         * @apiName postHtmlContent
         * @apiGroup HtmlModuleContent
         * @apiParam {String} htmlContentTitle  Mandatory title of html content module.
         * @apiParam {String} htmlModuleContent  Mandatory html content in detail.
         * @apiDescription Saves html content data in the database
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
         * -X POST \
         * http://localhost:3000/api/htmlcontent \
         * -H 'Content-Type: application/json' \
         * -H 'x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3YjUwOTE0Y2VhZTA2Nzc0OTkzNGQzNiIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJoZWxsb0BiaXRzYmVhdC5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWRkZWRPbiI6IjIwMTYtMDgtMThUMDE6MDI6MTIuMjM3WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTdiNTA5MTRjZWFlMDY3NzQ5OTM0ZDM2IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ3Mjc5NTg4NiwiZXhwIjoxNDcyODgyMjg2LCJpc3MiOiI1N2I1MDkxNGNlYWUwNjc3NDk5MzRkMzYifQ.6QAWr6zFlaeInEAyFZs3k-GNbs7ybL2zZACRRaK-NAGzYW5c9UKTxI0fXyhQO2qJXdPfR9uHK77Ac1uFiNZhyg' \
         * -d '{"htmlContentTitle": "this is the html content title", "htmlModuleContent": "this is the html content in detail","active": "true"}'
         *
         * @apiSuccess {String} message Html content saved successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "Html content saved successfully"
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
         * @apiError  (BadRequest) {String[]} message validation errors due to not entering values for html content title and html content description
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *
         *     {
         *       "message": [
         *           {
         *               "param": "htmlContentTitle",
         *               "msg": "Title for html content is required"
         *           },
         *           {
         *               "param": "htmlModuleContent",
         *               "msg": "Html Content is required"
         *           }
         *       ]
         *   }
         *
         *
         * @apiError  (AlreadyExists)  {String} message  Html content with same title already exists
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 409 Conflict
         *     {
         *       "message": "Html content with same title already exists"
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

        .post( tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, htmlModuleController.postHtmlContent );

//middleware function that will get the html content data object for each of the routes defined downwards having /api/htmlcontent/:htmlContentId route
    htmlModuleRouter.use('/:htmlContentId', function(req, res, next){

        htmlModuleController.getHtmlContentByID(req)
            .then(function(htmlContentInfo){
                //saving in request object so that it can be used for other operations like updating data using put and patch method
                if(htmlContentInfo){
                    req.htmlContentInfo = htmlContentInfo;
                    next();
                    return null;// return a non-undefined value to signal that we didn't forget to return promise
                }else{
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.htmlModule.notFound
                    });
                }

            })
            .catch(function(err){
                return next(err);
            });
    });


    htmlModuleRouter.route('/:htmlContentId')

    /**
     * @api {get} /api/htmlcontent/:htmlContentId  Get Html Module Content data object by Id
     * @apiPermission public
     * @apiName getHtmlContentByID
     * @apiGroup HtmlModuleContent
     * @apiDescription Retrieves the html content data object by Id if exists, else return html content not found message
     * @apiVersion 0.0.1
     *
     * @apiExample {curl} Example usage:
     * curl -i http://localhost:3000/api/htmlcontent/57c7fe7fbdea5da10b70ec4c
     *
     *
     * @apiSuccess {String} _id object id of html content data.
     * @apiSuccess {String} htmlContentTitle title of html content module.
     * @apiSuccess {String} htmlModuleContent  html content in detail.
     * @apiSuccess {Boolean} active  active status of the html content data.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *           "_id": "57c7fe7fbdea5da10b70ec4c",
     *           "htmlModuleContent": "<p>hello brother</p>\n<p>how are you? Hope everything is fine</p>",
     *           "htmlContentTitle": "myself",
     *           "active": true
     *       }
     *
     *
     * @apiError  (NotFound) {String} message Html content not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "Html content not found"
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
            res.json(req.htmlContentInfo);
        })

        /**
         * @api {PATCH} /api/htmlcontent/:htmlContentId  Deletes existing  html content data from the database
         * @apiPermission admin
         * @apiName patchHtmlContent
         * @apiGroup HtmlModuleContent
         * @apiDescription Deletes existing html content data by Id from the database
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
         * -X PATCH \
         * http://localhost:3000/api/htmlcontent/57c7fe7fbdea5da10b70ec4c \
         * -H 'Content-Type: application/json' \
         * -H 'x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3YjUwOTE0Y2VhZTA2Nzc0OTkzNGQzNiIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJoZWxsb0BiaXRzYmVhdC5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWRkZWRPbiI6IjIwMTYtMDgtMThUMDE6MDI6MTIuMjM3WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTdiNTA5MTRjZWFlMDY3NzQ5OTM0ZDM2IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ3Mjc5NTg4NiwiZXhwIjoxNDcyODgyMjg2LCJpc3MiOiI1N2I1MDkxNGNlYWUwNjc3NDk5MzRkMzYifQ.6QAWr6zFlaeInEAyFZs3k-GNbs7ybL2zZACRRaK-NAGzYW5c9UKTxI0fXyhQO2qJXdPfR9uHK77Ac1uFiNZhyg'
         * @apiSuccess {String} message Html content deleted successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "Html content deleted successfully"
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
         * @apiError (InternalServerError)  {String} message  Internal Server Error
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 500 Internal Server Error
         *     {
         *       "message": "Internal Server Error"
         *     }
         *
         */

        .patch( tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, htmlModuleController.patchHtmlContent )

        /**
         * @api {put} /api/htmlcontent/:htmlContentId  Updates existing  html content data by Id
         * @apiPermission admin
         * @apiName updateHtmlContent
         * @apiGroup HtmlModuleContent
         * @apiDescription Updates existing html content data by Id
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
         * -X PUT \
         * http://localhost:3000/api/htmlcontent/57c7fe7fbdea5da10b70ec4c \
         * -H 'Content-Type: application/json' \
         * -H 'x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3YjUwOTE0Y2VhZTA2Nzc0OTkzNGQzNiIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJoZWxsb0BiaXRzYmVhdC5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWRkZWRPbiI6IjIwMTYtMDgtMThUMDE6MDI6MTIuMjM3WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTdiNTA5MTRjZWFlMDY3NzQ5OTM0ZDM2IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ3Mjc5NTg4NiwiZXhwIjoxNDcyODgyMjg2LCJpc3MiOiI1N2I1MDkxNGNlYWUwNjc3NDk5MzRkMzYifQ.6QAWr6zFlaeInEAyFZs3k-GNbs7ybL2zZACRRaK-NAGzYW5c9UKTxI0fXyhQO2qJXdPfR9uHK77Ac1uFiNZhyg' \
         * -d '{"htmlContentTitle": "this is the html content title GOT IT?", "htmlModuleContent": "YEAH I GOT this is the html content in detail","active": "true"}'
         *
         * @apiSuccess {String} message Html content updated successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "Html content updated successfully"
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
         * @apiError  (BadRequest) {String[]} message validation errors due to not entering values for html content title and html content description
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *
         *     {
         *       "message": [
         *           {
         *               "param": "htmlContentTitle",
         *               "msg": "Title for html content is required"
         *           },
         *           {
         *               "param": "htmlModuleContent",
         *               "msg": "Html Content is required"
         *           }
         *       ]
         *   }
         *
         *
         * @apiError  (AlreadyExists)  {String} message  Html content with same title already exists
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 409 Conflict
         *     {
         *       "message": "Html content with same title already exists"
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

        .put( tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, htmlModuleController.updateHtmlContent );

//function declaration to return html content list from the database to the client if exists else return not found message
    function getAllHtmlModuleContents(req, res, next) {
        htmlModuleController.getAllHtmlModuleContents(req, next)
            .then(function(htmlContents){
                //if exists, return data in json format
                if (htmlContents) {
                    res.status(HTTPStatus.OK);
                    res.json(htmlContents);
                } else {
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.htmlModule.notFound
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    }


    return htmlModuleRouter;

})();

module.exports = htmlModuleRoutes;