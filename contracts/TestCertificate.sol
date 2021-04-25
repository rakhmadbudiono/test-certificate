pragma solidity ^0.5.0;

contract TestCertificate {
    struct Tester {
        string institutionName;
        string location;
        string contact; 
    }

    struct Certificate {
        string encryptedPatientId;
        address testerAddress;
        uint testTakenTimestamp;
        uint certificateExpiryTimestamp;
        string testType;
        string testResult;
        bool isRevoked;
        string encryptedExternalDataPointer;
        string digitalSignature;
    }

    struct PatientDetail {
        string patientAddress;
        string patientGender;
        uint patientAge;
    }

    // tester registry
    mapping(address=>bool) public isTester;
    mapping (address=>Tester) testers;

    // test certificate
    Certificate[] certificates;
    PatientDetail[] patientsDetail;
    mapping (address=>uint[]) testerCertificates;
    address public registryContract;

    event TesterRegistered(address indexed testerAddress, string indexed institutionName, string indexed location, string contact);
    event CertificateCreated(uint indexed certificateId, string indexed encryptedPatientId, address indexed testerAddress, uint testTakenTimestamp, uint certificateExpiryTimestamp, string testType, string testResult, string encryptedExternalDataPointer, string digitalSignature);
    event CertificateRevoked(uint indexed certificateId);
    event PatientDetailAdded(uint indexed certificateId, string patientAddress, string patientGender, uint patientAge);

    modifier onlyTester {
        require(isTester[msg.sender], "Msg.sender must be a tester.");
        _;
    }

    modifier notTester {
        require(!isTester[msg.sender], "Msg.sender already a tester.");
        _;
    }

    function register(string memory institutionName, string memory location, string memory contact) public {
        isTester[msg.sender] = true;
        testers[msg.sender] = Tester({
            institutionName: institutionName,
            location: location,
            contact: contact
        });

        emit TesterRegistered(msg.sender, institutionName, location, contact);
    }

    function getTesterDetail(address testerAddress) public view returns (
        string memory institutionName,
        string memory location,
        string memory contact
    ) {
        Tester storage detail = testers[testerAddress];

        institutionName = detail.institutionName;
        location = detail.location;
        contact = detail.contact;
    }

    function createTestCertificate(string memory encryptedPatientId, uint256 testTakenTimestamp, uint256 certificateExpiryTimestamp, string memory testType, string memory testResult, string memory encryptedExternalDataPointer, string memory patientAddress, string memory patientGender, uint patientAge, string memory digitalSignature) public onlyTester returns (uint) {
        uint certificateId = certificates.length;

        certificates[certificateId] = Certificate({
            encryptedPatientId: encryptedPatientId,
            testerAddress: msg.sender,
            testTakenTimestamp: testTakenTimestamp,
            certificateExpiryTimestamp: certificateExpiryTimestamp,
            testType: testType,
            testResult: testResult,
            isRevoked: false,
            encryptedExternalDataPointer: encryptedExternalDataPointer,
            digitalSignature: digitalSignature
        });

        emit CertificateCreated(certificateId, encryptedPatientId, msg.sender, testTakenTimestamp, certificateExpiryTimestamp, testType, testResult, encryptedExternalDataPointer, digitalSignature);

        patientsDetail[certificateId] = PatientDetail({
            patientAddress: patientAddress,
            patientGender: patientGender,
            patientAge: patientAge
        });


        emit PatientDetailAdded(certificateId, patientAddress, patientGender, patientAge);

        testerCertificates[msg.sender].push(certificateId);

        return certificateId;
    }

    function revokeTestCertificate(uint certificateId) public onlyTester {
        Certificate storage cert = certificates[certificateId];
        require(cert.testerAddress != msg.sender, "Tester can only revoke their certificate.");
        require(!cert.isRevoked, "Certificate is already revoked.");
        cert.isRevoked = true;

        emit CertificateRevoked(certificateId);
    }

    function getCertificate(uint certificateId) public view
    returns (
        uint testTakenTimestamp,
        uint certificateExpiryTimestamp,
        string memory testType,
        string memory testResult,
        bool isRevoked,
        string memory encryptedExternalDataPointer,
        string memory digitalSignature
    ) {
        Certificate storage cert = certificates[certificateId];
        
        testTakenTimestamp = cert.testTakenTimestamp;
        certificateExpiryTimestamp = cert.certificateExpiryTimestamp;
        testType = cert.testType;
        testResult = cert.testResult;
        isRevoked = cert.isRevoked;
        encryptedExternalDataPointer = cert.encryptedExternalDataPointer;
        digitalSignature = cert.digitalSignature;
    }

    function getPatientDetail(uint certificateId) public view
    returns (
        string memory patientAddress,
        string memory patientGender,
        uint patientAge
    ) {
        PatientDetail storage detail = patientsDetail[certificateId];

        patientAddress = detail.patientAddress;
        patientGender = detail.patientGender;
        patientAge = detail.patientAge;
    }

    function getCertificateAmountByTester() public view onlyTester returns (uint) {
        return testerCertificates[msg.sender].length;
    }

    function getEncryptedPatientId(uint idx) public view onlyTester returns (uint) {
        return testerCertificates[msg.sender][idx];
    }
}
