var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var s = require('speakeasy');

var eccrypto = require("eccrypto");


const Client = require('bitcoin-core');
const client = new Client({host: 'localhost', network: 'testnet', username: 'vivekteega', password: 'vivekteegapassword', port: 17313
});


/* GET home page. */
router.get('/', function(req, res) {
    res.render('wallet/index', { title: 'FloWallet' });
});


router.get('/login', function(req, res) {
    res.render('wallet/login', { title: 'FloWallet' });
});


router.get('/getbalance', function(req, res) {
    client.getBalance().then((balance) =>  res.json({"balance" : balance}));
});


router.post('/sendflo', function(req,res) {
    
    var toaddress =   req.body.toAddress;
    var amount    =   req.body.amount;
    var comments  =   req.body.comments;

    try {
        client.sendToAddress(toaddress, amount, "", "", false, false, 1, 'UNSET', comments).then((txnid) => console.log(txnid));
    
        res.json({msg : "Successful"});
    
    }catch(err){
    
        res.json({msg : "Unable to send FLO." + err.message});
    }

});

router.post('/getTransactions', function(req, res) {

    var offset = req.body.txnoffset;

    client.listTransactions('',10, parseInt(offset)).then((data) => getFlodata(res,data));
});

function getFlodata(res,data){

    var transactionlist = '';

    data.sort(function(a, b){
    
        return b.time > a.time ? 1 : -1;
    });

    var transactioncount = Object.keys(data).length - 1;
    if(transactioncount == -1){
       res.json({});
   } 
  
    data.forEach(function (item) {
        client.getRawTransaction(item.txid, 1).then((string) => createTransactionDataList(string.floData,item, res, transactioncount));
    });
}

var jsonstring = '[';
var counter    = 0;

function createTransactionDataList(floData, item, res, transactioncount){

    jsonstring += '{"time":' + item.time + ', "amount":' + item.amount + ', "flodata":"' + floData + '", "confirmations":' + item.confirmations +'}';
    
    jsonstring += ',';

    if(counter++ == transactioncount){
        jsonstring = jsonstring.replace(/,$/, "");
        jsonstring += ']';
        var data = JSON.parse(jsonstring);
        // console.log(data);
        jsonstring = '[';
        counter    = 0;
        res.json(data);
    }
}

router.post('/checklogin', function(req, res) {
     
    // A new random 32-byte private key. 
    // var privateKey = crypto.randomBytes(32).toString("hex");
    // Corresponding uncompressed (65-byte) public key. 
    // var publicKey = eccrypto.getPublic(privateKey).toString("hex");
    
    const sig          =   Buffer.from(req.body.signature,'hex');
    const publicKey    =   Buffer.from(req.body.publicKey,'hex');

    var str = "hash of this string will be taken";
    var msg = crypto.createHash("sha256").update(str).digest();

    eccrypto.verify(publicKey, msg, sig).then(function() {
        res.json({"status":1});
    }).catch(function(e) {
        res.json({"status":0});
    });
});


router.post('/')

module.exports = router;
