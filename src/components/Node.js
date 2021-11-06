import { useState } from "react";
import useLocalStorage from "react-use-localstorage";
import styled from "styled-components";

import Chain from "../classes/Chain";

import ChainComponent from "./ChainComponent";
import BlockComponent from "./BlockComponent";
import InsertBlock from "./InsertBlock";

export default function Node({ id }) {
  const [storedBlocks, setStoredBlocks] = useLocalStorage(
    "sidechain-" + id,
    "null"
  );

  const sidechain = new Chain(JSON.parse(storedBlocks));
  window.sidechain = sidechain;

  const [blocks, setBlocks] = useState(sidechain.blocks);

  const [pendingBlocks, setPendingBlocks] = useState(0);

  return (
    <StyledNode>
      <InsertBlock insertHandler={insertBlock} />

      <ChainComponent>
        {blocks &&
          [...blocks].reverse().map((block, index) => {
            const count = blocks.length - index - 1;

            return <BlockComponent key={index} index={count} {...block} />;
          })}
      </ChainComponent>
    </StyledNode>
  );

  async function insertBlock(data) {
    if (pendingBlocks >= 3) {
      return console.log("pendingBlocks limit reached");
    }

    setPendingBlocks((old) => old + 1);

    await sidechain.addBlock(data);

    setBlocks(sidechain.blocks);
    setStoredBlocks(JSON.stringify(sidechain.blocks));

    setPendingBlocks((old) => old - 1);
  }
}

const StyledNode = styled.div`
  width: 20%;
  min-width: 20em;
  max-width: 32em;
`;
