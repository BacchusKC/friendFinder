const friendsData = require("../data/friends");

module.exports = function (app) {

    //All friends
    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });

    //Add friend and find match
    app.post("/api/friends", function (req, res) {
        friendsData.push(req.body);
        let match = []; //Current match
        let currentDiff = 50;
        //loop through stored people
        for (i = 0; i < friendsData.length - 1; i++) { 
            let total = 0;
            //loop to compare responses to current user
            for (j = 0; j < req.body.responses.length; j++) { 
                let temp = 0;
                temp = parseInt(req.body.responses[j]) - parseInt(friendsData[i].responses[j]);
                total += Math.abs(temp);
            };
            if (total < currentDiff) {
                currentDiff = total;
                match = friendsData[i];
            };
        };
        res.json(match);
    });
};