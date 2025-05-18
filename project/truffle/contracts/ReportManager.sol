// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {UserManager, User, RoleType, zeroAddr} from "./UserManager.sol";
import {StringUtils} from "./StringUtils.sol";

enum ReportStatus {
    MISSING,
    FOUND,
    FALSE
}

enum Urgency {
    NORMAL,
    HIGH,
    CRITICAL
}

struct Report {
    bytes32 cid;
    string name;
    uint age;
    uint height;
    string description;
    string location;
    string contact;
    Urgency urgency;
    ReportStatus status;
}

contract ReportManager {
    using StringUtils for string;

    bytes32[] reports;
    mapping(bytes32 => Report) public reportMap;
    UserManager userManager;

    string[] divisions = [
        "dhaka",
        "chattogram",
        "rajshahi",
        "khulna",
        "barishal",
        "sylhet",
        "rangpur",
        "mymensingh"
    ];

    constructor(address _userManager) {
        userManager = UserManager(_userManager);
        testReport();
    }

    function testReport() public {
        reportMissing("trump", 69, 420, "murder psycho", "khulna", "idk");
        reportMissing("nataneya", 1, 0, "white dog", "khulna", "idk");
    }

    function checkReportExist(bytes32 _cid) public view returns (bool) {
        if (reportMap[_cid].cid != bytes32(0)) return true;
        return false;
    }

    function checkDivision(
        string memory _location
    ) public view returns (string memory) {
        string memory cleanLocation = _location.toLower();
        for (uint i = 0; i < divisions.length; i++) {
            if (cleanLocation.compare(divisions[i])) return divisions[i];
        }
        return "NIL";
    }

    function checkDivisionIndex(
        string memory _location
    ) public view returns (uint) {
        string memory cleanLocation = _location.toLower();
        for (uint i = 0; i < divisions.length; i++) {
            if (cleanLocation.compare(divisions[i])) return i + 1;
        }
        return 0;
    }

    function reportMissing(
        string memory _name,
        uint256 _age,
        uint256 _height,
        string memory _description,
        string memory _location,
        string memory _contact
    ) public returns (uint) {
        require(userManager.userExists(msg.sender), "User does not exist");
        require(
            userManager.checkUserType(msg.sender, RoleType.REPORTER) ||
                userManager.checkUserType(msg.sender, RoleType.ADMIN),
            "Not a reporter"
        );
        require(
            !checkDivision(_location).compare("NIL"),
            "Division does not exist"
        );

        bytes32 cid = keccak256(
            abi.encodePacked(
                msg.sender,
                _name,
                _description,
                _location,
                _contact
            )
        );
        Urgency urgency = Urgency.NORMAL;

        if (_age < 18) urgency = Urgency.CRITICAL;
        else if (_height < 50) urgency = Urgency.HIGH;

        Report memory newReport = Report(
            cid,
            _name,
            _age,
            _height,
            _description,
            _location,
            _contact,
            urgency,
            ReportStatus.MISSING
        );
        reports.push(cid);
        reportMap[cid] = newReport;

        return reports.length - 1;
    }

    function updateReport(bytes32 _reportCID, ReportStatus status) public {
        require(
            userManager.checkUserType(msg.sender, RoleType.ADMIN),
            "Access denied"
        );
        require(reportMap[_reportCID].cid != bytes32(0), "Invalid id");
        require(
            reportMap[_reportCID].status == ReportStatus.MISSING,
            "Report already found or reported false."
        );
        reportMap[_reportCID].status = status;
    }

    function reportComplete(bytes32 _reportCID) public {
        updateReport(_reportCID, ReportStatus.FOUND);
    }

    function reportFalse(bytes32 _reportCID) public {
        updateReport(_reportCID, ReportStatus.FALSE);
    }

    function findReportByCID(bytes32 _cid) public view returns (Report memory) {
        return reportMap[_cid];
    }

    function findAllReports() public view returns (bytes32[] memory) {
        return reports;
    }

    function sortDivisionByCount() public returns (string[] memory) {
        uint[] memory divisionCount = new uint[](divisions.length);

        for (uint i = 0; i < reports.length; i++) {
            divisionCount[
                checkDivisionIndex(reportMap[reports[i]].location) - 1
            ] += 1;
        }

        string memory tmpName;
        uint tmpCount;

        for (uint j = 0; j < divisions.length - 1; j++) {
            for (uint i = 0; i < divisions.length - 1; i++) {
                if (divisionCount[i] < divisionCount[i + 1]) {
                    tmpName = divisions[i];
                    tmpCount = divisionCount[i];

                    divisions[i] = divisions[i + 1];
                    divisions[i + 1] = tmpName;

                    divisionCount[i] = divisionCount[i + 1];
                    divisionCount[i + 1] = tmpCount;
                }
            }
        }

        return divisions;
    }

    function sortDivisionByCountDesc() public returns (string[] memory) {
        uint[] memory divisionCount = new uint[](divisions.length);

        for (uint i = 0; i < reports.length; i++) {
            divisionCount[
                checkDivisionIndex(reportMap[reports[i]].location) - 1
            ] += 1;
        }

        string memory tmpName;
        uint tmpCount;

        for (uint j = 0; j < divisions.length - 1; j++) {
            for (uint i = 0; i < divisions.length - 1; i++) {
                if (divisionCount[i] > divisionCount[i + 1]) {
                    tmpName = divisions[i];
                    tmpCount = divisionCount[i];

                    divisions[i] = divisions[i + 1];
                    divisions[i + 1] = tmpName;

                    divisionCount[i] = divisionCount[i + 1];
                    divisionCount[i + 1] = tmpCount;
                }
            }
        }

        return divisions;
    }

    function findReportByDivision(
        string memory _location
    ) public view returns (Report[] memory) {
        uint filterCount = 0;
        for (uint i = 0; i < reports.length; i++)
            if (reportMap[reports[i]].location.compare(_location))
                filterCount++;

        Report[] memory filters = new Report[](filterCount);
        filterCount = 0;
        for (uint i = 0; i < reports.length; i++)
            if (reportMap[reports[i]].location.compare(_location)) {
                filters[filterCount] = reportMap[reports[i]];
                filterCount++;
            }

        return filters;
    }
}
