import React from "react";

//UI
import * as ShipUI from "./ShipUI";

export default ({ length, orientation, coords }) => {
  const { row, col } = coords[0];
  return (
    <ShipUI.StyledShip
      row={row}
      col={col}
      length={length}
      orientation={orientation && true}
    />
  );
};
