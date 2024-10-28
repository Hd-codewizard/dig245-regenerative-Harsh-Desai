/* javascript */
const dictionary = [ "zebra", "tiger", "horse", "moose", "panda", "koala", "mouse", "bison", "sloth",
    "snake", "llama", "hippo", "camel", "skunk", "sheep", "otter", "muley", "fossa", "goral",
    "hyena", "bongo", "civet", "dingo", "takin", "tapir", "gecko", "giant", "bears", "bully","liger","rhino","whale","goose"
    ,"sneee"];
function startup(){
    const game = document.getElementById('game');
    drawGrid(game);
    registerKey();
}
function drawBox(container,row,col,letter=''){
    const box = document.createElement('div');
    box.className = 'box';
    box.id = `box${row}${col}`;
    box.textContent = letter;
    container.appendChild(box);
    return box;
}
function drawGrid(container){
    const grid = document.createElement('div');
    grid.className = 'grid';
    for(let i = 0; i<6;i++){
        for(let j =0; j<5;j++){
            drawBox(grid,i,j,state.grid[i][j]);
        }
    }
    container.appendChild(grid);
}
const state = {
    currentWord: dictionary[Math.floor(Math.random() * dictionary.length)],
    grid : Array(6)
        .fill()
        .map(() => Array(5).fill('')),
    currentRow : 0,
    currentCol : 0,
    gameOver: false
};

function updateGrid(){
    for (let i = 0; i < state.grid.length;i++){
        for(let j = 0; j<state.grid[i].length;j++){
            const box1 = document.getElementById(`box${i}${j}`);
            box1.textContent = state.grid[i][j];
        }
    }
}
function registerKey(){
    if(state.gameOver == true){
        return;
    }
    document.body.onkeydown=(e) => {
        const key = e.key;
        if(key == 'Enter'){
            if(state.currentCol === 5){
                const word = getGuess();
                console.log(word);
                if(isValid(word)){
                    revealWord(word);
                    state.currentRow++;
                    state.currentCol = 0;
                }
                else{
                    alert('Not a valid word- Please enter another word')
                }
            }
        }
        if(key == 'Backspace'){
            removeLetter();
        }
        if(isLetter(key)){
            addLetter(key);
        }
        updateGrid();
    }
}
//Puts the letters together to make a new word
function getGuess(){
    return state.grid[state.currentRow].reduce((prev,curr) => prev + curr);
}
//Checks if the word is valid based on the list of words.Handle the lowecase and uppercase so its even
function isValid(word){
    const guess = word.toLocaleLowerCase();
    return dictionary.includes(guess);
}
//Assign green, yellow or black boxes
function revealWord(guess){
    const row = state.currentRow;
    const animation_duration = 500;
    for(let i =0; i < 5; i++){
        const box = document.getElementById(`box${row}${i}`);
        const letter = box.textContent.toLowerCase();
        setTimeout(()=>{
            if(letter === state.currentWord[i]){
                box.classList.add('right');
            }
            else if(state.currentWord.includes(letter)){
                box.classList.add('wrong');
            }
            else{
                box.classList.add('empty');
            }
        },((i+1) * animation_duration /2));

        box.classList.add('animated');
        box.style.animationDelay = `${(i*animation_duration)/2}ms`;
    }
    const isWinner = state.currentWord === guess.toLowerCase();
    const isGameOver = state.currentRow === 5;
    setTimeout(()=> {
        if(isWinner){
            if(state.currentRow === 0){
                alert('Congratulations! You guessed it in ' + (state.currentRow ) + " try");
            }
            else{
                alert('Congratulations! You guessed it in ' + (state.currentRow ) + " tries");
            }
            state.gameOver = true;
            location.reload();
        }
        else if(isGameOver){
            alert("Oops! You are out of guesses. Thw word was " + state.currentWord);
            location.reload();
        }
    },3*animation_duration);
   
}
//To check if the pressed key was a letter
function isLetter(key){
    return key.length === 1 && key.match(/[a-z]/i);
}
//Add a letter to the grid
function addLetter(letter){
    if(state.currentCol === 5){
        return;
    }
    state.grid[state.currentRow][state.currentCol] = letter;
    state.currentCol++;
}
//Remove if a backspace was pressed
function removeLetter(){
    if(state.currentCol === 0){
        return;
    }
    state.grid[state.currentRow][state.currentCol-1] = '';
    state.currentCol--;
}


startup();
