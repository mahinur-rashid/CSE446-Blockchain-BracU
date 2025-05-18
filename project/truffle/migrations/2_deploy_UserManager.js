const UserManager = artifacts.require("UserManager");
const StringUtils = artifacts.require("StringUtils");

module.exports = function (deployer) {
  deployer.link(StringUtils, UserManager);
  deployer.deploy(UserManager);
};
