var friendsArray = require("../data/friends");
var _ = require('lodash');
var scoreArray = [];


module.exports = function(app){
    app.get("/api/friends", function(req,res){
        res.json(friendsArray);
    });

    app.post("/api/friends", function(req, res) {
       
        var score = req.body;
        // console.log(score);
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
            scores:scoreArray,
            comparisonScore:0
        }
        // console.log(newFriend);
        var score1 = newFriend.scores;
        console.log(score1);
        // friendsArray.push(newFriend);
       
        // var sumArray = [];

        for (var i=0; i<friendsArray.length;i++){
            //retrieving an array of 
            var score2 = friendsArray[i].scores; 
            // console.log("I'm an array score " + score2);
            //push new aray and array iteration to a function to calculate the absolute difference in score for each question
            var currentScore = absSubtract(score1,score2);
            // console.log(currentScore);

            //this variable adds up all numbers in an array to produce the final number
            var totalDifference = currentScore.reduce((a, b) => a + b, 0);
            console.log(totalDifference);
            console.log("****************");
            //how do I update each comparison value? 

            friendsArray[i].comparisonScore = totalDifference;
            // console.log(totalDifference);
        }

        //sort the array in ascending order 
        friendsArray.sort(function(a, b) {
            return a.comparisonScore - b.comparisonScore;
        });

        //****** */
        //Do something with a modal to isplay the name nd picture of the friend object with index 0 
        //******** */
        console.log(friendsArray);
        console.log("I'm your match " + friendsArray[0].name);
        resetComparisonScore();
              

        function resetComparisonScore(){
            for (var j=0; j<friendsArray.length;j++){
            friendsArray[j].comparisonScore = 0;
            }
        }

        // console.log(friendsArray);
          
     
        function absSubtract(arr1, arr2) {
            // console.log("I was called");
            return arr2.map(function (el, i) {
              return Math.abs(el - arr1[i]);
            });
        }

       
        res.send([friendsArray[0].name,friendsArray[0].photo]);
            
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

