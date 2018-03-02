var friendsArray = require("../data/friends");
var _ = require('lodash');


module.exports = function(app){
    app.get("/api/friends", function(req,res){
        res.json(friendsArray);
    });

    app.post("/api/friends", function(req, res) {
      
        var score = req.body;
        var arrayOfScores = convertToArray(score);
        var newFriend = {
            name:score.name,
            photo:score.photo,
            scores:arrayOfScores,
            comparisonScore:0
        };
        // console.log(newFriend);
        var score1 = newFriend.scores;
       
        for (var i=0; i<friendsArray.length;i++){
            //assign a variable to the array of scores of a current buddy
            var score2 = friendsArray[i].scores; 
            //call a function to calculate the absolute difference in score for each question using new score array and current buddy's score array as arguments
            var currentScore = absoluteSubtract(score1,score2);
            // console.log(currentScore);

            //declare variable that adds up all numbers in an array to produce the final indicating the difference in scores
            var totalDifference = currentScore.reduce((a, b) => a + b, 0);
            // console.log(totalDifference);
          
            friendsArray[i].comparisonScore = totalDifference;
            // console.log(totalDifference);
        }

        //sort the array in ascending order with the lowest difference score being at index [0]
        friendsArray.sort(function(a, b) {
            return a.comparisonScore - b.comparisonScore;
        });
        //send the array item at index[0] to the modal 
        res.send([friendsArray[0].name,friendsArray[0].photo]);
        //push new friend to the array of friends
        friendsArray.push(newFriend);
            
        //********************** Utility Functions*********************** */
        // reset comparison scores after sorting
        resetComparisonScore();
        
        function resetComparisonScore(){
            for (var j=0; j<friendsArray.length;j++){
            friendsArray[j].comparisonScore = 0;
            }
        }
        //subtrct scores in the arrays               
        function absoluteSubtract(arr1, arr2) {
            return arr2.map(function (el, i) {
              return Math.abs(el - arr1[i]);
            });
        }

        //manipulate the request object to push question answers into a new array after separating them from the other fields and parseInt.
        function convertToArray(data){
            var arr =[];
            var scoreArray = [];
            for( var i in data ) {
                arr.push(data[i]);
            };
            for (var j = 2; j<arr.length; j ++){
                scoreArray.push(parseInt(arr[j]));
            };
            return scoreArray;
        }
              
    });
};

