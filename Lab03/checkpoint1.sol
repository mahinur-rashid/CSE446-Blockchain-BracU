/// SPDX-License-Identifier: MIT



pragma solidity >= 0.8.2 <0.9.0;


contract Checkpoint1 {
    uint256 studentID = 22301714;
    string name = "Mahinur";
    
    function StudentName(uint256 _studentID) public view returns(string memory) {
        if(_studentID == studentID) {
            return name;
        } else {
            return "This is not your ID";
        }
    }
}