import React from "react";
//COMPONENTS
import { Cell, Ship } from "../";
//UI
import * as PlayerBoardUI from "./PlayerBoardUI";

export default ({ board, ships }) => {
  const renderCells = () =>
    board.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <Cell type={cell} key={`g${rowIndex}${colIndex}`} />
      ))
    );

  const renderShips = () =>
    ships.map((ship, index) => {
      const { coords } = ship;
      return (
        <Ship
          coords={coords}
          key={index}
          length={ship.length}
          orientation={ship.orientation}
        />
      );
    });

  return (
    <PlayerBoardUI.StyledBoard>
      {renderCells()}
      {renderShips()}
    </PlayerBoardUI.StyledBoard>
  );
};
