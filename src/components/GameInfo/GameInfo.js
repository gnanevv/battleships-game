import React from "react";
import * as GameInfoUI from "./GameInfoUI";
export default ({ totalShots }) => {
  return (
    <GameInfoUI.StyledWrapper>
      Total shots you did:{" "}
      <GameInfoUI.StyledParagraph>{totalShots}</GameInfoUI.StyledParagraph>
    </GameInfoUI.StyledWrapper>
  );
};
