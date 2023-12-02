import cors from "cors";
import { secp256k1 } from 'ethereum-cryptography/secp256k1';
import hasMessage  from "./utlits/hasMessage.js";
import express from "express";
const app = express();
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "03afc8c9a1802a829418b360135eed6d4950469ad2dcfda26320ece33f9207920b": 100, //a4fff5142e58b606b3a19a86b93f35ba69e1e2b34710419e76c8d145f52c94e3
  "030dd26b8047c682ee52761b141d4bca4aa0f206bc6d3ffaad8b463d782697673a": 50, //63c89b1f57ace27e0e30bcb36b25b04e89c1ec3be2d906a53a503a06a0450f8a
  "03d39af85d95fee6bdb117f9a06c1891ab98b633426779d1d22c3738be320b0065": 75,  // f3313393cdf9d16e43052664885a7304a885b53e4e690ce7044a67ca1737472d
};
app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
 const { sender, recipient, amount ,signature } = req.body;

  if(! balances[recipient])
  res.status(403).send({ message: "recipient not found" });
 const isValid=secp256k1.verify( signature,hasMessage(String(amount)),sender);
 if(!isValid)
 res.status(404).send({ message: "unauthorized" });
  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
