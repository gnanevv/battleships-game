import React, { useState, useEffect } from "react";
//UTILS
import { createPlayer, createEnemyPlayer } from "../../utils";
//COMPONENTS
import { Board, EnemyBoard, PlayerBoard, HeaderSection, GameInfo } from "../";
//UI
import * as MainPageUI from "./MainPageUI";

let player = createPlayer();
let computerPlayer = createEnemyPlayer();

export default () => {
  const defaultShips = {
    playerShips: [],
    enemyShips: [],
  };
  const [gameboard, setGameboard] = useState([]);
  const [attackboard, setAttackboard] = useState([]);
  const [allShips, setAllShips] = useState(defaultShips);
  const [isStarted, setStarted] = useState(false);
  const [winner, setWinner] = useState("");
  const [whoseTurn, setWhoseTurn] = useState("Your turn");
  const [isCheater, setIscheater] = useState(false);
  let [totalShots, setTotalShots] = useState(0);

  // initialize the game => create Player 1 and Player AI, randomize ships position, clear winner
  const init = () => {
    player = createPlayer();
    player.placeShips();
    computerPlayer = createEnemyPlayer();
    computerPlayer.placeShips();

    setGameboard(player.getGameboard());
    setAttackboard(computerPlayer.getAttackboard());
    setTotalShots(0);
    const playerShips = player.getShips();
    const enemyShips = computerPlayer.getShips();
    setAllShips({ playerShips, enemyShips });
    setWhoseTurn("Your turn");
    setStarted(false);
    setWinner("");
  };
  // initialize on mount
  useEffect(() => init(), []);

  // check if computer has won and end the game or continue with the attack
  const computerTurn = () => {
    setTimeout(() => {
      const attackResult = computerPlayer.attack(player);
      setGameboard([...player.getGameboard()]);
      if (player.hasLost()) {
        setWinner("Computer ");
        return;
      }
      if (attackResult) {
        computerTurn();
        return;
      }
      setWhoseTurn("Your turn");
    }, 500);
  };
  // check if the player has won the game or continue with the attack
  const playerTurn = (row, col) => {
    const attackResult = player.attack(computerPlayer, row, col);
    setAttackboard(computerPlayer.getAttackboard());
    setTotalShots(totalShots + 1);
    if (computerPlayer.hasLost()) {
      setWinner("You have won the game! Good job.");
      return;
    }
    if (attackResult) {
      return;
    }
    setWhoseTurn("Computer turn");
    computerTurn();
  };

  const handlePlay = () => {
    setStarted(true);
  };

  const shuffleShips = () => {
    if (!isStarted) {
      const playerShips = player.getShips();
      const enemyShips = computerPlayer.getShips();
      player.randomizeShips();
      setAllShips({ playerShips, enemyShips });
    }
  };

  const handleCellClick = (row, col) => {
    //   check if game is isStarted and if there is winner
    if (isStarted && !winner && whoseTurn === "Your turn") {
      playerTurn(row, col);
    }
  };
  // restart game
  const handleNewGame = () => {
    init();
  };
  return (
    <MainPageUI.StyledGame>
      <MainPageUI.StyledHeader>
        <h1>Battleships game</h1>
      </MainPageUI.StyledHeader>
      <MainPageUI.StyledBoardWrapper>
        <MainPageUI.InfoWrapper>
          <h3>
            Press <b>Start game</b> to test your skills!
          </h3>
          <MainPageUI.StyledCheaterButton
            onClick={() => setIscheater(!isCheater)}
          >
            Show enemy ships!
          </MainPageUI.StyledCheaterButton>
          <GameInfo totalShots={totalShots}></GameInfo>
          <HeaderSection
            winner={winner}
            isStarted={isStarted}
            onPlay={handlePlay}
            onRandom={shuffleShips}
            onNewGame={handleNewGame}
            whoseTurn={whoseTurn}
          />
        </MainPageUI.InfoWrapper>
        <div>
          <MainPageUI.StyledParagraph>Player board</MainPageUI.StyledParagraph>
          <hr></hr>
          <Board>
            <PlayerBoard board={gameboard} ships={allShips.playerShips} />
          </Board>
        </div>
        <div>
          <MainPageUI.StyledParagraph>
            Computer board
          </MainPageUI.StyledParagraph>
          <hr></hr>
          <Board>
            <EnemyBoard
              board={attackboard}
              onCellClick={handleCellClick}
              isStarted={isStarted}
              ships={allShips.enemyShips}
              isCheater={isCheater}
            />
          </Board>
        </div>
      </MainPageUI.StyledBoardWrapper>
    </MainPageUI.StyledGame>
  );
};
