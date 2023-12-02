import { secp256k1 } from 'ethereum-cryptography/secp256k1';
import server from "./server";

  import { toHex } from "ethereum-cryptography/utils";
import { useEffect } from "react";

function Wallet({ address, setAddress, balance, setBalance ,setPrivateKey ,privateKey }) {
  async function onChange(evt) {
    try{
  if(evt.target.value?.trim()?.length > 0)
  {
     setPrivateKey (evt.target.value?.trim());
     const publicKey = toHex(secp256k1.getPublicKey(evt.target.value?.trim()));
   setAddress( publicKey )
  }
 else {
      setBalance(0);
      setPrivateKey("");
      setAddress("");
    }
    }catch(err)
    {
      console.log('')
    }
}

useEffect(() => {
   server.get(`balance/${address}`).then((res)=>{
  setBalance( res.data?.balance);
      });
},[address])

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>
      <label>
        Private Address
        <input placeholder="Type an address, for example: 0x1" value={privateKey} onChange={onChange}></input>
      </label>
      <label>
          Public Address  :{address.slice(0, 10)}
      </label>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
