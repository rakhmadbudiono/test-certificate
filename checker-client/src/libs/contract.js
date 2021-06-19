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
  const contract = await getTestCertificateContract();

  return contract.getCertificate(encryptedPatientId);
}

async function getPatientDetail(encryptedPatientId) {
  const contract = await getTestCertificateContract();

  return contract.getPatientDetail(encryptedPatientId);
}

async function getCertificateDigitalSignature(encryptedPatientId) {
  const contract = await getTestCertificateContract();

  return contract.getCertificateDigitalSignature(encryptedPatientId);
}

async function getTesterDetail(testerAddress) {
  const contract = await getTestCertificateContract();

  return contract.getTesterDetail(testerAddress);
}

async function isTesterApproved(address) {
  const contract = await getTestCertificateContract();

  return contract.isTesterApproved(address);
}

module.exports = {
  getCertificate,
  getPatientDetail,
  getCertificateDigitalSignature,
  getTesterDetail,
  isTesterApproved,
};
