import { CheckinTransaction, EventTransaction } from "lisk-inviter-transactions";
import { EPOCH_TIME } from "@liskhq/lisk-constants";
import { utils } from "@liskhq/lisk-transactions";
import { APIClient } from "@liskhq/lisk-api-client";
import { getAddressFromPassphrase } from "@liskhq/lisk-cryptography";

import { nodes, demoPubKeys, genesisPassphrase } from "../config/config.json";

const client = new APIClient(nodes);

export const getTs = () => Math.round((Date.now() - Date.parse(EPOCH_TIME)) / 1000);

export const processCheckIn = data => {
  const tx = new CheckinTransaction({
    asset: {
      eventId: data.eventId
    },
    amount: data.amount,
    fee: utils.convertLSKToBeddows("1"),
    recipientId: data.recipientId,
    timestamp: getTs() - 15
  });

  tx.sign(data.passphrase);

  return client.transactions.broadcast(tx.toJSON());
};

export const processEvent = ({
  name,
  description,
  eventStartTs,
  eventEndTs,
  entranceFee,
  invitees,
  passphrase,
  recipientId
}) => {
  const currentDate = new Date().toISOString().split("T")[0];

  const validatedStartDate =
    eventStartTs === currentDate ? Date.now() / 1000 + 15 : Date.parse(eventStartTs) / 1000;

  const tx = new EventTransaction({
    asset: {
      name,
      description,
      entranceFee: Math.round(entranceFee * 100000000),
      eventStartTs: validatedStartDate,
      eventEndTs: Date.parse(eventEndTs) / 1000,
      invitees: invitees.length > 0 ? invitees : demoPubKeys
    },
    fee: utils.convertLSKToBeddows("200"),
    recipientId,
    timestamp: getTs() - 15
  });

  tx.sign(passphrase ? passphrase : genesisPassphrase);

  return client.transactions.broadcast(tx.toJSON());
};

export const getTransactions = options => client.transactions.get(options);

export const getAccount = passphrase => {
  const address = getAddressFromPassphrase(passphrase);
  return client.accounts.get({ address, limit: 1 });
};
