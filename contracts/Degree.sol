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

    event CourseHidden(address student, string courseName);

    //Constructor function
    constructor() {
        registrar = msg.sender;
        isAdmin[msg.sender] = true;
    }

    // function mintDegree(address toStudentAddress, string calldata studentName) onlyAdmin public {
    //     //Check if the provided studentName matches the stored studentName for the provided student address
    //     if(keccak256(abi.encodePacked(studentName)) == keccak256(abi.encodePacked(students[toStudentAddress].studentName))) {
    //         uint tokenID = uint(keccak256(abi.encodePacked(toStudentAddress)));
    //         super.mint(toStudentAddress, tokenID, studentName);
    //     }
    // }

    function mintDegree(address toStudentAddress, string calldata studentName) onlyAdmin public {
        //Check if the provided studentName matches the stored studentName for the provided student address and graduation status of student is true
        if(keccak256(abi.encodePacked(studentName)) == keccak256(abi.encodePacked(students[toStudentAddress].studentName)) 
           && students[toStudentAddress].graduationStatus) {
            uint tokenID = uint(keccak256(abi.encodePacked(toStudentAddress)));
            super.mint(toStudentAddress, tokenID, studentName);
        }
    }

    function setAdmin(address adminPerson) onlyRegistrar public {
        isAdmin[adminPerson] = true;
    }

    function setStudent(address studentPerson, string memory studentName) onlyAdmin public {
        //Initialize a temporary Student struct with the default student object
        Student memory temp = defaultStudent;
        temp.studentPerson = studentPerson;
        temp.studentName = studentName;
        students[studentPerson] = temp;
    }

    function setGraduated(address studentPerson) onlyAdmin public {
        students[studentPerson].graduationStatus = true;
    }

    function setCourse(address studentPerson, string memory courseName, uint courseGPA) onlyAdmin public {
        //Get the array of courses for the specified student
        Course[] storage temp = studentCourses[studentPerson];

        //Determine the new index for the course
        uint newIndex = temp.length;

        //Add the new course to the student's course array
        temp.push(Course({name : courseName, gpa : courseGPA}));

        //Update the courseIndex mapping with the new index (1-based index)
        courseIndex[studentPerson][courseName] = newIndex + 1;
    }

    function showAllCourses(address studentPerson) public view returns (Course[] memory) {
        return studentCourses[studentPerson];
    }

    function hideCourse(string memory courseName) onlyStudent public {
        //Set sender as the student address
        address studentPerson = msg.sender;

        //Get the index of the course to be hidden from courseIndex mapping
        uint index  = courseIndex[studentPerson][courseName];

        //Verify course exists
        require(index > 0, "Error, course doesn't exist");
        index = index - 1;

        //Mark course as hidden in the courseIndex mapping by setting it to 0
        courseIndex[studentPerson][courseName] = 0;

        //Move course to hidden list
        hiddenCourses[studentPerson].push(studentCourses[studentPerson][index]);

        //Replace the course in the studentCourses list with the defaultCourse value
        studentCourses[studentPerson][index] = defaultCourse;

        //Emit an event to indicate that the course has been hidden
        emit CourseHidden(studentPerson, courseName);
    }

    function showCourse(string memory courseName) onlyStudent public {
        address studentPerson = msg.sender;
        Course[] storage hidden = hiddenCourses[studentPerson];
        Course[] storage shown = studentCourses[studentPerson];
        uint index = 0;
        bool courseFound = false;

        //Find the hidden course
        while(index < hidden.length) {
            if(keccak256(abi.encodePacked(hidden[index].name)) == keccak256(abi.encodePacked(courseName))) {
                courseFound = true;
                break;
            }
            index++;
        }

        require(courseFound, "Course not found in hidden courses");

        //Move the course from hidden list to shown list
        Course memory temp = hidden[index];
        for(uint i = 0; i < shown.length; i++) {
            if(keccak256(abi.encodePacked(shown[i].name)) == keccak256(abi.encodePacked(""))) {
                shown[i] = temp;
                courseIndex[studentPerson][courseName] = i + 1;

                //Remove the course from the hidden list
                hidden[index] = hidden[hidden.length - 1];
                hidden.pop();
                break;
            }
        }
    }
}
