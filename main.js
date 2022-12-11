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
    return { name, playerArray, printArray, turn, mark };
  };

  //created Player 1
  const player1 = playerFactory("player1", "x");

  //created Player 2
  const player2 = playerFactory("player2", "o");

  let turnCounter = 0;
  let winGame = false;

  //chcks for winner
  const win = (player) => {
    //sort player arrays
    player.playerArray.sort((a, b) => a - b);

    //checks for each combo if the playerArray has all entries
    for (let [index, combo] of winCombos.entries()) {
      if (combo.every((elem) => player.playerArray.indexOf(elem) > -1)) {
        winGame = true;
        console.log(`${player.name} won`);
      }
    }
  };

  //add mark on display and save mark in player array as module
  const addMark = (() => {
    const marker = document.querySelectorAll("td");

    //turns logic
    marker.forEach((cell) => {
      cell.addEventListener("click", () => {
        turnCounter++;

        if (player1.turn == true && cell.textContent === "") {
          //push choice to player 1 array and mark board
          player1.playerArray.push(Number(cell.id));
          cell.textContent = player1.mark;

          //change turn
          player1.turn = false;
          player2.turn = true;
        } else if (player2.turn == true && cell.textContent === "") {
          //push choice to player 2 array and mark board
          player2.playerArray.push(Number(cell.id));
          cell.textContent = player2.mark;

          //change turn
          player1.turn = true;
          player2.turn = false;
        }

        win(player1);
        win(player2);
      });
    });
  })();

  return { player1, player2 };
})();
