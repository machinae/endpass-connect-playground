// Initialize a global web3 instance connecting to a remote node
// We are using the Infura Ethereum node here, but you can use the URL of any provider. 
const WEB3_PROVIDER = "https://mainnet.infura.io/zU4GTAQ0LjJNKddbyztc";

// Client ID registered at https://vault.endpass.com
const OAUTH_APP_ID = "a616a3e4-50bb-4eae-a5b1-0aeda6683bc9";

// Create a new instance of web3
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
  web3.eth.getBlockNumber().then(res => {
    document.querySelector("#block-height").innerHTML = res;
  });
}

function loadUserData() {
  document.querySelector("#status").innerHTML = "Waiting for user to log in";
  // Get the list of the user's accounts
  // We will always return one in the array
  web3.eth.getAccounts().then(res => {
    if (res.length) {
      document.querySelector("#address").innerHTML = res[0];
      let addr = res[0];

      web3.eth.getBalance(addr).then(res => {
        let bal = web3.utils.fromWei(res, 'ether');
        document.querySelector("#balance").innerHTML = bal.toString();
        document.querySelector("#status").innerHTML = "Got data from blockchain!";
      });
    }
  }).catch(err => {
    console.log(err);
    document.querySelector("#status").innerHTML = 'ERROR: ' + err;
  });
}
