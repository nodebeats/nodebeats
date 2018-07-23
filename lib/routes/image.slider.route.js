var imageSliderRoutes = (function () {

    'use strict';

    var HTTPStatus = require('http-status'),
        express = require('express'),
        tokenAuthMiddleware = require('../middlewares/token.authentication.middleware'),
        roleAuthMiddleware = require('../middlewares/role.authorization.middleware'),
        messageConfig = require('../configs/api.message.config'),
        imageSliderController = require('../controllers/image.slider.server.controller'),
        imageFilePath = './public/uploads/images/sliderimages/',
        uploadPrefix = 'imageslider',
        fileUploadHelper = require('../helpers/file.upload.helper')(imageFilePath, '', uploadPrefix),
        uploader = fileUploadHelper.uploader,
        imageSliderRouter = express.Router();

    imageSliderRouter.route('/')

    /**
     * @api {get} /api/imageslider/ Get slider image list
     * @apiPermission public
     * @apiName getAllSliderImages
     * @apiGroup ImageSlider
     *
     * @apiParam {Boolean} active whether to get data with active bit true or false, if true, then returns data list with active bit set to true only (as querystring values)
     *
     *  * @apiParamExample {json} Request-Example:
     *     {
     *       "active": true
     *     }
     *
     * @apiDescription Retrieves the slider images list if exists, else return empty array
     * @apiVersion 0.0.1
     *
     * @apiExample {curl} Example usage:
     * curl -i http://localhost:3000/api/imageslider
     *
     *
     * @apiExample {curl} Example usage:
     * curl -i http://localhost:3000/api/imageslider?active=true
     *
     * @apiSuccess {String} _id object id of the slider image data
     * @apiSuccess {String} imageSecondaryContent secondary content description of slider image.
     * @apiSuccess {String} imagePrimaryContent  primary content description of slider image.
     * @apiSuccess {String} imageAltText  alternative text for image .
     * @apiSuccess {String} imageTitle title for image.
     * @apiSuccess {String} imageName  name of the image file.
     * @apiSuccess {Boolean} active  active bit status.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     [
     *        {
     *            "_id": "57889ae9585d9632523f1234",
     *            "imageSecondaryContent": "undefined",
     *            "imagePrimaryContent": "undefined",
     *            "imageAltText": "alt text",
     *            "imageTitle": "Searching earthquake victims",
     *            "imageName": "imageslider-1468570345135.webp",
     *            "active": true
     *        }
     *       ]
     *
     *
     * @apiError  (NotFound) {String} message  Slider image not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "Slider image not found"
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

        .get( getAllSliderImages )

        /**
         * @api {post} /api/imageslider/ Post slider image data
         * @apiPermission admin
         * @apiName postSliderImage
         * @apiGroup ImageSlider
         *
         * @apiParam {String} Mandatory imageName  name of the image file.
         *
         * @apiDescription saves image slider object to the database
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
         * http://localhost:3000/api/imageslider \
         * -H "Content-Type: multipart/form-data"  \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODU3Njk2NSwiZXhwIjoxNDY4NTk2OTY1LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.bnWXFZrzcqJFwy9f9LBxuALzlEc-dfcjoGCUDaDu1YT2SL-ZhkToDwEHLZ7Wwo04A60JGtoliDBN7NZcvClEnw" \
         * -F imageName=@public/images/404_banner.png  \
         * -F "data={\"imageAltText\": \"this is 404 banner image\",\"imageTitle\": \"404 error\"};type=application/json"
         *
         * @apiSuccess {String} message Slider Image saved successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "Slider Image saved successfully"
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
         * @apiError  (BadRequest) {String[]} message  please upload image file
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *     {"message":"Please upload image"}
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
        .post( tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, uploader.single('imageName'), fileUploadHelper.imageUpload, imageSliderController.postSliderImage );



    //middleware function that will get the image slider object for each of the routes defined downwards
    imageSliderRouter.use('/:imageSliderId', function(req, res, next){
        imageSliderController.getSliderImageByID(req)
            .then(function(imageSliderInfo){
                //saving in request object so that it can be used for other operations like updating data using put and patch method
                if (imageSliderInfo) {
                    req.imageSliderInfo = imageSliderInfo;
                    next();
                    return null;// return a non-undefined value to signal that we didn't forget to return promise
                } else {
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.imageSlider.notFound
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    });


    imageSliderRouter.route('/:imageSliderId')

    /**
     * @api {get} /api/imageslider/:imageSliderId Get slider image object by param id
     * @apiPermission public
     * @apiName getSliderImageByID
     * @apiGroup ImageSlider
     *
     * @apiParam {String} imageSliderId object id of the image slider data
     *
     *  * @apiParamExample {json} Request-Example:
     *     {
     *       "imageSliderId": "57889ae9585d9632523f1234"
     *     }
     *
     * @apiDescription Retrieves the slider images object by using param id  if exists, else return not found message
     * @apiVersion 0.0.1
     *
     * @apiExample {curl} Example usage:
     * curl -i http://localhost:3000/api/imageslider/57889ae9585d9632523f1234
     *
     *
     * @apiSuccess {String} _id object id of the slider image data
     * @apiSuccess {String} imageSecondaryContent secondary content description of slider image.
     * @apiSuccess {String} imagePrimaryContent  primary content description of slider image.
     * @apiSuccess {String} imageAltText  alternative text for image .
     * @apiSuccess {String} imageTitle title for image.
     * @apiSuccess {String} imageName  name of the image file.
     * @apiSuccess {String} imageProperties.imageExtension extension of image file
     * @apiSuccess {String} imageProperties.imagePath  upload path of image file.
     * @apiSuccess {Boolean} active  active bit status.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *    {
     *            "_id": "57889ae9585d9632523f1234",
     *            "imageSecondaryContent": "undefined",
     *            "imagePrimaryContent": "undefined",
     *            "imageAltText": "alt text",
     *            "imageTitle": "Searching earthquake victims",
     *            "imageName": "imageslider-1468570345135.webp",
     *            "active": true,
     *            "imageProperties": {
     *                   "imageExtension": "jpg",
     *                   "imagePath": "public/uploads/images/sliderimages/imageslider-1468570345135.jpg"
     *               }
     *        }

     *
     *
     * @apiError  (NotFound) {String} message  Slider image not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "Slider image not found"
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
            res.json(req.imageSliderInfo);
        })



        /**
         * @api {patch} /api/imageslider/:imageSliderId deletes existing slider image record
         * @apiPermission admin
         * @apiName patchSliderImage
         * @apiGroup ImageSlider
         *
         * @apiParam {String} imageSliderId  object id of the image slider data
         *
         *  * @apiParamExample {json} Request-Example:
         *     {
         *       "imageSliderId": "57889ae9585d9632523f1234"
         *     }
         *
         * @apiDescription deletes existing image slider object from the database
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
         * -X PATCH  \
         * http://localhost:3000/api/imageslider/5788b58daebc4f5f6ed419a5 \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODU3Njk2NSwiZXhwIjoxNDY4NTk2OTY1LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.bnWXFZrzcqJFwy9f9LBxuALzlEc-dfcjoGCUDaDu1YT2SL-ZhkToDwEHLZ7Wwo04A60JGtoliDBN7NZcvClEnw"
         *
         * @apiSuccess {String} message Slider Image deleted successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
 *         "message": "Slider Image deleted successfully"
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
        .patch( tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, imageSliderController.patchSliderImage )

        /**
         * @api {put} /api/imageslider/:imageSliderId Updates existing slider image data
         * @apiPermission admin
         * @apiName updateSliderImage
         * @apiGroup ImageSlider
         *
         * @apiParam {String} imageSliderId object id of the image slider data
         *
         *  * @apiParamExample {json} Request-Example:
         *     {
         *       "imageSliderId": "57889ae9585d9632523f1234"
         *     }
         *
         * @apiDescription updates existing image slider object to the database
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
         * http://localhost:3000/api/imageslider/5788b58daebc4f5f6ed419a5 \
         * -H "Content-Type: multipart/form-data"  \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODU3Njk2NSwiZXhwIjoxNDY4NTk2OTY1LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.bnWXFZrzcqJFwy9f9LBxuALzlEc-dfcjoGCUDaDu1YT2SL-ZhkToDwEHLZ7Wwo04A60JGtoliDBN7NZcvClEnw" \
         * -F imageName=@public/images/404_banner.png  \
         * -F "data={\"imageAltText\": \"this is 404 banner image haha\",\"imageTitle\": \"404 error\"};type=application/json"
         *
         * @apiSuccess {String} message Slider Image updated successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
 *         "message": "Slider Image updated successfully"
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
         * @apiError  (BadRequest) {String} message  please upload image file
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *     {"message":"Please upload image"}
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
        .put( tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, uploader.single('imageName'), fileUploadHelper.imageUpload, imageSliderController.updateSliderImage );


    //function declaration to return image slider list to the client if exists else return  empty array
    function getAllSliderImages(req, res, next) {
        imageSliderController.getAllSliderImages (req)
            .then(function(sliderImages){
                //if exists, return data in json format
                if (sliderImages) {
                    res.status(HTTPStatus.OK);
                    res.json(sliderImages);
                } else {
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.imageSlider.notFound
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    }

    return imageSliderRouter;

})();

module.exports = imageSliderRoutes;