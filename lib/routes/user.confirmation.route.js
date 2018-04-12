var userConfirmationTokenRoutes = (function () {

    'use strict';

    var HTTPStatus = require('http-status'),
        express = require('express'),
        userConfirmationTokenController = require('../controllers/user.confirmation.server.controller'),
        userConfirmationTokenRouter = express.Router(),
        messageConfig   = require('../configs/api.message.config'),
        Promise = require("bluebird");

    userConfirmationTokenRouter.route('/:userConfirmationToken')

    /**
     * @api {get} /api/confirm/user/:userConfirmationToken  Confirm user registration by clicking the registration link
     * @apiPermission public
     * @apiName confirmUserRegistration
     * @apiGroup Confirmuserregistration
     *
     * @apiParam {String} userConfirmationToken hashed confirmation token sent to the email
     *
     *   @apiParamExample {json} Request-Example:
     *     {
     *       "userConfirmationToken": "c69dfe42cb583cfdea47663d6c45bc1110a5"
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
     * @apiDescription  Confirm the user registration by clicking on the registration link on the email sent to the user
     * @apiVersion 0.0.1
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/confirm/user/c69dfe42cb583cfdea47663d6c45bc1110a5"
     *
     * @apiError  (Expired) {String} message Redirect the user to token-expired route
     *
     * @apiErrorExample Error-Response:
     * HTTP/1.1 302 Page Redirection
     *     Redirects the user to the token-expired route
     *
     *
     *
     * @apiError  (AlreadyConfirmed) {String} message Redirect the user to login route
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

        .get( confirmUserRegistration );



    //function declaration to get the response status of the user registration confirmation action and based on the response http status code, redirect the user to different related routes
    function confirmUserRegistration(req, res, next) {

        Promise.resolve(userConfirmationTokenController.confirmUserRegistration(req, res, next))
            .then(function(confirmationStatus){
                //if the confirmation status is 200, user registration is confirmed successfully and redirect the user to the login page
                //if the confirmation status is 410 i.e token expired, resend the confirmation email  and redirect the user to the token expired page
                //if the confirmation status is 404 i.e token not found,  redirect the user to the page not found page
                if (confirmationStatus) {

                    switch (confirmationStatus.toString()){
                        case HTTPStatus.OK.toString():
                            res.json({
                                status: true,
                                message: "User verified successfully. Please login."
                            });
                            // if(req.app.get('env') !== "production"){
                            //     res.redirect('http://localhost:4200/login');
                            // }else{
                            //     res.redirect('/admin/login');
                            // }
                            break;
                        case HTTPStatus.CONFLICT.toString():
                            res.json({
                                status: false,
                                message: messageConfig.userConfirm.alreadyExists
                            });
                            break;
                        case HTTPStatus.NOT_FOUND.toString():
                            res.json({
                                status: false,
                                message: "The provided token does not exist!"
                            });
                            // res.redirect('/404');
                            break;
                        case HTTPStatus.GONE.toString():
                            res.json({
                                status: false,
                                message: "Sorry! The link has expired."
                            });
                            // res.redirect('/link-expired');
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

    return userConfirmationTokenRouter;

})();

module.exports = userConfirmationTokenRoutes;