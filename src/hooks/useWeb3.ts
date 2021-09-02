import { useEffect, useState } from "react";
import Web3 from "web3";

import Providers from 'web3-core/types'

import {
    httpProviderURL
} from '../api'

const useWeb3 = (): null | Web3 => {
  const [web3, setWeb3] = useState<Web3 | null>(null);

  useEffect(() => {
    async function getProvider() {
      const providers = (providerURL: string): Providers.HttpProvider => 
        new Web3.providers.HttpProvider(providerURL)
      setWeb3(new Web3(providers(httpProviderURL.rinkeby)));
    }
    getProvider();
  }, []);
  return web3;
};

export default useWeb3;