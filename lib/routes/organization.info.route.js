var organizationInfoRoutes = (function () {

    'use strict';

    var HTTPStatus = require('http-status'),
        express = require('express'),
        tokenAuthMiddleware = require('../middlewares/token.authentication.middleware'),
        roleAuthMiddleware = require('../middlewares/role.authorization.middleware'),
        messageConfig = require('../configs/api.message.config'),
        organizationInformationController = require('../controllers/organization.information.server.controller'),
        imageFilePath = './public/uploads/images/organizationlogo/',
        uploadPrefix = 'organizationlogo',
        fileUploadHelper = require('../helpers/file.upload.helper')(imageFilePath, '', uploadPrefix),
        uploader = fileUploadHelper.uploader,
        organizationInfoRouter = express.Router();


    organizationInfoRouter.route('/')

    /**
     * @api {get} /api/organization/info/ Get Organization Information
     * @apiPermission public
     * @apiName getOrganizationInfo
     * @apiGroup OrganizationInfo
     * @apiDescription Retrieves the organization information if exists, else return empty object
     * @apiVersion 0.0.1
     *
     *
     * @apiExample {curl} Example usage:
     * curl -i http://localhost:3000/api/organization/info
     *
     *
     * @apiSuccess {String} _id object id of the organization info data
     * @apiSuccess {String} orgName name of the organization
     * @apiSuccess {String} country name of the country organization currently resides.
     * @apiSuccess {String} region  name of the region.
     * @apiSuccess {String} state  name of the state.
     * @apiSuccess {String} city name of the city.
     * @apiSuccess {String} addressLine  address of the organization.
     * @apiSuccess {String} streetAddress  street address of the organization.
     * @apiSuccess {String} zipAddress zip address.
     * @apiSuccess {String} postalCode  postal code.
     * @apiSuccess {String} organizationEmail  official email of the organization.
     * @apiSuccess {String} phoneNumber Phone Number of an organization.
     * @apiSuccess {String} mobileNumber  mobile Number of the contact person of the organization.
     * @apiSuccess {String} faxNumber  Fax-Number of an organization.
     * @apiSuccess {String} facebookURL Facebook account url of the organization.
     * @apiSuccess {String} twitterURL  Twitter account url of the organization.
     * @apiSuccess {String} googlePlusURL  Google-Plus account url of the organization.
     * @apiSuccess {String} linkedInURL  LinkedIn account url of the organization.
     * @apiSuccess {String} slogan Slogan of the company.
     * @apiSuccess {String} logoImageName  Image name of the logo.
     * @apiSuccess {String} imageProperties  Metadata information of logo image.
     * @apiSuccess {String} imageProperties.imageExtension  Metadata information of logo image.
     * @apiSuccess {String} imageProperties.imagePath  path of logo image file.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *     "_id": "57076e54c795d673583483e9",
     *     "orgName":"Nodebeats",
      *     "country": "United States of America",
      *     "region": "Central Region",
      *     "state": "Pradesh Number 2",
      *     "city": "Lalitpur",
      *     "addressLine": "Thaiba -11",
      *     "streetAddress": "Godawari Street",
      *     "zipAddress": "00977",
      *     "postalCode": "44700",
       *     "organizationEmail": "bitsbeat@gmail.com",
       *     "phoneNumber": "977-01-5560147",
       *     "mobileNumber": "977-9818278372",
       *     "faxNumber": "977-01-4523659",
       *     "facebookURL": "https://facebook.com",
        *     "twitterURL": "https://twitter.com",
        *     "googlePlusURL": "https://googleplus.com",
        *     "linkedInURL": "https://linkedin.com",
       *     "slogan": "Slogan haha",
        *     "logoImageName": "image_1.jpg",
        *     "imageProperties": {
        *       "imageExtension": "jpg"
        *       "imagePath": "/path/image_1.jpg"
        *     }
        *     }
     *
     *
     *
     * @apiError  (NotFound) {String} message  Organization information not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
 *       "message": "Organization information not found"
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

        .get( getOrganizationInfo )


        /**
         * @api {post} /api/organization/info/ Post organization Info
         * @apiPermission admin
         * @apiName postOrganizationInfo
         * @apiGroup OrganizationInfo
         * @apiParam {String} orgName Mandatory name of the organization
         * @apiParam {String} country  Mandatory name of the country organization currently resides.
         * @apiParam {String} city Mandatory name of the city.
         * @apiParam {String} streetAddress  Mandatory street address of the organization.
         * @apiParam {String} organizationEmail Mandatory  official email of the organization.
         *
         * @apiDescription saves organization information to the database along with uploading of logo image of the organization
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
         * http://localhost:3000/api/organization/info/ \
         * -H "Content-Type: multipart/form-data"  \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODQ5MDM0NywiZXhwIjoxNDY4NTEwMzQ3LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.mPvyA2KmBHHm2BHCITXq_B9HKu-01YseiKOSII43MxM8RHOiOllxvqZZT-1BENIKUfT_Ia481tnSZE_6ooCZpQ" \
         * -F imageName=@public/images/404_banner.png  \
         * -F "data={\"orgName\": \"Nodebeats\",\"country\": \"United States of America\",\"region\": \"Central Region\",\"state\": \"Pradesh Number 2\",\"city\": \"Lalitpur\",\"addressLine\":\"Thaiba-11\",\"streetAddress\": \"Godawari Street\",\"zipAddress\": \"00977\",\"postalCode\": \"44700\",\"organizationEmail\":\"bitsbeat@gmail.com\"};type=application/json"
         * @apiSuccess {String} message Organization information saved successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "Organization information saved successfully"
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
         * @apiError (AlreadyExists)  {String} message  Organization Information already exists, only can update existing data. new inserts is not allowed
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 409 Conflict
         *     {
         *       "message": "You can only update organization information"
         *     }
         *
         *
         * @apiError  (BadRequest) {Array} message  Organization Info post method throws error if either of organization name, country, city, streetAddress and organizationEmail is not provided or invalid data entry of organizationEmail, facebookURL, twitterURL, googlePlusURL, linkedInURL
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *     {
         *       "message": "[{"param":"orgName","msg":"Organization Name is required","value":""},{"param":"city","msg":"City is required","value":""},{"param":"streetAddress","msg":"Street address is required","value":""},{"param":"organizationEmail","msg":"Email is required","value":""},{"param":"organizationEmail","msg":"Invalid Email","value":""}]"
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

        .post( tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, uploader.single('imageName'), fileUploadHelper.imageUpload, organizationInformationController.postOrganizationInfo );



    //middleware function that will get the organization information data for each of the routes defined downwards
    organizationInfoRouter.use('/:organizationInfoId', function(req, res, next){
        organizationInformationController.getOrganizationInfoByID(req)
            .then(function(organizationInfo){
                //saving in request object so that it can be used for other operations like updating data using put and patch method
                if(organizationInfo){
                    req.organizationInfo = organizationInfo;
                    next();
                    return null;// return a non-undefined value to signal that we didn't forget to return promise
                }else{
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.organizationInfo.notFound
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    });

    organizationInfoRouter.route('/:organizationInfoId')


    /**
     * @api {get} /api/organization/info/:organizationInfoId Get Organization Info by Id
     * @apiPermission public
     * @apiName getOrganizationInfoByID
     * @apiGroup OrganizationInfo
     *
     *
     * @apiParam {String} organizationInfoId  object id of the organization info data
     *
     *  * @apiParamExample {json} Request-Example:
     *     {
     *       "organizationInfoId": "57889ae9585d9632523f1234"
     *     }
     *
     *
     * @apiDescription Retrieves the organization information querying by id if exists, else return empty object
     * @apiVersion 0.0.1
     *
     *
     * @apiExample {curl} Example usage:
     * curl -i http://localhost:3000/api/organization/info/57076e54c795d673583483e9
     *
     *
     * @apiSuccess {String} _id object id of the organization info data
     * @apiSuccess {String} orgName name of the organization
     * @apiSuccess {String} country name of the country organization currently resides.
     * @apiSuccess {String} region  name of the region.
     * @apiSuccess {String} state  name of the state.
     * @apiSuccess {String} city name of the city.
     * @apiSuccess {String} addressLine  address of the organization.
     * @apiSuccess {String} streetAddress  street address of the organization.
     * @apiSuccess {String} zipAddress zip address.
     * @apiSuccess {String} postalCode  postal code.
     * @apiSuccess {String} organizationEmail  official email of the organization.
     * @apiSuccess {String} phoneNumber Phone Number of an organization.
     * @apiSuccess {String} mobileNumber  mobile Number of the contact person of the organization.
     * @apiSuccess {String} faxNumber  Fax-Number of an organization.
     * @apiSuccess {String} facebookURL Facebook account url of the organization.
     * @apiSuccess {String} twitterURL  Twitter account url of the organization.
     * @apiSuccess {String} googlePlusURL  Google-Plus account url of the organization.
     * @apiSuccess {String} linkedInURL  LinkedIn account url of the organization.
     * @apiSuccess {String} slogan Slogan of the company.
     * @apiSuccess {String} logoImageName  Image name of the logo.
     * @apiSuccess {String} imageProperties  Metadata information of logo image.
     * @apiSuccess {String} imageProperties.imageExtension  Metadata information of logo image.
     * @apiSuccess {String} imageProperties.imagePath  path of logo image file.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *     "_id": "57076e54c795d673583483e9",
     *     "orgName":"Nodebeats",
      *     "country": "United States of America",
      *     "region": "Central Region",
      *     "state": "Pradesh Number 2",
      *     "city": "Lalitpur",
      *     "addressLine": "Thaiba -11",
      *     "streetAddress": "Godawari Street",
      *     "zipAddress": "00977",
      *     "postalCode": "44700",
       *     "organizationEmail": "bitsbeat@gmail.com",
       *     "phoneNumber": "977-01-5560147",
       *     "mobileNumber": "977-9818278372",
       *     "faxNumber": "977-01-4523659",
       *     "facebookURL": "https://facebook.com",
        *     "twitterURL": "https://twitter.com",
        *     "googlePlusURL": "https://googleplus.com",
        *     "linkedInURL": "https://linkedin.com",
       *     "slogan": "Slogan haha",
        *     "logoImageName": "image_1.jpg",
        *     "imageProperties": {
        *       "imageExtension": "jpg"
        *       "imagePath": "/path/image_1.jpg"
        *     }
        *     }
     *
     *
     *
     * @apiError  (NotFound) {String} message  Organization information not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
 *       "message": "Organization information not found"
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
            res.json( req.organizationInfo );
        })


        /**
         * @api {put} /api/organization/info/:organizationInfoId Update organization Info
         * @apiPermission admin
         * @apiName updateOrganizationInfo
         * @apiGroup OrganizationInfo
         *
         *
         * @apiParam {String} organizationInfoId object id of the organization info data
         *
         *  * @apiParamExample {json} Request-Example:
         *     {
         *       "organizationInfoId": "57889ae9585d9632523f1234"
         *     }
         *
         *
         * @apiDescription update organization information to the database along with upload of logo image of the organization
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
         * -X PUT  \
         * http://localhost:3000/api/organization/info/578765a28d968678730b8b64 \
         * -H "Content-Type: multipart/form-data"  \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODQ5MDM0NywiZXhwIjoxNDY4NTEwMzQ3LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.mPvyA2KmBHHm2BHCITXq_B9HKu-01YseiKOSII43MxM8RHOiOllxvqZZT-1BENIKUfT_Ia481tnSZE_6ooCZpQ" \
         * -F imageName=@public/images/404_banner.png  \
         * -F "data={\"orgName\": \"Nodebeats\",\"country\": \"United States of America\",\"region\": \"Central Region\",\"state\": \"Pradesh Number 2\",\"city\": \"Lalitpur\",\"addressLine\":\"Thaiba-11\",\"streetAddress\": \"Godawari Street\",\"zipAddress\": \"00977\",\"postalCode\": \"44700\",\"organizationEmail\":\"bitsbeat@gmail.com\"};type=application/json"
         * @apiSuccess {String} message Organization information updated successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
 *         "message": "Organization information updated successfully"
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
         * @apiError  (BadRequest) {Array} message  Organization Info put method throws error if either of organization name, country, city, streetAddress and organizationEmail is not provided or invalid data entry of organizationEmail, facebookURL, twitterURL, googlePlusURL, linkedInURL
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *     {
 *       "message": "[{"param":"orgName","msg":"Organization Name is required","value":""},{"param":"city","msg":"City is required","value":""},{"param":"streetAddress","msg":"Street address is required","value":""},{"param":"organizationEmail","msg":"Email is required","value":""},{"param":"organizationEmail","msg":"Invalid Email","value":""}]"
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
        .put( tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, uploader.single('imageName'), fileUploadHelper.imageUpload, organizationInformationController.updateOrganizationInfo );


    //function declaration to return organization information data to the client if exists else return not found message
    function getOrganizationInfo(req, res, next) {
        organizationInformationController.getOrganizationInfo ()
            .then(function(organizationInfo){
                //if exists, return data in json format
                if (organizationInfo) {
                    res.status(HTTPStatus.OK);
                    res.json(organizationInfo);
                } else {
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.organizationInfo.notFound
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    }

    return organizationInfoRouter;

})();

module.exports = organizationInfoRoutes;