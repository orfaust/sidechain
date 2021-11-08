import BlockClass from "./BlockClass";

export default function ChainClass(blocks) {
  this.blocks = blocks ? blocks : [];

  if (!blocks) {
    this.createGenesisBlock();
  }
}

ChainClass.prototype.createGenesisBlock = function () {
  this.addBlock("Genesis block");
};

ChainClass.prototype.getLatestBlockHash = function () {
  if (this.blocks.length === 0) {
    return null;
  }

  const latestBlock = this.blocks[this.blocks.length - 1];
  return latestBlock.hash;
};

ChainClass.prototype.addBlock = async function (data) {
  const parentHash = this.getLatestBlockHash();
  const newBlock = new BlockClass(data, parentHash);

  await newBlock.setup();
  this.blocks.push(newBlock);

  return newBlock;
};

ChainClass.prototype.isValid = function () {
  for (const index of this.block) {
    console.log(index);
  }
};
