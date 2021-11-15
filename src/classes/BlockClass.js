import { SHA256 } from "crypto-js";

export default function BlockClass({ data, parentHash }) {
  this.timestamp = new Date().getTime();
  this.data = data;
  this.parentHash = parentHash;
}

BlockClass.prototype.mineHash_WORKER = async function () {
  const minerResponse = await this.calculateHash();

  this.nonce = minerResponse.nonce;
  this.hash = minerResponse.hash;
};

BlockClass.prototype.mineHash = function (difficulty) {
  return new Promise((resolve) => {
    setTimeout(() => {
      this.hash = SHA256(
        this.timestamp + this.parentHash + JSON.stringify(this.data)
      ).toString();

      resolve();
    }, difficulty * 1000);
  });
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
