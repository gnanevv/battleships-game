import React from "react";
import styled from "styled-components";
import MainPage from "./components/MainPage/MainPage";
import './app.css'
function App() {
  const StyledWrapper = styled.div`
    max-width: 100vw;
    height: 100vh;
    background: #f8f8f8;
    margin: 0 auto;
    display: flex;
    justify-content: center;
  `;

  return (
    <StyledWrapper>
      <MainPage />
    </StyledWrapper>
  );
}

export default App;
