const config = require("../config");
const TestCertificate = artifacts.require("./TestCertificate.sol");

module.exports = function (deployer) {
  deployer.deploy(TestCertificate, config.AUTHORITIES);
};
