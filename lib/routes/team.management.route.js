var teamMemberRoutes = (function () {

    'use strict';

    var HTTPStatus = require('http-status'),
        express = require('express'),
        tokenAuthMiddleware = require('../middlewares/token.authentication.middleware'),
        roleAuthMiddleware = require('../middlewares/role.authorization.middleware'),
        messageConfig = require('../configs/api.message.config'),
        teamMemberController = require('../controllers/team.management.server.controller'),
        imageFilePath = './public/uploads/images/teammember/',
        uploadPrefix = 'teammember',
        fileUploadHelper = require('../helpers/file.upload.helper')(imageFilePath, '', uploadPrefix),
        uploader = fileUploadHelper.uploader,
        teamMemberRouter = express.Router();


    teamMemberRouter.route('/team')

    /**
     * @api {get} /api/team/ Get team members list
     * @apiPermission public
     * @apiName getTeamMembers
     * @apiGroup TeamManagement
     *
     * @apiParam {Boolean} active whether to get data with active bit true or false, if true, then returns data list with active bit set to true only
     * @apiParam {Int} perpage Number of data to return on each request
     * @apiParam {Int} page Current page number of pagination system.
     * @apiParam {String} teamMemberName to filter team member list using person name as filter param
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
     *       "teamMemberName": "shrawan"
     *     }
     *
     * @apiDescription Retrieves the team members list if exists, else return empty array
     * @apiVersion 0.0.1
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/team" \
     * --data-urlencode "perpage=10" \
     * --data-urlencode "page=1"
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/team" \
     * --data-urlencode "active=true" \
     * --data-urlencode "teamMemberName=shrawan lakhe"
     *
     *
     * @apiSuccess {Array} dataList list of team members
     * @apiSuccess {String} dataList._id  object id of team member data.
     * @apiSuccess {String} dataList.teamMemberName  name of the person or team-member.
     * @apiSuccess {String} dataList.email email address of the person/team-member.
     * @apiSuccess {String} dataList.phoneNumber   contact number of the team-member.
     * @apiSuccess {String} dataList.facebookURL  facebook url of the person.
     * @apiSuccess {String} dataList.twitterURL  twitter url of the person.
     * @apiSuccess {String} dataList.googlePlusURL google plus url of the person.
     * @apiSuccess {String} dataList.linkedInURL  linked in url of the person.
     * @apiSuccess {String} dataList.address  address where team-member lives.
     * @apiSuccess {String} dataList.designation  Designation of the person.
     * @apiSuccess {String} dataList.description brief description about team-member.
     * @apiSuccess {String} dataList.hierarchyOrder position in the heirarchical office system.
     * @apiSuccess {String} dataList.imageName name of the image file.
     * @apiSuccess {Boolean} dataList.active  active bit status.
     * @apiSuccess {Int} totalItems  total no of team-members in the related collection in database.
     * @apiSuccess {Int} currentPage  current page number of client pagination system.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *           "dataList": [
     *               {
     *                   "_id": "578b54e0ebe03c31438ba406",
     *                   "imageName": "",
     *                   "hierarchyOrder": 1,
     *                   "description": "A tech enthusiast",
     *                   "designation": "CTO",
     *                   "address": "",
     *                   "linkedInURL": "",
     *                   "googlePlusURL": "",
     *                   "twitterURL": "https://www.twitter.com/shrawanlakhe",
     *                   "facebookURL": "https://www.facebook.com/shrawanlakhe",
     *                   "phoneNumber": "977-9818278372",
     *                   "email": "shrawanlakhe@hotmail.com",
     *                   "teamMemberName": "Shrawan Lakhe",
     *                   "active": true
     *               }
     *           ],
     *          "totalItems": 1,
     *           "currentPage": 1
     *       }
     *
     *
     * @apiError  (NotFound) {String} message  Team member not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "Team member not found"
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

        .get( getTeamMembers )

        /**
         * @api {post} /api/team/ Post Team member data
         * @apiPermission admin
         * @apiName postTeamMemberInfo
         * @apiGroup TeamManagement
         * @apiParam {String} teamMemberName  Mandatory name of the person or team-member.
         * @apiParam {String} email   Mandatory email address of the person/team-member.
         * @apiParam {String} designation Mandatory Designation of the person.
         * @apiDescription saves team-member information to the database
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
         * http://localhost:3000/api/team/ \
         * -H "Content-Type: multipart/form-data"  \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODc1MDUzNSwiZXhwIjoxNDY4NzcwNTM1LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.8Vk3G4mc3J7JRD4upc5r54mG0dKGpRwTuSN5mIPF3tIx7NJwixaXwuFLxxkfeiI33huDb7W2NET494Eddd3FgQ" \
         * -F imageName=@public/images/404_banner.png  \
         * -F "data={\"teamMemberName\": \"Shrawan Lakhe\",\"email\": \"shrawanlakhey@gmail.com\",\"phoneNumber\": \"977-999999999\",\"designation\": \"Developer\",\"description\": \"detailed description\"};type=application/json"
         *
         *
         * @apiSuccess {String} message Team member saved successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "Team member saved successfully"
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
         * @apiError  (AlreadyExists)  {String} message  Team member's email address matching  previously saved data's email id throws this error i.e.duplicate email address
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 409 Conflict
         *     {
         *       "message": "Team member with same email already exists"
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
         *       "message": [{"param":"teamMemberName","msg":"Team member name is required","value":""},
         *       {"param":"email","msg":"Invalid Email","value":"shrawanlakhe"},
         *       {"param":"designation","msg":"Designation of team member is required","value":""}]
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
        .post( tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, uploader.single('imageName'), fileUploadHelper.imageUpload, teamMemberController.postTeamMemberInfo );



    //middleware function that will get the team member object for each of the routes defined downwards
    teamMemberRouter.use('/team/:teamMemberId', function(req, res, next){
        teamMemberController.getTeamMemberInfoByID(req)
            .then(function(teamMemberInfo){
                //saving in request object so that it can be used for other operations like updating data using put and patch method
                if (teamMemberInfo) {
                    req.teamMemberInfo = teamMemberInfo;
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


    teamMemberRouter.route('/team/:teamMemberId')



    /**
     * @api {get} /api/team/:teamMemberId Get team member data by Id
     * @apiPermission public
     * @apiName getTeamMemberInfoByID
     * @apiGroup TeamManagement
     *
     * @apiParam {String} teamMemberId  object id of the team-member data object
     *
     *  * @apiParamExample {json} Request-Example:
     *     {
     *       "teamMemberId": "578b54e0ebe03c31438ba406"
     *     }
     *
     *
     *
     * @apiDescription Retrieves the team member data object by Id if exists, else return empty object
     * @apiVersion 0.0.1
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -i \
     * "http://localhost:3000/api/team/578b54e0ebe03c31438ba406"
     *
     *
     * @apiSuccess {String} _id  object id of team member data.
     * @apiSuccess {String} teamMemberName  name of the person or team-member.
     * @apiSuccess {String} email email address of the person/team-member.
     * @apiSuccess {String} phoneNumber   contact number of the team-member.
     * @apiSuccess {String} facebookURL  facebook url of the person.
     * @apiSuccess {String} twitterURL  twitter url of the person.
     * @apiSuccess {String} googlePlusURL google plus url of the person.
     * @apiSuccess {String} linkedInURL  linked in url of the person.
     * @apiSuccess {String} address  address where team-member lives.
     * @apiSuccess {String} designation  Designation of the person.
     * @apiSuccess {String} description brief description about team-member.
     * @apiSuccess {String} hierarchyOrder position in the heirarchical office system.
     * @apiSuccess {String} imageName name of the image file.     *
     * @apiSuccess {String} imageProperties meta-data of the image file.
     * @apiSuccess {String} imageProperties.imageExtension extension of image file.
     * @apiSuccess {String} imageProperties.imagePath path of image file.
     * @apiSuccess {Boolean} active  active bit status.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *           "_id": "578b54e0ebe03c31438ba406",
     *           "imageName": "",
     *           "hierarchyOrder": 1,
     *           "description": "A tech enthusiast",
     *           "designation": "CTO",
     *           "address": "",
     *           "linkedInURL": "",
     *           "googlePlusURL": "",
     *           "twitterURL": "https://www.twitter.com/shrawanlakhe",
     *           "facebookURL": "https://www.facebook.com/shrawanlakhe",
     *           "phoneNumber": "977-9818278372",
     *           "email": "shrawanlakhe@hotmail.com",
     *           "teamMemberName": "Shrawan Lakhe",
     *           "active": true,
     *           "imageProperties": {
     *               "imageExtension": "jpg",
     *               "imagePath": "public/images/teammember/teammember-123.jpg"
     *           }
     *       }
     *
     *
     * @apiError  (NotFound) {String} message  Team member not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "Team member not found"
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

        .get(function(req,res){
            res.status(HTTPStatus.OK);
            res.json(req.teamMemberInfo);
        })

        /**
         * @api {patch} /api/team/:teamMemberId Deletes existing Team member data
         * @apiPermission admin
         * @apiName patchTeamMemberInfo
         * @apiGroup TeamManagement
         *
         * @apiParam {String} teamMemberId  object id of the team-member data object
         *
         *  * @apiParamExample {json} Request-Example:
         *     {
     *       "teamMemberId": "578b54e0ebe03c31438ba406"
     *     }
         *
         *
         *
         * @apiDescription Deletes existing team-member data from the database
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
         * http://localhost:3000/api/team/578b5b7e785bfedf52463159 \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODc1MDUzNSwiZXhwIjoxNDY4NzcwNTM1LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.8Vk3G4mc3J7JRD4upc5r54mG0dKGpRwTuSN5mIPF3tIx7NJwixaXwuFLxxkfeiI33huDb7W2NET494Eddd3FgQ"
         *
         *
         * @apiSuccess {String} message Team member deleted successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "Team member deleted successfully"
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
        .patch(tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, teamMemberController.patchTeamMemberInfo)



        /**
         * @api {put} /api/team/:teamMemberId Updates existing Team member data
         * @apiPermission admin
         * @apiName updateTeamMemberInfo
         * @apiGroup TeamManagement
         *
         *
         * @apiParam {String} teamMemberId  object id of the team-member data object
         *
         *  * @apiParamExample {json} Request-Example:
         *     {
     *       "teamMemberId": "578b54e0ebe03c31438ba406"
     *     }
         *
         *
         * @apiDescription Updates existing team-member information to the database
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
         * http://localhost:3000/api/team/578b5b7e785bfedf52463159 \
         * -H "Content-Type: multipart/form-data"  \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODc1MDUzNSwiZXhwIjoxNDY4NzcwNTM1LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.8Vk3G4mc3J7JRD4upc5r54mG0dKGpRwTuSN5mIPF3tIx7NJwixaXwuFLxxkfeiI33huDb7W2NET494Eddd3FgQ" \
         * -F imageName=@public/images/404_banner.png  \
         * -F "data={\"teamMemberName\": \"Shrawan Lakhe Thaiba\",\"email\": \"shrawanlakhey@gmail.com\",\"phoneNumber\": \"977-999999999\",\"designation\": \"Developer\",\"description\": \"detailed description\"};type=application/json"
         *
         *
         * @apiSuccess {String} message Team member updated successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "Team member updated successfully"
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
         * @apiError  (AlreadyExists)  {String} message  Team member's email address matching  previously saved data's email id throws this error i.e.duplicate email address
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 409 Conflict
         *     {
         *       "message": "Team member with same email already exists"
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
         *       "message": [{"param":"teamMemberName","msg":"Team member name is required","value":""},
         *       {"param":"email","msg":"Invalid Email","value":"shrawanlakhe"},
         *       {"param":"designation","msg":"Designation of team member is required","value":""}]
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
        .put(tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, uploader.single('imageName'), fileUploadHelper.imageUpload, teamMemberController.updateTeamMemberInfo);


    teamMemberRouter.route('/member/hierarchy/:sortId/:hierarchyValue')

    /**
     * @api {patch} /api/member/hierarchy/:sortId/:hierarchyValue Updates the hierarchy order of the team-member
     * @apiPermission admin
     * @apiName updateTeamMemberHierarchy
     * @apiGroup TeamManagement
     *
     *
     * @apiParam {String} sortId  object id of the team-member whose hierarchy is to be updated
     * @apiParam {Int} hierarchyValue  hierarchy order of the team-member whose hierarchy is to be updated
     *
     *  * @apiParamExample {json} Request-Example:
     *     {
     *       "sortId": "578b5b7e785bfedf52463159",
     *       "hierarchyValue": "1"
     *     }
     *
     *
     * @apiDescription Updates the hierarchy order of the existing team-member data to the database
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
     * http://localhost:3000/api/member/hierarchy/578b5b7e785bfedf52463159/1 \
     * -H 'Content-Type: application/json' \
     * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODc1MDUzNSwiZXhwIjoxNDY4NzcwNTM1LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.8Vk3G4mc3J7JRD4upc5r54mG0dKGpRwTuSN5mIPF3tIx7NJwixaXwuFLxxkfeiI33huDb7W2NET494Eddd3FgQ" \
     * -d '{"sort":"down"}'
     *
     *
     * @apiExample {curl} Example usage:
     *
     *
     * curl \
     * -v \
     * -X PATCH  \
     * http://localhost:3000/api/member/hierarchy/578b5b7e785bfedf52463159/2 \
     * -H 'Content-Type: application/json' \
     * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODc1MDUzNSwiZXhwIjoxNDY4NzcwNTM1LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.8Vk3G4mc3J7JRD4upc5r54mG0dKGpRwTuSN5mIPF3tIx7NJwixaXwuFLxxkfeiI33huDb7W2NET494Eddd3FgQ" \
     * -d '{"sort":"up"}'
     *
     *
     * @apiSuccess {String} message Hierarhchy order sorted successfully.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
         *         "message": "Hierarhchy order sorted successfully"
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
     * @apiError  (NotFound) {String} message  Team member not found if the the hierarchy order of the top most team-member is attempted to sorted further up or the hierarchy of the bottom most team-member is attempted to sorted further down
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "Team member not found"
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

        .patch( tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, teamMemberController.updateTeamMemberHierarchy );


    //function declaration to return team members list to the client if exists else return not found message
    function getTeamMembers(req, res, next) {
        teamMemberController.getTeamMembers(req, next)
            .then(function(teamMemberList){
                //if exists, return data in json format
                if (teamMemberList) {
                    res.status(HTTPStatus.OK);
                    res.json(teamMemberList);
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

    return teamMemberRouter;

})();

module.exports = teamMemberRoutes;
