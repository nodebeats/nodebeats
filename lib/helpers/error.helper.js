/**
 * Created by lakhe on 6/5/16.
 */

(function (errorHelper) {

    'use strict';
    
    errorHelper.outputJSONErrorMessage = function (err, next) {
        try {

            var formatError = err.toString();
            var obj ={};
            obj = JSON.parse(
                JSON.stringify(
                    formatError
                        .substring(
                            formatError.indexOf("{")
                        )
                )
            );
            obj = JSON.parse(obj);
            return {
                statusCode:obj.statusCode,
                message: obj.message
            };
        }
        catch(err) {
            return  next(err);
        }
    };

    errorHelper.getErrorObj = function (err, next) {
        try {

            var errorObj = {
                errorMessage : '',
                errorStack : '',
                errorType : ''
            };
            errorObj.errorMessage = err.message;
            errorObj.errorStack = err.stack;
            errorObj.errorType = err.name;
            return errorObj;
        }
        catch(err) {
            return  next(err);
        }
    };

    errorHelper.customErrorResponse = function (res, cancellationErr, next) {
        try {

            var errorMessage = errorHelper.outputJSONErrorMessage(cancellationErr, next);
            res.status(errorMessage.statusCode);
            res.json({
                status: errorMessage.statusCode,
                message: errorMessage.message
            });
        }
        catch(err) {
            return  next(err);
        }
    };

})(module.exports);