
var textEditorFileRoute = (function () {

    'use strict';

    var textEditorController = require('../controllers/text.editor.file.server.contorller'),
        tokenAuthMiddleware = require('../middlewares/token.authentication.middleware'),
        roleAuthMiddleware = require('../middlewares/role.authorization.middleware'),
        express = require('express'),
        HTTPStatus = require('http-status'),
        imageFilePath = './public/uploads/images/htmluploads/',
        uploadPrefix = 'htmlupload',
        fileUploadHelper = require('../helpers/file.upload.helper')(imageFilePath, '', uploadPrefix),
        uploader = fileUploadHelper.uploader,
        textEditorRouter = express.Router();


    textEditorRouter.route('/file')

    /**
     *
     * @api {get} /api/texteditor/file/ Get Html Module Content image list.
     * @apiPermission admin
     * @apiName getAllFiles
     * @apiGroup HtmlModuleContent
     *
     * @apiParam {String} module name of the module from which image is uploaded
     *
     *   @apiParamExample {json} Request-Example:
     *     {
     *       "module": "html"
     *     }
     *
     * @apiDescription Retrieves the html content image list if exists, else return empty array
     * @apiVersion 0.0.1
     * @apiHeader (AuthorizationHeader) {String} authorization x-access-token value.
     * @apiHeaderExample {json} Header-Example:
     *{
     *  "x-access-token": "yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c"
     * }
     *
     *
     * @apiExample {curl} Example usage:
     * curl -i http://localhost:3000/api/texteditor/file \
     * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3YjUwOTE0Y2VhZTA2Nzc0OTkzNGQzNiIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJoZWxsb0BiaXRzYmVhdC5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWRkZWRPbiI6IjIwMTYtMDgtMThUMDE6MDI6MTIuMjM3WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTdiNTA5MTRjZWFlMDY3NzQ5OTM0ZDM2IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ3Mjc5NTg4NiwiZXhwIjoxNDcyODgyMjg2LCJpc3MiOiI1N2I1MDkxNGNlYWUwNjc3NDk5MzRkMzYifQ.6QAWr6zFlaeInEAyFZs3k-GNbs7ybL2zZACRRaK-NAGzYW5c9UKTxI0fXyhQO2qJXdPfR9uHK77Ac1uFiNZhyg"
     *
     *
     *
     * @apiSuccess {String} _id object id of the html content image file data.
     * @apiSuccess {String} addedBy admin user's username which add the html content image file.
     * @apiSuccess {Int} h  height of the image file.
     * @apiSuccess {Int} w  width of the image file.
     * @apiSuccess {Int} s  size of the image file.
     * @apiSuccess {String} p  path of the image file.
     * @apiSuccess {String} localPath  local path of the image file.
     * @apiSuccess {String} module  module name from which html content image is added.
     * @apiSuccess {Int} __v  version mongodb.
     * @apiSuccess {Date} addedOn  date of html content image addition.
     * @apiSuccess {Date} t  timestamp of html content image file.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     [
     *        {
     *            "_id": "57c8011b6f1cfc9511055893",
     *            "addedBy": "superadmin",
     *            "h": 350,
     *            "w": 800,
     *            "s": 233381,
     *            "p": "http://res.cloudinary.com/nodebeats/image/upload/htmlupload-1472725275569.jpg",
     *            "localPath": "/home/lakhe/Music/BitsBeat Projects/Final Projects/nodeframework/public/uploads/images/htmluploads/htmlupload-1472725275569.jpg",
     *            "module": "html",
     *            "__v": 0,
     *            "addedOn": "2016-09-01T10:21:15.610Z",
     *            "t": "2016-09-01T10:21:15.610Z"
     *        }
     *   ]
     *
     *
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
     * @apiError  (NotFound) {String} message File not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "File not found"
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

        .get(tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, getAllFiles)

        /**
         * @api {post} /api/texteditor/file/ Saves html content image file to database
         * @apiPermission admin
         * @apiName saveFile
         * @apiGroup HtmlModuleContent
         * @apiParam {String} module  Mandatory name of the module from which html content image is uploaded.
         * @apiParam {String} localPath    Mandatory local path of the image file.
         * @apiParam {String} p   Mandatory  cloudinary path of the image file.
         * @apiParam {String} s   Mandatory  size of the image file.
         * @apiParam {String} w   Mandatory  width of the image file.
         * @apiParam {String} h   Mandatory  height of the image file.
         * @apiParam {String} addedBy  Mandatory   admin's username who added the image file.
         * @apiDescription Saves html content image file to the database.
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
         * http://localhost:3000/api/texteditor/file/ \
         * -H "Content-Type: multipart/form-data"  \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3YjUwOTE0Y2VhZTA2Nzc0OTkzNGQzNiIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJoZWxsb0BiaXRzYmVhdC5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWRkZWRPbiI6IjIwMTYtMDgtMThUMDE6MDI6MTIuMjM3WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTdiNTA5MTRjZWFlMDY3NzQ5OTM0ZDM2IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ3Mjc5NTg4NiwiZXhwIjoxNDcyODgyMjg2LCJpc3MiOiI1N2I1MDkxNGNlYWUwNjc3NDk5MzRkMzYifQ.6QAWr6zFlaeInEAyFZs3k-GNbs7ybL2zZACRRaK-NAGzYW5c9UKTxI0fXyhQO2qJXdPfR9uHK77Ac1uFiNZhyg" \
         * -F image=@public/images/404_banner.png  \
         * -F "data={\"module\": \"html\"};type=application/json"
         * @apiSuccess {String} message File Uploaded.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "File Uploaded"
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
         * @apiError (InternalServerError)  {String} message  Internal Server Error
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 500 Internal Server Error
         *     {
         *       "message": "Internal Server Error"
         *     }
         *
         */


        .post(tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, uploader.single('image'), fileUploadHelper.imageUpload, textEditorController.saveFile)

        /**
         * @api {delete} /api/texteditor/file/ Deletes html content image file
         * @apiPermission admin
         * @apiName deleteFile
         * @apiGroup HtmlModuleContent
         * @apiParam {String} path    path of the image file.
         *
         *
         *   @apiParamExample {json} Request-Example:
         *     {
         *       "path": "/home/lakhe/Music/BitsBeat Projects/Final Projects/nodeframework/public/uploads/images/htmluploads/htmlupload-1472725544059.png"
         *     }
         * @apiDescription Deletes html content image file from the cloudinary server as well as local server
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
         * -G \
         * -v \
         * -X DELETE \
         * "http://localhost:3000/api/texteditor/file" \
         * --data-urlencode "path=/home/lakhe/Music/BitsBeat Projects/Final Projects/nodeframework/public/uploads/images/htmluploads/htmlupload-1472725544059.jpg" \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3YjUwOTE0Y2VhZTA2Nzc0OTkzNGQzNiIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJoZWxsb0BiaXRzYmVhdC5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWRkZWRPbiI6IjIwMTYtMDgtMThUMDE6MDI6MTIuMjM3WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTdiNTA5MTRjZWFlMDY3NzQ5OTM0ZDM2IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ3Mjc5NTg4NiwiZXhwIjoxNDcyODgyMjg2LCJpc3MiOiI1N2I1MDkxNGNlYWUwNjc3NDk5MzRkMzYifQ.6QAWr6zFlaeInEAyFZs3k-GNbs7ybL2zZACRRaK-NAGzYW5c9UKTxI0fXyhQO2qJXdPfR9uHK77Ac1uFiNZhyg"
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
         * @apiError (InternalServerError)  {String} message  Internal Server Error
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 500 Internal Server Error
         *     {
         *       "message": "Internal Server Error"
         *     }
         *
         */

        .delete(tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, textEditorController.deleteFile);


    //for managing directory of tiny mce text editor
    textEditorRouter.get('/dir', tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, function (req, res) {
        res.status(HTTPStatus.OK);
        res.json([
            {
                "p": "/Images",
                "f": "1",
                "d": "1"
            }
        ]);
    });

    //function declaration to return list of html content images to the client if exists else return not found message
    function getAllFiles(req, res, next) {
        textEditorController.getAllFiles(req)
            .then(function (fileList) {
                //if exists, return data in json format
                if (fileList) {
                    res.status(HTTPStatus.OK);
                    res.json(fileList);
                } else {
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json("File not found");
                }
            })
            .catch(function (err) {
                next(err);
            });
    }

    return textEditorRouter;

})();

module.exports = textEditorFileRoute;