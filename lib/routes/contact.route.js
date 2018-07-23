var contactInfoRoutes = (function () {

    'use strict';

    var HTTPStatus = require('http-status'),
        express = require('express'),
        tokenAuthMiddleware = require('../middlewares/token.authentication.middleware'),
        roleAuthMiddleware = require('../middlewares/role.authorization.middleware'),
        messageConfig = require('../configs/api.message.config'),
        contactInfoController = require('../controllers/contact.server.controller'),
        contactInfoRouter = express.Router();

    contactInfoRouter.route('/')

    /**
     * @api {get} /api/contact/info/ Get contact list Information
     * @apiPermission admin
     * @apiName getContactList
     * @apiGroup Contacts
     *
     *
     * @apiParam {Int} perpage Number of data to return on each request (as querystring values)
     * @apiParam {Int} page Current page number of pagination system. (as querystring values)
     * @apiParam {String} fullName name of client(as querystring values)
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
     *       "fullName": "Shrawan Lakhe"
     *     }
     *
     *
     * @apiDescription Retrieves the contact list  if exists, else return empty array
     * @apiVersion 0.0.1
     * @apiHeader (AuthorizationHeader) {String} authorization x-access-token value.
     * @apiHeaderExample {json} Header-Example:
     *{
     *  "x-access-token": "yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c"
     * }
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/contact/info" \
     * --data-urlencode "perpage=10" \
     * --data-urlencode "page=1" \
     * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODczOTk2MywiZXhwIjoxNDY4NzU5OTYzLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.DOvJ_SUERBGG0z1x_5x4STQRU3KX4XBK1EF81BawyTlmWXlz5ZI55dCTWB5yHbL_1mXtvmYTAhHroXnHIBCxWA"
     *
     *
     *
     * @apiExample {curl} Example usage:
     * curl \
     *  -G \
     * -v \
     * "http://localhost:3000/api/contact/info" \
     * --data-urlencode "fullName=Shrawan Lakhe" \
     * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODczOTk2MywiZXhwIjoxNDY4NzU5OTYzLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.DOvJ_SUERBGG0z1x_5x4STQRU3KX4XBK1EF81BawyTlmWXlz5ZI55dCTWB5yHbL_1mXtvmYTAhHroXnHIBCxWA"
     *
     *
     *
     * @apiSuccess {String} dataList list of contacts information of various clients
     * @apiSuccess {String} dataList._id object id of the client contact data.
     * @apiSuccess {String} dataList.fullName  fullname of client.
     * @apiSuccess {String} dataList.email  email id of client.
     * @apiSuccess {String} dataList.contactNumber contact number of client.
     * @apiSuccess {String} dataList.organizationName  organization name that client works on.
     * @apiSuccess {String} dataList.message  message content from client.
     * @apiSuccess {String} dataList.addedOn Date of contact info registration process.
     * @apiSuccess {String} dataList.informationSource source from which people came to know about organization.
     * @apiSuccess {String} totalItems  total no of items that the Contact collection currently has.
     * @apiSuccess {String} currentPage  current page number of the pagination system.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *           "dataList": [
     *               {
     *                   "_id": "578a55e60fe506eb169d74c1",
     *                   "message": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
     *                   "organizationName": "BitsBeat",
     *                   "contactNumber": "977-9818278372",
     *                   "email": "shrawanlakhe@hotmail.com",
     *                   "fullName": "Shrawan Lakhe",
     *                  "addedOn": "2016-07-16T15:42:30.804Z",
     *                   "informationSource": "none"
     *               }
     *          ],
     *           "totalItems": 1,
     *           "currentPage": 1
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
     * @apiError  (NotFound) {String} message  Contact not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
 *       "message": "Contact not found"
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
        .get( tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, getContactList)


        /**
         * @api {post} /api/contact/info/ Post contact data
         * @apiPermission public
         * @apiName postContactInfo
         * @apiGroup Contacts
         *
         * @apiParam {String} fullName  Mandatory  fullname of client.
         * @apiParam {String} email  Mandatory  email id of client.
         * @apiParam {String} message  Mandatory  message content from client.
         *
         * @apiDescription saves interested client information along with the message
         * @apiVersion 0.0.1
         *
         *
         * @apiExample {curl} Example usage:
         *
         *
         * curl \
         * -v \
         * -X POST \
         * http://localhost:3000/api/contact/info/ \
         * -H 'Content-Type: application/json' \
         * -H 'x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODMxNjg4MiwiZXhwIjoxNDY4MzM2ODgyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.agd70Nk8y4bcORqzQP4eTSZW_3lN9TpC9zIpKM5j98RkNqS43qVPRQyN3DfRS6CKblHyvYASisvQGpCvJSyfgw' \
         * -d '{"fullName":"Shrawan Lakhe","email":"shrawanlakhey@gmail.com","contactNumber":"98152655999888","organizationName":"BitsBeat","informationSource":"none","message":"hello hi "}'
         *
         * @apiSuccess {String} message Contact registered successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "Contact registered successfully"
         *       }
         *
         *
         * @apiError  (BadRequest) {String[]} message Validation Error due to either invalid data entry or not entering value for required fields
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *
         *     {
         *       "message": [{"param":"fullName","msg":"Full name is required","value":""},
         *       {"param":"email","msg":"Invalid email ID","value":"shrawanlakhe"}]
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
        .post( contactInfoController.postContactInfo );



    //middleware function that will get the client contact object for each of the routes defined downwards
    contactInfoRouter.use('/:contactId', tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, function(req, res, next){
        contactInfoController.getContactInfoByID(req)
            .then(function(contactInfo){
                //saving in request object so that it can be used for other operations like updating data using put and patch method
                if (contactInfo) {
                    req.contactInfo = contactInfo;
                    next();
                    return null;// return a non-undefined value to signal that we didn't forget to return promise
                } else {
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.contact.notFound
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    });

    contactInfoRouter.route('/:contactId')


    /**
     * @api {get} /api/contact/info/:contactId Get contact object Information by id
     * @apiPermission admin
     * @apiName getContactInfoByID
     * @apiGroup Contacts
     *
     *
     * @apiParam {String} contactId   object id of contact data (as querystring values)
     *
     *  * @apiParamExample {json} Request-Example:
     *     {
     *       "contactId": "578a55e60fe506eb169d74c1"
     *     }
     *
     *
     * @apiDescription Retrieves the contact object information by id  if exists, else return not found message
     * @apiVersion 0.0.1
     * @apiHeader (AuthorizationHeader) {String} authorization x-access-token value.
     * @apiHeaderExample {json} Header-Example:
     *{
     *  "x-access-token": "yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c"
     * }
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -i http://localhost:3000/api/contact/info/578a55e60fe506eb169d74c1/ \
     * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODY4MzQ1MywiZXhwIjoxNDY4NzAzNDUzLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.g7U5Rt-PPiukk3lJnhFM72ER_Peamk2oDMxGY3KWm1tCemJJt-x4CiDkCSkwMAuoRT2KVDNw7BYwY5zva7IPSw" \
     *
     *
     *
     * @apiSuccess {String} _id object id of the client contact data.
     * @apiSuccess {String} fullName  fullname of client.
     * @apiSuccess {String} email  email id of client.
     * @apiSuccess {String} contactNumber contact number of client.
     * @apiSuccess {String} organizationName  organization name that client works on.
     * @apiSuccess {String} message  message content from client.
     * @apiSuccess {String} addedOn Date of contact info registration process.
     * @apiSuccess {String} informationSource source from which people came to know about organization.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *           "_id": "578a55e60fe506eb169d74c1",
     *           "message": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
     *           "organizationName": "BitsBeat",
     *           "contactNumber": "977-9818278372",
     *           "email": "shrawanlakhe@hotmail.com",
     *           "fullName": "Shrawan Lakhe",
     *           "addedOn": "2016-07-16T15:42:30.804Z",
     *           "informationSource": "none"
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
     * @apiError  (NotFound) {String} message  Contact not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
 *       "message": "Contact not found"
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
            res.json(req.contactInfo);
        })


        /**
         * @api {patch} /api/contact/info/:contactId deletes contact data
         * @apiPermission admin
         * @apiName patchContactInfo
         * @apiGroup Contacts
         *
         * @apiParam {String} contactId   object id of contact data (as querystring values)
         *
         *  * @apiParamExample {json} Request-Example:
         *     {
     *       "contactId": "578a55e60fe506eb169d74c1"
     *     }
         *
         *
         *
         * @apiDescription deletes client information from the collection
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
         *
         *
         * curl \
         * -v \
         * -X PATCH \
         * http://localhost:3000/api/contact/info/578a60f19dcbc1be2a085612 \
         * -H 'Content-Type: application/json' \
         * -H 'x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODY4NzAxMywiZXhwIjoxNDY4NzA3MDEzLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.bGhsp30IRh5C7_YjUuGoODnNBBXDzQUHVqjXEQ3X45KkbDoYlknr_xFvetiJmOzmRmI4VtZvIn1ugeP2VxZ4Wg'
         *
         *
         *
         * @apiSuccess {String} message Contact deleted successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "Contact deleted successfully"
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
        .patch( tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, contactInfoController.patchContactInfo );



    //function declaration to return contact list to the client if exists else return not found message
    function getContactList(req, res, next) {
        contactInfoController.getContactInfo(req, next)
            .then(function(lstContact){
                //if exists, return data in json format
                if (lstContact) {
                    res.status(HTTPStatus.OK);
                    res.json(lstContact);
                } else {
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.contact.notFound
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    }

    return contactInfoRouter;

})();

module.exports = contactInfoRoutes;

