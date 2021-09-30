import { getRandomInt, createPlayer, isInsideBoard } from ".";
import { BOARD_SIZE } from "../constants/boardSettings";

export default () => {
  let hitsHistory = [];
  const player = createPlayer();

  // simulate a simple random attack for computer player
  const randomAttack = (board) => {
    const emptyCellCooords = [];

    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (board[row][col] === "") {
          emptyCellCooords.push({ row, col });
        }
      }
    }

    return emptyCellCooords[getRandomInt(0, emptyCellCooords.length)];
  };
  // search for a open position to attack on the board
  const searchingAttack = (board) => {
    const { row, col } = hitsHistory[hitsHistory.length - 1];

    let neighbors = [];

    if (hitsHistory.length > 1) {
      const prevHitCoords = hitsHistory[hitsHistory.length - 2];

      if (prevHitCoords.row === row) {
        const sortedHitsHistory = hitsHistory.sort((a, b) => a.col - b.col);
        const minCoords = sortedHitsHistory[0];
        const maxCoords = sortedHitsHistory[sortedHitsHistory.length - 1];

        neighbors.push({ row, col: maxCoords.col + 1 });
        neighbors.push({ row, col: minCoords.col - 1 });
      }

      if (prevHitCoords.col === col) {
        const sortedHitsHistory = hitsHistory.sort((a, b) => a.row - b.row);
        const minCoords = sortedHitsHistory[0];
        const maxCoords = sortedHitsHistory[sortedHitsHistory.length - 1];

        neighbors.push({ row: maxCoords.row + 1, col });
        neighbors.push({ row: minCoords.row - 1, col });
      }
    } else {
      neighbors.push({ row: row - 1, col });
      neighbors.push({ row, col: col + 1 });
      neighbors.push({ row: row + 1, col });
      neighbors.push({ row, col: col - 1 });
    }
    neighbors = neighbors.filter(isInsideBoard);
    const emptyNeighbors = [];
    neighbors.forEach((coords) => {
      if (board[coords.row][coords.col] === "") {
        emptyNeighbors.push(coords);
      }
    });
    return emptyNeighbors[getRandomInt(0, emptyNeighbors.length)];
  };

  const getAttackCoords = (enemy) => {
    let coords;
    const enemyBoard = enemy.getAttackboard();
    if (hitsHistory.length === 0) {
      coords = randomAttack(enemyBoard);
    } else {
      coords = searchingAttack(enemyBoard);
    }
    return coords;
  };

  const attack = (enemy) => {
    const { row, col } = getAttackCoords(enemy);
    const attackResult = enemy.receiveAttack(row, col);
    if (attackResult === "hit") {
      hitsHistory.push({ row, col });
      return true;
    }

    if (attackResult === "dead") {
      hitsHistory = [];
      return true;
    }

    return false;
  };
  return Object.assign(player, {
    attack,
  });
};
