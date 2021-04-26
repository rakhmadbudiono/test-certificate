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

async function isTester() {
  const provider = new Web3.providers.HttpProvider(ETH_NETWORK);
  const web3 = new Web3(provider);

  const contract = await getTestCertificateContract();

  const accounts = await web3.eth.getAccounts();
  const address = accounts[0];

  return contract.isTester(address);
}

async function register(data) {
  const contract = await getTestCertificateContract();

  const provider = new Web3.providers.HttpProvider(ETH_NETWORK);
  const web3 = new Web3(provider);

  const accounts = await web3.eth.getAccounts();
  const address = accounts[0];

  return contract.register(data.institution_name, data.location, data.contact, {
    from: address,
  });
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
    data.additional_info,
    {
      from: address,
    }
  );
}

async function revokeTestCertificate(certificateId) {
  const provider = new Web3.providers.HttpProvider(ETH_NETWORK);
  const web3 = new Web3(provider);

  const contract = await getTestCertificateContract();

  await window.ethereum.enable();

  const accounts = await web3.eth.getAccounts();
  const address = accounts[0];

  return contract.revokeTestCertificate(certificateId, {
    from: address,
  });
}

async function getCertificate(certificateId) {
  const provider = new Web3.providers.HttpProvider(ETH_NETWORK);
  const web3 = new Web3(provider);

  const contract = await getTestCertificateContract();

  const accounts = await web3.eth.getAccounts();
  const address = accounts[0];

  return contract.getCertificate(certificateId, {
    from: address,
  });
}

async function getPatientDetail(certificateId) {
  const provider = new Web3.providers.HttpProvider(ETH_NETWORK);
  const web3 = new Web3(provider);

  const contract = await getTestCertificateContract();

  const accounts = await web3.eth.getAccounts();
  const address = accounts[0];

  return contract.getPatientDetail(certificateId, {
    from: address,
  });
}

async function getCertificateAmountByTester() {
  const provider = new Web3.providers.HttpProvider(ETH_NETWORK);
  const web3 = new Web3(provider);

  const contract = await getTestCertificateContract();

  console.log(contract);

  const accounts = await web3.eth.getAccounts();
  const address = accounts[0];

  console.log(address);

  return contract.getCertificateAmountByTester();
}

async function getCertificateId(idx) {
  const provider = new Web3.providers.HttpProvider(ETH_NETWORK);
  const web3 = new Web3(provider);

  const contract = await getTestCertificateContract();

  const accounts = await web3.eth.getAccounts();
  const address = accounts[0];

  return contract.getCertificateId(idx, {
    from: address,
  });
}

module.exports = {
  isTester,
  register,
  createTestCertificate,
  revokeTestCertificate,
  getCertificate,
  getCertificateAmountByTester,
  getCertificateId,
  getPatientDetail,
};
