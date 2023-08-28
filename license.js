function licenseETH() {
    const    Web3  = require("web3");
    const contractAddress = "0xF7120D74F5758BaE9a0976137d544474d74Afc09";
  
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
            "inputs": [],
            "name": "deposit10",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "deposit5",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address payable",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address payable",
                    "name": "recipient",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address payable",
                    "name": "recipient",
                    "type": "address"
                }
            ],
            "name": "withdrawAll",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
  
    async function Deposit5() {
      if (window.ethereum) {
        try {
        //   let amount = 0.35
          const web3 = new Web3(window.ethereum);
          await window.ethereum.enable();
          if(networkId !=="0x1")
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: {chainId : '0x1'},
          });
          const accounts = await web3.eth.getAccounts();
          const selectedAccount = accounts[0];
          console.log(selectedAccount);
          const contract = new web3.eth.Contract(contractABI, contractAddress);
          // const gasPrice = await web3.eth.getGasPrice();
          // const nonce = await web3.eth.getTransactionCount(selectedAccount , "latest")
         await contract.methods
            .deposit5().send(
              {
                from: selectedAccount,
                value: web3.utils.toWei('5'.toString() , 'ether'),
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

    async function Deposit10() {
        if (window.ethereum) {
          try {
          //   let amount = 0.35
            const web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
            // await window.ethereum.enable();
            //   await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await web3.eth.getAccounts();
            const selectedAccount = accounts[0];
            console.log(selectedAccount);
            const contract = new web3.eth.Contract(contractABI, contractAddress);
            // const gasPrice = await web3.eth.getGasPrice();
            // const nonce = await web3.eth.getTransactionCount(selectedAccount , "latest")
           await contract.methods
              .deposit10().send(
                {
                  from: selectedAccount,
                  value: web3.utils.toWei('10'.toString() , 'ether'),
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
        <button onClick={Deposit5}>Deposit 5 ETH</button>
        <button onClick={Deposit10}>Deposit 10 ETH</button>
      </>
    );
  }
  export default licenseETH;