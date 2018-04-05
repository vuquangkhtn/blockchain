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
    client.getTxProposals({}, function(err, txps) {
        if (err) {
            console.log('error: ', err);
            return
        };
        var tx = txps[0];
        // console.log(tx.inputs);
        // console.log(tx.outputs);
        client.signTxProposal(tx, function(err, xx, paypro) {
            if (err) {
                console.log('error: ', err);
                return
            };
            // console.log(xx);
            // client.signTxProposal(xx, function(err, yy, paypro) {
            //     if (err) {
            //         console.log('error: ', err);
            //         return
            //     };
            //     console.log(yy);
            //     // http.onCall(5).yields(null, TestData.payProAckBuf);

            client.broadcastTxProposal(xx, function(err, zz, memo) {
                if (err) {
                    console.log('error: ', err);
                    return
                };
                var args = http.lastCall.args[0];
                console.log(zz);
                console.log(memo);

            });
            // });
        });
    });
});