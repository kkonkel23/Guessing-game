/*------Constants------*/

/*------Variables------*/

let secretNum, guessList, isWinner, currentGuess;


/*------Cached Element References------*/

const messageEl = document.getElementById('message');
const guessesEl = document.getElementById('prevGuesses');
const guessBtn = document.getElementById('guessButton');
const resetBtn = document.getElementById('resetButton');
const guessInput = document.getElementById('guessInput');
const titleEl = document.querySelector('h1');


/*------Event Listeners------*/

resetBtn.addEventListener('click', function(){
    init();
})

guessBtn.addEventListener('click', function(){
    if (guessList.length === 0) {
        guessesEl.innerText = 'Previous Guesses: '
    }
    if (isWinner === false) {
        checkGuess(parseInt(guessInput.value))
    }
})

guessBtn.addEventListener('keypress', function(){
    if (e.key === 'Enter') {
        if (guessList.length === 0) {
            guessesEl.innerText = 'Previous Guesses: '
        }
        if (isWinner === false) {
            checkGuess(parseInt(guessInput.value))
        }
    }
})


/*------Functions------*/

//following function is called when you want to set the game to its initial state
init();

function init(){
    //easy way to remove all appended children from an element
    messageEl.className = '';
    guessesEl.innerText = '';
    messageEl.innerText = 'Please enter a number between 1 and 100!';
    guessInput.value = '';
    guessList = [];
    isWinner = false;
    secretNum = Math.floor(Math.random()*100 + 1);
}

function checkGuess(guess){
    if (guess < 1 || guess > 100) {
        messageEl.innerText = 'Whoops please enter a number between 1 and 100!';
    } else if (guess === secretNum) {
        //win scenario
        titleEl.className = 'animate__animated animate__bounce'
        confetti.start(1500);
        messageEl.className = 'winner';
        isWinner = true;
        render(guess);
        if (guessList.length === 0) {
            messageEl.innerText = `Congratulations!  You found the number in ${guessList.length +1} guess!`
        } else {
            messageEl.innerText = `Congratulations!  You found the number in ${guessList.length +1} guesses!`
        }
    } else if (guess < secretNum) {
        //handle guess is too low
        messageEl.className = 'low';
        messageEl.innerText = `${guess} is too low, please try again!`
        guessList.push(guess);
        render(guess);
    } else {
        //handle guess is too high
        messageEl.className = 'high';
        messageEl.innerText = `${guess} is too high, please try again!`
        guessList.push(guess);
        render(guess);
    }
    
}

function render(guess) {
    //append a child div to the guessesEl div based on whether our guess is higher or lower than secretNum
    if (guess === secretNum) {
        let div = document.createElement("div");
        div.innerText = guess;
        div.className = 'winner';
        guessesEl.appendChild(div);
    } else if (guess > secretNum) {
        let div = document.createElement('div');
        div.innerText = guess;
        div.className = 'high';
        guessesEl.appendChild(div);
    } else {
        let div = document.createElement('div');
        div.innerText = guess;
        div.className = 'low';
        guessesEl.appendChild(div);
    }
}




// Fill in each of the conditional statements for the checkGuess function. Flip the isWinner variable to true if there's a correct guess to prevent additional clicks. Add a line to clear out the guess input value as well as error handling for inputting a number out of range. Push the guess into the previous guesses array. Call a function to render all guesses.

// Write a render function to display the list of previous guesses on the page. Append an element to the cached guesses element, also adding a class name indicating whether it is higher or lower than the secret number.
