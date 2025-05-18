// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { StringUtils } from './StringUtils.sol';

contract Tester{
    using StringUtils for string;
    address[2] test_strs;
    
    function test() public pure returns (bool) {
        string memory t1 = "wtf";
        string memory t2 = "wTf";
        return keccak256(bytes(t1.toLower())) == keccak256(bytes(t2.toLower()));
    }

    function store1(address str) public {
        test_strs[0] = str;
    }

    function store2(address str) public {
        test_strs[0] = str;
    }

    function get1() public view returns (address) {
        return test_strs[0];
    }
    function get2() public view returns (address) {
        return test_strs[0];
    }
}