const { BaseTransaction, TransactionError, utils } = require("@liskhq/lisk-transactions");
const { EPOCH_TIME } = require("@liskhq/lisk-constants");

class CheckinTransaction extends BaseTransaction {
  static get TYPE() {
    return 12;
  }

  static get FEE() {
    return utils.convertLSKToBeddows("1");
  }

  async prepare(store) {
    await super.prepare(store);
    await store.transaction.cache([
      {
        id: this.asset.eventId
      }
    ]);
  }

  validateAsset() {
    const errors = [];

    return errors;
  }

  applyAsset(store) {
    const errors = [];

    const transaction = store.transaction.find(
      transaction => transaction.id === this.asset.eventId
    );

    if (transaction) {
      const currentTs = this.timestamp + Date.parse(EPOCH_TIME) / 1000;

      if (currentTs < transaction.asset.eventStartTs || currentTs > transaction.asset.eventEndTs) {
        errors.push(
          new TransactionError(
            "Event is currently not active",
            this.id,
            ".timestamp",
            `${currentTs} (network ts: ${this.timestamp})`,
            "Checkin must occur in date range of event"
          )
        );
      }

      if (this.amount.lt(transaction.asset.entranceFee)) {
        errors.push(
          new TransactionError(
            "Paid amount is lower than then required entrance fee",
            this.id,
            ".amount",
            transaction.entranceFee,
            "Expected amount to be equal or greater than `entranceFee`"
          )
        );
      }

      if (!transaction.asset.invitees.includes(this.senderPublicKey)) {
        errors.push(
          new TransactionError(
            "You are not invited to this event",
            this.id,
            ".senderPublicKey",
            this.senderPublicKey,
            "senderPublicKey must be present in event's invitee array"
          )
        );
      }
    } else {
      errors.push(
        new TransactionError(
          "Event does not exist for ID",
          this.id,
          ".asset.eventId",
          this.asset.eventId,
          "Existing eventId registered as an event transaction"
        )
      );
    }

    const sender = store.account.get(this.senderId);

    if (sender.asset.eventsAttended && sender.asset.eventsAttended.includes(this.asset.eventId)) {
      errors.push(
        new TransactionError(
          "You have already attended this event",
          this.id,
          ".asset.eventId",
          this.asset.eventId,
          "'eventId' must not be present in '.asset.eventsAttended'"
        )
      );
    }

    const senderBalanceAfterCheckin = Math.round(parseInt(sender.balance) - parseInt(this.amount));
    sender.balance = senderBalanceAfterCheckin.toString();

    const recipient = store.account.getOrDefault(this.recipientId);
    const recipientBalanceAfterCheckin = Math.round(
      parseInt(recipient.balance) + parseInt(this.amount)
    );
    recipient.balance = recipientBalanceAfterCheckin.toString();

    sender.asset.eventsAttended =
      sender.asset.eventsAttended === undefined
        ? [transaction.id]
        : [...sender.asset.eventsAttended, transaction.id];

    store.account.set(sender.address, sender);
    store.account.set(recipient.address, recipient);

    return errors;
  }

  undoAsset(store) {
    const errors = super.undoAsset(store);

    sender.asset.eventsAttended =
      sender.asset.eventsAttended.length === 1
        ? undefined
        : sender.asset.eventsAttended.splice(sender.asset.eventsAttended.indexOf(this.id), 1);
    store.account.set(sender.address, sender);

    return errors;
  }
}

module.exports = CheckinTransaction;
