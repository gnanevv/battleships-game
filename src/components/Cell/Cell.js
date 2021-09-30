import React from "react";
// UI
import * as CellUI from "./CellUI";

export default ({ type, onCellClick, isStarted }) => {
  const renderCell = (type) => {
    if (type === "X") {
      return <CellUI.StyledHitCell>&#128500;</CellUI.StyledHitCell>;
    }

    if (type === "M") {
      return <CellUI.StyledMarkCell />;
    }

    if (onCellClick !== undefined) {
      return (
        <CellUI.StyledCell onClick={onCellClick} hover isStarted={isStarted} />
      );
    }

    return <CellUI.StyledCell />;
  };

  return <>{renderCell(type)}</>;
};
