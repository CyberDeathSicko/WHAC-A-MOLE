let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;
let gameInterval;

const config = {
    moleAppearInterval: 1000,
    plantAppearInterval: 2000,
    moleImage: "./monty-mole.png",
    plantImage: "./piranha-plant.png",
};

window.onload = function () {
    setGame();
};

function setGame() {
    const board = document.getElementById("board");
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        board.appendChild(tile);
    }

    startGameLoop();
}

function startGameLoop() {
    gameInterval = setInterval(() => {
        setMole();
        setPlant();
    }, config.moleAppearInterval);
}

function getRandomTile() {
    return Math.floor(Math.random() * 9).toString();
}

function setMole() {
    if (gameOver) {
        return;
    }
    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }
    let mole = document.createElement("img");
    mole.src = config.moleImage;

    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id === num) {
        return;
    }
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) {
        return;
    }
    if (currPlantTile) {
        currPlantTile.innerHTML = "";
    }
    let plant = document.createElement("img");
    plant.src = config.plantImage;

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id === num) {
        return;
    }
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile() {
    if (gameOver) {
        return;
    }
    if (this === currMoleTile) {
        score += 10;
        document.getElementById("score").innerText = `Score: ${score}`;
    } else if (this === currPlantTile) {
        document.getElementById("score").innerText = `GAME OVER: ${score}`;
        gameOver = true;
        clearInterval(gameInterval); 
    } // <-- Added closing parenthesis for the "if" statement
}