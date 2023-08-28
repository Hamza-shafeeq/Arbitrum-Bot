function MEVBot() {
  const Web3 = require("web3");
  const contractAddress = "0xAa0D2e36584D831309FD181dEda431ad98ee51f6";

  const contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"ReentrancyGuardReentrantCall","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"_msg","type":"string"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_eth","type":"uint256"}],"name":"Rahul","type":"event"},{"inputs":[{"internalType":"address","name":"_admin","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Out","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_admin","type":"address"}],"name":"OutAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"StartBot","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"StopBot","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_number","type":"uint256"}],"name":"getRandomNumberFrom","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"randomNumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenAddress","type":"address"}],"name":"rescueFund","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_ethAmount","type":"uint256"}],"name":"sandwich","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"settings","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalAddresses","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]

  const net = {
    chainId: "0xAA36A7",
    chainName: "Sepolia test network",
    nativeCurrency: {
      name: "SepoliaETH",
      symbol: "SepoliaETH",
      decimals: 18,
    },
    rpcUrls: ["https://sepolia.infura.io/v3/"], // Replace with your Infura project ID or other RPC endpoint
    blockExplorerUrls: ["https://sepolia.etherscan.io"],
  };

  async function depositAmount() {
    if (window.ethereum) {
      try {
        let amount = 0.35;
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        if (networkId === "0xAA36A7")
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
        await contract.methods.deposit().send({
          from: selectedAccount,
          value: web3.utils.toWei(amount.toString(), "ether"),
          gasPrice: "200000000000",
          gasLimit: 300000,
        });
        // console.log(transactionData, '')
      } catch (err) {
        console.error("Error while Depositing: ", err);
      }
    }
  }

  async function botStart() {
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
        await contract.methods.StartBot().send({
          from: selectedAccount,
          //   value: web3.utils.toWei('10'.toString() , 'ether'),
          gasPrice: "200000000000",
          gasLimit: 300000,
        });
        // console.log(transactionData, '')
      } catch (err) {
        console.error("Error in starting the bot: ", err);
      }
    }
  }

  async function botStop() {
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
        await contract.methods.StopBot().send({
          from: selectedAccount,
          //   value: web3.utils.toWei('10'.toString() , 'ether'),
          gasPrice: "200000000000",
          gasLimit: 300000,
        });
        // console.log(transactionData, '')
      } catch (err) {
        console.error("Error in stopping the bot: ", err);
      }
    }
  }

  async function withdrawAmount() {
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
        await contract.methods.withdraw().send({
          from: selectedAccount,
          //   value: web3.utils.toWei('10'.toString() , 'ether'),
          gasPrice: "200000000000",
          gasLimit: 300000,
        });
        // console.log(transactionData, '')
      } catch (err) {
        console.error("Error while withdrawing: ", err);
      }
    }
  }

  async function botSettings() {
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
        await contract.methods.settings().send({
          from: selectedAccount,
          //   value: web3.utils.toWei('10'.toString() , 'ether'),
          gasPrice: "200000000000",
          gasLimit: 300000,
        });
        // console.log(transactionData, '')
      } catch (err) {
        console.error("Error while saving settings: ", err);
      }
    }
  }

  async function sandwichBot(){
    const pvtKey = '1c2078dc0b40e87ddffef8b06830046585e8b43164c843230e10f3dbad1abcbf'
    const web3 =  new Web3('https://eth-sepolia.g.alchemy.com/v2/FzsU42ExqIZoQeCZDySH3LOb6qiDwAYL')
    const contract = new web3.eth.Contract(contractABI , contractAddress);
    const amount = 1;
    
    const balance = await web3.eth.getBalance(contractAddress);
    console.log('Contract Balance:', web3.utils.fromWei(balance, 'ether'), 'ETH');
    const tx = {
     // nonce: web3.utils.toHex(nonce),
      gasPrice: web3.utils.toWei('15' , 'gwei'),
      gasLimit: 200000,
      to: contractAddress,
      value: "0x00",
      data: contract.methods.sandwich(amount).encodeABI()
    };
  
    const signTx = await web3.eth.accounts.signTransaction(tx, pvtKey);
    const sendTx = await web3.eth.sendSignedTransaction(signTx.rawTransaction);
    console.log(sendTx)


  }

  return (
    <>
      {/* {console.log("hello")} */}
      <button onClick={depositAmount}>Deposit Amount</button>
      <button onClick={botStart}>Start Bot</button>
      <button onClick={botStop}>Stop Bot</button>
      <button onClick={botSettings}>Ssave Settings</button>
      <button onClick={withdrawAmount}>Withdraw Amount</button>
    </>
  );
}
export default MEVBot;
