// Initialize a global web3 instance connecting to a remote node
// We are using the Infura Ethereum node here, but you can use the URL of any provider. 
const WEB3_PROVIDER = "https://mainnet.infura.io/zU4GTAQ0LjJNKddbyztc";

// Client ID registered at https://vault.endpass.com
const OAUTH_APP_ID = "a616a3e4-50bb-4eae-a5b1-0aeda6683bc9";

// Latest web3.js 0.20.x version without cors issues is 0.20.6
const web3 = new Web3(WEB3_PROVIDER);

// Create a new Endpass Connect instance with our registered client id
const connect = new EndpassConnect({
  oauthClientId: OAUTH_APP_ID,
});

// Get the Endpass web3 provider
const provider = connect.getProvider();

// For compatibility with some Ethereum wallets
window.ethereum = provider;

// After web3 is loaded, set it to use our custom provider
web3.setProvider(provider);

// Set the global web3 object (optional, for compatibility with older dApp browsers)
window.web3 = web3;

// Run when document has loaded
window.addEventListener('DOMContentLoaded', function(e) {
  // sign in button loads the login form
  let buttons = document.querySelectorAll(".js-sign-in");
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      loadUserData();
    });
  });

  // Public data like the current block height can be loaded right away
  loadChainData();
});

function loadChainData() {
  // Get the current block number and verify the connection
  web3.eth.getBlockNumber(function(err, res) {
    document.querySelector("#block-height").innerHTML = res;
  });
}

function loadUserData() {
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
