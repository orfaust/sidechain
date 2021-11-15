import { SHA256 } from "crypto-js";

export default function NodeClass({ id, name }) {
  this.id = id;
  this.name = name;
  this.hash = SHA256(id.toString()).toString();
  this.created = new Date().getTime();
}
