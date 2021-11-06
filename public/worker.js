importScripts("./crypto-js/crypto-js.js");

var HASH_DIFFICULTY = 4;

addEventListener("message", (event) => {
  var response = calculateHash(event.data);

  postMessage(response);
});

function calculateHash(blockProps) {
  var compare = new Array(HASH_DIFFICULTY + 1).join("0");

  var hash = "",
    nonce = 0;

  while (hash.substring(0, HASH_DIFFICULTY) !== compare) {
    nonce++;

    hash = CryptoJS.SHA256(
      blockProps.timestamp +
        blockProps.parentHash +
        JSON.stringify(blockProps.data) +
        nonce
    ).toString();

    // console.log(nonce);
  }

  return { hash, nonce };
}
