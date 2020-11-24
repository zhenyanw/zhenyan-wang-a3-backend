const mongoose = require("mongoose");
// Recall how exports work in Node.js?
const UrlSchema = require('./url.schema').UrlSchema;

const UrlModel = mongoose.model("Url", UrlSchema);

function addUrl(url) {
    return UrlModel.create(url);
}

function findBrandedUrl(brandedUrl) {
    return UrlModel.exists({brandedUrl: brandedUrl}).exec();
}

function findByBrandedUrl(brandedUrl) {
    return UrlModel.findOne({brandedUrl: brandedUrl}).exec();
}

function findByUnbrandedUrl(unbrandedUrl) {
    return UrlModel.findOne({unbrandedUrl: unbrandedUrl}).exec();
    
}

function findByShortUrl(url) {
    if (findBrandedUrl(url)) {
        return findByBrandedUrl(url);
    }
    return findByUnbrandedUrl(url);
}

function getAllUrl() {
    return UrlModel.find().exec();
}


// Make sure to export a function after you create it!
module.exports = {
    addUrl,
    findBrandedUrl,
    findByBrandedUrl,
    findByUnbrandedUrl,
    findByShortUrl,
    getAllUrl,
};