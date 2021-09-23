// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

pragma experimental ABIEncoderV2;

import "./Storage.sol";

/// @title Cross-chain additional main contract
contract CrossChainContractAdditional is Storage {
    /// @notice Set subchain AC code. Can only be executed by the contract owner.
    function setChainCode(string calldata chainCode) external {
        require(
            bytes(chainCode).length == 4,
            "The character length of chaincode is 4"
        );
        _ChainCode = chainCode;

        emit setChainCodeEvent("setChainCode", chainCode);
    }

    /// @notice Set subchain cross-chain gateway. Can only be executed by the contract owner.
    function setGateway(address gatewayAddress) external {
        require(gatewayAddress != address(0x0), "Invalid address");
        _GatewayList.push(gatewayAddress);

        emit setGatewayEvent("setGateway", gatewayAddress);
    }

    /// @notice Number of points that can be transferred by authorization
    function approve(
        address from,
        address to,
        uint256 value
    ) external {
        require(from == msg.sender && to != address(0x0), "Invalid address");
        require(value > 0, "Value must be greater than 0");
        _AllowValue[keccak256(abi.encodePacked(from, to))] = value;

        emit approveEvent("approve", value);
    }

    /// @notice Transfer main chain points in subchain
    function transfer(address to, uint256 value) external {
        require(to != address(0x0), "Invalid address");
        require(value > 0, "Value must be greater than 0");
        require(to != msg.sender, "Transfer assets to yourself");

        uint256 senderValue = _MainAsset[
            keccak256(abi.encodePacked(_MainChainCode, msg.sender))
        ];
        require(
            senderValue > value,
            "The main-chain points of the account are not enough"
        );

        uint256 toValue = _MainAsset[
            keccak256(abi.encodePacked(_MainChainCode, to))
        ];
        toValue = toValue + value;
        _MainAsset[keccak256(abi.encodePacked(_MainChainCode, to))] = toValue;

        senderValue = senderValue - value;
        _MainAsset[
            keccak256(abi.encodePacked(_MainChainCode, msg.sender))
        ] = senderValue;

        emit transferEvent("transfer", value);
    }
}
