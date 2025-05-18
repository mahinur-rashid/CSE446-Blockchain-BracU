const UserManager = artifacts.require("UserManager");
const ReportManager = artifacts.require("ReportManager");
const InvestigationManager = artifacts.require("InvestigationManager");
const StringUtils = artifacts.require("StringUtils");

module.exports = async function (deployer) {
  await deployer.link(StringUtils, InvestigationManager);
  const userManagerInstance = await UserManager.deployed();
  const reportManagerInstance = await ReportManager.deployed();
  await deployer.deploy(InvestigationManager, userManagerInstance.address, reportManagerInstance.address);
};
