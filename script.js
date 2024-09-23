const xSize = 4;
const ySize = 4;

let PlayArea = document.getElementById("playarea");
let CurrentScore = document.getElementById("score");

let GameStatus = [];
let Filled = 0;
let Score = 0;
let Lose = false;

for (let y = 0; y < ySize; y++) {

    let tr = document.createElement("tr");
    GameStatus.push([]);

    for (let x = 0; x < xSize; x++) {

        let td = document.createElement("td");
        let box = document.createElement("div");

        box.id = "box_" + x + "_" + y;
        GameStatus[y][x] = 0;
        td.appendChild(box);
        tr.appendChild(td);
        
    }

    document.getElementById("boardtbody").appendChild(tr);

}

function DrawGame() {
    CurrentScore.innerHTML = Score;
    for (let y = 0; y < ySize; y++) {
        for (let x = 0; x < xSize; x++) {

            let Colors = ["rgb(255, 66, 66)", "rgb(255, 142, 66)", "rgb(255, 201, 74)", "rgb(18, 222, 0)", "rgb(0, 222, 163)", "rgb(0, 128, 255)", "rgb(34, 0, 255)", "rgb(140, 0, 255)", "rgb(255, 69, 236)","rgb(138, 138, 138)", "rgb(0, 0, 0)"];
            let CurrentBox = document.getElementById("box_" + x + "_" + y);

            CurrentBox.innerHTML = "";
            CurrentBox.style.backgroundColor = "rgb(123, 200, 136)";

            if (GameStatus[y][x] == 0) {
                continue;
            }

            CurrentBox.innerHTML = GameStatus[y][x];
            CurrentBox.style.backgroundColor = Colors[(Math.log(GameStatus[y][x])/Math.log(2)-1)%Colors.length];
        }
    }
}

function CheckIfLose() {
    for (let y = 0; y < ySize; y++) {
        for (let x = 0; x < xSize; x++) {
            if (x < xSize - 1 && GameStatus[y][x] == GameStatus[y][x+1]) {
                return false;
            }
            if (y < ySize - 1 && GameStatus[y][x] == GameStatus[y+1][x]) {
                return false;
            }
        }
    }
    return true;
}

function GameOver() {
    document.getElementById("gameover").style.display = "block";
}

function NewTile() {
    let xNewPos;
    let yNewPos;

    do {
        xNewPos = Math.floor(Math.random() * xSize);
        yNewPos = Math.floor(Math.random() * ySize);

        if (Filled >= xSize * ySize) {
            DrawGame();
            return;
        }

    } while (GameStatus[yNewPos][xNewPos] != 0)

    let rndNum = Math.random();
    let chosennum;
    if (rndNum >= 0.9) {chosennum = 4;}
    else {chosennum = 2;}

    GameStatus[yNewPos][xNewPos] = chosennum;
    Filled++;

    if (Filled >= xSize * ySize && CheckIfLose() == true) {
        GameOver();
        Lose = true;
    }

    DrawGame();
}

function Slide(direction) {
    if (direction == "U") {
        for (let y = 1; y < ySize; y++) {
            for (let x = 0; x < xSize; x++) {
                let yPos = y;
                let Value = GameStatus[y][x]
                if (GameStatus[y][x] == 0) {continue;}
                while (yPos != 0 && (GameStatus[yPos-1][x] == 0 || GameStatus[yPos-1][x] == Value)) {
                    if (GameStatus[yPos-1][x] == GameStatus[yPos][x]) {
                        GameStatus[yPos-1][x] *= 2;
                        Score += GameStatus[yPos-1][x];
                        Filled--;
                    }
                    else {
                        GameStatus[yPos-1][x] = GameStatus[yPos][x];
                    }
                    GameStatus[yPos][x] = 0;
                    yPos--;
                }
            }
        }
        NewTile();
    }
    if (direction == "D") {
        for (let y = ySize-2; y >= 0; y--) {
            for (let x = 0; x < xSize; x++) {
                let yPos = y;
                let Value = GameStatus[y][x]
                if (GameStatus[y][x] == 0) {continue;}
                while (yPos != ySize-1 && (GameStatus[yPos+1][x] == 0 || GameStatus[yPos+1][x] == Value)) {
                    if (GameStatus[yPos+1][x] == GameStatus[yPos][x]) {
                        GameStatus[yPos+1][x] *= 2;
                        Score += GameStatus[yPos+1][x];
                        Filled--;
                    }
                    else {
                        GameStatus[yPos+1][x] = GameStatus[yPos][x];
                    }
                    GameStatus[yPos][x] = 0;
                    yPos++;
                }
            }
        }
        NewTile();
    }
    if (direction == "L") {
        for (let x = 1; x < xSize; x++) {
            for (let y = 0; y < ySize; y++) {
                let xPos = x;
                let Value = GameStatus[y][x]
                if (GameStatus[y][x] == 0) {continue;}
                while (xPos != 0 && (GameStatus[y][xPos-1] == 0 || GameStatus[y][xPos-1] == Value)) {
                    if (GameStatus[y][xPos-1] == GameStatus[y][xPos]) {
                        GameStatus[y][xPos-1] *= 2;
                        Score += GameStatus[y][xPos-1];
                        Filled--;
                    }
                    else {
                        GameStatus[y][xPos-1] = GameStatus[y][xPos];
                    }
                    GameStatus[y][xPos] = 0;
                    xPos--;
                }
            }
        }
        NewTile();
    }
    if (direction == "R") {
        for (let x = xSize-2; x >= 0; x--) {
            for (let y = 0; y < ySize; y++) {
                let xPos = x;
                let Value = GameStatus[y][x]
                if (GameStatus[y][x] == 0) {continue;}
                while (xPos != xSize-1 && (GameStatus[y][xPos+1] == 0 || GameStatus[y][xPos+1] == Value)) {
                    if (GameStatus[y][xPos+1] == GameStatus[y][xPos]) {
                        GameStatus[y][xPos+1] *= 2;
                        Score += GameStatus[y][xPos+1];
                        Filled--;
                    }
                    else {
                        GameStatus[y][xPos+1] = GameStatus[y][xPos];
                    }
                    GameStatus[y][xPos] = 0;
                    xPos++;
                }
            }
        }
        NewTile();
    }
}

function Retry() {
    location.reload();
}

NewTile();
NewTile();

function delay(callback, ms) {
    var timer = 0;
    return function() {
      var context = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        callback.apply(context, args);
      }, ms || 0);
    };
}

document.body.onkeyup = function(press) {
    if (Lose == true) {return;}
    else if (press.code == "ArrowUp") {Slide("U");}
    else if (press.code == "ArrowDown") {Slide("D");}
    else if (press.code == "ArrowLeft") {Slide("L");}
    else if (press.code == "ArrowRight") {Slide("R");}
    console.log(Filled)
}