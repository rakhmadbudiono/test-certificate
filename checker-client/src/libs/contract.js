const Web3 = require("web3");
const Contract = require("@truffle/contract");

const { ETH_NETWORK } = require("../../../config");
const testCertificate = require("../../../build/contracts/TestCertificate.json");

async function getTestCertificateContract() {
  const contract = Contract(testCertificate);
  const provider = new Web3.providers.HttpProvider(ETH_NETWORK);
  await contract.setProvider(provider);

  return contract.deployed();
}

async function getCertificate(encryptedPatientId) {
  const provider = new Web3.providers.HttpProvider(ETH_NETWORK);
  const web3 = new Web3(provider);

  const contract = await getTestCertificateContract();

  const accounts = await web3.eth.getAccounts();
  const address = accounts[0];

  return contract.getCertificate(encryptedPatientId, {
    from: address,
  });
}

module.exports = {
  getCertificate,
};
