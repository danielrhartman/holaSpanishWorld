var Resources = require('../models/resourceModel');
var bodyParser = require('body-parser');

module.exports.add = function(req, res) {

    var newResource = Resources({
        created:    req.body.created,
        title:      req.body.title,
        link:       req.body.link,
        text:       req.body.text,
        image:      req.body.image,
        keywords:   req.body.keywords
    });

    newResource.save(function(err, resource) {
            if(err){
                console.log(JSON.stringify(err));
                res.send(err);
            }
            res.status(200);
            res.send(resource);
    });
}

module.exports.readType = function(req, res) {

    var type = req.params.type;
    Resources
        .find({})
        .where('type').equals(type)
        .find(function(err, results) {
            if(err){
                console.log(JSON.stringify(err));
                res.status(400);
                res.json({error: err});
            }else{
                if(results.length == 0){
                    res.status(404);
                    res.json({error: 'No ' + type + ' resources found.'});
                }else{
                    res.status(200);
                    res.send(results);
                }
            }
        });
}

module.exports.read = function(req, res){

    var count = req.params.count;

    Resources
        .find()
        .sort({'created': -1})
        .limit(parseInt(count))
        .find(function(err, results) {
            if(err){
                console.log(JSON.stringify(err));
                res.status(400);
                res.json({error: err});
            }else{
                if(results.length == 0){
                    res.status(404);
                    res.json({error: 'none found.'});
                }else{
                    res.status(200);
                    res.send(results);
                }
            }
        });
}
