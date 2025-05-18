import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

function genetateContractInstance(artifact, web3, networkID) {

  const { abi, networks } = artifact;
  let address, contract;
  try {
    address = artifact.networks[networkID].address;
    contract = new web3.eth.Contract(abi, address);
    return contract
  } catch (err) {
    console.error(err);
    return null
  }
}

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = useCallback(
    async (userManagerArtifact, reportManagerArtifact, investigationManagerArtifact) => {
      if (userManagerArtifact && reportManagerArtifact && investigationManagerArtifact) {
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");
        const accounts = [];
        accounts.push(...await web3.eth.requestAccounts());

        const networkID = await web3.eth.net.getId();
        const userManagerContract = genetateContractInstance(userManagerArtifact, web3, networkID);
        const reportManagerContract = genetateContractInstance(reportManagerArtifact, web3, networkID);
        const investigationManagerContract = genetateContractInstance(investigationManagerArtifact, web3, networkID);

        dispatch({
          type: actions.init,
          data: {
            web3, accounts, networkID,
            userManagerArtifact, userManagerContract,
            reportManagerContract, reportManagerArtifact,
            investigationManagerArtifact, investigationManagerContract
          }
        });
      }
    }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        const userManagerArtifact = require("../../contracts/UserManager.json");
        const reportManagerArtifact = require('../../contracts/ReportManager.json')
        const investigationManagerArtifact = require('../../contracts/InvestigationManager.json')
        init(userManagerArtifact, reportManagerArtifact, investigationManagerArtifact);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init(state.userManagerArtifact);
    };

    events.forEach(e => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach(e => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, state.userManagerArtifact]);

  return (
    <EthContext.Provider value={{
      state,
      dispatch
    }}>
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
