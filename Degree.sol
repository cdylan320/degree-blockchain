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
    Student public defaultStudent;
    mapping (address=>Student) public students;

    // modifiers or rules
    modifier onlyRegistrar{
        require(msg.sender==registrar);
        _;
    }

    // constructor function
    constructor() public {
        registrar = msg.sender;
    }

    function setStudent(address studentPerson) onlyRegistrar public {
        Student memory temp = defaultStudent;
        temp.studentPerson = studentPerson;
        students[studentPerson] = temp;
    }

    function setGraduated(address studentPerson) onlyRegistrar public {
        students[studentPerson].graduationStatus = true;
    }

    function setCourse(address studentPerson, string calldata courseName, uint courseGPA) onlyRegistrar public {
        students[studentPerson].courses[courseName] = courseGPA;
    }

    //For testing
    function showCourse(address studentPerson, string calldata courseName) public view returns (uint) {
        return students[studentPerson].courses[courseName];
    }

}
