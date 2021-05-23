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

async function isAuthority(address) {
  const contract = await getTestCertificateContract();

  return contract.isAuthority(address);
}

async function isTesterApproved(address) {
  const contract = await getTestCertificateContract();

  return contract.isTesterApproved(address);
}

async function approveTester(data, address) {
  const contract = await getTestCertificateContract();

  return contract.approveTester(data.tester_address, {
    from: address,
  });
}

async function revokeTester(data, address) {
  const contract = await getTestCertificateContract();

  return contract.approveTester(data.tester_address, {
    from: address,
  });
}

module.exports = {
  isTester,
  register,
  isAuthority,
  isTesterApproved,
  approveTester,
  revokeTester,
};
