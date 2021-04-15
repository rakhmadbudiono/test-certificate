pragma solidity ^0.5.0;

contract TesterRegistry {
    struct Tester {
        string institutionName;
        string location;
        string contact; 
    }

    mapping(address=>bool) public isTester;
    mapping (address=>Tester) testers;

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
    }
}