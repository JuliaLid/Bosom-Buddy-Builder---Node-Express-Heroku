var friendsArray = require("../data/friends");
var _ = require('lodash');
var scoreArray = [];


module.exports = function(app){
    app.get("/api/friends", function(req,res){
        res.json(friendsArray);
    });

    app.post("/api/friends", function(req, res) {
       
        var score = req.body;
        var number1 = parseInt(score.question1);
        var number2 = parseInt(score.question2);
        var number3 = parseInt(score.question3);
        var number4 = parseInt(score.question4);
        var number5 = parseInt(score.question5);
        var number6 = parseInt(score.question6);
        var number7 = parseInt(score.question7);
        var number8 = parseInt(score.question8);
        var number9 = parseInt(score.question9);
        var number10 = parseInt(score.question10);
        scoreArray.push(number1);
        scoreArray.push(number2);
        scoreArray.push(number3);
        scoreArray.push(number4);
        scoreArray.push(number5);
        scoreArray.push(number6);
        scoreArray.push(number7);
        scoreArray.push(number8);
        scoreArray.push(number9);
        scoreArray.push(number10);
      

        var newFriend = {
            name:score.name,
            photo:score.photo,
            scores:scoreArray
        }

        friendsArray.push(newFriend);
        console.log(friendsArray);

        // res.send(newFriend);
            
         // console.log(typeof score);

        // console.log(Object.values(score));

        // _.forIn(score, function(value, key) {
        //     console.log(value);
        //     if(typeof value !== "string"){
        //         console.log("I'm working");
        //         scoreArray.push(value);
           
        //    }
               
        // });
        // console.log(scoreArray);

        // for (let [key, value] of Object.entries(score))
        //     if( value != NaN) {
        //         scoreArray.push(value);
        //     }

        //     console.log(scoreArray);
        //  console.log(`${key}: ${value}`);

        // Object.keys(score).forEach(function(key) {
        //     console.log(key);
        // });

    
    });
};

