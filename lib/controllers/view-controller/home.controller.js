'use strict';
(function (homeController) {
    var Promise = require('bluebird');
    homeController.getData = function (req, next) {
        var commonController = require("./common-controller"),
            teamController = require('../team.management.server.controller'),
            htmlController = require('../html.module.server.controller'),

            techStackController = require('../image.slider.server.controller');
        var resData = {};

        return new Promise(function (resolve, reject) {

            commonController.getData(req)
                .then(function (commonData) {
                    if (commonData)
                        resData = commonData;

                    var title = "intro";
                    return htmlController.getHtmlContentByTitle(title)
                })

                .then(function (data) {
                    if (data)
                        resData.bannerHtml = data.htmlModuleContent;
                    var title = "about";
                    return htmlController.getHtmlContentByTitle(title)
                })
                .then(function (data) {
                    if (data)
                        resData.whyNodebeats = data.htmlModuleContent;
                    var title = "service";
                    return htmlController.getHtmlContentByTitle(title)
                })
                .then(function (data) {
                    if (data)
                        resData.aboutHtml = data.htmlModuleContent;
                    var title = "download";
                    return htmlController.getHtmlContentByTitle(title)
                })
                .then(function (data) {
                    if (data)
                        resData.downloadHtml = data.htmlModuleContent;
                    var title = "contact";
                    return htmlController.getHtmlContentByTitle(title)
                })
                .then(function (data) {
                    if (data)
                        resData.contactHtml = data.htmlModuleContent;
                    var title = "team";
                    return htmlController.getHtmlContentByTitle(title)
                })
                .then(function (data) {
                    if (data)
                        resData.teamHtml = data.htmlModuleContent;
                    return [teamController.getTeamMembers(req, next),
                        techStackController.getAllSliderImages(req, "addedOn")
                    ];
                })
                .spread(function (teamData, techStackImage) {
                    if (teamData.dataList.length > 0)
                        resData.team = teamData.dataList;
                    if (techStackImage.length > 0)
                        resData.techStack = techStackImage;
                    resolve(resData);
                })
                .catch(function (err) {
                    reject(err);
                });
        });

    };
})(module.exports);