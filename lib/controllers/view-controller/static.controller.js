
module.exports = function (req) {
    return {
        blogHostUrl: req.protocol + "://" + req.get('host') + "/blog/",
        hostUrl: req.protocol + "://" +  req.get('host')
    }
};
