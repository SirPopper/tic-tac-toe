//gameboard Module
const gameboard = (() => {
  console.log("gameboard module is running");
  const winCombos = [
    [0, 1, 2],
    [0, 3, 6],
    [3, 4, 5],
    [6, 7, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [0, 4, 8],
  ];

  //create playerFactory with own Array
  const playerFactory = (name, mark) => {
    const playerArray = [];
    const printArray = () => console.log(playerArray);
    const turn = true;
    return { name, playerArray, printArray, turn, mark };
  };

  //created Player 1
  const dan = playerFactory("dan", "x");

  //created Player 2
  const mary = playerFactory("marry", "o");

  let turnCounter = 0;

  //add mark on display and save mark in player array as module
  const addMark = (() => {
    const marker = document.querySelectorAll("td");

    //turns logic
    marker.forEach((cell) => {
      cell.addEventListener("click", () => {
        if (dan.turn == true) {
          //push choice to player 1 array and mark board
          dan.playerArray.push(cell.id);
          cell.textContent = dan.mark;

          //change turn
          dan.turn = false;
          mary.turn = true;

          //increase counter
          turnCounter++;
        } else {
          //push choice to player 2 array and mark board
          mary.playerArray.push(cell.id);
          cell.textContent = mary.mark;

          //change turn
          dan.turn = true;
          mary.turn = false;

          //increase counter
          turnCounter++;
        }
      });
    });
  })();
})();
