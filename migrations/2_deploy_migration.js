const TestCertificate = artifacts.require("./TestCertificate.sol");
const config = require("../config");

module.exports = function (deployer) {
  deployer.deploy(TestCertificate, config.REGISTRY_CONTRACT);
};
