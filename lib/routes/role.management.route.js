var roleManagerRoutes = (function () {

    'use strict';

    var HTTPStatus = require('http-status'),
        express = require('express'),
        messageConfig = require('../configs/api.message.config'),
        roleManagerController = require('../controllers/role.management.server.controller'),
        roleManagerRouter =  express.Router();

    roleManagerRouter.route('/')

    /**
     * @api {get} /api/roles/ Get User Role list
     * @apiPermission admin
     * @apiName getAllRoles
     * @apiGroup Role Management
     *
     * @apiParam {Boolean} active whether to get data with active bit true or false, if true, then returns data list with active bit set to true only
     * @apiParam {String} rolename Filter the list of roles and display only those matching specified role
     *
     *
     *
     *  @apiParamExample {json} Request-Example:
     *     {
     *       "active": true
     *     }
     *
     * @apiParamExample {json} Request-Example:
     *     {
     *       "rolename": "admin"
     *     }
     *
     * @apiDescription Retrieves the User Role list for role based authorization, if exists, else return empty array
     * @apiVersion 0.0.1
     * @apiHeader (AuthorizationHeader) {String} authorization x-access-token value.
     * @apiHeaderExample {json} Header-Example:
     *{
     *  "x-access-token": "yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c"
     * }
     *
     *
     * @apiExample {curl} Example usage:
     *
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/roles" \
     * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3ZDE3NTVlZmU2ZmViNmUzNGE4NWNkYSIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJoZWxwQG5vZGViZWF0cy5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWRkZWRPbiI6IjIwMTYtMDktMDhUMTQ6Mjc6NDIuNjc3WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTdkMTc1NWVmZTZmZWI2ZTM0YTg1Y2RhIiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ3NTU2NTg3OCwiZXhwIjoxNDc1NjUyMjc4LCJpc3MiOiI1N2QxNzU1ZWZlNmZlYjZlMzRhODVjZGEifQ.D5FJ7i6ycZBhYc-kHni6WnjCOGCEZBMsZu9yeCajO_bhVzH-muqUvZ6K5072vwO7LoKB0eTKa1friGngrpRJ9w"
     *
     *
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/roles" \
     * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3ZDE3NTVlZmU2ZmViNmUzNGE4NWNkYSIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJoZWxwQG5vZGViZWF0cy5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWRkZWRPbiI6IjIwMTYtMDktMDhUMTQ6Mjc6NDIuNjc3WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTdkMTc1NWVmZTZmZWI2ZTM0YTg1Y2RhIiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ3NTU2NTg3OCwiZXhwIjoxNDc1NjUyMjc4LCJpc3MiOiI1N2QxNzU1ZWZlNmZlYjZlMzRhODVjZGEifQ.D5FJ7i6ycZBhYc-kHni6WnjCOGCEZBMsZu9yeCajO_bhVzH-muqUvZ6K5072vwO7LoKB0eTKa1friGngrpRJ9w" \
     * --data-urlencode "active=true"
     *
     *
     *
     * @apiSuccess {String} _id  object id of User role data.
     * @apiSuccess {String} roleName  title of the role entered by the user.
     * @apiSuccess {Boolean} active   active bit status.
     * @apiSuccess {Boolean} read  read access granted to the role.
     * @apiSuccess {Boolean} write  write access granted to the role in combination with either create or change action enables either insert or update features respectively.
     * @apiSuccess {Boolean} create  User having both create and write access  granted to the role can insert new document.
     * @apiSuccess {Boolean} change  User having both change and write access  granted to the role can update existing document.
     * @apiSuccess {Boolean} delete delete access granted to the role, deletes data permanently .
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     [
     *            {
     *                   "_id": "57f347c55dd74725fd59cce1",
     *                   "roleName": "reader",
     *                   "active": true,
     *                   "change": false,
     *                   "delete": false,
     *                   "create": false,
     *                   "write": false,
     *                   "read": true
     *               }
     *        ]
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
     * @apiError  (NotFound) {String} message  User Role not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "User Role not found"
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

        .get( getAllRoles )

        /**
         * @api {post} /api/roles/ Post User Role Information
         * @apiPermission admin
         * @apiName postRoleInfo
         * @apiGroup Role Management
         *
         *
         * @apiParam {String} roleName Mandatory title of the role.
         *
         * @apiDescription saves user role information to the database with permitted actions.
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
         * http://localhost:3000/api/roles/ \
         * -H 'Content-Type: application/json' \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3ZDE3NTVlZmU2ZmViNmUzNGE4NWNkYSIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJoZWxwQG5vZGViZWF0cy5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWRkZWRPbiI6IjIwMTYtMDktMDhUMTQ6Mjc6NDIuNjc3WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTdkMTc1NWVmZTZmZWI2ZTM0YTg1Y2RhIiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ3NTU2NTg3OCwiZXhwIjoxNDc1NjUyMjc4LCJpc3MiOiI1N2QxNzU1ZWZlNmZlYjZlMzRhODVjZGEifQ.D5FJ7i6ycZBhYc-kHni6WnjCOGCEZBMsZu9yeCajO_bhVzH-muqUvZ6K5072vwO7LoKB0eTKa1friGngrpRJ9w" \
         * -d '{"roleName": "agent", "active": true,  "change": false, "delete":false, "create":true, "write":true, "read":true}'
         *
         *
         * @apiSuccess {String} message User Role saved successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "User Role saved successfully"
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
         * @apiError  (BadRequest) {String} message Please enter Role Name
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *
         *     {
         *       "message": "Please enter Role Name"
         *     }
         *
         *
         *
         * @apiError  (AlreadyExists)  {String} message  User Role with same name already exists
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 409 Conflict
         *     {
         *       "message": "User Role with same name already exists"
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

        .post( roleManagerController.postRoleInfo );

//middleware function that will get the user role object for each of the routes defined downwards
    roleManagerRouter.use('/:roleId', function(req, res, next){
        roleManagerController.getRoleById(req)
            .then(function(roleInfo){
                if (roleInfo) {
                    req.roleInfo = roleInfo;
                    next();
                    return null;// return a non-undefined value to signal that we didn't forget to return promise
                } else {
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.roleManager.notFound
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    });


    roleManagerRouter.route('/:roleId')

    /**
     * @api {get} /api/roles/:roleId Get User Role information object by ID
     * @apiPermission admin
     * @apiName getRoleById
     * @apiGroup Role Management
     *
     * @apiParam {String} roleId Object ID of the user role object information
     *
     *
     *
     *  @apiParamExample {json} Request-Example:
     *     {
     *       "roleId": "57f347c55dd74725fd59cce1"
     *     }
     *
     * @apiDescription Retrieves the User Role information object, if exists, else return empty object
     * @apiVersion 0.0.1
     * @apiHeader (AuthorizationHeader) {String} authorization x-access-token value.
     * @apiHeaderExample {json} Header-Example:
     *{
     *  "x-access-token": "yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c"
     * }
     *
     *
     * @apiExample {curl} Example usage:
     *
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/roles/57f347c55dd74725fd59cce1" \
     * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3ZDE3NTVlZmU2ZmViNmUzNGE4NWNkYSIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJoZWxwQG5vZGViZWF0cy5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWRkZWRPbiI6IjIwMTYtMDktMDhUMTQ6Mjc6NDIuNjc3WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTdkMTc1NWVmZTZmZWI2ZTM0YTg1Y2RhIiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ3NTU2NTg3OCwiZXhwIjoxNDc1NjUyMjc4LCJpc3MiOiI1N2QxNzU1ZWZlNmZlYjZlMzRhODVjZGEifQ.D5FJ7i6ycZBhYc-kHni6WnjCOGCEZBMsZu9yeCajO_bhVzH-muqUvZ6K5072vwO7LoKB0eTKa1friGngrpRJ9w"
     *
     *
     * @apiSuccess {String} _id  object id of User role data.
     * @apiSuccess {String} roleName  title of the role entered by the user.
     * @apiSuccess {Boolean} active   active bit status.
     * @apiSuccess {Boolean} read  read access granted to the role.
     * @apiSuccess {Boolean} write  write access granted to the role in combination with either create or change action enables either insert or update features respectively.
     * @apiSuccess {Boolean} create  User having both create and write access  granted to the role can insert new document.
     * @apiSuccess {Boolean} change  User having both change and write access  granted to the role can update existing document.
     * @apiSuccess {Boolean} delete delete access granted to the role, deletes data permanently .
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
    *           "_id": "57f347c55dd74725fd59cce1",
    *           "roleName": "reader",
    *           "active": true,
    *           "change": false,
    *           "delete": false,
    *           "create": false,
    *           "write": false,
    *           "read": true
    *      }
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
     * @apiError  (NotFound) {String} message  User Role not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "User Role not found"
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
            res.json(req.roleInfo);
        })

        /**
         * @api {patch} /api/roles/:roleId Deletes existing User Role Information object
         * @apiPermission admin
         * @apiName deleteRoleInfo
         * @apiGroup Role Management
         *
         *
         *  @apiParam {String} roleId Object ID of the user role object information
         *
         *
         *  @apiParamExample {json} Request-Example:
         *     {
         *       "roleId": "57f365b9ef6b0749194f8101"
         *     }
         *
         *
         * @apiDescription Deletes existing user role information from the database.
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
         * -X PATCH  \
         * http://localhost:3000/api/roles/57f365b9ef6b0749194f8101 \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3ZDE3NTVlZmU2ZmViNmUzNGE4NWNkYSIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJoZWxwQG5vZGViZWF0cy5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWRkZWRPbiI6IjIwMTYtMDktMDhUMTQ6Mjc6NDIuNjc3WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTdkMTc1NWVmZTZmZWI2ZTM0YTg1Y2RhIiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ3NTU2NTg3OCwiZXhwIjoxNDc1NjUyMjc4LCJpc3MiOiI1N2QxNzU1ZWZlNmZlYjZlMzRhODVjZGEifQ.D5FJ7i6ycZBhYc-kHni6WnjCOGCEZBMsZu9yeCajO_bhVzH-muqUvZ6K5072vwO7LoKB0eTKa1friGngrpRJ9w"
         *
         *
         * @apiSuccess {String} message User Role deleted successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "User Role deleted successfully"
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
         * @apiError  (NotAllowed) {String} message  Admin role cannot be deleted.
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 405 Not Allowed
         *     {
         *       "message": "Admin role cannot be deleted"
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

        .patch(  roleManagerController.deleteRoleInfo )

        /**
         * @api {put} /api/roles/:roleId Updates existing User Role Information object
         * @apiPermission admin
         * @apiName updateRoleInfo
         * @apiGroup Role Management
         *
         *
         *  @apiParam {String} roleId Object ID of the user role object information
         *
         *
         *  @apiParamExample {json} Request-Example:
         *     {
         *       "roleId": "57f365b9ef6b0749194f8101"
         *     }
         *
         *
         * @apiDescription Updates existing user role information to the database with permitted actions.
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
         * -X PUT  \
         * http://localhost:3000/api/roles/57f365b9ef6b0749194f8101 \
         * -H 'Content-Type: application/json' \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU3ZDE3NTVlZmU2ZmViNmUzNGE4NWNkYSIsImFjdGl2ZSI6dHJ1ZSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJoZWxwQG5vZGViZWF0cy5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiYWRkZWRPbiI6IjIwMTYtMDktMDhUMTQ6Mjc6NDIuNjc3WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTdkMTc1NWVmZTZmZWI2ZTM0YTg1Y2RhIiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ3NTU2NTg3OCwiZXhwIjoxNDc1NjUyMjc4LCJpc3MiOiI1N2QxNzU1ZWZlNmZlYjZlMzRhODVjZGEifQ.D5FJ7i6ycZBhYc-kHni6WnjCOGCEZBMsZu9yeCajO_bhVzH-muqUvZ6K5072vwO7LoKB0eTKa1friGngrpRJ9w" \
         * -d '{"roleName": "agent2", "active": true,  "change": false, "delete":false, "create":true, "write":true, "read":true}'
         *
         *
         * @apiSuccess {String} message User Role updated successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "User Role updated successfully"
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
         * @apiError  (BadRequest) {String} message Please enter Role Name
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *
         *     {
         *       "message": "Please enter Role Name"
         *     }
         *
         *
         *
         * @apiError  (AlreadyExists)  {String} message  User Role with same name already exists
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 409 Conflict
         *     {
         *       "message": "User Role with same name already exists"
         *     }
         *
         * @apiError  (NotAllowed) {String} message  Admin role cannot be edited.
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 405 Not Allowed
         *     {
         *       "message": "Admin role cannot be edited"
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

        .put( roleManagerController.updateRoleInfo );


//function declaration to return user role list to the client if exists else return not found message
    function getAllRoles(req, res, next) {
        roleManagerController.getRoles(req)
            .then(function(roles){
                if (roles) {
                    res.status(HTTPStatus.OK);
                    res.json(roles);
                } else {
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.roleManager.notFound
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    }

    return roleManagerRouter;

})();

module.exports = roleManagerRoutes;