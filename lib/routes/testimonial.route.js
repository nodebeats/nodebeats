var testimonialRoutes = (function () {

    'use strict';

    var HTTPStatus = require('http-status'),
        express = require('express'),
        tokenAuthMiddleware = require('../middlewares/token.authentication.middleware'),
        roleAuthMiddleware = require('../middlewares/role.authorization.middleware'),
        messageConfig = require('../configs/api.message.config'),
        testimonialController = require('../controllers/testimonial.server.controller'),
        imageFilePath = './public/uploads/images/testimonial/',
        uploadPrefix = 'testimonial',
        fileUploadHelper = require('../helpers/file.upload.helper')(imageFilePath, '', uploadPrefix),
        uploader = fileUploadHelper.uploader,
        testimonialRouter =  express.Router();

    testimonialRouter.route('/')

    /**
     * @api {get} /api/testimonial/ Get testimonial list
     * @apiPermission public
     * @apiName getAllTestimonials
     * @apiGroup Testimonial
     *
     * @apiParam {Boolean} active whether to get data with active bit true or false, if true, then returns data list with active bit set to true only 
     * @apiParam {Int} perpage Number of data to return on each request 
     * @apiParam {Int} page Current page number of pagination system.
     * @apiParam {String} personName to filter testimonial list using person name as filter param 
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
     *       "personName": "shrawan"
     *     }
     *
     * @apiDescription Retrieves the testimonial list if exists, else return empty array
     * @apiVersion 0.0.1
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/testimonial" \
     * --data-urlencode "perpage=10" \
     * --data-urlencode "page=1"
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/testimonial" \
     * --data-urlencode "active=true" \
     * --data-urlencode "personName=shrawan lakhe"

     *
     * @apiSuccess {Array} dataList list of testimonials
     * @apiSuccess {String} dataList._id  object id of testimonial data.
     * @apiSuccess {String} dataList.personName  name of the person.
     * @apiSuccess {String} dataList.testimonialContent   testimonial content.
     * @apiSuccess {String} dataList.organization  name of the organization where the testifier works.
     * @apiSuccess {String} dataList.designation  Designation of the person.
     * @apiSuccess {String} dataList.email email address of the person.
     * @apiSuccess {String} dataList.facebookURL  facebook url of the person.
     * @apiSuccess {String} dataList.twitterURL  twitter url of the person.
     * @apiSuccess {String} dataList.gPlusURL google plus url of the person.
     * @apiSuccess {String} dataList.linkedInURL  linked in url of the person.
     * @apiSuccess {String} dataList.imageName name of the image file.
     * @apiSuccess {String} dataList.imageProperties meta-data of the image file.
     * @apiSuccess {String} dataList.imageProperties.imageExtension extension of image file.
     * @apiSuccess {String} dataList.imageProperties.imagePath path of image file.
     * @apiSuccess {Boolean} dataList.active  active bit status.
     * @apiSuccess {Int} totalItems  total no of events in the event collection in database.
     * @apiSuccess {Int} currentPage  current page number of client pagination system.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *           "dataList": [
     *               {
     *                   "_id": "578b1bf1b825c2ef2eb730a8",
     *                   "imageName": "testimonial-1468734449811.webp",
     *                   "facebookURL": "https://facebook.com",
     *                   "email": "shrawanlakhey@gmail.com",
     *                   "designation": "CTO",
     *                   "organization": "BitsBeat IT Solution",
     *                   "testimonialContent": "Set the version of an documentation block. Version can also be used in @apiDefine.\nBlocks with same group and name, but different versions can be compared in the generated output, so you or a frontend developer can retrace what changes in the API since the last version.",
     *                   "personName": "Shrawan Lakhe",
     *                   "active": true,
     *                   "imageProperties": {
     *                       "imageExtension": "jpg",
     *                       "imagePath": "public/uploads/images/testimonial/testimonial-1468734449811.jpg"
     *                   }
     *               }
     *           ],
     *           "totalItems": 1,
     *           "currentPage": 1
     *       }
     *
     *
     * @apiError  (NotFound) {String} message  Testimonial not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "Testimonial not found"
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

        .get( getAllTestimonials )

        /**
         * @api {post} /api/testimonial/ Post testimonial data
         * @apiPermission admin
         * @apiName postTestimonial
         * @apiGroup Testimonial
         * @apiSuccess {String} personName Mandatory  name of the person.
         * @apiSuccess {String} testimonialContent Mandatory  testimonial content.
         * @apiSuccess {String} organization Mandatory name of the organization where the testifier works.
         * @apiDescription saves testimonial information to the database
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
         * http://localhost:3000/api/testimonial/ \
         * -H "Content-Type: multipart/form-data"  \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODczNDA0OCwiZXhwIjoxNDY4NzU0MDQ4LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.VtceFVvCYx3W1Xty3EkDwXo07aiC_agJxfb7ao4dcatG5ozMH5Sr_1_2xK5vePKIWg_W2LJSMxWF8O7ZC0XYkA" \
         * -F imageName=@public/images/404_banner.png  \
         * -F "data={\"personName\": \"Shrawan Lakhe\",\"testimonialContent\": \"Please donate blood and help the blood donation program in any way you can\",\"organization\": \"Red Cross Building\",\"designation\": \"Developer\"};type=application/json"
         *
         * @apiSuccess {String} message Testimonial saved successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "Testimonial saved successfully"
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
         * @apiError  (BadRequest) {String[]} message Validation Error due to either invalid data entry or not entering value for required fields
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *
         *     {
         *       "message": [{"param":"personName","msg":"Person name is required","value":""},
         *       {"param":"testimonialContent","msg":"Content for testimonial is required","value":""},
         *       {"param":"organization","msg":"Organization name is required"},
         *       {"param":"email","msg":"Invalid Email","value":"fdsafdsa"}]
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
        .post( tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, uploader.single('imageName'), fileUploadHelper.imageUpload, testimonialController.postTestimonial );



    //middleware function that will get the testimonial object for each of the routes defined downwards
    testimonialRouter.use('/:testimonialId', function(req, res, next){
        testimonialController.getTestimonialByID(req)
            .then(function(testimonialInfo){
                //saving in request object so that it can be used for other operations like updating data using put and patch method
                if (testimonialInfo) {
                    req.testimonialInfo = testimonialInfo;
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


    testimonialRouter.route('/:testimonialId')


    /**
     * @api {get} /api/testimonial/:testimonialId Get testimonial data by id
     * @apiPermission public
     * @apiName getTestimonialByID
     * @apiGroup Testimonial
     *
     * @apiParam {String} testimonialId object id of the testimonial data object
     *
     *  * @apiParamExample {json} Request-Example:
     *     {
     *       "testimonialId": "578b1bf1b825c2ef2eb730a8"
     *     }
     *
     *
     * @apiDescription Retrieves the testimonial data object by id if exists, else return empty object
     * @apiVersion 0.0.1
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -i \
     * http://localhost:3000/api/testimonial/578b1bf1b825c2ef2eb730a8
     *
     *
     * @apiSuccess {String} _id  object id of testimonial data.
     * @apiSuccess {String} personName  name of the person.
     * @apiSuccess {String} testimonialContent   testimonial content.
     * @apiSuccess {String} organization  name of the organization where the testifier works.
     * @apiSuccess {String} designation  Designation of the person.
     * @apiSuccess {String} email email address of the person.
     * @apiSuccess {String} facebookURL  facebook url of the person.
     * @apiSuccess {String} twitterURL  twitter url of the person.
     * @apiSuccess {String} gPlusURL google plus url of the person.
     * @apiSuccess {String} linkedInURL  linked in url of the person.
     * @apiSuccess {String} imageName name of the image file.
     * @apiSuccess {String} imageProperties meta-data of the image file.
     * @apiSuccess {String} imageProperties.imageExtension extension of image file.
     * @apiSuccess {String} imageProperties.imagePath path of image file.
     * @apiSuccess {Boolean} active  active bit status.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "_id": "578b1bf1b825c2ef2eb730a8",
     *       "imageName": "testimonial-1468734449811.webp",
     *       "facebookURL": "https://facebook.com",
     *      "email": "shrawanlakhey@gmail.com",
     *       "designation": "CTO",
     *       "organization": "BitsBeat IT Solution",
     *       "testimonialContent": "Set the version of an documentation block. Version can also be used in @apiDefine.\nBlocks with same group and name, but different versions can be compared in the generated output, so you or a frontend developer can retrace what changes in the API since the last version.",
     *       "personName": "Shrawan Lakhe",
     *       "active": true,
     *       "imageProperties": {
     *           "imageExtension": "jpg",
     *           "imagePath": "public/uploads/images/testimonial/testimonial-1468734449811.jpg"
     *       }
     *   }
     *
     *
     * @apiError  (NotFound) {String} message  Testimonial not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "Testimonial not found"
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
            res.json(req.testimonialInfo);
        })


        /**
         * @api {patch} /api/testimonial/:testimonialId Deletes existing  testimonial data
         * @apiPermission admin
         * @apiName patchTestimonial
         * @apiGroup Testimonial
         *
         * @apiParam {String} testimonialId object id of the testimonial data object
         *
         *  * @apiParamExample {json} Request-Example:
         *     {
     *       "testimonialId": "578b1bf1b825c2ef2eb730a8"
     *     }
         *
         * @apiDescription Deletes existing testimonial information from the database
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
         * http://localhost:3000/api/testimonial/578b1bf1b825c2ef2eb730a8 \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODczNDA0OCwiZXhwIjoxNDY4NzU0MDQ4LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.VtceFVvCYx3W1Xty3EkDwXo07aiC_agJxfb7ao4dcatG5ozMH5Sr_1_2xK5vePKIWg_W2LJSMxWF8O7ZC0XYkA"
         *
         *
         * @apiSuccess {String} message Testimonial deleted successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "Testimonial deleted successfully"
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
        .patch( tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, testimonialController.patchTestimonial )


        /**
         * @api {put} /api/testimonial/:testimonialId Updates existing  testimonial data
         * @apiPermission admin
         * @apiName updateTestimonial
         * @apiGroup Testimonial
         *
         * @apiParam {String} testimonialId object id of the testimonial data object
         *
         *  * @apiParamExample {json} Request-Example:
         *     {
     *       "testimonialId": "578b1bf1b825c2ef2eb730a8"
     *     }
         *
         * @apiDescription updates existing testimonial information to the database
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
         * http://localhost:3000/api/testimonial/578b1bf1b825c2ef2eb730a8 \
         * -H "Content-Type: multipart/form-data"  \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODczNDA0OCwiZXhwIjoxNDY4NzU0MDQ4LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.VtceFVvCYx3W1Xty3EkDwXo07aiC_agJxfb7ao4dcatG5ozMH5Sr_1_2xK5vePKIWg_W2LJSMxWF8O7ZC0XYkA" \
         * -F imageName=@public/images/404_banner.png  \
         * -F "data={\"personName\": \"Shrawan Lakhe nepal\",\"testimonialContent\": \"Please donate blood and help the blood donation program in any way you can\",\"organization\": \"Red Cross Building\",\"designation\": \"Developer\"};type=application/json"
         *
         * @apiSuccess {String} message Testimonial updated successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "Testimonial updated successfully"
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
         * @apiError  (BadRequest) {String[]} message Validation Error due to either invalid data entry or not entering value for required fields
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *
         *     {
         *       "message": [{"param":"personName","msg":"Person name is required","value":""},
         *       {"param":"testimonialContent","msg":"Content for testimonial is required","value":""},
         *       {"param":"organization","msg":"Organization name is required"},
         *       {"param":"email","msg":"Invalid Email","value":"fdsafdsa"}]
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
        .put( tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, uploader.single('imageName'), fileUploadHelper.imageUpload, testimonialController.updateTestimonial );



    //function declaration to return testimonial list to the client if exists else return not found message
    function getAllTestimonials(req, res, next) {
        testimonialController.getAllTestimonials (req, next)
            .then(function(testimonials){
                //if exists, return data in json format
                if (testimonials) {
                    res.status(HTTPStatus.OK);
                    res.json(testimonials);
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

    return testimonialRouter;

})();

module.exports = testimonialRoutes;