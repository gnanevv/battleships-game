import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { theme } from "../theme";
import { GameBoard } from "./ui/GameBoard";
import { GameControls } from "./ui/GameControls";
import { createPlayer, createEnemyPlayer } from "../utils";

const StyledGameLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: auto 1fr;
  gap: ${theme.spacing.xl};
  align-items: start;

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    gap: ${theme.spacing.lg};
  }
`;

const StyledControlsArea = styled.div`
  grid-column: 2;
  grid-row: 1 / -1;

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-column: 1;
    grid-row: 1;
  }
`;

const StyledPlayerBoard = styled(motion.div)`
  grid-column: 1;
  grid-row: 2;

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-column: 1;
    grid-row: 2;
  }
`;

const StyledEnemyBoard = styled(motion.div)`
  grid-column: 3;
  grid-row: 2;

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-column: 1;
    grid-row: 3;
  }
`;

const StyledWatermark = styled.div`
  position: absolute;
  bottom: ${theme.spacing.md};
  right: ${theme.spacing.md};
  font-size: ${theme.typography.fontSizes.sm};
  color: rgba(255, 255, 255, 0.3);
  font-family: ${theme.typography.fontFamily};
  z-index: 1;
`;

interface GameState {
  playerBoard: any[][];
  enemyBoard: any[][];
  enemyFullBoard: any[][];
  playerShips: any[];
  enemyShips: any[];
  isStarted: boolean;
  winner: string;
  whoseTurn: string;
  totalShots: number;
  isCheatMode: boolean;
}

export const ModernBattleshipGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    playerBoard: [],
    enemyBoard: [],
    enemyFullBoard: [],
    playerShips: [],
    enemyShips: [],
    isStarted: false,
    winner: "",
    whoseTurn: "Your turn",
    totalShots: 0,
    isCheatMode: false,
  });

  const [player, setPlayer] = useState<any>(null);
  const [computerPlayer, setComputerPlayer] = useState<any>(null);

  const initializeGame = useCallback(() => {
    const newPlayer = createPlayer();
    const newComputerPlayer = createEnemyPlayer();

    newPlayer.placeShips();
    newComputerPlayer.placeShips();

    setPlayer(newPlayer);
    setComputerPlayer(newComputerPlayer);

    setGameState({
      playerBoard: newPlayer.getGameboard(),
      enemyBoard: newComputerPlayer.getAttackboard(),
      enemyFullBoard: newComputerPlayer.getGameboard(),
      playerShips: newPlayer.getShips(),
      enemyShips: newComputerPlayer.getShips(),
      isStarted: false,
      winner: "",
      whoseTurn: "Your turn",
      totalShots: 0,
      isCheatMode: false,
    });
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const computerTurn = useCallback(() => {
    if (!player || !computerPlayer) return;

    setTimeout(() => {
      const attackResult = computerPlayer.attack(player);
      const newPlayerBoard = [...player.getGameboard()];

      setGameState((prev) => ({
        ...prev,
        playerBoard: newPlayerBoard,
      }));

      if (player.hasLost()) {
        setGameState((prev) => ({
          ...prev,
          winner: "Computer wins! Better luck next time.",
        }));
        return;
      }

      if (attackResult) {
        computerTurn();
        return;
      }

      setGameState((prev) => ({
        ...prev,
        whoseTurn: "Your turn",
      }));
    }, 800);
  }, [player, computerPlayer]);

  const handleCellClick = useCallback(
    (row: number, col: number) => {
      if (
        !gameState.isStarted ||
        gameState.winner ||
        gameState.whoseTurn !== "Your turn" ||
        !player ||
        !computerPlayer
      ) {
        return;
      }

      const attackResult = player.attack(computerPlayer, row, col);
      const newEnemyBoard = computerPlayer.getAttackboard();
      const newTotalShots = gameState.totalShots + 1;

      setGameState((prev) => ({
        ...prev,
        enemyBoard: newEnemyBoard,
        totalShots: newTotalShots,
      }));

      if (computerPlayer.hasLost()) {
        setGameState((prev) => ({
          ...prev,
          winner: "Congratulations! You won! 🎉",
        }));
        return;
      }

      if (attackResult) {
        return; // Player gets another turn
      }

      setGameState((prev) => ({
        ...prev,
        whoseTurn: "Computer turn",
      }));

      computerTurn();
    },
    [
      gameState.isStarted,
      gameState.winner,
      gameState.whoseTurn,
      gameState.totalShots,
      player,
      computerPlayer,
      computerTurn,
    ]
  );

  const handleStartGame = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      isStarted: true,
    }));
  }, []);

  const handleNewGame = useCallback(() => {
    initializeGame();
  }, [initializeGame]);

  const handleRandomizeShips = useCallback(() => {
    if (gameState.isStarted || !player) return;

    player.randomizeShips();
    setGameState((prev) => ({
      ...prev,
      playerBoard: player.getGameboard(),
      playerShips: player.getShips(),
    }));
  }, [gameState.isStarted, player]);

  const handleToggleCheat = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      isCheatMode: !prev.isCheatMode,
    }));
  }, []);

  const getEnemyDisplayBoard = useCallback(() => {
    // Always create a proper board structure with water cells as base
    const displayBoard = gameState.enemyBoard.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        // If there's already a hit or miss, keep it
        if (cell === "X" || cell === "M") {
          return { hit: true, ship: cell === "X" };
        }
        // For unattacked cells, show water (and ships if cheat mode is on)
        const hasShip =
          gameState.isCheatMode &&
          gameState.enemyFullBoard[rowIndex]?.[colIndex] === "S";
        return { hit: false, ship: hasShip };
      })
    );
    return displayBoard;
  }, [gameState.enemyBoard, gameState.enemyFullBoard, gameState.isCheatMode]);

  return (
    <StyledGameLayout>
      <StyledControlsArea>
        <GameControls
          isStarted={gameState.isStarted}
          winner={gameState.winner}
          whoseTurn={gameState.whoseTurn}
          totalShots={gameState.totalShots}
          onStartGame={handleStartGame}
          onNewGame={handleNewGame}
          onRandomizeShips={handleRandomizeShips}
          onToggleCheat={handleToggleCheat}
          isCheatMode={gameState.isCheatMode}
        />
      </StyledControlsArea>

      <StyledPlayerBoard
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <GameBoard
          title="Your Fleet"
          isPlayer={true}
          board={gameState.playerBoard.map((row) =>
            row.map((cell) => ({
              hit: cell === "X" || cell === "M",
              ship: cell === "S" || cell === "X",
            }))
          )}
          ships={gameState.playerShips}
          showShips={true}
        />
      </StyledPlayerBoard>

      <StyledEnemyBoard
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <GameBoard
          title="Enemy Waters"
          isPlayer={false}
          board={getEnemyDisplayBoard()}
          ships={gameState.enemyShips}
          onCellClick={handleCellClick}
          isClickable={
            gameState.isStarted &&
            !gameState.winner &&
            gameState.whoseTurn === "Your turn"
          }
          showShips={gameState.isCheatMode}
        />
      </StyledEnemyBoard>

      <StyledWatermark>Modernized Battleship Game</StyledWatermark>
    </StyledGameLayout>
  );
};
