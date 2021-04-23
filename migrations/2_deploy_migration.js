const TestCertificate = artifacts.require("./TestCertificate.sol");

module.exports = function (deployer) {
  deployer.deploy(TestCertificate);
};
