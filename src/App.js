import { useState, useEffect } from "react";
import useLocalStorage from "react-use-localstorage";
import styled from "styled-components";

import Command from "./classes/Command";

import Network from "./components/Network";
import Form from "./components/Form";
import NodeDetails from "./components/NodeDetails";

const formProps = {
  fields: [
    {
      type: "text",
      name: "name",
      required: true,
      placeholder: "node name",
    },
  ],
  submitBtn: {
    label: "Connect node",
  },
};

export default function App() {
  let insertNodeHook;

  const networkProps = {
    newNodeHook: (hook) => {
      insertNodeHook = hook;
    },
  };

  const nodeDetailsProps = {
    display: new Command(),
  };

  networkProps.handleSelectedNode = nodeDetailsProps.display.execute;

  return (
    <StyledApp className="app">
      <div className="sidebar">
        <Form {...formProps} submitHandler={submitHandler} />
        <NodeDetails {...nodeDetailsProps} />
      </div>

      <Network {...networkProps} />
    </StyledApp>
  );

  function submitHandler(values, actions) {
    insertNodeHook(values);

    // reset form fields
    actions.resetFields();
  }
}

const StyledApp = styled.div`
  font-family: sans-serif;
  font-family: -webkit-pictograph;
  background-color: #0f3b5e;
  color: #8aa;
  min-height: 100vh;
  display: flex;

  .sidebar {
    min-width: 20em;
  }
`;
