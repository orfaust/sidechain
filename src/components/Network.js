import { useState, useEffect, memo } from "react";
import useLocalStorage from "react-use-localstorage";
import styled from "styled-components";

import { SHA256 } from "crypto-js";

import NodeClass from "../classes/NodeClass";
import Node from "./Node";

const MemoNode = memo(Node);

export default function Newtwork({ newNodeHook, handleSelectedNode }) {
  const [storedNodes, saveNodes] = useLocalStorage("storedNodes", "[]");

  // display stored nodes
  const [nodes, setNodes] = useState(getNodes());

  newNodeHook(insertNode);

  return (
    <Styled className="newtwork">
      {nodes.map((node) => (
        <MemoNode key={node.id} {...node} handleSelected={handleSelectedNode} />
      ))}
    </Styled>
  );

  function insertNode(data) {
    setNodes((nodes) => {
      data.id = nodes.length;

      const newNode = new NodeClass(data);

      const newNodes = [...nodes, newNode];
      saveNodes(JSON.stringify(newNodes));
      return newNodes;
    });
  }

  function getNodes() {
    return JSON.parse(storedNodes);
  }
}

const Styled = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
`;
