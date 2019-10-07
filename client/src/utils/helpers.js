import { EPOCH_TIME } from "@liskhq/lisk-constants";
import { Mnemonic } from "@liskhq/lisk-passphrase";
import { getAddressAndPublicKeyFromPassphrase } from "@liskhq/lisk-cryptography";

export const convertNetworkTimestampToDate = ts =>
  new Date((parseInt(Date.parse(EPOCH_TIME) / 1000) + ts) * 1000).toLocaleString();

export const getMinDate = type => {
  const now = Date.now();
  const tomorrow = now + 86400000;

  return new Date(type === "start" ? now : tomorrow).toISOString().split("T")[0];
};

export const generateRandomAccount = () => {
  const passphrase = Mnemonic.generateMnemonic();
  const { address, publicKey } = getAddressAndPublicKeyFromPassphrase(passphrase);
  return { passphrase, address, publicKey };
};
