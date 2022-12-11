//gameboard Module
const gameboard = (() => {
  console.log("gameboard module is running");
  const winCombos = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  //create playerFactory with own Array
  const playerFactory = (name, mark) => {
    const playerArray = [];
    const printArray = () => console.log(playerArray);
    const turn = true;
    const won = false;
    return { name, playerArray, printArray, turn, mark, won };
  };

  //created Player 1
  let player1 = playerFactory("player1", "x");

  //created Player 2
  let player2 = playerFactory("player2", "o");

  let turnCounter = 0;
  let winGame = false;

  //checks for winner
  const checkWin = (player) => {
    //sort player arrays
    player.playerArray.sort((a, b) => a - b);

    //checks for each combo if the playerArray has all entries
    for (let [index, combo] of winCombos.entries()) {
      if (combo.every((elem) => player.playerArray.indexOf(elem) > -1)) {
        winGame = true;
        player.won = true;

        //show win modal
        displayController.wonModal(player);
        //show button
        displayController.playAgain();

        //resetting GameStats and UI
        resetGame();

        console.log(`${player.name} won`);
      }
    }
    return { winGame, player };
  };

  //reset game
  const resetGame = () => {
    player1.playerArray = [];
    player1.won = false;
    player1.turn = true;

    player2.playerArray = [];
    player2.won = false;
    player2.turn = true;

    //resetUI
    const btnAgain = document.querySelector(".btn-again");

    btnAgain.addEventListener("click", () => {
      displayController.resetBoard();
    });

    return { player1, player2 };
  };

  //add mark on display and save mark in player array as module
  const addMark = (() => {
    const marker = document.querySelectorAll("td");

    //turns logic
    marker.forEach((cell) => {
      cell.addEventListener("click", () => {
        //player 1 turn
        if (player1.turn == true && cell.textContent === "") {
          //push choice to player 1 array and mark board
          player1.playerArray.push(Number(cell.id));
          cell.textContent = player1.mark;

          //change turn
          player1.turn = false;
          player2.turn = true;
        } //player 2 turn
        else if (player2.turn == true && cell.textContent === "") {
          //push choice to player 2 array and mark board
          player2.playerArray.push(Number(cell.id));
          cell.textContent = player2.mark;

          //change turn
          player1.turn = true;
          player2.turn = false;
        }

        checkWin(player1);
        checkWin(player2);

        //console logging
        if (winGame == true && player1.won == true) {
          console.log(`${player1.name} won`);
        } else if (winGame == true && player2.won == true) {
          console.log(`${player2.name} won`);
        }
      });
    });
  })();

  return { player1, player2, winGame };
})();

//display controller
const displayController = (() => {
  //play again button
  const playAgain = () => {
    const div = document.createElement("div");
    div.classList.add("btn-again");
    div.textContent = "Play again";

    document.querySelector("body").appendChild(div);
  };

  //won modal
  const wonModal = (player) => {
    const div = document.createElement("div");
    div.classList.add("won");
    div.textContent = `${player.name} won!`;

    document.querySelector("body").appendChild(div);

    //add shade to gameBoard
    const td = document.querySelectorAll("td");
    td.forEach((td) => td.classList.add("game-won"));
  };

  //reset UI
  const resetBoard = () => {
    //remove won modal
    const div = document.querySelector(".won");
    document.querySelector("body").removeChild(div);

    //remove button
    const btnAgain = document.querySelector(".btn-again");
    document.querySelector("body").removeChild(btnAgain);

    //remove gameUI
    const boardTable = document.querySelectorAll("td");
    boardTable.forEach((cell) => {
      cell.textContent = "";
      cell.classList.remove("game-won");
    });
  };
  return { resetBoard, wonModal, playAgain };
})();
