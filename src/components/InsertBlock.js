import styled from "styled-components";

import { useState } from "react";

export default function InsertBlock({ insertHandler }) {
  const [data, setData] = useState("");

  return (
    <StyledInsertBlock>
      <form onSubmit={handleSubmit}>
        <input placeholder="insert data" onChange={handleChange} value={data} />

        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </StyledInsertBlock>
  );

  function handleSubmit(event) {
    event.preventDefault();

    const value = data.trim();

    if (value.length === 0) return;

    insertHandler(value);
    setData("");
  }

  function handleChange(event) {
    setData(event.target.value);
  }
}

const StyledInsertBlock = styled.div`
  form {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 0 1em;

    input {
      background-color: #fffd;
      flex: 5;
    }
    button {
      background-color: #fff6;
      flex: 1;
    }
  }
`;
