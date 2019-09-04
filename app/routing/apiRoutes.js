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
        var userData = req.body;
        var userScores = userData.scores;
        
        var closestMatch = {
            "name" : "",
            "photo" : "",
            "compatibility" : 99
        };

        for (var i = 0; i < friendData.length; i++) {
            var totalDifference = 0;

            for (var j = 0; j < userScores.length; j++) {
                var k = userScores[j];
                var l = friendData[i].scores[j];
                function diff(a, b) {
                    return Math.abs(a - b);
                };
                totalDifference += diff(k, l);
            }

            if (totalDifference < closestMatch.compatibility) {
                closestMatch.name = friendData[i].name;
                closestMatch.photo = friendData[i].photo;
                closestMatch.compatibility = totalDifference;
            }

        };
        res.json(closestMatch);
    });

    
}