module.exports = {
  networks: {
    live: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Only mainnet
      gasPrice: "10000000000", // 10 gwei
      gas: "5000000", // 0.02 eth at 4 gwei price
    },
  },
  compilers: {
    solc: {
      version: "^0.8.0",
    },
  },
};