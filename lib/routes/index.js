(function (appllicationRoutes) {

    'use strict';

    appllicationRoutes.init = function (app) {

        var tokenAuthMiddleware = require('../middlewares/token.authentication.middleware'),
            roleAuthMiddleware = require('../middlewares/role.authorization.middleware'),
            rateLimiter = require('../middlewares/rate.limit.middleware'),
            fileOperationHelper = require('../helpers/file.operation.helper');


        app.delete('/api/deletefile', tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, fileOperationHelper.deleteFile);

        rateLimiter.init(app);

        var blogRouter = require('./blog.route');
        app.use('/api/', blogRouter);


        var newsInfoRouter = require('./news.route');
        app.use('/api/', newsInfoRouter);


        var teamMemberInfoRouter = require('./team.management.route');
        app.use('/api/', teamMemberInfoRouter);


        var errorLogRouter = require('./error.log.route');
        app.use('/api/', errorLogRouter);


        var googleAnalyticsRouter = require('./google.analytics.route');
        app.use('/api/analytics/', googleAnalyticsRouter);


        var cloudinarySettingRouter = require('./cloudinary.setting.route');
        app.use('/api/cloudinary', cloudinarySettingRouter);

        var userConfirmationRouter = require('./user.confirmation.route');
        app.use('/api/confirm/user/', userConfirmationRouter);

        var contactInfoRouter = require('./contact.route');
        app.use('/api/contact/info/', contactInfoRouter);

        var mailServiceRouter = require('./email.service.configure.route');
        app.use('/api/emailservice', mailServiceRouter);

        var emailTemplateRouter = require('./email.template.route');
        app.use('/api/emailtemplate', emailTemplateRouter);

        var eventManagementInfoRouter = require('./event.management.route');
        app.use('/api/event/info/', eventManagementInfoRouter);

        var imageGalleryRouter = require('./image.gallery.route');
        app.use('/api/gallery/', imageGalleryRouter);

        var htmlContentModuleRouter = require('./html.module.route');
        app.use('/api/htmlcontent/', htmlContentModuleRouter);

        var imageSliderInfoRouter = require('./image.slider.route');
        app.use('/api/imageslider/', imageSliderInfoRouter);

        var googleMapsRouter = require('./google.maps.route');
        app.use('/api/maps/', googleMapsRouter);

        var organizationInfoRouter = require('./organization.info.route');
        app.use('/api/organization/info/', organizationInfoRouter);

        var partnerInfoRouter = require('./partner.route');
        app.use('/api/partner/', partnerInfoRouter);

        var testimonialInfoRouter = require('./testimonial.route');
        app.use('/api/testimonial/', testimonialInfoRouter);

        var textEditorRouter = require("./text.editor.file.route");
        app.use('/api/texteditor/', textEditorRouter);

        var userUnBlockRouter = require('./user.unblock.route');
        app.use('/api/unblock/user/', userUnBlockRouter);

        var userRouter = require('./user.route');
        app.use('/api/', userRouter);

        var commentSettingRouter = require('./comment.setting.route');
        app.use('/api/commentsetting/', commentSettingRouter);

        var passwordChangeVerifyRouter = require('./password.change.verify.route');
        app.use('/api/password-change/confirm/', passwordChangeVerifyRouter);

        var twoFactorAuthenticationRouter = require('./two.factor.authentication.route');
        app.use('/api/', twoFactorAuthenticationRouter);

        var roleManagerRouter = require('./role.management.route');
        app.use('/api/roles/', tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, roleManagerRouter);

        var apiAccessRouter = require('./apiaccess.management.route');
        app.use('/api/access/', tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize,  apiAccessRouter);

        var authorizationTokenRouter = require('./authorization.token.management.route');
        app.use('/api/authtoken/', tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize,  authorizationTokenRouter);

        var userApiLoginRouter = require('./login.route');
        app.use('/api/', rateLimiter.rateLimitByIpAddress, userApiLoginRouter);

        app.get('/api/authenticate', tokenAuthMiddleware.authenticate, function (req, res) {
            res.status(200);
            res.json({
                success: true,
                message: 'Token is Verified'
            });
        });

        var dashboardRouter = require('./dashboard.route');
        app.use('/api/', tokenAuthMiddleware.authenticate, dashboardRouter);
        
        // var viewRouter = require('./viewroutes/view.route');
        // viewRouter.init(app, userApiLoginRouter);

        // app.get('/*',  function(req, res, next){
        //     res.status(404);
        //     res.render('404', {
        //        title : 'Resource Not Found'
        //     });
        // });


        // // catch 404 and forward to error handler
        // app.use(function(req, res, next) {
        //     var err = new Error('Not Found eroro hahah e');
        //     err.status = 404;
        //     next(err);
        // });


    };

})(module.exports);
