'use strict';

var buttonNewGame = document.getElementById('new-game');
var buttonPaper = document.getElementById('paper');
var buttonRock = document.getElementById('rock');
var buttonScissors = document.getElementById('scissors');
var numberOfGames = document.getElementById('games');
var output = document.getElementById('output');
var outputResult = document.getElementById('result');
var outputEndOfGame = document.getElementById('end-game');
var modal = document.getElementById('modal');

var player = {
  score: 0,
  choice: ''
};

var computer = {
  score: 0,
  choice: ''
};

var params = {
  playerWins: 0,
  compWins: 0,
  gameLength: 0,
  progress: []
};

 // --------------------- Funkcja nowa gra --------------------- \\
// -------------------------------------------------------------- \\
var newGame = function() {
  output.innerHTML = '';
  scoresResult();
  outputEndOfGame.innerHTML = '';
};

 // -------------------- Zdarzenie Nowa Gra -------------------- \\
// -------------------------------------------------------------- \\
buttonNewGame.addEventListener('click', function() {
  resetGame();
  newGame();
  params.gameLength = window.prompt('Podaj ilość wygranych rund która zakończy grę!');
  if (!params.gameLength || isNaN(params.gameLength)) {
    numberOfGames.innerHTML = '<br> Podaj właściwą liczbę!' + '<br>';
    disableButtons(true);
  } else {
    numberOfGames.innerHTML = '<br> Musisz wygrać: <strong>[ ' + params.gameLength + ' ]</strong> razy aby zakończyć grę!!!';
    buttonNewGame.disabled = true;
    disableButtons(false);
  }
});

 // ---------------- Funkcja wyłączająca buttony --------------- \\
// -------------------------------------------------------------- \\
function disableButtons(flag) {
  buttonPaper.disabled = flag;
  buttonRock.disabled = flag;
  buttonScissors.disabled = flag;
}
disableButtons(true);

 // -------------- funkcja która losuje liczb 1-3 -------------- \\
// -------------------------------------------------------------- \\ // JEST OK - DZIAŁA \\
var randomMove = function() {
  var compChoices = ['Paper', 'Rock', 'Scissors'];
  var compMove = Math.floor(Math.random() * 3);
  console.log('compChoice: ', compChoices[compMove]);
  return compChoices[compMove];
};

 // -------------------- Funkcja playerMove -------------------- \\
// -------------------------------------------------------------- \\
var playerMove = function(userMove) { // deklaruję wyrażenie funkcyjne playerMove (parametrem jest userMove)
  player.choice = userMove;
  computer.choice = randomMove();
  var compareResult = compare();
  resultOutput(compareResult);
  scoresResult();
  addRecord();
  endOfGame();
};

 // Wywołanie zdarzenia reagujące po kliknięciu w wybrany button \\
// -------------------------------------------------------------- \\
var buttonPlayerMove = document.querySelectorAll('.player-move');
//console.log('tablica: ', buttonPlayerMove);  
for (var i = 0; i < buttonPlayerMove.length; i++) {
  buttonPlayerMove[i].addEventListener('click', function() {
    //console.log(this.getAttribute('data-move'));
    playerMove(this.getAttribute('data-move'));
  });
}

 // -funkcja która porównuje wylosowaną liczbę z wyborem gracza- \\
// -------------------------------------------------------------- \\
var compare = function() {
  if (player.choice === computer.choice) {
      return 'REMIS!!! ';
  } else if ((player.choice === 'Paper') && (computer.choice == 'Rock') ||
             (player.choice === 'Rock') && (computer.choice == 'Scissors') ||
             (player.choice === 'Scissors') && (computer.choice == 'Paper')) {
      player.score++;
      return 'WYGRYWASZ :) ';
  } else {
      computer.score++;
      return 'PRZEGRYWASZ :( ';
      }
};

 // -------- Wyświetlanie wyniku pojedyńczej rozgrywki --------- \\
// -------------------------------------------------------------- \\
var scoresResult = function() {
  outputResult.innerHTML = 'Gracz >>>> <strong>' + player.score +  ' vs ' + computer.score + '</strong> <<<< Komputer <br><br>';
};

 // ------------ Funkcja resetująca punktację graczy ----------- \\
// -------------------------------------------------------------- \\
var resetGame = function() {
  player.score = 0;
  computer.score = 0;
  params = {
    playerWins: 0,
    compWins: 0,
    gameLength: 0,
    progress: [],
  };
};

 // --- Funkcja do wyświetlania wyniku dla pojedyńczej rundy --- \\
// -------------------------------------------------------------- \\
function resultOutput(compareResult) {
  output.innerHTML = compareResult + "wybrałeś: " + player.choice + " komputer wybrał: " + computer.choice + " <br><br>";
}

function endOfGame() {
  if (params.gameLength == player.score) {
    buttonNewGame.disabled = false;
    disableButtons(true);
    createModal();
    showModal();
    outputEndOfGame.innerHTML = '<strong>WYGRYWASZ</strong> TEN POJEDYNEK!!! <br><br> ABY ZAGRAĆ PONOWNIE WYBIERZ: <strong>NOWA GRA</strong>';
  } else if (params.gameLength == computer.score) {
    buttonNewGame.disabled = false;
    disableButtons(true);
    createModal();
    showModal();
    outputEndOfGame.innerHTML = '<strong>PRZEGRYWASZ !!!</strong> KOMPUTER WYGRAŁ TEN POJEDYNEK!!! <br><br> ABY ZAGRAĆ PONOWNIE WYBIERZ: <strong>NOWA GRA</strong>';
  }
}

function createModal() {
  var modal = document.querySelectorAll('.modal .content');
  var newHTML = '<table><thead><tr><th>Rounds | </th><th>Your Move | </th><th>Computer Move | </th><th>Round Result | </th><th></tr></thead><tbody>';
  for (i = 0; i < params.progress.length; i++) {
      newHTML += '<tr><td>' +
          params.progress[i].rounds + '</td><td>' +
          params.progress[i].playerChoice + '</td><td>' +
          params.progress[i].computerChoice + '</td><td>' +
          params.progress[i].playerScore + ' : ' + params.progress[i].computerScores + '</td></tr>'
  }
  newHTML += '</tbody></table>';
  console.log(newHTML);
  modal[0].innerHTML = newHTML;
}

function addRecord() {
  params.progress.push({
      rounds: (params.gameLength),
      playerScore: (player.score),
      computerScores: (computer.score),
      playerChoice: (player.choice),
      computerChoice: (computer.choice)
  })
  console.log('progres: ', params.progress);
}

// Funkcja pokazująca modal \\
var showModal = function(event){
    document.querySelector('#modal-overlay').classList.add('show');
};

// Funkcja zamykająca modal, oraz przywiązuję ją do kliknięcia na elemencie z klasą "close". 

var hideModal = function(){
  //event.preventDefault();
  document.querySelector('#modal-overlay').classList.remove('show');
};

var closeButton = document.querySelectorAll('.modal .close');

//for(var i = 0; i < closeButtons.length; i++){
  closeButton[0].addEventListener('click', hideModal);

// Zamykanie modala poprzez kliknięcie w overlay. 

//document.querySelector('#modal-overlay').addEventListener('click', hideModal);

// Musimy jednak pamiętać, aby zablokować propagację kliknięć z samego modala - inaczej każde kliknięcie wewnątrz modala również zamykałoby go. 

/*for(var i = 0; i < modal.length; i++){
  modal[i].addEventListener('click', function(event){
    event.stopPropagation();
  });
}*/