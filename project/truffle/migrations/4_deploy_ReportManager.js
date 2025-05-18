const ReportManager = artifacts.require("ReportManager");
const StringUtils = artifacts.require("StringUtils");
const UserManager = artifacts.require("UserManager");

module.exports = async function (deployer) {
    await deployer.link(StringUtils, ReportManager);
    const userManagerInstance = await UserManager.deployed();
    await deployer.deploy(ReportManager, userManagerInstance.address);
};
