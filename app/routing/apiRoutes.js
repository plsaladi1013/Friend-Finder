var friends = require(__dirname+"\\..\\data\\friends.js");
var newScore = 0;
var difference = 50;
var name = [];
var score = [];
var image = [];

var getIndexOfSmallestInArray = function(finalResultsArray){

    Array.min = function (array) {
        return Math.min.apply(Math, array);
    }    
    var smallestNumberInFinalResultsArray = Array.min(finalResultsArray);
    var indexesOfSmallestNumber = [];
    for (let i = 0; i < finalResultsArray.length; i++) {
        const element = finalResultsArray[i];
        if (element == smallestNumberInFinalResultsArray) {
            indexesOfSmallestNumber.push(finalResultsArray.indexOf(smallestNumberInFinalResultsArray, i));
        }
    }
    console.log(indexesOfSmallestNumber);
    return indexesOfSmallestNumber;
        
}
module.exports = function(app) {

    app.get("/api/friends", function(req,res){
        return res.json(friends);
    })

    app.post("/api/friends", function (req,res){

        var newFriend = {
            name: req.body.name,
            img: req.body.img,
            answers: req.body["answers[]"]
        }
        console.log(newFriend);

        var bestMatch = {
            name: "",
            img: "",
            difference: ""
        }

        friends.push(newFriend);
        for(var i=0; i<newFriend.answers.length; i++){
            newScore = Math.abs(+newScore + +newFriend.answers[i]);
          }
       //   console.log("New Friend Score: "+newScore);

          for(i=0;i<(friends.length-1);i++){
            var friendScore = 0;
              for(j=0;j<friends[i].answers.length;j++){
                  friendScore = (friendScore + +friends[i].answers[j]);
                  
              }
      //        console.log(friends[i].name+" Friend Score: "+friendScore);
              if ((newScore - friendScore) < difference){
                  difference = Math.abs(newScore - friendScore);
                  bestMatch.name = friends[i].name;
                  bestMatch.img = friends[i].img;
                  bestMatch.difference = difference;
                  console.log(bestMatch);
                  name.push(bestMatch.name);
                  score.push(bestMatch.difference);
                  image.push(bestMatch.img);
                
              }
                
          }
        console.log(name);
        console.log(score);
        var matchIndex = getIndexOfSmallestInArray(score);
        console.log(name[matchIndex]);
        console.log(image[matchIndex]);
        
        res.json({ name: name[matchIndex],
            image : image[matchIndex]
        });
        
        //   console.log(newFriend)
        //   newFriend.scores = parseInt(newScore);
    })

  };