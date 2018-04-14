var Client = require('bitcore-wallet-client');
var fs = require('fs');

// var BWS_INSTANCE_URL = 'http://43.239.149.130:3232/bws/api';
var BWS_INSTANCE_URL = 'https://bws.bitpay.com/bws/api';

var WALLET_FILE = './irene.dat';
var WALLET_FILE_2 = './tomas.dat';



var client = new Client({
    baseUrl: BWS_INSTANCE_URL,
    verbose: false,
});

var client2 = new Client({
    baseUrl: BWS_INSTANCE_URL,
    verbose: false,
});

// open wallet
client.import(fs.readFileSync(WALLET_FILE));
client2.import(fs.readFileSync(WALLET_FILE_2));

//get balance of wallet
client.getBalance({}, function(err, bl) {
    if (err) {
      console.log('error: ', err);
      return
    };
    console.log("Im here 1");
    //get from addr
    client.getMainAddresses({
        doNotVerify: true
      }, function(err, addr) {
        if (err) {
          console.log('error: ', err);
          return
        };
        console.log("Im here 2");
        //get to addr
        client2.getMainAddresses({
            doNotVerify: true
          }, function(err, addr2) {
            if (err) {
              console.log('error: ', err);
              return
            };
            console.log("Im here 3");
            //get fee for txp
            client.getFeeLevels('btc', 'testnet', function(err, levels) {
                // console.log(levels);
                var opts = {
                    outputs: [{
                        toAddress: addr2[0].address,
                        amount: bl.availableAmount - levels[0].feePerKb
                    }],
                    changeAddress: addr[0].address,
                    feePerKb: levels[0].feePerKb
                };
                client.createTxProposal(opts, function(err, createTxp) {
                    if (err) {
                        console.log('error: ', err);
                        return;
                    };
                    console.log('here: 1');
                    // console.log(txp);
                    client.publishTxProposal({
                        txp: createTxp
                    }, function(err, publishTxp) {
                        if (err) {
                            console.log('error: ', err);
                            return;
                        };
                        console.log('here: 2');
                        client.signTxProposal(publishTxp, function(err, signTxp) {
                            if (err) {
                                console.log('error: ', err);
                                return;
                            };
                            console.log('here: 3');
                            console.log(signTxp);
                        });
                    });
                });
            });
        }); 
    }); 
});