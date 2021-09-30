import React from "react";
// CONSTANTS
import { BOARD_SIZE, COL_ARRAY } from "../../constants/boardSettings";
// UI
import * as BoardUI from "./BoardUI";

export default function Board({ children }) {
  // create array with length equal to the board size number in our case its 10 as constant but it can be different
  let rowLenght = Array.from(Array(BOARD_SIZE), (_, x) => x);

  return (
    <BoardUI.StyledBoardContainer>
      <BoardUI.StyledLettersCaption>
        {COL_ARRAY.map((col, index) => (
          <BoardUI.StyledCaptionText key={index}>
            {col}
          </BoardUI.StyledCaptionText>
        ))}
      </BoardUI.StyledLettersCaption>
      <BoardUI.StyledNumbersCaption>
        {rowLenght.map((row, index) => (
          <BoardUI.StyledCaptionText key={index}>
            {row}
          </BoardUI.StyledCaptionText>
        ))}
      </BoardUI.StyledNumbersCaption>
      {children}
    </BoardUI.StyledBoardContainer>
  );
}
