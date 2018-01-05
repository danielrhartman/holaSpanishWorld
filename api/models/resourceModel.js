var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var resourceSchema = new Schema({
    created:    Date,
    title:      String,
    link:       String,
    text:       Array,
    image:      String,
    keywords:   Array
});

module.exports = mongoose.model('Resource', resourceSchema);
