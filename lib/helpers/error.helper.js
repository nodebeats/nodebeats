(function (errorHelper) {

    'use strict';

    errorHelper.formatErrorObj = function (err) {
        var formatError = err.toString();
        var obj = JSON.parse(
            JSON.stringify(
                formatError
                    .substring(
                        formatError.indexOf("{")
                    )
            )
        );
        return JSON.parse(obj);
    };
    
    errorHelper.outputJSONErrorMessage = function (err, next) {
        try {
            var obj = errorHelper.formatErrorObj(err);
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
            if(typeof err === 'string'){
                errorObj.errorMessage = err;
                errorObj.errorStack = err;
                errorObj.errorType = '';
            }else{
                errorObj.errorMessage = err.message;
                errorObj.errorStack = err.stack;
                errorObj.errorType = err.name;
            }
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