import { useState, useEffect } from "react"
import useLocalStorage from "react-use-localstorage"

import styled from "styled-components"

import Chain from "./classes/Chain"
import Block from "./classes/Block"

import ChainComponent from "./components/ChainComponent"
import BlockComponent from "./components/BlockComponent"
import InsertBlock from "./components/InsertBlock"

export default function App() {
  const [storedBlocks, setStoredBlocks] = useLocalStorage("sidechain", "null")

  useEffect(() => {
    window.sidechain = new Chain(JSON.parse(storedBlocks))
  })

  const [blocks, setBlocks] = useState(sidechain.blocks)

  const [pendingBlocks, setPendingBlocks] = useState(0)

  return (
    <StyledApp className="App">
      <InsertBlock insertHandler={insertBlock} />

      <ChainComponent>
        {blocks && [...blocks].reverse().map((block, index) => {
          const count = blocks.length - index - 1

          return (
            <BlockComponent key={index} index={count} {...block} />
          )
        })}
      </ChainComponent>
    </StyledApp>
  )

  async function insertBlock(data) {
    if (pendingBlocks >= 3) {
      return console.log('pendingBlocks limit reached')
    }

    setPendingBlocks(old => old + 1)

    await sidechain.addBlock(data)

    setBlocks(sidechain.blocks)
    setStoredBlocks(JSON.stringify(sidechain.blocks))

    setPendingBlocks(old => old - 1)
  }
}

const StyledApp = styled.div `
  font-family: sans-serif;
  font-family: -webkit-pictograph;
  background-color: #4c6c6c;
  color: #8aa;
  min-height: 100vh;
  overflow-y: scroll;
`