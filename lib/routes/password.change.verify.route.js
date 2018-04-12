var passwordChangeVerifyTokenRoutes = (function () {

    'use strict';

    var HTTPStatus = require('http-status'),
        express = require('express'),
        passwordChangeVerifyTokenController = require('../controllers/password.change.verify.server.controller'),
        passwordChangeVerifyTokenRouter = express.Router(),
        Promise = require("bluebird");

    passwordChangeVerifyTokenRouter.route('/:passwordChangeToken')

    /**
     * @api {get} /api/password-change/confirm/:passwordChangeToken  Verify the password change action  by clicking on the link url sent to the email
     * @apiPermission public
     * @apiName confirmPasswordChangeAction
     * @apiGroup PasswordChangeVerify
     *
     * @apiParam {String} passwordChangeToken hashed verification token sent to the email
     *
     *   @apiParamExample {json} Request-Example:
     *     {
     *       "passwordChangeToken": "c69dfe42cb583cfdea47663d6c45bc1110a5"
     *     }
     *
     * @apiSuccess  {String} message Redirect the user to password change route
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 302 Page Redirection
     *     Redirects the user to the password change route
     *
     *
     *
     *
     * @apiDescription  Confirm the Password change verification action by clicking on the link url sent to the email
     * @apiVersion 0.0.1
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/password-change/confirm/c69dfe42cb583cfdea47663d6c45bc1110a5"
     *
     * @apiError  (Expired) {String} message Redirect the user to token-expired route
     *
     * @apiErrorExample Error-Response:
     * HTTP/1.1 302 Page Redirection
     *     Redirects the user to the token-expired route
     *
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

        .get(confirmPasswordChangeAction);


    //function declaration to get the response status of the password change verification action and based on the response http status code, redirect the user to different related routes
    function confirmPasswordChangeAction(req, res, next) {

        Promise.resolve(passwordChangeVerifyTokenController.verifyPasswordChangeToken(req, res, next))
            .then(function (dataObj) {
                if (dataObj) {
                    //if the confirmation status is 200, password change action is verified successfully and redirect the user to the password change page
                    //if the confirmation status is 410 i.e token expired,  redirect the user to the token expired page
                    //if the confirmation status is 404 i.e token not found,  redirect the user to the page not found page
                    // var redirectUrl = "";
                    // if (req.app.get("env") == "production")
                    //     redirectUrl = "/admin/login";
                    // else
                    //     redirectUrl = "/login";

                    switch (dataObj.status.toString()) {
                        case HTTPStatus.OK.toString():
                            res.json({
                                status: true,
                                userId: dataObj.data,
                                accessToken: req.params.accessToken
                            });
                            // res.render('pages/password-reset', {
                            //     userId: dataObj.data,
                            //     accessToken: req.params.passwordChangeToken,
                            //     redirectUrl: redirectUrl,
                            //     layout: "plain-layout"
                            // });
                            break;
                        case HTTPStatus.NOT_FOUND.toString():
                            res.json({
                                status: false,
                                message: "Token not found!!!"
                            });
                            break;
                        case HTTPStatus.GONE.toString():
                            res.json({
                                status: false,
                                message: "The link has already expired!"
                            });
                            break;

                    }
                } else {
                    res.redirect('/404');
                }
            })
            .catch(function (err) {
                return next(err);
            });
    }

    return passwordChangeVerifyTokenRouter;

})();

module.exports = passwordChangeVerifyTokenRoutes;