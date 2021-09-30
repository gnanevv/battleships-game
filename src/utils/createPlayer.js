import { CreateBoard } from ".";

export default () => {
  const gameboard = CreateBoard();

  const hasLost = () => {
    return gameboard.getShips().every((ship) => ship.isSunk());
  };
  const attack = (enemy, row, col) => {
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
