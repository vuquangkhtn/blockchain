var Client = require('bitcore-wallet-client');

var sinon = require('sinon');
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

var http = sinon.stub();
client.openWallet(function(err, ret) {
    if (err) {
        console.log('error: ', err);
        return;
    };
    // console.log('\n\n** Wallet Info', ret); //TODO
    var opts = {
        outputs: [{
            toAddress: 'n3XjJ2jQh5TnuUwFamotccjXJAya3ZucCv',
            amount: 10000000
        }],
        changeAddress: '2Myy1zhVvhR2kp5D7XjUukZpYYDhvnUDRRe'
        // feePerKb: 100e2

    }
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
            // console.log(publishTxp);
            client.signTxProposal(publishTxp, function(err, signTxp) {
                if (err) {
                    console.log('error: ', err);
                    return;
                };
                // console.log(signTxp);
                console.log('here: 3');
                console.log(signTxp);
            });
        });
    });
});