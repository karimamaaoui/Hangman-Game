
const hangmanImage=document.querySelector(".hangman-box img");
const wordDisplay=document.querySelector(".word-display");
const gameModal=document.querySelector(".game-modal");

const guessesText=document.querySelector(".guesses-text");
const keyboardDiv=document.querySelector(".keyboard");
const playAgainBtn=document.querySelector(".play-again");

let currentWord,correctLetters=[],wrongGuessCount=0;
const maxGuess=6;

const resetGame=()=>{
    //Ressetting all game variables and ui elements 
    correctLetters=[];
    wrongGuessCount=0;
    hangmanImage.src=`images/hangman-${wrongGuessCount}.svg`
    guessesText.innerText=`${wrongGuessCount} /${maxGuess}`;
    keyboardDiv.querySelectorAll("button").forEach(btn=>btn.disabled=false);
    wordDisplay.innerHTML=currentWord.split("").map(()=> `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show")

}


const getRandomWord=()=>{
    //selecting a random word and hint from the wordList
    const {word,hint}=wordList[Math.floor(Math.random()* wordList.length)];
    currentWord=word;
    //console.log(word);
    document.querySelector(".hint-text b").innerText=hint;
    resetGame();

}

const gameOver=(isVictory)=>{
    setTimeout(()=>{
        //after 600ms of game complete .. showing modal with relevant details
        const modalText=isVictory ? `you found the word  ` : `the correct word was: `;
        gameModal.querySelector("img").src=`images/${isVictory ? 'victory' : 'lost' }.gif`;
        gameModal.querySelector("h4").innerText=`${isVictory ? 'Congrats !' : 'Game Over !' }`;
        gameModal.querySelector("p").innerHTML=`${modalText} <b> ${currentWord} </b>`;


        gameModal.classList.add("show")
    },300)
}

const initGame=(button,clickedLetter)=>{
  //  console.log(button,clickedLetter);
  //checking if clickedLetter is exist on the currentWord
  if(currentWord.includes(clickedLetter))
  {
    //showing all correct letters on the word display
    //console.log(clickedLetter," is exist on the word");
    [...currentWord].forEach((letter,index)=>{
        if(letter===clickedLetter)
        {
            correctLetters.push(letter);
            wordDisplay.querySelectorAll("li")[index].innerText=letter;
            wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
        }
    })
  }
  else {
    //console.log(clickedLetter," is not exist on the word");
    //if clicked letter doesn't exist then update the wrongGuessCount and hangman image
    wrongGuessCount++;
    hangmanImage.src=`images/hangman-${wrongGuessCount}.svg`
  }
  button.disabled=true;
  guessesText.innerText=`${wrongGuessCount} /${maxGuess}`;

  //calling gameOver function if any of these condition meets
  if(wrongGuessCount===maxGuess)return gameOver(false)
  if(correctLetters.length===currentWord.length)return gameOver(true)
  

}

//creating keyboard buttons and adding event listeners
for(let i=97;i<=122;i++){    
    const button=document.createElement("button");
    button.innerText=String.fromCharCode(i);
   // console.log(String.fromCharCode(i));
   button.addEventListener("click", e =>
   //console.log(e.target)
        initGame(e.target,String.fromCharCode(i))
   );
   keyboardDiv.appendChild(button);

}

getRandomWord();

playAgainBtn.addEventListener("click",getRandomWord);