import { useEffect, useState } from "react";
import Web3 from "web3";
import Web3EthContract from "web3-eth-contract";
import Contract from "web3-eth-contract/types";
import { minABI, tokenAddress } from "../api";

const useWeb3Contract = (web3: Web3) => {
  const [web3Contract, setWeb3Contract] = useState<typeof Contract | null>(
    null
  );

  useEffect(() => {
    async function getContract() {
      //@ts-ignore
      Web3EthContract.setProvider(web3?.currentProvider);
      //@ts-ignore
      setWeb3Contract(new Web3EthContract(minABI, tokenAddress));
    }

    getContract();
  }, [web3]);
  return web3Contract;
};

export default useWeb3Contract;
