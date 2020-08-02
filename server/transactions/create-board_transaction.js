const {
  BaseTransaction,
  TransactionError,
  utils,
} = require("@liskhq/lisk-transactions");

class CreateBoardTransaction extends BaseTransaction {
  static get TYPE() {
    return 101;
  }

  static get FEE() {
    return utils.convertLSKToBeddows("1000");
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
      pixel.id > 900 // max cells of board
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

    // create new board and add the first pixel
    const recipient = store.account.getOrDefault(this.asset.recipientId);

    recipient.asset.board = { [pixel.id]: pixel.color };

    store.account.set(this.asset.recipientId, recipient);

    return errors;
  }

  undoAsset(store) {
    // method will be deprecated
  }
}
module.exports = CreateBoardTransaction;
