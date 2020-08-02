import {
  BaseTransaction,
  TransactionError,
  utils,
} from "@liskhq/lisk-transactions";
import { boardSize } from "../config/config.json";

export class SetPixelTransaction extends BaseTransaction {
  static get TYPE() {
    return 102;
  }

  static get FEE() {
    return utils.convertLSKToBeddows("1");
  }

  async prepare(store) {
    await store.account.cache([
      {
        address: this.senderId,
      },
      {
        address: this.asset.recipientId,
      },
    ]);
  }

  validateAsset() {
    const errors = [];

    let { pixel } = this.asset;

    if (
      !pixel.id ||
      typeof pixel.id !== "number" ||
      pixel.id > boardSize * boardSize // max cells of board
    ) {
      errors.push(new TransactionError("Pixel id missing or invalid."));
    }

    if (
      !pixel.color ||
      typeof pixel.color !== "string" ||
      pixel.color.length !== 1
    ) {
      errors.push(new TransactionError("Pixel color missing or invalid."));
    }

    if (Object.keys(this.asset).length > 2) {
      errors.push(
        new TransactionError("Only a pixel id and pixel color asset allowed.")
      );
    }

    return errors;
  }

  applyAsset(store) {
    const errors = [];

    let { pixel } = this.asset;
    console.log(`log: ${JSON.stringify(pixel)}`);

    // retrieve board data and add the new pixel
    const recipient = store.account.get(this.asset.recipientId);

    let board = recipient.asset.board;
    recipient.asset.board = { ...board, [pixel.id]: pixel.color };

    store.account.set(this.asset.recipientId, recipient);

    return errors;
  }

  undoAsset(store) {
    // method will be deprecated
  }
}
