var Client = require('bitcore-wallet-client');

var fs = require('fs');
// var BWS_INSTANCE_URL = 'http://43.239.149.130:3232/bws/api';
var BWS_INSTANCE_URL = 'https://bws.bitpay.com/bws/api';

var WALLET_FILE = './tomas.dat';

var client = new Client({
  baseUrl: BWS_INSTANCE_URL,
  verbose: false,
});

// open wallet
client.import(fs.readFileSync(WALLET_FILE));
client.openWallet(function(err, ret) {
  if (err) {
    console.log('error: ', err);
    return
  };
  console.log('\n\n** Wallet Info', ret); //TODO
});