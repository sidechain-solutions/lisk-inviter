const { BaseTransaction, TransactionError, utils } = require("@liskhq/lisk-transactions");
const { getAddressFromPublicKey } = require("@liskhq/lisk-cryptography");

class EventTransaction extends BaseTransaction {
  static get TYPE() {
    return 11;
  }

  static get FEE() {
    return utils.convertLSKToBeddows("200");
  }

  async prepare(store) {
    this.inviteeAddresses = this.asset.invitees.map(publicKey =>
      getAddressFromPublicKey(publicKey)
    );

    await super.prepare(store);
    await store.account.cache({
      address_in: this.inviteeAddresses
    });
  }

  validateAsset() {
    const errors = [];

    if (!this.asset.name || typeof this.asset.name !== "string") {
      errors.push(
        new TransactionError(
          'Invalid "asset.name" defined on transaction',
          this.id,
          ".asset.name",
          this.asset.name,
          "A string value"
        )
      );
    }

    if (!this.asset.description || typeof this.asset.description !== "string") {
      errors.push(
        new TransactionError(
          'Invalid "asset.description" defined on transaction',
          this.id,
          ".asset.description",
          this.asset.description,
          "A string value"
        )
      );
    }

    if (!this.asset.entranceFee || typeof this.asset.entranceFee !== "number") {
      errors.push(
        new TransactionError(
          'Invalid "asset.entranceFee" defined on transaction',
          this.id,
          ".asset.entranceFee",
          this.asset.entranceFee,
          "A number value"
        )
      );
    }

    if (
      !this.asset.invitees ||
      !Array.isArray(this.asset.invitees) ||
      !this.asset.invitees.length ||
      !this.asset.invitees.every(entry => entry.length === 64)
    ) {
      errors.push(
        new TransactionError(
          'Invalid "asset.invitees" defined on transaction',
          this.id,
          ".asset.invitees",
          this.asset.invitees,
          "An array of public keys"
        )
      );
    }

    if (
      !this.asset.eventStartTs ||
      typeof this.asset.eventStartTs !== "number" ||
      this.asset.eventStartTs < Date.now() / 1000
    ) {
      errors.push(
        new TransactionError(
          'Invalid "asset.eventStartTs" defined on transaction',
          this.id,
          ".asset.eventStartTs",
          this.asset.eventStartTs,
          "A number value representing a timestamp that is in the future"
        )
      );
    }

    if (
      !this.asset.eventEndTs ||
      typeof this.asset.eventEndTs !== "number" ||
      this.asset.eventEndTs < this.asset.eventStartTs
    ) {
      errors.push(
        new TransactionError(
          'Invalid "asset.eventEndTs" defined on transaction',
          this.id,
          ".asset.eventEndTs",
          this.asset.eventEndTs,
          "A number value representing a timestamp that is past 'eventStartTs'"
        )
      );
    }

    return errors;
  }

  applyAsset(store) {
    this.inviteeAddresses.forEach(address => {
      const sender = store.account.get(address);

      sender.asset.eventsInvited =
        sender.asset.eventsInvited === undefined
          ? [this.id]
          : [...sender.asset.eventsInvited, this.id];

      store.account.set(sender.address, sender);
    });

    return [];
  }

  undoAsset(store) {
    this.inviteeAddresses.forEach(address => {
      const sender = store.account.get(address);

      sender.asset.eventsInvited =
        (sender.asset.eventsInvited === sender.asset.eventsInvited.length) === 1
          ? undefined
          : ender.asset.eventsInvited.splice(sender.asset.eventsInvited.indexOf(this.id), 1);

      store.account.set(sender.address, sender);
    });

    return errors;
  }
}

module.exports = EventTransaction;
