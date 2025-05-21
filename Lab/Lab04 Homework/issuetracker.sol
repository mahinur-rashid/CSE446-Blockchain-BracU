// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IssueTracker {
    enum Status { ACTIVE, IN_PROGRESS, COMPLETE, CLOSED }
    
    struct Issue {
        uint issueId;
        string description;
        Status status;
    }
    
    // Changed to private
    mapping(uint => Issue) private issueList;
    
    // Changed to external
    function addIssue(uint _issueId, string memory _description, Status _status) external {
        require(issueList[_issueId].issueId == 0, "Issue ID already exists");
        require(_status == Status.ACTIVE, "Should start as ACTIVE");
        issueList[_issueId] = Issue(_issueId, _description, _status);
    }
    
    // Changed to external
    function updateIssueStatus(uint _issueId, Status _newStatus) external {
        require(issueList[_issueId].issueId != 0, "Issue ID does not exist");
        Status currentStatus = issueList[_issueId].status;
        
        if (currentStatus == Status.ACTIVE) {
            require(_newStatus == Status.IN_PROGRESS, "update ACTIVE to IN_PROGRESS");
        } else if (currentStatus == Status.IN_PROGRESS) {
            require(_newStatus == Status.COMPLETE, "update IN_PROGRESS to COMPLETE");
        } else if (currentStatus == Status.COMPLETE) {
            require(_newStatus == Status.CLOSED, "update COMPLETE to CLOSED");
        } else {
            revert("Cannot update status");
        }
        
        issueList[_issueId].status = _newStatus;
    }

    // Added new function to get issue details
    function getIssue(uint _issueId) external view returns (uint, string memory, Status) {
        require(issueList[_issueId].issueId != 0, "Issue does not exist");
        Issue memory issue = issueList[_issueId];
        return (issue.issueId, issue.description, issue.status);
    }
}