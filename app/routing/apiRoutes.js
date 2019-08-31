var friendData = require("../data/friends");
var path = require("path");

module.exports = function(app) {

    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });

    app.get("/api/friends", function(req, res) {
        res.json(friendData);
    });

    app.post("/api/friends", function(req, res) {
        var surveyResults = req.body;
        var userScores = surveyResults.scores;
        console.log(userScores);
        console.log("hello");
    });

    
}