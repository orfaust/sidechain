import styled from "styled-components";

import Chain from "./Chain";
import InsertBlock from "./InsertBlock";

import Observable from "../classes/Observable";

export default function Node({ id }) {
  const insertTrigger = new Observable(insertBlock);

  let pendingBlocks = 0;

  return (
    <StyledNode className="node">
      <InsertBlock insertHandler={insertTrigger.execute} />

      <Chain id={id} insertTrigger={insertTrigger} />
    </StyledNode>
  );

  async function insertBlock(listener, data) {
    await listener(data);
  }
}

const StyledNode = styled.div`
  width: 20em;
  background: #ff000070;
  border-radius: 1em;
  margin: 0.5em;
`;
