// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./Token.sol";

contract Degree is degNFT {
    address registrar;
    struct Course{
        string name;
        uint gpa;
    }
    struct Student{
        address studentPerson;
        string studentName;
        bool graduationStatus;
    }
    Student private defaultStudent;
    Course private defaultCourse;
    mapping(address => bool) private isAdmin;
    mapping(address => Student) public students;
    mapping(address => mapping(string => uint)) private courseIndex;
    mapping(address => Course[]) private studentCourses;
    mapping(address => Course[]) private hiddenCourses;

    modifier onlyRegistrar{
        require(msg.sender == registrar);
        _;
    }

    modifier onlyStudent{
        require(msg.sender == students[msg.sender].studentPerson);
        _;
    }

    modifier onlyAdmin{
        require(isAdmin[msg.sender]);
        _;
    }

    // constructor function
    constructor() {
        registrar = msg.sender;
        isAdmin[msg.sender] = true;
    }

    function mintDegree(address toStudentAddress, string calldata studentName) onlyAdmin public {
        if(keccak256(abi.encodePacked(studentName)) == keccak256(abi.encodePacked(students[toStudentAddress].studentName))) {
            uint tokenID = uint(keccak256(abi.encodePacked(toStudentAddress)));
            super.mint(toStudentAddress, tokenID, studentName);
        }
    }

    function setAdmin(address adminPerson) onlyRegistrar public {
        isAdmin[adminPerson] = true;
    }

    function setStudent(address studentPerson, string memory studentName) onlyAdmin public {
        Student memory temp = defaultStudent;
        temp.studentPerson = studentPerson;
        temp.studentName = studentName;
        students[studentPerson] = temp;
    }

    function setGraduated(address studentPerson) onlyAdmin public {
        students[studentPerson].graduationStatus = true;
    }

    function setCourse(address studentPerson, string memory courseName, uint courseGPA) onlyAdmin public {
        Course[] storage temp = studentCourses[studentPerson];
        uint newIndex = temp.length;
        temp.push(Course({name : courseName, gpa : courseGPA}));
        courseIndex[studentPerson][courseName] = newIndex + 1;
    }

    function showAllCourses(address studentPerson) public view returns (Course[] memory) {
        return studentCourses[studentPerson];
    }

    function hideCourse(string memory courseName) onlyStudent public {
        address studentPerson = msg.sender;
        uint temp = courseIndex[studentPerson][courseName];
        require(temp > 0, "Error, course doesn't exist");
        temp = temp - 1;
        courseIndex[studentPerson][courseName] = 0;
        hiddenCourses[studentPerson].push(studentCourses[studentPerson][temp]);
        studentCourses[studentPerson][temp] = defaultCourse;
    }

    function showCourse(string memory courseName) onlyStudent public {
        address studentPerson = msg.sender;
        Course[] storage hidden = hiddenCourses[studentPerson];
        Course[] storage shown = studentCourses[studentPerson];
        uint index = 0;
        while(keccak256(abi.encodePacked(hidden[index].name)) != keccak256(abi.encodePacked(courseName))) {
            index++;
        }
        Course memory temp = hidden[index];
        for(uint i = 0; i < shown.length; i++) {
            if(keccak256(abi.encodePacked(shown[i].name)) == keccak256(abi.encodePacked(""))) {
                shown[i] = temp;
                courseIndex[studentPerson][courseName] = i + 1;
                break;
            }
        }    
    }
}
