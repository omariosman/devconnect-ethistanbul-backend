const { ethers } = require('ethers');
const { AUTHOR_ADDRESS, DETRACT_CONTRACT_ADDRESS, DETRACT_CONTRACT_ABI } = require('../constants/blockchains');
const { getTreasuryWallet } = require("../helpers/infra");

const storePaperHash = async(hash) => {
    let treasuryWallet = getTreasuryWallet();
    let detractContract = new ethers.Contract(
        DETRACT_CONTRACT_ADDRESS,
        DETRACT_CONTRACT_ABI,
        treasuryWallet
      );
    const tx = await detractContract.publishPaper(hash, AUTHOR_ADDRESS)
    tx.wait();
    console.log(tx);
}

module.exports = {
    storePaperHash
}