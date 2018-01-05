var Lessons = require('../models/lessonModel');
var Users = require('../models/userModel');
var bodyParser = require('body-parser');

module.exports.readGroup = function(req, res) {
    Lessons.find()
        .where('title').equals('Group')
        .populate('instructor')
        .find(function(err, results) {
        if(err) throw err;

        //get the simplified object from the object Mongoose returns
        jsonResults = JSON.stringify(results);
        lessons = JSON.parse(jsonResults);

        for(lesson of lessons){
//            lesson.color = 'Green';
            lesson.id = lesson._id;
        }

        res.send(lessons);
    });
}

module.exports.add = function(req, res) {
    console.log(req.body);
//    Users.
    var newLesson = Lessons({
        start:          req.body.start,
        end:            req.body.end,
        title:          req.body.type,
        instructor:     req.body.instructor,
        description:    req.body.description
    });
    newLesson.save(function(err, lesson) {
        if(err) throw err;
        res.send('success');
    });
}

module.exports.readNextGroupLesson = function(req, res) {
    //console.log("next lesson requested");
    Lessons
        .findOne({})
        .where('title').equals('Group')
        .where('start').gt(new Date())
        .populate('instructor')
        .sort('start')
        .find(function(err, results) {
            if(err){
                console.log(JSON.stringify(err));
                res.status(400);
                res.json({error: err});
            } else {
                if(results.length == 0){
                    res.status(404);
                    res.json({error: 'No future group lesson found'});
                } else {
                    //console.log(JSON.stringify(results));
                    res.status(200);
                    res.send(results[0]);
                }
            }
     });
}

module.exports.readUserPrivateLessons = function(req, res) {

    if(!req.user._id){

    } else {
        Lessons
            .find()
            .where('student').equals(req.user._id)
            .where('end').gt(Date.now())
            .populate('instructor')
            .populate('student')
            .find(function(err, results) {
                if(err) {
                    console.log(JSON.stringify(err));
                    res.status(400);
                    res.json({error: err});
                } else {
                    res.status(200);
                    res.send(results);
                }
        });
    }

}

module.exports.readOpenPrivateLessons = function(req, res) {

    Lessons
        .find()
        .where('title').equals('Private')
        .where('student').equals(null)
        .populate('instructor')
        .find(function(err, results) {
            if(err) {
                console.log(JSON.stringify(err));
                res.status(400);
                res.json({error: err});
            } else {
                res.status(200);
                res.send(results);
            }
    });
}
