require('dotenv').config()
const fs = require('fs');
const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const Web3 = require('web3')
const HDWalletProvider = require('@truffle/hdwallet-provider')
const moment = require('moment-timezone')
const numeral = require('numeral')
const _ = require('lodash')
const axios = require('axios')

// SERVER CONFIG
const PORT = process.env.PORT || 5000
const app = express();
const server = http.createServer(app).listen(PORT, () => console.log(`Listening on ${ PORT }`))

// WEB3 CONFIG
const web3 = new Web3(process.env.INFURA)

// Uniswap Factory Contract: https://etherscan.io/address/0xc0a47dfe034b400b47bdad5fecda2621de6c4d95#code
const UNISWAP_FACTORY_ABI = JSON.parse(fs.readFileSync("./UniswapFactory.json"));
const UNISWAP_FACTORY_ADDRESS = '0xc0a47dfe034b400b47bdad5fecda2621de6c4d95'
const uniswapFactoryContract = new web3.eth.Contract(UNISWAP_FACTORY_ABI, UNISWAP_FACTORY_ADDRESS)

// Uniswap Exchange Template: https://etherscan.io/address/0x09cabec1ead1c0ba254b09efb3ee13841712be14#code
const UNISWAP_EXCHANGE_ABI = JSON.parse(fs.readFileSync("./UniswapExchange.json"));

//https://docs.kyberswap.com/Legacy/api-abi/abis/api_abi-abi
const KEYBER_NETWORK_PROXY_ABI = JSON.parse(fs.readFileSync("./IKeyberNetworkProxy.json"));
//https://docs.kyberswap.com/Legacy/addresses/addresses-mainnet
const KYBER_NETWORK_PROXY_ADDRESS = '0x9AAb3f75489902f3a48495025729a0AF77d4b11e'
const kyberRateContract = new web3.eth.Contract(KEYBER_NETWORK_PROXY_ABI, KYBER_NETWORK_PROXY_ADDRESS)

async function checkPair(args) {

    const { inputTokenSymbol, inputTokenAddress, outputTokenSymbol, outputTokenAddress, inputAmount } = args

    const exchangeAddress = await uniswapFactoryContract.methods.getExchange(outputTokenAddress).call()
    const exchangeContract = new web3.eth.Contract(UNISWAP_EXCHANGE_ABI, exchangeAddress)

    const uniswapResult = await exchangeContract.methods.getEthToTokenInputPrice(inputAmount).call()

    const kyberResult = await kyberRateContract.methods.getExpectedRate(inputTokenAddress,outputTokenAddress, inputAmount).call()

    console.table([{
        'Input Token': inputTokenSymbol,
        'Output Token': outputTokenSymbol,
        'Input Amount': web3.utils.fromWei(inputAmount, 'Ether'),
        'Uniswap Return': web3.utils.fromWei(uniswapResult, 'Ether'),
        'Kyber Expected Rate': web3.utils.fromWei(kyberResult.expectedRate, 'Ether'),
        'Kyber Worst Rate':  web3.utils.fromWei(kyberResult.worstRate, 'Ether'),
        'Timestamp': moment().tz('America/Chicago').format(),
    }])
}

let priceMonitor
let monitoringPrice = false

async function monitorPrice() {
    if (monitoringPrice) {
        return
    }

    console.log("Checking prices...")
    monitoringPrice = true

    try {

        // ADD YOUR CUSTOM TOKEN PAIRS HERE!!!

        // https://api.kyber.network/currencies
        await checkPair({
            inputTokenSymbol: 'ETH',
            inputTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
            outputTokenSymbol: 'MKR',
            outputTokenAddress: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
            inputAmount: web3.utils.toWei('1', 'ETHER')
        })

        await checkPair({
            inputTokenSymbol: 'ETH',
            inputTokenAddress: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
            outputTokenSymbol: 'DAI',
            outputTokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
            inputAmount: web3.utils.toWei('1', 'ETHER')
        })

        await checkPair({
            inputTokenSymbol: 'ETH',
            inputTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
            outputTokenSymbol: 'LEND',
            outputTokenAddress: '0x80fb784b7ed66730e8b1dbd9820afd29931aab03',
            inputAmount: web3.utils.toWei('1', 'ETHER')
        })

        await checkPair({
            inputTokenSymbol: 'ETH',
            inputTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
            outputTokenSymbol: 'LINK',
            outputTokenAddress: '0x514910771af9ca656af840dff83e8264ecf986ca',
            inputAmount: web3.utils.toWei('1', 'ETHER')
        })

    } catch (error) {
        console.error(error)
        monitoringPrice = false
        clearInterval(priceMonitor)
        return
    }

    monitoringPrice = false
}

// Check markets every n seconds
const POLLING_INTERVAL = process.env.POLLING_INTERVAL || 3000 // 3 Seconds
priceMonitor = setInterval(async() => { await monitorPrice() }, POLLING_INTERVAL)