const Degree = artifacts.require("Degree");
const degNFT = artifacts.require("degNFT");

module.exports = function (deployer) {
  deployer.deploy(Degree);
  deployer.deploy(degNFT);
};