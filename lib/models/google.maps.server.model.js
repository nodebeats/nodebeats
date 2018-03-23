(function () {

    'use strict';

    var mongoose = require('mongoose'),
        regex = require('./regex.server.model'),
        Schema = mongoose.Schema,
        mapTypes = ['SATELLITE','ROADMAP','HYBRID','TERRAIN'];

    var googleMapsSchema = new Schema({
        placeName: {
            type:String,
            required : true,
            trim: true
        },
        longitude:{
            type:Number,
            trim: true,
            required : true,
            default: 0,
            validate: {
                validator: function(longitudeVal) {
                    if(longitudeVal){
                        return regex.validLongitude.test(longitudeVal);
                    }else{
                        return true;
                    }

                },
                message: '{VALUE} is not a valid Longitude!'
            }
        },
        latitude:{
            type:Number,
            trim: true,
            required : true,
            default: 0,
            validate: {
                validator: function(latitudeVal) {
                    if(latitudeVal){
                        return regex.validLatitude.test(latitudeVal);
                    }else{
                        return true;
                    }
                },
                message: '{VALUE} is not a valid Latitude!'
            }
        },
        scrollWheel:{
            type:Boolean,
            default:false
        },
        zoom:{
            type:Number,
            trim: true,
            required : true,
            default:8,
            validate: {
                validator: function(zoomVal) {
                    if(zoomVal){
                        return zoomVal>0 && zoomVal<19;
                    }else{
                        return true;
                    }
                },
                message: '{VALUE} is not a valid zoom value!'
            }
        },
        mapType:{
            type:String,
            trim: true,
            required : true,
            enum: mapTypes,
            default : 'ROADMAP'
        },
        showMarker:{
            type:Boolean,
            default:true
        },
        markerTitle:{
            type:String,
            required : true,
            trim: true
        },
        googleMapsApiKey:{
            type:String,
            trim: true
        },
        addedBy:{
            type:String,
            trim: true
        },
        addedOn:{
            type: Date,
            default: Date.now
        },
        updatedBy:{
            type:String,
            trim: true
        },
        updatedOn:{
            type: Date
        }
    });

    module.exports = mongoose.model('GoogleMaps', googleMapsSchema, 'GoogleMaps');

})();