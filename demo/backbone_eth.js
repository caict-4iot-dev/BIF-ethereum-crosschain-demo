import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const schedule =require("node-schedule")
const Web3 = require("web3")
const request = require('request')
const BifChainSDK = require("./lib/bifchain-js-signer/lib");

//连接以太坊链
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"))
const crossConAbi = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"operation","type":"string"},{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"AssetBurnEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"operation","type":"string"},{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"AssetMintEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"operation","type":"string"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"approveEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"operation","type":"string"},{"indexed":false,"internalType":"string","name":"cross_TxNo","type":"string"},{"indexed":false,"internalType":"uint8","name":"txType","type":"uint8"}],"name":"sendAckedEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"operation","type":"string"},{"indexed":false,"internalType":"string","name":"cross_TxNo","type":"string"},{"indexed":false,"internalType":"uint8","name":"txType","type":"uint8"}],"name":"sendTxEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"operation","type":"string"},{"indexed":false,"internalType":"string","name":"chain_Code","type":"string"}],"name":"setChainCodeEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"operation","type":"string"},{"indexed":false,"internalType":"address","name":"gateway_Address","type":"address"}],"name":"setGatewayEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"operation","type":"string"},{"indexed":false,"internalType":"string","name":"cross_TxNo","type":"string"},{"indexed":false,"internalType":"uint8","name":"txType","type":"uint8"}],"name":"startTxEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"operation","type":"string"},{"indexed":false,"internalType":"address","name":"to","type":"address"}],"name":"takeOutEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"operation","type":"string"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferEvent","type":"event"},{"inputs":[{"internalType":"address","name":"crossChainAdd","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"chainCode","type":"string"}],"name":"setChainCode","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"gatewayAddress","type":"address"}],"name":"setGateway","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"getAllowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"srcAddress","type":"address"},{"internalType":"string","name":"destBid","type":"string"},{"internalType":"string","name":"srcChainCode","type":"string"},{"internalType":"string","name":"destChainCode","type":"string"},{"internalType":"uint8","name":"txType","type":"uint8"},{"internalType":"bytes","name":"payload","type":"bytes"},{"internalType":"string","name":"extension","type":"string"},{"internalType":"string","name":"remark","type":"string"},{"internalType":"string","name":"version","type":"string"}],"name":"startTx","outputs":[],"stateMutability":"payable","type":"function","payable":true},{"inputs":[{"internalType":"string","name":"srcBid","type":"string"},{"internalType":"address payable","name":"destAddress","type":"address"},{"internalType":"string","name":"srcChainCode","type":"string"},{"internalType":"string","name":"destChainCode","type":"string"},{"internalType":"uint8","name":"txType","type":"uint8"},{"internalType":"string","name":"crossTxNo","type":"string"},{"internalType":"bytes","name":"payload","type":"bytes"},{"internalType":"string","name":"extension","type":"string"},{"internalType":"string","name":"remark","type":"string"},{"internalType":"string","name":"version","type":"string"},{"internalType":"bytes","name":"proof","type":"bytes"}],"name":"sendTx","outputs":[],"stateMutability":"payable","type":"function","payable":true},{"inputs":[{"internalType":"string","name":"crossTxNo","type":"string"},{"internalType":"enum Storage.TxResultEnum","name":"result","type":"uint8"},{"internalType":"string","name":"version","type":"string"},{"internalType":"bytes","name":"proof","type":"bytes"}],"name":"sendAcked","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"crossTxNo","type":"string"},{"internalType":"address payable","name":"to","type":"address"}],"name":"takeOut","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"crossTxNo","type":"string"}],"name":"getCrossTx","outputs":[{"internalType":"bytes","name":"","type":"bytes"},{"internalType":"bytes","name":"","type":"bytes"},{"internalType":"enum Storage.TxResultEnum","name":"","type":"uint8"},{"internalType":"enum Storage.TxRefundedEnum","name":"","type":"uint8"},{"internalType":"enum Storage.TxOriginEnum","name":"","type":"uint8"},{"internalType":"bytes","name":"","type":"bytes"},{"internalType":"bytes","name":"","type":"bytes"},{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"getVersion","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function","constant":true}]
const crossConAddress = "0x1d861cB1329FA431Ce3B495818adF08666318869"
const myContract = new web3.eth.Contract(crossConAbi, crossConAddress)
const gatewayAddress = "0x17de836ca04153601b97c36ae247456058dae92f"

//连接星火主链的URL
const gasBlobURL = "http://172.19.6.21:84/crosschain/backbone/send/tx/maingas/blob"
const gasSubmitURL = "http://172.19.6.21:84/crosschain/backbone/send/tx/maingas/submit"
const sgasBlobURL = "http://172.19.6.21:84/crosschain/backbone/send/tx/subgas/blob"
const sgasSubmitURL = "http://172.19.6.21:84/crosschain/backbone/send/tx/subgas/submit"
const callBlobURL = "http://172.19.6.21:84/crosschain/backbone/send/tx/contractcall/blob"
const callSubmitURL = "http://172.19.6.21:84/crosschain/backbone/send/tx/contractcall/submit"

const ackedBlobURL = "http://172.19.6.21:84/crosschain/backbone/acked/tx/blob"
const ackedSubmitURL = "http://172.19.6.21:84/crosschain/backbone/acked/tx/submit"

//连接星火主链的params
var gasBlobParams = {"accessToken":"","params":{"gatewayAddress":"did:bid:ef3edP9uBW7TKR86T1ib2hMke7UPucqh","crossTxNo":"","srcAddress":"","destAddress":"","srcChainCode":"a202","destChainCode":"","payload":{"amount":""},"remark":"","extension":"","version":"1000","proof":{"ledgerSeq":"","txHash":""}}}
var gasSubmitParams = {"accessToken":"","params":{"blobId":"","signerList":[{"signBlob":"","publicKey":"b065664cf55cd5b7d6869d73a6ad737cf2d3b0266d5b468c38a1bf2c544aca7dbab3b8"}]}}
var sgasBlobParams = {"accessToken":"","params":{"gatewayAddress":"did:bid:ef3edP9uBW7TKR86T1ib2hMke7UPucqh","crossTxNo":"","srcAddress":"","destAddress":"","srcChainCode":"a202","destChainCode":"","payload":{"masterAmount":"","srcAmount":"","srcTokenRate":"","destAmount":"","destTokenRate":""},"remark":"","extension":"","version":"1000","proof":{"ledgerSeq":"","txHash":""}}}
var sgasSubmitParams = {"accessToken":"","params":{"blobId":"","signerList":[{"signBlob":"","publicKey":"b065664cf55cd5b7d6869d73a6ad737cf2d3b0266d5b468c38a1bf2c544aca7dbab3b8"}]}}
var callBlobParams = {"accessToken":"","params":{"gatewayAddress":"did:bid:ef3edP9uBW7TKR86T1ib2hMke7UPucqh","crossTxNo":"","srcAddress":"","destAddress":"","srcChainCode":"a202","destChainCode":"","payload":{"contractMethod":"","contractInput":[{"key":"value"}],"token":{"masterAmount":"","srcAmount":"","srcTokenRate":"","destAmount":"","destTokenRate":""}},"remark":"","extension":"","version":"1000","proof":{"ledgerSeq":"","txHash":""}}}
var callSubmitParams = {"accessToken":"","params":{"blobId":"","signerList":[{"signBlob":"","publicKey":"b065664cf55cd5b7d6869d73a6ad737cf2d3b0266d5b468c38a1bf2c544aca7dbab3b8"}]}}

var ackedBlobParams = {"accessToken":"","params":{"gatewayAddress":"did:bid:ef3edP9uBW7TKR86T1ib2hMke7UPucqh","crossTxNo":"","result":"","extension":"","version":"1000","proof":{"ledgerSeq":"","txHash":""}}}
var ackedSubmitParams = {"accessToken":"","params":{"blobId":"","signerList":[{"signBlob":"","publicKey":"b065664cf55cd5b7d6869d73a6ad737cf2d3b0266d5b468c38a1bf2c544aca7dbab3b8"}]}}

const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcGlLZXkiOiJkaWQ6YmlkOmVmUW9DeEVlcWNObkVTa05uMlZKcENqWWZwWDE5cWVjIiwiaXNzIjoiQklGLUNIQUlOIiwiZXhwIjoxNjMxNzg4NTE5LCJiaWQiOiJkaWQ6YmlkOmVmajdqcjU1VDRSd2ZwRUo5TDFaUXh2d0w0TmdZaFV5In0.lO81FdVRy37HppaenUSmSH98p90BqWeDGnF4nNoAS6Q"
gasBlobParams.accessToken = accessToken
gasSubmitParams.accessToken = accessToken
sgasBlobParams.accessToken = accessToken 
sgasSubmitParams.accessToken = accessToken
callBlobParams.accessToken = accessToken
callSubmitParams.accessToken = accessToken

ackedBlobParams.accessToken = accessToken
ackedSubmitParams.accessToken = accessToken

//记录当前的区块高度
var blockNum = 1

//每5秒查询一次跨链事件
var rule = new schedule.RecurrenceRule();
　　var times = [];
　　for(var i=1; i<60; ){
       i+=10;
　　　　times.push(i);
　　}
　　rule.second = times;

schedule.scheduleJob(rule,async() => {

    var blockHeight = await web3.eth.getBlockNumber();
    console.log("schedule", "blockHeight:", blockHeight);
    if (blockNum < blockHeight) {
        blockNum = blockHeight
        await getEvents(blockHeight, blockHeight);
    }
})

//获取以太坊跨链合约事件
let getEvents = async (fromBlock, toBlock) =>{

    console.log('fromBlock:', fromBlock,'toBlock:', toBlock);
    myContract.getPastEvents('allEvents',{
        filter:{operation:['startTxEvent', 'sendTxEvent', 'sendAckedEvent']}, 
        fromBlock:fromBlock,
        toBlock: toBlock,
    },
    async (error, events) => {
        for (const event of events){
            
            //获取事件的接口类型、跨链编号、跨链类型
            var _carossTxState = event.returnValues[0]
            var _crossTxNo = event.returnValues[1]  
            var _crossTxType = event.returnValues[2]

            //获取区块号、交易的哈希
            var _ledgerSeq = event.blockNumber
            var _txHash = event.transactionHash

            if (_carossTxState == 'startTx')
            {   
                //用户发送跨链交易事件，网关节点转发跨链交易
                _startTx(_crossTxNo, _crossTxType, _ledgerSeq, _txHash)
            } 
            else if (_carossTxState == 'sendTx')
            {
                //网关节点转发的跨链交易成功上链，需要回Ack给源链
                _sendTx(_crossTxNo, _ledgerSeq, _txHash)     
            }
            else if (_carossTxState == 'sendAcked')
            {
                //网关节点回的Ack上链成功，需要给目标连回复Ack
                _sendAcked(_crossTxNo, _ledgerSeq, _txHash)
            }

        }
    })
}

function _startTx(_crossTxNo, _crossTxType, _ledgerSeq, _txHash){

    //根据跨链交易编号获取跨链交易
    myContract.methods.getCrossTx(_crossTxNo).call({from:gatewayAddress}, function(error, result){
        console.log(result)

        //跨链基础信息：源AC、目标AC、源地址、目标地址、跨链交易类型
        var _basicInfo = web3.eth.abi.decodeParameters(['string', 'string', 'string', 'string', 'uint256'], result[0])
        
        //跨链交易处理状态
        var _result = result[2]

        //附属信息:remark、extension、verison
        var _extensionInfo = web3.eth.abi.decodeParameters(['string', 'string', 'string'], result[7])
        
        //startTx交易为init未处理状态
        if (_result == 0) {
            //主链网关节点构建sendTx
            if (_crossTxType == 0)
            {
                //主链积分转移
                var _payload = web3.eth.abi.decodeParameter('uint256', result[1])
                console.log(_payload)

                gasBlobParams.params.crossTxNo = _crossTxNo
                gasBlobParams.params.srcAddress = _basicInfo[2]
                gasBlobParams.params.destAddress = _basicInfo[3]
                gasBlobParams.params.destChainCode = _basicInfo[1]
                gasBlobParams.params.payload.amount = _payload
                gasBlobParams.params.remark = _extensionInfo[0]
                gasBlobParams.params.extension = _extensionInfo[1]
                gasBlobParams.params.proof.ledgerSeq = _ledgerSeq
                gasBlobParams.params.proof.txHash = _txHash
                console.log(gasBlobParams)
                
                //将交易序列化
                gasGetBlob(gasBlobURL, gasBlobParams)
            }
            else if (_crossTxType == 1)
            {
                //子链积分兑换
                var _payload = web3.eth.abi.decodeParameters(['uint256', 'uint256', 'string', 'uint256', 'string'], result[1])
                console.log(_payload)
                if (_payload[0] != _payload[1]/Number(_payload[2]) || _payload[0] != _payload[3]/Number(_payload[4])) {
                   
                    console.log("Exchange rate error")
                    return 
                }

                sgasBlobParams.params.crossTxNo = _crossTxNo
                sgasBlobParams.params.srcAddress = _basicInfo[2]
                sgasBlobParams.params.destAddress = _basicInfo[3]
                sgasBlobParams.params.destChainCode = _basicInfo[1]
                sgasBlobParams.params.payload.masterAmount = _payload[0]
                sgasBlobParams.params.payload.srcAmount = _payload[1]
                sgasBlobParams.params.payload.srcTokenRate = _payload[2]
                sgasBlobParams.params.payload.destAmount = _payload[3]
                sgasBlobParams.params.payload.destTokenRate = _payload[0]
                sgasBlobParams.params.remark = _extensionInfo[0]
                sgasBlobParams.params.extension = _extensionInfo[1]
                sgasBlobParams.params.proof.ledgerSeq = _ledgerSeq
                sgasBlobParams.params.proof.txHash = _txHash
                console.log(sgasBlobParams)

                //将交易序列化
                sgasGetBlob(sgasBlobURL, sgasBlobParams)
            }
            else if (_crossTxType === 2)
            {
                //合约互操作
                //----------两者不相匹配
                var _payload = web3.eth.abi.decodeParameters(['string', 'bytes', 'bytes'], result[1])
                console.log(_payload)

                // sgasBlobParams.params.crossTxNo = _crossTxNo
                // sgasBlobParams.params.srcAddress = _basicInfo[2]
                // sgasBlobParams.params.destAddress = _basicInfo[3]
                // sgasBlobParams.params.destChainCode = _basicInfo[1]
                // sgasBlobParams.params.payload.masterAmount = _payload[0]
                // sgasBlobParams.params.payload.srcAmount = _payload[1]
                // sgasBlobParams.params.payload.srcTokenRate = _payload[2]
                // sgasBlobParams.params.payload.destAmount = _payload[3]
                // sgasBlobParams.params.payload.destTokenRate = _payload[0]
                // sgasBlobParams.params.remark = _extensionInfo[0]
                // sgasBlobParams.params.extension = _extensionInfo[1]
                // sgasBlobParams.params.proof.ledgerSeq = _ledgerSeq
                // sgasBlobParams.params.proof.txHash = _txHash
                // sgasBlobParams.log(gasBlob)
            }
        }        
    })
}

function gasGetBlob(_gasBlobURL, _gasBlobParams) {
    request({
        url: _gasBlobURL,
        method: "POST",
        json: true,
        headers: "",
        body: _gasBlobParams
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {

            console.log(body)
            var _blobId = body.data.blobId
            var _blob = body.data.blob  

            //将序列化结果进行签名
            var _signBlob =  BifChainSDK.sign(_blob, "priSPKhH1wXssPE4FT5yJNQmdiBKtjjdGGa7LPfTJLsEecgbL3");
            
            gasSubmitParams.params.blobId = _blobId
            gasSubmitParams.params.signerList[0].signBlob = _signBlob

            //提交交易
            gasSendSubmit(gasSubmitURL, gasSubmitParams)
           
        }
    })
}

function gasSendSubmit(_gasSubmitURL, _gasSubmitParams) {
    request({
        url: _gasSubmitURL,
        method: "POST",
        json: true,
        headers: "",
        body: _gasSubmitParams
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {  
            console.log(body)        
        }
    })
}

function sgasGetBlob(_sgasBlobURL, _sgasBlobParams) {
    request({
        url: _sgasBlobURL,
        method: "POST",
        json: true,
        headers: "",
        body: _sgasBlobParams
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {

            console.log(body)
            var _blobId = body.data.blobId
            var _blob = body.data.blob  

            //将序列化结果进行签名
            var _signBlob =  BifChainSDK.sign(_blob, "priSPKhH1wXssPE4FT5yJNQmdiBKtjjdGGa7LPfTJLsEecgbL3");
            
            sgasSubmitParams.params.blobId = _blobId
            sgasSubmitParams.params.signerList[0].signBlob = _signBlob

            //提交交易
            sgasSendSubmit(sgasSubmitURL, sgasSubmitParams)
           
        }
    })
}

function sgasSendSubmit(_sgasSubmitURL, _sgasSubmitParams) {
    request({
        url: _sgasSubmitURL,
        method: "POST",
        json: true,
        headers: "",
        body: _sgasSubmitParams
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {  
            console.log(body)        
        }
    })
}

function _sendTx(_crossTxNo, _ledgerSeq, _txHash){

    //根据跨链交易编号获取跨链交易
    myContract.methods.getCrossTx(_crossTxNo).call({from:gatewayAddress}, function(error, result){
        console.log(result)

       //跨链交易处理状态
        var _result = result[2]

        //获取的跨链交易为init未处理状态
        if (_result == 0){
            //主链网关构建sendAcked
            ackedBlobParams.params.crossTxNo = _crossTxNo

            //对交易的处理：1为SUCCESS，2为fail，3为超时 
            ackedBlobParams.params.result = 1

            //ackedBlobParams.params.extension
            ackedBlobParams.params.version = 1000
            ackedBlobParams.params.proof.ledgerSeq = _ledgerSeq
            ackedBlobParams.params.proof.txHash = _txHash

            console.log(ackedBlobParams)

            //将交易序列化
            ackedGetBlob(ackedBlobURL, ackedBlobParams)
        }
    })
}

function ackedGetBlob(_ackedBlobURL, _ackedBlobParams) {
    request({
        url: _ackedBlobURL,
        method: "POST",
        json: true,
        headers: "",
        body: _ackedBlobParams
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {

            console.log(body)

            var _blobId = body.data.blobId
            var _blob = body.data.blob  

            //将序列化结果进行签名
            var _signBlob =  BifChainSDK.sign(_blob, "priSPKhH1wXssPE4FT5yJNQmdiBKtjjdGGa7LPfTJLsEecgbL3");
            
            ackedSubmitParams.params.blobId = _blobId
            ackedSubmitParams.params.signerList[0].signBlob = _signBlob

            //提交交易
            ackedSubmit(ackedSubmitURL, ackedSubmitParams)
           
        }
    })
}

function ackedSubmit(_ackedSubmitURL, _ackedSubmitParams) {
    request({
        url: _ackedSubmitURL,
        method: "POST",
        json: true,
        headers: "",
        body: _ackedSubmitParams
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {  
            console.log(body)        
        }
    })
}

function _sendAcked(_crossTxNo, _ledgerSeq, _txHash){

    //根据跨链交易编号获取跨链交易
    myContract.methods.getCrossTx(_crossTxNo).call({from:gatewayAddress}, function(error, result){  

        //sendAcked为源链上的交易
        if (result[4] == 0){
            //主链网关构建sendAcked
            ackedBlobParams.params.crossTxNo = _crossTxNo

            //对交易的处理：1为SUCCESS，2为fail，3为超时 
            ackedBlobParams.params.result = 1

            //ackedBlobParams.params.extension
            ackedBlobParams.params.version = 1000
            ackedBlobParams.params.proof.ledgerSeq = _ledgerSeq
            ackedBlobParams.params.proof.txHash = _txHash

            console.log(ackedBlobParams)

            //将交易序列化
            ackedGetBlob(ackedBlobURL, ackedBlobParams)
        } 
    })
}
