var MyContract = artifacts.require("degree.sol");

module.exports = function(deployer) {
  deployer.deploy(MyContract);
};