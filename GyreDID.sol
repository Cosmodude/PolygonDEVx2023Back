// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

abstract contract OwnerHelper {
    address private owner;

  	event OwnerTransfer(address indexed _from, address indexed _to);

  	modifier onlyOwner {
		require(msg.sender == owner);
		_;
  	}

  	constructor() {
		owner = msg.sender;
  	}

  	function transferOwnership(address _to) onlyOwner public {
        require(_to != owner);
        require(_to != address(0x0));
    	owner = _to;
    	emit OwnerTransfer(owner, _to);
  	}
}

abstract contract IssuerHelper is OwnerHelper {
    mapping(address => bool) public issuers;

    event AddIssuer(address indexed _issuer);
    event DelIssuer(address indexed _issuer);

    modifier onlyIssuer {
        require(isIssuer(msg.sender) == true);
        _;
    }

    constructor() {
        issuers[msg.sender] = true;
    }

    function isIssuer(address _addr) public view returns (bool) {
        return issuers[_addr];
    }

    function addIssuer(address _addr) onlyOwner public returns (bool) {
        require(issuers[_addr] == false);
        issuers[_addr] = true;
        emit AddIssuer(_addr);
        return true;
    }

    function delIssuer(address _addr) onlyOwner public returns (bool) {
        require(issuers[_addr] == true);
        issuers[_addr] = false;
        emit DelIssuer(_addr);
        return true;
    }
}

contract GyreDID is IssuerHelper {
    uint256 private issueCount;  // number of all issued credentials 
    uint8 private holderCount;  // number of holders
    mapping(uint8 => string) private issueTypeEnum;
    mapping(uint8 => string) private statusEnum;

    struct Credential{
        uint256 id;
        address issuer;
        uint8 issueType;
        uint8 status;
        string hash;
        uint256 createDate;
    }

    mapping(address => mapping(uint8 => Credential)) private credentials;  // holder => credentials => credential

    constructor() {
        issueCount = 1;
        holderCount = 3;
        issueTypeEnum[0] = "Employee";
        issueTypeEnum[1] = "Student";
        issueTypeEnum[2] = "Member";
    }

    function createCredential(address _holderAddress, uint8 _issueType, string calldata _value) onlyIssuer public returns(bool){
        // creates a new credential
        Credential storage credential = credentials[_holderAddress][_issueType];
        require(credential.id == 0);
        credential.id = issueCount;
        credential.issuer = msg.sender;
        credential.alumniType = _issueType;
        credential.statusType = 0;
        credential.value = _value;
        credential.createDate = block.timestamp;

        issueCount += 1;

        return true;
    }

    function getCredential(address _holderAddress, uint8 _issueType) public view returns (Credential memory){
        return credentials[_holderAddress][_issueType];
    }

    function getCredentials(address _holderAddress) public view returns (Credential[] memory){
        Credential[] memory holderCredentials;  
        uint8 i = 0 ;
        while(credentials[_holderAddress][i].id != 0) {
                holderCredentials.push(credentials[_holderAddress][i]);
            }
        }
        return userCredentials;
    }

    function addAlumniType(string calldata _value) onlyIssuer public returns (bool) {
        alumniEnum[holderCount] = _value;
        holderCount+= 1;
        return true;
    }

    function getAlumniType(uint8 _type) public view returns (string memory) {
        return alumniEnum[_type];
    }

    function addStatusType(uint8 _type, string calldata _value) onlyIssuer public returns (bool){
        require(bytes(statusEnum[_type]).length == 0);
        statusEnum[_type] = _value;
        return true;
    }

    function getStatusType(uint8 _type) public view returns (string memory) {
        return statusEnum[_type];
    }

    function changeStatus(address _alumni, uint8 _issueType, uint8 _type) onlyIssuer public returns (bool) {
        require(credentials[_alumni][_issueType].id != 0);
        require(bytes(statusEnum[_type]).length != 0);
        credentials[_alumni][_issueType].statusType = _type;
        return true;
    }

}