import { useState, useEffect } from "react";
import useLocalStorage from "react-use-localstorage";
import styled from "styled-components";

import Node from "./components/Node";

export default function App() {
  const nodes = ["a03", "fb85", "0068", "5", "bc88f0"];

  return (
    <StyledApp className="App">
      {nodes.map((id) => (
        <Node key={id} id={id} />
      ))}
    </StyledApp>
  );
}

const StyledApp = styled.div`
  font-family: sans-serif;
  font-family: -webkit-pictograph;
  background-color: #4c6c6c;
  color: #8aa;
  min-height: 100vh;
  overflow-y: scroll;

  display: flex;
  flex-wrap: wrap;
  // justify-content: space-between;
  align-content: flex-start;
`;
