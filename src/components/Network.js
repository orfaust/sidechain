import { useState, useEffect } from "react";
import useLocalStorage from "react-use-localstorage";
import styled from "styled-components";

import Node from "./Node";

export default function Newtwork() {
  const nodes = ["a03", "fb85", "0068", "5", "bc88f0"];

  return (
    <Styled className="newtwork">
      {nodes.map((id) => (
        <Node key={id} id={id} />
      ))}
    </Styled>
  );
}

const Styled = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
`;
