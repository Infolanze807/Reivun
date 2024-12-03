import Web3 from 'web3';

const GNOSIS_RPC_URL = 'https://rpc.gnosischain.com/';

// const SEI_RPC_URL = 'https://evm-rpc-arctic-1.sei-apis.com'

//for gno amin network
export const getWeb3 = () => {
  return new Web3(new Web3.providers.HttpProvider(GNOSIS_RPC_URL));  
};

// for seidevnet network
// export const getWeb3 = () => {
//   return new Web3(new Web3.providers.HttpProvider(SEI_RPC_URL));  
// };
