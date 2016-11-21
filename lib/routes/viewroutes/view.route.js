/**
 * Created by lakhe on 4/10/16.
 */

(function (htmlRenderer) {
    'use strict';
    var path = require("path"),
        express = require('express');

    htmlRenderer.init = function (app, userLoginRouter) {


        app.get('/', function (req, res, next) {
            var homeController = require('../../controllers/view-controller/home.controller');
            var data = {};
            homeController.getData(req, res, next)
                .then(function (resData) {
                    res.render('index', {
                        data: resData
                    });
                })
                .catch(function (err) {
                    next(err);
                });
        });
        app.get('/docs/api', function (req, res) {
            res.sendFile(app.get('rootDir') + "/public/apidoc/index.html", {layout: false});
        });
        app.get('/getting-started', function (req, res) {
            res.render(app.get('rootDir') + "/public/documentation/index.html", {
                layout: false,
                protocol: 'https',
                cloudinaryname: 'nodebeats'
            });
        });
        app.get(['/login','/forgot-password'], function (req, res) {
            if (app.get('env') === "production") {
                res.render(app.get('rootDir') + '/admin/dist/index.html', {layout: false});
            }
            else if (app.get('env') === "development" || app.get('env') === "test") {
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
            res.render('page-not-found', {layout: "plain-layout"});
        });
        app.get('/password-reset', function (req, res) {
            res.render('password-reset', {layout: "plain-layout"});
        });
        app.get('/link-expired', function (req, res) {
            res.render('expiration-link', {layout: "plain-layout"});
        });
        app.get('/app-shell', function (req, res) {
            res.render('', {layout: 'app-shell'});
        });
        app.use(function (req, res) {
            res.render("page-not-found",  {layout: "plain-layout"});
        });


    };
})
(module.exports);
