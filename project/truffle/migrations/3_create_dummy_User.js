const MyContract = artifacts.require("UserManager");

module.exports = async function (deployer, _network, accounts) {
  const customAddress = accounts[9];

  await deployer.deploy(MyContract);
  const myContractInstance = await MyContract.deployed();

  await myContractInstance.registerUser('erza', 2113, { from: accounts[9] });

  await myContractInstance.registerUser('rijon', 6060, { from: accounts[8] });
  await myContractInstance.makeInvestigator(accounts[8], { from: accounts[0] });

  // Example of sending Ether (if applicable)
  // await web3.eth.sendTransaction({
  //   from: customAddress,
  //   to: myContractInstance.address,
  //   value: web3.utils.toWei("1", "ether")
  // });
};
