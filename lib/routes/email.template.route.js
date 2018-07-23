var emailTemplateRoutes = (function () {

    'use strict';

    var HTTPStatus = require('http-status'),
        express = require('express'),
        tokenAuthMiddleware = require('../middlewares/token.authentication.middleware'),
        roleAuthMiddleware = require('../middlewares/role.authorization.middleware'),
        messageConfig = require('../configs/api.message.config'),
        emailTemplateController = require('../controllers/email.template.server.controller'),
        emailTemplateRouter = express.Router();

    emailTemplateRouter.route('/')


    /**
     * @api {get} /api/emailtemplate/ Get Email template list
     * @apiPermission public
     * @apiName getEmailTemplates
     * @apiGroup EmailTemplate
     *
     * @apiParam {Int} perpage  no of items to show per page (as querystring values)
     * @apiParam {Int} page  current page of the pagination system (as querystring values)
     *
     *  * @apiParamExample {json} Request-Example:
     *     {
     *       "perpage": 10,
     *       "page": 2
     *     }
     *
     *
     * @apiDescription Retrieves the email template list if exists, else return empty list
     * @apiVersion 0.0.1
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/emailtemplate" \
     * --data-urlencode "perpage=10" \
     * --data-urlencode "page=1"
     *
     *
     * @apiSuccess {Array} dataList list of email templates returned .
     * @apiSuccess {String} dataList._id object id for email template object.
     * @apiSuccess {String} dataList.emailFrom Email account of the sender
     * @apiSuccess {String} dataList.emailSubject Subject of email.
     * @apiSuccess {String} dataList.templateBody Email template content.
     * @apiSuccess {String} dataList.templateName name of the template so that we can check for duplicacy.  This needs to be unique
     * @apiSuccess {Date} dataList.addedOn entry date of data entry.
     * @apiSuccess {Boolean} dataList.active email template is active or not
     * @apiSuccess {Boolean} dataList.attachmentAvailabilityStatus status of the attachment for this current template  while sending email.
     * @apiSuccess {Number} totalItems  total no of email templates returned.
     * @apiSuccess {Number} currentPage  current page of pagination.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "dataList": [
     *           {
     *               "_id": "577e875a609df04d3a72cace",
     *               "templateBody": "<div class=\"container\"><h2>Email to confirm change of your account password.</h2><p>This email is sent to you to confirm your password change action.If you did not request for password change,please ignore this email.</p><br /><p>Please click below link to confirm your password change action:</p><br /><br /><p>{{ passwordChange.message }}</p></div>",
     *              "emailFrom": "shrawanlakhey@gmail.com",
     *               "emailSubject": "Email to Verify password Change action",
     *               "templateName": "user-password-change-confirmation",
     *               "addedOn": "2016-07-07T16:46:18.152Z",
     *               "active": true,
     *               "attachmentAvailabilityStatus": true
     *           }
     *       ],
     *       "totalItems": 1,
     *       "currentPage": 1
     *   }
     *
     * @apiError  (NotFound) {String} message  Email template not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "Email template not found"
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
        .get( getEmailTemplates )


        /**
         * @api {post} /api/emailtemplate/ Post Email Template information.
         * @apiPermission admin
         * @apiName postEmailTemplate
         * @apiGroup EmailTemplate
         *
         * @apiParam {String} templateName  Mandatory name of the template so that we can check for duplicacy.  This needs to be unique
         * @apiParam {String} emailSubject  Mandatory Subject of email.
         * @apiParam {String} emailFrom   Mandatory Email account of the sender
         * @apiSuccess {String} templateBody   Mandatory Email template content.
         *
         * @apiDescription saves email template to the database
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
         * -X POST \
         * http://localhost:3000/api/emailtemplate \
         * -H 'Content-Type: application/json' \
         * -H 'x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODU2NTkyNywiZXhwIjoxNDY4NTg1OTI3LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.stPsYMnC4x_wwEHKZYcoz0TkSTiu2lgry9H7Icv2EJp769YADZbxmxnFKC4LAcuBLTHs052__A-6Q5OUbO-bUA' \
         * -d '{"templateName":"user-registration-confirmation-4-ok","emailSubject":"User Registration Confirmation Email to Confirm Users","emailFrom":"shrawanlakhey@gmail.com","templateBody":"hello user"}'
         *
         * @apiSuccess {String} message Email template saved successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "Email template saved successfully"
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
         * @apiError  (AlreadyExists)  {String} message  Email template saved with templateName matching  previously saved data's templateName throws this error
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 409 Conflict
         *     {
         *       "message": "Email template with same title already exists"
         *     }
         *
         *
         * @apiError  (BadRequest) {String[]} message  Email Template post method throws error if either of templateName, emailSubject, emailFrom and templateBody is not provided or emailFrom is invalid data or email
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *     {
         *       "message": "[{"param":"templateName","msg":"Email template title is required","value":""},{"param":"emailSubject","msg":"Subject of email is required","value":""}]"
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
        .post(tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, emailTemplateController.postEmailTemplate);


    //middleware function that will get the email template information object for each of the routes defined downwards
    emailTemplateRouter.use('/:templateId', function (req, res, next) {
        emailTemplateController.getEmailTemplateDataByID(req)
            .then(function(emailTemplateInfo){
                //saving in request object so that it can be used for other operations like updating data using put and patch method
                if(emailTemplateInfo){
                    req.emailTemplateInfo = emailTemplateInfo;
                    next();
                    return null;// return a non-undefined value to signal that we didn't forget to return promise
                }else{
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.emailTemplate.notFound
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    });


    emailTemplateRouter.route('/:templateId')


    /**
     * @api {get} /api/emailtemplate/:templateId Get Email template object by providing id
     * @apiPermission public
     * @apiName getEmailTemplateDataByID
     * @apiGroup EmailTemplate
     *
     *
     * @apiParam {String} templateId  object id of the email template data
     *
     *  * @apiParamExample {json} Request-Example:
     *     {
     *       "templateId": "57889ae9585d9632523f1234"
     *     }
     *
     *
     * @apiDescription Retrieves the email template object by id if exists, else return empty object
     * @apiVersion 0.0.1
     *
     * @apiExample {curl} Example usage:
     * curl -i http://localhost:3000/api/emailtemplate/577e875a609df04d3a72cace
     *
     *
     * @apiSuccess {String} _id object id for email template object.
     * @apiSuccess {String} emailFrom Email account of the sender
     * @apiSuccess {String} emailSubject Subject of email.
     * @apiSuccess {String} templateBody Email template content.
     * @apiSuccess {String} templateName name of the template so that we can check for duplicacy.  This needs to be unique
     * @apiSuccess {Date} addedOn entry date of data entry.
     * @apiSuccess {Boolean} active email template is active or not
     * @apiSuccess {Boolean} attachmentAvailabilityStatus status of the attachment for this current template  while sending email.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *               "_id": "577e875a609df04d3a72cace",
     *               "templateBody": "<div class=\"container\"><h2>Email to confirm change of your account password.</h2><p>This email is sent to you to confirm your password change action.If you did not request for password change,please ignore this email.</p><br /><p>Please click below link to confirm your password change action:</p><br /><br /><p>{{ passwordChange.message }}</p></div>",
     *              "emailFrom": "shrawanlakhey@gmail.com",
     *               "emailSubject": "Email to Verify password Change action",
     *               "templateName": "user-password-change-confirmation",
     *               "addedOn": "2016-07-07T16:46:18.152Z",
     *               "active": true,
     *               "attachmentAvailabilityStatus": true
     *      }
     *
     * @apiError  (NotFound) {String} message  Email template not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "Email template not found"
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
            res.json(req.emailTemplateInfo);
        })


        /**
         * @api {patch} /api/emailtemplate/:templateId Deletes existing Email Template data.
         * @apiPermission admin
         * @apiName patchEmailTemplateData
         * @apiGroup EmailTemplate
         *
         *
         * @apiParam {String} templateId  object id of the email template data
         *
         *  * @apiParamExample {json} Request-Example:
         *     {
         *       "templateId": "57889ae9585d9632523f1234"
         *     }
         *
         * @apiDescription Deletes existing email template data
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
         * -X PATCH \
         * http://localhost:3000/api/emailtemplate/578889f04a576949341aa6f9 \
         * -H 'Content-Type: application/json' \
         * -H 'x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODU2NTkyNywiZXhwIjoxNDY4NTg1OTI3LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.stPsYMnC4x_wwEHKZYcoz0TkSTiu2lgry9H7Icv2EJp769YADZbxmxnFKC4LAcuBLTHs052__A-6Q5OUbO-bUA'
         *
         * @apiSuccess {String} message Email template deleted successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "Email template deleted successfully"
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
        .patch(tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, emailTemplateController.patchEmailTemplateData)


        /**
         * @api {put} /api/emailtemplate/:templateId Update existing Email Template information.
         * @apiPermission admin
         * @apiName updateEmailTemplateData
         * @apiGroup EmailTemplate
         *
         *
         * @apiParam {String} templateId  object id of the email template data
         *
         *  * @apiParamExample {json} Request-Example:
         *     {
         *       "templateId": "57889ae9585d9632523f1234"
         *     }
         *
         * @apiDescription updates existing email template information to replace old data with new data
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
         * -X PUT \
         * http://localhost:3000/api/emailtemplate/578889f04a576949341aa6f9 \
         * -H 'Content-Type: application/json' \
         * -H 'x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODU2NTkyNywiZXhwIjoxNDY4NTg1OTI3LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.stPsYMnC4x_wwEHKZYcoz0TkSTiu2lgry9H7Icv2EJp769YADZbxmxnFKC4LAcuBLTHs052__A-6Q5OUbO-bUA' \
         * -d '{"templateName":"user-registration-confirmation-4-ok-2","emailSubject":"User Registration Confirmation Email to Confirm Users","emailFrom":"shrawanlakhey@gmail.com","templateBody":"hello user"}'
         *
         * @apiSuccess {String} message Email template updated successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "Email template updated successfully"
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
         * @apiError  (AlreadyExists)  {String} message  Email template saved with already existing previously saved data's templateName throws this error
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 409 Conflict
         *     {
         *       "message": "Email template with same title already exists"
         *     }
         *
         *
         * @apiError  (BadRequest) {String[]} message  Email Template put method throws error if either of templateName, emailSubject, emailFrom and templateBody is not provided or emailFrom is invalid data or email
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *     {
         *       "message": "[{"param":"templateName","msg":"Email template title is required","value":""},{"param":"emailSubject","msg":"Subject of email is required","value":""}]"
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
        .put(tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, emailTemplateController.updateEmailTemplateData);


    //function declaration to return email template information object to the client if exists else return not found message
    function getEmailTemplates(req, res, next) {
        emailTemplateController.getEmailTemplate(req, next)
            .then(function(emailtemplates){
                //if exists, return data in json format
                if(emailtemplates){
                    res.status(HTTPStatus.OK);
                    res.json(emailtemplates);
                }else{
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.emailTemplate.notFound
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    }


    return emailTemplateRouter;

})();

module.exports = emailTemplateRoutes;   