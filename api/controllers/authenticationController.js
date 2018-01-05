var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.register = function(req, res) {
    console.log('registering');
    var user = new User();

    user.name = req.body.name;
    user.email = req.body.email;
    user.type = 'user';
    user.credits = 0;

    if(req.body.password == ''){
        var message = "Registration Error: Password is a required field";
        console.log(message);
        res.status(400);
        res.json({
            "error": message
        });
        return;
    }

    user.setPassword(req.body.password);

    user.save(function(err) {
        if(err) {
            console.log(JSON.stringify(err, null, '\t'));
            if(err.errors.email && err.errors.email.kind == 'required') {
                var message = "Registration Error: Email is a required field";
                console.log(message);
                res.status(400);
                res.json({
                    "error": message
                });
            } else if(err.code == '11000') {
                var message = "Registration Error: email already associated with existing account"; 
                console.log(message);
                res.status(400);
                res.json({
                    "error": message
                });
            }
        } else {
            var token;
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token": token
            });
        }
    });
};

module.exports.login = function(req, res) {
    passport.authenticate('local', function(err, user, info) {
        var token;

        if(err) {
            res.status(404).json(err);
            return;
        }

        if(user) {
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token": token
            });
        } else {
            res.status(401).json(info);
        }
    })(req, res);
};
