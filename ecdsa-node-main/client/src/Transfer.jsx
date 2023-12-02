import { secp256k1 } from 'ethereum-cryptography/secp256k1';
import { useState } from "react";
import server from "./server";
import { hasMessage } from "./utlits/hasMessage";


function Transfer({ address, setBalance  , privateKey}) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
 const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {
  const messageHash =  hasMessage (String(sendAmount));
  const signature = secp256k1.sign(messageHash,privateKey).toDERHex()
      const {
        data: { balance },
      } = await server.post(`send`, {
        signature,
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
      });
      setBalance(balance);
    } catch (ex) {
      console.error(ex?.message);
      alert(ex?.response?.data?.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
