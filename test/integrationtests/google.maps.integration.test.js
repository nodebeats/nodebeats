(function(){
    "use strict";

    var apiMessageConfig = require('../../lib/configs/api.message.config'),
        Promise = require("bluebird"),
        HTTPStatus = require('http-status');

    module.exports = function(expect, request, accessToken) {
        describe('Google Maps Configuration Setting Integration test', function(){

            this.timeout(4000);
            var apiUrl = '/api/maps/';
            var googleMapsSettingObj;
            
            beforeEach(function () {
                googleMapsSettingObj = {
                    placeName : "Lalitpur, Nepal",
                    longitude : "88.36",
                    latitude : "81.23",
                    scrollWheel : "false",
                    zoom : "12",
                    mapType : "ROADMAP",
                    showMarker : "true",
                    markerTitle : "Map for Lalitpur, Nepal",
                    googleMapsApiKey : "5d256e52f5g22b558y9yj22@ieki"
                };
            });

            describe('getGoogleMapsConfig() to retrieve google maps configuration data', function () {
                it('should return an empty response ie. no google maps configuration data', function(done){
                    request
                        .get(apiUrl)
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.NOT_FOUND);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.googleMaps.notFound);
                            done();
                        });
                });
            });

            describe('postGoogleMapsConfig() to save google maps configuration object without access tokens', function () {
                it('should return a message stating that authentication is failed', function(done){
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .send(googleMapsSettingObj)
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

            describe('postGoogleMapsConfig()  to save google maps configuration object with invalid data i.e. no place name, no longitude, no latitude, no zoom , no maptype, no marker title, invalid longitude, invalid latitude, invalid zoom and finally wrong maptype ', function () {
                afterEach(function(){
                    googleMapsSettingObj = {
                        placeName : "Lalitpur, Nepal",
                        longitude : "88.36",
                        latitude : "81.23",
                        scrollWheel : "false",
                        zoom : "12",
                        mapType : "ROADMAP",
                        showMarker : "true",
                        markerTitle : "Map for Lalitpur, Nepal",
                        googleMapsApiKey : "5d256e52f5g22b558y9yj22@ieki"
                    };
                });

                it('should return a message stating validation error - place name is required for empty place name', function(done){
                    var self = this;
                    self.invalidgoogleMapsConfig = googleMapsSettingObj;
                    self.invalidgoogleMapsConfig.placeName = "";
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .send(self.invalidgoogleMapsConfig)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.googleMaps.validationErrMessage.placeName);

                            done();
                        });
                });

                it('should return a message stating validation error - longitude is required  for empty longitude value ', function(done){
                    var self = this;
                    self.invalidgoogleMapsConfig = googleMapsSettingObj;
                    self.invalidgoogleMapsConfig.longitude = "";
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .send(self.invalidgoogleMapsConfig)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.googleMaps.validationErrMessage.longitude);

                            done();
                        });
                });

                it('should return a message stating validation error - latitude is required for empty latitude value', function(done){
                    var self = this;
                    self.invalidgoogleMapsConfig = googleMapsSettingObj;
                    self.invalidgoogleMapsConfig.latitude = "";
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .send(self.invalidgoogleMapsConfig)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.googleMaps.validationErrMessage.latitude);

                            done();
                        });
                });

                it('should return a message stating validation error - zoom is required  for empty zoom value', function(done){
                    var self = this;
                    self.invalidgoogleMapsConfig = googleMapsSettingObj;
                    self.invalidgoogleMapsConfig.zoom = "";
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .send(self.invalidgoogleMapsConfig)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.googleMaps.validationErrMessage.zoom);

                            done();
                        });
                });

                it('should return a message stating validation error - map Type is required for empty map type', function(done){
                    var self = this;
                    self.invalidgoogleMapsConfig = googleMapsSettingObj;
                    self.invalidgoogleMapsConfig.mapType = "";
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .send(self.invalidgoogleMapsConfig)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.googleMaps.validationErrMessage.mapType);

                            done();
                        });
                });

                it('should return a message stating validation error - marker Title is required for empty marker title', function(done){
                    var self = this;
                    self.invalidgoogleMapsConfig = googleMapsSettingObj;
                    self.invalidgoogleMapsConfig.markerTitle = "";
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .send(self.invalidgoogleMapsConfig)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.googleMaps.validationErrMessage.markerTitle);

                            done();
                        });
                });

                it('should return a message stating validation error - invalid map type for invalid maptype i.e map types other than SATELLITE, ROADMAP, HYBRID, TERRAIN', function(done){
                    var self = this;
                    self.invalidgoogleMapsConfig = googleMapsSettingObj;
                    self.invalidgoogleMapsConfig.mapType = "ewe";
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .send(self.invalidgoogleMapsConfig)
                        .expect('Content-Type', 'text/html; charset=utf-8')
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.INTERNAL_SERVER_ERROR);
                            expect(res.error).to.have.property('text');
                            expect(res.error.text).to.have.string('ValidationError: GoogleMaps validation failed');

                            done();
                        });
                });

                it('should return a message stating validation error - invalid longitude for invalid longitude value', function(done){
                    var self = this;
                    self.invalidgoogleMapsConfig = googleMapsSettingObj;
                    self.invalidgoogleMapsConfig.longitude = "ewe";
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .send(self.invalidgoogleMapsConfig)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.googleMaps.validationErrMessage.longitudeValid);

                            done();
                        });
                });

                it('should return a message stating validation error - invalid latitude for invalid latitude value', function(done){
                    var self = this;
                    self.invalidgoogleMapsConfig = googleMapsSettingObj;
                    self.invalidgoogleMapsConfig.latitude = "ewe";
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .send(self.invalidgoogleMapsConfig)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.googleMaps.validationErrMessage.latitudeValid);

                            done();
                        });
                });

                it('should return a message stating validation error - invalid zoom for invalid zoom value i.e other than integer valule', function(done){
                    var self = this;
                    self.invalidgoogleMapsConfig = googleMapsSettingObj;
                    self.invalidgoogleMapsConfig.zoom = "ewe";
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .send(self.invalidgoogleMapsConfig)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                            expect(res.error).to.have.property('text');
                            var errObj = JSON.parse(res.error.text);
                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.googleMaps.validationErrMessage.zoomValid);

                            done();
                        });
                });
            });

            describe('postGoogleMapsConfig()  to save google maps configuration object with access tokens and valid data', function () {
                it('should return a successfull save message stating google maps configuration saved successfully', function(done){
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .send(googleMapsSettingObj)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.googleMaps.saveMessage);
                            done();
                        });
                });
            });

            describe('postGoogleMapsConfig() to save google maps configuration object with access tokens after saving another google maps setting data already', function () {
                it('should return a message stating duplicates are not allowed and once data is saved, user are permitted to update only', function(done){
                    request
                        .post(apiUrl)
                        .set('Accept', 'application/x-www-form-urlencoded')
                        .set('x-access-token', accessToken)
                        .send(googleMapsSettingObj)
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.CONFLICT);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("message");
                            expect(res.body.message).to.equal(apiMessageConfig.googleMaps.alreadyExists);
                            done();
                        });
                });
            });

            describe('getGoogleMapsConfig()  to retrieve google maps configuration data', function () {
                it('should return a google maps setting configuration in object', function(){
                    return request
                        .get(apiUrl)
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .then(function(res) {
                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property("zoom");
                            expect(res.body.zoom).to.equal(12);
                            expect(res.body).to.have.property("scrollWheel");
                            return Promise.resolve(res.body);
                        })
                        .then(function(googleMapsObj){
                            var _googleMapsSettingId = googleMapsObj._id;
                            var _placeName = googleMapsObj.placeName;

                            describe('getGoogleMapsConfigByID()  to retrieve google maps configuration object without access token for ID ' + _googleMapsSettingId, function () {
                                it('should return a message stating that authentication is failed', function(done){
                                    request
                                        .get(apiUrl + _googleMapsSettingId)
                                        .set('Accept', 'application/json')
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

                            describe('getGoogleMapsConfigByID()  to retrieve google maps configuration object for ID ' + _googleMapsSettingId, function () {
                                it('should return a google map setting configuration object', function(done){
                                    request
                                        .get(apiUrl + _googleMapsSettingId)
                                        .set('Accept', 'application/json')
                                        .set('x-access-token', accessToken)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("_id");
                                            expect(res.body._id).to.equal(_googleMapsSettingId);
                                            expect(res.body).to.have.property("placeName");
                                            expect(res.body.placeName).to.equal(_placeName);
                                            done();
                                        });
                                });
                            });

                            describe('updateGoogleMapsConfig() to update existing configuration setting object  for ID ' + _googleMapsSettingId +' without access tokens', function () {
                                it('should return a message stating that authentication is failed', function(done){
                                    request
                                        .put(apiUrl + _googleMapsSettingId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .send(googleMapsSettingObj)
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

                            describe('updateGoogleMapsConfig()  to update existing configuration setting object  with invalid data i.e. no place name,  no latitude, no zoom and finally wrong maptype ', function () {
                                afterEach(function(){
                                    googleMapsSettingObj = {
                                        placeName : "Lalitpur, Nepal",
                                        longitude : "88.36",
                                        latitude : "81.23",
                                        scrollWheel : "false",
                                        zoom : "12",
                                        mapType : "ROADMAP",
                                        showMarker : "true",
                                        markerTitle : "Map for Lalitpur, Nepal",
                                        googleMapsApiKey : "5d256e52f5g22b558y9yj22@ieki"
                                    };
                                });

                                it('should return a message stating validation error - place name is required for empty place name', function(done){
                                    var self = this;
                                    self.invalidgoogleMapsConfig = googleMapsSettingObj;
                                    self.invalidgoogleMapsConfig.placeName = "";
                                    request
                                        .put(apiUrl + _googleMapsSettingId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .send(self.invalidgoogleMapsConfig)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                            expect(res.error).to.have.property('text');
                                            var errObj = JSON.parse(res.error.text);
                                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.googleMaps.validationErrMessage.placeName);

                                            done();
                                        });
                                });

                                it('should return a message stating validation error - longitude is required for empty longitude value', function(done){
                                    var self = this;
                                    self.invalidgoogleMapsConfig = googleMapsSettingObj;
                                    self.invalidgoogleMapsConfig.longitude = "";
                                    request
                                        .put(apiUrl + _googleMapsSettingId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .send(self.invalidgoogleMapsConfig)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                            expect(res.error).to.have.property('text');
                                            var errObj = JSON.parse(res.error.text);
                                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.googleMaps.validationErrMessage.longitude);

                                            done();
                                        });
                                });

                                it('should return a message stating validation error - invalid map type for invalid map type data', function(done){
                                    var self = this;
                                    self.invalidgoogleMapsConfig = googleMapsSettingObj;
                                    self.invalidgoogleMapsConfig.mapType = "ewe";
                                    request
                                        .put(apiUrl + _googleMapsSettingId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .send(self.invalidgoogleMapsConfig)
                                        .expect('Content-Type', 'text/html; charset=utf-8')
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.INTERNAL_SERVER_ERROR);
                                            expect(res.error).to.have.property('text');
                                            expect(res.error.text).to.have.string('ValidationError: GoogleMaps validation failed');

                                            done();
                                        });
                                });

                                it('should return a message stating validation error - zoom is required for empty zoom value', function(done){
                                    var self = this;
                                    self.invalidgoogleMapsConfig = googleMapsSettingObj;
                                    self.invalidgoogleMapsConfig.zoom = "";
                                    request
                                        .put(apiUrl + _googleMapsSettingId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .send(self.invalidgoogleMapsConfig)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.BAD_REQUEST);
                                            expect(res.error).to.have.property('text');
                                            var errObj = JSON.parse(res.error.text);
                                            expect(errObj.message[0].msg).to.have.string(apiMessageConfig.googleMaps.validationErrMessage.zoom);
                                            done();
                                        });
                                });
                            });

                            describe('updateGoogleMapsConfig()  to update existing configuration setting object  for ID ' + _googleMapsSettingId +' with access tokan and valid data', function () {
                                it('should return a successfull update message stating that google maps configuration setting object updated successfully', function(done){
                                    var self = this;
                                    self.validgoogleMapsConfig = googleMapsSettingObj;
                                    self.validgoogleMapsConfig.placeName = "Mustang";
                                    self.validgoogleMapsConfig.zoom = "10";

                                    request
                                        .put(apiUrl + _googleMapsSettingId)
                                        .set('Accept', 'application/x-www-form-urlencoded')
                                        .set('x-access-token', accessToken)
                                        .send(self.validgoogleMapsConfig)
                                        .expect('Content-Type', /json/)
                                        .then(function(res) {
                                            expect(res.statusCode).to.equal(HTTPStatus.OK);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property("message");
                                            expect(res.body.message).to.equal(apiMessageConfig.googleMaps.updateMessage);
                                            done();
                                        });
                                });
                            });
                        });
                });
            });

        });
    };
})();