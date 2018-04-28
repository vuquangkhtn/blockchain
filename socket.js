var BLT = require("bitcoin-live-transactions")
var Client = require('bitcore-wallet-client');
var fs = require('fs');
// var BWS_INSTANCE_URL = 'http://43.239.149.130:3232/bws/api';
var BWS_INSTANCE_URL = 'https://bws.bitpay.com/bws/api';

var WALLET_FILE = './tomas.dat';
// var WALLET_FILE = './irene.dat';

var client = new Client({
  baseUrl: BWS_INSTANCE_URL,
  verbose: false,
});
var bitcoin = new BLT({testnet:true})
// open wallet
client.import(fs.readFileSync(WALLET_FILE));
bitcoin.connect()
client.getMainAddresses({
    doNotVerify: true
  }, function(err, addr) {
    if (err) {
      console.log('error: ', err);
      return
    };
    // start listening to addresses 
    bitcoin.events.on(addr[0].address,function(tx){
        console.log('>> Transaction detected:', tx);
      })
  });
bitcoin.events.on('connected', function() {
    client.getMainAddresses({
        doNotVerify: true
      }, function(err, addr) {
        if (err) {
          console.log('error: ', err);
          return
        };
        // start listening to addresses 
        bitcoin.events.on('tx',function(tx){
            console.log('>> Transaction detected:', tx);
          })
      });
 })