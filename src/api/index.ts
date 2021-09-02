type HttpProviderURL = {
    local?: string;
    rinkeby: string;
};
type ABI = {
    constant: boolean;
    inputs: {
        name: string;
        type: string;
    }[];
    name: string;
    outputs: {
        name: string;
        type: string;
    }[];
    type: string;
}



const httpProviderURL: HttpProviderURL = {
    rinkeby: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
}

const minABI: Array<ABI> = [
    // balanceOf
    {
      constant: true,
      inputs: [{ name: "_owner", type: "address" }],
      name: "balanceOf",
      outputs: [{ name: "balance", type: "uint256" }],
      type: "function",
    },
  ];

  const tokenAddress: string = '0xa0dff2d4462ec3b60a7ab6dfd5071a98751151d9';


export {
    httpProviderURL,
    tokenAddress,
    minABI
}