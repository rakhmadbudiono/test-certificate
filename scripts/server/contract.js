const Web3 = require("web3");
const Contract = require("@truffle/contract");

const { ETH_NETWORK } = require("../../config");
const testCertificate = require("../../build/contracts/TestCertificate.json");

async function getTestCertificateContract() {
  const contract = Contract(testCertificate);
  const provider = new Web3.providers.HttpProvider(ETH_NETWORK);
  await contract.setProvider(provider);

  return contract.deployed();
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

module.exports = {
  createTestCertificate,
};
