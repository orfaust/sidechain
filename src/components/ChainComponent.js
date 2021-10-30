import styled from "styled-components"

export default function ChainComponent({ children }) {
	return (
		<StyledChainComponent>
			{children}
    </StyledChainComponent>
	)
}

const StyledChainComponent = styled.div `
  display: flex;
  flex-wrap: wrap;
  padding: 0 0.5em;
`