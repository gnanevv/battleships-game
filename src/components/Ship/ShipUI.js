import styled from "styled-components";

export const StyledShip = styled.div.attrs(
  ({ row, col, length, orientation }) => ({
    style: {
      top: row * 41,
      left: col * 41,
      width: orientation ? 40 * length + 1 : "40px",
      height: !orientation ? 40 * length + 1 : "40px",
    },
  })
)`
  position: absolute;
  border-radius: 25px;
  background-color: #d0d0de;
  pointer-events: none;
  opacity: 0.6;
`;
