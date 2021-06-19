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

async function isTester(address) {
  const contract = await getTestCertificateContract();

  return contract.isTester(address);
}

async function register(data, address) {
  console.log(data, address);

  const contract = await getTestCertificateContract();

  return contract.register(data.institution_name, data.location, data.contact, {
    from: address,
  });
}

async function getTesterDetail(testerAddress) {
  const contract = await getTestCertificateContract();

  return contract.getTesterDetail(testerAddress);
}

async function isAuthority(address) {
  const contract = await getTestCertificateContract();

  return contract.isAuthority(address);
}

async function isTesterApproved(address) {
  const contract = await getTestCertificateContract();

  return contract.isTesterApproved(address);
}

async function approveTester(testerAddress, address) {
  const contract = await getTestCertificateContract();

  return contract.approveTester(testerAddress, {
    from: address,
  });
}

async function revokeTester(testerAddress, address) {
  const contract = await getTestCertificateContract();

  return contract.revokeTester(testerAddress, {
    from: address,
  });
}

async function addAuthority(authorityAddress, address) {
  const contract = await getTestCertificateContract();

  return contract.addAuthority(authorityAddress, {
    from: address,
  });
}

module.exports = {
  isTester,
  register,
  getTesterDetail,
  isAuthority,
  isTesterApproved,
  approveTester,
  revokeTester,
  addAuthority,
};
