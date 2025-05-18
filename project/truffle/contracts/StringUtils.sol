// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library StringUtils {
    function toLower(string memory str) internal pure returns (string memory) {
        bytes memory bStr = bytes(str);
        bytes memory bLower = new bytes(bStr.length);
        for (uint i = 0; i < bStr.length; i++) {
            uint8 char = uint8(bStr[i]);
            // Uppercase letters in ASCII range [65, 90]
            if (char >= 65 && char <= 90) {
                bLower[i] = bytes1(char + 32); // Add 32 to get lowercase ASCII
            } else {
                bLower[i] = bStr[i];
            }
        }
        return string(bLower);
    }

    function compare(string memory str, string memory arg) internal pure returns (bool) {
        return keccak256(bytes(str)) == keccak256(bytes(arg));
    }
}