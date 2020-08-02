import React, { useState } from "react";
import "./Account.css";

const passphrase = require("@liskhq/lisk-passphrase");
const cryptography = require("@liskhq/lisk-cryptography");

const Account = ({
  loggedIn,
  login,
  logout,
  userAddress,
  userBalance,
  lpxConsole,
}) => {
  const [userPassphrase, setUserPassphrase] = useState("");

  const createAccount = () => {
    const { Mnemonic } = passphrase;
    let userPassphrase = Mnemonic.generateMnemonic();
    setUserPassphrase(userPassphrase);
    let userAddress = cryptography.getAddressFromPassphrase(userPassphrase);

    lpxConsole(
      `Generated new passphrase: ${userPassphrase}\nFor address: ${userAddress}`
    );
  };

  const handleChange = (data) => {
    setUserPassphrase(data.target.value.trim());
  };

  return (
    <div className="account">
      {!loggedIn ? (
        <div id="accountLogin">
          <span onClick={createAccount} className="accountButton">
            Create account
          </span>{" "}
          -{" "}
          <input
            id="passphrase"
            type="text"
            value={userPassphrase}
            onChange={handleChange}
          />{" "}
          <button onClick={() => login(userPassphrase)}>Login</button>
        </div>
      ) : (
        <div id="accountStatistics">
          Address: {userAddress} - Balance: {userBalance} LPX -{" "}
          <span onClick={logout} className="accountButton">
            Logout
          </span>
        </div>
      )}
    </div>
  );
};
export default Account;
