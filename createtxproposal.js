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
    // console.log('\n\n** Wallet Info', ret); //TODO
    var opts = {
        outputs: [{
            toAddress: 'n3XjJ2jQh5TnuUwFamotccjXJAya3ZucCv',
            amount: 10000000
        }],
        changeAddress: '2Myy1zhVvhR2kp5D7XjUukZpYYDhvnUDRRe'
        // feePerKb: 100e2

    }
    client.createTxProposal(opts, function(err, txp) {
        if (err) {
            console.log('error: ', err);
            return
        };
        console.log(txp);
        client.publishTxProposal({
            txp: txp
        }, function(err, x) {
            if (err) {
	            console.log('error: ', err);
	            return
	        };

	 		console.log(x);
        });
    });
});