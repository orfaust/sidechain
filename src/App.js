import { useState, useEffect } from "react";
import useLocalStorage from "react-use-localstorage";
import styled from "styled-components";

import Network from "./components/Network";

export default function App() {
  return (
    <StyledApp className="app">
      <Network />
    </StyledApp>
  );
}

const StyledApp = styled.div`
  font-family: sans-serif;
  font-family: -webkit-pictograph;
  background-color: #0f3b5e;
  color: #8aa;
  min-height: 100vh;
`;
