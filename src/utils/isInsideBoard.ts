import { BOARD_SIZE } from "../constants/boardSettings";

interface Coordinates {
  row: number;
  col: number;
}

const isInsideBoard = (coords: Coordinates): boolean => {
  return (
    coords.row >= 0 &&
    coords.row < BOARD_SIZE &&
    coords.col >= 0 &&
    coords.col < BOARD_SIZE
  );
};

export default isInsideBoard;
