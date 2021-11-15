import { useState } from "react";
import styled from "styled-components";

import Chain from "./Chain";
import InsertBlock from "./InsertBlock";

import Command from "../classes/Command";

export default function Node(props) {
  const { id, name, handleSelected } = props;

  const insertBlockCmd = new Command();

  let pendingBlocks = 0;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <StyledNode className="node">
      <div className="node-id" onClick={handleClick}>
        {name}
      </div>

      {/*
      <div className="details">
        <InsertBlock insertHandler={insertBlockCmd.execute} />
        <Chain {...props} insertBlockCmd={insertBlockCmd} />
      </div>
      */}
    </StyledNode>
  );

  function handleClick(e) {
    handleSelected(props);
  }
}

const StyledNode = styled.div`
  background: #ff000070;
  border-radius: 1em;
  margin: 0.5em;
  // width: 5em;

  .node-id {
    color: #fff8;
    cursor: pointer;
    padding: 1em;

    &:hover {
      color: #fff;
    }
  }

  .details {
    display: none;
  }
`;
