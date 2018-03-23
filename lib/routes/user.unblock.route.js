var userUnBlockTokenRoutes = (function () {

    'use strict';

    var HTTPStatus = require('http-status'),
        express = require('express'),
        userUnBlockTokenController = require('../controllers/user.unblock.server.controller'),
        userUnBlockTokenRouter = express.Router(),
        Promise = require("bluebird");
    

    userUnBlockTokenRouter.route('/:userUnBlockToken')

    /**
     * @api {get} /api/unblock/user/:userUnBlockToken  Unblock the blocked user by clicking the unblock link
     * @apiPermission public
     * @apiName unBlockUser
     * @apiGroup UserUnblock
     *
     * @apiParam {String} userUnBlockToken hashed unblock token sent to the email
     *
     *   @apiParamExample {json} Request-Example:
     *     {
     *       "userUnBlockToken": "c69dfe42cb583cfdea47663d6c45bc1110a5"
     *     }
     *
     * @apiSuccess  {String} message Redirect the user to login route
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 302 Page Redirection
     *     Redirects the user to the login route
     *
     *
     *
     *
     * @apiDescription  Unblock the blocked user by clicking on the link of the email content
     * @apiVersion 0.0.1
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/unblock/user/c69dfe42cb583cfdea47663d6c45bc1110a5"
     *
     * @apiError  (Expired) {String} message Redirect the user to token-expired route
     *
     * @apiErrorExample Error-Response:
     * HTTP/1.1 302 Page Redirection
     *     Redirects the user to the token-expired route
     *
     *
     *
     * @apiError  (AlreadyUnblocked) {String} message Redirect the user to login route
     *
     * @apiErrorExample Error-Response:
     * HTTP/1.1 302 Page Redirection
     *     Redirects the user to the login route
     *
     * @apiError  (NotFound) {String} message Redirect the user to page not found route
     *
     * @apiErrorExample Error-Response:
     *  HTTP/1.1 302 Page Redirection
     *     Redirects the user to Page Not Found route
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

        .get( unBlockUser );


//function declaration to get the response status of the user unblock action and based on the response http status code, redirect the user to different related routes
    function unBlockUser(req, res, next) {

        Promise.resolve(userUnBlockTokenController.unBlockUserAccount(req, res, next))
            .then(function(unBlockStatus){
                //if the unblock status is 200, user is unblocked successfully and redirect the user to the login page
                //if the unblock status is 410 i.e token expired, resend the unblock email  and redirect the user to the token expired page
                //if the unblock status is 404 i.e token not found,  redirect the user to the page not found page

                if (unBlockStatus) {

                    switch (unBlockStatus.toString()){
                        case HTTPStatus.OK.toString():
                            if(req.app.get('env') !== "production"){
                                res.redirect('http://localhost:4200/login');
                            }else{
                                res.redirect('/admin/login');
                            }
                            break;
                        case HTTPStatus.GONE.toString():
                        case HTTPStatus.NOT_FOUND.toString():
                            res.redirect('/link-expired');
                            break;
                    }
                } else {
                    res.redirect('/404');
                }
            })
            .catch(function(err){
                return next(err);
            });
    }

    return userUnBlockTokenRouter;

})();

module.exports = userUnBlockTokenRoutes;