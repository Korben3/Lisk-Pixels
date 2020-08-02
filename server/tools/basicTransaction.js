const { APIClient } = require("@liskhq/lisk-api-client");
const transactions = require("@liskhq/lisk-transactions");
const cryptography = require("@liskhq/lisk-cryptography");

// config
const client = new APIClient(["http://95.179.253.231:4000"]); // SDK test server
const passphrase =
  "creek own stem final gate scrub live shallow stage host concert they";
//  "creek own stem final gate scrub live shallow stage host concert they";

const networkIdentifier = cryptography.getNetworkIdentifier(
  "23ce0366ef0a14a91e5fd4b1591fc880ffbef9d988ff8bebf8f3666b0c09597d",
  "Lisk"
);

const tx = new transactions.TransferTransaction({
  asset: {
    recipientId: "14802792595461938662L",
    amount: transactions.utils.convertLSKToBeddows("200"),
  },
  networkIdentifier: networkIdentifier,
  timestamp: transactions.utils.getTimeFromBlockchainEpoch(new Date()),
});

tx.sign(passphrase);
console.log(tx);

client.transactions
  .broadcast(tx.toJSON())
  .then((res) => {
    console.log(res.data.message);
  })
  .catch((res) => {
    console.log("\nTransaction failed:");
    console.log(res);
  });
