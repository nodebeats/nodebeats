var blogRoutes = (function () {

    'use strict';

    var HTTPStatus = require('http-status'),
        express = require('express'),
        tokenAuthMiddleware = require('../middlewares/token.authentication.middleware'),
        roleAuthMiddleware = require('../middlewares/role.authorization.middleware'),
        messageConfig = require('../configs/api.message.config'),
        imageFilePath = './public/uploads/images/blogs/',
        documentFilePath = './public/uploads/documents/blogs/',
        uploadPrefix = 'blog',
        fileUploadHelper = require('../helpers/file.upload.helper')(imageFilePath, documentFilePath, uploadPrefix),
        uploader = fileUploadHelper.uploader,
        documentUploader = fileUploadHelper.documentUploader,
        blogController = require('../controllers/blog.server.controller'),
        blogRouter = express.Router();

    blogRouter.route('/blogcategory/')

    /**
     * @api {get} /api/blogcategory/ Get Blog category list
     * @apiPermission public
     * @apiName getAllBlogCategories
     * @apiGroup Blog
     *
     *
     * @apiParam {Int} perpage Number of data to return on each request
     * @apiParam {Int} page Current page number of pagination system.
     * @apiParam {String} categoryname name of blog category to filter blog categories
     * @apiParam {Boolean} active whether to get data with active bit true or false, if true, then returns data list with active bit set to true only
     *
     *
     *   @apiParamExample {json} Request-Example:
     *     {
     *       "perpage": 10,
     *       "page": 1,
     *       "categoryname": "technology"
     *     }
     *
     *  * @apiParamExample {json} Request-Example:
     *     {
     *       "active": true,
     *       "categoryname": "technology"
     *     }
     *
     * @apiDescription Retrieves the blog category list, if exists, else return empty array
     * @apiVersion 0.0.1
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/blogcategory" \
     * --data-urlencode "perpage=10" \
     * --data-urlencode "page=1"
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/blogcategory" \
     * --data-urlencode "active=true" \
     * --data-urlencode "categoryname=technology"
     *
     *
     * @apiSuccess {Array} dataList list of blog categories
     * @apiSuccess {String} dataList._id  object id of blog category data.
     * @apiSuccess {String} dataList.categoryName  name of the category of blog.
     * @apiSuccess {String} dataList.categoryDescription   brief description about blog category.
     * @apiSuccess {String} dataList.urlSlogCategory  clean URL of blog category.
     * @apiSuccess {String} dataList.addedOn  date on which category is added.
     * @apiSuccess {Boolean} dataList.active  active bit status.
     * @apiSuccess {Int} totalItems  total no of blog categories in the related collection in database.
     * @apiSuccess {Int} currentPage  current page number of client pagination system.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *           "dataList": [
     *               {
     *                   "_id": "578f2ca535102e0c5d5c3ce2",
     *                   "categoryDescription": "contains food related blog articles",
     *                   "urlSlogCategory": "food",
     *                   "categoryName": "Food",
     *                   "addedOn": "2016-07-20T07:47:49.232Z",
     *                   "active": false
     *               }
     *           ],
     *           "totalItems": 1,
     *           "currentPage": 1
     *       }
     *
     *
     * @apiError  (NotFound) {String} message  Category not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "Category not found"
     *     }
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

        .get( getAllBlogCategories)

        /**
         * @api {post} /api/blogcategory/ Post Blog category data
         * @apiPermission admin
         * @apiName postBlogCategory
         * @apiGroup Blog
         *
         * @apiParam {String} categoryName  name of the category of blog.
         *
         * @apiDescription saves the blog category information to the database
         * @apiVersion 0.0.1
         * @apiHeader (AuthorizationHeader) {String} authorization x-access-token value.
         * @apiHeaderExample {json} Header-Example:
         *{
         *  "x-access-token": "yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c"
         * }
         *
         * @apiExample {curl} Example usage:
         *
         *
         * curl \
         * -v \
         * -X POST  \
         * http://localhost:3000/api/blogcategory/ \
         * -H 'Content-Type: application/json' \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2OTAwMDE4NCwiZXhwIjoxNDY5MDIwMTg0LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.Npy3LZnsOqOqH7RBfl3oYAdVOYdlU3_6i8izGo7xkHzI610NjnCaljiMxb7s71RJsRoqVqNqB-gai8vzWlofrQ" \
         * -d '{"categoryName": "Sports", "categoryDescription": "Contains sports related blog articles","active": true}'
         *
         * @apiSuccess {String} message Blog Category saved successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "Blog Category saved successfully"
         *       }
         *
         * @apiError (UnAuthorizedError) {String} message authentication token was not supplied
         * @apiError (UnAuthorizedError) {Boolean} isToken to check if token is supplied or not , if token is supplied , returns true else returns false
         * @apiError (UnAuthorizedError) {Boolean} success true if jwt token verifies
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 401 Unauthorized
         *     {
         *       "isToken": true,
         *        "success": false,
         *        "message": "Authentication failed"
         *     }
         *
         *
         * @apiError  (UnAuthorizedError_1) {String} message  You are not authorized to access this api route.
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 401 Unauthorized
         *     {
         *       "message": "You are not authorized to access this api route."
         *     }
         *
         * @apiError  (UnAuthorizedError_2) {String} message  You are not authorized to perform this action.
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 401 Unauthorized
         *     {
         *       "message": "You are not authorized to perform this action"
         *     }
         *
         *
         *
         * @apiError  (BadRequest) {String} message Blog category is required
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *
         *     {
         *       "message": "Blog category is required"
         *     }
         *
         *
         *
         * @apiError  (AlreadyExists)  {String} message  Blog category with same name already exists
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 409 Conflict
         *     {
         *       "message": "Blog category with same name already exists"
         *     }
         *
         *
         *
         * @apiError (InternalServerError)  {String} message  Internal Server Error
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 500 Internal Server Error
         *     {
         *       "message": "Internal Server Error"
         *     }
         *
         */

        .post(tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, blogController.postBlogCategory);



    //middleware function that will get the blog category object for each of the routes defined downwards starting with /api/blogcategory route
    blogRouter.use('/blogcategory/:categoryId', function (req, res, next) {
        blogController.getBlogCategoryByID(req)
            .then(function(blogCategoryInfo){
                //saving in request object so that it can be used for other operations like updating data using put and patch method
                if (blogCategoryInfo) {
                    req.blogCategoryInfo = blogCategoryInfo;
                    next();
                    return null;// return a non-undefined value to signal that we didn't forget to return promise
                } else {
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.blog.notFoundCategory
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    });

    blogRouter.route('/blogcategory/:categoryId')

    /**
     * @api {get} /api/blogcategory/:categoryId Get Blog category object by ID
     * @apiPermission public
     * @apiName getBlogCategoryByID
     * @apiGroup Blog
     *
     * @apiParam {String} categoryId  object id of the blog category data
     *
     *
     *   @apiParamExample {json} Request-Example:
     *     {
     *       "categoryId": "578f2c9535102e0c5d5c3ce1"
     *     }
     *
     *
     * @apiDescription Retrieves the blog category object by Id, if exists, else return empty object
     * @apiVersion 0.0.1
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/blogcategory/578f2c9535102e0c5d5c3ce1"
     *
     *
     * @apiSuccess {String} _id  object id of blog category data.
     * @apiSuccess {String} categoryName  name of the category of blog.
     * @apiSuccess {String} categoryDescription   brief description about blog category.
     * @apiSuccess {String} urlSlogCategory  clean URL of blog category.
     * @apiSuccess {String} addedOn  date on which category is added.
     * @apiSuccess {Boolean} active  active bit status.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *           "_id": "578f2c9535102e0c5d5c3ce1",
     *           "categoryDescription": "contains technology related blog articles",
     *           "urlSlogCategory": "technology",
     *           "categoryName": "technology",
     *           "addedOn": "2016-07-20T07:47:33.132Z",
     *           "active": true
     *       }
     *
     *
     * @apiError  (NotFound) {String} message  Category not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "Category not found"
     *     }
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


        .get(function (req, res) {
            res.status(HTTPStatus.OK);
            res.json(req.blogCategoryInfo);
        })

        /**
         * @api {patch} /api/blogcategory/:categoryId Deletes existing Blog category data
         * @apiPermission admin
         * @apiName patchBlogCategory
         * @apiGroup Blog
         *
         * @apiParam {String} categoryId  object id of the blog category data
         *
         *
         *   @apiParamExample {json} Request-Example:
         *     {
         *       "categoryId": "578f32bca4d436d76bc751cf"
         *     }
         *
         * @apiDescription Deletes existing blog category information from the database
         * @apiVersion 0.0.1
         * @apiHeader (AuthorizationHeader) {String} authorization x-access-token value.
         * @apiHeaderExample {json} Header-Example:
         *{
         *  "x-access-token": "yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c"
         * }
         *
         * @apiExample {curl} Example usage:
         *
         *
         * curl \
         * -v \
         * -X PATCH  \
         * http://localhost:3000/api/blogcategory/578f32bca4d436d76bc751cf \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2OTAwMDE4NCwiZXhwIjoxNDY5MDIwMTg0LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.Npy3LZnsOqOqH7RBfl3oYAdVOYdlU3_6i8izGo7xkHzI610NjnCaljiMxb7s71RJsRoqVqNqB-gai8vzWlofrQ"
         *
         * @apiSuccess {String} message Blog category deleted successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "Blog category deleted successfully"
         *       }
         *
         * @apiError (UnAuthorizedError) {String} message authentication token was not supplied
         * @apiError (UnAuthorizedError) {Boolean} isToken to check if token is supplied or not , if token is supplied , returns true else returns false
         * @apiError (UnAuthorizedError) {Boolean} success true if jwt token verifies
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 401 Unauthorized
         *     {
         *       "isToken": true,
         *        "success": false,
         *        "message": "Authentication failed"
         *     }
         *
         * @apiError  (UnAuthorizedError_1) {String} message  You are not authorized to access this api route.
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 401 Unauthorized
         *     {
         *       "message": "You are not authorized to access this api route."
         *     }
         *
         * @apiError  (UnAuthorizedError_2) {String} message  You are not authorized to perform this action.
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 401 Unauthorized
         *     {
         *       "message": "You are not authorized to perform this action"
         *     }
         *
         *
         * @apiError (InternalServerError)  {String} message  Internal Server Error
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 500 Internal Server Error
         *     {
         *       "message": "Internal Server Error"
         *     }
         *
         */

        .patch(tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, blogController.patchBlogCategory)

        /**
         * @api {put} /api/blogcategory/:categoryId Updates existing Blog category data
         * @apiPermission admin
         * @apiName updateBlogCategory
         * @apiGroup Blog
         *
         * @apiParam {String} categoryId  object id of the blog category data
         *
         *
         *   @apiParamExample {json} Request-Example:
         *     {
         *       "categoryId": "578f32bca4d436d76bc751cf"
         *     }
         *
         * @apiDescription Updates existing blog category information to the database
         * @apiVersion 0.0.1
         * @apiHeader (AuthorizationHeader) {String} authorization x-access-token value.
         * @apiHeaderExample {json} Header-Example:
         *{
         *  "x-access-token": "yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c"
         * }
         *
         * @apiExample {curl} Example usage:
         *
         *
         * curl \
         * -v \
         * -X PUT  \
         * http://localhost:3000/api/blogcategory/578f32bca4d436d76bc751cf \
         * -H 'Content-Type: application/json' \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2OTAwMDE4NCwiZXhwIjoxNDY5MDIwMTg0LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.Npy3LZnsOqOqH7RBfl3oYAdVOYdlU3_6i8izGo7xkHzI610NjnCaljiMxb7s71RJsRoqVqNqB-gai8vzWlofrQ" \
         * -d '{"categoryName": "Sports Articles", "categoryDescription": "Contains sports related blog articles and tips","active": true}'
         *
         * @apiSuccess {String} message Blog category updated successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "Blog category updated successfully"
         *       }
         *
         * @apiError (UnAuthorizedError) {String} message authentication token was not supplied
         * @apiError (UnAuthorizedError) {Boolean} isToken to check if token is supplied or not , if token is supplied , returns true else returns false
         * @apiError (UnAuthorizedError) {Boolean} success true if jwt token verifies
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 401 Unauthorized
         *     {
         *       "isToken": true,
         *        "success": false,
         *        "message": "Authentication failed"
         *     }
         *
         *
         * @apiError  (UnAuthorizedError_1) {String} message  You are not authorized to access this api route.
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 401 Unauthorized
         *     {
         *       "message": "You are not authorized to access this api route."
         *     }
         *
         * @apiError  (UnAuthorizedError_2) {String} message  You are not authorized to perform this action.
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 401 Unauthorized
         *     {
         *       "message": "You are not authorized to perform this action"
         *     }
         *
         *
         *
         * @apiError  (BadRequest) {String} message Blog category is required
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *
         *     {
         *       "message": "Blog category is required"
         *     }
         *
         *
         *
         * @apiError  (AlreadyExists)  {String} message  Blog category with same name already exists
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 409 Conflict
         *     {
         *       "message": "Blog category with same name already exists"
         *     }
         *
         *
         *
         * @apiError (InternalServerError)  {String} message  Internal Server Error
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 500 Internal Server Error
         *     {
         *       "message": "Internal Server Error"
         *     }
         *
         */

        .put(tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, blogController.updateBlogCategory);


    blogRouter.route('/blog/')

    /**
     * @api {get} /api/blog/ Get blog article list
     * @apiPermission public
     * @apiName getAllBlogs
     * @apiGroup Blog
     *
     * @apiParam {Int} perpage Number of data to return on each request
     * @apiParam {Int} page Current page number of pagination system.
     * @apiParam {Boolean} active whether to get data with active bit true or false, if true, then returns data list with active bit set to true only
     * @apiParam {String} blogtitle to filter blog list using blog title as filter param
     * @apiParam {String} categoryid to filter blog list according to news category
     * @apiParam {String} tagid object id of the tag related to the blog article
     *
     *   @apiParamExample {json} Request-Example:
     *     {
     *       "perpage": 10,
     *       "page": 1
     *     }
     *   @apiParamExample {json} Request-Example:
     *     {
     *       "perpage": 10,
     *       "page": 1,
     *       "categoryid": "578f2c9535102e0c5d5c3ce1"
     *     }
     *
     *
     *   @apiParamExample {json} Request-Example:
     *     {
     *       "active": true,
     *       "blogtitle": "Testing Express APIs with Supertest"
     *     }
     *
     * @apiDescription Retrieves the blog list, if exists, else return empty array
     * @apiVersion 0.0.1
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/blog" \
     * --data-urlencode "perpage=10" \
     * --data-urlencode "page=1"
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/blog" \
     * --data-urlencode "perpage=10" \
     * --data-urlencode "page=1" \
     * --data-urlencode "categoryid=578f2c9535102e0c5d5c3ce1"
     *
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/blog" \
     * --data-urlencode "active=true" \
     * --data-urlencode "blogtitle=Testing Express APIs with Supertest"
     *
     *
     * @apiSuccess {Array} dataList list of blog articles
     * @apiSuccess {String} dataList._id  object id of blog article data.
     * @apiSuccess {String} dataList.blogTitle  title of the blog article.
     * @apiSuccess {String} dataList.urlSlog clean URL of the blog article title.
     * @apiSuccess {String} dataList.categoryId   object id of the related blog category.
     * @apiSuccess {String} dataList.blogSummary  brief description about the blog article.
     * @apiSuccess {String} dataList.blogDescription  blog article in detailed description.
     * @apiSuccess {String} dataList.author author of the blog article.
     * @apiSuccess {Date} dataList.addedOn  system date of blog article addition.
     * @apiSuccess {String} dataList.bannerImage  name of the image file.
     * @apiSuccess {String} dataList.bannerImageTitle  title description of blog article image.
     * @apiSuccess {String} dataList.bannerImageAltText  alternative text for blog article image .
     * @apiSuccess {Int} dataList.articleViews no of times blog article is viewed.
     * @apiSuccess {Boolean} dataList.active  active bit status.
     * @apiSuccess {Array} dataList.relatedFiles list of documents related to the blog.
     * @apiSuccess {Boolean} dataList.allowComment  whether to allow the comments in this blog article.
     * @apiSuccess {String} dataList.status  whether the blog article is still relevant or outdated.
     * @apiSuccess {Object} dataList.seoEntry  object containing blog article seo meta tags.
     * @apiSuccess {String} dataList.seoEntry.metaKeyword  meta keyword for the blog article.
     * @apiSuccess {String} dataList.seoEntry.titleTag  meta title tag for the blog article .
     * @apiSuccess {String} dataList.seoEntry.metaDescription meta description of the blog article.
     * @apiSuccess {String} dataList.seoEntry.metaAuthor  meta author of the blog artcle .
     * @apiSuccess {Boolean} dataList.seoEntry.valueChanged whether the meta tags are updated or not.
     * @apiSuccess {Array} dataList.tags  tags related to the blog article.
     * @apiSuccess {String} dataList.tags.tag  tag related to the blog article.
     * @apiSuccess {String} dataList.tags.urlSlogTag  clean URL of the tag .
     * @apiSuccess {String} dataList.tags.postCount no of blog posts related to the tag.
     *
     * @apiSuccess {Int} totalItems  total no of blog articles in the related collection in database.
     * @apiSuccess {Int} currentPage  current page number of client pagination system.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *           "dataList": [
     *               {
     *                   "_id": "578f46c4774c15521907c399",
     *                   "author": "codementor.io",
     *                   "bannerImageAltText": "very good article",
     *                   "bannerImageTitle": "very good tutorial codementor",
     *                   "bannerImage": "blog-1469007556727.webp",
     *                   "seoEntry": {
     *                       "metaAuthor": "codementor.io",
     *                       "metaDescription": "Hello, I'm Ilya, a full-stack developer who uses Node.js on the server and Ember.js on the client. Lately I've been having lots of fun testing my Express APIs,",
     *                       "titleTag": "Testing Express APIs with Supertest",
     *                       "metaKeyword": "tdd,node.js",
     *                       "valueChanged": false
     *                   },
     *                   "blogDescription": "<p>Hello, I'm Ilya, a full-stack developer who uses Node.js on the server and Ember.js on the client. Lately I've been having lots of fun testing my Express APIs, and I just wanted to show-off how fun and simple it can be. Hope you enjoy this as much as I enjoyed writing it!</p>",
     *                   "blogSummary": "Hello, I'm Ilya, a full-stack developer who uses Node.js on the server and Ember.js on the client. Lately I've been having lots of fun testing my Express APIs, and I just wanted to show-off how fun and simple it can be. Hope you enjoy this as much as I enjoyed writing it!",
     *                   "categoryId": "578f2c9535102e0c5d5c3ce1",
     *                   "relatedFiles": [],
     *                   "urlSlog": "testing-express-apis-with-supertest",
     *                   "blogTitle": "Testing Express APIs with Supertest",
     *                   "addedOn": "2016-07-20T09:39:16.797Z",
     *                   "articleViews": 0,
     *                   "allowComment": false,
     *                   "active": false,
     *                   "status": "active",
     *                   "tags": [
     *                       {
     *                           "tag": "tdd",
     *                           "urlSlogTag": "tdd",
     *                           "postCount": 2
     *                       },
     *                       {
     *                           "tag": "node.js",
     *                           "urlSlogTag": "node-js",
     *                           "postCount": 2
     *                       }
     *                   ]
     *               }
     *           ],
     *           "totalItems": 1,
     *           "currentPage": 1
     *       }
     *
     *
     * @apiError  (NotFound) {String} message  Blog article not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "Blog article not found"
     *     }
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

        .get( getAllBlogs )

        /**
         * @api {post} /api/blog/ Post Blog article data
         * @apiPermission admin
         * @apiName postBlogArticle
         * @apiGroup Blog
         *
         * @apiParam {String} blogTitle   Mandatory  title of the blog article.
         * @apiParam {String} blogDescription    Mandatory   blog article in detailed description.
         * @apiParam {String} author    Mandatory  author of the blog article
         *
         *
         * @apiDescription Post blog article data to the database
         * @apiVersion 0.0.1
         * @apiHeader (AuthorizationHeader) {String} authorization x-access-token value.
         * @apiHeaderExample {json} Header-Example:
         *{
         *  "x-access-token": "yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c"
         * }
         *
         * @apiExample {curl} Example usage:
         *
         *
         * curl \
         * -v \
         * -X POST  \
         * http://localhost:3000/api/blog/ \
         * -H "Content-Type: multipart/form-data"  \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2OTAxMDIzMiwiZXhwIjoxNDY5MDMwMjMyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.TgLoUDq3nO5PHILZC0viEcsbaVzQkz9aVpYEcL8wqZW11FDcr65_ISzTEYLAW5B3y5uK6gZXo7vaPF_FZz4NEg" \
         * -F imageName=@public/images/404_banner.png  \
         * -F "data={\"blogTitle\": \"Unit test your Nodejs RESTful API using mocha\",\"blogDescription\": \"Its always a good idea to have some quick and simple automated tests in place for your REST api so that you know that you didnt break anything that already worked when you add more functionality.  tests is not that hard in The Only Real Dev Language. You just gotta know the right libraries to use and how they work together.\",\"blogSummary\": \"Its always a good idea to have some quick and  tests in place for your REST api so that you know that you didnt break that already worked when you add more .\",\"tags\": \"javascript,node.js,mocha,sinon\",\"status\": \"active\",\"author\": \"tutorialhorizon.com\",\"active\": \"true\",\"categoryId\": \"578f32bca4d436d76bc751cf\"};type=application/json"
         *
         *
         * @apiSuccess {String} message Blog article saved successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "Blog article saved successfully"
         *       }
         *
         * @apiError (UnAuthorizedError) {String} message authentication token was not supplied
         * @apiError (UnAuthorizedError) {Boolean} isToken to check if token is supplied or not , if token is supplied , returns true else returns false
         * @apiError (UnAuthorizedError) {Boolean} success true if jwt token verifies
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 401 Unauthorized
         *     {
         *       "isToken": true,
         *        "success": false,
         *        "message": "Authentication failed"
         *     }
         *
         *
         * @apiError  (UnAuthorizedError_1) {String} message  You are not authorized to access this api route.
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 401 Unauthorized
         *     {
         *       "message": "You are not authorized to access this api route."
         *     }
         *
         * @apiError  (UnAuthorizedError_2) {String} message  You are not authorized to perform this action.
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 401 Unauthorized
         *     {
         *       "message": "You are not authorized to perform this action"
         *     }
         *
         *
         *
         * @apiError  (BadRequest) {String[]} message validation errors due to not entering values for blog title, description, and article author
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *
         *     {
         *       "message":[
         *                      {"param":"blogTitle","msg":"Title for blog article is required"},
         *                      {"param":"blogDescription","msg":"Blog description is required"},
         *                      {"param":"author","msg":"Blog author is required"}
         *                 ]
         *     }
         *
         *
         *
         * @apiError  (AlreadyExists)  {String} message  Blog with same title already exists
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 409 Conflict
         *     {
         *       "message": "Blog with same title already exists"
         *     }
         *
         *
         *
         * @apiError (InternalServerError)  {String} message  Internal Server Error
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 500 Internal Server Error
         *     {
         *       "message": "Internal Server Error"
         *     }
         *
         */

        .post(tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, uploader.single('imageName'), fileUploadHelper.imageUpload, blogController.postBlogArticle );



    //middleware function that will get the blog article object for each of the routes defined downwards starting with /api/blog
    blogRouter.use('/blog/:blogId', function (req, res, next) {
        blogController.getBlogByID(req)
            .then(function(blogInfo){
                //saving in request object so that it can be used for other operations like updating data using put and patch method
                if (blogInfo) {
                    req.blogInfo = blogInfo;
                    next();
                    return null;// return a non-undefined value to signal that we didn't forget to return promise
                } else {
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.blog.notFoundBlogArticle
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    });

    blogRouter.route('/blog/:blogId')

    /**
     * @api {get} /api/blog/:blogId Get blog article information object by ID
     * @apiPermission public
     * @apiName getBlogByID
     * @apiGroup Blog
     *
     *
     * @apiParam {String} blogId  object id of the blog article data
     *
     *   @apiParamExample {json} Request-Example:
     *     {
     *       "blogId": "578f46c4774c15521907c399"
     *     }
     *
     * @apiDescription Retrieves the blog article object information by Id, if exists, else return empty object
     * @apiVersion 0.0.1
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/blog/578f46c4774c15521907c399"
     *
     *
     *
     * @apiSuccess {String} _id  object id of blog article data.
     * @apiSuccess {String} blogTitle  title of the blog article.
     * @apiSuccess {String} urlSlog clean URL of the blog article title.
     * @apiSuccess {String} categoryId   object id of the related blog category.
     * @apiSuccess {String} blogSummary  brief description about the blog article.
     * @apiSuccess {String} blogDescription  blog article in detailed description.
     * @apiSuccess {String} author author of the blog article.
     * @apiSuccess {Date} addedOn  system date of blog article addition.
     * @apiSuccess {String} bannerImage  name of the image file.
     * @apiSuccess {String} bannerImageTitle  title description of blog article image.
     * @apiSuccess {String} bannerImageAltText  alternative text for blog article image .
     * @apiSuccess {String} imageProperties  meta-data info of image file.
     * @apiSuccess {String} imageProperties.imageExtension  extension of image file .
     * @apiSuccess {String} imageProperties.imagePath  path of image file.
     * @apiSuccess {Int} articleViews no of times blog article is viewed.
     * @apiSuccess {Boolean} active  active bit status     *
     * @apiSuccess {Array} relatedFiles list of documents related to the blog.
     * @apiSuccess {Boolean} allowComment  whether to allow the comments in this blog article.
     * @apiSuccess {String} status  whether the blog article is still relevant or outdated.
     * @apiSuccess {Object} seoEntry  object containing blog article seo meta tags.
     * @apiSuccess {String} seoEntry.metaKeyword  meta keyword for the blog article.
     * @apiSuccess {String} seoEntry.titleTag  meta title tag for the blog article .
     * @apiSuccess {String} seoEntry.metaDescription meta description of the blog article.
     * @apiSuccess {String} seoEntry.metaAuthor  meta author of the blog artcle .
     * @apiSuccess {Boolean} seoEntry.valueChanged whether the meta tags are updated or not.
     * @apiSuccess {Array} tags  tags related to the blog article.
     * @apiSuccess {String} tags.tag  tag related to the blog article.
     * @apiSuccess {String} tags.urlSlogTag  clean URL of the tag .
     * @apiSuccess {String} tags.postCount no of blog posts related to the tag.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *           "_id": "578f46c4774c15521907c399",
     *           "author": "codementor.io",
     *           "bannerImageAltText": "very good article",
     *           "bannerImageTitle": "very good tutorial codementor",
     *           "bannerImage": "blog-1469007556727.webp",
     *           "seoEntry": {
     *               "metaAuthor": "codementor.io",
     *               "metaDescription": "Hello, I'm Ilya, a full-stack developer who uses Node.js on the server and Ember.js on the client. Lately I've been having lots of fun testing my Express APIs,",
     *               "titleTag": "Testing Express APIs with Supertest",
     *               "metaKeyword": "tdd,node.js,javascript,mocha,sinon",
     *               "valueChanged": false
     *           },
     *           "blogDescription": "<p>Hello, I'm Ilya, a full-stack developer who uses Node.js on the server and Ember.js on the client. Lately I've been having lots of fun testing my Express APIs, and I just wanted to show-off how fun and simple it can be. Hope you enjoy this as much as I enjoyed writing it!</p>",
     *           "blogSummary": "Hello, I'm Ilya, a full-stack developer who uses Node.js on the server and Ember.js on the client. Lately I've been having lots of fun testing my Express APIs, and I just wanted to show-off how fun and simple it can be. Hope you enjoy this as much as I enjoyed writing it!",
     *           "categoryId": "578f2c9535102e0c5d5c3ce1",
     *           "urlSlog": "testing-express-apis-with-supertest",
     *           "blogTitle": "Testing Express APIs with Supertest",
     *           "addedOn": "2016-07-20T09:39:16.797Z",
     *           "relatedFiles": [],
     *           "articleViews": 0,
     *           "allowComment": false,
     *           "active": false,
     *           "status": "active",
     *           "imageProperties": {
     *               "imageExtension": "jpg",
     *               "imagePath": "public/uploads/images/blogs/blog-1469007556727.jpg"
     *           },
     *           "tags": [
     *               {
     *                   "tag": "tdd",
     *                   "urlSlogTag": "tdd",
     *                   "postCount": 2
     *               },
     *               {
     *                   "tag": "node.js",
     *                   "urlSlogTag": "node-js",
     *                   "postCount": 2
     *               }
     *           ]
     *       }
     *
     *
     * @apiError  (NotFound) {String} message  Blog article not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "Blog article not found"
     *     }
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

        .get(function (req, res) {
            res.status(HTTPStatus.OK);
            res.json(req.blogInfo);
        })

        /**
         * @api {patch} /api/blog/:blogId Deletes existing Blog article data
         * @apiPermission admin
         * @apiName deleteBlog
         * @apiGroup Blog
         *
         * @apiParam {String} blogId  object id of the blog article data
         *
         *   @apiParamExample {json} Request-Example:
         *     {
         *       "blogId": "578f5379ed3f76f0340c4959"
         *     }
         *
         *
         * @apiDescription Deletes existing blog article data from the database
         * @apiVersion 0.0.1
         * @apiHeader (AuthorizationHeader) {String} authorization x-access-token value.
         * @apiHeaderExample {json} Header-Example:
         *{
         *  "x-access-token": "yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c"
         * }
         *
         * @apiExample {curl} Example usage:
         *
         *
         * curl \
         * -v \
         * -X PATCH  \
         * http://localhost:3000/api/blog/578f5379ed3f76f0340c4959 \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2OTAxMDIzMiwiZXhwIjoxNDY5MDMwMjMyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.TgLoUDq3nO5PHILZC0viEcsbaVzQkz9aVpYEcL8wqZW11FDcr65_ISzTEYLAW5B3y5uK6gZXo7vaPF_FZz4NEg"
         *
         *
         * @apiSuccess {String} message Blog deleted successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "Blog deleted successfully"
         *       }
         *
         * @apiError (UnAuthorizedError) {String} message authentication token was not supplied
         * @apiError (UnAuthorizedError) {Boolean} isToken to check if token is supplied or not , if token is supplied , returns true else returns false
         * @apiError (UnAuthorizedError) {Boolean} success true if jwt token verifies
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 401 Unauthorized
         *     {
         *       "isToken": true,
         *        "success": false,
         *        "message": "Authentication failed"
         *     }
         *
         *
         * @apiError  (UnAuthorizedError_1) {String} message  You are not authorized to access this api route.
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 401 Unauthorized
         *     {
         *       "message": "You are not authorized to access this api route."
         *     }
         *
         * @apiError  (UnAuthorizedError_2) {String} message  You are not authorized to perform this action.
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 401 Unauthorized
         *     {
         *       "message": "You are not authorized to perform this action"
         *     }
         *
         *
         * @apiError (InternalServerError)  {String} message  Internal Server Error
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 500 Internal Server Error
         *     {
         *       "message": "Internal Server Error"
         *     }
         *
         */


        .patch(tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, blogController.deleteBlog)

        /**
         * @api {put} /api/blog/:blogId Updates existing Blog article data
         * @apiPermission admin
         * @apiName updateBlog
         * @apiGroup Blog
         *
         * @apiParam {String} blogId  object id of the blog article data
         *
         *   @apiParamExample {json} Request-Example:
         *     {
         *       "blogId": "578f5379ed3f76f0340c4959"
         *     }
         *
         *
         * @apiDescription Updates existing blog article data to the database
         * @apiVersion 0.0.1
         * @apiHeader (AuthorizationHeader) {String} authorization x-access-token value.
         * @apiHeaderExample {json} Header-Example:
         *{
         *  "x-access-token": "yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c"
         * }
         *
         * @apiExample {curl} Example usage:
         *
         *
         * curl \
         * -v \
         * -X PUT  \
         * http://localhost:3000/api/blog/578f5379ed3f76f0340c4959 \
         * -H "Content-Type: multipart/form-data"  \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2OTAxMDIzMiwiZXhwIjoxNDY5MDMwMjMyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.TgLoUDq3nO5PHILZC0viEcsbaVzQkz9aVpYEcL8wqZW11FDcr65_ISzTEYLAW5B3y5uK6gZXo7vaPF_FZz4NEg" \
         * -F imageName=@public/images/404_banner.png  \
         * -F "data={\"blogTitle\": \"Unit test your Nodejs RESTful API using mocha-node.js\",\"blogDescription\": \"Its always a good idea to have some quick and simple automated tests in place for your REST api so that you know that you didnt break anything that already worked when you add more .  tests is not that hard in The Only Real Dev Language. You just gotta know the right libraries to use and how they work together.\",\"blogSummary\": \"Its always a good idea to have some quick and  tests in place for your REST api so that you know that you didnt break that already worked when you add more .\",\"tags\": \"javascript,node.js\",\"status\": \"active\",\"author\": \"www.tutorialhorizon.com\",\"active\": \"true\",\"categoryId\": \"578f32bca4d436d76bc751cf\"};type=application/json"
         *
         *
         * @apiSuccess {String} message Blog updated successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "Blog updated successfully"
         *       }
         *
         * @apiError (UnAuthorizedError) {String} message authentication token was not supplied
         * @apiError (UnAuthorizedError) {Boolean} isToken to check if token is supplied or not , if token is supplied , returns true else returns false
         * @apiError (UnAuthorizedError) {Boolean} success true if jwt token verifies
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 401 Unauthorized
         *     {
         *       "isToken": true,
         *        "success": false,
         *        "message": "Authentication failed"
         *     }
         *
         *
         * @apiError  (UnAuthorizedError_1) {String} message  You are not authorized to access this api route.
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 401 Unauthorized
         *     {
         *       "message": "You are not authorized to access this api route."
         *     }
         *
         * @apiError  (UnAuthorizedError_2) {String} message  You are not authorized to perform this action.
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 401 Unauthorized
         *     {
         *       "message": "You are not authorized to perform this action"
         *     }
         *
         *
         *
         * @apiError  (BadRequest) {String[]} message validation errors due to not entering values for blog title, description, and article author
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *
         *     {
         *       "message":[
         *                      {"param":"blogTitle","msg":"Title for blog article is required"},
         *                      {"param":"blogDescription","msg":"Blog description is required"},
         *                      {"param":"author","msg":"Blog author is required"}
         *                 ]
         *     }
         *
         *
         *
         * @apiError  (AlreadyExists)  {String} message  Blog with same title already exists
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 409 Conflict
         *     {
         *       "message": "Blog with same title already exists"
         *     }
         *
         *
         *
         * @apiError (InternalServerError)  {String} message  Internal Server Error
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 500 Internal Server Error
         *     {
         *       "message": "Internal Server Error"
         *     }
         *
         */

        .put(tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, uploader.single('imageName'), fileUploadHelper.imageUpload, blogController.updateBlog);


    blogRouter.route('/blogtag/')

    /**
     * @api {get} /api/blogtag/ Get Blog related tag data list
     * @apiPermission public
     * @apiName getAllBlogTags
     * @apiGroup Blog
     *
     * @apiDescription Retrieves the blog tag list, if exists, else return empty array
     * @apiVersion 0.0.1
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/blogtag"
     *
     *
     * @apiSuccess {String} _id  object id of blog tag data.
     * @apiSuccess {String} tag  tag related to the blog article.
     * @apiSuccess {String} urlSlogTag  clean URL of the tag .
     * @apiSuccess {String} postCount no of blog posts related to the tag.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     [
     *            {
     *                "_id": "578f46038c6c44511904cef0",
     *                "tag": "javascript",
     *                "urlSlogTag": "javascript",
     *                "postCount": 2
     *            },
     *            {
     *                "_id": "578f46038c6c44511904cef1",
     *                "tag": "tdd",
     *                "urlSlogTag": "tdd",
     *                "postCount": 2
     *            },
     *            {
     *                "_id": "578f46038c6c44511904cef2",
     *                "tag": "node.js",
     *                "urlSlogTag": "node-js",
     *                "postCount": 2
     *            }
     *       ]
     *
     *
     * @apiError  (NotFound) {String} message  Blog Tag not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "Blog Tag not found"
     *     }
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

        .get( getAllBlogTags );



    //middleware function that will get the blog seo meta information object for each of the routes defined downwards starting with /api/blogseo/:metaTagId
    blogRouter.use('/blogseo/:metaTagId', function (req, res, next) {
        blogController.getBlogAssociatedSeoMetaTag (req)
            .then(function(blogSeoMetaTagObj) {
                //saving in request object so that it can be used for other operations like updating data using put and patch method
                if(blogSeoMetaTagObj){
                    req.blogSeoMetaInfo = blogSeoMetaTagObj;
                    next();
                    return null;// return a non-undefined value to signal that we didn't forget to return promise

                }else{
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.blog.notFoundSeoTag
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    });


    blogRouter.route('/blogseo/:metaTagId')

    /**
     * @api {get} /api/blogseo/:metaTagId   Get SEO meta tags for blog article.
     * @apiPermission public
     * @apiName getBlogAssociatedSeoMetaTag
     * @apiGroup Blog
     *
     * @apiParam {String} metaTagId  object id of the blog SEO meta tag data
     *
     *   @apiParamExample {json} Request-Example:
     *     {
     *       "metaTagId": "578f46c4774c15521907c398"
     *     }
     *
     *
     * @apiDescription Retrieves the SEO meta tag information of a blog article to boost search engine optimization
     * @apiVersion 0.0.1
     *
     *
     * @apiExample {curl} Example usage:
     *
     *
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/blogseo/578f46c4774c15521907c398"
     *
     *
     * @apiSuccess {String} _id  object id of blog seo meta tag information data.
     * @apiSuccess {String} metaKeyword  meta keyword for the blog article.
     * @apiSuccess {String} titleTag  meta title tag for the blog article .
     * @apiSuccess {String} metaDescription meta description of the blog article.
     * @apiSuccess {String} metaAuthor  meta author of the blog article .
     * @apiSuccess {Boolean} valueChanged whether the meta tags are updated or not.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *           "_id": "578f46c4774c15521907c398",
     *           "metaAuthor": "codementor.io",
     *           "metaDescription": "Hello, I'm Ilya, a full-stack developer who uses Node.js on the server and Ember.js on the client. Lately I've been having lots of fun testing my Express APIs,",
     *           "titleTag": "Testing Express APIs with Supertest",
     *           "metaKeyword": "tdd,node.js,javascript,mocha,sinon",
     *           "valueChanged": false
     *       }
     *
     *
     * @apiError  (NotFound) {String} message Blog SEO Meta Tag not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "Blog SEO Meta Tag not found"
     *     }
     *
     *
     * @apiError (InternalServerError)  {String} message  Internal Server Error
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *       "message": "Internal Server Error"
     *     }
     *
     */

        .get( function (req, res) {
            res.status(HTTPStatus.OK);
            res.json(req.blogSeoMetaInfo);
        })

        /**
         * @api {put} /api/blogseo/:metaTagId   Updates the existing blog article SEO meta information
         * @apiPermission admin
         * @apiName updateBlogSeoMetaTag
         * @apiGroup Blog
         *
         *
         * @apiParam {String} metaTagId  object id of the blog SEO meta tag data
         *
         *   @apiParamExample {json} Request-Example:
         *     {
         *       "metaTagId": "578f46c4774c15521907c398"
         *     }
         *
         *
         * @apiDescription Updates the existing blog article SEO meta tags information to boost search engine optimization
         * @apiVersion 0.0.1
         * @apiHeader (AuthorizationHeader) {String} authorization x-access-token value.
         * @apiHeaderExample {json} Header-Example:
         *{
         *  "x-access-token": "yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c"
         * }
         *
         * @apiExample {curl} Example usage:
         *
         *
         * curl \
         * -v \
         * -X PUT  \
         * http://localhost:3000/api/blogseo/578f46c4774c15521907c398 \
         * -H 'Content-Type: application/json' \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2OTA4MDUzNSwiZXhwIjoxNDY5MTAwNTM1LCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.Kp1MQx3iwdZLvGG8hzcGOReKG3B9FBkIbjrF9OVNq5eYmAeRebUxH436ReznfiPNnAsNAE8qQ2U5ksQSDTWRrg" \
         * -d '{"metaAuthor": "www.codementor.io","titleTag": "Testing Express APIs with Supertest to do integration testing","metaKeyword": "tdd,node.js,javascript,mocha,sinon,codementor", "metaDescription": "Hello, I am Ilya, a full-stack developer who uses Node.js on the server and Ember.js on the client. Lately I ve been having lots of fun testing my Express APIs, haha updated the content finally"}'
         *
         *
         * @apiSuccess {String} message Blog SEO meta tag updated successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "Blog SEO meta tag updated successfully"
         *       }
         *
         * @apiError (UnAuthorizedError) {String} message authentication token was not supplied
         * @apiError (UnAuthorizedError) {Boolean} isToken to check if token is supplied or not , if token is supplied , returns true else returns false
         * @apiError (UnAuthorizedError) {Boolean} success true if jwt token verifies
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 401 Unauthorized
         *     {
         *       "isToken": true,
         *        "success": false,
         *        "message": "Authentication failed"
         *     }
         *
         * @apiError  (UnAuthorizedError_1) {String} message  You are not authorized to access this api route.
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 401 Unauthorized
         *     {
         *       "message": "You are not authorized to access this api route."
         *     }
         *
         * @apiError  (UnAuthorizedError_2) {String} message  You are not authorized to perform this action.
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 401 Unauthorized
         *     {
         *       "message": "You are not authorized to perform this action"
         *     }
         *
         *
         *
         * @apiError (InternalServerError)  {String} message  Internal Server Error
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 500 Internal Server Error
         *     {
         *       "message": "Internal Server Error"
         *     }
         *
         */


        .put(tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize,  blogController.updateBlogSeoMetaTag);



    blogRouter.route('/blogdocument/:blogId')

    /**
     * @api {get} /api/blogdocument/:blogId   Get document file informations of the particular blog article
     * @apiPermission public
     * @apiName getAllRelatedBlogDocuments
     * @apiGroup Blog
     *
     * @apiParam {String} blogId  object id of the blog article data
     *
     *   @apiParamExample {json} Request-Example:
     *     {
     *       "blogId": "578f46c4774c15521907c399"
     *     }
     *
     *
     * @apiDescription Retrieves all the related blog document file information belonging to the particular blog article
     * @apiVersion 0.0.1
     *
     *
     * @apiExample {curl} Example usage:
     *
     *
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/blogdocument/578f46c4774c15521907c399"
     *
     *
     * @apiExample {curl} Example usage:
     *
     *
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/blogdocument/578f46c4774c15521907c399" \
     * --data-urlencode "active=true"
     *
     *
     * @apiSuccess {String} _id  object id of blog document data.
     * @apiSuccess {String} documentName  name of the document file.
     * @apiSuccess {String} documentTitle  title of the document file .
     * @apiSuccess {Boolean} active no active bit status.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     [
     *        {
     *            "documentTitle": "mongo security pdf  very good ebook haha",
     *            "documentName": "blog-1469061436173.pdf",
     *            "_id": "578fbe3c29d4b80333a535df",
     *            "active": true
     *        },
     *        {
     *            "documentTitle": "node.js tech article pdf document",
     *            "documentName": "blog-1469037398996.pdf",
     *            "_id": "578fbb57b35eab042d933394",
     *            "active": true
     *        }
     *        ]
     *
     *
     *
     * @apiError  (NotFound) {String} message  Blog document not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "Blog document not found"
     *     }
     *
     *
     * @apiError (InternalServerError)  {String} message  Internal Server Error
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *       "message": "Internal Server Error"
     *     }
     *
     */

        .get( getAllRelatedBlogDocuments )

        /**
         * @api {post} /api/blogdocument/:blogId   Saves related blog documents to the particular blog article data
         * @apiPermission admin
         * @apiName postBlogRelatedDocument
         * @apiGroup Blog
         *
         * @apiParam {String} blogId  object id of the blog article data
         *
         *   @apiParamExample {json} Request-Example:
         *     {
         *       "blogId": "578f46c4774c15521907c399"
         *     }
         *
         *
         * @apiDescription Saves related blog documents to the blog article data as subdocuments in  the database
         * @apiVersion 0.0.1
         * @apiHeader (AuthorizationHeader) {String} authorization x-access-token value.
         * @apiHeaderExample {json} Header-Example:
         *{
         *  "x-access-token": "yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c"
         * }
         *
         * @apiExample {curl} Example usage:
         *
         *
         * curl \
         * -v \
         * -X POST  \
         * http://localhost:3000/api/blogdocument/578f46c4774c15521907c399 \
         * -H "Content-Type: multipart/form-data"  \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2OTAzNzc5MSwiZXhwIjoxNDY5MDU3NzkxLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.Q7LMaqZ4eBA0-v2RsMjMCgF6mwJ-fhkZiEZrlDTs0TQT0ymK2vs9PH2UvYRMPPP-HOVJhoekJpix1ZTEslJuiQ" \
         * -F documentName=@public/uploads/documents/blogs/blog-1469037398996.pdf  \
         * -F "data={\"documentTitle\": \"mongo security pdf\"};type=application/json"
         *
         * @apiSuccess {String} message Blog document saved successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "Blog document saved successfully"
         *       }
         *
         * @apiError (UnAuthorizedError) {String} message authentication token was not supplied
         * @apiError (UnAuthorizedError) {Boolean} isToken to check if token is supplied or not , if token is supplied , returns true else returns false
         * @apiError (UnAuthorizedError) {Boolean} success true if jwt token verifies
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 401 Unauthorized
         *     {
         *       "isToken": true,
         *        "success": false,
         *        "message": "Authentication failed"
         *     }
         *
         *
         * @apiError  (UnAuthorizedError_1) {String} message  You are not authorized to access this api route.
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 401 Unauthorized
         *     {
         *       "message": "You are not authorized to access this api route."
         *     }
         *
         * @apiError  (UnAuthorizedError_2) {String} message  You are not authorized to perform this action.
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 401 Unauthorized
         *     {
         *       "message": "You are not authorized to perform this action"
         *     }
         *
         *
         *
         * @apiError  (BadRequest) {String} message  Please upload document file
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *
         *     {
         *       "message":"Please upload document file"
         *     }
         *
         *
         * @apiError  (BadRequest) {String} message title for document file is required
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *
         *     {
         *       "message":"Document title is required"
         *     }
         *
         * @apiError (InternalServerError)  {String} message  Internal Server Error
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 500 Internal Server Error
         *     {
         *       "message": "Internal Server Error"
         *     }
         *
         */

        .post(tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, documentUploader.single('documentName'), blogController.postBlogRelatedDocument );



    //middleware function that will get the blog document object for each of the routes defined downwards starting with /api/blogdocument/:blogId/:documentId
    blogRouter.use('/blogdocument/:blogId/:documentId', function (req, res, next) {
        blogController.getBlogDocumentInfoByBlogID(req)
            .then(function(blogDocInfo){
                //saving in request object so that it can be used for other operations like updating data using put and patch method
                if (blogDocInfo) {
                    req.blogDocumentInfo = blogDocInfo;
                    next();
                    return null;// return a non-undefined value to signal that we didn't forget to return promise
                } else {
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.blog.notFoundDoc
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    });

    blogRouter.route('/blogdocument/:blogId/:documentId')

    /**
     * @api {get} /api/blogdocument/:blogId/:documentId   Get document file information object by ID
     * @apiPermission public
     * @apiName getBlogDocumentInfoByBlogID
     * @apiGroup Blog
     *
     * @apiParam {String} blogId  object id of the blog article data
     * @apiParam {String} documentId  object id of the blog document file data
     *
     *   @apiParamExample {json} Request-Example:
     *     {
     *       "blogId": "578f46c4774c15521907c399",
     *       "documentId": "578fbe3c29d4b80333a535df"
     *     }
     *
     *
     * @apiDescription Retrieves the document file information object of a particular document file using document id as filter param
     * @apiVersion 0.0.1
     *
     *
     * @apiExample {curl} Example usage:
     *
     *
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/blogdocument/578f46c4774c15521907c399/578fbe3c29d4b80333a535df"
     *
     *
     * @apiSuccess {String} _id  object id of blog document data.
     * @apiSuccess {String} documentName  name of the document file.
     * @apiSuccess {String} documentTitle  title of the document file .
     * @apiSuccess {Boolean} active no active bit status.
     * @apiSuccess {String} docProperties  meta-data info of document file.
     * @apiSuccess {String} docProperties.documentMimeType  mime-type of document file .
     * @apiSuccess {String} docProperties.docPath  path of document file.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *           "documentTitle": "mongo security pdf",
     *           "documentName": "blog-1469038140358.pdf",
     *           "_id": "578fbe3c29d4b80333a535df",
     *           "active": true,
     *           "docProperties": {
     *               "documentMimeType": "application/octet-stream",
     *               "docPath": "public/uploads/documents/blogs/blog-1469038140358.pdf"
     *           }
     *       }
     *
     *
     *
     * @apiError  (NotFound) {String} message  Blog document not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "Blog document not found"
     *     }
     *
     *
     * @apiError (InternalServerError)  {String} message  Internal Server Error
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *       "message": "Internal Server Error"
     *     }
     *
     */

        .get(function (req, res) {
            res.status(HTTPStatus.OK);
            res.json(req.blogDocumentInfo);
        })


        /**
         * @api {patch} /api/blogdocument/:blogId/:documentId   Deletes existing blog document information object
         * @apiPermission admin
         * @apiName deleteBlogDocumentInfo
         * @apiGroup Blog
         *
         * @apiParam {String} blogId  object id of the blog article data
         * @apiParam {String} documentId  object id of the blog document file data
         *
         *   @apiParamExample {json} Request-Example:
         *     {
         *       "blogId": "578f46c4774c15521907c399",
         *       "documentId": "578fbe3c29d4b80333a535df"
         *     }
         *
         *
         * @apiDescription  Deletes existing blog document information of the particular blog article data
         * @apiVersion 0.0.1
         * @apiHeader (AuthorizationHeader) {String} authorization x-access-token value.
         * @apiHeaderExample {json} Header-Example:
         *{
         *  "x-access-token": "yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c"
         * }
         *
         * @apiExample {curl} Example usage:
         *
         *
         * curl \
         * -v \
         * -X PATCH  \
         * http://localhost:3000/api/blogdocument/578f46c4774c15521907c399/578fbe3c29d4b80333a535df \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2OTAzNzc5MSwiZXhwIjoxNDY5MDU3NzkxLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.Q7LMaqZ4eBA0-v2RsMjMCgF6mwJ-fhkZiEZrlDTs0TQT0ymK2vs9PH2UvYRMPPP-HOVJhoekJpix1ZTEslJuiQ"
         *
         *
         *
         * @apiSuccess {String} message Blog document deleted successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "Blog document deleted successfully"
         *       }
         *
         * @apiError (UnAuthorizedError) {String} message authentication token was not supplied
         * @apiError (UnAuthorizedError) {Boolean} isToken to check if token is supplied or not , if token is supplied , returns true else returns false
         * @apiError (UnAuthorizedError) {Boolean} success true if jwt token verifies
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 401 Unauthorized
         *     {
         *       "isToken": true,
         *        "success": false,
         *        "message": "Authentication failed"
         *     }
         *
         * @apiError  (UnAuthorizedError_1) {String} message  You are not authorized to access this api route.
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 401 Unauthorized
         *     {
         *       "message": "You are not authorized to access this api route."
         *     }
         *
         * @apiError  (UnAuthorizedError_2) {String} message  You are not authorized to perform this action.
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 401 Unauthorized
         *     {
         *       "message": "You are not authorized to perform this action"
         *     }
         *
         *
         * @apiError (InternalServerError)  {String} message  Internal Server Error
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 500 Internal Server Error
         *     {
         *       "message": "Internal Server Error"
         *     }
         *
         */

        .patch(tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, blogController.deleteBlogDocumentInfo)

        /**
         * @api {put} /api/blogdocument/:blogId/:documentId   Updates existing blog document information object
         * @apiPermission admin
         * @apiName updateBlogDocumentInfo
         * @apiGroup Blog
         *
         * @apiParam {String} blogId  object id of the blog article data
         * @apiParam {String} documentId  object id of the blog document file data
         *
         *   @apiParamExample {json} Request-Example:
         *     {
     *       "blogId": "578f46c4774c15521907c399",
     *       "documentId": "578fbe3c29d4b80333a535df"
         *     }
         *
         *
         * @apiDescription  Updates existing blog document information of the particular blog article data
         * @apiVersion 0.0.1
         * @apiHeader (AuthorizationHeader) {String} authorization x-access-token value.
         * @apiHeaderExample {json} Header-Example:
         *{
         *  "x-access-token": "yJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c"
         * }
         *
         * @apiExample {curl} Example usage:
         *
         *
         * curl \
         * -v \
         * -X PUT  \
         * http://localhost:3000/api/blogdocument/578f46c4774c15521907c399/578fbe3c29d4b80333a535df \
         * -H "Content-Type: multipart/form-data"  \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2OTAzNzc5MSwiZXhwIjoxNDY5MDU3NzkxLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.Q7LMaqZ4eBA0-v2RsMjMCgF6mwJ-fhkZiEZrlDTs0TQT0ymK2vs9PH2UvYRMPPP-HOVJhoekJpix1ZTEslJuiQ" \
         * -F documentName=@public/uploads/documents/blogs/blog-1469037398996.pdf  \
         * -F "data={\"documentTitle\": \"mongo security pdf very good ebook\"};type=application/json"
         *
         * @apiSuccess {String} message Blog document updated successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "Blog document updated successfully"
         *       }
         *
         * @apiError (UnAuthorizedError) {String} message authentication token was not supplied
         * @apiError (UnAuthorizedError) {Boolean} isToken to check if token is supplied or not , if token is supplied , returns true else returns false
         * @apiError (UnAuthorizedError) {Boolean} success true if jwt token verifies
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 401 Unauthorized
         *     {
         *       "isToken": true,
         *        "success": false,
         *        "message": "Authentication failed"
         *     }
         *
         * @apiError  (UnAuthorizedError_1) {String} message  You are not authorized to access this api route.
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 401 Unauthorized
         *     {
         *       "message": "You are not authorized to access this api route."
         *     }
         *
         * @apiError  (UnAuthorizedError_2) {String} message  You are not authorized to perform this action.
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 401 Unauthorized
         *     {
         *       "message": "You are not authorized to perform this action"
         *     }
         *
         *
         *
         *
         * @apiError  (BadRequest) {String} message  Please upload document file
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *
         *     {
         *       "message":"Please upload document file"
         *     }
         *
         *
         * @apiError  (BadRequest) {String} message title for document file is required
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *
         *     {
         *       "message":"Document title is required"
         *     }
         *
         * @apiError (InternalServerError)  {String} message  Internal Server Error
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 500 Internal Server Error
         *     {
         *       "message": "Internal Server Error"
         *     }
         *
         */

        .put(tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, documentUploader.single('documentName'),  blogController.updateBlogDocumentInfo);



    blogRouter.route('/filter/blogtag/:blogTag')

    /**
     * @api {get} /api/filter/blogtag/:blogTag Get blog article list by tag name
     * @apiPermission public
     * @apiName getBlogByTag
     * @apiGroup Blog
     *
     * @apiParam {Int} perpage Number of data to return on each request
     * @apiParam {Int} page Current page number of pagination system.
     * @apiParam {String} blogTag to filter blog article list using blog tag name as filter param
     *
     *
     *   @apiParamExample {json} Request-Example:
     *     {
     *       "perpage": 10,
     *       "page": 1,
     *       "blogTag": "mocha"
     *     }
     *
     *
     * @apiDescription Retrieves the blog list related to tag name, if exists, else return empty array
     * @apiVersion 0.0.1
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/filter/blogtag/mocha" \
     * --data-urlencode "perpage=10" \
     * --data-urlencode "page=1"
     *
     *
     *
     * @apiSuccess {Array} dataList list of blog articles
     * @apiSuccess {String} dataList._id  object id of blog article data.
     * @apiSuccess {String} dataList.blogTitle  title of the blog article.
     * @apiSuccess {String} dataList.urlSlog clean URL of the blog article title.
     * @apiSuccess {String} dataList.categoryId   object id of the related blog category.
     * @apiSuccess {Array} dataList.relatedFiles list of documents related to the blog.
     * @apiSuccess {String} dataList.blogSummary  brief description about the blog article.
     * @apiSuccess {String} dataList.blogDescription  blog article in detailed description.
     * @apiSuccess {String} dataList.author author of the blog article.
     * @apiSuccess {Date} dataList.addedOn  system date of blog article addition.
     * @apiSuccess {String} dataList.bannerImage  name of the image file.
     * @apiSuccess {String} dataList.bannerImageTitle  title description of blog article image.
     * @apiSuccess {String} dataList.bannerImageAltText  alternative text for blog article image .
     * @apiSuccess {Int} dataList.articleViews no of times blog article is viewed.
     * @apiSuccess {Boolean} dataList.active  active bit status.
     * @apiSuccess {Boolean} dataList.allowComment  whether to allow the comments in this blog article.
     * @apiSuccess {String} dataList.status  whether the blog article is still relevant or outdated.
     * @apiSuccess {Object} dataList.seoEntry  object containing blog article seo meta tags.
     * @apiSuccess {String} dataList.seoEntry.metaKeyword  meta keyword for the blog article.
     * @apiSuccess {String} dataList.seoEntry.titleTag  meta title tag for the blog article .
     * @apiSuccess {String} dataList.seoEntry.metaDescription meta description of the blog article.
     * @apiSuccess {String} dataList.seoEntry.metaAuthor  meta author of the blog artcle .
     * @apiSuccess {Boolean} dataList.seoEntry.valueChanged whether the meta tags are updated or not.
     * @apiSuccess {Array} dataList.tags  tags related to the blog article.
     * @apiSuccess {String} dataList.tags.tag  tag related to the blog article.
     * @apiSuccess {String} dataList.tags.urlSlogTag  clean URL of the tag .
     * @apiSuccess {String} dataList.tags.postCount no of blog posts related to the tag.
     *
     * @apiSuccess {Int} totalItems  total no of blog articles in the related collection in database.
     * @apiSuccess {Int} currentPage  current page number of client pagination system.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *           "dataList": [
     *               {
     *                   "_id": "578f46c4774c15521907c399",
     *                   "author": "codementor.io",
     *                   "bannerImageAltText": "very good article",
     *                   "bannerImageTitle": "very good tutorial codementor",
     *                   "bannerImage": "blog-1469007556727.webp",
     *                   "seoEntry": {
     *                       "metaAuthor": "codementor.io",
     *                       "metaDescription": "Hello, I'm Ilya, a full-stack developer who uses Node.js on the server and Ember.js on the client. Lately I've been having lots of fun testing my Express APIs,",
     *                       "titleTag": "Testing Express APIs with Supertest",
     *                       "metaKeyword": "tdd,node.js",
     *                       "valueChanged": false
     *                   },
     *                   "blogDescription": "<p>Hello, I'm Ilya, a full-stack developer who uses Node.js on the server and Ember.js on the client. Lately I've been having lots of fun testing my Express APIs, and I just wanted to show-off how fun and simple it can be. Hope you enjoy this as much as I enjoyed writing it!</p>",
     *                   "blogSummary": "Hello, I'm Ilya, a full-stack developer who uses Node.js on the server and Ember.js on the client. Lately I've been having lots of fun testing my Express APIs, and I just wanted to show-off how fun and simple it can be. Hope you enjoy this as much as I enjoyed writing it!",
     *                   "categoryId": "578f2c9535102e0c5d5c3ce1",
     *                   "relatedFiles": [],
     *                   "urlSlog": "testing-express-apis-with-supertest",
     *                   "blogTitle": "Testing Express APIs with Supertest",
     *                   "addedOn": "2016-07-20T09:39:16.797Z",
     *                   "articleViews": 0,
     *                   "allowComment": false,
     *                   "active": false,
     *                   "status": "active",
     *                   "tags": [
     *                       {
     *                           "tag": "tdd",
     *                           "urlSlogTag": "tdd",
     *                           "postCount": 2
     *                       },
     *                       {
     *                           "tag": "node.js",
     *                           "urlSlogTag": "node-js",
     *                           "postCount": 2
     *                       }
     *                   ]
     *               }
     *           ],
     *           "totalItems": 1,
     *           "currentPage": 1
     *       }
     *
     *
     * @apiError  (NotFound) {String} message  Blog article not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "Blog article not found"
     *     }
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

        .get( getBlogByTag );


    blogRouter.route('/filter/blogcategory/:blogCategory')

    /**
     * @api {get} /api/filter/blogcategory/:blogCategory Get blog article list by category name
     * @apiPermission public
     * @apiName getBlogByCategory
     * @apiGroup Blog
     *
     * @apiParam {Int} perpage Number of data to return on each request
     * @apiParam {Int} page Current page number of pagination system.
     * @apiParam {String} blogCategory to filter blog article list using blog category name as filter param
     *
     *
     *   @apiParamExample {json} Request-Example:
     *     {
     *       "perpage": 10,
     *       "page": 1,
     *       "blogCategory": "technology"
     *     }
     *
     *
     * @apiDescription Retrieves the blog list related to the category name, if exists, else return empty array
     * @apiVersion 0.0.1
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/filter/blogcategory/technology" \
     * --data-urlencode "perpage=10" \
     * --data-urlencode "page=1"
     *
     *
     *
     * @apiSuccess {Array} dataList list of blog articles
     * @apiSuccess {String} dataList._id  object id of blog article data.
     * @apiSuccess {String} dataList.blogTitle  title of the blog article.
     * @apiSuccess {String} dataList.urlSlog clean URL of the blog article title.
     * @apiSuccess {String} dataList.categoryId   object id of the related blog category.
     * @apiSuccess {Array} dataList.relatedFiles list of documents related to the blog.
     * @apiSuccess {String} dataList.blogSummary  brief description about the blog article.
     * @apiSuccess {String} dataList.blogDescription  blog article in detailed description.
     * @apiSuccess {String} dataList.author author of the blog article.
     * @apiSuccess {Date} dataList.addedOn  system date of blog article addition.
     * @apiSuccess {String} dataList.bannerImage  name of the image file.
     * @apiSuccess {String} dataList.bannerImageTitle  title description of blog article image.
     * @apiSuccess {String} dataList.bannerImageAltText  alternative text for blog article image .
     * @apiSuccess {Int} dataList.articleViews no of times blog article is viewed.
     * @apiSuccess {Boolean} dataList.active  active bit status.
     * @apiSuccess {Boolean} dataList.allowComment  whether to allow the comments in this blog article.
     * @apiSuccess {String} dataList.status  whether the blog article is still relevant or outdated.
     * @apiSuccess {Object} dataList.seoEntry  object containing blog article seo meta tags.
     * @apiSuccess {String} dataList.seoEntry.metaKeyword  meta keyword for the blog article.
     * @apiSuccess {String} dataList.seoEntry.titleTag  meta title tag for the blog article .
     * @apiSuccess {String} dataList.seoEntry.metaDescription meta description of the blog article.
     * @apiSuccess {String} dataList.seoEntry.metaAuthor  meta author of the blog artcle .
     * @apiSuccess {Boolean} dataList.seoEntry.valueChanged whether the meta tags are updated or not.
     * @apiSuccess {Array} dataList.tags  tags related to the blog article.
     * @apiSuccess {String} dataList.tags.tag  tag related to the blog article.
     * @apiSuccess {String} dataList.tags.urlSlogTag  clean URL of the tag .
     * @apiSuccess {String} dataList.tags.postCount no of blog posts related to the tag.
     *
     * @apiSuccess {Int} totalItems  total no of blog articles in the related collection in database.
     * @apiSuccess {Int} currentPage  current page number of client pagination system.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *           "dataList": [
     *               {
     *                   "_id": "578f46c4774c15521907c399",
     *                   "author": "codementor.io",
     *                   "bannerImageAltText": "very good article",
     *                   "bannerImageTitle": "very good tutorial codementor",
     *                   "bannerImage": "blog-1469007556727.webp",
     *                   "seoEntry": {
     *                       "metaAuthor": "codementor.io",
     *                       "metaDescription": "Hello, I'm Ilya, a full-stack developer who uses Node.js on the server and Ember.js on the client. Lately I've been having lots of fun testing my Express APIs,",
     *                       "titleTag": "Testing Express APIs with Supertest",
     *                       "metaKeyword": "tdd,node.js",
     *                       "valueChanged": false
     *                   },
     *                   "blogDescription": "<p>Hello, I'm Ilya, a full-stack developer who uses Node.js on the server and Ember.js on the client. Lately I've been having lots of fun testing my Express APIs, and I just wanted to show-off how fun and simple it can be. Hope you enjoy this as much as I enjoyed writing it!</p>",
     *                   "blogSummary": "Hello, I'm Ilya, a full-stack developer who uses Node.js on the server and Ember.js on the client. Lately I've been having lots of fun testing my Express APIs, and I just wanted to show-off how fun and simple it can be. Hope you enjoy this as much as I enjoyed writing it!",
     *                   "categoryId": "578f2c9535102e0c5d5c3ce1",
     *                   "relatedFiles": [],
     *                   "urlSlog": "testing-express-apis-with-supertest",
     *                   "blogTitle": "Testing Express APIs with Supertest",
     *                   "addedOn": "2016-07-20T09:39:16.797Z",
     *                   "articleViews": 0,
     *                   "allowComment": false,
     *                   "active": false,
     *                   "status": "active",
     *                   "tags": [
     *                       {
     *                           "tag": "tdd",
     *                           "urlSlogTag": "tdd",
     *                           "postCount": 2
     *                       },
     *                       {
     *                           "tag": "node.js",
     *                           "urlSlogTag": "node-js",
     *                           "postCount": 2
     *                       }
     *                   ]
     *               }
     *           ],
     *           "totalItems": 1,
     *           "currentPage": 1
     *       }
     *
     *
     * @apiError  (NotFound) {String} message  Blog article not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "Blog article not found"
     *     }
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

        .get( getBlogByCategory );


    blogRouter.route('/blogdetail/:year/:month/:day/:titleSlog')

    /**
     * @api {get} /api/blogdetail/:year/:month/:day/:titleSlog   Get blog detailed information  by title slog or clean url
     * @apiPermission public
     * @apiName getBlogDetailByUrlSlog
     * @apiGroup Blog
     *
     * @apiParam {Int} year  year on which blog was added
     * @apiParam {Int} month month on which blog was added
     * @apiParam {Int} day  day on which blog was added
     * @apiParam {String} titleSlog  clean url of the blog title
     *
     * @apiParamExample {json} Request-Example:
     *     {
     *       "year": "2016",
     *       "month": "07",
     *       "day": "20",
     *       "titleSlog": "testing-express-apis-with-supertest"
     *     }
     *
     *
     *
     * @apiDescription Retrieves the blog  detailed information object using clean url, if exists, else return empty object
     * @apiVersion 0.0.1
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/blogdetail/2016/07/20/testing-express-apis-with-supertest"
     *
     * @apiSuccess {Object} data object containing detailed information about blog article except related documents
     * @apiSuccess {String} data._id  object id of blog article data.
     * @apiSuccess {String} data.blogTitle  title of the blog article.
     * @apiSuccess {String} data.urlSlog clean URL of the blog article title.
     * @apiSuccess {String} data.categoryId   object id of the related blog category.
     * @apiSuccess {Array} data.relatedFiles list of documents related to the blog.
     * @apiSuccess {String} data.blogSummary  brief description about the blog article.
     * @apiSuccess {String} data.blogDescription  blog article in detailed description.
     * @apiSuccess {String} data.author author of the blog article.
     * @apiSuccess {Date} data.addedOn  system date of blog article addition.
     * @apiSuccess {String} data.bannerImage  name of the image file.
     * @apiSuccess {String} data.bannerImageTitle  title description of blog article image.
     * @apiSuccess {String} data.bannerImageAltText  alternative text for blog article image .
     * @apiSuccess {Int} data.articleViews no of times blog article is viewed.
     * @apiSuccess {Boolean} data.active  active bit status.
     * @apiSuccess {Boolean} data.allowComment  whether to allow the comments in this blog article.
     * @apiSuccess {String} data.status  whether the blog article is still relevant or outdated.
     * @apiSuccess {Object} data.seoEntry  object containing blog article seo meta tags.
     * @apiSuccess {String} data.seoEntry.metaKeyword  meta keyword for the blog article.
     * @apiSuccess {String} data.seoEntry.titleTag  meta title tag for the blog article .
     * @apiSuccess {String} data.seoEntry.metaDescription meta description of the blog article.
     * @apiSuccess {String} data.seoEntry.metaAuthor  meta author of the blog artcle .
     * @apiSuccess {Boolean} data.seoEntry.valueChanged whether the meta tags are updated or not.
     * @apiSuccess {Array} data.tags  tags related to the blog article.
     * @apiSuccess {String} data.tags.tag  tag related to the blog article.
     * @apiSuccess {String} data.tags.urlSlogTag  clean URL of the tag .
     * @apiSuccess {String} data.tags.postCount no of blog posts related to the tag.
     *
     *
     * @apiSuccess {Array} doclist  list of related documents
     * @apiSuccess {String} doclist._id  object id of blog document data.
     * @apiSuccess {String} doclist.documentName  name of the document file.
     * @apiSuccess {String} doclist.documentTitle  title of the document file .
     * @apiSuccess {Boolean} doclist.active no active bit status of blog document.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *           "data": {
     *               "_id": "578f46c4774c15521907c399",
     *               "author": "codementor.io",
     *               "bannerImageAltText": "very good article",
     *               "bannerImageTitle": "very good tutorial codementor",
     *               "bannerImage": "blog-1469007556727.webp",
     *               "seoEntry": {
     *                   "_id": "578f46c4774c15521907c398",
     *                   "metaAuthor": "www.codementor.io",
     *                   "metaKeyword": "tdd,node.js,javascript,mocha,sinon,codementor",
     *                   "titleTag": "Testing Express APIs with Supertest to do integration testing",
     *                   "metaDescription": "Hello, I am Ilya, a full-stack developer who uses Node.js on the server and Ember.js on the client. Lately I ve been having lots of fun testing my Express APIs, haha updated the content finally",
     *                   "valueChanged": true
     *               },
     *               "blogDescription": "<p>Hello, I'm Ilya, a full-stack developer who uses Node.js on the server and Ember.js on the client. Lately I've been having lots of fun testing my Express APIs, and I just wanted to show-off how fun and simple it can be. Hope you enjoy this as much as I enjoyed writing it!</p>",
     *               "blogSummary": "Hello, I'm Ilya, a full-stack developer who uses Node.js on the server and Ember.js on the client. Lately I've been having lots of fun testing my Express APIs, and I just wanted to show-off how fun and simple it can be. Hope you enjoy this as much as I enjoyed writing it!",
     *               "categoryId": "578f2c9535102e0c5d5c3ce1",
     *               "relatedFiles": [],
     *               "urlSlog": "testing-express-apis-with-supertest",
     *               "blogTitle": "Testing Express APIs with Supertest",
     *               "addedOn": "2016-07-20T09:39:16.797Z",
     *               "articleViews": 0,
     *               "allowComment": false,
     *               "active": true,
     *               "status": "active",
     *               "tags": [
     *                   {
     *                       "_id": "578f46038c6c44511904cef1",
     *                       "tag": "tdd",
     *                       "urlSlogTag": "tdd",
     *                       "postCount": 2
     *                   }
     *               ]
     *           },
     *           "doclist": [
     *               {
     *                   "documentTitle": "mongo security pdf  very good ebook",
     *                   "documentName": "blog-1469061530821.pdf",
     *                   "_id": "578fbb2bb35eab042d933393",
     *                   "active": true
     *               }
     *           ]
     *       }
     *
     *
     * @apiError  (NotFound) {String} message  Blog article not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "Blog article not found"
     *     }
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

        .get( getBlogDetailByUrlSlog );
    

    //function declaration to return blog article list, if exists, else return not found message
    function getAllBlogs(req, res, next) {
        blogController.getAllBlogArticles (req, next)
            .then(function(blogArticleList){
                //if exists, return data in json format
                if (blogArticleList) {
                    res.status(HTTPStatus.OK);
                    res.json(blogArticleList);
                } else {
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.blog.notFoundBlogArticle
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    }


    //function declaration to return blog category list, if exists, else return not found message
    function getAllBlogCategories(req, res, next) {
        blogController.getBlogCategories (req, next)
            .then(function(blogCategoryList){
                //if exists, return data in json format
                if (blogCategoryList) {
                    res.status(HTTPStatus.OK);
                    res.json(blogCategoryList);
                } else {
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.blog.notFoundCategory
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    }



    //function declaration to return blog tags list, if exists, else return not found message
    function getAllBlogTags(req, res, next) {
        blogController.getAllBlogTags (req)
            .then(function(blogTagList) {
                //if exists, return data in json format
                if (blogTagList) {
                    res.status(HTTPStatus.OK);
                    res.json(blogTagList);
                } else {
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.blog.notFoundTag
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    }


    //function declaration to return blog detailed object, if exists, else return not found message
    function getBlogDetailByUrlSlog(req, res, next) {
        blogController.getBlogDetailByUrlSlog (req, next)
            .then(function(blogDetailList) {
                //if exists, return data in json format
                if (blogDetailList) {
                    res.status(HTTPStatus.OK);
                    res.json(blogDetailList);
                } else {
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.blog.notFoundBlogArticle
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    }


    //function declaration to return blog detailed object related to the filter parameter tag name, if exists, else return not found message
    function getBlogByTag(req, res, next) {
        blogController.getBlogByTag (req, next)
            .then(function(blogList) {
                //if exists, return data in json format
                if (blogList) {
                    res.status(HTTPStatus.OK);
                    res.json(blogList);
                } else {
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.blog.notFoundBlogArticle
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    }


    //function declaration to return blog detailed object related to the filter parameter category name, if exists, else return not found message
    function getBlogByCategory(req, res, next) {
        blogController.getBlogByCategory (req, next)
            .then(function(blogList) {
                //if exists, return data in json format
                if (blogList) {
                    res.status(HTTPStatus.OK);
                    res.json(blogList);
                } else {
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.blog.notFoundBlogArticle
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    }

    //function declaration to return blog documents list, if exists, else return not found message
    function getAllRelatedBlogDocuments(req, res, next) {
        blogController.getAllRelatedBlogDocuments (req)
            .then(function(blogDocList) {
                //if exists, return data in json format
                if (blogDocList) {
                    res.status(HTTPStatus.OK);
                    res.json(blogDocList);
                } else {
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.blog.notFoundDoc
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    }

    return blogRouter;

})();

module.exports = blogRoutes;