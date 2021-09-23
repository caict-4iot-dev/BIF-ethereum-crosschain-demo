// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

pragma experimental ABIEncoderV2;

import "./CrossChainContractAdditional.sol";

/// @title Cross-chain contract storage contract
contract Storage {
    
    /// @dev Store the processing results of cross-chain transactions
    /// @dev Four states: initialization, processed successfully, processed failed, and processing timeout
    enum TxResultEnum {
        INIT,
        ACK_SUCCESS,
        ACK_FAIL,
        ACK_TIMEOUT
    }

    /// @dev Store refund results of cross-chain transactions
    /// @dev Three states: no refund required, to be refunded, refunded
    enum TxRefundedEnum {
        NONE,
        TODO,
        REFUNDED
    }

    /// @dev Role of chain: Source chain, target chain and relay chain
    enum TxOriginEnum {
        SRC,
        DEST,
        RELAY
    }
    
    /// @notice Event emitted when chaincode is set
    event setChainCodeEvent(string operation, string chain_Code);

    /// @notice Event emitted when gateway is set
    event setGatewayEvent(string operation, address gateway_Address);

    /// @notice Event emitted when user sent cross-chain transaction
    event startTxEvent(string operation, string cross_TxNo, uint8 txType);

    /// @notice Event emitted when gateway submitted cross-chain transaction
    event sendTxEvent(string operation, string cross_TxNo, uint8 txType);

    /// @notice Event emitted when gateway submitted cross-chain transaction confirmation
    event sendAckedEvent(string operation, string cross_TxNo, uint8 txType);

    /// @notice Event emitted when the main chain points are cast
    event AssetMintEvent(
        string operation,
        address from,
        address to,
        uint256 value
    );

    /// @notice Event emitted when the main chain points are destroyed
    event AssetBurnEvent(string operation, address from, uint256 value);

    /// @notice Event emitted when the main chain points authorized transfer
    event approveEvent(string operation, uint256 value);

    /// @notice Event emitted when the main chain points is transferred
    event transferEvent(string operation, uint256 value);

    /// @notice Event emitted when assets withdrawn
    event takeOutEvent(string operation, address to);

    CrossChainContractAdditional internal _CrossChainContractAdditional;
    
    /// @dev The person who deployed the contract
    address internal _Owner;

    /// @dev Store subchain AC code 
    string internal _ChainCode;

    /// @dev Gateway node list
    address[] internal _GatewayList;

    /// @dev Contract version information
    string internal _Version;

    mapping(bytes32 => _CrossTxObj) internal _CrossTxObject;

    /// @dev Number of main chain points
    mapping(bytes32 => uint256) internal _MainAsset;

    /// @dev Number of authorized points
    mapping(bytes32 => uint256) internal _AllowValue;

    /// @dev Used to calculate cross-chain transaction number
    uint256 internal _CrossTxNum;
    uint256 internal _MainChainCode;

    /// @notice Cross-chain transaction object
    /// @member cross-chain transaction number
    /// @member source chain AC code
    /// @member dest chain AC code
    /// @member source address
    /// @member dest address
    /// @member cross-chain transaction type:0, 1, 2, 3
    /// @member cross-chain transaction description
    /// @member tag information
    /// @member cross-chain transaction processing results
    /// @member withdrawal status of cross-chain transaction assets
    /// @member user comments
    /// @member sendTx proof information
    /// @member sendAcked proof information
    /// @member send chain contract version information
    /// @member contract location
    struct _CrossTxObj {
        string CrossTxNo;
        string SrcChainCode;
        string DestChainCode;
        string SrcBid;
        string DestBid;
        uint8 TxType;
        bytes Payload;
        string Remark;
        TxResultEnum Result;
        TxRefundedEnum Refunded;
        string Extension;
        _SendProof SendProofs;
        _AckProof AckProofs;
        string Version;
        TxOriginEnum Origin;
    }

    /// @notice SendTx proof information
    /// @member block number where the transaction is located
    /// @member hash of transaction
    /// @member verifier of startTx transactions
    struct _SendProof {
        uint256 LedgerSeq;
        string TxHash;
        address verifieraddr;
    }

    /// @notice SendAcked proof information
    /// @member block number where the transaction is located
    /// @member hash of transaction
    /// @member verifier of sendTx and sendAcked transactions
    struct _AckProof {
        uint256 LedgerSeq;
        string TxHash;
        address verifieraddr;
    }
}
