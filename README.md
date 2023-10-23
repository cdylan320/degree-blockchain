# Blockchain-Degree
## Description
This decentralized application utilizes the ethereum blockchain and was designed as a secure way for universities to publish records of student's degrees for employer verification using a wallet address.
![image](https://github.com/dcnorkai/Blockchain-Degree/assets/54694121/a2692a9c-2c57-4415-bc6c-80fa05a841db)
![usecase](https://github.com/dcnorkai/Blockchain-Degree/assets/54694121/7b2dfeb0-9082-49cc-ab00-7581177223d6)
## Installation
Download Degree.sol and Token.sol and deploy both simultaneously on https://remix.ethereum.org/
## License
GPL-3.0
## Constructor
```
function constructor()
```
**Description**<br />
&emsp;&emsp;
The constructor sets the deployer of the contract as a registrar and an admin<br />
**Parameters**<br />
&emsp;&emsp;
None<br />
**What the function returns**<br />
&emsp;&emsp;
This function does not return anything
## Set Admin Function
```
function setAdmin(address adminPerson) onlyRegistrar public
```
**Description**<br />
&emsp;&emsp;
Maps an address to the value true in the *isAdmin* mapping<br />
**Parameters**<br />
&emsp;&emsp;
*adminPerson* An address to be mapped to true in the *isAdmin* mapping<br />
**What the function returns**<br />
&emsp;&emsp;
This function does not return anything
## Set Student Function
```
function setStudent(address studentPerson) onlyAdmin public
```
**Description**<br />
&emsp;&emsp;
Maps a student address to a course object<br />
**Parameters**<br />
&emsp;&emsp;
*studentPerson* An address to be mapped to a course[] in the students mapping<br />
**What the function returns**<br />
&emsp;&emsp;
This function does not return anything
## Set Graduated Function
```
function setGraduated(address studentPerson) onlyAdmin public
```
**Description**<br />
&emsp;&emsp;
Changes the value of graduationStatus of the student in the students mapping<br />
**Parameters**<br />
&emsp;&emsp;
*studentPerson* An address in the students mapping<br />
**What the function returns**<br />
&emsp;&emsp;
This function does not return anything
## Set Course Function
```
function setCourse(address studentPerson, string memory courseName, uint courseGPA) onlyAdmin public
```
**Description**<br />
&emsp;&emsp;
Adds a new course to the course array in the student courses mapping<br />
**Parameters**<br />
&emsp;&emsp;*studentPerson* An address in the student courses mapping<br />
&emsp;&emsp;*courseName* The name of the course to be added<br />
&emsp;&emsp;*courseGPA* The gpa earned in the course to be added<br />
**What the function returns**<br />
&emsp;&emsp;
This function does not return anything
## Show All Courses Function
```
function showAllCourses(address studentPerson) public view returns (Course[] memory)
```
**Description**<br />
&emsp;&emsp;
Shows all of the courses in the course array in the student courses mapping at the student's address<br />
**Parameters**<br />
&emsp;&emsp;*studentPerson* An address in the student courses mapping<br />
**What the function returns**<br />
&emsp;&emsp;
This function returns the course array at the student address
## Hide a Course Function
```
function hideCourse(string memory courseName) onlyStudent public
```
**Description**<br />
&emsp;&emsp;
Allows a student to hide a course from being displayed and moves it to the hidden courses mapping<br />
**Parameters**<br />
&emsp;&emsp;*courseName* The name of the course to be moved to the hidden student courses mapping<br />
**What the function returns**<br />
&emsp;&emsp;
This function does not return anything
## Show a Course Function
```
function showCourse(string memory courseName) onlyStudent public
```
**Description**<br />
&emsp;&emsp;
Allows a student to hide a course from being displayed<br />
**Parameters**<br />
&emsp;&emsp;*courseName* The name of the course to be moved back to the student courses mapping<br />
**What the function returns**<br />
&emsp;&emsp;
This function does not return anything
