var Client = require('bitcore-wallet-client');
var sinon = require('sinon');
var fs = require('fs');
// var BWS_INSTANCE_URL = 'http://43.239.149.130:3232/bws/api';
var BWS_INSTANCE_URL = 'https://bws.bitpay.com/bws/api';

var WALLET_FILE = './tomas.dat';
// var WALLET_FILE = './irene.dat';

var client = new Client({
    baseUrl: BWS_INSTANCE_URL,
    verbose: false,
});

// open wallet
client.import(fs.readFileSync(WALLET_FILE));

var http = sinon.stub();
// http.yields(null, TestData.payProBuf);

client.getTxProposals({}, function(err, txps) {
    if (err) {
        console.log('error: ', err);
        return
    };
    console.log('here: 1');
    var signTxp = txps[0];
    console.log(signTxp);

    if (signTxp.status != 'accepted') {
        console.log('status is not accepted: ', signTxp.status);
        return;
    };
    http.onCall(5).yields(null, signTxp);
    client.broadcastTxProposal(signTxp, function(err, zz, memo) {
        if (err) {
            console.log('error: ', err);
            return;
        };
        console.log(zz);
        console.log(memo);

    });
});