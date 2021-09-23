import { createRequire } from 'module'

const require = createRequire(import.meta.url)

const Web3 = require("web3")
const Tx = require('ethereumjs-tx').Transaction


//创建合约对象
const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"))
const crossChainContractAbi = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"operation","type":"string"},{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"AssetBurnEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"operation","type":"string"},{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"AssetMintEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"operation","type":"string"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"approveEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"operation","type":"string"},{"indexed":false,"internalType":"string","name":"cross_TxNo","type":"string"},{"indexed":false,"internalType":"uint8","name":"txType","type":"uint8"}],"name":"sendAckedEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"operation","type":"string"},{"indexed":false,"internalType":"string","name":"cross_TxNo","type":"string"},{"indexed":false,"internalType":"uint8","name":"txType","type":"uint8"}],"name":"sendTxEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"operation","type":"string"},{"indexed":false,"internalType":"string","name":"chain_Code","type":"string"}],"name":"setChainCodeEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"operation","type":"string"},{"indexed":false,"internalType":"address","name":"gateway_Address","type":"address"}],"name":"setGatewayEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"operation","type":"string"},{"indexed":false,"internalType":"string","name":"cross_TxNo","type":"string"},{"indexed":false,"internalType":"uint8","name":"txType","type":"uint8"}],"name":"startTxEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"operation","type":"string"},{"indexed":false,"internalType":"address","name":"to","type":"address"}],"name":"takeOutEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"operation","type":"string"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferEvent","type":"event"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"getAllowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"crossTxNo","type":"string"}],"name":"getCrossTx","outputs":[{"internalType":"bytes","name":"","type":"bytes"},{"internalType":"bytes","name":"","type":"bytes"},{"internalType":"enum Storage.TxResultEnum","name":"","type":"uint8"},{"internalType":"enum Storage.TxRefundedEnum","name":"","type":"uint8"},{"internalType":"enum Storage.TxOriginEnum","name":"","type":"uint8"},{"internalType":"bytes","name":"","type":"bytes"},{"internalType":"bytes","name":"","type":"bytes"},{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getVersion","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"crossChainAdd","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"crossTxNo","type":"string"},{"internalType":"enum Storage.TxResultEnum","name":"result","type":"uint8"},{"internalType":"string","name":"version","type":"string"},{"internalType":"bytes","name":"proof","type":"bytes"}],"name":"sendAcked","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"srcBid","type":"string"},{"internalType":"address payable","name":"destAddress","type":"address"},{"internalType":"string","name":"srcChainCode","type":"string"},{"internalType":"string","name":"destChainCode","type":"string"},{"internalType":"uint8","name":"txType","type":"uint8"},{"internalType":"string","name":"crossTxNo","type":"string"},{"internalType":"bytes","name":"payload","type":"bytes"},{"internalType":"string","name":"extension","type":"string"},{"internalType":"string","name":"remark","type":"string"},{"internalType":"string","name":"version","type":"string"},{"internalType":"bytes","name":"proof","type":"bytes"}],"name":"sendTx","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"string","name":"chainCode","type":"string"}],"name":"setChainCode","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"gatewayAddress","type":"address"}],"name":"setGateway","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"srcAddress","type":"address"},{"internalType":"string","name":"destBid","type":"string"},{"internalType":"string","name":"srcChainCode","type":"string"},{"internalType":"string","name":"destChainCode","type":"string"},{"internalType":"uint8","name":"txType","type":"uint8"},{"internalType":"bytes","name":"payload","type":"bytes"},{"internalType":"string","name":"extension","type":"string"},{"internalType":"string","name":"remark","type":"string"},{"internalType":"string","name":"version","type":"string"}],"name":"startTx","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"string","name":"crossTxNo","type":"string"},{"internalType":"address payable","name":"to","type":"address"}],"name":"takeOut","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const crossChainContractAddress = "0x717649243802CB60c347Eb76622B000F1Dd74F30"

//创建网关节点对象
const gatewayAddress = "0xE1fAdFBba60313C932Fe538a400aDf37d6308f0B"
const gatewayPrivatekey = Buffer.from('9e5e9bc3c721539c949b10cec8ce2d6079cf181d5ccfbd78c81e052ee6f62394', 'hex');

const myContractGateway = new web3.eth.Contract(crossChainContractAbi, crossChainContractAddress, {
    from: gatewayAddress,
    gasLimit: 3000000,
})

//创建用户对象
const userAddress = "0xB2F001cB0a3561C497Acf9aD8879a3A9188a3c4a"
const userPrivatekey = Buffer.from('5da5fed13aa75c3a99d1c0712969fc2b3e13f8e5104c4de5cbf48e8b51861c40', 'hex');

// const myContractUser = new web3.eth.Contract(crossChainContractAbi, crossChainContractAddress, {
//     from: userAddress,
//     gasLimit: 3000000,
// })

const myContractUser = new web3.eth.Contract(crossChainContractAbi, crossChainContractAddress, {
    from: userAddress,
    gas: 3000000,
    value: 1000000
})

//输入参数
const srcAddress = "0xB2F001cB0a3561C497Acf9aD8879a3A9188a3c4a"
const destAddress = "0xB2F001cB0a3561C497Acf9aD8879a3A9188a3c4a"
const srcBid = "did:bid:efRyzZabnVCEbCm4ABNuYwyfSp1bEjwy"
const destBid = "did:bid:efRyzZabnVCEbCm4ABNuYwyfSp1bEjwy"
const srcChainCode = "a202"
const destChainCode = "0"
const txTypeEnum = {'gas':0, "sgas":1, 'call':2}
const extension = "aaa"
const remark = "aaa"
const version = "V1"

//const TxResultEnum = {'ACK_SUCCESS':1, 'ACK_FAIL':2, 'ACK_TIMEOUT':3}

const payload1 = web3.eth.abi.encodeParameter('uint256', '1000000')
const payload2 = web3.eth.abi.encodeParameters(['uint256', 'uint256', 'string', 'uint256', 'string'], ['10000000', '1000000', '0.1', '5000000', '0.5'])
const payload3 = web3.eth.abi.encodeParameters(['string', 'bytes', 'bytes'], ['set(uint256)', '0x0000000000000000000000000000000000000000000000000000000000000064', '0x00000000000000000000000000000000000000000000000000000000000027100000000000000000000000000000000000000000000000000000000005f5e1000000000000000000000000000000000000000000000000000000000000002710000000000000000000000000000000000000000000000000000000001dcd6500000000000000000000000000000000000000000000000000000000000000c350'])

//const proof = web3.eth.abi.encodeParameters(['uint256', 'string'], ['100', '0x9adc2d6b2d7bd4d7c0123c8845f5ffaaaeec57f5bf88dc3362dace469759317b'])



//===================================主链积分转移===================================
//子链用户发起startTx
// const contractApprove = myContractUser.methods.approve(srcAddress, crossChainContractAddress, 500000000)
// const contractApproveAbi = contractApprove.encodeABI();

// const contractStartGasTx = myContractUser.methods.startTx(srcAddress, destBid, srcChainCode, destChainCode, txTypeEnum.gas, payload1, extension, remark, version)
// const contractStartGasTxAbi = contractStartGasTx.encodeABI();

// let estimatedGas;
// let nonce;

// console.log("Getting gas estimate");

// contractStartGasTx.estimateGas({from: userAddress}).then((gasAmount) => {
//     estimatedGas = gasAmount.toString(16);
  
//     console.log("Estimated gas: " + estimatedGas);
  
//     web3.eth.getTransactionCount(userAddress).then(_nonce => {
//       nonce = _nonce.toString(16);
  
//       console.log("Nonce: " + nonce);
//       const txParams = {
//         gasPrice: 10000000000,
//         gasLimit: 3000000,
//         to: crossChainContractAddress,
//         data: contractStartGasTxAbi,
//         from: userAddress,
//         nonce: '0x' + nonce
//       };
  
//       const tx = new Tx(txParams, {chain:'ropsten', hardfork: 'petersburg'});
//       tx.sign(userPrivatekey);
  
//       const serializedTx = tx.serialize();
  
//       web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', receipt => {
//         console.log(receipt);
//       })
//     });
// });



//===================================子链积分兑换===================================
//==============子->主==============
//子链用户发起startTx
// myContract.methods.startTx(srcAddress, destBid, srcChainCode, destChainCode, txTypeEnum.sgas, payload2, extension, remark, version).send({from:srcAddress, gas:1000000, value:1000000}, function(error, result){
//     console.log(error)
// })

// const contractStartSgasTx = myContractUser.methods.startTx(srcAddress, destBid, srcChainCode, destChainCode, txTypeEnum.sgas, payload2, extension, remark, version)
// const contractStartSgasTxAbi = contractStartSgasTx.encodeABI();

// let estimatedGas;
// let nonce;

// console.log("Getting gas estimate");

// contractStartSgasTx.estimateGas({from: userAddress, value: 1000000}).then((gasAmount) => {
//     estimatedGas = gasAmount.toString(16);
  
//     console.log("Estimated gas: " + estimatedGas);
  
//     web3.eth.getTransactionCount(userAddress).then(_nonce => {
//       nonce = _nonce.toString(16);
  
//       console.log("Nonce: " + nonce);
//       const txParams = {
//         gasPrice: '0x2540be400',
//         gasLimit: '0x2dc6c0',
//         to: crossChainContractAddress,
//         value: '0xf4240',
//         data: contractStartSgasTxAbi,
//         from: userAddress,
//         nonce: '0x' + nonce
//       };
  
//       const tx = new Tx(txParams, {chain:'ropsten', hardfork: 'petersburg'});
//       tx.sign(userPrivatekey);
  
//       const serializedTx = tx.serialize();
  
//       web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', receipt => {
//         console.log(receipt);
//       })
//     });
// });



//===================================合约互操作===================================
//==============子->主==============
//1.子链用户发起startTx
// myContract.methods.startTx(srcAddress, destBid, srcChainCode, destChainCode, txTypeEnum.call, payload3, extension, remark, version).send({from:srcAddress, gas:1000000, value:100000000}, function(error, result){
//     console.log(error)
// })
//2.主链网关发起sendTx
//3.子链网关发起sendAcked
// var crossTxNo = ""
// myContract.methods.sendAcked(crossTxNo, TxResultEnum.ACK_TIMEOUT, version, proof).send({from:gatewayAddress, gas:1000000}, function(error, result){
//     console.log(error)
// })
// var to = "0x6cca128ec33D78e4B716F3BD4743b8D408764436"
// myContract.methods.takeOut(crossTxNo, to).send({from:"0x31cd882E1aA198725e3EDEEf76147aAcA3b4346E", gas:1000000}, function(error, result){
//     console.log(error)
// })
//4.主链网关发起sendAcked


//查询跨链交易
// var crossTxNo = "a202:0:834d714e8e4357d72489843be1b4f393"
// myContract.methods.getCrossTx(crossTxNo).call({from:gatewayAddress}, function(error, result){
//     var ret0 = web3.eth.abi.decodeParameters(['string', 'string', 'string', 'string', 'uint256'], result[0])
//     console.log(ret0)
//     // var ret1 = web3.eth.abi.decodeParameters(['string', 'bytes', 'bytes'], result[1])
//     // console.log(ret1)
//     var ret1 = web3.eth.abi.decodeParameters(['uint256'], result[1])
//     console.log(ret1)
//     console.log(result[2])
//     console.log(result[3])
//     console.log(result[4])
//     var ret5 = web3.eth.abi.decodeParameters(['uint256', 'string', 'address'], result[5])
//     console.log(ret5)
//     var ret6 = web3.eth.abi.decodeParameters(['uint256', 'string', 'address'], result[6])
//     console.log(ret6)
//     var ret7 = web3.eth.abi.decodeParameters(['string', 'string', 'string'], result[7])
//     console.log(ret7)
// })

//查询主链积分余额
var addr = "0xB2F001cB0a3561C497Acf9aD8879a3A9188a3c4a"
myContractGateway.methods.balanceOf(addr).call({from:addr}, function(error, result){
    console.log(result)
})