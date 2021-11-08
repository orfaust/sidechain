import { SHA256 } from "crypto-js";

export default function BlockClass(data, parentHash) {
  this.timestamp = new Date().getTime();
  this.data = data;
  this.parentHash = parentHash;

  this.setup();
}

BlockClass.prototype.setup = async function () {
  const minerResponse = await this.calculateHash();
  // console.log(minerResponse);

  this.nonce = minerResponse.nonce;
  this.hash = minerResponse.hash;

  const hash = SHA256(
    this.nonce + this.timestamp + this.parentHash + JSON.stringify(this.data)
  ).toString();

  // console.log(this);
};

BlockClass.prototype.calculateHash = function () {
  return new Promise((resolve) => {
    const miner = new Worker("/worker.js");

    miner.addEventListener("message", (response) => {
      // console.log(response.data);
      resolve(response.data);
    });

    miner.postMessage(this);
  });
};
