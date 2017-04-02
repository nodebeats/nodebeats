(function (pageViewController) {
    'use strict';

    var Promise = require('bluebird'),
        join = Promise.join,
        commonDataController = require('./common-data.controller'),
        teamController = require('../team.management.server.controller'),
        partnerController = require('../partner.server.controller'),
        googleMapController = require("../google.maps.server.controller"),
        eventController = require('../event.management.server.controller'),
        newsController = require('../news.server.controller'),
        commentController = require('../comment.setting.server.controller'),
        blogController = require('../blog.server.controller'),
        imageGalleryController = require('../image.gallery.server.controller'),
        htmlController = require('../html.module.server.controller'),
        cloudinaryController = require('../cloudinary.setting.server.controller'),
        imageSliderController = require("../image.slider.server.controller"),
        testimonialController = require('../testimonial.server.controller');

    pageViewController.init = function (app) {
        commonDataController.init(app);

        pageViewController.getTeamMembersPageData = function (req, res, next) {
            req.query = {
                active: true,
                perpage: 100
            };

            return join(
                commonDataController.getCommonData(req),
                teamController.getTeamMembers(req, next),
                function (commonData, teamMemberData) {
                    return {
                        commonData: commonData,
                        teamMemberData: teamMemberData.dataList
                    };
                });
        };

        pageViewController.getTestimonialsPageData = function (req, next) {
            req.query = {
                active: true,
                perpage: 100
            };

            return join(
                commonDataController.getCommonData(req),
                testimonialController.getAllTestimonials(req, next),
                function (commonData, testimonialData) {
                    return {
                        commonData: commonData,
                        testimonialData: testimonialData.dataList
                    };
                });

        };

        pageViewController.getSupportingPartnersPageData = function (req, next) {
            req.query = {
                active: true,
                perpage: 100
            };

            return join(
                commonDataController.getCommonData(req),
                partnerController.getPartners(req, next),
                function (commonData, partnerData) {
                    return {
                        commonData: commonData,
                        partnerData: partnerData.dataList
                    };
                });

        };

        pageViewController.getContactPageData = function (req) {
            return join(
                commonDataController.getCommonData(req),
                googleMapController.getGoogleMapsConfig(),
                function (commonData, googleMapData) {
                    return {
                        commonData: commonData,
                        googleMapData: googleMapData
                    };
                });

        };

        pageViewController.getEventPageData = function (req, res, next) {
            req.query = {
                active: true,
                perpage: 9,
                sortOption: {
                    endDate: -1
                }
            };

            return join(
                commonDataController.getCommonData(req),
                eventController.getAllEvents(req, next),
                function (commonData, eventData) {
                    return {
                        commonData: commonData,
                        eventData: eventData.dataList,
                        pagination : {
                            page: eventData.currentPage,
                            pageCount: Math.ceil(eventData.totalItems / req.query.perpage)
                        }
                    };
                });

        };

        pageViewController.getEventDetailPage = function (req, res, next) {
            return join(
                commonDataController.getCommonData(req),
                eventController.getEventDetailByTitleSlog(req, res, next),
                function (commonData, eventDetailData) {
                    return {
                        commonData: commonData,
                        eventDetailData: eventDetailData
                    };
                });

        };

        pageViewController.getNewsPageData = function (req, res, next) {
            req.query = {
                active: true,
                perpage: 12
            };

            return join(
                commonDataController.getCommonData(req),
                newsController.getAllNews(req, next),
                function (commonData, newsData) {
                    return {
                        commonData: commonData,
                        newsData: newsData.dataList,
                        pagination : {
                            page: newsData.currentPage,
                            pageCount: Math.ceil(newsData.totalItems / req.query.perpage)
                        }
                    };
                });
        };


        pageViewController.getNewsDetailPageData = function (req, res, next) {
            return join(
                commonDataController.getCommonData(req),
                newsController.getNewsDetailByTitleSlog(req, res, next),
                commentController.getCommentSetting(),
                function (commonData, newsDetailData, commentSettingData) {
                    return {
                        commonData: commonData,
                        newsDetailData: newsDetailData,
                        commentSettingData: commentSettingData
                    };
                });
        };

        pageViewController.getBlogPageData = function (req, res, next) {
            req.query = {
                active: true,
                perpage: 10
            };

            return join(
                commonDataController.getCommonData(req),
                blogController.getAllBlogArticles(req, next),
                function (commonData, blogData) {
                    return {
                        commonData: commonData,
                        blogData: blogData.dataList,
                        pagination : {
                            page: blogData.currentPage,
                            pageCount: Math.ceil(blogData.totalItems / req.query.perpage)
                        }
                    };
                });
        };

        pageViewController.getBlogPageDataByTag = function (req, res, next) {
            req.query = {
                active: true,
                perpage: 10
            };

            return join(
                commonDataController.getCommonData(req),
                blogController.getBlogByTag(req, next),
                function (commonData, blogData) {
                    return {
                        commonData: commonData,
                        blogData: blogData.dataList,
                        pagination : {
                            page: blogData.currentPage,
                            pageCount: Math.ceil(blogData.totalItems / req.query.perpage)
                        }
                    };
                });
        };

        pageViewController.getBlogPageDataByCategory = function (req, res, next) {
            req.query = {
                active: true,
                perpage: 10
            };

            return join(
                commonDataController.getCommonData(req),
                blogController.getBlogByCategory(req, next),
                function (commonData, blogData) {
                    return {
                        commonData: commonData,
                        blogData: blogData.dataList,
                        pagination : {
                            page: blogData.currentPage,
                            pageCount: Math.ceil(blogData.totalItems / req.query.perpage)
                        }
                    };
                });
        };

        pageViewController.getBlogDetailPageData = function (req, res, next) {
            return join(
                commonDataController.getCommonData(req),
                blogController.getBlogDetailByUrlSlog(req, next),
                commentController.getCommentSetting(),
                function (commonData, blogDetailData, commentSettingData) {
                    return {
                        commonData: commonData,
                        blogDetailData: blogDetailData.data,
                        blogDocuments: blogDetailData.doclist,
                        blogCategoryData: blogDetailData.categoryInfo,
                        categoryRelatedBlogCount: blogDetailData.articleCounts,
                        commentSettingData: commentSettingData
                    };
                });

        };

        pageViewController.getImageGalleryAlbumPageData = function (req) {
            return join(
                commonDataController.getCommonData(req),
                imageGalleryController.getAllAlbumsWithCoverImages(),
                cloudinaryController.getCloudinarySetting(),
                function (commonData, imageGalleryData, cloudinaryData) {
                    return {
                        commonData: commonData,
                        imageGalleryData: imageGalleryData,
                        cloudinaryCloudName: (cloudinaryData === null ? "" : cloudinaryData.cloudinaryCloudName)
                    };
                });
        };

        pageViewController.getAboutUsPageData = function (req) {
            return join(
                commonDataController.getCommonData(req),
                htmlController.getHtmlContentByTitle('company-intro'),
                htmlController.getHtmlContentByTitle('vision'),
                htmlController.getHtmlContentByTitle('mission'),
                htmlController.getHtmlContentByTitle('services'),
                htmlController.getHtmlContentByTitle('contact-link'),
                function (commonData, companyIntroHtmlData, visionHtmlData, missionHtmlData, servicesHtmlData, contactLinkHtmlData) {
                    return {
                        commonData: commonData,
                        companyIntroHtmlData: companyIntroHtmlData,
                        visionHtmlData: visionHtmlData,
                        missionHtmlData: missionHtmlData,
                        servicesHtmlData: servicesHtmlData,
                        contactLinkHtmlData: contactLinkHtmlData

                    };
                });
        };

        pageViewController.getIndexPageData = function (req, res, next) {
            req.query = {
                active: true,
                perpage: 16
            };
            return new Promise(function (resolve, reject) {
                partnerController.getPartners(req, next)
                    .then(function (partnerData) {
                        req.query.perpage = 2;
                        return join(
                            commonDataController.getCommonData(req),
                            imageSliderController.getAllSliderImages(req),
                            blogController.getAllBlogArticles(req, next),
                            newsController.getAllNews(req, next),
                            htmlController.getHtmlContentByTitle('contact-link'),
                            function (commonData, imageSliderData, blogData, newsData, contactLinkHtmlData) {
                                return {
                                    commonData: commonData,
                                    imageSliderData: imageSliderData,
                                    blogData: blogData.dataList,
                                    newsData: newsData.dataList,
                                    contactLinkHtmlData: contactLinkHtmlData,
                                    partnerData: partnerData.dataList
                                };
                            });
                    })
                    .then(function (data) {
                        resolve(data);
                    })
                    .catch(function (err) {
                        reject(err);
                    });
            });

        };
    };
})(module.exports);