(function (htmlRenderer) {
    'use strict';

    var path = require("path"),
        express = require('express'),
        pageViewController = require('../../controllers/view-controller/page-view.controller');

    htmlRenderer.init = function (app, userLoginRouter) {
        pageViewController.init(app);

        app.get('/', function (req, res, next) {
            pageViewController.getIndexPageData(req, res, next)
                .then(function (resData) {
                    res.render('pages/index', {
                        data: resData
                    });
                })
                .catch(function (err) {
                    next(err);
                });
        });

        app.get('/team-members', function (req, res, next) {
            pageViewController.getTeamMembersPageData(req, res, next)
                .then(function (resData) {
                    res.render('pages/team', {
                        data: resData,
                        activePageMenu: req.originalUrl
                    });
                })
                .catch(function (err) {
                    next(err);
                });
        });

        app.get('/testimonial', function (req, res, next) {
            pageViewController.getTestimonialsPageData(req, res, next)
                .then(function (resData) {
                    res.render('pages/testimonial', {
                        data: resData,
                        activePageMenu: req.originalUrl
                    });
                })
                .catch(function (err) {
                    next(err);
                });
        });

        app.get('/partners', function (req, res, next) {
            pageViewController.getSupportingPartnersPageData(req, res, next)
                .then(function (resData) {
                    res.render('pages/partners', {
                        data: resData,
                        activePageMenu: req.originalUrl
                    });
                })
                .catch(function (err) {
                    next(err);
                });
        });

        app.get('/contact-us', function (req, res, next) {
            pageViewController.getContactPageData(req, res, next)
                .then(function (resData) {
                    res.render('pages/contact-us', {
                        data: resData,
                        activePageMenu: req.originalUrl
                    });
                })
                .catch(function (err) {
                    next(err);
                });
        });

        app.get('/events', function (req, res, next) {
            pageViewController.getEventPageData(req, res, next)
                .then(function (resData) {
                    res.render('pages/events', {
                        data: resData,
                        activePageMenu: req.originalUrl
                    });
                })
                .catch(function (err) {
                    next(err);
                });
        });

        app.get('/event-detail/:year/:month/:day/:titleSlog', function (req, res, next) {
            pageViewController.getEventDetailPage(req, res, next)
                .then(function (resData) {
                    res.render('pages/event-detail', {
                        data: resData,
                        activePageMenu: req.originalUrl
                    });
                })
                .catch(function (err) {
                    next(err);
                });
        });

        app.get('/news', function (req, res, next) {
            pageViewController.getNewsPageData(req, res, next)
                .then(function (resData) {
                    res.render('pages/news', {
                        data: resData,
                        activePageMenu: req.originalUrl
                    });
                })
                .catch(function (err) {
                    next(err);
                });
        });

        app.get('/news-detail/:year/:month/:day/:titleSlog', function (req, res, next) {

            pageViewController.getNewsDetailPageData(req, res, next)
                .then(function (resData) {
                    res.render('pages/news-detail', {
                        data: resData
                    });
                })
                .catch(function (err) {
                    next(err);
                });
        });

        app.get('/blogs', function (req, res, next) {
            pageViewController.getBlogPageData(req, res, next)
                .then(function (resData) {
                    res.render('pages/blog', {
                        data: resData,
                        activePageMenu: req.originalUrl
                    });
                })
                .catch(function (err) {
                    next(err);
                });
        });

        app.get('/filter/blogs/:blogTag', function (req, res, next) {
            pageViewController.getBlogPageDataByTag(req, res, next)
                .then(function (resData) {
                    res.render('pages/blog', {
                        data: resData,
                        activePageMenu: req.originalUrl
                    });
                })
                .catch(function (err) {
                    next(err);
                });
        });

        app.get('/filter/category/blogs/:blogCategory', function (req, res, next) {
            pageViewController.getBlogPageDataByCategory(req, res, next)
                .then(function (resData) {
                    res.render('pages/blog', {
                        data: resData,
                        activePageMenu: req.originalUrl
                    });
                })
                .catch(function (err) {
                    next(err);
                });
        });

        app.get('/blog-detail/:year/:month/:day/:titleSlog', function (req, res, next) {

            pageViewController.getBlogDetailPageData(req, res, next)
                .then(function (resData) {
                    res.render('pages/blog-detail', {
                        data: resData
                    });
                })
                .catch(function (err) {
                    next(err);
                });
        });

        app.get('/image-gallery', function (req, res, next) {
            pageViewController.getImageGalleryAlbumPageData(req, res, next)
                .then(function (resData) {
                    res.render('pages/image-gallery', {
                        data: resData,
                        activePageMenu: req.originalUrl
                    });
                })
                .catch(function (err) {
                    next(err);
                });
        });

        app.get('/about-us', function (req, res, next) {
            pageViewController.getAboutUsPageData(req, res, next)
                .then(function (resData) {
                    res.render('pages/about-us', {
                        data: resData,
                        activePageMenu: req.originalUrl
                    });
                })
                .catch(function (err) {
                    next(err);
                });
        });

        app.get(['/admin/login', '/admin/forgot-password'], function (req, res) {
            if (app.get('env') === "production" || app.get('env') === "test") {
                res.render(app.get('rootDir') + '/admin/dist/index.html', {layout: false});
            }
            else if (app.get('env') === "development") {
                res.render(app.get('rootDir') + '/admin/src/index.html', {layout: false});
            }
        });

        app.post('/api/login', function (req, res) {
            userLoginRouter.post();
        });

        app.get('/login-success', function (req, res) {
            res.send('<h1>Successfull</h1>');
        });

        app.get('/login-failure', function (req, res) {
            res.send('<h1>Failure</h1>');
        });

        app.get('/404', function (req, res) {
            res.render('pages/page-not-found', {layout: "plain-layout"});
        });
        app.get('/password-reset', function (req, res) {
            res.render('pages/password-reset', {layout: "plain-layout"});
        });
        app.get('/link-expired', function (req, res) {
            res.render('pages/expiration-link', {layout: "plain-layout"});
        });
        app.use(function (req, res) {
            res.render("pages/page-not-found", {layout: "plain-layout"});
        });
    };
})(module.exports);
