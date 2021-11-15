import { useState, useEffect } from "react";
import useLocalStorage from "react-use-localstorage";
import styled from "styled-components";

import ChainClass from "../classes/ChainClass";
import BlockComponent from "./BlockComponent";

export default function Chain({ id, insertBlockCmd }) {
	const [storedBlocks, setStoredBlocks] = useLocalStorage("node-" + id, "null");

	const sidechain = new ChainClass(JSON.parse(storedBlocks));

	// initialize chain
	if (sidechain.blocks.length === 0) {
		insertBlock("Genesis block");
	}

	useEffect(() => {
		// subscribe the insert listener
		insertBlockCmd.subscribe(insertBlock);
	}, [insertBlockCmd]);

	const [pendingBlocks, setPendingBlocks] = useState(0);

	const blocks = [...sidechain.blocks].reverse();

	return (
		<Styled className="chain">
			{blocks &&
				blocks.map((block, index) => {
					const count = blocks.length - index - 1;

					return <BlockComponent key={index} index={count} {...block} />;
				})}
		</Styled>
	);

	async function insertBlock(data) {
		const newBlock = await sidechain.addBlock(data);

		setStoredBlocks(JSON.stringify(sidechain.blocks));
	}
}

const Styled = styled.div`
	display: flex;
	flex-wrap: wrap;
	padding: 0.5em 0;
`;
