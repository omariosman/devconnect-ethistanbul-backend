# Solidity API

## Detract

### votingPeriod

```solidity
uint256 votingPeriod
```

### minStakingAmountForDetract

```solidity
uint256 minStakingAmountForDetract
```

### upVotesReceived

```solidity
mapping(bytes32 => uint256) upVotesReceived
```

### downVotesReceived

```solidity
mapping(bytes32 => uint256) downVotesReceived
```

### challengeInitiationTime

```solidity
mapping(bytes32 => uint256) challengeInitiationTime
```

### retractionStakeAmount

```solidity
mapping(bytes32 => uint256) retractionStakeAmount
```

### paperRetractionEvidence

```solidity
mapping(bytes32 => bytes32) paperRetractionEvidence
```

### paperOwner

```solidity
mapping(bytes32 => address) paperOwner
```

### _updateDetractAmountOfPaper

```solidity
function _updateDetractAmountOfPaper(bytes32 _paperHash, uint256 _amount) public
```

### publishPaper

```solidity
function publishPaper(address _owner, bytes32 _paper) public
```

_publish paper_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _owner | address | address of the paper owner |
| _paper | bytes32 | paper hash |

### IsVotingActive

```solidity
modifier IsVotingActive(bytes32 _paperHash)
```

### challengePaper

```solidity
function challengePaper(bytes32 _paperHash, bytes32 _evidenceHash) public payable
```

_challenge the paper_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _paperHash | bytes32 | paper hash |
| _evidenceHash | bytes32 | evidence hash |

### upVote

```solidity
function upVote(bytes32 _paperHash) public
```

_upvote the paper_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _paperHash | bytes32 | paper hash |

### downVote

```solidity
function downVote(bytes32 _paperHash) public
```

_downvote the paper_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _paperHash | bytes32 | paper hash |

### claimAmountByChallenger

```solidity
function claimAmountByChallenger(bytes32 _paperHash) public
```

_claim the amount by challenger_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _paperHash | bytes32 | paper hash |

### claimAmountByPaperOwner

```solidity
function claimAmountByPaperOwner(bytes32 _paperHash) public
```

_claim the amount by paper owner_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _paperHash | bytes32 | paper hash |

### receive

```solidity
receive() external payable
```

