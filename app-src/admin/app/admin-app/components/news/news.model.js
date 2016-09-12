"use strict";
var NewsCategoryModel = (function () {
    function NewsCategoryModel() {
        this.active = false;
    }
    return NewsCategoryModel;
}());
exports.NewsCategoryModel = NewsCategoryModel;
var NewsCategoryResponse = (function () {
    function NewsCategoryResponse() {
    }
    return NewsCategoryResponse;
}());
exports.NewsCategoryResponse = NewsCategoryResponse;
var NewsModel = (function () {
    function NewsModel() {
        this.active = false;
        this.categoryID = "";
        this.newsDescription = "";
    }
    return NewsModel;
}());
exports.NewsModel = NewsModel;
var NewsResponse = (function () {
    function NewsResponse() {
    }
    return NewsResponse;
}());
exports.NewsResponse = NewsResponse;
var NewsImageModel = (function () {
    function NewsImageModel() {
        this.active = false;
    }
    return NewsImageModel;
}());
exports.NewsImageModel = NewsImageModel;
var ImageProperties = (function () {
    function ImageProperties() {
    }
    return ImageProperties;
}());
var NewsImageResponse = (function () {
    function NewsImageResponse() {
    }
    return NewsImageResponse;
}());
exports.NewsImageResponse = NewsImageResponse;
//# sourceMappingURL=news.model.js.map