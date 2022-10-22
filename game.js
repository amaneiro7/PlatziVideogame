const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.getElementById('up');
const btnDown = document.getElementById('down');
const btnLeft = document.getElementById('left');
const btnRight = document.getElementById('right');

let canvasSize;
let elementsSize;

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
        canvasSize = window.innerWidth * 0.8
    } else {
        canvasSize = window.innerHeight * 0.8
    }
    
    canvas.setAttribute('width', canvasSize+16);
    canvas.setAttribute('height', canvasSize+16);
    elementsSize = canvasSize /10;
        
    startGame();
}

function renderMap() {
    game.font = `${elementsSize}px Verdana`;
    game.textAlign = 'end';
    
    const map = maps[0];
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
            game.fillText(emoji, posX, posY);                        
        });
    });
}

function renderPlayerPosition(){
    game.fillText(emojis['PLAYER'], playerPosition.initialX, playerPosition.initialY)
}

function startGame() {
    renderMap()
    renderPlayerPosition()
    playerPosition.x = playerPosition.initialX;
    playerPosition.y = playerPosition.initialY;
}

        
function movePlayer() {        
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)    
}
    
window.addEventListener('keyup', moveByKeys)
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
    console.log('Me quiero mover hacia arriba');      
    renderMap();        
    if (playerPosition.y <= elementsSize*2) {
        movePlayer();
        console.log('Ya no puedo subir mas');
        return
    }
    playerPosition.y -= elementsSize;
    movePlayer();
}
function moveLeft() {
    console.log('Me quiero mover hacia a la izquierda');
    renderMap();    
    if (playerPosition.x <= elementsSize*2) {
        movePlayer();
        console.log('Ya no puedo ir mas a la izquierda');
        return
    }
    playerPosition.x -= elementsSize;
    movePlayer();
}
function moveRight() {
    console.log('Me quiero mover hacia a la derecha');
    renderMap();    
    if (Math.ceil(playerPosition.x) >= canvasSize) {
        movePlayer();
        console.log('Ya no puedo ir más a la derecha');
        return
    }
    playerPosition.x += elementsSize;
    movePlayer();
}
function moveDown() {
    console.log('Me quiero mover hacia abajo');
    renderMap();    
    if (Math.ceil(playerPosition.y) >= canvasSize) {
        movePlayer();
        console.log('Ya no puedo bajar mas');
        return
    }
    playerPosition.y += elementsSize;    
    movePlayer();
}
