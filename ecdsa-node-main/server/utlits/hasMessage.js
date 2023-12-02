  import { keccak256 } from "ethereum-cryptography/keccak";
  import { utf8ToBytes } from "ethereum-cryptography/utils";

 const hasMessage = (message) => {
  return keccak256(utf8ToBytes(message));
}


export default  hasMessage ;
