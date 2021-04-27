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
  const contract = await getTestCertificateContract();

  return contract.register(data.institution_name, data.location, data.contact, {
    from: address,
  });
}

async function createTestCertificate(data, address) {
  const contract = await getTestCertificateContract();

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

async function revokeTestCertificate(certificateId, address) {
  const contract = await getTestCertificateContract();

  return contract.revokeTestCertificate(certificateId, {
    from: address,
  });
}

async function getCertificate(certificateId) {
  const contract = await getTestCertificateContract();

  return contract.getCertificate(certificateId);
}

async function getPatientDetail(certificateId) {
  const contract = await getTestCertificateContract();

  return contract.getPatientDetail(certificateId);
}

async function getCertificateDigitalSignature() {
  const contract = await getTestCertificateContract();

  return contract.getCertificateDigitalSignature();
}

async function getCertificateAmountByTester(address) {
  const contract = await getTestCertificateContract();

  return contract.getCertificateAmountByTester({ from: address });
}

async function getCertificateId(idx, address) {
  const contract = await getTestCertificateContract();

  return contract.getCertificateId(idx, { from: address });
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
  getCertificateDigitalSignature,
};
