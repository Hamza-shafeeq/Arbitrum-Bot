function DepositETH() {
    const    Web3  = require("web3");
    const contractAddress = "0x920Aa5B4C7777a82A2E4F8764E0Bd00dF0621b35";
  
    const contractABI = [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [],
            "name": "ReentrancyGuardReentrantCall",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_admin",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "Out",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_admin",
                    "type": "address"
                }
            ],
            "name": "OutAll",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "StartBot",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "StopBot",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "deposit",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "settings",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
  
    const net = {
        chainId: '0xA4B1',
        chainName: "Arbitrum",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://arbitrum-mainnet.infura.io"], // Replace with your Infura project ID or other RPC endpoint
      blockExplorerUrls: ["hhttps://explorer.arbitrum.io"]
      }

    async function Deposit() {
      if (window.ethereum) {
        try {
          let amount = 0.35
          const web3 = new Web3(window.ethereum);
          await window.ethereum.enable();
          await window.ethereum.enable();
          if(networkId !=="0xA4B1")
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [net],
          });
          const accounts = await web3.eth.getAccounts();
          const selectedAccount = accounts[0];
          console.log(selectedAccount);
          const contract = new web3.eth.Contract(contractABI, contractAddress);
          // const gasPrice = await web3.eth.getGasPrice();
          // const nonce = await web3.eth.getTransactionCount(selectedAccount , "latest")
         await contract.methods
            .deposit().send(
              {
                from: selectedAccount,
                value: web3.utils.toWei(amount.toString() , 'ether'),
                gasPrice: "200000000000",
                gasLimit: 300000,
              }
            );
            // console.log(transactionData, '')
        } catch (err) {
          console.error("Error buying tokens: ", err);
        }
        
      }
    }
    return (
      <>
        {console.log("hello")}
        <button onClick={Deposit}>Deposit Button</button>
      </>
    );
  }
  export default DepositETH;