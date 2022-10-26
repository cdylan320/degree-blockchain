// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0; 

contract Degree {
    address registrar;
    struct Course{
        string name;
        uint gpa;
    }
    struct Student{
        address studentPerson;
        uint hashOfDegreeDetails;
        uint overallGPA;
        bool graduationStatus;
    }
    struct Admin{
        address adminPerson;
    }
    Student private defaultStudent;
    Admin private defaultAdmin;
    mapping(address => Student) private students;
    mapping(address => Admin) private admins;
    mapping(address => mapping(string => uint)) private courseIndex;
    mapping(address => Course[]) private studentCourses;

    modifier onlyRegistrar{
        require(msg.sender == registrar);
        _;
    }

    modifier onlyStudent{
        require(msg.sender == students[msg.sender].studentPerson);
        _;
    }

    modifier onlyAdmin{
        require(msg.sender == admins[msg.sender].adminPerson);
        _;
    }

    // constructor function
    constructor() {
        registrar = msg.sender;
    }

    function setAdmin(address adminPerson) onlyRegistrar public {
        Admin memory temp = defaultAdmin;
        temp.adminPerson = adminPerson;
        admins[adminPerson] = temp;
    }

    function setStudent(address studentPerson) onlyAdmin public {
        Student memory temp = defaultStudent;
        temp.studentPerson = studentPerson;
        students[studentPerson] = temp;
    }

    function setGraduated(address studentPerson) onlyAdmin public {
        students[studentPerson].graduationStatus = true;
    }

    function setCourse(address studentPerson, string memory courseName, uint courseGPA) onlyAdmin public {
        Course[] storage temp = studentCourses[studentPerson];
        uint newIndex = temp.length;
        temp.push(Course({name : courseName, gpa : courseGPA}));
        courseIndex[studentPerson][courseName] = newIndex;
    }

    function showCourses(address studentPerson) public view returns (Course[] memory) {
        return studentCourses[studentPerson];
    }

    function hideCourse(string memory courseName) onlyStudent public {
        //remove the course passed in
        //store the removed course in another data structure so it can be retrieved later
    }

    function showCourse(string memory courseName) onlyStudent public {
        //add course back to courses data structure from the hidden courses data structure
        //remove it from the hidden coursess data structure
    }
}
