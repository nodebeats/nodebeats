(function(){
    "use strict";


    var  blogModel = require('../../models/blog.server.model'),
         BLog = blogModel.Blog,
         BlogCategory = blogModel.BlogCategory,
         BlogTag = blogModel.BlogTag,
         BlogMetaTag = blogModel.BlogMetaTag,
         blogController = require("../../controllers/blog.server.controller"),
         chai = require("chai"),
         should = chai.should(),
         sinon=require('sinon'),
         chaiAsPromised = require('chai-as-promised'),
         expect = chai.expect;


    chai.use(chaiAsPromised);

    describe("Blog", function () {
        describe("Blog Category", function () {
            var blogCategoryNewObj = {};

            beforeEach(function () {
                var blogCategoryObj = {
                    categoryName: "Technology Hub",
                    categoryDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
                    active: true
                };

                blogCategoryNewObj = blogController.blogCategoryConstructor(blogCategoryObj, 'technology-hub', 'superadmin');
            });

            describe("getBlogCategories()", function () {
                it('should get the list of blog categories if present', function (done) {

                    var BlogCategoryMock = sinon.mock(BlogCategory);
                    BlogCategoryMock
                        .expects('find')
                        .yields(null, 'TODOS');

                    BlogCategory.find(function (err, result) {
                        BlogCategoryMock.verify();
                        BlogCategoryMock.restore();
                        should.equal('TODOS', result, "Test fails due to unexpected result")
                        done();
                    });



                    // var req = {
                    //     query: {
                    //         perpage: 5,
                    //         page: 1,
                    //         deleted: false
                    //         // ,
                    //         // decoded: {
                    //         //     user: {
                    //         //         username: "superadmin"
                    //         //     }
                    //         // }
                    //     }
                    // };
                    //
                    // var res = {
                    //     status: sinon.spy(),
                    //     send: sinon.spy()
                    // };
                    //
                    //
                    // return blogController.getBlogCategories(req)
                    //     .then(function (blogCategoryList) {
                    //     })


                    // blogCategoryList.then()
                    //
                    // should.exist(blogCategoryList.categoryName);
                    // student.name.should.equal(studentName);
                    //
                    // should.exist(student.grade);
                    // student.grade.should.equal(studentGrade);
                    //
                    // should.exist(student.id);
                });
            });
        });
    });

})();