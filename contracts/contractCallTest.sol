// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

/// @title contract call test
contract Set {
    uint256 public value;

    function set(uint256 val) public {
        value = val;
    }
}

contract Get {
    
    function getBalance(address addr) public view returns(uint256) {
        return addr.balance;
    }
}
