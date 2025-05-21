// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./issuetracker.sol";

contract Driver {
    IssueTracker private issueTracker;
    
    // Constructor to set the IssueTracker contract address
    constructor(address _issueTrackerAddress) {
        issueTracker = IssueTracker(_issueTrackerAddress);
    }
    
    // Function to add a new issue through IssueTracker
    function addIssue(uint _issueId, string memory _description) external {
        issueTracker.addIssue(_issueId, _description, IssueTracker.Status.ACTIVE);
    }
    
    // Function to update issue status
    function updateIssueStatus(uint _issueId, IssueTracker.Status _newStatus) external {
        issueTracker.updateIssueStatus(_issueId, _newStatus);
    }
    
    // Function to get issue details
    function getIssue(uint _issueId) external view returns (uint id, string memory description, IssueTracker.Status status) {
        return issueTracker.getIssue(_issueId);
    }
}