'use strict';

/*var buttonNewGame = document.getElementById('new-game');
var buttonPaper = document.getElementById('paper');
var buttonRock = document.getElementById('rock');
var buttonScissors = document.getElementById('scissors');

var numberOfGames = document.getElementById('games');
var params.output = document.getElementById('output');
var outputResult = document.getElementById('result');
var outputEndOfGame = document.getElementById('end-game');*/

var params = { 
  buttonNewGame: document.getElementById('new-game'),
  buttonPaper: document.getElementById('paper'),
  buttonRock: document.getElementById('rock'),
  buttonScissors: document.getElementById('scissors'), 
  numberOfGames: document.getElementById('games'),
  output: document.getElementById('output'),
  outputResult: document.getElementById('result'),
  outputEndOfGame: document.getElementById('end-game'),
  playerWins: 0,
  compWins: 0,
  gameLength: 0,
  newGame: function() {
    params.output.innerHTML = '';
    scoresResult();
    params.outputEndOfGame.innerHTML = '';
  }
};


 // ---------------- Funkcja wyłączająca buttony --------------- \\
// -------------------------------------------------------------- \\
function disableButtons(flag) {
  params.buttonPaper.disabled = flag;
  params.buttonRock.disabled = flag;
  params.buttonScissors.disabled = flag;
}
disableButtons(true);

 // ------------- funkcja która losuje liczb 1-3 ------------- \\
// ------------------------------------------------------------ \\ // JEST OK - DZIAŁA \\
var randomNumber = function() {
  return Math.floor(Math.random() * 3) + 1;
};

 // --------- funkcja która zamienia liczbę na tekst --------- \\
// ------------------------------------------------------------ \\ // JEST OK - DZIAŁA \\
var numberToText = function(randomNumber) {
  if (randomNumber == 1) {
    return 'PAPIER!';
  } else if (randomNumber == 2) {
    return 'KAMIEŃ!';
  } else if (randomNumber == 3) {
    return 'NOŻYCE!';
  } 
};

 // funkcja która porównuje wylosowaną liczbę z wyborem gracza \\
// ------------------------------------------------------------ \\
var compare = function(userMove, compChoice) {
  if (userMove === compChoice) {
      return 'REMIS!!! ';
  } else if ((userMove == buttonPlayerMove[0]) && (compChoice == 2) ||
             (userMove == buttonPlayerMove[1]) && (compChoice == 3) ||
             (userMove == buttonPlayerMove[2]) && (compChoice == 1)) {
      params.playerWins++;
      return 'WYGRYWASZ :) ';
  } else {
      params.compWins++;
      return 'PRZEGRYWASZ :( ';
      }
};

 // -------- Wyświetlanie wyniku pojedyńczej rozgrywki --------- \\
// -------------------------------------------------------------- \\
var scoresResult = function() {
  params.outputResult.innerHTML = 'Gracz >>>> <strong>' + params.playerWins +  ' vs ' + params.compWins + '</strong> <<<< Komputer <br><br>';
};


 // ------------ Funkcja resetująca punktację graczy ----------- \\
// -------------------------------------------------------------- \\
var resetGame = function() {
  params.playerWins = 0;
  params.compWins = 0;
};

 // -------------------- Zdarzenie Nowa Gra -------------------- \\
// -------------------------------------------------------------- \\
params.buttonNewGame.addEventListener('click', function() {
  params.newGame();
  params.gameLength = window.prompt('Podaj ilość wygranych rund która zakończy grę!');
  if (!params.gameLength || isNaN(params.gameLength)) {
    params.numberOfGames.innerHTML = '<br> Podaj właściwą liczbę!' + '<br>';
    disableButtons(true);
  } else {
    params.numberOfGames.innerHTML = '<br> Musisz wygrać: <strong>[ ' + params.gameLength + ' ]</strong> razy aby zakończyć grę!!!';
    params.buttonNewGame.disabled = true;
    disableButtons(false);
  }
});

 // -------------------- Funkcja playerMove -------------------- \\
// -------------------------------------------------------------- \\
var playerMove = function(userMove) {
  var compChoice = randomNumber();
  var compareResult = compare(userMove, compChoice);
  var myText = numberToText(userMove);
  var compText = numberToText(compChoice);
  resultOutput(compareResult, myText, compText);
  scoresResult();
  endOfGame();
};

 // Wywołanie zdarzenia reagujące po kliknięciu w wybrany button \\
// -------------------------------------------------------------- \\
var buttonPlayerMove = document.querySelectorAll('.player-move');
console.log('tablica: ', buttonPlayerMove);
for (var i = 0; i < buttonPlayerMove.length; i++) {
  //console.log('i: ', buttonPlayerMove);
  var btnDataMove = buttonPlayerMove[i].getAttribute('data-move');
  //console.log('button: ', btnDataMove);
  buttonPlayerMove[i].addEventListener('click', function() {
    console.log('btn: ', btnDataMove);
    //console.log(this);
    playerMove(btnDataMove);
    });
  }
  
/*buttonPaper.addEventListener('click', function() { 
  playerMove(1);
});

buttonRock.addEventListener('click', function() { 
  playerMove(2);
});

buttonScissors.addEventListener('click', function() { 
  playerMove(3);
});*/

// ---- Funkcja do wyświetlania wyniku dla pojedyńczej rundy --- \\
// -------------------------------------------------------------- \\
function resultOutput(compareResult, myText, compText) {
  params.output.innerHTML = compareResult + "wybrałeś: " + myText + " komputer wybrał: " + compText + " <br><br>";
}

function endOfGame() {
  if (params.gameLength == params.playerWins) {
    params.buttonNewGame.disabled = false;
    disableButtons(true);
    resetGame();
    params.outputEndOfGame.innerHTML = '<strong>WYGRYWASZ</strong> TEN POJEDYNEK!!! <br><br> ABY ZAGRAĆ PONOWNIE WYBIERZ: <strong>NOWA GRA</strong>';
  } else if (params.gameLength == params.compWins) {
    params.buttonNewGame.disabled = false;
    disableButtons(true);
    resetGame();
    params.outputEndOfGame.innerHTML = '<strong>PRZEGRYWASZ !!!</strong> KOMPUTER WYGRAŁ TEN POJEDYNEK!!! <br><br> ABY ZAGRAĆ PONOWNIE WYBIERZ: <strong>NOWA GRA</strong>';
  }
}
