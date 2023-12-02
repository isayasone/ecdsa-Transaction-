
import { secp256k1 }from 'ethereum-cryptography/secp256k1'

 import  {toHex}  from "ethereum-cryptography/utils"
const privateKey = secp256k1.utils.randomPrivateKey() // Generate a random private key using secp256k1.
//  secp256k1.

const  publicKey = secp256k1.getPublicKey(privateKey)

console.log("privateKey", toHex(privateKey), "publicKey", toHex(publicKey));
