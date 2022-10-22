const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

let canvasSize;
let elementsSize;

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

function startGame() {   
      
    // game.font = `${elementsSize}px Verdana` 
    game.font = elementsSize + 'px Verdana'
    game.textAlign = 'end'

    const map = maps[0];
    const mapRows = map.trim().split('\n');
    const mapRowsCols = mapRows.map(row => row.trim().split(''));
    console.log({map, mapRows, mapRowsCols});

    for (let row = 1; row <= 10; row++) {
        for (let col =1; col <= 10; col++) {
            game.fillText(emojis[mapRowsCols[row -1][col -1]], (elementsSize * col)+20, elementsSize * row);
        }
    }
}