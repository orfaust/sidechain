import { useState } from "react";
import useLocalStorage from "react-use-localstorage";
import styled from "styled-components";

import ChainClass from "../classes/ChainClass";
import BlockComponent from "./BlockComponent";

export default function Chain({ id, insertTrigger }) {
	const [storedBlocks, setStoredBlocks] = useLocalStorage(
		"sidechain-" + id,
		"null"
	);

	const sidechain = new ChainClass(JSON.parse(storedBlocks));
	window.sidechain = sidechain;

	useState(() => {
		insertTrigger.subscribe(insertBlock);
	}, [sidechain]);

	async function insertBlock(data) {
		const newBlock = await sidechain.addBlock(data);

		// setBlocks(sidechain.blocks);
		setStoredBlocks(JSON.stringify(sidechain.blocks));
	}

	// const [blocks, setBlocks] = useState(sidechain.blocks);
	const blocks = [...sidechain.blocks].reverse();

	const [pendingBlocks, setPendingBlocks] = useState(0);

	return (
		<Styled className="chain">
			{blocks &&
				blocks.map((block, index) => {
					const count = blocks.length - index - 1;

					return <BlockComponent key={index} index={count} {...block} />;
				})}
		</Styled>
	);
}

const Styled = styled.div`
	display: flex;
	flex-wrap: wrap;
	padding: 0.5em;
`;
