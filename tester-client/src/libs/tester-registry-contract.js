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

  await window.ethereum.enable();

  const accounts = await web3.eth.getAccounts();

  console.log(accounts);
  console.log(await web3.eth.getCoinbase());

  const address = accounts[0];

  return contract.isTester(address);
}

async function register(data) {
  const contract = await getTesterRegistryContract();

  return contract.register(data.institution_name, data.location, data.contact);
}

module.exports = {
  isTester,
  register,
};
