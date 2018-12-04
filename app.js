/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//variable declarations
const diceOne = document.querySelector(".dice");
const diceTwo = document.createElement("img");
const rollDiceButton = document.querySelector(".btn-roll");
const newGameButton = document.querySelector(".btn-new");
const holdButton = document.querySelector(".btn-hold");
const setButton = document.querySelector(".btn-set");
const playerZero = document.querySelector(".player-0-panel");
const playerOne = document.querySelector(".player-1-panel");

let scoreZero = document.getElementById("score-0");
let scoreOne = document.getElementById("score-1");
let currentScoreZero = document.getElementById("current-0");
let currentScoreOne = document.getElementById("current-1");
let totalZero = 0;
let totalOne = 0;
let matchZero = 0;
let matchOne = 0;
let winningScore = 0;
let raceTo = 0;


userInputs();




//creating the second dice and setting attributes and style to the first and second dice
diceOne.setAttribute("id","dice1");
document.getElementById("dice1").style.cssText = "top:120px";

diceTwo.setAttribute("id","dice2");
diceTwo.setAttribute("src","dice-5.png");
diceTwo.setAttribute("class","dice");

diceOne.insertAdjacentElement("afterend", diceTwo);
document.getElementById("dice2").style.cssText = "top:250px";

resetGame();

rollDiceButton.addEventListener("click", rollDice);
newGameButton.addEventListener("click", resetGame);

holdButton.addEventListener("click", function(){
    if (totalZero >= winningScore) {
        matchZero += 1;
        if (matchZero != raceTo) {
            swal({
                type: 'success',
                title: 'Congratulations!!!',
                text: 'Player 1 win this match',
                footer: 'Reset Game???'
                })
                document.getElementById("match-0").textContent = `Match Score: ${matchZero}`;
                resetGame();
        } else {
            swal({
                type: 'success',
                title: 'Congratulations!!!',
                text: 'Player 1 win the game',
                footer: 'New Game???'
                })
                matchZero = 0;
                matchOne = 0;
                winningScore = 0;
                raceTo = 0;
                resetGame();
                userInputs();
        }  
    } else if (totalOne >= winningScore) {
        matchOne += 1;
        if (matchOne != raceTo) {
            swal({
                type: 'success',
                title: 'Congratulations!!!',
                text: 'Player 2 win this match',
                footer: 'Reset Game???'
                })
                document.getElementById("match-1").textContent = `Match Score: ${matchOne}`;  
                resetGame(); 
        } else {
            swal({
                type: 'success',
                title: 'Congratulations!!!',
                text: 'Player 2 win the game',
                footer: 'New Game???'
                })
                matchZero = 0;
                matchOne = 0;
                winningScore = 0;
                raceTo = 0;
                resetGame();
                userInputs();
        }
    } else {
        currentScoreZero.value = 0;
        currentScoreZero.textContent = currentScoreZero.value;
        currentScoreOne.value = 0;
        currentScoreOne.textContent = currentScoreOne.value;
        togglePlayer(); 
    }
});

function userInputs () {
    let userInputScore = prompt("Please set winning score:", "100");
    winningScore = parseInt(userInputScore);
    document.getElementById("winning-score").textContent = `Winning Score : ${winningScore}`;

    let userInputMatchNumber = prompt("Number of Games to win:", "1");
    raceTo = parseInt(userInputMatchNumber);
    document.getElementById("best-of").textContent = `Race To : ${raceTo}`;
}

function resetGame(e) { //resets the game 

    diceOne.style.visibility = "hidden";//hide the dice image
    diceTwo.style.visibility = "hidden";
    scoreZero.value = 0;
    scoreOne.value= 0;
    currentScoreZero.value = 0; 
    currentScoreOne.value = 0;
    scoreZero.textContent = scoreZero.value;
    scoreOne.textContent= scoreOne.value;
    currentScoreZero.textContent = currentScoreZero.value; 
    currentScoreOne.textContent = currentScoreOne.value;
    totalOne = 0;
    totalZero = 0;
    document.getElementById("best-of").textContent = `Race To : ${raceTo}`;
    document.getElementById("winning-score").textContent = `Winning Score : ${winningScore}`;
    document.getElementById("match-0").textContent = `Match Score: ${matchZero}`; 
    document.getElementById("match-1").textContent = `Match Score: ${matchOne}`; 
    playerZero.classList.add("active");//adding and removing of class "active" 
    playerOne.classList.remove("active");
    
}

function togglePlayer(e) {//adding and removing of class "active" 

    if (playerZero.classList.contains("active")) {
        currentScoreZero.value = 0;
        currentScoreZero.textContent = currentScoreZero.value; 
        scoreZero.textContent = totalZero;
        playerZero.classList.remove("active");
        playerOne.classList.add("active");
    } else {
        currentScoreOne.value = 0;
        currentScoreOne.textContent = currentScoreOne.value; 
        scoreOne.textContent = totalOne;
        playerOne.classList.remove("active");
        playerZero.classList.add("active");
    }
}

function rollDice(e){

    diceOne.style.visibility = "visible";//show the dice image
    diceTwo.style.visibility = "visible";
    const randomNumber1 = Math.floor((Math.random() * 6) + 1);;//select random number
    const randomNumber2 = Math.floor((Math.random() * 6) + 1);;

    diceOne.setAttribute("src",`dice-${randomNumber1}.png`);//changes the dice image
    diceTwo.setAttribute("src",`dice-${randomNumber2}.png`);    
  
    if (playerZero.classList.contains("active")) {//checking if player zero is active and score is less than 100

        if(randomNumber1 === 1 || randomNumber2 === 1) {//checking if one of the dice number is equal to one
            currentScoreZero.value = 0;
            currentScoreZero.textContent = currentScoreZero.value; 
            togglePlayer();
        } else {
            currentScoreZero.value += randomNumber1 + randomNumber2;
            currentScoreZero.textContent = currentScoreZero.value; 
            scoreZero.value = scoreZero.value + currentScoreZero.value;
            totalZero += currentScoreZero.value; 
        }
    } else {
        if(randomNumber1 === 1 || randomNumber2 === 1) {
            currentScoreOne.value = 0;
            currentScoreOne.textContent = currentScoreOne.value; 
            togglePlayer();
        } else {
            currentScoreOne.value += randomNumber1 + randomNumber2;
            currentScoreOne.textContent = currentScoreOne.value; 
            scoreOne.value = scoreOne.value + currentScoreOne.value;
            totalOne += currentScoreOne.value;
        }               
    }
}



