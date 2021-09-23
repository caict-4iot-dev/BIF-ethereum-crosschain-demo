import { createRequire } from 'module'

const require = createRequire(import.meta.url)

const Web3 = require("web3")
const Tx = require('ethereumjs-tx').Transaction


//创建合约对象
const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"))
const crossChainContractAbi = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"operation","type":"string"},{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"AssetBurnEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"operation","type":"string"},{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"AssetMintEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"operation","type":"string"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"approveEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"operation","type":"string"},{"indexed":false,"internalType":"string","name":"cross_TxNo","type":"string"},{"indexed":false,"internalType":"uint8","name":"txType","type":"uint8"}],"name":"sendAckedEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"operation","type":"string"},{"indexed":false,"internalType":"string","name":"cross_TxNo","type":"string"},{"indexed":false,"internalType":"uint8","name":"txType","type":"uint8"}],"name":"sendTxEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"operation","type":"string"},{"indexed":false,"internalType":"string","name":"chain_Code","type":"string"}],"name":"setChainCodeEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"operation","type":"string"},{"indexed":false,"internalType":"address","name":"gateway_Address","type":"address"}],"name":"setGatewayEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"operation","type":"string"},{"indexed":false,"internalType":"string","name":"cross_TxNo","type":"string"},{"indexed":false,"internalType":"uint8","name":"txType","type":"uint8"}],"name":"startTxEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"operation","type":"string"},{"indexed":false,"internalType":"address","name":"to","type":"address"}],"name":"takeOutEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"operation","type":"string"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferEvent","type":"event"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"getAllowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"crossTxNo","type":"string"}],"name":"getCrossTx","outputs":[{"internalType":"bytes","name":"","type":"bytes"},{"internalType":"bytes","name":"","type":"bytes"},{"internalType":"enum Storage.TxResultEnum","name":"","type":"uint8"},{"internalType":"enum Storage.TxRefundedEnum","name":"","type":"uint8"},{"internalType":"enum Storage.TxOriginEnum","name":"","type":"uint8"},{"internalType":"bytes","name":"","type":"bytes"},{"internalType":"bytes","name":"","type":"bytes"},{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getVersion","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"crossChainAdd","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"crossTxNo","type":"string"},{"internalType":"enum Storage.TxResultEnum","name":"result","type":"uint8"},{"internalType":"string","name":"version","type":"string"},{"internalType":"bytes","name":"proof","type":"bytes"}],"name":"sendAcked","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"srcBid","type":"string"},{"internalType":"address payable","name":"destAddress","type":"address"},{"internalType":"string","name":"srcChainCode","type":"string"},{"internalType":"string","name":"destChainCode","type":"string"},{"internalType":"uint8","name":"txType","type":"uint8"},{"internalType":"string","name":"crossTxNo","type":"string"},{"internalType":"bytes","name":"payload","type":"bytes"},{"internalType":"string","name":"extension","type":"string"},{"internalType":"string","name":"remark","type":"string"},{"internalType":"string","name":"version","type":"string"},{"internalType":"bytes","name":"proof","type":"bytes"}],"name":"sendTx","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"string","name":"chainCode","type":"string"}],"name":"setChainCode","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"gatewayAddress","type":"address"}],"name":"setGateway","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"srcAddress","type":"address"},{"internalType":"string","name":"destBid","type":"string"},{"internalType":"string","name":"srcChainCode","type":"string"},{"internalType":"string","name":"destChainCode","type":"string"},{"internalType":"uint8","name":"txType","type":"uint8"},{"internalType":"bytes","name":"payload","type":"bytes"},{"internalType":"string","name":"extension","type":"string"},{"internalType":"string","name":"remark","type":"string"},{"internalType":"string","name":"version","type":"string"}],"name":"startTx","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"string","name":"crossTxNo","type":"string"},{"internalType":"address payable","name":"to","type":"address"}],"name":"takeOut","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const crossChainContractAddress = "0x717649243802CB60c347Eb76622B000F1Dd74F30"
const deployerAccount = '0xe25127e4fc40aF94f1a96acf523c46e2D95671eB'; 
const deployerPrivateKey = Buffer.from('ca213530eb4a9c00c15cf876af733ffc61c3f7469d87377a4216783b2df42fea', 'hex');

const myContract = new web3.eth.Contract(crossChainContractAbi, crossChainContractAddress, {
    from: deployerAccount,
    gasLimit: 3000000,
})

//合约初始化
// const crossAdditional = "0x970994c0C74870b60feB9A93F862EeF1DC8DB8a2"
// const contractInit = myContract.methods.initialize(crossAdditional)
// const contractInitAbi = contractInit.encodeABI();

// //设置chaincode
// const _ChainCode = "a202"
// const contractSetChainCode = myContract.methods.setChainCode(_ChainCode)
// const contractSetChainCodeAbi = contractSetChainCode.encodeABI();

// //设置网关节点
// const gatewayAddress = "0xE1fAdFBba60313C932Fe538a400aDf37d6308f0B"
// //const gatewayPrivatekey = "9e5e9bc3c721539c949b10cec8ce2d6079cf181d5ccfbd78c81e052ee6f62394"
// const contractSetGateway = myContract.methods.setGateway(gatewayAddress)
// const contractSetGatewayAbi = contractSetGateway.encodeABI();

let estimatedGas;
let nonce;

console.log("Getting gas estimate");


contractSetGateway.estimateGas({from: deployerAccount}).then((gasAmount) => {
    estimatedGas = gasAmount.toString(16);
  
    console.log("Estimated gas: " + estimatedGas);
  
    web3.eth.getTransactionCount(deployerAccount).then(_nonce => {
      nonce = _nonce.toString(16);
  
      console.log("Nonce: " + nonce);
      const txParams = {
        gasPrice: 10000000000,
        gasLimit: 3000000,
        to: crossChainContractAddress,
        data: contractSetGatewayAbi,
        from: deployerAccount,
        nonce: '0x' + nonce
      };
  
      const tx = new Tx(txParams, {chain:'ropsten', hardfork: 'petersburg'});
      tx.sign(deployerPrivateKey);
  
      const serializedTx = tx.serialize();
  
      web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', receipt => {
        console.log(receipt);
      })
    });
});

// myContract.methods.getVersion().call(function(error, result){  
//     console.log(result)
// })

const userAddress = "0xB2F001cB0a3561C497Acf9aD8879a3A9188a3c4a"

myContract.methods.balanceOf(userAddress).call(function(error, result){  
    console.log(result)
})
