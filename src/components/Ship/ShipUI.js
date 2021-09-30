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
  border: 2px solid #403771;
  border-radius: 2px;
  background-color: rgba(0, 0, 255, 0.05);
  pointer-events: none;
`;
