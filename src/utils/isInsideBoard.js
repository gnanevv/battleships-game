import { BOARD_SIZE } from "../constants/boardSettings";
//return if coords are inside the board based on the chosen size - default is 10 rows and cols
export default (coordinates) =>
  !!(
    coordinates.row >= 0 &&
    coordinates.col >= 0 &&
    coordinates.row < BOARD_SIZE &&
    coordinates.col < BOARD_SIZE
  );
