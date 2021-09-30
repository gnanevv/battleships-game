import styled from "styled-components";

export const StyledCell = styled.div`
  box-shadow: 1px 0 0 0 #fff, 0 1px 0 0 #fff, 1px 1px 0 0 #fff,
    1px 0 0 0 #fff inset, 0 1px 0 0 #fff inset;
  border-radius: 2px;
  &:hover {
    border: ${(props) =>
      props.isStarted ? (props.hover ? "2px solid red" : "none") : "none"};
    cursor: ${(props) => (props.isStarted ? props.hover && "crosshair" : "")};
  }
`;

export const StyledHitCell = styled(StyledCell)`
  color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 41px;
`;

export const StyledMarkCell = styled(StyledCell)`
  position: relative;
  background-color: #aae1fb;
  &::before {
    content: "";
    position: absolute;
    height: 4px;
    width: 4px;
    border-radius: 50%;
    background-color: #333;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
