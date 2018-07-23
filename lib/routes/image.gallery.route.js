var imageGalleryRoutes = (function () {

    'use strict';

    var HTTPStatus = require('http-status'),
        express = require('express'),
        messageConfig = require('../configs/api.message.config'),
        tokenAuthMiddleware = require('../middlewares/token.authentication.middleware'),
        roleAuthMiddleware = require('../middlewares/role.authorization.middleware'),
        imageGalleryController = require('../controllers/image.gallery.server.controller'),
        imageFilePath = './public/uploads/images/imagegallery/',
        uploadPrefix = 'imagegallery',
        fileUploadHelper = require('../helpers/file.upload.helper')(imageFilePath, '', uploadPrefix),
        uploader = fileUploadHelper.uploader,
        imageGalleryRouter = express.Router();
 
    imageGalleryRouter.route('/album/')

    /**
     * @api {get} /api/gallery/album/ Get gallery album  list
     * @apiPermission public
     * @apiName getAllGalleryAlbums
     * @apiGroup GalleryAlbum
     *
     * @apiParam {Boolean} active whether to get data with active bit true or false, if true, then returns data list with active bit set to true only
     * @apiParam {Int} perpage Number of data to return on each request
     * @apiParam {Int} page Current page number of pagination system.
     * @apiParam {String} albumname name of the album to filter album list as filter param
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
     *       "albumname": "Picnic Memoirs"
     *     }
     *
     * @apiDescription Retrieves the gallery album list if exists, else return empty array
     * @apiVersion 0.0.1
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/gallery/album/" \
     * --data-urlencode "perpage=10" \
     * --data-urlencode "page=1"
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/gallery/album/" \
     * --data-urlencode "active=true" \
     * --data-urlencode "albumname=Picnic Memoirs"
     *
     *
     * @apiSuccess {Array} dataList list of gallery albums
     * @apiSuccess {String} dataList._id  object id of gallery album data.
     * @apiSuccess {String} dataList.albumName  name of the album.
     * @apiSuccess {String} dataList.albumDescription brief description about the album.
     * @apiSuccess {String} dataList.addedOn   Date of album creation.
     * @apiSuccess {Boolean} dataList.active  active bit status of the gallery album.
     * @apiSuccess {Int} totalItems  total no of gallery albums in the related collection in database.
     * @apiSuccess {Int} currentPage  current page number of client pagination system.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *           "dataList": [
     *               {
     *                   "_id": "571e9f5c97a20bd01267237c",
     *                   "albumName": "Super Images Beautiful",
     *                   "albumDescription": "what kind of footwear is Katy wearing on the opening of the video? on 3 toes fits in",
     *                   "addedOn": "2016-04-25T22:51:08.719Z",
     *                   "active": true
     *               }
     *           ],
     *           "totalItems": 1,
     *           "currentPage": 1
     *       }
     *
     *
     * @apiError  (NotFound) {String} message  Album not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "Album not found"
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

        .get( getAllGalleryAlbums )

        /**
         * @api {post} /api/gallery/album/ Post gallery album data
         * @apiPermission admin
         * @apiName postAlbumInfo
         * @apiGroup GalleryAlbum
         *  @apiParam {String}  Mandatory  albumName  name of the album.
         * @apiDescription saves gallery album information to the database
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
         * http://localhost:3000/api/gallery/album/ \
         * -H "Content-Type: application/json"  \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODgwMDcxMiwiZXhwIjoxNDY4ODIwNzEyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.3Nk-DHIX2rZdu6IIkJ72QxHnR6ISr468jHkvA_nsrQlTgtL6eMhYlOfIF8Nq6EF8VEROhMZ8xSSf_GJeqar9mA" \
         * -d '{"albumName":"Picnic Memoirs","albumDescription":"beautiful memories"}'
         *
         * @apiSuccess {String} message Album saved successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "Album saved successfully"
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
         * @apiError  (AlreadyExists)  {String} message  Gallery album with same title already exists.
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 409 Conflict
         *     {
         *       "message": "Image gallery album with same title already exists"
         *     }
         *
         *
         *
         *
         * @apiError  (BadRequest) {String} message Validation Error due to  not entering value for required field i.e. albumName
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *
         *     {
         *       "message": "Album title is required"
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

        .post( tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, imageGalleryController.postAlbumInfo );



    //middleware function that will get the gallery album object for each of the routes defined downwards
    imageGalleryRouter.use('/album/:albumId', function(req, res, next){
        imageGalleryController.getAlbumInfoByID(req)
            .then(function(albumInfo){
                //saving in request object so that it can be used for other operations like updating data using put and patch method
                if (albumInfo) {
                    req.albumInfo = albumInfo;
                    next();
                    return null;// return a non-undefined value to signal that we didn't forget to return promise
                } else {
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.imageGallery.notFoundAlbum
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    });


    imageGalleryRouter.route('/album/:albumId')


    /**
     * @api {get} /api/gallery/album/:albumId Get gallery album info by Id
     * @apiPermission public
     * @apiName getAlbumInfoByID
     * @apiGroup GalleryAlbum
     *
     * @apiParam {String} albumId object id of the gallery album to filter album by Id
     *
     *  * @apiParamExample {json} Request-Example:
     *     {
     *       "albumId": "571e9f5c97a20bd01267237c"
     *     }
     *
     *
     * @apiDescription Retrieves the gallery album information object by Id if exists, else return empty object
     * @apiVersion 0.0.1
     *
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -i \
     * "http://localhost:3000/api/gallery/album/571e9f5c97a20bd01267237c"
     *
     *
     * @apiSuccess {String} _id  object id of gallery album data.
     * @apiSuccess {String} albumName  name of the album.
     * @apiSuccess {String} albumDescription brief description about the album.
     * @apiSuccess {String} addedOn   Date of album creation.
     * @apiSuccess {Boolean} active  active bit status of the gallery album.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *            "_id": "571e9f5c97a20bd01267237c",
     *            "albumName": "Super Images Beautiful",
     *            "albumDescription": "what kind of footwear is Katy wearing on the opening of the video? on 3 toes fits in",
     *            "addedOn": "2016-04-25T22:51:08.719Z",
     *            "active": true
     *        }
     *
     *
     * @apiError  (NotFound) {String} message  Album not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "Album not found"
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
            res.json(req.albumInfo);
        })


        /**
         * @api {patch} /api/gallery/album/:albumId  Deletes existing gallery album data
         * @apiPermission admin
         * @apiName patchGalleryAlbum
         * @apiGroup GalleryAlbum
         *
         *
         * @apiParam {String} albumId object id of the gallery album to filter album by Id
         *
         *  * @apiParamExample {json} Request-Example:
         *     {
     *       "albumId": "578c20848e45f8962790a2e4"
     *     }
         *
         *
         *
         * @apiDescription Deletes existing gallery album information from the database
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
         * http://localhost:3000/api/gallery/album/578c20848e45f8962790a2e4 \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODgwMDcxMiwiZXhwIjoxNDY4ODIwNzEyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.3Nk-DHIX2rZdu6IIkJ72QxHnR6ISr468jHkvA_nsrQlTgtL6eMhYlOfIF8Nq6EF8VEROhMZ8xSSf_GJeqar9mA"
         *
         *
         * @apiSuccess {String} message Album deleted successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "Album deleted successfully"
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

        .patch( tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, imageGalleryController.patchGalleryAlbum )


        /**
         * @api {put} /api/gallery/album/:albumId  Updates existing gallery album data
         * @apiPermission admin
         * @apiName updateAlbumInfo
         * @apiGroup GalleryAlbum
         *
         *
         * @apiParam {String} albumId object id of the gallery album to filter album by Id
         *
         *  * @apiParamExample {json} Request-Example:
         *     {
     *       "albumId": "578c20848e45f8962790a2e4"
     *     }
         *
         *
         *
         * @apiDescription Updates existing gallery album information to the database
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
         * http://localhost:3000/api/gallery/album/578c20848e45f8962790a2e4 \
         * -H "Content-Type: application/json"  \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODgwMDcxMiwiZXhwIjoxNDY4ODIwNzEyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.3Nk-DHIX2rZdu6IIkJ72QxHnR6ISr468jHkvA_nsrQlTgtL6eMhYlOfIF8Nq6EF8VEROhMZ8xSSf_GJeqar9mA" \
         * -d '{"albumName":"Picnic Memoirs 2016","albumDescription":"beautiful memories in Nepal"}'
         *
         * @apiSuccess {String} message Album updated successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "Album updated successfully"
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
         * @apiError  (AlreadyExists)  {String} message  Gallery album with same title already exists.
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 409 Conflict
         *     {
         *       "message": "Image gallery album with same title already exists"
         *     }
         *
         *
         *
         *
         * @apiError  (BadRequest) {String} message Validation Error due to  not entering value for required field i.e. albumName
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *
         *     {
         *       "message": "Album title is required"
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

        .put( tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, imageGalleryController.updateAlbumInfo );



    imageGalleryRouter.route('/albumimage/:albumId')

    /**
     * @api {get} /api/gallery/albumimage/:albumId Get gallery images by Album Id
     * @apiPermission public
     * @apiName getAllGalleryImagesByAlbumID
     * @apiGroup GalleryAlbum
     *
     * @apiParam {Boolean} active whether to get data with active bit true or false, if true, then returns data list with active bit set to true only
     * @apiParam {Int} perpage Number of data to return on each request
     * @apiParam {Int} page Current page number of pagination system.
     * @apiParam {String} albumId object id of the gallery album
     *
     *  * @apiParamExample {json} Request-Example:
     *     {
     *       "perpage": 10,
     *       "page": 1,
     *       "albumId": "571e9f5c97a20bd01267237c"
     *     }
     *
     *
     *  * @apiParamExample {json} Request-Example:
     *     {
     *       "perpage": 10,
     *       "page": 1,
     *       "active": true,
     *       "albumId": "571e9f5c97a20bd01267237c"
     *     }
     *
     * @apiDescription Retrieves the gallery images list by Album Id  if exists, else return empty array
     * @apiVersion 0.0.1
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/gallery/albumimage/571e9f5c97a20bd01267237c" \
     * --data-urlencode "perpage=10" \
     * --data-urlencode "page=1"
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/gallery/albumimage/571e9f5c97a20bd01267237c" \
     * --data-urlencode "perpage=10" \
     * --data-urlencode "page=1" \
     * --data-urlencode "active=true"
     *
     *
     * @apiSuccess {Array} dataList list of gallery images of an album
     * @apiSuccess {String} dataList._id  object id of gallery image of an album.
     * @apiSuccess {String} dataList.imageName  name of the image file.
     * @apiSuccess {String} dataList.imageTitle title description of image.
     * @apiSuccess {String} dataList.imageAltText   alternative text of an image.
     * @apiSuccess {String} dataList.imageDescription  brief description of an image.
     * @apiSuccess {String} dataList.addedOn Date of image file addition.
     * @apiSuccess {String} dataList.coverImage   whether the image is cover image of the album.
     * @apiSuccess {Boolean} dataList.active  active bit status of the gallery image of an album.
     * @apiSuccess {String} imageProperties meta-data of the image file.
     * @apiSuccess {String} imageProperties.imageExtension extension of image file.
     * @apiSuccess {String} imageProperties.imagePath path of image file.
     * @apiSuccess {Int} totalItems  total no of gallery images in an album.
     * @apiSuccess {Int} currentPage  current page number of client pagination system.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *           "dataList": [
     *               {
     *                   "imageName": "",
     *                   "imageTitle": "Army Personnels in desperate effort to save trapped citizens under the fallen buildings",
     *                   "imageAltText": "very very sad to see people suffer in agony",
     *                   "imageDescription": "The army personnel is working day and night to save the citizens that are trapped under buildings",
     *                   "_id": "571ea010b878294a14b87a61",
     *                   "addedOn": "2016-04-25T22:54:08.690Z",
     *                   "active": true,
     *                   "imageProperties": {
     *                       "imageExtension": "jpg",
     *                       "imagePath": "public/uploads/images/testimonial/testimonial-1468734449811.jpg"
     *                  },
     *                   "coverImage": false
     *               }
     *           ],
     *           "totalItems": 1,
     *           "currentPage": 1
     *       }
     *
     *
     * @apiError  (NotFound) {String} message  Gallery image not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "Gallery image not found"
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

        .get( getAllGalleryImagesByAlbumID )

        /**
         * @api {post} /api/gallery/albumimage/:albumId Post gallery image of an album data
         * @apiPermission admin
         * @apiName postGalleryImageInfo
         * @apiGroup GalleryAlbum
         *
         * @apiParam {String} imageName   Mandatory  name of the image file.
         * @apiParam {String} albumId object id of the gallery album
         *
         *  * @apiParamExample {json} Request-Example:
         *     {
         *       "albumId": "571e9f5c97a20bd01267237c"
         *     }
         *
         *
         *
         * @apiDescription saves gallery image information of an album to the database
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
         * http://localhost:3000/api/gallery/albumimage/571e9f5c97a20bd01267237c \
         * -H "Content-Type: multipart/form-data"  \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODgyMzg5MSwiZXhwIjoxNDY4ODQzODkxLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.gHeAUVtCSSgWlXS9HP47V-AYtbUAEv34iLccO8PZdIdA3n_LSv0wcjWuWc7BueQr2ab3LrHP738Yda_P-JcsQA" \
         * -F imageName=@public/images/404_banner.png  \
         * -F "data={\"imageTitle\": \"woow beautiful image\",\"imageAltText\": \"beautiful image beyond explanation\",\"active\": \"true\"};type=application/json"
         *
         *
         * @apiSuccess {String} message Gallery image saved successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "Gallery image saved successfully"
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
         * @apiError  (BadRequest) {String} message Validation Error due to  not uploading image file
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *
         *     {
         *       "message": "Please upload image"
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

        .post( tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, uploader.single('imageName'), fileUploadHelper.imageUpload, imageGalleryController.postGalleryImageInfo );



    //middleware function that will get the gallery image object for each of the routes defined downwards
    imageGalleryRouter.use('/albumimage/:albumId/:imageId', function(req, res, next){
        imageGalleryController.getGalleryImageInfoByImageID(req)
            .then(function(imageInfo){
                //saving in request object so that it can be used for other operations like updating data using put and patch method
                if (imageInfo) {
                    req.imageInfo = imageInfo;
                    next();
                    return null;// return a non-undefined value to signal that we didn't forget to return promise
                } else {
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.imageGallery.notFoundGalleryImage
                    });
                }

            })
            .catch(function(err){
                return next(err);
            });
    });

    imageGalleryRouter.route('/albumimage/:albumId/:imageId')

    /**
     * @api {delete} /api/gallery/albumimage/:albumId/:imageId Deletes gallery image of an album data
     * @apiPermission admin
     * @apiName removeImage
     * @apiGroup GalleryAlbum
     *
     *
     * @apiParam {String} albumId object id of the gallery album
     * @apiParam {String} imageId object id of the gallery image of an album
     *
     *  @apiParamExample {json} Request-Example:
     *     {
     *       "albumId": "571e9f5c97a20bd01267237c",
     *       "imageId": "571ea010b878294a14b87a61"
     *     }
     *
     *
     *
     * @apiDescription Deletes gallery image  of an album to the database
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
     * -X DELETE  \
     * http://localhost:3000/api/gallery/albumimage/571e9f5c97a20bd01267237c/571e9ffe8f0c2f4f14a6a453 \
     * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODgyMzg5MSwiZXhwIjoxNDY4ODQzODkxLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.gHeAUVtCSSgWlXS9HP47V-AYtbUAEv34iLccO8PZdIdA3n_LSv0wcjWuWc7BueQr2ab3LrHP738Yda_P-JcsQA"
     *
     *
     * @apiSuccess {String} message Gallery Image deleted successfully.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "message": "Gallery Image deleted successfully"
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
     * @apiError (BadRequest)  {String} message  Cover Image cannot be deleted
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
         *       "message": "Cover Image cannot be deleted"
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

        .delete( tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, imageGalleryController.removeImage )

        /**
         * @api {get} /api/gallery/albumimage/:albumId/:imageId Get gallery image information object of an  Album by image Id
         * @apiPermission public
         * @apiName getGalleryImageInfoByImageID
         * @apiGroup GalleryAlbum
         *
         * @apiParam {String} albumId object id of the gallery album
         * @apiParam {String} imageId object id of the gallery image of an album
         *
         *  * @apiParamExample {json} Request-Example:
         *     {
         *       "albumId": "571e9f5c97a20bd01267237c",
         *       "imageId": "571ea010b878294a14b87a61"
         *     }
         *
         *
         * @apiDescription Retrieves the gallery image information object of an album by image id if exists, else return empty object
         * @apiVersion 0.0.1
         *
         * @apiExample {curl} Example usage:
         * curl \
         * -G \
         * -v \
         * "http://localhost:3000/api/gallery/albumimage/571e9f5c97a20bd01267237c/571ea010b878294a14b87a61"
         *
         *
         * @apiSuccess {String} _id  object id of gallery image of an album.
         * @apiSuccess {String} imageName  name of the image file.
         * @apiSuccess {String} imageTitle title description of image.
         * @apiSuccess {String} imageAltText   alternative text of an image.
         * @apiSuccess {String} imageDescription  brief description of an image.
         * @apiSuccess {String} addedOn Date of image file addition.
         * @apiSuccess {String} coverImage   whether the image is cover image of the album.
         * @apiSuccess {Boolean} active  active bit status of the gallery image of an album.
         * @apiSuccess {String} imageProperties meta-data of the image file.
         * @apiSuccess {String} imageProperties.imageExtension extension of image file.
         * @apiSuccess {String} imageProperties.imagePath path of image file.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *           "imageName": "toyota-prius-electric",
         *           "imageTitle": "Toyota launching the most environment friendly car ever in the history",
         *           "imageAltText": "a truly remarkable feat",
         *           "imageDescription": "Toyota is the global leader in car industry and with it's latest innovation in electric car, it will be even stronger in the car market",
         *           "_id": "571e9ffe8f0c2f4f14a6a453",
         *           "addedOn": "2016-04-25T22:53:50.608Z",
         *           "active": false,
         *          "imageProperties": {
         *               "imageExtension": "jpg",
         *               "imagePath": "public/uploads/images/testimonial/testimonial-1468734449811.jpg"
         *          },
         *           "coverImage": true
         *       }
         *
         *
         * @apiError  (NotFound) {String} message  Gallery image not found
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 404 Not Found
         *     {
         *       "message": "Gallery image not found"
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
            res.json(req.imageInfo);
        })

        /**
         * @api {patch} /api/gallery/albumimage/:albumId/:imageId Updates cover image of an album data
         * @apiPermission admin
         * @apiName updateCoverImage
         * @apiGroup GalleryAlbum
         *
         *
         * @apiParam {String} albumId object id of the gallery album
         * @apiParam {String} imageId object id of the gallery image of an album
         *
         *  * @apiParamExample {json} Request-Example:
         *     {
         *       "albumId": "571e9f5c97a20bd01267237c",
         *       "imageId": "571ea010b878294a14b87a61"
         *     }
         *
         *
         *
         * @apiDescription Updates cover image of an album to the database
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
         * http://localhost:3000/api/gallery/albumimage/571e9f5c97a20bd01267237c/571e9ffe8f0c2f4f14a6a453 \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODgyMzg5MSwiZXhwIjoxNDY4ODQzODkxLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.gHeAUVtCSSgWlXS9HP47V-AYtbUAEv34iLccO8PZdIdA3n_LSv0wcjWuWc7BueQr2ab3LrHP738Yda_P-JcsQA"
         *
         *
         * @apiSuccess {String} message Cover image updated successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "Cover image updated successfully"
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


        .patch( tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, imageGalleryController.updateCoverImage )

        /**
         * @api {put} /api/gallery/albumimage/:albumId/:imageId Updates existing gallery image of an album data
         * @apiPermission admin
         * @apiName updateGalleryImageInfo
         * @apiGroup GalleryAlbum
         *
         *
         * @apiParam {String} albumId object id of the gallery album
         * @apiParam {String} imageId object id of the gallery image of an album
         *
         *  * @apiParamExample {json} Request-Example:
         *     {
         *       "albumId": "571e9f5c97a20bd01267237c",
         *       "imageId": "571ea010b878294a14b87a61"
         *     }
         *
         *
         *
         * @apiDescription Updates existing gallery image information of an album to the database
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
         * http://localhost:3000/api/gallery/albumimage/571e9f5c97a20bd01267237c/578c7a11b8855f0436a2aff0 \
         * -H "Content-Type: multipart/form-data"  \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODgyMzg5MSwiZXhwIjoxNDY4ODQzODkxLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.gHeAUVtCSSgWlXS9HP47V-AYtbUAEv34iLccO8PZdIdA3n_LSv0wcjWuWc7BueQr2ab3LrHP738Yda_P-JcsQA" \
         * -F imageName=@public/images/404_banner.png  \
         * -F "data={\"imageTitle\": \"woow beautiful image yahoo\",\"imageAltText\": \"beautiful image beyond explanation in Nepal\",\"active\": \"true\"};type=application/json"
         *
         * @apiSuccess {String} message Gallery Image updated successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "Gallery Image updated successfully"
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
         * @apiError  (BadRequest) {String} message Validation Error due to  not uploading image file
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *
         *     {
         *       "message": "Please upload image"
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


        .put( tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, uploader.single('imageName'), fileUploadHelper.imageUpload, imageGalleryController.updateGalleryImageInfo );




    //function declaration to return gallery albums list to the client if exists else return not found message
    function getAllGalleryAlbums(req, res, next) {
        imageGalleryController.getAllGalleryAlbums(req, next)
            .then(function(albumInfo){
                //if exists, return data in json format
                if (albumInfo) {
                    res.status(HTTPStatus.OK);
                    res.json(albumInfo);
                } else {
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.imageGallery.notFoundAlbum
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    }


    //function declaration to return gallery images list to the client if exists else return not found message
    function getAllGalleryImagesByAlbumID(req, res, next) {
        imageGalleryController.getAllGalleryImagesByAlbumID(req, next)
            .then(function(imageInfo){
                //if exists, return data in json format
                if (imageInfo) {
                    res.status(HTTPStatus.OK);
                    res.json(imageInfo);
                } else {
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.imageGallery.notFoundGalleryImage
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    }

    return imageGalleryRouter;

})();

module.exports = imageGalleryRoutes;