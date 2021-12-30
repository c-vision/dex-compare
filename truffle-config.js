/**
 * 
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * trufflesuite.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 * 
 */

const result = require('dotenv').config()
if (result.error) {
    throw result.error
}

const HDWalletProvider = require("@truffle/hdwallet-provider");

//Infura
const MAINNET_URL = "https://mainnet.infura.io/v3/" + process.env.INFURA_API_KEY;
const ROPSTEN_URL = "https://ropsten.infura.io/v3/" + process.env.INFURA_API_KEY;
const KOVAN_URL = "https://kovan.infura.io/v3/" + process.env.INFURA_API_KEY;
const RINKEBY_URL = "https://rinkeby.infura.io/v3/" + process.env.INFURA_API_KEY;
const GOERLI_URL = "https://goerli.infura.io/v3/" + process.env.INFURA_API_KEY;

//Ganache
const GANACHE_PORT = process.env.GANACHE_PORT;
const GANACHE_MNEMONIC = process.env.GANACHE_MNEMONIC;

//Metamask
const METAMASK_MNEMONIC = process.env.METAMASK_MNEMONIC;
const METAMASK_ACCOUNT = process.env.METAMASK_ACCOUNT;
const METAMASK_PRIVATE_KEY = process.env.METAMASK_PRIVATE_KEY;

const REAL_PRIVATE_KEY = process.env.REAL_PRIVATE_KEY;

//Private Keys
// const Wallet = require('ethereumjs-wallet');
// const MateMaskPrivateKey = Buffer.from(process.env.METAMASK_PRIVATE_KEY, 'hex');
// const wallet = Wallet.fromPrivateKey(MateMaskPrivateKey);
// const MainnetProviderPrivateKey = new HDWalletProvider(wallet, MAINNET_URL);
// const RinkebyProviderPrivateKey = new HDWalletProvider(wallet, RINKEBY_URL);
// const RopstenProviderPrivateKey = new HDWalletProvider(wallet, ROPSTEN_URL);
// const KovanProviderPrivateKey = new HDWalletProvider(wallet, KOVAN_URL);

module.exports = {
    /**
     * Networks define how you connect to your ethereum client and let you set the
     * defaults web3 uses to send transactions. If you don't specify one truffle
     * will spin up a development blockchain for you on port 9545 when you
     * run `develop` or `test`. You can ask a truffle command to use a specific
     * network from the command line, e.g
     *
     * $ truffle test --network <network-name>
     */

    networks: {
        // Useful for testing. The `development` name is special - truffle uses it by default
        // if it's defined here and no other network is specified at the command line.
        // You should run a client (like ganache-cli, geth or parity) in a separate terminal
        // tab if you use this network and you must also set the `host`, `port` and `network_id`
        // options below to some value.

        // 0: Olympic, Ethereum public pre-release PoW testnet
        // 1: Frontier, Homestead, Metropolis, the Ethereum public PoW main network
        // 1: Classic, the (un)forked public Ethereum Classic PoW main network, chain ID 61
        // 1: Expanse, an alternative Ethereum implementation, chain ID 2
        // 2: Morden Classic, the public Ethereum Classic PoW testnet, now retired
        // 3: Ropsten, the public proof-of-work Ethereum testnet
        // 4: Rinkeby, the public Geth-only PoA testnet
        // 5: Goerli, the public cross-client PoA testnet
        // 6: Kotti Classic, the public cross-client PoA testnet for Classic
        // 7: Mordor Classic, the public cross-client PoW testnet for Classic
        // 8: Ubiq, the public Gubiq main network with flux difficulty chain ID 8
        // 10: Quorum, the JP Morgan network
        // 42: Kovan, the public Parity-only PoA testnet
        // 56: Binance, the public Binance mainnet
        // 60: GoChain, the GoChain networks mainnet
        // 77: Sokol, the public POA Network testnet
        // 97: Binance, the public Binance testnet
        // 99: Core, the public POA Network main network
        // 100: xDai, the public MakerDAO/POA Network main network
        // 128: HECO, Huobi ECO Chain main network
        // 256: HECO, Huobi ECO Chain test network
        // 31337: GoChain testnet, the GoChain networks public testnet
        // 401697: Tobalaba, the public Energy Web Foundation testnet
        // 7762959: Musicoin, the music blockchain
        // 61717561: Aquachain, ASIC resistant chain
        // [Other]: Could indicate that your connected to a local development test network.

        //
        development: {
            // truffle develop and then migrate for truffle integrated ganache
            // truffle migrate for local ganache
            host: "127.0.0.1",
            port: 8545,
            network_id: "*",
            gas: 5000000,
            //gasPrice: web3.utils.toWei("45", "gwei"),
            gasPrice: 45000000000, // 45 gwei
            websockets: true,
            accounts: 10,
            //from: <address>,        // Account to send txs from (default: accounts[0])
            //timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
            defaultEtherBalance: 500,
            blockTime: 3,
            skipDryRun: true
        },
        mainnet_fork: {
            // truffle migrate --network mainnet_fork --reset
            // ganache-cli -f https://maininet.infura.io/v3/INFURA_KEY etc.
            host: "127.0.0.1",
            port: 85,
            network_id: 999,
            gas: 5000000,
            gasPrice: 45000000000, // 45 gwei
            skipDryRun: true
        },
        ropsten_fork: {
            // truffle migrate --network ropsten_fork --reset
            // ganache-cli -f https://ropsten.infura.io/v3/INFURA_KEY etc.
            host: "127.0.0.1", //local ganache
            port: 8545,
            network_id: 999,
            gas: 5000000,
            gasPrice: 45000000000, // 45 gwei
            skipDryRun: true
        },
        kovan_fork: {
            // truffle migrate --network kovan_fork --reset
            // ganache-cli -f https://kovan.infura.io/v3/INFURA_KEY etc.
            host: "127.0.0.1", //local ganache
            port: 8545,
            network_id: 999,
            gas: 5000000,
            gasPrice: 45000000000, // 45 gwei
            skipDryRun: true
        },
        ropsten: {
            //truffle migrate --network ropsten --reset
            provider: new HDWalletProvider(METAMASK_PRIVATE_KEY, ROPSTEN_URL),
            network_id: 3,
            //gasPrice: web3.utils.toWei("45", "gwei"),
            gasPrice: 45000000000, // 45 gwei
            skipDryRun: true
        },
        rinkeby: {
            //truffle migrate --network rinkeby --reset
            provider: new HDWalletProvider(METAMASK_PRIVATE_KEY, RINKEBY_URL),
            network_id: 4,
            gas: 5000000,
            //gasPrice: web3.utils.toWei("45", "gwei"),
            gasPrice: 45000000000, // 45 gwei
            skipDryRun: true
        },
        kovan: {
            //truffle migrate --network kovan --reset
            provider: new HDWalletProvider(METAMASK_PRIVATE_KEY, KOVAN_URL),
            network_id: 42,
            gas: 5000000,
            //gasPrice: web3.utils.toWei("45", "gwei"),
            gasPrice: 45000000000, // 45 gwei
            skipDryRun: true
        },
        goerli: {
            //truffle migrate --network goerli --reset
            provider: new HDWalletProvider(METAMASK_PRIVATE_KEY, GOERLI_URL),
            network_id: 5,
            gas: 5000000,
            //gasPrice: web3.utils.toWei("45", "gwei"),
            gasPrice: 45000000000, // 45 gwei
            skipDryRun: true
        },
        bsc_testnet: {
            //truffle migrate --network bsc_testnet --reset
            provider: new HDWalletProvider(METAMASK_PRIVATE_KEY,
                "https://data-seed-prebsc-1-s1.binance.org:8545"),
            network_id: 97,
            gas: 5000000,
            //gasPrice: web3.utils.toWei("45", "gwei"),
            gasPrice: 45000000000, // 45 gwei
            skipDryRun: true
        },
        polygon_test: {
            //truffle migrate --network polygon_test --reset
            provider: () =>
                new HDWalletProvider(METAMASK_PRIVATE_KEY, "https://rpc-mumbai.matic.today"),
            network_id: 80001,
            confirmations: 2,
            timeoutBlocks: 200,
            networkCheckTimeout: 999999,
            skipDryRun: true
        },
        // main nets
        mainnet: {
            //truffle migrate --network mainnet --reset
            provider: new HDWalletProvider(REAL_PRIVATE_KEY, MAINNET_URL),
            network_id: 1,
            skipDryRun: true
        },
        /*
            https://matic.supply/
            https://macncheese.finance/matic-polygon-mainnet-faucet.php
            Transactions on Polygon network are dirt cheap. Forget Ethereum, forget BSC, we're talking 
            about fractions of a cent for most transactions. So this faucet will only send you 0.0005 
            MATIC - which is enough to deposit some fund on Aave and earn fresh MATIC, for instance
            With 0.001 MATIC, you can do 100 basic transactions on Polygon network ! You can even deposit 
            or withdraw funds on Aave, even though it is a pretty expensive transaction (50$+ on Ethereum, 
            1$+ on Binance Smart Chain). The goal of this faucet is not to make you rich but just to make 
            the onboarding to Polygon smoother. You can use it up to 3 times a day, for the most clumsy 
            of us 🙄 Feel free to send some spare change at 0x8C5a6C767Ee7084a8C656Acd457Da9561163aE7E 
            to replenish the faucet once you're rich 🦄

            How to earn (much) more MATIC ?

            First bring your assets from Ethereum to Polygon through the bridge
            Then there's a variety of things you can do:
                Swapping assets on QuickSwap or ComethSwap, the equivalents of Uniswap on Polygon
                Paraswap is also available and will route your swaps through the cheapest path.
                Depositing your assets on Aave or Curve to farm some fresh MATIC
                Enjoy the same functionalities Ethereum has, only with less friction 🦄
        */
        polygon: {
            //truffle migrate --network polygon --reset
            provider: () =>
                new HDWalletProvider(REAL_PRIVATE_KEY, "https://rpc-mainnet.matic.network"),
            network_id: '137',
            gasPrice: '90000000000'
        }
    },

    // Set default mocha options here, use special reporters etc.
    mocha: {
        useColors: true
            // timeout: 100000
    },

    // Configure your compilers
    // https://docs.soliditylang.org/en/latest/using-the-compiler.html#input-description
    compilers: {
        solc: {
            version: "0.8.4", // Fetch exact version from solc-bin (default: truffle's version)
            // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
            settings: { // See the solidity docs for advice about optimization and evmVersion
                "optimizer": {
                    "enabled": true,
                    "runs": 200
                },
                "evmVersion": "istanbul",
                "outputSelection": {
                    "*": {
                        "*": [
                            "evm.bytecode",
                            "evm.deployedBytecode",
                            "abi"
                        ]
                    }
                },
                "libraries": {}
            }
        },
    },
    plugins: ['truffle-plugin-verify'],
    api_keys: {
        etherscan: "TH7775XFVSWE1DYVQIT4NJWD1FFDRXPFY7"
    }
}