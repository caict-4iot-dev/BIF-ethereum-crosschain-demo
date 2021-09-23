import { createRequire } from 'module'

const require = createRequire(import.meta.url)

const schedule =require("node-schedule")
const Web3 = require("web3")
const Tx = require('ethereumjs-tx').Transaction

//连接以太坊链
const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"))
const crossChainContractAbi = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"operation","type":"string"},{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"AssetBurnEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"operation","type":"string"},{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"AssetMintEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"operation","type":"string"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"approveEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"operation","type":"string"},{"indexed":false,"internalType":"string","name":"cross_TxNo","type":"string"},{"indexed":false,"internalType":"uint8","name":"txType","type":"uint8"}],"name":"sendAckedEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"operation","type":"string"},{"indexed":false,"internalType":"string","name":"cross_TxNo","type":"string"},{"indexed":false,"internalType":"uint8","name":"txType","type":"uint8"}],"name":"sendTxEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"operation","type":"string"},{"indexed":false,"internalType":"string","name":"chain_Code","type":"string"}],"name":"setChainCodeEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"operation","type":"string"},{"indexed":false,"internalType":"address","name":"gateway_Address","type":"address"}],"name":"setGatewayEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"operation","type":"string"},{"indexed":false,"internalType":"string","name":"cross_TxNo","type":"string"},{"indexed":false,"internalType":"uint8","name":"txType","type":"uint8"}],"name":"startTxEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"operation","type":"string"},{"indexed":false,"internalType":"address","name":"to","type":"address"}],"name":"takeOutEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"operation","type":"string"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferEvent","type":"event"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"getAllowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"crossTxNo","type":"string"}],"name":"getCrossTx","outputs":[{"internalType":"bytes","name":"","type":"bytes"},{"internalType":"bytes","name":"","type":"bytes"},{"internalType":"enum Storage.TxResultEnum","name":"","type":"uint8"},{"internalType":"enum Storage.TxRefundedEnum","name":"","type":"uint8"},{"internalType":"enum Storage.TxOriginEnum","name":"","type":"uint8"},{"internalType":"bytes","name":"","type":"bytes"},{"internalType":"bytes","name":"","type":"bytes"},{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getVersion","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"crossChainAdd","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"crossTxNo","type":"string"},{"internalType":"enum Storage.TxResultEnum","name":"result","type":"uint8"},{"internalType":"string","name":"version","type":"string"},{"internalType":"bytes","name":"proof","type":"bytes"}],"name":"sendAcked","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"srcBid","type":"string"},{"internalType":"address payable","name":"destAddress","type":"address"},{"internalType":"string","name":"srcChainCode","type":"string"},{"internalType":"string","name":"destChainCode","type":"string"},{"internalType":"uint8","name":"txType","type":"uint8"},{"internalType":"string","name":"crossTxNo","type":"string"},{"internalType":"bytes","name":"payload","type":"bytes"},{"internalType":"string","name":"extension","type":"string"},{"internalType":"string","name":"remark","type":"string"},{"internalType":"string","name":"version","type":"string"},{"internalType":"bytes","name":"proof","type":"bytes"}],"name":"sendTx","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"string","name":"chainCode","type":"string"}],"name":"setChainCode","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"gatewayAddress","type":"address"}],"name":"setGateway","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"srcAddress","type":"address"},{"internalType":"string","name":"destBid","type":"string"},{"internalType":"string","name":"srcChainCode","type":"string"},{"internalType":"string","name":"destChainCode","type":"string"},{"internalType":"uint8","name":"txType","type":"uint8"},{"internalType":"bytes","name":"payload","type":"bytes"},{"internalType":"string","name":"extension","type":"string"},{"internalType":"string","name":"remark","type":"string"},{"internalType":"string","name":"version","type":"string"}],"name":"startTx","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"string","name":"crossTxNo","type":"string"},{"internalType":"address payable","name":"to","type":"address"}],"name":"takeOut","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const crossChainContractAddress = "0x717649243802CB60c347Eb76622B000F1Dd74F30"

const gatewayAddress = "0xE1fAdFBba60313C932Fe538a400aDf37d6308f0B"
const gatewayPrivatekey = Buffer.from('9e5e9bc3c721539c949b10cec8ce2d6079cf181d5ccfbd78c81e052ee6f62394', 'hex');

const myContractGateway = new web3.eth.Contract(crossChainContractAbi, crossChainContractAddress, {
    from: gatewayAddress,
    gasLimit: 3000000,
})

//连接星火主链
const request = require('request');
const listURL = "http://172.19.6.21:84/crosschain/query/tx/list";
const detailURL = "http://172.19.6.21:84/crosschain/query/tx/detail"
const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcGlLZXkiOiJkaWQ6YmlkOmVmUW9DeEVlcWNObkVTa05uMlZKcENqWWZwWDE5cWVjIiwiaXNzIjoiQklGLUNIQUlOIiwiZXhwIjoxNjMyMzA2NjQyLCJiaWQiOiJkaWQ6YmlkOmVmajdqcjU1VDRSd2ZwRUo5TDFaUXh2d0w0TmdZaFV5In0.sjzsGbaMBnmrrnHrvJR_NcbupX3cbcokVa60An_KOv4"
var queryListParams = {"accessToken":"","params":{"chainCode":"0","srcChainCode":"","destChainCode":"","srcAddress":"","destAddress":"","payloadType":"","result":"","refunded":"","useAsc":true,"pageStart":"","pageSize":1}};
var queryTxDetailParams = {"accessToken":"","params":{"crossTxNo":"","chainCode":"0"}}

queryListParams.accessToken = accessToken
queryTxDetailParams.accessToken = accessToken

//开始读取的page
var pageStart = 34
//总跨链交易数
var txTotal = 34

//每10秒查询一次跨链事件
var rule = new schedule.RecurrenceRule();
　　var times = []
　　for(var i=1; i<60; ){
       i += 59
　　　　times.push(i)
　　}
　　rule.second = times

schedule.scheduleJob(rule,async() => {
    console.log("schedule", "pageStart:", pageStart);
    await getEvents(listURL, queryListParams, pageStart);
})

//获取主链跨链合约事件
let getEvents = async (_listURL, _queryListParams, _pageStart) =>{
    _queryListParams.params.pageStart = _pageStart
    request({
        url: _listURL,
        method: "POST",
        json: true,
        headers: "",
        body: _queryListParams
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            
            console.log(body)

            //记录总的跨链交易数量
            txTotal = body.data.page.pageTotal
            if (_pageStart <= txTotal) {
                queryTxDetailParams.params.crossTxNo = body.data.list[0].crossTxNo
                gateWayDeal(detailURL, queryTxDetailParams);
                pageStart += 1;
            }  
        }
    })
}

function gateWayDeal(_detailURL, _queryTxDetailParams) {
    request({
        url: _detailURL,
        method: "POST",
        json: true,
        headers: "",
        body: _queryTxDetailParams
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {

            //console.log(body)

            var _txState = body.data.result
            var _txType = body.data.flowList[0].type

            if (_txState == 0 && _txType == 0) {
                //该交易为主链用户发起的跨链交易startTx，子链网关节点需要发送sendTx
                var params = {"SrcBid":body.data.srcAddress, "DestAddress":body.data.destAddress, "SrcChainCode":body.data.srcChainCode, "DestChainCode":body.data.destChainCode, "TxType":body.data.payloadType, "CrossTxNo":body.data.crossTxNo, "Payload":"", "Extension":body.data.flowList[0].extension, "Remark":body.data.remark, "Version": "V1", "Proof":""}
                if (body.data.payloadType == 0) {

                    //主链积分转移
                    var amount = body.data.payloadGas.amount
                    var payload0 = web3.eth.abi.encodeParameter('uint256', amount)
                    params.Payload = payload0

                    console.log("user startTx maingas")
                } 
                else if (body.data.payloadType == 1)
                {

                    var masterAmount = body.data.payloadSgas.masterAmount

                    var srcAmount = body.data.payloadSgas.srcAmount
                    var srcRate = body.data.payloadSgas.srcTokenRate
                    var destAmount = body.data.payloadSgas.destAmount
                    var destRate = body.data.payloadSgas.destTokenRate

                    if (masterAmount != srcAmount/Number(srcRate) || masterAmount != destAmount/Number(destRate)) {
                   
                        console.log("Exchange rate error")
                        return 
                    }

                    var payload1 = web3.eth.abi.encodeParameters(['uint256', 'uint256', 'string', 'uint256', 'string'], [masterAmount, srcAmount, srcRate, destAmount, destRate])
                    params.Payload = payload1

                    console.log("user startTx subSgas")
                } 
                else if (body.data.payloadType == 2)
                {
                    var method  = body.data.payloadContractCall.contractMethod
                    var para = body.data.payloadContractCall.contractInput
                    //???参数该如何解决
                    //var payload2 = web3.eth.abi.encodeParameters(['string', 'bytes', 'bytes'], [method, inputParams, tokenParams])
                }
                
                //获取区块号和交易hash
                var ledgerSeq = body.data.flowList[0].lastUpdateSeqNum
                var txHash = body.data.flowList[0].txHash
                var proof = web3.eth.abi.encodeParameters(['uint256', 'string'], [ledgerSeq, txHash])
                params.Proof = proof

                sendTx(params);
            }
            else if (_txState == 0 && _txType == 1) 
            {
                //子链网关节点发送sendAcked
                var params = {"CrossTxNo":body.data.crossTxNo, "Result": 1, "Version": "V1", "Proof":""}
                var ledgerSeq = body.data.flowList[0].lastUpdateSeqNum
                var txHash = body.data.flowList[0].txHash
                var proof = web3.eth.abi.encodeParameters(['uint256', 'string'], [ledgerSeq, txHash])
                params.Proof = proof

                console.log("Gateway sendAcked to source chain")
                sendAcked(params)
            }
            else if (_txState != 0 && body.data.srcChainCode == 0)
            {
                //子链网关节点发送sendAcked
                var params = {"CrossTxNo":body.data.crossTxNo, "Result": 1, "Version": "V1", "Proof":""}
                var ledgerSeq = body.data.flowList[1].lastUpdateSeqNum
                var txHash = body.data.flowList[1].txHash
                var proof = web3.eth.abi.encodeParameters(['uint256', 'string'], [ledgerSeq, txHash])
                params.Proof = proof

                console.log("Gateway sendAcked to dest chain")
                sendAcked(params)
            }
            else
            {
                console.log("Tx has been solved")
            }
        }
    })
}

function sendTx(_params) {

    console.log("gateway sendTx")

    const contractSendTx = myContractGateway.methods.sendTx(_params.SrcBid, _params.DestAddress, _params.SrcChainCode, _params.DestChainCode, _params.TxType, _params.CrossTxNo, _params.Payload, _params.Extension, _params.Remark, _params.Version, _params.Proof)
    const contractSendTxAbi = contractSendTx.encodeABI();

    let estimatedGas;
    let nonce;
    
    console.log("Getting gas estimate");
    
    contractSendTx.estimateGas({from: gatewayAddress, value: 82920000}).then((gasAmount) => {
        estimatedGas = gasAmount.toString(16);
      
        console.log("Estimated gas: " + estimatedGas);
      
        web3.eth.getTransactionCount(gatewayAddress).then(_nonce => {
          nonce = _nonce.toString(16);
      
          console.log("Nonce: " + nonce);
          const txParams = {
            gasPrice: 10000000000,
            gasLimit: 3000000,
            to: crossChainContractAddress,
            data: contractSendTxAbi,
            from: gatewayAddress,
            value: "0x4f14240",
            nonce: '0x' + nonce
          };
      
          const tx = new Tx(txParams, {chain:'ropsten', hardfork: 'petersburg'});
          tx.sign(gatewayPrivatekey);
      
          const serializedTx = tx.serialize();
      
          web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', receipt => {
            console.log(receipt);
          })
        });
    });
}

function sendAcked(_params) {

    console.log("gateway sendAcked")

    const contractSendAcked = myContractGateway.methods.sendAcked(_params.CrossTxNo, _params.Result, _params.Version, _params.Proof)
    const contractSendAckedAbi = contractSendAcked.encodeABI();

    let estimatedGas;
    let nonce;
    
    console.log("Getting gas estimate");
    
    contractSendAcked.estimateGas({from: gatewayAddress}).then((gasAmount) => {
        estimatedGas = gasAmount.toString(16);
      
        console.log("Estimated gas: " + estimatedGas);
      
        web3.eth.getTransactionCount(gatewayAddress).then(_nonce => {
          nonce = _nonce.toString(16);
      
          console.log("Nonce: " + nonce);
          const txParams = {
            gasPrice: 10000000000,
            gasLimit: 3000000,
            to: crossChainContractAddress,
            data: contractSendAckedAbi,
            from: gatewayAddress,
            nonce: '0x' + nonce
          };
      
          const tx = new Tx(txParams, {chain:'ropsten', hardfork: 'petersburg'});
          tx.sign(gatewayPrivatekey);
      
          const serializedTx = tx.serialize();
      
          web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', receipt => {
            console.log(receipt);
          })
        });
    });
}
