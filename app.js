let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let showTurn = document.querySelector("#showTurn");

let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
]

let moveCount = 0;

const resetGame = () => {
    turnO = true;
    moveCount = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO) {
            showTurn.innerText = "Player X's Turn";
            box.innerText = 'O';
            box.style.color = "#F1C40F";
            box.style.fontWeight = "700";
            turnO= false;
        } else {
            showTurn.innerText = "Player O's Turn";
            box.innerText = 'X';
            box.style.color = "#4CC9F0";
            box.style.fontWeight = "700";
            turnO = true;
        }
        box.disabled = true;
        moveCount++;
        draw (moveCount);
        checkWinner();
    });
});

const disableBoxes = () => {
    for ( let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for ( let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    for(let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val!="" && pos2Val!="" && pos3Val!=""){
            if(pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
            }
        }
    }
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

const draw = (moveCount) => {
    if(moveCount==9) {
       msg.innerText = "It's a Draw!";
       msgContainer.classList.remove("hide");
       disableBoxes(); 
    }
}