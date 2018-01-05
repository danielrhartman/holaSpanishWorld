var Users = require('../models/userModel');

module.exports.readOne = function(req, res) {
    if(!req.user._id) {
        message = "UnauthorizedError: private profile";
        console.log(message);
        res.status(401).json({
            "message": message
        });
    } else {
        //TODO add error handling for if user is not found
        Users
            .findById(req.user._id)
            .exec(function(err, user) {
                res.status(200).json(user);
            });
    }
};

module.exports.update = function(req, res) {
    console.log("Update a user: " + JSON.stringify(req.body));
    if(req.user._id){
        Users.findOneAndUpdate({_id: req.user._id}, req.body, {upsert:false}, function(err, doc) {
            if(err){
                console.log(JSON.stringify(err));
                res.status(404);
                res.json({
                    error: err
                });
            } else {
                console.log("returned doc: " + JSON.stringify(doc));
                res.status(200);
            }

        });
        //Users.where({_id: req.user._id}).update({})
    } else {
        
    }
};

module.exports.readInstructors = function(req, res) {
    console.log("getinstructors");
    Users.find()
        .where('type').equals('instructor')
        .find(function(err, results) {
                if(err){
                    console.log('error: ' + err);
                    res.status(400);
                    res.json({error: err});
                }else{

                    var instructors = [];
                    results.forEach(function(result) {
                        instructors.push({
                            id: result._id,
                            name: result.name,
                            email: result.email
                        });
                    });


                    //jsonResults = JSON.stringify(results);
                    //instructors = JSON.parse(jsonResults);
                    
                    res.status(200);
                    res.send(instructors);
                }
    });
}

