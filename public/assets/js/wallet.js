
var txnoffset = 0; 

function renderTransactions() {
    
    $.post('/wallet/getTransactions', { txnoffset: txnoffset }, function (data) {
     
        if(txnoffset != 0){
            $('#list-transactions').append(Handlebars.templates['transactions']({ transactions: data }));
        }else{
            $('#list-transactions').html(Handlebars.templates['transactions']({ transactions: data }));
        }
    }, "json");
    
    txnoffset += 10;
}


function initializeWallet() {

    $('.wallet-container').html(Handlebars.templates['wallet']);

    refreshBalance();

    renderTransactions();

    var win = $(window);
    var doc = $(document);

    // Each time the user scrolls
    win.scroll(function() {
        // Vertical end reached?
        if (doc.height() - win.height() == win.scrollTop()) {

            renderTransactions();
        }
    });

    $('#send-coins-btn').click(function () {
        var toAddress = $('#to-address').val();
        var amount    = $('#send-coins-amount').val();
        var comments  = $('#comments').val();
       
        
        if(toAddress != '' && amount != ''){
            $.post('/wallet/sendflo', { toAddress: toAddress, amount: amount, comments: comments }, function (data) {
            
                alert(data.msg);
                
                refreshBalance();
                
            }, "json").fail(function () {
                alert('Error sending FLO');
            });
        }else{
        
          alert('Please enter the address and amount.');
        }
    });
}


var cryptobrowser   = require('crypto');
var eccryptobrowser = require("eccrypto");
require('buffer');

$('#login-btn').click(function () {

    const publicKey = $('#identifier-txt').val();
    // var publicKey = '0461cfb5d85f918d3814de12bda54d452ab1756395125da6cd24fe71c6b7ef8336d2e8e7a4b0f7204969195718bb14f98d9806cfa6a8eecd6a8daf178703c429de';

    //-- Fetch private key
    $.get("../../keys.txt", function(contents){

        var regex = new RegExp("\n" + publicKey + ":[a-z0-9]+\n");

        var matchedarray = regex.exec(contents);
        if(matchedarray != null){
            var priKey = matchedarray[0].split(':')[1];
            sendLoginData(publicKey,priKey);
        }else{
            alert('Please check your public key.')
        }
    });
});

function sendLoginData(publicKey,priKey){

    // const privateKey = Buffer.from("bffc7b9388275f89cac5a0f90b166440fbd9209656b866c4210478efbb8faeaf",'hex');
    const privateKey = Buffer.from(priKey,'hex');

    // var privateKey = "bffc7b9388275f89cac5a0f90b166440fbd9209656b866c4210478efbb8faeaf";

    var str = "hash of this string will be taken";
    var msg = cryptobrowser.createHash("sha256").update(str).digest();

    eccryptobrowser.sign(privateKey, msg).then(function(sig) {

        var signature = sig.toString('hex');

        $.post('/wallet/checklogin', {"publicKey":publicKey,"signature":signature}, function (data) {
            if(data.status){
                initializeWallet();
            }else{
                alert('Login unsuccessful.');
            }
        }, "json").fail(function () {
                alert('Error loading wallet');
        });
    });
}

function refreshBalance(){

    $.get('/wallet/getbalance', function (data) {
        $('#ltc-balance').text(data.balance);
    }, "json");
}


function dateTime(unix_timestamp){

    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var d = new Date(unix_timestamp*1000);

    var date = d.getDate().toString();
        
    if (date.length === 1){
        date = "0" + date;
    }

    var month = d.getMonth() + 1;
    
    if (month.toString().length === 1){
        month = "0" + month;
    }
        
    var year = d.getFullYear();

    var hours = d.getHours();
    if (hours.length === 1){
        hours = "0" + hours;
    }

    var minutes = d.getMinutes().toString();
    if (minutes.length === 1){
        minutes = "0" + minutes;
    }

    var seconds = d.getSeconds().toString();
    if (seconds.length === 1){
        seconds = "0" + seconds;
    }

    return date + '-' + month + '-' + year + ' ' + hours + ':' + minutes + ':' + seconds;
}


Handlebars.registerHelper('dateTime', function (time) {
    return dateTime(time);
});

