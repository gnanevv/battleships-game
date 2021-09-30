import React from "react";
import Explode from './explode.svg'
// UI
import * as CellUI from "./CellUI";

export default ({ type, onCellClick, isStarted }) => {
  const renderCell = (type) => {
    console.log(type)
    if (type === "X") {
      return <CellUI.StyledHitCell><CellUI.StyledExplodeImage src={Explode} alt="explode" /></CellUI.StyledHitCell>;
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
