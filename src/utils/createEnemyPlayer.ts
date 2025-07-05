import getRandomInt from "./getRandomInt";
import createPlayer from "./createPlayer";
import isInsideBoard from "./isInsideBoard";
import { BOARD_SIZE } from "../constants/boardSettings";

type CellValue = "" | "S" | "X" | "M";
type Board = CellValue[][];
type AttackResult = "miss" | "hit" | "dead";

interface Coordinates {
  row: number;
  col: number;
}

interface Player {
  receiveAttack(row: number, col: number): AttackResult;
  placeShip(ship: any): boolean;
  placeShips(): void;
  getGameboard(): Board;
  getAttackboard(): Board;
  getShips(): any[];
  attack(enemy: Player, row: number, col: number): boolean;
  hasLost(): boolean;
  randomizeShips(): void;
}

interface EnemyPlayer extends Player {
  attack(enemy: Player): boolean;
}

const createEnemyPlayer = (): EnemyPlayer => {
  let hitsHistory: Coordinates[] = [];
  const player = createPlayer();

  // simulate a simple random attack for computer player
  const randomAttack = (board: Board): Coordinates => {
    const emptyCellCoords: Coordinates[] = [];

    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (board[row][col] === "") {
          emptyCellCoords.push({ row, col });
        }
      }
    }

    return emptyCellCoords[getRandomInt(0, emptyCellCoords.length)];
  };

  // search for an open position to attack on the board
  const searchingAttack = (board: Board): Coordinates => {
    const { row, col } = hitsHistory[hitsHistory.length - 1];

    let neighbors: Coordinates[] = [];

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
    const emptyNeighbors: Coordinates[] = [];

    neighbors.forEach((coords) => {
      if (board[coords.row][coords.col] === "") {
        emptyNeighbors.push(coords);
      }
    });

    return emptyNeighbors[getRandomInt(0, emptyNeighbors.length)];
  };

  const getAttackCoords = (enemy: Player): Coordinates => {
    let coords: Coordinates;
    const enemyBoard = enemy.getAttackboard();

    if (hitsHistory.length === 0) {
      coords = randomAttack(enemyBoard);
    } else {
      coords = searchingAttack(enemyBoard);
    }

    return coords;
  };

  const attack = (enemy: Player): boolean => {
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

  return {
    ...player,
    attack,
  };
};

export default createEnemyPlayer;
