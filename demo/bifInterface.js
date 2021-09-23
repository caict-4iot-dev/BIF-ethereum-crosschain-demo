import { createRequire } from 'module'

const require = createRequire(import.meta.url)

const request = require('request')
const BifChainSDK = require("./lib/bifchain-js-signer/lib");

//连接星火主链的URL
const gasBlobURL = "http://172.19.6.21:84/crosschain/user/start/tx/maingas/blob"
const gasSubmitURL = "http://172.19.6.21:84/crosschain/backbone/send/tx/maingas/submit"
const sgasBlobURL = "http://172.19.6.21:84/crosschain/user/start/tx/subgas/blob"
const sgasSubmitURL = "http://172.19.6.21:84/crosschain/user/start/tx/subgas/submit"

//连接星火主链的params
var gasBlobParams = {"accessToken":"","params":{"userBid":"did:bid:efRyzZabnVCEbCm4ABNuYwyfSp1bEjwy","srcAddress":"did:bid:efRyzZabnVCEbCm4ABNuYwyfSp1bEjwy","destAddress":"0xB2F001cB0a3561C497Acf9aD8879a3A9188a3c4a","destChainCode":"a202","payload":{"amount":"100000000"},"remark":"I am from a202 for start main gas","extension":"extension","version":"1000"}}
var gasSubmitParams = {"accessToken":"","params":{"blobId":"","signerList":[{"signBlob":"","publicKey":"b06566541eec6e186bca85610308baeff71b7c0372f47a365055da8b585b4b5b4124d1"}]}}
var sgasBlobParams = {"accessToken":"","params":{"userBid":"did:bid:efRyzZabnVCEbCm4ABNuYwyfSp1bEjwy","srcAddress":"did:bid:efRyzZabnVCEbCm4ABNuYwyfSp1bEjwy","destAddress":"0xB2F001cB0a3561C497Acf9aD8879a3A9188a3c4a","destChainCode":"a202","payload":{"masterAmount":"100000000","srcAmount":"100000000","srcTokenRate":"1","destAmount":"82920000","destTokenRate":"0.8292"},"remark":"remark","extension":"extension","version":"1000"}}
var sgasSubmitParams = {"accessToken":"","params":{"blobId":"","signerList":[{"signBlob":"","publicKey":"b06566541eec6e186bca85610308baeff71b7c0372f47a365055da8b585b4b5b4124d1"}]}}

const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcGlLZXkiOiJkaWQ6YmlkOmVmUW9DeEVlcWNObkVTa05uMlZKcENqWWZwWDE5cWVjIiwiaXNzIjoiQklGLUNIQUlOIiwiZXhwIjoxNjMyMzA2NjQyLCJiaWQiOiJkaWQ6YmlkOmVmajdqcjU1VDRSd2ZwRUo5TDFaUXh2d0w0TmdZaFV5In0.sjzsGbaMBnmrrnHrvJR_NcbupX3cbcokVa60An_KOv4"
gasBlobParams.accessToken = accessToken
gasSubmitParams.accessToken = accessToken
sgasBlobParams.accessToken = accessToken 
sgasSubmitParams.accessToken = accessToken

//startGasTx()
startSgasTx()

//用户发起主链积分转移
function startGasTx(){
    console.log(gasBlobParams)
                
    //将交易序列化
    gasGetBlob(gasBlobURL, gasBlobParams) 
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
            var _signBlob =  BifChainSDK.sign(_blob, "priSPKU6Y3MtwHZ6oS7J5ZUU9oheVonGncH3F1bEoG91QyizWE");
            
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

//用户发起子链积分兑换
function startSgasTx(){

    console.log(sgasBlobParams)

    //将交易序列化
    sgasGetBlob(sgasBlobURL, sgasBlobParams) 
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
            var _signBlob =  BifChainSDK.sign(_blob, "priSPKU6Y3MtwHZ6oS7J5ZUU9oheVonGncH3F1bEoG91QyizWE");
            
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
