var target = 0;
var guesses = [];
var generateRandNum = function (){
  target = Math.floor(Math.random() * 100 + 1);
};
var prevGuess = 0;
generateRandNum();
var updatePrevGuess = function(){
  prevGuess = guesses[guesses.length - 1];
};
var inputValidator = function(){
  guesses.push($('#number-input').val());
  updatePrevGuess();
  var repeat = false;
  for(var i =0; i < guesses.length -1; i++){
    if(guesses[i] === guesses[guesses.length -1]){
      repeat = true;
    }
  }
  var num = parseInt(prevGuess);
  if(num < 0 || num > 100){
    alert('Whoooa sorry that number is out of range! Try guessing again');
    resetInputBox();
    guesses.splice(-1,1);
  } else if(repeat == true){
    alert('Wait you already guessed that! Guess again');
      guesses.splice(-1,1);
      resetInputBox();
  } else {
    hotOrCold();
  }
};

$('#submit-btn').on('click', inputValidator);
$("input").keypress(function(event) {
    if (event.which == 13) {
        event.preventDefault();
        inputValidator();
    }
});
var resetBackground = function(color){
  $('.background').css('background-color', color);
};
var changeHelperText = function(text){
  $('#helper-text').text(text);
};
var hotRed = '#FF4136';
var coolBlue = '#7FDBFF';
var burningUp = '#FF0000';
var iceCold = '#C4EFFF';
var warmRed = '#FC6868';
var hotOrCold = function(){
  var lowHigh = '';
  var range = Math.abs(target - prevGuess);
  if(prevGuess < target)
    lowHigh = 'higher.';
  if(prevGuess > target)
    lowHigh = 'lower.';
  if(range >0 && range <=5){
    resetBackground(burningUp);
    changeHelperText("You're BURNING UP! Try guessing a little " + lowHigh);
  }
  if(range >5 && range <=10){
     resetBackground(hotRed);
     changeHelperText("You're getting HOT! Try guessing " + lowHigh);
  }
  if(range >10 && range <=15){
    resetBackground(warmRed);
    changeHelperText("You're warming up! Try guessing " + lowHigh);
  }
  if(range >15 && range <=25){
    resetBackground(coolBlue);
    changeHelperText("It's chilly in here... Try guessing " + lowHigh);
  }
  if(range >25){
    resetBackground(iceCold);
    changeHelperText("Brrr...you're ice cold. Try guessing a lot " + lowHigh);
  }
    resetInputBox();
    guessTracker();
    displayPrevGuesses();
    console.log(target);
    console.log(guesses);
    console.log(prevGuess);
};
var resetInputBox = function(){
  document.getElementById("guessing-form").reset();
};
var guessTracker = function(){
  var guessNum = guesses.length;
  $('#guesses-remaining').text(5 - guessNum);
  if(prevGuess == target){
      prizeGenerator();
  } else{
      if(guessNum === 5){
        alert("Sorry that's all your guesses! The number was " + target);
        startOver();
      }
  }
};
var displayPrevGuesses = function(){
  var guessStr ='';
  if(guesses.length == 1){
     for(var i =0; i < guesses.length; i++){
      guessStr += guesses[i] + ' ';
     }
    $('#prev-guesses').append("<p id='prev-guess-text'>Your previous guesses are: \n" +guessStr + "</p>");
  } else if(guesses.length > 1){
    for(var i =0; i < guesses.length; i++){
      guessStr += guesses[i];
      if(i < guesses.length - 1){
        guessStr += ', ';
      }
     }
    $('#prev-guess-text').text("Your previous guesses are: \n" +guessStr);
  }
};

var startOver = function(){
  guesses = [];
  generateRandNum();
  resetBackground('white');
  $(".hide-me").show();
  $('#prev-guesses').empty();
  changeHelperText('Enter a guess from 1-100. Guess right to win a prize!');
  $('#guesses-remaining').text(5);
  $("#prize-image").children('img').remove();
};
var giveHint = function(){
  var strTarget = target.toString();
  var hintNum = '';
  if(strTarget.length == 1){
    hintNum = 'single digits.';
  } else if(strTarget.length == 2){
    hintNum = target.toString()[0] + '0s.';
  } else if(strTarget.length == 3){
    hintNum = target.toString()[0] + '00s.';
  }
  alert("Here's a hint...the number is somehwere in the " + hintNum);
};
$('#startover-btn').on('click', startOver);
$('#hint-btn').on('click', giveHint);
var prizeGenerator = function(){
  var randNum = Math.floor(Math.random() * 5);
  var prizes =[{name:'Tamagotchi', link: "<img id='theImg' src='http://php.scripts.psu.edu/dmh5086/t/i/shells/v4/orange_stars.jpg'/>", text: " Remember to change its diapers."},
  {name:'Pet Rock', link: "<img id='theImg' src='http://a.abcnews.go.com/images/Lifestyle/gty_pet_rock_150401_4x3_992.jpg'/>", text: " Be sure to feed it twice a day."},
  {name:'Honeybadger', link: "<img id='theImg' src='http://i.ytimg.com/vi/x9Jr9JKpsX8/maxresdefault.jpg'/>", text: " You're in luck...they love to cuddle."},
  {name:'Dog Snuggie', link: "<img id='theImg' src='http://ep.yimg.com/ay/villagestreetwear/snuggie-for-dogs-the-only-blanket-with-sleeves-for-dogs-56.jpg'/>", text: ' Because what do dogs love more than blankets with sleaves?'},
  {name:'Lifetime supply of Pogs', link: "<img id='theImg' src='http://www.thingsofmyinterest.com/wp-content/uploads/2011/06/Pogs_01.jpg'/>", text: " Oh snap!" }];
  alert('You win! Click OK to see your prize');
      resetBackground('white');
      $("#prize-image").append(prizes[randNum].link);
      $('#prev-guesses').empty();
      $(".hide-me").hide();
      changeHelperText('Congratulations! You won a ' + prizes[randNum].name + '.' + prizes[randNum].text); 
}
