import { SHA256 } from "crypto-js";

export default function Block(data, parentHash) {
  this.timestamp = new Date().getTime();
  this.data = data;
  this.parentHash = parentHash;

  this.setup();
}

Block.prototype.setup = async function () {
  const workerResponse = await this.calculateHash();
  // console.log(workerResponse);

  this.nonce = workerResponse.nonce;
  this.hash = workerResponse.hash;

  const hash = SHA256(
    this.nonce + this.timestamp + this.parentHash + JSON.stringify(this.data)
  ).toString();

  // console.log(this);
};

Block.prototype.calculateHash = function () {
  return new Promise((resolve) => {
    const worker = new Worker("worker.js");

    worker.addEventListener("message", (response) => {
      // console.log(response.data);
      resolve(response.data);
    });

    worker.postMessage(this);
  });
};
