import React from "react";
import styled from "styled-components";
import { theme } from "../../theme";

const StyledGameContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.lg};
  background: ${theme.colors.backgroundGradient};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.md};
  }
`;

const StyledGameCard = styled.div`
  background: ${theme.colors.cardGradient};
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${theme.borderRadius["2xl"]};
  box-shadow: ${theme.shadows.xl};
  padding: ${theme.spacing["2xl"]};
  width: 100%;
  max-width: 1400px;

  @media (max-width: ${theme.breakpoints.lg}) {
    padding: ${theme.spacing.lg};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.md};
    border-radius: ${theme.borderRadius.lg};
  }
`;

const StyledTitle = styled.h1`
  font-family: ${theme.typography.fontFamily};
  font-size: ${theme.typography.fontSizes["4xl"]};
  font-weight: ${theme.typography.fontWeights.bold};
  text-align: center;
  margin-bottom: ${theme.spacing["2xl"]};
  background: linear-gradient(
    135deg,
    ${theme.colors.white} 0%,
    rgba(255, 255, 255, 0.8) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSizes["3xl"]};
    margin-bottom: ${theme.spacing.xl};
  }
`;

interface GameContainerProps {
  children: React.ReactNode;
  title?: string;
}

export const GameContainer: React.FC<GameContainerProps> = ({
  children,
  title = "BATTLESHIP",
}) => {
  return (
    <StyledGameContainer>
      <StyledGameCard>
        <StyledTitle>{title}</StyledTitle>
        {children}
      </StyledGameCard>
    </StyledGameContainer>
  );
};
