import { useEffect, useState } from "react";
import styled from "styled-components";

export default function NodeDetails({ display }) {
  const [details, setDetails] = useState();

  useEffect(() => {
    display.subscribe((node) => {
      setDetails(node);
    });
  }, []);

  if (!details) {
    return <div />;
  }

  return (
    <StyledNodeDetails>
      <h1>Node details</h1>
      <div>
        <strong>id</strong>
        <span>{details.id}</span>
      </div>
      <div>
        <strong>name</strong>
        <span>{details.name}</span>
      </div>
      <div>
        <strong>hash</strong>
        <span>{details.hash}</span>
      </div>
      <div>
        <strong>created</strong>
        <span>{new Date(details.created).toString()}</span>
      </div>
    </StyledNodeDetails>
  );
}

const StyledNodeDetails = styled.div`
  padding: 1em;
  background: #fff4;
  color: #fff8;

  > div {
    padding: 6px 0;
    display: flex;
    justify-content: space-between;

    strong {
      min-width: 5em;
    }
    span {
      text-align: right;
      overflow-wrap: anywhere;
    }
  }
`;
