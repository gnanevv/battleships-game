import styled from "styled-components";

export const StyledBoardContainer = styled.div`
  display: grid;
  width: 457px;
  height: 457px;
  grid-template: 45px 1fr/ 45px 1fr;
  background-color: #dff3ff;
  border-radius: 4px;
`;

export const StyledNumbersCaption = styled.div`
  display: grid;
  grid-template-rows: repeat(10, 1fr);
  grid-column: 1/2;
  background-color: #f8f8f8;

`;

export const StyledCaptionText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  background-color: #f8f8f8;

`;

export const StyledLettersCaption = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-column: 2/3;
  background-color: white;
`;
