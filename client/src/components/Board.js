import React, { useState, useEffect } from "react";
import "./Board.css";
import {
  boardAddress,
  boardSize,
  boardRefreshRate,
  colorSwatches,
  nodes,
} from "../config/config.json";
import { getAccounts } from "../utils/tools";
import { SetPixelTransaction } from "../transactions/set-pixel_transaction";
const { APIClient } = require("@liskhq/lisk-api-client");
const transactions = require("@liskhq/lisk-transactions");
const cryptography = require("@liskhq/lisk-cryptography");

const Board = ({
  lpxConsole,
  selectedColorId,
  userBalance,
  loggedIn,
  updateBalance,
}) => {
  const [mainBoard, setMainBoard] = useState("mainBoard");
  const [board, setBoard] = useState([]);
  const [intervalId, setIntervalId] = useState();

  const userPassphrase = sessionStorage.getItem("secret");
  const networkIdentifier = cryptography.getNetworkIdentifier(
    "23ce0366ef0a14a91e5fd4b1591fc880ffbef9d988ff8bebf8f3666b0c09597d",
    "Lisk"
  ); // needed for the network, best to change everywhere to a custom network name
  const client = new APIClient(nodes); // connect to a LPX SDK test server

  const cellClicked = (data) => {
    let cellId = data.target.id.substr(1);
    let message = `Clicked cell: ${cellId}\n`;

    // draw a cell and perform a tx, only if loggedIn and enough balance
    if (loggedIn && userBalance >= 1) {
      // turn off refresh, we want to give the tx's time to be processed by the chain before loading the board
      clearInterval(intervalId);
      // add the users pixel with the selected color
      let newBoard = { ...board, [cellId]: selectedColorId };
      setBoard(newBoard);
      drawBoard(newBoard);

      message += `Adding pixel to the blockchain, account: ${boardAddress}`;
      // now perform the transaction and add the pixel to the Lisk Pixels blockchain
      console.log(cellId);
      const tx = new SetPixelTransaction({
        asset: {
          recipientId: boardAddress,
          pixel: {
            id: parseInt(cellId),
            color: selectedColorId.toString(),
          },
        },
        networkIdentifier: networkIdentifier,
        timestamp: transactions.utils.getTimeFromBlockchainEpoch(new Date()- 5000),
      });

      tx.sign(userPassphrase);
      console.log(tx);
      client.transactions
        .broadcast(tx.toJSON())
        .then((res) => {
          console.log(res.data.message);
          updateBalance(); // quick update to user balance, reload is more accurate but adds an extra API call
          let intId = setInterval(refreshBoard, boardRefreshRate);
          setIntervalId(intId);
        })
        .catch((res) => {
          console.log(res);
          let intId = setInterval(refreshBoard, boardRefreshRate);
          setIntervalId(intId);
        });

      lpxConsole(message);
    } else {
      lpxConsole(`Not logged in or balance too low.`);
    }
  };

  const drawBoard = (board) => {
    let boardCells = [];
    let row = [];
    let i = 0;
    let color = "";
    let id = "";
    for (let y = 0; y < boardSize; y++) {
      for (let x = 0; x < boardSize; x++) {
        i++;
        id = "p" + i;
        if (board[i]) {
          color = colorSwatches[board[i]];
          row.push(
            <td key={id} id={id} style={{ backgroundColor: color }}></td>
          );
        } else {
          row.push(<td key={id} id={id}></td>);
        }
      }
      id = "r" + i;
      boardCells.push(<tr key={id}>{row}</tr>);
      row = [];
    }
    setMainBoard(boardCells);
  };

  const retrieveBoard = async () => {
    // load board, assuming the provided address contains board data
    let newBoard = await getAccounts({
      limit: 1,
      address: boardAddress,
    });
    newBoard = newBoard.data[0].asset.board;

    return newBoard;
  };

  const refreshBoard = () => {
    retrieveBoard().then((data) => {
      setBoard(data);
      drawBoard(data);
      console.log("interval");
    });
  };

  useEffect(() => {
    // load the board for the first time
    retrieveBoard().then((data) => {
      lpxConsole(`Retrieving board from address: ${boardAddress}`);
      setBoard(data);
      drawBoard(data);
    });
    // refresh board on regular intervals
    let intId = setInterval(refreshBoard, boardRefreshRate);
    setIntervalId(intId);
  }, []);

  return (
    <div>
      <table onClick={cellClicked}>
        <tbody>{mainBoard}</tbody>
      </table>
    </div>
  );
};
export default Board;
