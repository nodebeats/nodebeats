(function () {
    'use strict';

    process.env.NODE_ENV = 'test';

    var chai = require("chai"),
        should = chai.should(),
        expect = chai.expect,
        supertest = require("supertest-as-promised"),
        baseUrl = 'http://localhost:3000',
        request = supertest.agent(baseUrl),
        mongoose  = require('mongoose'),
        databaseConfig = require('../lib/configs/database.config'),
        applicationConfig = require('../lib/configs/application.config'),
        Promise = require("bluebird"),
        HTTPStatus = require('http-status'),
        async = require('async'),
        dbUrl = "mongodb://" + databaseConfig.test.username + ":" + databaseConfig.test.password + "@" + databaseConfig.test.host + ":" + databaseConfig.test.port + "/" + databaseConfig.test.dbName;

    var loginUrl = '/api/login/';
    var imagePathUrl = ['/home/lakhe/Desktop/nodebeats/images/mountain_nepal.png', '/home/lakhe/Desktop/nodebeats/images/homepage.png'];
    var loginObj = {
        username : applicationConfig.user.defaultUsername,
        password : applicationConfig.user.defaultPassword
    };
    var documentPathUrl = ['/home/lakhe/Desktop/nodebeats/documents/proposal_example.pdf', '/home/lakhe/Desktop/nodebeats/documents/googleanalytics-jsonconfig.json'];
    var apiFileDeleteUrl = '/api/deletefile';

    beforeEach(function (done) {
        function clearDB() {
            for (var i in mongoose.connection.collections) {
                if (mongoose.connection.collections.hasOwnProperty(i)) {
                    mongoose.connection.collections[i].remove();
                }
            }
            return done();
        }

        function reconnect() {
            mongoose.connect(dbUrl, function (err) {
                if (err) {
                    throw err;
                }
                return clearDB();
            });
        }

        function checkState() {
            switch (mongoose.connection.readyState) {
                case 0:
                    reconnect();
                    break;
                case 1:
                    clearDB();
                    break;
                default:
                    process.nextTick(checkState);
            }
        }
        checkState();
    });

    describe('User login', function () {
        it('should return authentication token along with logged in user object', function (done) {
            request
                .post(loginUrl)
                .set('Accept', 'application/x-www-form-urlencoded')
                .send(loginObj)
                .expect('Content-Type', /json/)
                .then(function (response) {
                    expect(response.statusCode).to.equal(HTTPStatus.OK);
                    expect(response.body).to.have.property("success");
                    expect(response.body.success).to.equal(true);
                    expect(response.body).to.have.property("token");
                    expect(response.body.message).to.not.equal("");
                    expect(response.body).to.have.property("userInfo");
                    expect(response.body.userInfo).to.be.an('object');
                    expect(response.body.userInfo).to.have.property("userRole");
                    expect(response.body.userInfo.userRole).to.equal('superadmin');

                    var accessToken = response.body.token;

                    require('./integrationtests/cloudinary.setting.integration.test')(expect, request, accessToken);
                    require('./integrationtests/email.service.configure.integration.test')(expect, request, accessToken);
                    require('./integrationtests/email.template.integration.test')(expect, request, accessToken);
                    require('./integrationtests/role.management.integration.test')(expect, request, accessToken);
                    require('./integrationtests/apiAccess.management.integration.test')(expect, request, accessToken);
                    require('./integrationtests/html.module.integration.test')(expect, request, accessToken);
                    require('./integrationtests/google.maps.integration.test')(expect, request, accessToken);
                    require('./integrationtests/comment.setting.integration.test')(expect, request, accessToken);
                    require('./integrationtests/google.analytics.integration.test')(expect, request, documentPathUrl, apiFileDeleteUrl, accessToken);
                    require('./integrationtests/organization.info.integration.test')(expect, request, imagePathUrl, accessToken);
                    require('./integrationtests/contact.integration.test')(expect, request, accessToken);
                    require('./integrationtests/event.integration.test')(expect, request, imagePathUrl, apiFileDeleteUrl, accessToken);
                    require('./integrationtests/image.slider.integration.test')(expect, request, imagePathUrl, accessToken);
                    require('./integrationtests/news.integration.test')(expect, request, imagePathUrl, accessToken);
                    require('./integrationtests/image.gallery.integration.test')(expect, request, imagePathUrl, accessToken);
                    require('./integrationtests/testimonial.integration.test')(expect, request, imagePathUrl, accessToken);
                    require('./integrationtests/team.management.integration.test')(expect, request, imagePathUrl, accessToken);
                    require('./integrationtests/blog.integration.test')(expect, request, imagePathUrl, documentPathUrl, accessToken);
                    require('./integrationtests/user.integration.test')(expect, request, imagePathUrl, accessToken);
                    require('./integrationtests/partner.integration.test')(expect, request, imagePathUrl, accessToken);
                    require('./integrationtests/two.factor.authentication.integration.test')(expect, request, accessToken);
                    require('./integrationtests/error.log.integration.test')(expect, request, accessToken);
                    require('./integrationtests/login.integration.test')(expect, request, loginObj, loginUrl, accessToken);
                    require('./integrationtests/authorization.token.integration.test')(expect, request, loginObj, loginUrl);
                    done();
                });
        });
    });

    afterEach(function (done) {
        mongoose.disconnect();
        return done();
    });

    after(function (done) {
        mongoose.connect(dbUrl, function(){
            mongoose.connection.db.dropDatabase(function(){
                done();
            });
        });
    });

})();
