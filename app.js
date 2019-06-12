// Initialize a global web3 instance connecting to a remote node
// We are using the Infura Ethereum node here, but you can use the URL of any provider. 
// Latest web3.js 0.20.x version without cors issues is 0.20.6
web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/zU4GTAQ0LjJNKddbyztc"));

// Run when document has loaded
window.addEventListener('DOMContentLoaded', function(e) {
  // Get the current block number and verify the connection
  let blockNumber = web3.eth.blockNumber;
  document.querySelector("#block-height").innerHTML = blockNumber;
});
