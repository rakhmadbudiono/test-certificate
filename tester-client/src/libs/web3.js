const Web3 = require("web3");

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

module.exports = {
  enableWeb3,
};
