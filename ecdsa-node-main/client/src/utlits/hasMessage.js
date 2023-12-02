  import { keccak256 } from "ethereum-cryptography/keccak";
  import { utf8ToBytes } from "ethereum-cryptography/utils";

export const hasMessage = (message) => {
  return keccak256(utf8ToBytes(message));
}

