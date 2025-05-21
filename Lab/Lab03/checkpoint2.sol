//Write a smart contract that stores student id and the name of the student. 
//Also create a separate function that takes studentID and returns student name. 
//[ You must use mapping ]
/// SPDX-License-Identifier: MIT

pragma solidity >= 0.8.2 <0.9.0;
contract Checkpoint2 {
    mapping(uint256 => string) private studentDatabase;
    
    function AddStudent(uint256 _studentID, string memory _name) public {
        studentDatabase[_studentID] = _name;
    }
    
    function StudentName(uint256 _studentID) public view returns(string memory) {
        return studentDatabase[_studentID];
    }
}