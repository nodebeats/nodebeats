var mailServiceRoutes = (function () {

    'use strict';

    var HTTPStatus = require('http-status'),
        express = require('express'),
        tokenAuthMiddleware = require('../middlewares/token.authentication.middleware'),
        roleAuthMiddleware = require('../middlewares/role.authorization.middleware'),
        messageConfig = require('../configs/api.message.config'),
        emailServiceController = require('../controllers/email.service.server.controller'),
        mailServiceRouter = express.Router();


    mailServiceRouter.route('/')


    /**
     * @api {get} /api/emailservice/ Get Email Service Setting Configuration Info
     * @apiPermission admin
     * @apiName getMailServiceConfig
     * @apiGroup EmailServiceSetting
     * @apiDescription Retrieves the Email Service setting Information Object if exists, else return empty object
     * @apiVersion 0.0.1
     * @apiHeader (AuthorizationHeader) {String} authorization x-access-token value.
     * @apiHeaderExample {json} Header-Example:
     *{
     *  "x-access-token": "yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c"
     * }
     *
     * @apiExample {curl} Example usage:
     * curl -i http://localhost:3000/api/emailservice
     *
     *
     * @apiSuccess {String} _id object id of the email service configuration data
     * @apiSuccess {String} serviceProviderType Type of Email service Providers.  Email Service Providers can be any one of -  'mailgun', 'postmark', 'mandrill', 'sendgrid', 'amazon' or 'normal' email sending mechanism using google smtp
     * @apiSuccess {String} host  hostname or IP address to connect to (defaults to 'localhost'). for [normal smtp]
     * @apiSuccess {Number} port  port to connect to (defaults to 25 or 465). for [normal smtp]
     * @apiSuccess {String} authUserName authentication username, mainly google email address for google smtp. for [normal smtp]
     * @apiSuccess {String} authPassword  password for the gmail account or user. for [normal smtp]
     * @apiSuccess {String} api_Key  secret unique key to access the email service provider api. needed for [mandrill, mailgun, Amazon, sendGrid, postmark]
     * @apiSuccess {String} api_Secret secret unique key to access the email service provider api.needed for [Amaazon;]
     * @apiSuccess {String} api_User  username of the user registered in  the email service provider user database.
     * @apiSuccess {String} domain  domain name of the email service provider. [mailgun]
     * @apiSuccess {Date} addedOn date at which email service configuration is saved.
     * @apiSuccess {Number} rateLimit   limits the message count to be sent in a second (defaults to false)   -    available only if pool is set to true. needed for [Amazon ses]
     * @apiSuccess {Boolean} pool   if set to true uses pooled connections (defaults to false), otherwise creates a new connection for every e-mail.
     * @apiSuccess {Boolean} secure  if true the connection will only use TLS. If false (the default), TLS may still be upgraded to if available via the STARTTLS command. for [normal smtp]
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "_id": "57357eb98b22c55e361176a2",
     *       "serviceProviderType": "mailgun",
     *       "host": "smtp.gmail.com",
     *       "port": 8000,
     *      "authUserName": "shrawanlakhey@gmail.com",
     *       "authPassword": "lakdehe@123",
     *       "api_Key": "key-dfsew",
     *       "api_Secret": "api-fdsfsd",
     *       "api_User": "shrawan",
     *       "domain": "sandbox73ad601fcdd74461b1c46820a59b2374.mailgun.org",
     *       "addedOn": "2016-05-13T07:14:01.496Z",
     *       "rateLimit": 300,
     *       "pool": false,
     *       "secure": true
     *   }
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
     * @apiError  (NotFound) {String} message  Email service configuration not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "Email service configuration not found"
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

        .get( tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, getMailServiceConfig )

        /**
         * @api {post} /api/emailservice/ Post Email Service Configuration Info
         * @apiPermission admin
         * @apiName postMailServiceConfig
         * @apiGroup EmailServiceSetting
         * @apiParam {String} Mandatory serviceProviderType Type of Email service Providers.  Email Service Providers can be any one of -  'mailgun', 'postmark', 'mandrill', 'sendgrid', 'amazon' or 'normal' email sending mechanism using google smtp
         * @apiDescription saves email service configuration setting information to the database so that we can send email to our users
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
         * -X POST \
         * http://localhost:3000/api/emailservice \
         * -H 'Content-Type: application/json' \
         * -H 'x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODUzMzgzMiwiZXhwIjoxNDY4NTUzODMyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.bmHC9pUtN1aOZUOc62nNfywggLBUfpLhs0CyMuunhEpVJq4WLYZ7fcr2Ap8xn0WYL_yODPPuSYGIFZ8uk4nilA' \
         * -d '{"serviceProviderType":"mailgun","domain":"www.mailgun.com","api_Key":"helloapikey123456"}'
         *
         * @apiSuccess {String} message Email service configuration saved successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
 *         "message": "Email service configuration saved successfully"
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
         * @apiError  (AlreadyExists)  {String} message  Email Service setting configuration already exists, only can update existing data. new inserts is not allowed
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 409 Conflict
         *     {
         *       "message": "You can only update email service configuration setting"
         *     }
         *
         *
         * @apiError  (BadRequest) {String[]} message  Email service configuration setting post method throws error if serviceProviderType, is not provided or invalid data entry for host, port authUserName, domain and rateLimit
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *     {
         *       "message": "[{"param":"serviceProviderType","msg":"Email service provider is required","value":""},{"param":"domain","msg":"Invalid domain","value":"www."}]"
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
        .post( tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, emailServiceController.postMailServiceConfig );


    //middleware function that will be executed for every routes below this to get email service configuration setting object using  id as parameter

    mailServiceRouter.use('/:mailServiceConfigId', tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, function(req, res, next){
        emailServiceController.getMailServiceConfigByID(req)
            .then(function(mailServiceConfig){
                //saving in request object so that it can be used for other operations like updating data using put and patch method
                if(mailServiceConfig){
                    req.mailService = mailServiceConfig;
                    next();
                    return null;// return a non-undefined value to signal that we didn't forget to return promise
                }else{
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.emailService.notFound
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    });

    mailServiceRouter.route('/:mailServiceConfigId')


    /**
     * @api {get} /api/emailservice/:mailServiceConfigId Get Email Service Setting Configuration Info by id
     * @apiPermission admin
     * @apiName getMailServiceConfigByID
     * @apiGroup EmailServiceSetting
     *
     *
     * @apiParam {String} mailServiceConfigId  object id of the email service data
     *
     *  * @apiParamExample {json} Request-Example:
     *     {
     *       "mailServiceConfigId": "57889ae9585d9632523f1234"
     *     }
     *
     *
     * @apiDescription Retrieves the Email Service setting Information Object by id if exists, else return empty object
     * @apiVersion 0.0.1
     * @apiHeader (AuthorizationHeader) {String} authorization x-access-token value.
     * @apiHeaderExample {json} Header-Example:
     *{
     *  "x-access-token": "yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c"
     * }
     *
     * @apiExample {curl} Example usage:
     * curl -i http://localhost:3000/api/emailservice/57357eb98b22c55e361176a2 \
     * -H 'x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODMxNjg4MiwiZXhwIjoxNDY4MzM2ODgyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.agd70Nk8y4bcORqzQP4eTSZW_3lN9TpC9zIpKM5j98RkNqS43qVPRQyN3DfRS6CKblHyvYASisvQGpCvJSyfgw'
     *
     *
     *
     * @apiSuccess {String} _id object id of the email service configuration data
     * @apiSuccess {String} serviceProviderType Type of Email service Providers.  Email Service Providers can be any one of -  'mailgun', 'postmark', 'mandrill', 'sendgrid', 'amazon' or 'normal' email sending mechanism using google smtp
     * @apiSuccess {String} host  hostname or IP address to connect to (defaults to 'localhost'). for [normal smtp]
     * @apiSuccess {Number} port  port to connect to (defaults to 25 or 465). for [normal smtp]
     * @apiSuccess {String} authUserName authentication username, mainly google email address for google smtp. for [normal smtp]
     * @apiSuccess {String} authPassword  password for the gmail account or user. for [normal smtp]
     * @apiSuccess {String} api_Key  secret unique key to access the email service provider api. needed for [mandrill, mailgun, Amazon, sendGrid, postmark]
     * @apiSuccess {String} api_Secret secret unique key to access the email service provider api.needed for [Amaazon;]
     * @apiSuccess {String} api_User  username of the user registered in  the email service provider user database.
     * @apiSuccess {String} domain  domain name of the email service provider. [mailgun]
     * @apiSuccess {Date} addedOn date at which email service configuration is saved.
     * @apiSuccess {Number} rateLimit   limits the message count to be sent in a second (defaults to false)   -    available only if pool is set to true. needed for [Amazon ses]
     * @apiSuccess {Boolean} pool   if set to true uses pooled connections (defaults to false), otherwise creates a new connection for every e-mail.
     * @apiSuccess {Boolean} secure  if true the connection will only use TLS. If false (the default), TLS may still be upgraded to if available via the STARTTLS command. for [normal smtp]
     *
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "_id": "57357eb98b22c55e361176a2",
     *       "serviceProviderType": "mailgun",
     *       "host": "smtp.gmail.com",
     *       "port": 8000,
     *      "authUserName": "shrawanlakhey@gmail.com",
     *       "authPassword": "lakdehe@123",
     *       "api_Key": "key-dfsew",
     *       "api_Secret": "api-fdsfsd",
     *       "api_User": "shrawan",
     *       "domain": "sandbox73ad601fcdd74461b1c46820a59b2374.mailgun.org",
     *       "addedOn": "2016-05-13T07:14:01.496Z",
     *       "rateLimit": 300,
     *       "pool": false,
     *       "secure": true
     *   }
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
     * @apiError  (NotFound) {String} message  Email service configuration not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
 *       "message": "Email service configuration not found"
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
            res.json(req.mailService);
        })




        /**
         * @api {put} /api/emailservice/:mailServiceConfigId Updates Email Service Configuration Info
         * @apiPermission admin
         * @apiName updateMailService
         * @apiGroup EmailServiceSetting
         *
         *
         * @apiParam {String} mailServiceConfigId  object id of the email service data
         *
         *  * @apiParamExample {json} Request-Example:
         *     {
         *       "mailServiceConfigId": "57889ae9585d9632523f1234"
         *     }
         *
         *
         * @apiDescription Updates existing email service configuration setting information to the database so that we can send email to our users
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
         * -X PUT \
         * http://localhost:3000/api/emailservice/5788105fd519f49e17f0579f \
         * -H 'Content-Type: application/json' \
         * -H 'x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODUzMzgzMiwiZXhwIjoxNDY4NTUzODMyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.bmHC9pUtN1aOZUOc62nNfywggLBUfpLhs0CyMuunhEpVJq4WLYZ7fcr2Ap8xn0WYL_yODPPuSYGIFZ8uk4nilA' \
         * -d '{"serviceProviderType":"postmark","domain":"www.mailgun.com","api_Key":"helloapikey123456"}'
         *
         * @apiSuccess {String} message Email service configuration updated successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
 *         "message": "Email service configuration updated successfully"
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
         * @apiError  (BadRequest) {String[]} message  Email service configuration setting put method throws error if serviceProviderType, is not provided or invalid data entry for host, port authUserName, domain and rateLimit
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *     {
         *       "message": "[{"param":"serviceProviderType","msg":"Email service provider is required","value":""},{"param":"domain","msg":"Invalid domain","value":"www."}]"
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
        .put( tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, emailServiceController.updateMailService );



    //function declaration to return email service configuration object to the client if exists else return not found message
    function getMailServiceConfig(req, res, next) {
        emailServiceController.getMailServiceConfig()
            .then(function(mailServiceConfig){
                //if exists, return data in json format
                if (mailServiceConfig) {
                    res.status(HTTPStatus.OK);
                    res.json(mailServiceConfig);
                } else {
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.emailService.notFound
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    }

    return mailServiceRouter;

})();

module.exports = mailServiceRoutes;