var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var lessonSchema = new Schema({
    start: Date,
    end: Date,
    title: String,
    instructor: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    description: String
});

module.exports = mongoose.model('Lessons', lessonSchema);
