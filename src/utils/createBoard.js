import { createShip, getRandomInt, isInsideBoard } from ".";
import { BOARD_SIZE } from "../constants/boardSettings";

// initialize board with empty arrays
function initialBoard() {
  const arr = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    arr.push([]);
    for (let j = 0; j < BOARD_SIZE; j++) {
      arr[i].push("");
    }
  }
  return arr;
}

export default () => {
  let board = initialBoard();
  let ships = [];

  const getGameboard = () => board;
  const getAttackboard = () =>
    board.map((row) => row.map((cell) => (cell === "S" ? "" : cell)));
  const getShips = () => ships;

  const getNeighbors = (ship, withShip = true) => {
    const { length = 1, orientation } = ship;
    const { row, col } = ship.getStartCoords();

    const coordsArr = [];

    if (!orientation) {
      coordsArr.push({ row: row - 1, col: col - 1 });
      coordsArr.push({ row: row - 1, col });
      coordsArr.push({ row: row - 1, col: col + 1 });

      for (let i = row; i < row + length; i++) {
        coordsArr.push({ row: i, col: col - 1 });
        if (withShip) {
          coordsArr.push({ row: i, col });
        }
        coordsArr.push({ row: i, col: col + 1 });
      }
      coordsArr.push({ row: row + length, col: col - 1 });
      coordsArr.push({ row: row + length, col });
      coordsArr.push({ row: row + length, col: col + 1 });
    }

    if (orientation) {
      coordsArr.push({ row: row - 1, col: col - 1 });
      coordsArr.push({ row, col: col - 1 });
      coordsArr.push({ row: row + 1, col: col - 1 });

      for (let i = col; i < col + length; i++) {
        coordsArr.push({ row: row - 1, col: i });
        if (withShip) {
          coordsArr.push({ row, col: i });
        }
        coordsArr.push({ row: row + 1, col: i });
      }

      coordsArr.push({ row: row - 1, col: col + length });
      coordsArr.push({ row, col: col + length });
      coordsArr.push({ row: row + 1, col: col + length });
    }
    // return only inside board ships
    return coordsArr.filter(isInsideBoard);
  };
  const markArea = (ship) => {
    const coordsArr = getNeighbors(ship, false);
    coordsArr.forEach((coords) => {
      board[coords.row][coords.col] = "M";
    });
  };
  const canPlaceShip = (ship) => {
    const { length } = ship;
    const { row, col } = ship.getStartCoords();

    if (row < 0 || col < 0 || col >= 10 || row >= 10) {
      return false;
    }

    if (ship.orientation) {
      if (col + length > 10) {
        return false;
      }
    }
    if (!ship.orientation) {
      if (row + length > 10) {
        return false;
      }
    }

    const neighbors = getNeighbors(ship);
    let hasShip = false;
    for (const coords of neighbors) {
      if (board[coords.row][coords.col] === "S") {
        hasShip = true;
        break;
      }
    }

    return !hasShip;
  };

  const placeShip = (ship) => {
    if (canPlaceShip(ship)) {
      ship.coords.forEach((coords) => {
        board[coords.row][coords.col] = "S";
      });
      ships.push(ship);
      return true;
    }
    return false;
  };
  const placeShips = () => {
    const shipsToPlace = {
      battleship: { quantity: 1, length: 5 },
      destroyer: { quantity: 2, length: 4 },
    };

    Object.entries(shipsToPlace).forEach(([name, ship]) => {
      let { quantity, length } = ship;

      while (quantity > 0) {
        const newShip = createShip(
          getRandomInt(0, BOARD_SIZE),
          getRandomInt(0, BOARD_SIZE),
          length,
          Math.random() > 0.5
        );

        if (placeShip(newShip)) {
          quantity--;
        }
      }
    });
  };

  const randomizeShips = () => {
    board = initialBoard();
    ships = [];
    placeShips();
  };

  const receiveAttack = (row, col) => {
    if (board[row][col] !== "S") {
      board[row][col] = "M";
      return "miss";
    }

    const ship = ships.find((s) =>
      s.coords.find((coords) => coords.row === row && coords.col === col)
    );
    if (ship) {
      ship.hit();
      if (ship.isSunk()) {
        board[row][col] = "X";
        markArea(ship);
        return "dead";
      }
      board[row][col] = "X";
      return "hit";
    }
  };
  return {
    getShips,
    getGameboard,
    getAttackboard,
    placeShip,
    placeShips,
    receiveAttack,
    randomizeShips,
  };
};
