var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    Excuse = require('../models/excuse');

// POST - excuses
router.post("/submitExcuse", function(req, res) {
    var excuse = new Excuse();
    excuse.title = req.body.title;
    excuse.postMaker = req.body.postMaker;
    excuse.users_id = req.body.user_id;
    excuse.excuse = req.body.excuse;
    console.log("posting excuse");
    excuse.save(function(err, savedExcuse) {
        if (err) {
            console.log(err);
            return res.status(500).send();
        }
        return res.status(200).send();
    });
});

// GET - excuses
//get the list of excuse posts from the database
router.get("/getExcuses", function(req, res) {
    Excuse.find({}, function(err, excuses) {
        var excuseMap = {};

        excuses.forEach(function(excuse) {
            excuseMap[excuse._id] = excuse;
        });

        res.json(excuseMap);
    });
});

module.exports = router;
