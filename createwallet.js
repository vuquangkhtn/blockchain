var Client = require('bitcore-wallet-client');
var fs = require('fs');

// var BWS_INSTANCE_URL = 'http://43.239.149.130:3232/bws/api';
var BWS_INSTANCE_URL = 'https://bws.bitpay.com/bws/api';

var client = new Client({
  baseUrl: BWS_INSTANCE_URL,
  verbose: false,
});

client.createWallet("My Wallet", "Irene", 1, 1, {network: 'testnet'}, function(err, secret) {
  if (err) {
    console.log('error: ',err);
    return
  };
  // Handle err
  console.log('Wallet Created. Share this secret with your copayers: ' + secret);
  fs.writeFileSync('irene.dat', client.export());
});