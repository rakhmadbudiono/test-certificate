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

async function createTestCertificate(data) {
  console.log(data);

  const provider = new Web3.providers.HttpProvider(ETH_NETWORK);
  const web3 = new Web3(provider);

  const contract = await getTestCertificateContract();

  await window.ethereum.enable();

  const accounts = await web3.eth.getAccounts();
  const address = accounts[0];

  return contract.createTestCertificate(
    data.encrypted_patient_id,
    data.test_taken_timestamp,
    data.certificate_expiry_timestamp,
    data.test_type,
    data.test_result,
    data.encrypted_external_data_pointer,
    data.patient_home_address,
    data.patient_gender,
    data.patient_age,
    data.digital_signature,
    {
      from: address,
    }
  );
}

async function revokeTestCertificate(encryptedPatientId) {
  const provider = new Web3.providers.HttpProvider(ETH_NETWORK);
  const web3 = new Web3(provider);

  const contract = await getTestCertificateContract();

  await window.ethereum.enable();

  const accounts = await web3.eth.getAccounts();
  const address = accounts[0];

  return contract.revokeTestCertificate(encryptedPatientId, {
    from: address,
  });
}

async function getCertificate(encryptedPatientId) {
  const contract = await getTestCertificateContract();

  return contract.getCertificate(encryptedPatientId);
}

async function getCertificateAmmountByTester(encryptedPatientId) {
  const contract = await getTestCertificateContract();

  return contract.getCertificateAmmountByTester();
}

async function getEncryptedPatientId(idx) {
  const contract = await getTestCertificateContract();

  return contract.getEncryptedPatientId(idx);
}

module.exports = {
  createTestCertificate,
  revokeTestCertificate,
  getCertificate,
  getCertificateAmmountByTester,
  getEncryptedPatientId,
};
