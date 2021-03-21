const Web3 = require("web3");
const Contract = require("@truffle/contract");

const { ETH_NETWORK } = require("../../../config");
const testerRegistry = require("../../../build/contracts/TesterRegistry.json");

async function getTesterRegistryContract() {
  const contract = Contract(testerRegistry);
  const provider = new Web3.providers.HttpProvider(ETH_NETWORK);
  await contract.setProvider(provider);

  return contract.deployed();
}

async function isTester() {
  const provider = new Web3.providers.HttpProvider(ETH_NETWORK);
  const web3 = new Web3(provider);

  const contract = await getTesterRegistryContract();

  const accounts = await web3.eth.getAccounts();
  const address = accounts[0];

  return contract.isTester(address);
}

module.exports = {
  isTester,
};
