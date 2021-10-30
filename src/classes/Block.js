import { SHA256 } from "crypto-js"

export default async function Block(data, parentHash) {
  this.timestamp = new Date().getTime()
  this.data = data
  this.parentHash = parentHash

  const workerResponse = await this.calculateHash()

  this.nonce = workerResponse.nonce
  this.hash = workerResponse.hash

  const hash = SHA256(
    this.nonce +
    this.timestamp +
    this.parentHash +
    JSON.stringify(this.data)
  ).toString()

  return this
}

Block.prototype.calculateHash = function() {
  return new Promise(resolve => {
    const worker = new Worker("worker.js")

    worker.addEventListener("message", response => {
      // console.log(response.data)
      resolve(response.data)
    })

    worker.postMessage(this)
  })
}