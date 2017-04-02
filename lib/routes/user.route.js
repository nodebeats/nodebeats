var userRoutes = (function () {

    'use strict';

    var HTTPStatus = require('http-status'),
        express = require('express'),
        tokenAuthMiddleware = require('../middlewares/token.authentication.middleware'),
        roleAuthMiddleware = require('../middlewares/role.authorization.middleware'),
        messageConfig = require('../configs/api.message.config'),
        userController = require('../controllers/user.server.controller'),
        imageFilePath = './public/uploads/images/users/',
        uploadPrefix = 'user',
        fileUploadHelper = require('../helpers/file.upload.helper')(imageFilePath, '', uploadPrefix),
        uploader = fileUploadHelper.uploader,
        userRouter = express.Router();

    userRouter.route('/user/')

    /**
     * @api {get} /api/user/ Get user list
     * @apiPermission admin
     * @apiName getUsers
     * @apiGroup User
     *
     * @apiParam {Int} perpage Number of data to return on each request
     * @apiParam {Int} page Current page number of pagination system.
     * @apiParam {String} username  username of the user registered in the system
     *
     *   @apiParamExample {json} Request-Example:
     *     {
     *       "perpage": 10,
     *       "page": 1
     *     }
     *   @apiParamExample {json} Request-Example:
     *     {
     *       "perpage": 10,
     *       "page": 1,
     *       "username": "shrawanlakhey@gmail.com"
     *     }
     *
     * @apiDescription Retrieves the user list, if exists, else return empty array
     * @apiVersion 0.0.1
     *
     * @apiHeader (AuthorizationHeader) {String} authorization x-access-token value.
     * @apiHeaderExample {json} Header-Example:
     *{
     *  "x-access-token": "yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c"
     * }
     *
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/user/" \
     * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2OTE4MzQ0MCwiZXhwIjoxNDY5MjAzNDQwLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.KSp3_S2LEhixyzTnNJE9AtD5u7-8ljImr-Np0kzxkoNWWjqB66a_T67NTCTMoMZys7PIYPFNBR9VwLOhkrX7BQ" \
     *--data-urlencode "perpage=10" \
     * --data-urlencode "page=1"
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/user/" \
     * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2OTE4MzQ0MCwiZXhwIjoxNDY5MjAzNDQwLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.KSp3_S2LEhixyzTnNJE9AtD5u7-8ljImr-Np0kzxkoNWWjqB66a_T67NTCTMoMZys7PIYPFNBR9VwLOhkrX7BQ" \
     *--data-urlencode "perpage=10" \
     * --data-urlencode "page=1" \
     * --data-urlencode "username=shrawanlakhey@gmail.com"
     *
     *
     * @apiSuccess {Array} dataList list of users in the system
     * @apiSuccess {String} dataList._id  object id of user data.
     * @apiSuccess {String} dataList.firstName  first name of the user.
     * @apiSuccess {String} dataList.middleName middle name of the user.
     * @apiSuccess {String} dataList.lastName   last name of the user.
     * @apiSuccess {String} dataList.email  email address of the user.
     * @apiSuccess {String} dataList.username  username used when registering in the system, by default, same as email address.
     * @apiSuccess {String} dataList.phoneNumber phone number of the  user.
     * @apiSuccess {String} dataList.mobileNumber  mobile number of the user.
     * @apiSuccess {String} dataList.securityQuestion  question selected by the user as a backup or extra security mechanism.
     * @apiSuccess {Boolean} dataList.active  active bit status of the user.
     * @apiSuccess {String} dataList.userRole  role of the user in the system.
     * @apiSuccess {String} dataList.imageName  name of the image file of the user avatar.
     * @apiSuccess {String} dataList.twoFactorAuthEnabled  multi-factor or two factor authentication is enabled in the system or not.
     * @apiSuccess {String} dataList.addedOn date of user registered in the system .
     * @apiSuccess {String} dataList.blocked user blocked or not.
     * @apiSuccess {String} dataList.userConfirmed user registration confirmed or not.
     * @apiSuccess {String} dataList.imageProperties  meta-data info of image file.
     * @apiSuccess {String} dataList.imageProperties.imageExtension  extension of image file .
     * @apiSuccess {String} dataList.imageProperties.imagePath  path of image file.
     * @apiSuccess {Int} totalItems  total no of users in the related collection in database.
     * @apiSuccess {Int} currentPage  current page number of client pagination system.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *           "dataList": [
     *               {
     *                   "_id": "57833052319c2cae0defc7b5",
     *                   "imageName": "user-1468215378497.webp",
     *                    "securityQuestion": "Favourite Movie?",
     *                   "mobileNumber": "9818278372",
     *                   "phoneNumber": "01-5560147",
     *                   "username": "shrawanlakhey@gmail.com",
     *                   "email": "shrawanlakhey@gmail.com",
     *                   "lastName": "Lakhe",
     *                   "firstName": "Shrawan",
     *                   "userConfirmed": true,
     *                   "imageProperties": {
     *                       "imagePath": "public/uploads/images/users/user-1468215378497.jpg",
     *                       "imageExtension": "jpg"
     *                   },
     *                   "blocked": false,
     *                   "addedOn": "2016-07-11T05:36:18.906Z",
     *                   "twoFactorAuthEnabled": true,
     *                   "userRole": "admin",
     *                   "active": true
     *               },
     *               {
     *                   "_id": "577f5c1b5869902d67eb22a8",
     *                   "mobileNumber": "",
     *                   "phoneNumber": "",
     *                   "username": "superadmin",
     *                   "email": "hello@bitsbeat.com",
     *                   "lastName": "superadmin",
     *                   "middleName": "",
     *                   "firstName": "superadmin",
     *                   "userConfirmed": true,
     *                   "blocked": false,
     *                   "addedOn": "2016-07-08T07:54:03.766Z",
     *                   "twoFactorAuthEnabled": false,
     *                   "userRole": "admin",
     *                   "active": true
     *               }
     *           ],
     *           "totalItems": 2,
     *           "currentPage": 1
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
     *
     * @apiError  (NotFound) {String} message  User not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "User not found"
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

        .get(tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, getUsers)

        /**
         * @api {post} /api/user/ Post user information data
         * @apiPermission admin
         * @apiName saveUsers
         * @apiGroup User
         *
         * @apiParam {String} firstName   Mandatory  first name of the user.
         * @apiParam {String} lastName    Mandatory    last name of the user.
         * @apiParam {String} email    Mandatory   email address of the user.
         * @apiParam {String} securityQuestion    Mandatory   question selected by the user as a backup or extra security mechanism.
         * @apiParam {String} securityAnswer   Mandatory    security answer.
         * @apiParam {String} userRole    Mandatory   role of the user in the system.
         *
         *
         * @apiDescription saves user information to the database
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
         * http://localhost:3000/api/user/ \
         * -H "Content-Type: multipart/form-data"  \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2OTE4MzQ0MCwiZXhwIjoxNDY5MjAzNDQwLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.KSp3_S2LEhixyzTnNJE9AtD5u7-8ljImr-Np0kzxkoNWWjqB66a_T67NTCTMoMZys7PIYPFNBR9VwLOhkrX7BQ" \
         * -F avatar=@public/images/404_banner.png  \
         * -F "data={\"firstName\": \"tom\",\"lastName\": \"cruise\",\"email\": \"testnodecms@gmail.com\",\"password\": \"testnodecms@123\",\"phoneNumber\": \"55232659858\",\"securityQuestion\": \"favourite cartoon series?\",\"securityAnswer\": \"transformers series\",\"userRole\": \"admin\"};type=application/json"
         * @apiSuccess {String} message User saved successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "User saved successfully"
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
         * @apiError  (BadRequest) {String[]} message validation errors due to not entering values for  mandatory fields first name, last name, email address, user role, password, security question and answer to that question
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *
         *     {
         *       "message":[
         *                      {"param":"securityQuestion","msg":"Security question is required"},
         *                      {"param":"securityAnswer","msg":"Security answer is required"},
         *                      {"param":"firstName","msg":"First name is required"},
         *                      {"param":"lastName","msg":"Last name is required"},
         *                      {"param":"email","msg":"Email is required"},
         *                      {"param":"userRole","msg":"User role is required"},
         *                      {"param":"password","msg":"Password is required","value":""}
         *                 ]
         *     }
         *
         *
         *
         * @apiError  (AlreadyExists)  {String} message  User with same username already exists
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 409 Conflict
         *     {
         *       "message": "User with same username already exists"
         *     }
         *
         *
         * @apiError  (BadRequest) {String} message password must not be same as username of the user
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *
         *     {
         *       "message": "Password must not contain the username"
         *     }
         *
         *
         * @apiError  (BadRequest) {String} message password must be strong and must contain commonly used passwords to enforce password security
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *
         *     {
         *       "message": "Password is very weak. Please try the combination of lowercase alphabets, uppercase alphabets, numbers, symbols and a minimum of 8 characters long password"
         *     }
         *
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

        .post(tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, uploader.single('avatar'), fileUploadHelper.imageUpload, userController.saveUsers);



    //middleware function that will get the user object for each of the routes defined downwards for routes matching /api/:userId
    userRouter.use('/user/:userId', tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, function (req, res, next) {
        userController.getUserByID(req)
            .then(function(user){
                //saving in request object so that it can be used for other operations like updating data using put and patch method
                if (user) {
                    req.user = user;
                    next();
                    return null;// return a non-undefined value to signal that we didn't forget to return promise
                } else {
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.user.notFound
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    });

    userRouter.route('/user/:userId')

    /**
     * @api {get} /api/user/:userId Get user  information object by user ID
     * @apiPermission admin
     * @apiName getUserByID
     * @apiGroup User
     *
     *
     * @apiParam {String} userId  object id of the user
     *
     *   @apiParamExample {json} Request-Example:
     *     {
     *       "userId": "57833052319c2cae0defc7b5"
     *     }
     *
     *
     * @apiDescription Retrieves the user object by ID, if exists, else return empty object
     * @apiVersion 0.0.1
     *
     * @apiHeader (AuthorizationHeader) {String} authorization x-access-token value.
     * @apiHeaderExample {json} Header-Example:
     *{
     *  "x-access-token": "yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c"
     * }
     *
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/user/57833052319c2cae0defc7b5" \
     * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2OTE4MzQ0MCwiZXhwIjoxNDY5MjAzNDQwLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.KSp3_S2LEhixyzTnNJE9AtD5u7-8ljImr-Np0kzxkoNWWjqB66a_T67NTCTMoMZys7PIYPFNBR9VwLOhkrX7BQ"
     *
     *
     *
     * @apiSuccess {String} _id  object id of user data.
     * @apiSuccess {String} firstName  first name of the user.
     * @apiSuccess {String} middleName middle name of the user.
     * @apiSuccess {String} lastName   last name of the user.
     * @apiSuccess {String} email  email address of the user.
     * @apiSuccess {String} username  username used when registering in the system, by default, same as email address.
     * @apiSuccess {String} phoneNumber phone number of the  user.
     * @apiSuccess {String} mobileNumber  mobile number of the user.
     * @apiSuccess {String} securityQuestion  question selected by the user as a backup or extra security mechanism.
     * @apiSuccess {Boolean} active  active bit status of the user.
     * @apiSuccess {String} userRole  role of the user in the system.
     * @apiSuccess {String} imageName  name of the image file of the user avatar.
     * @apiSuccess {String} twoFactorAuthEnabled  multi-factor or two factor authentication is enabled in the system or not.
     * @apiSuccess {String} addedOn date of user registered in the system .
     * @apiSuccess {String} blocked user blocked or not.
     * @apiSuccess {String} userConfirmed user registration confirmed or not.
     * @apiSuccess {String} imageProperties  meta-data info of image file.
     * @apiSuccess {String} imageProperties.imageExtension  extension of image file .
     * @apiSuccess {String} imageProperties.imagePath  path of image file.
     *
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *           "_id": "57833052319c2cae0defc7b5",
     *           "imageName": "user-1468215378497.webp",
     *           "securityQuestion": "Favourite Movie?",
     *           "mobileNumber": "9818278372",
     *           "phoneNumber": "01-5560147",
     *           "username": "shrawanlakhey@gmail.com",
     *           "email": "shrawanlakhey@gmail.com",
     *           "lastName": "Lakhe",
     *           "firstName": "Shrawan",
     *           "userConfirmed": true,
     *           "imageProperties": {
     *               "imagePath": "public/uploads/images/users/user-1468215378497.jpg",
     *               "imageExtension": "jpg"
     *           },
     *           "blocked": false,
     *           "addedOn": "2016-07-11T05:36:18.906Z",
     *           "twoFactorAuthEnabled": true,
     *           "userRole": "admin",
     *           "active": true
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
     * @apiError  (NotFound) {String} message  User not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "User not found"
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
            res.json(req.user);
        })

        /**
         * @api {patch} /api/user/:userId  Deletes existing user information  data from the database
         * @apiPermission admin
         * @apiName patchUserInformation
         * @apiGroup User
         *
         *
         * @apiParam {String} userId  object id of the user
         *
         *   @apiParamExample {json} Request-Example:
         *     {
         *       "userId": "57833052319c2cae0defc7b5"
         *     }
         *
         *
         *
         * @apiDescription Deletes existing user information data from the database
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
         * http://localhost:3000/api/user/5791fc7cf7b57f69796ef444 \
         * -H 'Content-Type: application/json' \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2OTE4MzQ0MCwiZXhwIjoxNDY5MjAzNDQwLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.KSp3_S2LEhixyzTnNJE9AtD5u7-8ljImr-Np0kzxkoNWWjqB66a_T67NTCTMoMZys7PIYPFNBR9VwLOhkrX7BQ" \
         * -d '{"deleted":"true"}'
         *
         * @apiSuccess {String} message User deleted successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "User deleted successfully"
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
         * @apiError  (MethodNotAllowed)  {String} message  superadmin cannot be deleted
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 405 Method Not Allowed
         *     {
         *        "message": "superadmin cannot be deleted"
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


        /**
         * @api {patch} /api/user/:userId  Updates  user's password information to the  database
         * @apiPermission admin
         * @apiName patchUserInformation
         * @apiGroup User
         *
         *
         * @apiParam {String} userId  object id of the user
         *
         *   @apiParamExample {json} Request-Example:
         *     {
         *       "userId": "57833052319c2cae0defc7b5"
         *     }
         *
         *
         *
         * @apiDescription Updates user's password information data to the database
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
         *
         * curl \
         * -v \
         * -X PATCH  \
         * http://localhost:3000/api/user/5791fc7cf7b57f69796ef444 \
         * -H 'Content-Type: application/json' \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2OTE4MzQ0MCwiZXhwIjoxNDY5MjAzNDQwLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.KSp3_S2LEhixyzTnNJE9AtD5u7-8ljImr-Np0kzxkoNWWjqB66a_T67NTCTMoMZys7PIYPFNBR9VwLOhkrX7BQ" \
         * -d '{"password":"nodecms@123"}'
         *
         * @apiSuccess {String} message Password changed successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "Password changed successfully"
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
         * @apiError  (BadRequest) {String} message password must not be same as username of the user
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *
         *     {
         *       "message": "Password must not contain the username"
         *     }
         *
         *
         * @apiError  (BadRequest) {String} message password must be strong and must contain commonly used passwords to enforce password security
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *
         *     {
         *       "message": "Password is very weak. Please try the combination of lowercase alphabets, uppercase alphabets, numbers, symbols and a minimum of 8 characters long password"
         *     }
         *
         *
         * @apiError  (Forbidden) {String} message You are not allowed to change the password of superadmin user
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 403 Forbidden
         *
         *     {
         *       "message": "You are not allowed to change the password of superadmin user"
         *     }
         *
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


        /**
         * @api {patch} /api/user/:userId  Updates  user's security answer information to the  database
         * @apiPermission admin
         * @apiName patchUserInformation
         * @apiGroup User
         *
         *
         * @apiParam {String} userId  object id of the user
         *
         *   @apiParamExample {json} Request-Example:
         *     {
         *       "userId": "57833052319c2cae0defc7b5"
         *     }
         *
         *
         *
         * @apiDescription Updates user's security answer information data to the database
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
         *
         * curl \
         * -v \
         * -X PATCH  \
         * http://localhost:3000/api/user/5791fc7cf7b57f69796ef444 \
         * -H 'Content-Type: application/json' \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2OTE4MzQ0MCwiZXhwIjoxNDY5MjAzNDQwLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.KSp3_S2LEhixyzTnNJE9AtD5u7-8ljImr-Np0kzxkoNWWjqB66a_T67NTCTMoMZys7PIYPFNBR9VwLOhkrX7BQ" \
         * -d '{"securityQuestion":"favorite movie","securityAnswer":"Harry Potter"}'
         *
         * @apiSuccess {String} message Security answer changed successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "Security answer changed successfully"
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

        .patch(tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, userController.patchUserInformation)

        /**
         * @api {put} /api/user/:userId  Updates existing user information  data to the database
         * @apiPermission admin
         * @apiName updateUser
         * @apiGroup User
         *
         *
         * @apiParam {String} userId  object id of the user
         *
         *   @apiParamExample {json} Request-Example:
         *     {
         *       "userId": "57833052319c2cae0defc7b5"
         *     }
         *
         *
         *
         * @apiDescription Update existing user information data object to the database
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
         * http://localhost:3000/api/user/5791fc7cf7b57f69796ef444 \
         * -H "Content-Type: multipart/form-data"  \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2OTE4MzQ0MCwiZXhwIjoxNDY5MjAzNDQwLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.KSp3_S2LEhixyzTnNJE9AtD5u7-8ljImr-Np0kzxkoNWWjqB66a_T67NTCTMoMZys7PIYPFNBR9VwLOhkrX7BQ" \
         * -F avatar=@public/images/404_banner.png  \
         * -F "data={\"firstName\": \"david\",\"lastName\": \"beckham\",\"email\": \"testnodecms@gmail.com\",\"phoneNumber\": \"556000023\",\"mobileNumber\": \"977-9999999999\",\"userRole\": \"admin\"};type=application/json"
         *
         * @apiSuccess {String} message User updated successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "User updated successfully"
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
         * @apiError  (BadRequest) {String[]} message validation errors due to not entering values for  mandatory fields first name, last name, email address, user role
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *
         *     {
         *       "message":[
         *                      {"param":"firstName","msg":"First name is required"},
         *                      {"param":"lastName","msg":"Last name is required"},
         *                      {"param":"email","msg":"Email is required"},
         *                      {"param":"userRole","msg":"User role is required"}
         *                 ]
         *     }
         *
         *
         *
         * @apiError  (AlreadyExists)  {String} message  User with same username already exists
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 409 Conflict
         *     {
         *       "message": "User with same username already exists"
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

        .put(tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, uploader.single('avatar'), fileUploadHelper.imageUpload, userController.updateUser);

    userRouter.route('/change-password/verify/')

    /**
     * @api {post} /api/change-password/verify/ Post data to the server to check for password change authorization
     * @apiPermission admin
     * @apiName verifyPasswordChangeRequest
     * @apiGroup User
     * @apiDescription Post the combination of email, security question and security answer to check for password change authorization, if combination is correct, then user is allowed to change the password,else not authorized to change pasword
     * @apiVersion 0.0.1
     *
     *
     * @apiExample {curl} Example usage:
     *
     *
     * curl \
     * -v \
     * -X POST  \
     * http://localhost:3000/api/change-password/verify/ \
     * -H 'Content-Type: application/json' \
     * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2OTE5MzE0MiwiZXhwIjoxNDY5MjEzMTQyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.oxQ3PAr2FVGUNiVXpRGK0cpKjfDe6b2K1Dkl_cOE6W4Mtk6HRrI0bNyzkkuwp7DWhWAwgJWRTVR4irw2AkjjmQ" \
     * -d '{"email":"testnodecms@gmail.com","securityQuestion":"favorite movie","securityAnswer":"Harry Potter"}'
     *
     *
     *
     *
     * @apiSuccess {String} message A password change confirmation email has been sent to your email.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "message": "An email has been sent to your email address that contains the link to change your password.Please check your email"
     *       }
     *
     *
     *
     * @apiError  (BadRequest) {String[]} message validation errors due to not entering values for  mandatory fields email address, security question and answer to that question
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *
     *     {
     *       "message":[
     *                      {"param":"email","msg":"Email is required"},
     *                      {"param":"securityQuestion","msg":"Security question is required"},
     *                      {"param":"securityAnswer","msg":"Security answer is required"}
     *                 ]
     *     }
     *
     *
     *
     * @apiError  (UnAuthorizedError)  {String} message  User account is blocked
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 401 Unauthorized
     *     {
     *       "message": "You are currently blocked. Please check email forwarded to your email and click the link."
     *     }
     *
     *
     * @apiError  (UnAuthorizedError) {String} message user account registration is not confirmed yet.Please click check your email and click the confirmation link
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 401 Unauthorized
     *
     *     {
     *       "message": "User account not confirmed. Please check your email and click on the link sent to you in the confirmation email to verify your account."
     *     }
     *
     *
     * @apiError  (UnAuthorizedError) {String} message Not authorized to change the password
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 401 Unauthorized
     *
     *     {
     *       "message": "You are not authorized to change the password. Please enter the correct combination of data to be able to change the password"
     *     }
     *
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

        .post(verifyPasswordChangeRequest);


    userRouter.route('/change-password/confirm/:accessToken')

    /**
     * @api {patch} /api/change-password/confirm/:accessToken  Updates  user's password information to the  database
     * @apiPermission public
     * @apiName implementForgotPasswordAction
     * @apiGroup User
     *
     *
     * @apiParam {String} accessToken  Password verify access token
     *
     *   @apiParamExample {json} Request-Example:
     *     {
     *       "accessToken": "57833052319c2cae0defc7b5"
     *     }
     *
     *
     *
     * @apiDescription Updates user's password information data to the database
     * @apiVersion 0.0.1
     *
     * @apiExample {curl} Example usage:
     *
     *
     *
     * curl \
     * -v \
     * -X PATCH  \
     * http://localhost:3000/api/change-password/confirm/5791fc7cf7b57f69796ef444 \
     * -H 'Content-Type: application/json' \
     * -d '{"password":"nodecms@123"}'
     *
     * @apiSuccess {String} message Password changed successfully.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "message": "Password changed successfully"
     *       }
     *
     *
     * @apiError  (BadRequest) {String} message password must not be same as username of the user
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *
     *     {
     *       "message": "Password must not contain the username"
     *     }
     *
     *
     * @apiError  (BadRequest) {String} message password must be strong and must contain commonly used passwords to enforce password security
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *
     *     {
     *       "message": "Password is very weak. Please try the combination of lowercase alphabets, uppercase alphabets, numbers, symbols and a minimum of 8 characters long password"
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

        .patch(userController.implementForgotPasswordAction);



    //function declaration to return user list to the client, if exists, else return not found message
    function getUsers(req, res, next) {
        userController.getUsers(req, next)
            .then(function(userList){
                //if exists, return data in json format
                if (userList) {
                    res.status(HTTPStatus.OK);
                    res.json(userList);
                } else {
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.user.notFound
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    }


    //function declaration to verify password change request , if data combination of security question,, security answer and username correct, then send password change confirmation email else return not allowed message
    function verifyPasswordChangeRequest(req, res, next) {
        userController.verifySecurityAnswer(req, res, next)
            .then(function(){
                res.status(HTTPStatus.OK);
                res.json({
                    message : messageConfig.user.passwordChangeConfirmationEmail
                });
            })
            .catch(function(err){
                return next(err);
            });
    }

    return userRouter;

})();

module.exports = userRoutes;