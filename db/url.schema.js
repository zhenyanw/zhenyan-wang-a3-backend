const Schema = require('mongoose').Schema;


exports.UrlSchema = new Schema({
    // mongoose automically gives this an _id attribute of ObjectId
    originUrl: {type: String, required: true},
    unbrandedUrl: {type: String, required: true, index: true},
    brandedUrl: {type: String, index: true},
// this explicitly declares what collection we're using
}, { collection : 'urls' });