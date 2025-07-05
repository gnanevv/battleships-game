import createBoard from "./createBoard";
import { Ship } from "./createShip";

type CellValue = "" | "S" | "X" | "M";
type Board = CellValue[][];
type AttackResult = "miss" | "hit" | "dead";

interface Player {
  receiveAttack(row: number, col: number): AttackResult;
  placeShip(ship: Ship): boolean;
  placeShips(): void;
  getGameboard(): Board;
  getAttackboard(): Board;
  getShips(): Ship[];
  attack(enemy: Player, row: number, col: number): boolean;
  hasLost(): boolean;
  randomizeShips(): void;
}

const createPlayer = (): Player => {
  const gameboard = createBoard();

  const hasLost = (): boolean => {
    return gameboard.getShips().every((ship) => ship.isSunk());
  };

  const attack = (enemy: Player, row: number, col: number): boolean => {
    const attackResult = enemy.receiveAttack(row, col);
    return attackResult !== "miss";
  };

  const {
    receiveAttack,
    placeShip,
    placeShips,
    getGameboard,
    getAttackboard,
    getShips,
    randomizeShips,
  } = gameboard;

  return {
    receiveAttack,
    placeShip,
    placeShips,
    getGameboard,
    getAttackboard,
    getShips,
    attack,
    hasLost,
    randomizeShips,
  };
};

export default createPlayer;
