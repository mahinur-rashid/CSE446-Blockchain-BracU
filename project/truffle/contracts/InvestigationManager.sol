// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {UserManager, User, RoleType, zeroAddr} from "./UserManager.sol";
import {ReportManager, Report, ReportStatus} from "./ReportManager.sol";
import {StringUtils} from "./StringUtils.sol";

contract InvestigationManager {
    ReportManager reportManager;
    UserManager userManager;
    uint balance = 10;
    uint fixedPay = 2;

    address[] investigators;

    mapping(bytes32 => address) investigations;
    mapping(address => address[2]) schedules;

    constructor(UserManager _userManager, ReportManager _reportManager) {
        reportManager = _reportManager;
        userManager = _userManager;
    }

    function assignInvestigator(
        bytes32 _reportCID,
        address investigatorAddress
    ) public {
        require(reportManager.checkReportExist(_reportCID), "Report not found");
        require(
            userManager.checkUserType(
                investigatorAddress,
                RoleType.INVESTIGATOR
            ),
            "To be assigned user is not an investigator"
        );
        require(
            investigations[_reportCID] == zeroAddr,
            "Investigator already assigned"
        );
        investigations[_reportCID] = investigatorAddress;
        investigators.push(investigatorAddress);
    }

    function getBalance() public view returns (uint) {
        return balance;
    }

    function getInvestigators() public view returns (address[] memory) {
        return investigators;
    }

    function checkIfAssigned(bytes32 _cid) public view returns (bool) {
        return investigations[_cid] != zeroAddr;
    }

    function getInvestigator(bytes32 _reportCID) public view returns (address) {
        require(
            investigations[_reportCID] != zeroAddr,
            "Investigator not assigned"
        );
        return investigations[_reportCID];
    }

    function bookAppointment(address _user, uint slot) public payable {
        require(slot < 2, "Invalid slot");
        require(msg.value >= fixedPay, "Insifficient funds");
        require(
            schedules[_user][slot] == zeroAddr,
            "Appointment already booked"
        );
        (bool success, ) = payable(msg.sender).call{
            value: msg.value - fixedPay
        }("");
        require(success, "Refund failed");
        balance += msg.value;
        schedules[_user][slot] = msg.sender;
    }

    function getInvestigatorAppointment(
        address _investigator
    ) public view returns (address[2] memory) {
        return schedules[_investigator];
    }

    function transferToUser(address payable recipient, uint256 amount) public {
        require(balance >= amount, "Insufficient contract balance");
        require(amount > 0, "Transfer amount must be greater than zero");

        balance -= amount;

        recipient.transfer(amount);
    }

    // function getInvestigatorAppoinment(uint _reportId, uint slot) public view returns (Report memory){
    //     if (slot == 0)
    //         return scheduleOne[getInvestigator(_reportId)];
    //     else
    //         return scheduleTwo[getInvestigator(_reportId)];
    // }

    // function bookAppointment(uint _reportId, uint slot) public payable returns (uint) {
    //     require(msg.value >= 2, "Insifficient funds");
    //     require(investigations[reportManager.findAllReports()[_reportId].cid] != zeroAddr, "Investigator not assigned");
    //     if (slot == 0)
    //         scheduleOne[getInvestigator(_reportId)] = reportManager.findAllReports()[_reportId];
    //     else
    //         scheduleTwo[getInvestigator(_reportId)] = reportManager.findAllReports()[_reportId];
    //     balance += msg.value;
    //     return msg.value;
    // }
}
