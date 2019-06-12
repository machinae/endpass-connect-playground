// Initialize a global web3 instance connecting to a remote node
// We are using the Infura Ethereum node here, but you can use the URL of any provider. 
// Latest web3.js 0.20.x version without cors issues is 0.20.6
web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/zU4GTAQ0LjJNKddbyztc"));

// Run when document has loaded
window.addEventListener('DOMContentLoaded', function(e) {
  loadData();
});

function loadData() {
  // Get the current block number and verify the connection
  web3.eth.getBlockNumber(function(err, res) {
    document.querySelector("#block-height").innerHTML = res;
  });

  // Get the list of the user's accounts
  // We will always return one in the array
  web3.eth.getAccounts(function(err, res) {
    if (res.length) {
      document.querySelector("#address").innerHTML = res[0];
      let addr = res[0];

      let resB = web3.eth.getBalance(addr);
      let bal = web3.fromWei(resB, 'ether');
      document.querySelector("#balance").innerHTML = bal.toString();
    }
  });
}
