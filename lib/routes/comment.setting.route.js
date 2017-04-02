var commentSettingRoutes = (function () {

    'use strict';

    var HTTPStatus = require('http-status'),
        express = require('express'),
        messageConfig = require('../configs/api.message.config'),
        tokenAuthMiddleware = require('../middlewares/token.authentication.middleware'),
        roleAuthMiddleware = require('../middlewares/role.authorization.middleware'),
        commentSettingController = require('../controllers/comment.setting.server.controller'),
        commentSettingRouter = express.Router();

    commentSettingRouter.route('/')

    /**
     * @api {get} /api/commentsetting/ Get comment setting information object
     * @apiPermission public
     * @apiName getCommentSetting
     * @apiGroup CommentSetting
     * @apiDescription Retrieves the comment setting Information Object, if exists, else return empty object
     * @apiVersion 0.0.1
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/commentsetting"
     *
     *
     * @apiSuccess {String} _id  object id of the comment setting data
     * @apiSuccess {String} disqusUsername username registered disqus commenting system.
     * @apiSuccess {String} disqusURL  url associated with the disqus account.
     * @apiSuccess {String} disqusApiKey  api key provided by disqus system to do various administrative tasks on disqus system.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *           "_id": "5790a9adcd8a624a755441a1",
     *           "disqusApiKey": "1225649LOIkdie1569URYRI",
     *           "disqusURL": "shrawan.com",
     *           "disqusUsername": "shrawan"
     *       }
     *
     *
     * @apiError  (NotFound) {String} message  Comment setting not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "comment setting not found"
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
        .get(  getCommentSetting )

        /**
         * @api {post} /api/commentsetting/ Post comment setting Information
         * @apiPermission admin
         * @apiName postCommentSetting
         * @apiGroup CommentSetting
         *
         * @apiParam {String} disqusURL Mandatory  URL associated with the disqus account.
         *
         * @apiDescription saves comment setting information to the database so that we can use disqus comment system in our website
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
         * -X POST \
         * http://localhost:3000/api/commentsetting/ \
         * -H 'Content-Type: application/json' \
         * -H 'x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2OTA5ODI4MiwiZXhwIjoxNDY5MTE4MjgyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.wMoAkOzuqlE90acOSV6NLhyPRJHAii40iNCzSUx_33Sj7Nc5SfEjEDYI-qeuIkB_W22b_NhAN9yR0eGLM2oZLg' \
         * -d '{"disqusUsername":"shrawan","disqusURL":"shrawan.com","disqusApiKey":"1225649LOIkdie1569URYRI"}'
         *
         * @apiSuccess {String} message Comment setting saved successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "Comment setting saved successfully"
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
         * @apiError  (AlreadyExists)  {String} message  comment setting already exists. You can only update the data once data is inserted. New data inserts is not allowed
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 409 Conflict
         *     {
         *       "message": "comment setting already exists. You can only update the data once data is inserted."
         *     }
         *
         *
         * @apiError  (BadRequest) {String} message  Url associated with the disqus account is required.
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *     {
         *       "message":"Disqus URL is required"
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

        .post( tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, commentSettingController.postCommentSetting );


    //middleware function that will get the comment setting object for each of the routes defined downwards starting with /api/commentsetting/:commentSettingId
    commentSettingRouter.use('/:commentSettingId', tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize,  function(req, res, next){
        commentSettingController.getCommentSettingByID(req)
            .then(function(commentSettingInfo){
                //saving in request object so that it can be used for other operations like updating data using put and patch method
                if(commentSettingInfo){
                    req.commentSettingInfo = commentSettingInfo;
                    next();
                    return null;// return a non-undefined value to signal that we didn't forget to return promise
                }else{
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.commentSetting.notFoundCommentSetting
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    });

    commentSettingRouter.route('/:commentSettingId')

    /**
     * @api {get} /api/commentsetting/:commentSettingId Get comment setting information object by Id
     * @apiPermission admin
     * @apiName getCommentSettingByID
     * @apiGroup CommentSetting
     *
     *
     * @apiParam {String} commentSettingId  object id of the comment setting data
     *
     * @apiParamExample {json} Request-Example:
     *     {
     *       "commentSettingId": "5790a9adcd8a624a755441a1"
     *     }
     *
     *
     * @apiDescription Retrieves the comment setting Information Object by Id, if exists, else return empty object
     * @apiVersion 0.0.1
     * @apiHeader (AuthorizationHeader) {String} authorization x-access-token value.
     * @apiHeaderExample {json} Header-Example:
     *  {
     *  "x-access-token": "yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c"
     * }
     *
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/commentsetting/5790a9adcd8a624a755441a1"
     *
     *
     * @apiSuccess {String} _id  object id of the comment setting data
     * @apiSuccess {String} disqusUsername username registered disqus commenting system.
     * @apiSuccess {String} disqusURL  url associated with the disqus account.
     * @apiSuccess {String} disqusApiKey  api key provided by disqus system to do various administrative tasks on disqus system.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *           "_id": "5790a9adcd8a624a755441a1",
     *           "disqusApiKey": "1225649LOIkdie1569URYRI",
     *           "disqusURL": "shrawan.com",
     *           "disqusUsername": "shrawan"
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
     * @apiError  (NotFound) {String} message  comment setting not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "comment setting not found"
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
            res.json( req.commentSettingInfo );
        })
        /**
         * @api {put} /api/commentsetting/:commentSettingId Updates existing comment setting Information object
         * @apiPermission admin
         * @apiName updateCommentSetting
         * @apiGroup CommentSetting
         *
         * @apiParam {String} commentSettingId  object id of the comment setting data
         *
         * @apiParamExample {json} Request-Example:
         *     {
         *       "commentSettingId": "5790a9adcd8a624a755441a1"
         *     }
         *
         *
         * @apiDescription Updates existing comment setting information to the database
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
         * http://localhost:3000/api/commentsetting/5790a9adcd8a624a755441a1 \
         * -H 'Content-Type: application/json' \
         * -H 'x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2OTA5ODI4MiwiZXhwIjoxNDY5MTE4MjgyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.wMoAkOzuqlE90acOSV6NLhyPRJHAii40iNCzSUx_33Sj7Nc5SfEjEDYI-qeuIkB_W22b_NhAN9yR0eGLM2oZLg' \
         * -d '{"disqusUsername":"shrawan-lakhe","disqusURL":"shrawan.com.np","disqusApiKey":"EEEEE1225649LOIkdie1569URYRI"}'
         *
         * @apiSuccess {String} message comment setting updated successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "comment setting updated successfully"
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
         * @apiError  (BadRequest) {String} message  Url associated with the disqus account is required.
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *     {
         *       "message":"Disqus URL is required"
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

        .put( tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize,  commentSettingController.updateCommentSetting );


    //function declaration to return comment setting information object to the client, if exists, else return not found message
    function getCommentSetting(req, res, next) {
        commentSettingController.getCommentSetting()
            .then(function(commentSettingInfo){
                //if exists, return data in json format
                if (commentSettingInfo) {
                    res.status(HTTPStatus.OK);
                    res.json(commentSettingInfo);
                } else {
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.commentSetting.notFoundCommentSetting
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    }


    return commentSettingRouter;

})();

module.exports = commentSettingRoutes;