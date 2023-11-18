// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

interface IDetract {
    function publishPaper(bytes32 _paper, address _owner) external;

    function challengePaper(
        bytes32 _paperHash,
        bytes32 _evidenceHash
    ) external payable;

    function upVote(bytes32 paperHash) external;

    function downVote(bytes32 paperHash) external;

    function claimAmountByChallenger(bytes32 _paperHash) external;

    function claimAmountByPaperOwner(bytes32 _paperHash) external;
}
