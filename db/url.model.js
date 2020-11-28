const mongoose = require("mongoose");
const shortid = require('shortid');
const UrlSchema = require('./url.schema').UrlSchema;

const UrlModel = mongoose.model("Url", UrlSchema);

function addUrl(url) {
    if (url.shortUrl === null) {
        url.shortUrl = shortid.generate()
    }
    return UrlModel.create(url);
}

function findByShortUrl(shortUrl) {
    return UrlModel.findOne({shortUrl: shortUrl}).exec();
}

function findByOriginUrl(originUrl) {
    return UrlModel.findOne({originUrl: originUrl}).exec();  
}

function deleteByShortUrl(shortUrl) {
    return UrlModel.deleteOne({shortUrl: shortUrl}).exec();
}

function updateOriginUrl(shortUrl, originUrl) {
    return UrlModel.findOneAndUpdate({shortUrl: shortUrl}, {originUrl: originUrl}, {new: true}).exec();
}

module.exports = {
    addUrl,
    findByShortUrl,
    findByOriginUrl,
    deleteByShortUrl,
    updateOriginUrl,
};