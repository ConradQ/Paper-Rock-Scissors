'use strict';

var buttonNewGame = document.getElementById('new-game');
var buttonPaper = document.getElementById('paper');
var buttonRock = document.getElementById('rock');
var buttonScissors = document.getElementById('scissors');

var numberOfGames = document.getElementById('games');
var outputSingleRound = document.getElementById('output');
var outputResult = document.getElementById('result');
var outputEndOfGame = document.getElementById('end-game');

var stateOfGame = { 
  playerWins : 0,
  compWins : 0,
  gameLength : 0,
  newGame : function() {
    outputSingleRound.innerHTML = '';
    scoresResult();
    outputEndOfGame.innerHTML = '';
  }
}

/*var playerWins = 0;
var compWins = 0;
var gameLength = 0;*/

 // ---------------- Funkcja wyłączająca buttony --------------- \\
// -------------------------------------------------------------- \\
function disableButtons(flag) {
  buttonPaper.disabled = flag;
  buttonRock.disabled = flag;
  buttonScissors.disabled = flag;
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
  } else if ((userMove == 1) && (compChoice == 2) ||
             (userMove == 2) && (compChoice == 3) ||
             (userMove == 3) && (compChoice == 1)) {
      stateOfGame.playerWins++;
      return 'WYGRYWASZ :) ';
  } else {
      stateOfGame.compWins++;
      return 'PRZEGRYWASZ :( ';
      }
};

 // -------- Wyświetlanie wyniku pojedyńczej rozgrywki --------- \\
// -------------------------------------------------------------- \\
var scoresResult = function() {
  outputResult.innerHTML = 'Gracz >>>> <strong>' + stateOfGame.playerWins +  ' vs ' + stateOfGame.compWins + '</strong> <<<< Komputer <br><br>';
};


 // ------------ Funkcja resetująca punktację graczy ----------- \\
// -------------------------------------------------------------- \\
var resetGame = function() {
  stateOfGame.playerWins = 0;
  stateOfGame.compWins = 0;
};

 // -------------------- Zdarzenie Nowa Gra -------------------- \\
// -------------------------------------------------------------- \\
buttonNewGame.addEventListener('click', function() {
  stateOfGame.newGame();
  stateOfGame.gameLength = window.prompt('Podaj ilość wygranych rund która zakończy grę!');
  if (!stateOfGame.gameLength || isNaN(stateOfGame.gameLength)) {
    numberOfGames.innerHTML = '<br> Podaj właściwą liczbę!' + '<br>';
    disableButtons(true);
  } else {
    numberOfGames.innerHTML = '<br> Musisz wygrać: <strong>[ ' + stateOfGame.gameLength + ' ]</strong> razy aby zakończyć grę!!!';
    buttonNewGame.disabled = true;
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
buttonPaper.addEventListener('click', function() { 
  playerMove(1);
});

buttonRock.addEventListener('click', function() { 
  playerMove(2);
});

buttonScissors.addEventListener('click', function() { 
  playerMove(3);
});

// ---- Funkcja do wyświetlania wyniku dla pojedyńczej rundy --- \\
// -------------------------------------------------------------- \\
function resultOutput(compareResult, myText, compText) {
  outputSingleRound.innerHTML = compareResult + "wybrałeś: " + myText + " komputer wybrał: " + compText + " <br><br>";
}

function endOfGame() {
  if (stateOfGame.gameLength == stateOfGame.playerWins) {
    buttonNewGame.disabled = false;
    disableButtons(true);
    resetGame();
    outputEndOfGame.innerHTML = '<strong>WYGRYWASZ</strong> TEN POJEDYNEK!!! <br><br> ABY ZAGRAĆ PONOWNIE WYBIERZ: <strong>NOWA GRA</strong>';
  } else if (stateOfGame.gameLength == stateOfGame.compWins) {
    buttonNewGame.disabled = false;
    disableButtons(true);
    resetGame();
    outputEndOfGame.innerHTML = '<strong>PRZEGRYWASZ !!!</strong> KOMPUTER WYGRAŁ TEN POJEDYNEK!!! <br><br> ABY ZAGRAĆ PONOWNIE WYBIERZ: <strong>NOWA GRA</strong>';
  }
}