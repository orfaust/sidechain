import { useState } from "react";

import styled from "styled-components";

export default function BlockComponent(props) {
  const [keys, values] = resolveValues(props);

  const [isOpen, setIsOpen] = useState();

  const className = "inner" + (isOpen ? " is-open" : "");

  // console.log(props);

  return (
    <StyledBlockComponent>
      <div className={className}>
        {keys.map((key, index) => {
          const value = values[index];

          let className = "value";

          if (key === "index") {
            className += " toggler";
          }

          return (
            value !== null && (
              <div
                key={key}
                className={className}
                onClick={() => handleClick(key)}
              >
                <pre>{value}</pre>
              </div>
            )
          );
        })}
      </div>
    </StyledBlockComponent>
  );

  function handleClick(key) {
    if (key === "index") {
      setIsOpen((old) => !old);
    }
  }
}

const StyledBlockComponent = styled.div`
  width: 100%;
  padding: 0.5em;
  color: #ccc;
  font-family: monospace;

  .inner {
    background-color: #000;
    border-radius: 1em;
    height: 100%;

    .value {
      overflow: auto;
      padding: 1em;

      pre {
        white-space: normal;
      }

      &.toggler {
        cursor: pointer;
        border-radius: 1em;

        &:hover {
          box-shadow: 0 0 0 2px red;
          background-color: #f008;
        }
      }

      & + .value {
        display: none;
        padding-top: 0;
      }
    }

    &.is-open {
      .value {
        display: block;
      }
      .value.toggler {
        margin-bottom: 1em;
      }
    }
  }
`;

function resolveValues(props) {
  const resolvers = getResolvers(),
    keys = [],
    values = [];

  for (const key in resolvers) {
    const resolver = resolvers[key];
    const value = resolver(props[key]);

    if (value === null) continue;

    keys.push(key);
    values.push(value);
  }

  return [keys, values];
}

function getResolvers() {
  return {
    index: (value) => "Id    #" + value,
    data: (value) => "Data  " + value,
    timestamp: (value) => "Time  " + timestampToString(value),
    nonce: (value) => "Nonce " + value,
    hash: (value) => "Hash  " + value,
    parentHash: (value) => "Phash " + value,
  };
}

function timestampToString(timestamp) {
  const date = new Date(timestamp);

  return (
    date.toDateString() +
    " " +
    [date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()].join(":")
  );
}
