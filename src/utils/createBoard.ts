import createShip, { Ship, Coordinates } from "./createShip";
import getRandomInt from "./getRandomInt";
import isInsideBoard from "./isInsideBoard";
import { BOARD_SIZE } from "../constants/boardSettings";

type CellValue = "" | "S" | "X" | "M";
type Board = CellValue[][];
type AttackResult = "miss" | "hit" | "dead";

interface GameBoard {
  getGameboard(): Board;
  getAttackboard(): Board;
  getShips(): Ship[];
  placeShip(ship: Ship): boolean;
  placeShips(): void;
  receiveAttack(row: number, col: number): AttackResult;
  randomizeShips(): void;
}

// initialize board with empty arrays
function initialBoard(): Board {
  const arr: Board = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    arr.push([]);
    for (let j = 0; j < BOARD_SIZE; j++) {
      arr[i].push("");
    }
  }
  return arr;
}

const createBoard = (): GameBoard => {
  let board: Board = initialBoard();
  let ships: Ship[] = [];

  const getGameboard = (): Board => board;
  const getAttackboard = (): Board =>
    board.map((row) => row.map((cell) => (cell === "S" ? "" : cell)));
  const getShips = (): Ship[] => ships;

  const getNeighbors = (
    ship: Ship,
    withShip: boolean = true
  ): Coordinates[] => {
    const { length = 1, orientation } = ship;
    const { row, col } = ship.getStartCoords();

    const coordsArr: Coordinates[] = [];

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

  const markArea = (ship: Ship): void => {
    const coordsArr = getNeighbors(ship, false);
    coordsArr.forEach((coords) => {
      board[coords.row][coords.col] = "M";
    });
  };

  const canPlaceShip = (ship: Ship): boolean => {
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

  const placeShip = (ship: Ship): boolean => {
    if (canPlaceShip(ship)) {
      ship.coords.forEach((coords) => {
        board[coords.row][coords.col] = "S";
      });
      ships.push(ship);
      return true;
    }
    return false;
  };

  const placeShips = (): void => {
    const shipsToPlace = {
      battleship: { quantity: 1, length: 4 },
      destroyer: { quantity: 2, length: 3 },
      submarine: { quantity: 3, length: 2 },
      frigate: { quantity: 4, length: 1 },
    };

    Object.entries(shipsToPlace).forEach(([name, shipType]) => {
      let { quantity, length } = shipType;

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

  const randomizeShips = (): void => {
    board = initialBoard();
    ships = [];
    placeShips();
  };

  const receiveAttack = (row: number, col: number): AttackResult => {
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
    return "miss";
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

export default createBoard;
