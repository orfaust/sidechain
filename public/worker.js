importScripts("./crypto-js/crypto-js.js")

const HASH_DIFFICULTY = 4

onmessage = function(event) {
	// console.log(event.data)

	const response = calculateHash(event.data)

	postMessage(response)
}

function calculateHash(blockProps) {
	const compare = new Array(HASH_DIFFICULTY + 1).join("0")

	let hash = "",
		nonce = 0

	while (hash.substring(0, HASH_DIFFICULTY) !== compare) {
		nonce++

		hash = CryptoJS.SHA256(
			nonce +
			blockProps.timestamp +
			blockProps.parentHash +
			JSON.stringify(blockProps.data)
		).toString()
	}

	return { hash, nonce }
}