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

    modifier onlyTester {
        require(isTester[msg.sender], "Msg.sender must be an approved tester.");
        _;
    }

    function register(address tester) public notTester {
        isTester[tester] = true;
    }
}