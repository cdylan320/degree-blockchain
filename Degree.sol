// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.6.0; 

contract degree {
    address registrar;
    struct Student{
        address studentPerson;
        uint hashOfDegreeDetails;
        uint overallGPA;
        mapping (string=>uint) courses;
        bool graduationStatus;
    }
    Student[] students;

    // modifiers or rules
    modifier onlyRegistrar{
        require(msg.sender==registrar);
        _;
    }

    // constructor function
    constructor() public {
        registrar = msg.sender;
    }

    function setStudent() onlyRegistrar public {

    }

    function setGraduated(bool graduated) onlyRegistrar public {

    }
}
