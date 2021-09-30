import styled from "styled-components";
export const StyledGame = styled.div`
  display: inline-grid;
  grid-gap: 120px;
  grid-template-rows: 100px 300px auto;
  grid-template-columns: 1fr 2fr 2fr;
  justify-content: space-between;
`;

export const StyledHeader = styled.header`
  grid-column: 1 / 4;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-family: "Avenir", sans-serif;
  color: #5d5c5c;
`;

export const StyledBoardWrapper = styled.div`
  display: flex;
  grid-gap: 40px;
  grid-column: 1 / 4;
  justify-content: space-around;
  align-items: center;
`;

export const InfoWrapper = styled.div`
  text-align: center;
  justify-content: center;
  align-items: center;
  display: grid;
  grid-template-rows: 100px 100px 100px;
`;
export const StyledParagraph = styled.p`
  font-family: Cairo, sans-serif;
  font-size: 18px;
`;
export const StyledCheaterButton = styled.button`
  position: relative;
  left: 20%;
  color: orange;
  border-radius: 25px;
  border: 1px solid #ff9800;
  display: inline-block;
  cursor: pointer;
  outline: none;
  font-family: Arial;
  font-size: 12px;
  padding: 13px 24px;
  text-decoration: none;
  width: 202px;
  height: 42px;
  &:hover {
    background: #ff9800;
    color: white;
  }
`;
