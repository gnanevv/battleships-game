import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { theme } from "../../theme";

const StyledControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
  align-items: center;
  padding: ${theme.spacing.lg};
  background: ${theme.colors.cardGradient};
  border-radius: ${theme.borderRadius.xl};
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: ${theme.shadows.lg};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.md};
  }
`;

const StyledButton = styled(motion.button)<{
  variant?: "primary" | "secondary" | "danger";
}>`
  font-family: ${theme.typography.fontFamily};
  font-size: ${theme.typography.fontSizes.md};
  font-weight: ${theme.typography.fontWeights.semibold};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.full};
  border: none;
  cursor: pointer;
  transition: ${theme.animations.transition};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  min-width: 160px;

  ${(props) => {
    switch (props.variant) {
      case "secondary":
        return `
          background: rgba(255, 255, 255, 0.1);
          color: ${theme.colors.white};
          border: 1px solid rgba(255, 255, 255, 0.2);
          
          &:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-2px);
            box-shadow: ${theme.shadows.lg};
          }
        `;
      case "danger":
        return `
          background: ${theme.colors.enemyGradient};
          color: ${theme.colors.white};
          box-shadow: ${theme.shadows.md};
          
          &:hover {
            transform: translateY(-2px);
            box-shadow: ${theme.shadows.lg};
          }
        `;
      default:
        return `
          background: ${theme.colors.buttonGradient};
          color: ${theme.colors.white};
          box-shadow: ${theme.shadows.md};
          
          &:hover {
            transform: translateY(-2px);
            box-shadow: ${theme.shadows.lg};
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const StyledGameStatus = styled(motion.div)<{ isWinner?: boolean }>`
  text-align: center;
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  margin-bottom: ${theme.spacing.md};

  ${(props) =>
    props.isWinner &&
    `
    background: ${theme.colors.success};
    color: ${theme.colors.white};
    box-shadow: ${theme.shadows.glow};
  `}

  h3 {
    font-family: ${theme.typography.fontFamily};
    font-size: ${theme.typography.fontSizes["2xl"]};
    font-weight: ${theme.typography.fontWeights.bold};
    margin: 0 0 ${theme.spacing.sm} 0;
    color: ${(props) =>
      props.isWinner ? theme.colors.white : theme.colors.gray100};
  }

  p {
    font-size: ${theme.typography.fontSizes.lg};
    font-weight: ${theme.typography.fontWeights.medium};
    margin: 0;
    color: ${(props) =>
      props.isWinner ? theme.colors.white : theme.colors.gray200};
  }
`;

const StyledGameInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.lg};
  justify-content: center;
  margin-bottom: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${theme.spacing.md};
  }
`;

const StyledInfoCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.md};
  text-align: center;
  min-width: 120px;

  h4 {
    font-family: ${theme.typography.fontFamily};
    font-size: ${theme.typography.fontSizes.sm};
    font-weight: ${theme.typography.fontWeights.medium};
    color: ${theme.colors.gray300};
    margin: 0 0 ${theme.spacing.xs} 0;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  p {
    font-size: ${theme.typography.fontSizes.xl};
    font-weight: ${theme.typography.fontWeights.bold};
    color: ${theme.colors.white};
    margin: 0;
  }
`;

interface GameControlsProps {
  isStarted: boolean;
  winner: string;
  whoseTurn: string;
  totalShots: number;
  onStartGame: () => void;
  onNewGame: () => void;
  onRandomizeShips: () => void;
  onToggleCheat?: () => void;
  isCheatMode?: boolean;
}

export const GameControls: React.FC<GameControlsProps> = ({
  isStarted,
  winner,
  whoseTurn,
  totalShots,
  onStartGame,
  onNewGame,
  onRandomizeShips,
  onToggleCheat,
  isCheatMode = false,
}) => {
  return (
    <StyledControlsContainer>
      {winner && (
        <StyledGameStatus
          isWinner={true}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3>🎉 Game Over!</h3>
          <p>{winner}</p>
        </StyledGameStatus>
      )}

      {!winner && (
        <StyledGameStatus
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3>{isStarted ? whoseTurn : "Ready to Battle?"}</h3>
          <p>{isStarted ? "Make your move!" : "Click Start Game to begin!"}</p>
        </StyledGameStatus>
      )}

      <StyledGameInfo>
        <StyledInfoCard>
          <h4>Total Shots</h4>
          <p>{totalShots}</p>
        </StyledInfoCard>
        <StyledInfoCard>
          <h4>Game Status</h4>
          <p>{isStarted ? (winner ? "Finished" : "Active") : "Ready"}</p>
        </StyledInfoCard>
      </StyledGameInfo>

      <div
        style={{
          display: "flex",
          gap: theme.spacing.md,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {!isStarted && !winner && (
          <StyledButton
            onClick={onStartGame}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Game
          </StyledButton>
        )}

        {!isStarted && (
          <StyledButton
            variant="secondary"
            onClick={onRandomizeShips}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Randomize Ships
          </StyledButton>
        )}

        {onToggleCheat && (
          <StyledButton
            variant={isCheatMode ? "danger" : "secondary"}
            onClick={onToggleCheat}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isCheatMode ? "Hide" : "Show"} Enemy Ships
          </StyledButton>
        )}

        <StyledButton
          variant="danger"
          onClick={onNewGame}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          New Game
        </StyledButton>
      </div>
    </StyledControlsContainer>
  );
};
