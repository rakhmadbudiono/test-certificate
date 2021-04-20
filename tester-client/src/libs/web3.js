const Web3 = require("web3");

const { ETH_NETWORK, PRIVATE_KEY } = require("../../../config");

async function enableWeb3() {
  if ("ethereum" in window) {
    window.web3 = new Web3(window.ethereum);

    try {
      await window.ethereum.enable();
    } catch {
      return false;
    }
  }

  return true;
}

async function sign(payload) {
  const provider = new Web3.providers.HttpProvider(ETH_NETWORK);
  const web3 = new Web3(provider);

  const msg = JSON.stringify(payload);
  const sign = await web3.eth.accounts.sign(msg, PRIVATE_KEY);

  return JSON.stringify(sign);
}

async function verify(sign, address) {
  const provider = new Web3.providers.HttpProvider(ETH_NETWORK);
  const web3 = new Web3(provider);

  const signObj = JSON.parse(sign);
  const signer = await web3.eth.accounts.recover(signObj);

  return signer === address;
}

module.exports = {
  enableWeb3,
  sign,
  verify,
};
