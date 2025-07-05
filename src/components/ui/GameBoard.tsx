import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { theme } from "../../theme";

const StyledBoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const StyledBoardHeader = styled(motion.div)<{ isPlayer?: boolean }>`
  background: ${(props) =>
    props.isPlayer ? theme.colors.playerGradient : theme.colors.enemyGradient};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  box-shadow: ${theme.shadows.md};
  margin-bottom: ${theme.spacing.md};

  h2 {
    font-family: ${theme.typography.fontFamily};
    font-size: ${theme.typography.fontSizes.xl};
    font-weight: ${theme.typography.fontWeights.bold};
    color: ${theme.colors.white};
    text-align: center;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
`;

const StyledBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  gap: 2px;
  background: rgba(255, 255, 255, 0.1);
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.lg};
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: ${theme.shadows.lg};
`;

const StyledCell = styled(motion.div)<{
  isHeader?: boolean;
  isHit?: boolean;
  isMiss?: boolean;
  hasShip?: boolean;
  isClickable?: boolean;
  showShip?: boolean;
}>`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeights.semibold};
  font-family: ${theme.typography.fontFamily};
  user-select: none;
  transition: ${theme.animations.transition};

  ${(props) =>
    props.isHeader &&
    `
    background: rgba(255, 255, 255, 0.1);
    color: ${theme.colors.white};
    font-weight: ${theme.typography.fontWeights.bold};
  `}

  ${(props) =>
    !props.isHeader &&
    `
    background: ${theme.colors.water};
    cursor: ${props.isClickable ? "pointer" : "default"};
    
    &:hover {
      ${
        props.isClickable &&
        `
        background: rgba(255, 255, 255, 0.2);
        transform: scale(1.05);
        box-shadow: ${theme.shadows.glow};
      `
      }
    }
  `}
  
  ${(props) =>
    props.isHit &&
    `
    background: ${theme.colors.hit} !important;
    color: ${theme.colors.white};
    box-shadow: ${theme.shadows.md};
    
    &::after {
      content: '💥';
      font-size: 16px;
    }
  `}
  
  ${(props) =>
    props.isMiss &&
    `
    background: ${theme.colors.miss} !important;
    color: ${theme.colors.gray600};
    
    &::after {
      content: '○';
      font-size: 12px;
    }
  `}
  
  ${(props) =>
    props.hasShip &&
    props.showShip &&
    !props.isHit &&
    !props.isMiss &&
    `
    background: ${theme.colors.ship} !important;
    color: ${theme.colors.white};
    box-shadow: ${theme.shadows.inner};
    
    &::after {
      content: '🚢';
      font-size: 14px;
    }
  `}
  
  @media (max-width: ${theme.breakpoints.md}) {
    width: 28px;
    height: 28px;
    font-size: ${theme.typography.fontSizes.xs};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    width: 24px;
    height: 24px;
  }
`;

const StyledShipInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.md};
  justify-content: center;
`;

const StyledShipTag = styled.div<{ isDestroyed?: boolean }>`
  background: ${(props) =>
    props.isDestroyed ? theme.colors.hit : theme.colors.cardGradient};
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${theme.borderRadius.full};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeights.medium};
  color: ${theme.colors.white};
  text-decoration: ${(props) => (props.isDestroyed ? "line-through" : "none")};
  opacity: ${(props) => (props.isDestroyed ? 0.6 : 1)};
  transition: ${theme.animations.transition};
`;

interface GameBoardProps {
  title: string;
  isPlayer?: boolean;
  board: any[][];
  ships?: any[];
  onCellClick?: (row: number, col: number) => void;
  isClickable?: boolean;
  showShips?: boolean;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  title,
  isPlayer = false,
  board,
  ships = [],
  onCellClick,
  isClickable = false,
  showShips = false,
}) => {
  const headers = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  const renderCell = (row: number, col: number) => {
    // Header cells
    if (row === 0 || col === 0) {
      const content =
        row === 0 ? headers[col] : col === 0 ? row.toString() : "";
      return (
        <StyledCell key={`${row}-${col}`} isHeader>
          {content}
        </StyledCell>
      );
    }

    // Game cells
    const actualRow = row - 1;
    const actualCol = col - 1;
    const cell = board[actualRow]?.[actualCol];

    if (!cell) return null;

    // Handle different cell formats
    let isHit = false;
    let isMiss = false;
    let hasShip = false;

    if (typeof cell === "object") {
      // New format: { hit: boolean, ship: boolean }
      isHit = cell.hit && cell.ship;
      isMiss = cell.hit && !cell.ship;
      hasShip = cell.ship;
    } else {
      // Original format: string values
      isHit = cell === "X";
      isMiss = cell === "M";
      hasShip = cell === "S" || cell === "X";
    }

    const cellClickable = isClickable && !isHit && !isMiss;

    return (
      <StyledCell
        key={`${row}-${col}`}
        isHit={isHit}
        isMiss={isMiss}
        hasShip={hasShip}
        showShip={showShips}
        isClickable={cellClickable}
        onClick={() => cellClickable && onCellClick?.(actualRow, actualCol)}
        whileHover={cellClickable ? { scale: 1.1 } : {}}
        whileTap={cellClickable ? { scale: 0.95 } : {}}
      />
    );
  };

  return (
    <StyledBoardContainer>
      <StyledBoardHeader
        isPlayer={isPlayer}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>{title}</h2>
      </StyledBoardHeader>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <StyledBoard>
          {Array.from({ length: 11 }, (_, row) =>
            Array.from({ length: 11 }, (_, col) => renderCell(row, col))
          )}
        </StyledBoard>
      </motion.div>

      {ships.length > 0 && (
        <StyledShipInfo>
          {ships.map((ship, index) => (
            <StyledShipTag key={index} isDestroyed={ship.isSunk?.()}>
              {ship.name || `Ship ${index + 1}`} ({ship.length || ship.size})
            </StyledShipTag>
          ))}
        </StyledShipInfo>
      )}
    </StyledBoardContainer>
  );
};
