import React from "react";
import { GameContainer } from "./components/ui/GameContainer";
import "./app.css";
import { ModernBattleshipGame } from "./components/ModernBattleshipGame";

const App: React.FC = () => {
  return (
    <GameContainer>
      <ModernBattleshipGame />
    </GameContainer>
  );
};

export default App;
