pragma solidity ^0.5.0;

import "./TesterRegistry.sol";

contract TestCertificate {
    struct Certificate {
        address testerAddress;
        uint testTakenTimestamp;
        uint certificateExpiryTimestamp;
        string testType;
        string testResult;
        bool isRevoked;
        string encryptedExternalDataPointer;
        string digitalSiganture;
    }

    struct PatientDetail {
        string patientAddress;
        string patientGender;
        uint patientAge;
    }

    mapping (string=>Certificate) certificates;
    mapping (string=>PatientDetail) patientsDetail;
    mapping (address=>string[]) testerCertificates;
    address public registryContract;

    event CertificateCreated(string encryptedPatientId);
    event CertificateRevoked(string encryptedPatientId);

    constructor (address registry) public {
        registryContract = registry;
    }

    modifier onlyTester {
        require(TesterRegistry(registryContract).isTester(msg.sender), "Msg.sender must be a tester.");
        _;
    }

    function createTestCertificate(string memory encryptedPatientId, uint testTakenTimestamp, uint certificateExpiryTimestamp, string memory testType, string memory testResult, string memory encryptedExternalDataPointer, string memory patientAddress, string memory patientGender, uint patientAge, string memory digitalSiganture) public onlyTester {
        certificates[encryptedPatientId] = Certificate({
            testerAddress: msg.sender,
            testTakenTimestamp: testTakenTimestamp,
            certificateExpiryTimestamp: certificateExpiryTimestamp,
            testType: testType,
            testResult: testResult,
            isRevoked: false,
            encryptedExternalDataPointer: encryptedExternalDataPointer,
            digitalSiganture: digitalSiganture
        });

        patientsDetail[encryptedPatientId] = PatientDetail({
            patientAddress: patientAddress,
            patientGender: patientGender,
            patientAge: patientAge
        });

        testerCertificates[msg.sender].push(encryptedPatientId);

        emit CertificateCreated(encryptedPatientId);
    }

    function revokeTestCertificate(string memory encryptedPatientId) public onlyTester {
        Certificate storage cert = certificates[encryptedPatientId];
        require(cert.testerAddress != msg.sender, "Tester can only revoke their certificate.");
        require(!cert.isRevoked, "Certificate is already revoked.");
        cert.isRevoked = true;

        emit CertificateRevoked(encryptedPatientId);
    }

    function getCertificate(string memory encryptedPatientId) public view
    returns (
        uint testTakenTimestamp,
        uint certificateExpiryTimestamp,
        string memory testType,
        string memory testResult,
        bool isRevoked,
        string memory encryptedExternalDataPointer,
        string memory digitalSiganture
    ) {
        Certificate storage cert = certificates[encryptedPatientId];
        
        testTakenTimestamp = cert.testTakenTimestamp;
        certificateExpiryTimestamp = cert.certificateExpiryTimestamp;
        testType = cert.testType;
        testResult = cert.testResult;
        isRevoked = cert.isRevoked;
        encryptedExternalDataPointer = cert.encryptedExternalDataPointer;
        digitalSiganture = cert.digitalSiganture;
    }

    function getPatientDetail(string memory encryptedPatientId) public view
    returns (
        string memory patientAddress,
        string memory patientGender,
        uint patientAge
    ) {
        PatientDetail storage detail = patientsDetail[encryptedPatientId];

        patientAddress = detail.patientAddress;
        patientGender = detail.patientGender;
        patientAge = detail.patientAge;
    }

    function getCertificateAmountByTester() public view onlyTester returns (uint count) {
        return testerCertificates[msg.sender].length;
    }

    function getEncryptedPatientId(uint idx) public view onlyTester returns (string memory) {
        return testerCertificates[msg.sender][idx];
    }
}
