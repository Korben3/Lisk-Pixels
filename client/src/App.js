import React, { useState, useEffect } from "react";
import "./App.css";
import { consoleDefaultText, colorSwatches } from "./config/config.json";
import Header from "./components/Header";
import Account from "./components/Account";
import Board from "./components/Board";
import Swatches from "./components/Swatches";
import Console from "./components/Console";
import { getAccounts } from "./utils/tools";
import * as cryptography from "@liskhq/lisk-cryptography";
import * as transactions from "@liskhq/lisk-transactions";

const passphrase = require("@liskhq/lisk-passphrase");

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [userBalance, setUserBalance] = useState(0);
  const [consoleText, setConsoleText] = useState(consoleDefaultText);
  const [selectedColor, setSelectedColor] = useState("#0000AA");
  const [selectedColorId, setSelectedColorId] = useState(1);

  const swatchClicked = (color) => {
    let colorId = color.substr(-1, 1);
    setSelectedColorId(colorId);
    setSelectedColor(colorSwatches[colorId]);

    lpxConsole(`Selected color: ${colorSwatches[colorId]}`);
  };

  const updateBalance = () => {
    let newBalance = parseInt(userBalance);
    --newBalance;
    setUserBalance(newBalance.toString());
  };

  useEffect(() => {
    if (sessionStorage.getItem("secret")) {
      const userPassphrase = sessionStorage.getItem("secret");
      const userAddress = cryptography.getAddressFromPassphrase(userPassphrase);

      lpxConsole(`returning user: ${userAddress}`);
      getAccounts({
        limit: 1,
        address: userAddress,
      })
        .then((res) => {
          let balance = transactions.utils.convertBeddowsToLSK(
            res.data[0].balance
          );

          setUserBalance(balance);
          setUserAddress(userAddress);
          setLoggedIn(true);
        })
        .catch((err) => {
          lpxConsole(err);
        });
    }
  }, []);

  const login = (userPassphrase) => {
    const errors = passphrase.validation.getPassphraseValidationErrors(
      userPassphrase
    );
    if (!errors.length) {
      // if there are any errors in the passphrase give hint, else retrieve the account info
      const userAddress = cryptography.getAddressFromPassphrase(userPassphrase);
      lpxConsole(`logging in: ${userPassphrase} - ${userAddress}`);
      getAccounts({
        limit: 1,
        address: userAddress,
      })
        .then((res) => {
          let balance = res.data[0]?.balance
            ? transactions.utils.convertBeddowsToLSK(res.data[0].balance)
            : 0;

          setUserBalance(balance);
          setUserAddress(userAddress);
          setLoggedIn(true);
          sessionStorage.setItem("secret", userPassphrase); // for production use a safer way to store the passphrase
        })
        .catch((err) => {
          lpxConsole(err);
        });
    } else {
      let errorMessages =
        "Invalid passphrase:\n" +
        errors[0].message +
        "\n" +
        errors[1].message +
        "\n" +
        errors[2].message;
      lpxConsole(errorMessages);
    }
  };

  const logout = () => {
    lpxConsole("logging out..");
    sessionStorage.removeItem("secret");
    setLoggedIn(false);
  };

  const lpxConsole = (text) => {
    setConsoleText(consoleText + text + "\n");
  };

  return (
    <div>
      <Header />
      <Account
        loggedIn={loggedIn}
        login={login}
        logout={logout}
        userAddress={userAddress}
        userBalance={userBalance}
        lpxConsole={lpxConsole}
      />
      <Board
        loggedIn={loggedIn}
        lpxConsole={lpxConsole}
        selectedColorId={selectedColorId}
        userBalance={userBalance}
        updateBalance={updateBalance}
      />
      <Swatches
        lpxConsole={lpxConsole}
        selectedColor={selectedColor}
        swatchClicked={swatchClicked}
      />
      <Console consoleText={consoleText} />
    </div>
  );
};

export default App;
