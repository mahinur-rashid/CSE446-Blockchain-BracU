/// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.2 <0.9.0;

contract Checkpoint1 {
    string private studentID = "22301714";
    string private name = "Mahinur Rashid";

    function StudentName(string memory _studentID) public view returns (string memory) {
        if (keccak256(abi.encodePacked(_studentID)) == keccak256(abi.encodePacked(studentID))) {
            return name;
        } else {
            return "This is not your ID";
        }
    }
}