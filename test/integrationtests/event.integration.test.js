(function(){
    "use strict";

    var apiMessageConfig = require('../../lib/configs/api.message.config'),
        Promise = require("bluebird"),
        HTTPStatus = require('http-status');

    module.exports = function(expect, request, imagePathUrl, apiFileDeleteUrl, accessToken) {

        describe('Event Manager Integration test', function(){

            this.timeout(4000);
            var apiUrl = '/api/event/info/';
            var eventInfo;

            beforeEach(function () {
                eventInfo = {
                    eventTitle : "Rally against racial descrimination",
                    eventDescription : "Rally organized to create awareness regarding racial discrimination",
                    venue : "Thaiba Football Ground",
                    venueAddress : "Thaiba, Lalitpur, Nepal",
                    startDate : "2016-06-16",
                    endDate : "2016-06-18",
                    active : true
                };
            });

            describe('getAllEvents() to retrieve events for the first time', function () {
                it('should return an empty event list', function(done){
                    request
                        .get(apiUrl)
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                            expect(res.body).to.have.property("dataList");
                            expect(res.body.dataList).to.be.instanceof(Array);
                            expect(res.body.dataList).to.be.empty;
                            expect(res.body).to.have.property("totalItems");
                            expect(res.body.totalItems).to.equal(0);
                            done();
                        });
                });
            });


            describe('postEvent() to save event without access tokens', function () {
                it('should return a message stating that authentication is failed', function(done){
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .send(eventInfo)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.UNAUTHORIZED);
                            expect(res.body).to.have.property("success");
                            expect(res.body.success).to.equal(false);
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.authFail.authFailMessage);
                            done();
                        });
                });
            });

            describe('postEvent()  to save event ', function(){
                describe('with access tokens but without event image ', function () {
                    it('should return a successfull save message stating event saved successfully', function(done){
                        request
                            .post(apiUrl)
                            .set('Accept', 'application/x-www-form-urlencoded')
                            .set('x-access-token', accessToken)
                            .field('data', JSON.stringify(eventInfo))
                            .expect('Content-Type', /json/)
                            .then(function(res) {
                                expect(res.statusCode).to.equal(HTTPStatus.OK);
                                expect(res.body).to.be.an('object');
                                expect(res.body).to.have.property("message");
                                expect(res.body.message).to.equal(apiMessageConfig.eventManager.saveMessage);
                                done();
                            });
                    });
                });

                describe('with access token and same title to check for duplicacy', function () {
                    it('should return a message stating that event with same title already exists.', function(done){
                        request
                            .post(apiUrl)
                            .set('Accept', 'application/x-www-form-urlencoded')
                            .set('x-access-token', accessToken)
                            .field('data', JSON.stringify(eventInfo))
                            .expect('Content-Type', /json/)
                            .then(function(res) {
                                expect(res.statusCode).to.equal(HTTPStatus.CONFLICT);
                                expect(res.body).to.be.an('object');
                                expect(res.body).to.have.property("message");
                                expect(res.body.message).to.equal(apiMessageConfig.eventManager.alreadyExists);
                                done();
                            });
                    });
                });

                describe('with access tokens and also with event image but with different title for event ', function () {
                    it('should return a successfull save message  stating event saved successfully', function(done){
                        var self = this;
                        self.newEventObj = eventInfo;
                        self.newEventObj.eventTitle = "this is another title";

                        request
                            .post(apiUrl)
                            .set('Accept', 'application/x-www-form-urlencoded')
                            .set('x-access-token', accessToken)
                            .field('data', JSON.stringify(self.newEventObj))
                            .attach('imageName', imagePathUrl[0])
                            .expect('Content-Type', /json/)
                            .then(function(res) {
                                expect(res.statusCode).to.equal(HTTPStatus.OK);
                                expect(res.body).to.be.an('object');
                                expect(res.body).to.have.property("message");
                                expect(res.body.message).to.equal(apiMessageConfig.eventManager.saveMessage);
                                done();
                            });
                    });
                });


                describe('with invalid data i.e. no event Title, no event Description, no venue,  no venue Address,  no startDate, invalid startDate or invalid endDate', function () {
                    afterEach(function(){
                        eventInfo = {
                            eventTitle : "Rally against racial descrimination",
                            eventDescription : "Rally organized to create awareness regarding racial discrimination",
                            venue : "Thaiba Football Ground",
                            venueAddress : "Thaiba, Lalitpur, Nepal",
                            startDate : "2016-06-16",
                            endDate : "2016-06-18",
                            active : true
                        };
                    });

                    it('should return a message stating validation error- event title is required for empty event title', function(done){
                        var self = this;
                        self.invalidEventObj = eventInfo;
                        self.invalidEventObj.eventTitle = "";
                        request
                            .post(apiUrl)
                            .set('Accept', 'application/x-www-form-urlencoded')
                            .set('x-access-token', accessToken)
                            .field('data', JSON.stringify(self.invalidEventObj))
                            .expect('Content-Type', /json/)
                            .then(function(res) {
                                expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                expect(res.error).to.have.property('text');
                                var errObj = JSON.parse(res.error.text);
                                expect(errObj.message[0].msg).to.have.string(apiMessageConfig.eventManager.validationErrMessage.eventTitle);
                                done();
                            });
                    });

                    it('should return a message stating validation error- event detail is required  for empty event description', function(done){
                        var self = this;
                        self.invalidEventObj = eventInfo;
                        self.invalidEventObj.eventDescription = "";
                        request
                            .post(apiUrl)
                            .set('Accept', 'application/x-www-form-urlencoded')
                            .set('x-access-token', accessToken)
                            .field('data', JSON.stringify(self.invalidEventObj))
                            .expect('Content-Type', /json/)
                            .then(function(res) {
                                expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                expect(res.error).to.have.property('text');
                                var errObj = JSON.parse(res.error.text);
                                expect(errObj.message[0].msg).to.have.string(apiMessageConfig.eventManager.validationErrMessage.eventDescription);
                                done();
                            });
                    });

                    it('should return a message stating validation error- venue for event is required  for empty event venue', function(done){
                        var self = this;
                        self.invalidEventObj = eventInfo;
                        self.invalidEventObj.venue = "";
                        request
                            .post(apiUrl)
                            .set('Accept', 'application/x-www-form-urlencoded')
                            .set('x-access-token', accessToken)
                            .field('data', JSON.stringify(self.invalidEventObj))
                            .expect('Content-Type', /json/)
                            .then(function(res) {
                                expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                expect(res.error).to.have.property('text');
                                var errObj = JSON.parse(res.error.text);
                                expect(errObj.message[0].msg).to.have.string(apiMessageConfig.eventManager.validationErrMessage.venue);
                                done();
                            });
                    });

                    it('should return a message stating validation error - address for venue is required  for empty event venue address', function(done){
                        var self = this;
                        self.invalidEventObj = eventInfo;
                        self.invalidEventObj.venueAddress = "";
                        request
                            .post(apiUrl)
                            .set('Accept', 'application/x-www-form-urlencoded')
                            .set('x-access-token', accessToken)
                            .field('data', JSON.stringify(self.invalidEventObj))
                            .expect('Content-Type', /json/)
                            .then(function(res) {
                                expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                expect(res.error).to.have.property('text');
                                var errObj = JSON.parse(res.error.text);
                                expect(errObj.message[0].msg).to.have.string(apiMessageConfig.eventManager.validationErrMessage.venueAddress);
                                done();
                            });
                    });

                    it('should return a message stating validation error - start date of event is required  for empty event start date', function(done){
                        var self = this;
                        self.invalidEventObj = eventInfo;
                        self.invalidEventObj.startDate = "";
                        request
                            .post(apiUrl)
                            .set('Accept', 'application/x-www-form-urlencoded')
                            .set('x-access-token', accessToken)
                            .field('data', JSON.stringify(self.invalidEventObj))
                            .expect('Content-Type', /json/)
                            .then(function(res) {
                                expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                expect(res.error).to.have.property('text');
                                var errObj = JSON.parse(res.error.text);
                                expect(errObj.message[0].msg).to.have.string(apiMessageConfig.eventManager.validationErrMessage.startDate);
                                done();
                            });
                    });

                    it('should return a message stating validation error - invalid start date for invalid start date', function(done){
                        var self = this;
                        self.invalidEventObj = eventInfo;
                        self.invalidEventObj.startDate = "fdsfds";
                        request
                            .post(apiUrl)
                            .set('Accept', 'application/x-www-form-urlencoded')
                            .set('x-access-token', accessToken)
                            .field('data', JSON.stringify(self.invalidEventObj))
                            .expect('Content-Type', /json/)
                            .then(function(res) {
                                expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                expect(res.error).to.have.property('text');
                                var errObj = JSON.parse(res.error.text);
                                expect(errObj.message[0].msg).to.have.string(apiMessageConfig.eventManager.validationErrMessage.startDateValid);
                                done();
                            });
                    });

                    it('should return a message stating validation error - invalid end date for invalid event end date', function(done){
                        var self = this;
                        self.invalidEventObj = eventInfo;
                        self.invalidEventObj.endDate = "zX";
                        request
                            .post(apiUrl)
                            .set('Accept', 'application/x-www-form-urlencoded')
                            .set('x-access-token', accessToken)
                            .field('data', JSON.stringify(self.invalidEventObj))
                            .expect('Content-Type', /json/)
                            .then(function(res) {
                                expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                expect(res.error).to.have.property('text');
                                var errObj = JSON.parse(res.error.text);
                                expect(errObj.message[0].msg).to.have.string(apiMessageConfig.eventManager.validationErrMessage.endDateValid);
                                done();
                            });
                    });

                    it('should return a message stating validation error - start date cannot be greater than or equal to end date for start date greater than end date', function(done){
                        var self = this;
                        self.invalidEventObj = eventInfo;
                        self.invalidEventObj.startDate = "2016-02-03";
                        self.invalidEventObj.endDate = "2016-01-23";
                        request
                            .post(apiUrl)
                            .set('Accept', 'application/x-www-form-urlencoded')
                            .set('x-access-token', accessToken)
                            .field('data', JSON.stringify(self.invalidEventObj))
                            .expect('Content-Type', /json/)
                            .then(function(res) {
                                expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                expect(res.error).to.have.property('text');
                                expect(res.error.text).to.have.string(apiMessageConfig.eventManager.invalidDateCompareMessage);
                                done();
                            });
                    });
                });
            });

            describe('getAllEvents() to retrieve events', function () {
                it('should return a list of events', function(){
                    return request
                        .get(apiUrl)
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                            expect(res.body).to.have.property("dataList");
                            expect(res.body.dataList).to.be.instanceof(Array);
                            expect(res.body.dataList).to.have.length.of.at.least(2);
                            expect(res.body).to.have.property("totalItems");
                            expect(res.body.totalItems).to.have.at.least(2);
                            return Promise.resolve(res.body.dataList[0]);
                        })
                        .then(function(resultEventObj){
                            var _eventId = resultEventObj._id;
                            var _eventTitle = resultEventObj.eventTitle;
                            var _imageName = resultEventObj.imageName;
                            var _imagePath = resultEventObj.imageProperties.imagePath;

                            describe('getEventByID() to retrieve event object for ID ' + _eventId, function () {
                                it('should return an event object' , function(done){
                                    request
                                        .get(apiUrl + _eventId)
                                        .set('Accept', 'application/json')
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("_id");
                                            expect(res.body._id).to.equal(_eventId);
                                            expect(res.body).to.have.property("eventTitle");
                                            expect(res.body.eventTitle).to.equal(_eventTitle);
                                            done();
                                        });
                                });
                            });

                            describe('deleteFile() to delete image file for event ID ' + _eventId, function () {
                                var imageFilePath = encodeURIComponent(_imagePath);
                                it('should successfully delte image file and return a successfull delte message' , function(done){
                                    request
                                        .delete(apiFileDeleteUrl)
                                        .set('Accept', 'application/json')
                                        .set('x-access-token', accessToken)
                                        .query('filename=' + _imageName + '&type=image&path=' + imageFilePath)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.fileDelete.fileDelete);
                                            done();
                                        });
                                });
                            });

                            describe('updateEvent() to update existing event data for ID ' + _eventId, function(){

                                afterEach(function(){
                                    eventInfo = {
                                        eventTitle : "Rally against racial descrimination",
                                        eventDescription : "Rally organized to create awareness regarding racial discrimination",
                                        venue : "Thaiba Football Ground",
                                        venueAddress : "Thaiba, Lalitpur, Nepal",
                                        startDate : "2016-06-16",
                                        endDate : "2016-06-19",
                                        active : true
                                    };
                                });

                                describe('without access tokens', function () {
                                    it('should return a message stating that authentication is failed', function(done){
                                        request
                                            .put(apiUrl + _eventId)
                                            .set('Accept', 'application/x-www-form-urlencoded')
                                            .field('data', JSON.stringify(eventInfo))
                                            .expect('Content-Type', /json/)
                                            .then(function(res) {
                                                expect(res.statusCode).to.equal(HTTPStatus.UNAUTHORIZED);
                                                expect(res.body).to.have.property("success");
                                                expect(res.body.success).to.equal(false);
                                                expect(res.body).to.have.property("message");
                                                expect(res.body.message).to.equal(apiMessageConfig.authFail.authFailMessage);
                                                done();
                                            });
                                    });
                                });

                                describe('with valid data and access token but with previously saved data matching  event title i.e. event with same title we first saved', function () {
                                    it('should return a duplicate error message stating that event with same title as first record is previously saved', function (done) {
                                        var self = this;
                                        self.validEventObj = eventInfo;

                                        request
                                            .put(apiUrl + _eventId)
                                            .set('Accept', 'application/x-www-form-urlencoded')
                                            .set('x-access-token', accessToken)
                                            .field('data', JSON.stringify(self.validEventObj))
                                            .expect('Content-Type', /json/)
                                            .then(function (res) {
                                                expect(res.statusCode).to.equal(HTTPStatus.CONFLICT);
                                                expect(res.body).to.be.an('object');
                                                expect(res.body).to.have.property("message");
                                                expect(res.body.message).to.equal(apiMessageConfig.eventManager.alreadyExists);
                                                done();
                                            });
                                    });
                                });

                                describe('with valid data and access token but with different event title than those previously saved', function () {
                                    it('should return a successfull update message stating event updated successfully', function (done) {
                                        var self = this;
                                        self.validEventObj = eventInfo;
                                        self.validEventObj.eventTitle = "woow this is amazing title";
                                        self.validEventObj.venueAddress = "Kathmandu, Nepal";

                                        request
                                            .put(apiUrl + _eventId)
                                            .set('Accept', 'application/x-www-form-urlencoded')
                                            .set('x-access-token', accessToken)
                                            .field('data', JSON.stringify(self.validEventObj))
                                            .expect('Content-Type', /json/)
                                            .then(function (res) {
                                                expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                expect(res.body).to.be.an('object');
                                                expect(res.body).to.have.property("message");
                                                expect(res.body.message).to.equal(apiMessageConfig.eventManager.updateMessage);
                                                done();
                                            });
                                    });
                                });

                                describe('with valid data and access token  but with the same title as it is saved previously with and with image file', function () {
                                    it('should return a successfull update message stating event updated successfully', function (done) {
                                        var self = this;
                                        self.validEventObj = eventInfo;
                                        self.validEventObj.eventTitle = "woow this is amazing title";
                                        self.validEventObj.venueAddress = "Kathmandu, Nepal";

                                        request
                                            .put(apiUrl + _eventId)
                                            .set('Accept', 'application/x-www-form-urlencoded')
                                            .set('x-access-token', accessToken)
                                            .field('data', JSON.stringify(self.validEventObj))
                                            .attach('imageName', imagePathUrl[1])
                                            .expect('Content-Type', /json/)
                                            .then(function (res) {
                                                expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                expect(res.body).to.be.an('object');
                                                expect(res.body).to.have.property("message");
                                                expect(res.body.message).to.equal(apiMessageConfig.eventManager.updateMessage);
                                                done();
                                            });
                                    });
                                });



                                describe('with invalid data i.e. no event Title, no event Description, no venue,  no venue Address,  no startDate, invalid startDate or invalid endDate', function () {

                                    it('should return a message stating validation error- event title is required for empty event title', function(done){
                                        var self = this;
                                        self.invalidEventObj = eventInfo;
                                        self.invalidEventObj.eventTitle = "";
                                        request
                                            .put(apiUrl + _eventId)
                                            .set('Accept', 'application/x-www-form-urlencoded')
                                            .set('x-access-token', accessToken)
                                            .field('data', JSON.stringify(self.invalidEventObj))
                                            .expect('Content-Type', /json/)
                                            .then(function(res) {
                                                expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                                expect(res.error).to.have.property('text');
                                                var errObj = JSON.parse(res.error.text);
                                                expect(errObj.message[0].msg).to.have.string(apiMessageConfig.eventManager.validationErrMessage.eventTitle);
                                                done();
                                            });
                                    });

                                    it('should return a message stating validation error- event detail is required  for empty event desription', function(done){
                                        var self = this;
                                        self.invalidEventObj = eventInfo;
                                        self.invalidEventObj.eventDescription = "";
                                        request
                                            .put(apiUrl + _eventId)
                                            .set('Accept', 'application/x-www-form-urlencoded')
                                            .set('x-access-token', accessToken)
                                            .field('data', JSON.stringify(self.invalidEventObj))
                                            .expect('Content-Type', /json/)
                                            .then(function(res) {
                                                expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                                expect(res.error).to.have.property('text');
                                                var errObj = JSON.parse(res.error.text);
                                                expect(errObj.message[0].msg).to.have.string(apiMessageConfig.eventManager.validationErrMessage.eventDescription);
                                                done();
                                            });
                                    });

                                    it('should return a message stating validation error - start date of event is required  for empty event start date', function(done){
                                        var self = this;
                                        self.invalidEventObj = eventInfo;
                                        self.invalidEventObj.startDate = "";
                                        request
                                            .put(apiUrl + _eventId)
                                            .set('Accept', 'application/x-www-form-urlencoded')
                                            .set('x-access-token', accessToken)
                                            .field('data', JSON.stringify(self.invalidEventObj))
                                            .expect('Content-Type', /json/)
                                            .then(function(res) {
                                                expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                                expect(res.error).to.have.property('text');
                                                var errObj = JSON.parse(res.error.text);
                                                expect(errObj.message[0].msg).to.have.string(apiMessageConfig.eventManager.validationErrMessage.startDate);
                                                done();
                                            });
                                    });

                                    it('should return a message stating validation error - invalid end date for invalid event end date', function(done){
                                        var self = this;
                                        self.invalidEventObj = eventInfo;
                                        self.invalidEventObj.endDate = "zX";
                                        request
                                            .put(apiUrl + _eventId)
                                            .set('Accept', 'application/x-www-form-urlencoded')
                                            .set('x-access-token', accessToken)
                                            .field('data', JSON.stringify(self.invalidEventObj))
                                            .expect('Content-Type', /json/)
                                            .then(function(res) {
                                                expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                                expect(res.error).to.have.property('text');
                                                var errObj = JSON.parse(res.error.text);
                                                expect(errObj.message[0].msg).to.have.string(apiMessageConfig.eventManager.validationErrMessage.endDateValid);
                                                done();
                                            });
                                    });

                                    it('should return a message stating validation error - start date cannot be greater than or equal to end date for start date being greater than event end date', function(done){
                                        var self = this;
                                        self.invalidEventObj = eventInfo;
                                        self.invalidEventObj.startDate = "2016-02-03";
                                        self.invalidEventObj.endDate = "2016-01-23";
                                        request
                                            .put(apiUrl + _eventId)
                                            .set('Accept', 'application/x-www-form-urlencoded')
                                            .set('x-access-token', accessToken)
                                            .field('data', JSON.stringify(self.invalidEventObj))
                                            .expect('Content-Type', /json/)
                                            .then(function(res) {
                                                expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                                expect(res.error).to.have.property('text');
                                                expect(res.error.text).to.have.string(apiMessageConfig.eventManager.invalidDateCompareMessage);
                                                done();
                                            });
                                    });
                                });
                            });

                            describe('patchEvent() to delete event for ID ' + _eventId, function () {
                                describe('without access tokens', function () {
                                    it('should return a message stating that authentication is failed', function (done) {

                                        request
                                            .patch(apiUrl + _eventId)
                                            .set('Accept', 'application/x-www-form-urlencoded')
                                            .expect('Content-Type', /json/)
                                            .then(function (res) {
                                                expect(res.statusCode).to.equal(HTTPStatus.UNAUTHORIZED);
                                                expect(res.body).to.have.property("success");
                                                expect(res.body.success).to.equal(false);
                                                expect(res.body).to.have.property("message");
                                                expect(res.body.message).to.equal(apiMessageConfig.authFail.authFailMessage);
                                                done();
                                            });
                                    });
                                });

                                describe('with access token', function () {
                                    it('should return a successfull delete message stating event deleted successfully', function(){
                                        return request
                                            .patch(apiUrl + _eventId)
                                            .set('Accept', 'application/x-www-form-urlencoded')
                                            .set('x-access-token', accessToken)
                                            .expect('Content-Type', /json/)
                                            .then(function(res) {
                                                expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                expect(res.body).to.be.an('object');
                                                expect(res.body).to.have.property("message");
                                                expect(res.body.message).to.equal(apiMessageConfig.eventManager.deleteMessage);
                                                return Promise.resolve();
                                            })
                                            .then(function(){
                                                describe('getAllEvents() to retrieve events after record deletion', function () {
                                                    it('should not return an event list with only one record', function(done){
                                                        request
                                                            .get(apiUrl)
                                                            .set('Accept', 'application/json')
                                                            .expect('Content-Type', /json/)
                                                            .then(function(res) {
                                                                expect(res.statusCode).to.equal(HTTPStatus.OK);
                                                                expect(res.body).to.have.property("dataList");
                                                                expect(res.body.dataList).to.be.instanceof(Array);
                                                                expect(res.body.dataList).to.have.length.of.at.least(1);
                                                                expect(res.body).to.have.property("totalItems");
                                                                expect(res.body.totalItems).to.have.at.least(1);
                                                                done();
                                                            });
                                                    });
                                                });
                                            });
                                    });
                                });
                            });
                        });
                });
            });

        });
    };
})();