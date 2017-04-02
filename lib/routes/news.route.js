var newsRoutes = (function () {

    'use strict';

    var HTTPStatus = require('http-status'),
        express = require('express'),
        tokenAuthMiddleware = require('../middlewares/token.authentication.middleware'),
        roleAuthMiddleware = require('../middlewares/role.authorization.middleware'),
        messageConfig = require('../configs/api.message.config'),
        newsRouter = express.Router(),
        imageFilePath = './public/uploads/images/news/',
        uploadPrefix = 'news',
        fileUploadHelper = require('../helpers/file.upload.helper')(imageFilePath, '', uploadPrefix),
        uploader = fileUploadHelper.uploader,
        newsController = require('../controllers/news.server.controller');

    newsRouter.route('/newscategory/')
    /**
     * @api {get} /api/newscategory/ Get News category list
     * @apiPermission public
     * @apiName getAllNewsCategory
     * @apiGroup News
     *
     * @apiParam {Boolean} active whether to get data with active bit true or false, if true, then returns data list with active bit set to true only
     *
     *
     *
     *  * @apiParamExample {json} Request-Example:
     *     {
     *       "active": true
     *     }
     *
     * @apiDescription Retrieves the news category list, if exists, else return empty array
     * @apiVersion 0.0.1
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/newscategory"
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/newscategory" \
     * --data-urlencode "active=true"
     *
     *
     * @apiSuccess {String} _id  object id of news category data.
     * @apiSuccess {String} categoryName  name of the category of news.
     * @apiSuccess {String} categoryDescription   brief description about news category.
     * @apiSuccess {String} urlSlogCategory  clean URL of news category.
     * @apiSuccess {Boolean} active  active bit status.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     [
     *            {
     *                "_id": "578dd25436e469c351f17cd6",
     *                "urlSlogCategory": "politics",
     *                "categoryDescription": "Contains political news",
     *                "categoryName": "Politics",
     *                "active": true
     *            }
     *        ]
     *
     *
     * @apiError  (NotFound) {String} message  News category not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "News category not found"
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
        .get( getAllNewsCategory)

        /**
         * @api {post} /api/newscategory/ Post News category data
         * @apiPermission admin
         * @apiName postNewsCategory
         * @apiGroup News
         *
         *
         * @apiParam {String} categoryName Mandatory name of the category of news.
         *
         * @apiDescription saves news category information to the database
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
         * http://localhost:3000/api/newscategory/ \
         * -H 'Content-Type: application/json' \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODkyMTU1MiwiZXhwIjoxNDY4OTQxNTUyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.wyt4E06UCFRkBpKD7ThHcWODCxGfO0j3Zv0k-cRTh0nYTHsKjVS4WgpefcLy-o_67aeSh42-wEqq0tBvxk603A" \
         * -d '{"categoryName": "Sports", "categoryDescription": "Contains sports related news","active": true}'
         *
         *
         * @apiSuccess {String} message News category saved successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "News category saved successfully"
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
         * @apiError  (BadRequest) {String} message category name is required
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *
         *     {
         *       "message": "Category title is required"
         *     }
         *
         *
         *
         * @apiError  (AlreadyExists)  {String} message  News category with same name already exists
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 409 Conflict
         *     {
         *       "message": "Category with same title already exists"
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

        .post(tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, newsController.postNewsCategory);



    //middleware function that will get the news category object for each of the routes defined downwards
    newsRouter.use('/newscategory/:newsCategoryId', function (req, res, next) {
        newsController.getNewsCategoryInfoByID(req)
            .then(function(newsCategoryInfo){
                //saving in request object so that it can be used for other operations like updating data using put and patch method
                if (newsCategoryInfo) {
                    req.newsCategoryInfo = newsCategoryInfo;
                    next();
                    return null;// return a non-undefined value to signal that we didn't forget to return promise
                } else {
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.news.notFoundNewsCategory
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    });

    newsRouter.route('/newscategory/:newsCategoryId')

    /**
     * @api {get} /api/newscategory/:newsCategoryId Get News category information by Id
     * @apiPermission public
     * @apiName getNewsCategoryInfoByID
     * @apiGroup News
     *
     * @apiParam {String} newsCategoryId  object id of the news category data
     *
     *
     *
     *  * @apiParamExample {json} Request-Example:
     *     {
     *       "newsCategoryId": "578dd25436e469c351f17cd6"
     *     }
     *
     * @apiDescription Retrieves the news category object by Id, if exists, else return empty object
     * @apiVersion 0.0.1
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/newscategory/578dd25436e469c351f17cd6"
     *
     *
     * @apiSuccess {String} _id  object id of news category data.
     * @apiSuccess {String} categoryName  name of the category of news.
     * @apiSuccess {String} categoryDescription   brief description about news category.
     * @apiSuccess {String} urlSlogCategory  clean URL of news category.
     * @apiSuccess {Boolean} active  active bit status.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *           "_id": "578dd25436e469c351f17cd6",
     *           "urlSlogCategory": "politics",
     *           "categoryDescription": "Contains political news",
     *           "categoryName": "Politics",
     *           "active": true
     *       }
     *
     *
     * @apiError  (NotFound) {String} message  News category not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "News category not found"
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
            res.json(req.newsCategoryInfo);
        })

        /**
         * @api {patch} /api/newscategory/:newsCategoryId Deletes existing News category data
         * @apiPermission admin
         * @apiName patchNewsCategory
         * @apiGroup News
         *
         * @apiParam {String} newsCategoryId  object id of the news category data
         *
         *
         *
         *  * @apiParamExample {json} Request-Example:
         *     {
         *       "newsCategoryId": "578df84e02c537521c1a725f"
         *     }
         *
         * @apiDescription Deletes existing news category information from the database
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
         * http://localhost:3000/api/newscategory/578df84e02c537521c1a725f \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODkyMTU1MiwiZXhwIjoxNDY4OTQxNTUyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.wyt4E06UCFRkBpKD7ThHcWODCxGfO0j3Zv0k-cRTh0nYTHsKjVS4WgpefcLy-o_67aeSh42-wEqq0tBvxk603A" \
         *
         *
         * @apiSuccess {String} message News category deleted successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "News category deleted successfully"
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

        .patch(tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, newsController.patchNewsCategory)

        /**
         * @api {put} /api/newscategory/:newsCategoryId Updates existing News category data
         * @apiPermission admin
         * @apiName updateNewsCategory
         * @apiGroup News
         *
         * @apiParam {String} newsCategoryId  object id of the news category data
         *
         *
         *
         *  @apiParamExample {json} Request-Example:
         *     {
         *       "newsCategoryId": "578df84e02c537521c1a725f"
         *     }
         *
         * @apiDescription Updates existing news category information to the database
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
         * http://localhost:3000/api/newscategory/578df84e02c537521c1a725f \
         * -H 'Content-Type: application/json' \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODkyMTU1MiwiZXhwIjoxNDY4OTQxNTUyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.wyt4E06UCFRkBpKD7ThHcWODCxGfO0j3Zv0k-cRTh0nYTHsKjVS4WgpefcLy-o_67aeSh42-wEqq0tBvxk603A" \
         * -d '{"categoryName": "Sports", "categoryDescription": "Contains sports related news and gossips","active": true}'
         *
         *
         * @apiSuccess {String} message News category updated successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "News category updated successfully"
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
         * @apiError  (BadRequest) {String} message category name is required
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *
         *     {
         *       "message": "Category title is required"
         *     }
         *
         *
         *
         * @apiError  (AlreadyExists)  {String} message  News category with same name already exists
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 409 Conflict
         *     {
         *       "message": "Category with same title already exists"
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


        .put(tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, newsController.updateNewsCategory);


    newsRouter.route('/news/')

    /**
     * @api {get} /api/news/ Get news list
     * @apiPermission public
     * @apiName getAllNews
     * @apiGroup News
     *
     * @apiParam {Int} perpage Number of data to return on each request
     * @apiParam {Int} page Current page number of pagination system.
     * @apiParam {Boolean} active whether to get data with active bit true or false, if true, then returns data list with active bit set to true only
     * @apiParam {String} newsTitle to filter news list using news title as filter param
     * @apiParam {String} categoryid to filter news list according to news category
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
     *       "categoryid": "578dd25436e469c351f17cd6"
     *     }
     *
     *
     *   @apiParamExample {json} Request-Example:
     *     {
     *       "active": true,
     *       "newstitle": "this is news title"
     *     }
     *
     * @apiDescription Retrieves the news list, if exists, else return empty array
     * @apiVersion 0.0.1
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/news" \
     * --data-urlencode "perpage=10" \
     * --data-urlencode "page=1"
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/news" \
     * --data-urlencode "perpage=10" \
     * --data-urlencode "page=1" \
     * --data-urlencode "categoryid=578dd25436e469c351f17cd6"
     *
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/news" \
     * --data-urlencode "active=true" \
     * --data-urlencode "newstitle=Manchester derby more than Mourinho vs Guardiola - Robben"
     *
     *
     * @apiSuccess {Array} dataList list of news
     * @apiSuccess {String} dataList._id  object id of news data.
     * @apiSuccess {String} dataList.newsTitle  title of the news.
     * @apiSuccess {String} dataList.urlSlog clean URL of the news title.
     * @apiSuccess {String} dataList.categoryID   object id of the related news category.
     * @apiSuccess {String} dataList.newsSummary  brief description about the news.
     * @apiSuccess {String} dataList.newsDescription  news in detailed description.
     * @apiSuccess {String} dataList.newsAuthor author of the news.
     * @apiSuccess {String} dataList.newsDate  date of news reported.
     * @apiSuccess {String} dataList.addedOn  system date of news addition.
     * @apiSuccess {String} dataList.image  image list of the news containing cover image only.
     * @apiSuccess {String} dataList.image.imageName  name of the image file ie name of cover image.
     * @apiSuccess {String} dataList.image.imageTitle  title description of news image .
     * @apiSuccess {String} dataList.image.imageAltText  alternative text for news image.
     * @apiSuccess {String} dataList.image.active  whether image is active or not.
     * @apiSuccess {String} dataList.image.coverImage  whether image is cover image or not.
     * @apiSuccess {String} dataList.pageViews no of times news is viewed.
     * @apiSuccess {Boolean} dataList.active  active bit status.
     * @apiSuccess {Int} totalItems  total no of news in the related collection in database.
     * @apiSuccess {Int} currentPage  current page number of client pagination system.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *           "dataList": [
     *               {
     *                   "_id": "578dd7a1772dc45d60c4f8f0",
     *                   "newsAuthor": "Goal.com",
     *                   "newsDescription": "<p>The Bayern Munich and Netherlands winger has played under both managers, but has refused to reveal which one he preferred working with</p>",
     *                   "newsSummary": "The Bayern Munich and Netherlands winger has played under both managers, but has refused to reveal which one he preferred working with",
     *                   "categoryID": "578dd26236e469c351f17cd7",
     *                   "urlSlog": "manchester-derby-more-than-mourinho-vs-guardiola-robben",
     *                   "newsTitle": "Manchester derby more than Mourinho vs Guardiola - Robben",
     *                    "addedOn": "2016-07-19T07:34:23.050Z",
     *                   "active": true,
     *                   "pageViews": 0,
     *                   "image": [
     *                       {
     *                           "_id": "578dd7a1772dc45d60c4f8ef",
     *                           "imageName": "news-1468913569542.webp",
     *                           "active": true,
     *                           "coverImage": true
     *                       }
     *                   ],
     *                   "newsDate": "2016-07-18T18:15:00.000Z"
     *               }
     *           ],
     *           "totalItems": 1,
     *           "currentPage": 1
     *       }
     *
     *
     * @apiError  (NotFound) {String} message  News not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "News not found"
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

        .get( getAllNews )

        /**
         * @api {post} /api/news/ Post News data
         * @apiPermission admin
         * @apiName postNews
         * @apiGroup News
         *
         * @apiParam {String} newsTitle Mandatory title of the news.
         * @apiParam {String} categoryID Mandatory object id of the related news category.
         * @apiParam {String} newsDescription Mandatory news in detailed description.
         * @apiParam {String} newsDate Mandatory date of news reported.
         *
         * @apiDescription saves news information to the database
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
         * http://localhost:3000/api/news/ \
         * -H "Content-Type: multipart/form-data"  \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODkyMTU1MiwiZXhwIjoxNDY4OTQxNTUyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.wyt4E06UCFRkBpKD7ThHcWODCxGfO0j3Zv0k-cRTh0nYTHsKjVS4WgpefcLy-o_67aeSh42-wEqq0tBvxk603A" \
         * -F imageName=@public/images/404_banner.png  \
         * -F "data={\"newsTitle\": \"news title\",\"newsDescription\": \"news detail\",\"newsAuthor\": \"lakhe\",\"newsDate\": \"2016-02-12\",\"categoryID\": \"578dd25436e469c351f17cd6\"};type=application/json"
         *
         * @apiSuccess {String} message News saved successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "News saved successfully"
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
         * @apiError  (BadRequest) {String[]} message validation errors due to not entering values for news title, news description, categoryID, news date and invalid news date
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *
         *     {
         *       "message":[
         *                      {"param":"newsTitle","msg":"News title is required","value":""},
         *                      {"param":"categoryID","msg":"Category of news is required"},
         *                      {"param":"newsDescription","msg":"News description is required","value":""}
         *                 ]
         *     }
         *
         *
         *
         * @apiError  (AlreadyExists)  {String} message  News with same title already exists
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 409 Conflict
         *     {
         *       "message": "News with same title already exists"
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

        .post(tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, uploader.single('imageName'), fileUploadHelper.imageUpload, newsController.postNews);



    //middleware function that will get the news object for each of the routes defined downwards
    newsRouter.use('/news/:newsId', function (req, res, next) {
        newsController.getNewsByID(req)
            .then(function(newsInfo){
                //saving in request object so that it can be used for other operations like updating data using put and patch method
                if (newsInfo) {
                    req.newsInfo = newsInfo;
                    next();
                    return null;// return a non-undefined value to signal that we didn't forget to return promise
                } else {
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.news.notFoundNews
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    });

    newsRouter.route('/news/:newsId')


    /**
     * @api {get} /api/news/:newsId Get news object by Id
     * @apiPermission public
     * @apiName getNewsByID
     * @apiGroup News
     *
     *
     * @apiParam {String} newsId  object id of the news data
     *
     *   @apiParamExample {json} Request-Example:
     *     {
     *       "newsId": "578dd7a1772dc45d60c4f8f0"
     *     }
     *
     *
     * @apiDescription Retrieves the news object by Id, if exists, else return empty object
     * @apiVersion 0.0.1
     *
     *
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/news/578dd7a1772dc45d60c4f8f0"
     *
     *
     *
     * @apiSuccess {String} _id  object id of news data.
     * @apiSuccess {String} newsTitle  title of the news.
     * @apiSuccess {String} urlSlog clean URL of the news title.
     * @apiSuccess {String} categoryID   object id of the related news category.
     * @apiSuccess {String} newsSummary  brief description about the news.
     * @apiSuccess {String} newsDescription  news in detailed description.
     * @apiSuccess {String} newsAuthor author of the news.
     * @apiSuccess {String} newsDate  date of news reported.
     * @apiSuccess {String} addedOn  system date of news addition.
     * @apiSuccess {String} image  image list of the news containing cover image only.
     * @apiSuccess {String} image.imageName  name of the image file ie name of cover image.
     * @apiSuccess {String} image.imageTitle  title description of news image .
     * @apiSuccess {String} image.imageAltText  alternative text for news image.
     * @apiSuccess {String} image.active  whether image is active or not.
     * @apiSuccess {String} image.coverImage  whether image is cover image or not.
     * @apiSuccess {String} image.imageProperties  meta-data info of image file.
     * @apiSuccess {String} image.imageProperties.imageExtension  extension of image file .
     * @apiSuccess {String} image.imageProperties.imagePath  path of image file.
     * @apiSuccess {String} pageViews no of times news is viewed.
     * @apiSuccess {Boolean} active  active bit status.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *           "_id": "578dd7a1772dc45d60c4f8f0",
     *           "newsAuthor": "Goal.com",
     *           "newsDescription": "<p>The Bayern Munich and Netherlands winger has played under both managers, but has refused to reveal which one he preferred working with</p>",
     *           "newsSummary": "The Bayern Munich and Netherlands winger has played under both managers, but has refused to reveal which one he preferred working with",
     *           "categoryID": "578dd26236e469c351f17cd7",
     *           "urlSlog": "manchester-derby-more-than-mourinho-vs-guardiola-robben",
     *           "newsTitle": "Manchester derby more than Mourinho vs Guardiola - Robben",
     *           "addedOn": "2016-07-19T07:34:23.050Z",
     *           "active": true,
     *           "pageViews": 0,
     *           "image": [
     *               {
     *                   "_id": "578dd7a1772dc45d60c4f8ef",
     *                   "imageName": "news-1468913569542.webp",
     *                   "imageProperties": {
     *                       "imageExtension": "jpg",
     *                       "imagePath": "public/uploads/images/news/news-1468913569542.jpg"
     *                   },
     *                   "active": true,
     *                   "coverImage": true
     *               }
     *           ],
     *           "newsDate": "2016-07-18T18:15:00.000Z"
     *       }
     *
     *
     * @apiError  (NotFound) {String} message  News not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "News not found"
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
            res.json(req.newsInfo);
        })


        /**
         * @api {patch} /api/news/:newsId  Deletes existing News data
         * @apiPermission admin
         * @apiName patchNews
         * @apiGroup News
         *
         * @apiParam {String} newsId  object id of the news data
         *
         *   @apiParamExample {json} Request-Example:
         *     {
         *       "newsId": "578dd7a1772dc45d60c4f8f0"
         *       }
         *
         *
         * @apiDescription Deletes existing news information from the database
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
         * http://localhost:3000/api/news/578dfaeae392bd75218e743a \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODkyMTU1MiwiZXhwIjoxNDY4OTQxNTUyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.wyt4E06UCFRkBpKD7ThHcWODCxGfO0j3Zv0k-cRTh0nYTHsKjVS4WgpefcLy-o_67aeSh42-wEqq0tBvxk603A"
         *
         * @apiSuccess {String} message News deleted successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "News deleted successfully"
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

        .patch(tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, newsController.patchNews)

        /**
         * @api {put} /api/news/:newsId  Updates existing News data
         * @apiPermission admin
         * @apiName updateNews
         * @apiGroup News
         *
         * @apiParam {String} newsId  object id of the news data
         *
         *   @apiParamExample {json} Request-Example:
         *     {
         *       "newsId": "578dd7a1772dc45d60c4f8f0"
         *       }
         *
         *
         * @apiDescription Updates existing news information to the database
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
         * http://localhost:3000/api/news/578dfaeae392bd75218e743a \
         * -H "Content-Type: multipart/form-data"  \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODkyMTU1MiwiZXhwIjoxNDY4OTQxNTUyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.wyt4E06UCFRkBpKD7ThHcWODCxGfO0j3Zv0k-cRTh0nYTHsKjVS4WgpefcLy-o_67aeSh42-wEqq0tBvxk603A" \
         * -F imageName=@public/images/404_banner.png  \
         * -F "data={\"newsTitle\": \"news title hello\",\"newsDescription\": \"news detail\",\"newsAuthor\": \"lakhe\",\"newsDate\": \"2016-02-12\",\"categoryID\": \"578dd25436e469c351f17cd6\"};type=application/json"
         *
         * @apiSuccess {String} message News updated successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "News updated successfully"
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
         * @apiError  (BadRequest) {String[]} message validation errors due to not entering values for news title, news description, categoryID, news date and invalid news date
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *
         *     {
         *       "message":[
         *                      {"param":"newsTitle","msg":"News title is required","value":""},
         *                      {"param":"categoryID","msg":"Category of news is required"},
         *                      {"param":"newsDescription","msg":"News description is required","value":""}
         *                 ]
         *     }
         *
         *
         *
         * @apiError  (AlreadyExists)  {String} message  News with same title already exists
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 409 Conflict
         *     {
         *       "message": "News with same title already exists"
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

        .put(tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, uploader.single('imageName'), fileUploadHelper.imageUpload, newsController.updateNews);


    newsRouter.route('/newsimage/:newsId')

    /**
     * @api {get} /api/newsimage/:newsId Get image list for the particular news data
     * @apiPermission public
     * @apiName getAllNewsImagesByNewsID
     * @apiGroup News
     *
     * @apiParam {String} newsId  object id of the news data
     * @apiParam {Boolean} active whether to get data i.e news image list with active bit true or false, if true, then returns data list with active bit set to true only
     *
     * @apiParamExample {json} Request-Example:
     *     {
     *       "newsId": "578dd7a1772dc45d60c4f8f0"
     *     }
     *
     *  @apiParamExample {json} Request-Example:
     *     {
     *       "newsId": "578dd7a1772dc45d60c4f8f0",
     *       "active": true
     *     }
     *
     * @apiDescription Retrieves the related image list of the particular news, if exists, else return empty array
     * @apiVersion 0.0.1
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/newsimage/578dd7a1772dc45d60c4f8f0"
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/newsimage/578dd7a1772dc45d60c4f8f0" \
     * --data-urlencode "active=true"
     *
     *
     * @apiSuccess {Array} image  list of images related to the particular news.
     * @apiSuccess {String} image._id  object id of news image data.
     * @apiSuccess {String} image.imageName  name of the image file .
     * @apiSuccess {String} image.imageTitle  title description of news image .
     * @apiSuccess {String} image.imageAltText  alternative text for news image.
     * @apiSuccess {String} image.active  whether image is active or not.
     * @apiSuccess {String} image.coverImage  whether image is cover image or not.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *           "image": [
     *               {
     *                   "_id": "578dd7a1772dc45d60c4f8ef",
     *                   "imageName": "news-1468913569542.webp",
     *                   "imageAltText": "Pogba football player",
     *                   "imageTitle": "transfer gossip of pogba to Man utd",
     *                   "active": true,
     *                   "coverImage": true
     *               }
     *           ]
     *       }
     *
     *
     * @apiError  (NotFound) {String} message  News image not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "News image not found"
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

        .get( getAllNewsImagesByNewsID )

        /**
         * @api {post} /api/newsimage/:newsId Post News image data
         * @apiPermission admin
         * @apiName postNewsImageInfo
         * @apiGroup News
         *
         * @apiParam {String} newsId  object id of the news data
         * @apiParam {String} imageName Mandatory name of the image file .
         *
         *
         *
         * @apiParamExample {json} Request-Example:
         *     {
         *       "newsId": "578dd7a1772dc45d60c4f8f0"
         *     }
         *
         * @apiDescription saves news image information to the database
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
         * http://localhost:3000/api/newsimage/578dfaeae392bd75218e743a \
         * -H "Content-Type: multipart/form-data"  \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODkyMTU1MiwiZXhwIjoxNDY4OTQxNTUyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.wyt4E06UCFRkBpKD7ThHcWODCxGfO0j3Zv0k-cRTh0nYTHsKjVS4WgpefcLy-o_67aeSh42-wEqq0tBvxk603A" \
         * -F imageName=@public/images/404_banner.png  \
         * -F "data={\"imageTitle\": \"beautiful image\",\"imageAltText\": \"indeed very beautiful image\"};type=application/json"
         *
         *
         * @apiSuccess {String} message News image saved successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "News image saved successfully"
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
         * @apiError  (BadRequest) {String} message  please upload image
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *
         *     {
         *       "message": "Please upload news"
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

        .post(tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, uploader.single('imageName'), fileUploadHelper.imageUpload, newsController.postNewsImageInfo);



    //middleware function that will get the news related image object for each of the routes defined downwards
    newsRouter.use('/newsimage/:newsId/:imageId', function (req, res, next) {
        newsController.getNewsImageInfoByImageID(req)
            .then(function(newsImageInfo){
                //saving in request object so that it can be used for other operations like updating data using put and patch method
                if (newsImageInfo) {
                    req.newsImageInfo = newsImageInfo;
                    next();
                    return null;// return a non-undefined value to signal that we didn't forget to return promise
                } else {
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.news.notFoundNewsImage
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    });

    newsRouter.route('/newsimage/:newsId/:imageId')


    /**
     * @api {delete} /api/newsimage/:newsId/:imageId Deletes news image data
     * @apiPermission admin
     * @apiName removeNewsImage
     * @apiGroup News
     *
     * @apiParam {String} newsId  object id of the news data
     * @apiParam {String} imageId object id of the news image data
     *
     * @apiParamExample {json} Request-Example:
     *     {
         *       "newsId": "578dd7ff772dc45d60c4f8f2",
         *       "imageId": "578dd7ff772dc45d60c4f8f1"
         *     }
     *
     *
     * @apiDescription Deletes news image information from the database
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
     * -X DELETE  \
     * http://localhost:3000/api/newsimage/578dd7ff772dc45d60c4f8f2/578e0996a35b7b093d238e46 \
     * -H 'Content-Type: application/json' \
     * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODkyMTU1MiwiZXhwIjoxNDY4OTQxNTUyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.wyt4E06UCFRkBpKD7ThHcWODCxGfO0j3Zv0k-cRTh0nYTHsKjVS4WgpefcLy-o_67aeSh42-wEqq0tBvxk603A"
     *
     *
     *
     * @apiSuccess {String} message News image deleted successfully.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "message": "News image deleted successfully"
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
     * @apiError  (BadRequest) {String} message  Cover image cannot be deleted
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *
     *     {
     *       "message":"Cover image cannot be deleted"
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

        .delete(tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, newsController.removeNewsImage)


        /**
         * @api {get} /api/newsimage/:newsId/:imageId Get image object of the particular news.
         * @apiPermission public
         * @apiName getNewsImageInfoByImageID
         * @apiGroup News
         *
         * @apiParam {String} newsId  object id of the news data
         * @apiParam {String} imageId object id of the news image data
         *
         * @apiParamExample {json} Request-Example:
         *     {
         *       "newsId": "578dd7a1772dc45d60c4f8f0",
         *       "imageId": "578dd7a1772dc45d60c4f8ef"
         *     }
         *
         *
         *
         * @apiDescription Retrieves the image object of the particular news, if exists, else return empty object
         * @apiVersion 0.0.1
         *
         * @apiExample {curl} Example usage:
         * curl \
         * -G \
         * -v \
         * "http://localhost:3000/api/newsimage/578dd7a1772dc45d60c4f8f0/578dd7a1772dc45d60c4f8ef"
         *
         *
         *
         * @apiSuccess {String} _id  object id of news image data.
         * @apiSuccess {String} imageName  name of the image file .
         * @apiSuccess {String} imageTitle  title description of news image .
         * @apiSuccess {String} imageAltText  alternative text for news image.
         * @apiSuccess {String} active  whether image is active or not.
         * @apiSuccess {String} coverImage  whether image is cover image or not.
         * @apiSuccess {String} imageProperties  meta-data info of image file.
         * @apiSuccess {String} imageProperties.imageExtension  extension of image file .
         * @apiSuccess {String} imageProperties.imagePath  path of image file.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *       "_id": "578dd7a1772dc45d60c4f8ef",
         *       "imageName": "news-1468913569542.webp",
         *       "imageAltText": "Pogba football player",
         *       "imageTitle": "transfer gossip of pogba to Man utd",
         *       "active": true,
         *       "imageProperties": {
         *           "imageExtension": "jpg",
         *           "imagePath": "public/uploads/images/news/news-1468913569542.jpg"
         *       },
         *       "coverImage": true
         *   }
         *
         *
         * @apiError  (NotFound) {String} message  News image not found
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 404 Not Found
         *     {
         *       "message": "News image not found"
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
            res.json(req.newsImageInfo);
        })

        /**
         * @api {patch} /api/newsimage/:newsId/:imageId Updates news cover image
         * @apiPermission admin
         * @apiName updateCoverImage
         * @apiGroup News
         *
         * @apiParam {String} newsId  object id of the news data
         * @apiParam {String} imageId object id of the news image data that is currently a cover image
         * @apiParam {String} _id object id of the news image data that is to be set as a cover image
         *
         * @apiParamExample {json} Request-Example:
         *     {
         *       "newsId": "578dd7ff772dc45d60c4f8f2",
         *       "imageId": "578dd7ff772dc45d60c4f8f1"
         *     }
         *
         *
         * @apiDescription Updates news cover image information to the database
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
         * http://localhost:3000/api/newsimage/578dd7ff772dc45d60c4f8f2/578dd7ff772dc45d60c4f8f1 \
         * -H 'Content-Type: application/json' \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODkyMTU1MiwiZXhwIjoxNDY4OTQxNTUyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.wyt4E06UCFRkBpKD7ThHcWODCxGfO0j3Zv0k-cRTh0nYTHsKjVS4WgpefcLy-o_67aeSh42-wEqq0tBvxk603A" \
         * -d '{"_id": "578e0996a35b7b093d238e46"}'
         *
         * @apiSuccess {String} message News Cover image updated successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "Cover image updated successfully"
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


        .patch(tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, newsController.updateCoverImage)

        /**
         * @api {put} /api/newsimage/:newsId/:imageId Updates existing News image data
         * @apiPermission admin
         * @apiName updateNewsImageInfo
         * @apiGroup News
         *
         * @apiParam {String} newsId  object id of the news data
         * @apiParam {String} imageId object id of the news image data
         *
         * @apiParamExample {json} Request-Example:
         *     {
         *       "newsId": "578dd7ff772dc45d60c4f8f2",
         *       "imageId": "578dd7ff772dc45d60c4f8f1"
         *     }
         *
         *
         * @apiDescription Updates existing news image information to the database
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
         * http://localhost:3000/api/newsimage/578dd7ff772dc45d60c4f8f2/578dd7ff772dc45d60c4f8f1 \
         * -H "Content-Type: multipart/form-data"  \
         * -H "x-access-token: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGVsbG9AYml0c2JlYXQuY29tIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiX2lkIjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwidXNlckNvbmZpcm1lZCI6ZmFsc2UsImJsb2NrZWQiOmZhbHNlLCJkZWxldGVkIjpmYWxzZSwiYWRkZWRPbiI6IjIwMTYtMDctMDhUMDc6NTQ6MDMuNzY2WiIsInR3b0ZhY3RvckF1dGhFbmFibGVkIjpmYWxzZSwidXNlclJvbGUiOiJhZG1pbiIsImFjdGl2ZSI6dHJ1ZX0sImNsYWltcyI6eyJzdWJqZWN0IjoiNTc3ZjVjMWI1ODY5OTAyZDY3ZWIyMmE4IiwiaXNzdWVyIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwicGVybWlzc2lvbnMiOlsic2F2ZSIsInVwZGF0ZSIsInJlYWQiLCJkZWxldGUiXX0sImlhdCI6MTQ2ODkyMTU1MiwiZXhwIjoxNDY4OTQxNTUyLCJpc3MiOiI1NzdmNWMxYjU4Njk5MDJkNjdlYjIyYTgifQ.wyt4E06UCFRkBpKD7ThHcWODCxGfO0j3Zv0k-cRTh0nYTHsKjVS4WgpefcLy-o_67aeSh42-wEqq0tBvxk603A" \
         * -F imageName=@public/images/404_banner.png  \
         * -F "data={\"imageTitle\": \"beautiful image haha very very attractive\",\"imageAltText\": \"indeed very beautiful image\"};type=application/json"
         *
         *
         * @apiSuccess {String} message News image updated successfully.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "message": "News image updated successfully"
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
         * @apiError  (BadRequest) {String} message  please upload image
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *
         *     {
         *       "message": "Please upload news"
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

        .put(tokenAuthMiddleware.authenticate, roleAuthMiddleware.authorize, uploader.single('imageName'), fileUploadHelper.imageUpload, newsController.updateNewsImageInfo);



    newsRouter.route('/newsdetail/:year/:month/:day/:titleSlog')

    /**
     * @api {get} /api/newsdetail/:year/:month/:day/:titleSlog   Get news detail by title slog or clean url
     * @apiPermission public
     * @apiName getNewsDetailByTitleSlog
     * @apiGroup News
     *
     * @apiParam {Int} year  year on which news was reported
     * @apiParam {Int} month month on which news was reported
     * @apiParam {Int} day  day on which news was reported
     * @apiParam {String} titleSlog  clean url of the news title
     *
     * @apiParamExample {json} Request-Example:
     *     {
     *       "year": "2016",
     *       "month": "09",
     *       "day": "21",
     *       "titleSlog": "manchester-derby-more-than-mourinho-vs-guardiola-robben"
     *     }
     *
     *
     *
     * @apiDescription Retrieves the news detailed object using clean url, if exists, else return empty object
     * @apiVersion 0.0.1
     *
     * @apiExample {curl} Example usage:
     * curl \
     * -G \
     * -v \
     * "http://localhost:3000/api/newsdetail/2016/07/19/manchester-derby-more-than-mourinho-vs-guardiola-robben"
     *
     *
     *
     *
     * @apiSuccess {String} _id  object id of news data.
     * @apiSuccess {String} newsTitle  title of the news.
     * @apiSuccess {String} urlSlog clean URL of the news title.
     * @apiSuccess {String} categoryID   object id of the related news category.
     * @apiSuccess {String} newsSummary  brief description about the news.
     * @apiSuccess {String} newsDescription  news in detailed description.
     * @apiSuccess {String} newsAuthor author of the news.
     * @apiSuccess {String} addedOn  system date of news addition.
     * @apiSuccess {String} newsDate  date of news reported.
     * @apiSuccess {Array} image  list of images related to the news.
     * @apiSuccess {String} image._id  object id of news image data.
     * @apiSuccess {String} image.imageName  name of the image file .
     * @apiSuccess {String} image.imageTitle  title description of news image .
     * @apiSuccess {String} image.imageAltText  alternative text for news image.
     * @apiSuccess {String} image.active  whether image is active or not.
     * @apiSuccess {String} image.coverImage  whether image is cover image or not.
     * @apiSuccess {String} pageViews no of times news is viewed.
     * @apiSuccess {Boolean} active  active bit status.
     *
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *           "_id": "578dd7a1772dc45d60c4f8f0",
     *           "newsAuthor": "Goal.com",
     *           "newsDescription": "<p>The Bayern Munich and Netherlands winger has played under both managers, but has refused to reveal which one he preferred working with</p>",
     *           "newsSummary": "The Bayern Munich and Netherlands winger has played under both managers, but has refused to reveal which one he preferred working with",
     *           "categoryID": "578dd26236e469c351f17cd7",
     *           "urlSlog": "manchester-derby-more-than-mourinho-vs-guardiola-robben",
     *           "newsTitle": "Manchester derby more than Mourinho vs Guardiola - Robben",
     *           "addedOn": "2016-07-19T07:34:23.050Z",
     *           "active": true,
     *           "pageViews": 0,
     *           "image": [
     *               {
     *                   "_id": "578dd7a1772dc45d60c4f8ef",
     *                   "imageName": "news-1468913569542.webp",
     *                   "imageAltText": "Pogba football player",
     *                   "imageTitle": "transfer gossip of pogba to Man utd",
     *                   "active": true,
     *                   "coverImage": true
     *               },
     *               {
     *                   "_id": "578ddffb4b3606d175b2cea2",
     *                   "imageAltText": "Searching earthquake victims in Nepal",
     *                   "imageTitle": "Searching earthquake victims",
     *                   "imageName": "news-1468915707928.webp",
     *                   "active": true,
     *                   "coverImage": false
     *               }
     *           ],
     *           "newsDate": "2016-07-18T18:15:00.000Z"
     *       }
     *
     *
     * @apiError  (NotFound) {String} message  News not found
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
         *       "message": "News not found"
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

        .get( getNewsDetailByTitleSlog );



    //function declaration to return news list to the client if exists else return not found message
    function getAllNews(req, res, next) {
        newsController.getAllNews (req, next)
            .then(function(newsList){
                //if exists, return data in json format
                if (newsList) {
                    res.status(HTTPStatus.OK);
                    res.json(newsList);
                } else {
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.news.notFoundNews
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    }


    //function declaration to return news category list to the client if exists else return not found message
    function getAllNewsCategory(req, res, next) {
        newsController.getAllNewsCategory (req)
            .then(function(newsCategoryList){
                //if exists, return data in json format
                if (newsCategoryList) {
                    res.status(HTTPStatus.OK);
                    res.json(newsCategoryList);
                } else {
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.news.notFoundNewsCategory
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    }


    //function declaration to return news related image list to the client if exists else return not found message
    function getAllNewsImagesByNewsID(req, res, next) {
        newsController.getAllNewsImagesByNewsID (req)
            .then(function(newsImageList){
                //if exists, return data in json format
                if (newsImageList) {
                    res.status(HTTPStatus.OK);
                    res.json(newsImageList);
                } else {
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.news.notFoundNewsImage
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    }


    //function declaration to return news detail object to the client if exists else return not found message
    function getNewsDetailByTitleSlog(req, res, next) {
        newsController.getNewsDetailByTitleSlog (req)
            .then(function(newsObj){
                //if exists, return data in json format
                if (newsObj) {
                    res.status(HTTPStatus.OK);
                    res.json(newsObj);
                } else {
                    res.status(HTTPStatus.NOT_FOUND);
                    res.json({
                        message: messageConfig.news.notFoundNews
                    });
                }
            })
            .catch(function(err){
                return next(err);
            });
    }

    return newsRouter;

})();

module.exports = newsRoutes;