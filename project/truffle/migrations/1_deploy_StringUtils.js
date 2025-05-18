const StringUtils = artifacts.require("StringUtils");

module.exports = function (deployer) {
  deployer.deploy(StringUtils);
};
