/// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.2 <0.9.0;

//Write a smart contract that stores gpa, studentID, semesterName,
//courseTaken by students of each semester. Additionally, create a separate function so that 
// we can see all the semester data of students. [ Consider the value of your gpa: string, 
// semesterName: string, studentID:uint, courseTaken: uint.  ]

contract Checkpoint3 {
    struct Student {
        string gpa;
        string semesterName;
        uint studentID;
        uint courseTaken;
    }
    
    mapping(uint => Student) private studentDatabase;
    
    function AddStudent(uint _studentID, string memory _gpa, string memory _semesterName, uint _courseTaken) public {
        studentDatabase[_studentID] = Student(_gpa, _semesterName, _studentID, _courseTaken);
    }
    
    function StudentData(uint _studentID) public view returns(string memory, string memory, uint, uint) {
        return (studentDatabase[_studentID].gpa, studentDatabase[_studentID].semesterName, studentDatabase[_studentID].studentID, studentDatabase[_studentID].courseTaken);
    }
}