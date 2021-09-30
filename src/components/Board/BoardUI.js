import styled from "styled-components";

export const StyledBoardContainer = styled.div`
  display: grid;
  width: 457px;
  height: 457px;
  grid-template: 45px 1fr/ 45px 1fr;
  background-image: radial-gradient(
    circle 465px at -15.1% -25%,
    rgba(17, 130, 193, 1) 0%,
    rgba(67, 166, 238, 1) 49%,
    rgba(126, 203, 244, 1) 90.2%
  );
  border: 1px solid #2cc7f1;
  border-radius: 4px;
`;

export const StyledNumbersCaption = styled.div`
  display: grid;
  grid-template-rows: repeat(10, 1fr);
  grid-column: 1/2;
`;

export const StyledCaptionText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
`;

export const StyledLettersCaption = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-column: 2/3;
`;
