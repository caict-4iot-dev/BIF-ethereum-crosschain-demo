const CrossChainContract = artifacts.require("CrossChainContract");
const CrossChainContractAdditional = artifacts.require("CrossChainContractAdditional");

module.exports = function (deployer) {
  deployer.deploy(CrossChainContract);
  deployer.deploy(CrossChainContractAdditional);
  console.log("deploy contracts success");
};
