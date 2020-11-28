const Schema = require('mongoose').Schema;


exports.UrlSchema = new Schema({
    originUrl: {type: String, required: true},
    shortUrl: {type: String, index: true},
}, { collection : 'urls' });