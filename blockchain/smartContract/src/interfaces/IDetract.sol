// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

interface IDetract {
    function challengePaper(
        bytes32 _paperHash,
        bytes32 _evidenceHash
    ) external payable;

    function upVote(bytes32 paperHash) external;

    function downVote(bytes32 paperHash) external;
}
