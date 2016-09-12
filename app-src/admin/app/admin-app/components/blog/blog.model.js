"use strict";
var BlogCategoryModel = (function () {
    function BlogCategoryModel() {
        this.active = false;
    }
    return BlogCategoryModel;
}());
exports.BlogCategoryModel = BlogCategoryModel;
var BlogModel = (function () {
    function BlogModel() {
        this.categoryId = "";
        this.blogDescription = "";
        this.status = "active";
        this.active = false;
    }
    return BlogModel;
}());
exports.BlogModel = BlogModel;
var BlogMetaTagModel = (function () {
    function BlogMetaTagModel() {
    }
    return BlogMetaTagModel;
}());
exports.BlogMetaTagModel = BlogMetaTagModel;
var BlogTagModel = (function () {
    function BlogTagModel() {
    }
    return BlogTagModel;
}());
exports.BlogTagModel = BlogTagModel;
var BlogDocumentModel = (function () {
    function BlogDocumentModel() {
        this.active = false;
    }
    return BlogDocumentModel;
}());
exports.BlogDocumentModel = BlogDocumentModel;
var BlogResponse = (function () {
    function BlogResponse() {
    }
    return BlogResponse;
}());
exports.BlogResponse = BlogResponse;
var BlogCategoryResponse = (function () {
    function BlogCategoryResponse() {
    }
    return BlogCategoryResponse;
}());
exports.BlogCategoryResponse = BlogCategoryResponse;
var DocumentProperties = (function () {
    function DocumentProperties() {
    }
    return DocumentProperties;
}());
var BlogDocResponse = (function () {
    function BlogDocResponse() {
    }
    return BlogDocResponse;
}());
exports.BlogDocResponse = BlogDocResponse;
//# sourceMappingURL=blog.model.js.map