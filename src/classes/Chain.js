import Block from "./Block";

export default function Chain(blocks) {
  this.blocks = blocks ? blocks : [];

  if (!blocks) {
    this.createGenesisBlock();
  }
}

Chain.prototype.createGenesisBlock = function () {
  this.addBlock("Genesis block");
};

Chain.prototype.getLatestBlockHash = function () {
  if (this.blocks.length === 0) {
    return null;
  }

  const latestBlock = this.blocks[this.blocks.length - 1];
  return latestBlock.hash;
};

Chain.prototype.addBlock = async function (data) {
  const parentHash = this.getLatestBlockHash();
  const newBlock = new Block(data, parentHash);

  await newBlock.setup();
  this.blocks.push(newBlock);
};
