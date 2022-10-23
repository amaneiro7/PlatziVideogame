const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.getElementById('up');
const btnDown = document.getElementById('down');
const btnLeft = document.getElementById('left');
const btnRight = document.getElementById('right');

let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;

const playerPosition = {
    x: '',
    y: '',
    initialX: '',
    initialY: '',
}

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);



function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = Math.floor(window.innerWidth * 0.8)
    } else {
        canvasSize = Math.floor(window.innerHeight * 0.8)
    }
    
    canvas.setAttribute('width', canvasSize+16);
    canvas.setAttribute('height', canvasSize+16);
    elementsSize = Math.floor(canvasSize /10);    
        
    startGame();
}

function renderMap() {
    game.font = `${elementsSize}px Verdana`;
    game.textAlign = 'end';
    
    const map = maps[level];
    game.clearRect(0, 0, canvasSize, canvasSize);
    const mapRows = map.trim().split('\n'); //trim() es un metodo que remueve los espacios en blanco de los treing y lo devuelve en un nuevo `string` sin modificar el original, el .split, elimina el caracter que se le indique en el argumento
    const mapRowsCols = mapRows.map(row => row.trim().split(''));
    game.clearRect(0, 0, canvasSize, canvasSize);  
    mapRowsCols.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const emoji = emojis[col];
            const posX = (elementsSize * (colIndex + 1))+12;
            const posY = elementsSize * (rowIndex + 1);
            if (col == 'O') {                
                playerPosition.initialX = posX;
                playerPosition.initialY = posY;              
            };
            if (col == 'I') {
                if(playerPosition.x == posX && playerPosition.y == posY) {
                    win();                    
                    return
                }                
            }
            if (col == 'X') {
                if(playerPosition.x == posX && playerPosition.y == posY) {
                    lose()
                    return
                }
            }          
            game.fillText(emoji, posX, posY);                        
        });        
    });    
    return
}

function win () {
    game.clearRect(0, 0, canvasSize, canvasSize);
    level++;    
    if (level >= maps.length) {
        level = 0        
    }
    playerPosition.x = ''
    playerPosition.y = ''
    startGame()
    return
}

function lose () {    
    lives--
    if (lives == 0)  {        
        level = 0
        lives = 3
    }
    playerPosition.x = ''
    playerPosition.y = ''
    startGame();
    return
}


function renderPlayerPosition(){
    game.fillText(emojis['PLAYER'], playerPosition.initialX, playerPosition.initialY)
    return
}

function startGame() {    
    renderMap()
    renderPlayerPosition()
    playerPosition.x = playerPosition.initialX;
    playerPosition.y = playerPosition.initialY;
    return
}

        
function movePlayer() {      
    renderMap();
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)    
    return
}
    
window.addEventListener('keydown', moveByKeys)
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function moveByKeys(event) {
    
    switch (event.key) {
        case "ArrowUp": moveUp(); break;
        case "ArrowLeft": moveLeft(); break;
        case "ArrowRight": moveRight(); break;
        case "ArrowDown": moveDown(); break;
    }

}

function moveUp() {
    if (playerPosition.y <= elementsSize) {
        movePlayer();
        console.log('Ya no puedo subir mas');
        return
    }
    playerPosition.y -= elementsSize;
    movePlayer();
}
function moveLeft() {
    if (playerPosition.x <= elementsSize*2) {
        movePlayer();
        console.log('Ya no puedo ir mas a la izquierda');
        return
    }
    playerPosition.x -= elementsSize;
    movePlayer();
}
function moveRight() {
    if (Math.ceil(playerPosition.x) >= canvasSize) {
        movePlayer();
        console.log('Ya no puedo ir más a la derecha');
        return
    }
    playerPosition.x += elementsSize;
    movePlayer();
}
function moveDown() {
    if (Math.ceil(playerPosition.y) >= canvasSize) {
        movePlayer();
        console.log('Ya no puedo bajar mas');
        return
    }
    playerPosition.y += elementsSize;    
    movePlayer();
}
