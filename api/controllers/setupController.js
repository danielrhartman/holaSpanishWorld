var Lessons = require('../models/lessonModel');
var Users = require('../models/userModel');

module.exports = function(app) {

    app.get('/api/setupLessons', function(req, res) {
        var d = new Date();

        //TODO fix with moment.js?
        var currentHour = d.getTime() - (d.getMinutes() * 60 * 1000) - (d.getSeconds() * 1000) - (d.getMilliseconds());

        var adminId = '';
        var teachId = '';
        var userId = '';

        var admin = Users.findOne().where('email').equals('admin@holaspanishworld.com')
            .find(function(err, results) {
                if(err) {
                    res.json({error: 'no admin'});
                } else {
                    JSONresults = JSON.stringify(results[0]);
                    admin = JSON.parse(JSONresults);
                    adminId = admin._id;
                }
        });

        var teach = Users.findOne().where('email').equals('teach@holaspanishworld.com')
            .find(function(err, results) {
                if(err) {
                    res.json({error: 'no teach'});
                } else {
                    JSONresults = JSON.stringify(results[0]);
                    teach = JSON.parse(JSONresults);
                    teachId = teach._id;
                }
        });
    
        var user = Users.findOne().where('email').equals('user@holaspanishworld.com')
            .find(function(err, results) {
                if(err) {
                    res.json({error: 'no user'});
                } else {
                    JSONresults = JSON.stringify(results[0]);
                    user = JSON.parse(JSONresults);
                    userId = user._id;
                }
        });

        Promise.all([teach, user, admin]).then(function() {
            console.log('admin: ' + adminId);
            console.log('teacher: ' + teachId);
            console.log('user: ' + userId);
            var dummyLessons = [
                {
                    start: currentHour + (15 * 60 * 60 * 1000),
                    end: currentHour + (16 * 60 * 60 * 1000),
                    title: 'Private',
                    instructor: adminId,
                    student: userId,
                    description: 'Another dummy lesson for seed data.'
                },               {
                    start: currentHour + (2 * 60 * 60 * 1000),
                    end: currentHour + (3 * 60 * 60 * 1000) - 1,
                    title: 'Group',
                    instructor: adminId,
                    description: 'A dummy lesson for seed data.'
                },
                {
                    start: currentHour + (24 * 60 * 60 * 1000),
                    end: currentHour + (25 * 60 * 60 * 1000) - 1,
                    title: 'Group',
                    instructor: teachId,
                    description: 'A third dummy lesson for seed data.'
                }
            ]
            Lessons.create(dummyLessons, function(err, results) {
                res.send(results);
            });
        });

    });

}
