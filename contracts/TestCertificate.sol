pragma solidity ^0.5.0;

import "./TesterRegistry.sol";

contract TestCertificate {
    struct Certificate {
        address testerAddress;
        uint testTakenTimestamp;
        uint certificateExpiryTimestamp;
        string testKit;
        string testResult;
        bool isRevoked;
        string externalDataPointerHash;
        string digitalSiganture;
    }

    mapping (string=>Certificate) certificates;
    address public registryContract;

    constructor (address registry) public {
        registryContract = registry;
    }

    modifier onlyTester {
        require(TesterRegistry(registryContract).isTester(msg.sender), "Msg.sender must be a tester.");
        _;
    }

    function createTestCertificate(string memory personHash, uint testTakenTimestamp, uint certificateExpiryTimestamp, string memory testKit, string memory testResult, string memory externalDataPointerHash, string memory digitalSiganture) public onlyTester {
        certificates[personHash] = Certificate({
            testerAddress: msg.sender,
            testTakenTimestamp: testTakenTimestamp,
            certificateExpiryTimestamp: certificateExpiryTimestamp,
            testKit: testKit,
            testResult: testResult,
            isRevoked: false,
            externalDataPointerHash: externalDataPointerHash,
            digitalSiganture: digitalSiganture
        });
    }

    function revokeTestCertificate(string memory personHash) public onlyTester {
        Certificate storage cert = certificates[personHash];
        require((cert.testerAddress != msg.sender), "Tester can only revoke their certificate");
        require(!cert.isRevoked, "Certificate is already revoked.");
        cert.isRevoked = true;
    }

    function getCertificate(string memory personHash) public view
    returns (
        uint testTakenTimestamp,
        uint certificateExpiryTimestamp,
        string memory testKit,
        string memory testResult,
        bool isRevoked,
        string memory externalDataPointerHash,
        string memory digitalSiganture
    ) {
        Certificate storage cert = certificates[personHash];
        testTakenTimestamp = cert.testTakenTimestamp;
        certificateExpiryTimestamp = cert.certificateExpiryTimestamp;
        testKit = cert.testKit;
        testResult = cert.testResult;
        isRevoked = cert.isRevoked;
        externalDataPointerHash = cert.externalDataPointerHash;
        digitalSiganture = cert.digitalSiganture;
    }
}
