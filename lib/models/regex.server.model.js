    'use strict';
    module.exports={
        'emailRegex' : /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        'stringRegex' : /[a-zA-Z]/,
        'phoneNumberRegex' : /^\+(?:[0-9] ?){6,14}[0-9]$/,
        'validHostNameRegex' : /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/,
        'validPortNumber' : /(6553[0-5]|655[0-2][0-9]\d|65[0-4](\d){2}|6[0-4](\d){3}|[1-5](\d){4}|[1-9](\d){0,3})/,
        'validLongitude':/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)/,
        'validLatitude':/\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/,
        'validInteger' : /^[1-9]\d*$/
    };